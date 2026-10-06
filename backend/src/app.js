import cors from 'cors'
import { createHash, createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto'
import cookieParser from 'cookie-parser'
import express from 'express'
import { promisify } from 'node:util'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export const app = express()

const defaultDevelopmentOrigins = process.env.NODE_ENV === 'production'
  ? []
  : ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://127.0.0.1:5174', 'http://localhost:5174']
const allowedOrigins = [...new Set([
  ...defaultDevelopmentOrigins,
  ...(process.env.CORS_ORIGINS || '').split(','),
].map((origin) => origin.trim()).filter(Boolean))]
const sessionCookieName = 'freshmart_session'
const sessionDurationSeconds = 60 * 60 * 24 * 7
const scrypt = promisify(scryptCallback)
const loginAttempts = new Map()
const chatAttempts = new Map()
const resetAttempts = new Map()

let sessionSecret = process.env.AUTH_SECRET
if (!sessionSecret && process.env.NODE_ENV === 'production') {
  throw new Error('AUTH_SECRET must be configured in production.')
}
if (!sessionSecret) {
  sessionSecret = randomBytes(32).toString('hex')
  console.warn('AUTH_SECRET is not set. Local sessions will be invalidated when the API restarts.')
}

app.disable('x-powered-by')
app.use(cors({
  credentials: true,
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
      return
    }

    callback(new Error('Origin is not allowed by CORS'))
  },
}))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())

function signSession(userId) {
  const payload = Buffer.from(JSON.stringify({
    sub: userId,
    exp: Math.floor(Date.now() / 1000) + sessionDurationSeconds,
  })).toString('base64url')
  const signature = createHmac('sha256', sessionSecret).update(payload).digest('base64url')
  return `${payload}.${signature}`
}

function verifySession(token) {
  if (!token || typeof token !== 'string') return null
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null

  const expected = createHmac('sha256', sessionSecret).update(payload).digest()
  let actual
  try {
    actual = Buffer.from(signature, 'base64url')
  } catch {
    return null
  }
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return Number.isInteger(data.sub) && data.exp > Math.floor(Date.now() / 1000) ? data.sub : null
  } catch {
    return null
  }
}

function setSessionCookie(response, userId) {
  response.cookie(sessionCookieName, signSession(userId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api',
    maxAge: sessionDurationSeconds * 1000,
  })
}

function clearSessionCookie(response) {
  response.clearCookie(sessionCookieName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api',
  })
}

function sessionUser(request, response, next) {
  const userId = verifySession(request.cookies?.[sessionCookieName])
  if (!userId) {
    response.status(401).json({ error: 'Please sign in to continue.' })
    return
  }
  request.userId = userId
  next()
}

async function requireAdmin(request, response, next) {
  const userId = verifySession(request.cookies?.[sessionCookieName])
  if (!userId) {
    response.status(401).json({ error: 'Please sign in to continue.' })
    return
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      clearSessionCookie(response)
      response.status(401).json({ error: 'Please sign in to continue.' })
      return
    }
    if (user.role !== 'ADMIN') {
      response.status(403).json({ error: 'Administrator access is required.' })
      return
    }
    request.user = user
    next()
  } catch (error) {
    next(error)
  }
}

function loginRateLimit(request, response, next) {
  const now = Date.now()
  const key = request.ip || request.socket.remoteAddress || 'unknown'
  const recentAttempts = (loginAttempts.get(key) || []).filter((time) => now - time < 15 * 60 * 1000)
  if (recentAttempts.length >= 10) {
    response.status(429).json({ error: 'Too many sign-in attempts. Please wait 15 minutes and try again.' })
    return
  }
  recentAttempts.push(now)
  loginAttempts.set(key, recentAttempts)
  next()
}

async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex')
  const hash = await scrypt(password, salt, 64)
  return `${salt}:${hash.toString('hex')}`
}

async function verifyPassword(password, storedHash) {
  if (!storedHash) return false
  const [salt, hashHex] = storedHash.split(':')
  if (!salt || !hashHex) return false
  const expected = Buffer.from(hashHex, 'hex')
  const actual = await scrypt(password, salt, expected.length)
  return expected.length === actual.length && timingSafeEqual(expected, actual)
}

function limitResetRequests(request, response, next) {
  const now = Date.now()
  const key = request.ip || request.socket.remoteAddress || 'unknown'
  const recent = (resetAttempts.get(key) || []).filter((time) => now - time < 60 * 60 * 1000)
  if (recent.length >= 5) {
    response.status(429).json({ error: 'Too many reset requests. Please wait and try again later.' })
    return
  }
  recent.push(now)
  resetAttempts.set(key, recent)
  next()
}

function hashResetToken(token) {
  return createHash('sha256').update(token).digest('hex')
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role }
}

async function sendWelcomeEmail(user) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) return false

  const safeName = user.name.replace(/[\r\n\t]+/g, ' ').trim()
  try {
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        from: process.env.EMAIL_FROM,
        to: [user.email],
        subject: 'Welcome to FreshMart',
        text: `Hello ${safeName},\n\nThank you for creating a FreshMart account. We appreciate you choosing us for your everyday shopping. Your account is ready, and you can now add products to your basket and manage your orders.\n\nWelcome to FreshMart!\nThe FreshMart team`,
      }),
    })
    if (!emailResponse.ok) {
      console.error('Welcome email provider returned status:', emailResponse.status)
      return false
    }
    return true
  } catch (error) {
    console.error('Could not send welcome email:', error.name || 'unknown error')
    return false
  }
}

app.post('/api/auth/register', loginRateLimit, async (request, response, next) => {
  const name = typeof request.body.name === 'string' ? request.body.name.trim() : ''
  const email = typeof request.body.email === 'string' ? request.body.email.trim().toLowerCase() : ''
  const password = request.body.password

  if (name.length < 2 || name.length > 100) {
    response.status(400).json({ error: 'Name must be between 2 and 100 characters.' })
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    response.status(400).json({ error: 'Enter a valid email address.' })
    return
  }
  if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
    response.status(400).json({ error: 'Password must be between 8 and 128 characters.' })
    return
  }

  try {
    const user = await prisma.user.create({
      data: { name, email, passwordHash: await hashPassword(password) },
    })
    setSessionCookie(response, user.id)
    const welcomeEmailSent = await sendWelcomeEmail(user)
    response.status(201).json({ data: publicUser(user), welcomeEmailSent })
  } catch (error) {
    if (error.code === 'P2002') {
      response.status(409).json({ error: 'An account with this email already exists.' })
      return
    }
    next(error)
  }
})

app.post('/api/auth/login', loginRateLimit, async (request, response, next) => {
  const email = typeof request.body.email === 'string' ? request.body.email.trim().toLowerCase() : ''
  const password = request.body.password
  if (!email || typeof password !== 'string') {
    response.status(400).json({ error: 'Email and password are required.' })
    return
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      response.status(401).json({ error: 'Email or password is incorrect.' })
      return
    }
    setSessionCookie(response, user.id)
    response.json({ data: publicUser(user) })
  } catch (error) {
    next(error)
  }
})

app.post('/api/auth/google', loginRateLimit, async (request, response, next) => {
  const credential = request.body.credential
  if (!process.env.GOOGLE_CLIENT_ID) {
    response.status(503).json({ error: 'Google sign-in is not configured on the server.' })
    return
  }
  if (typeof credential !== 'string' || credential.length > 10000) {
    response.status(400).json({ error: 'A valid Google credential is required.' })
    return
  }

  try {
    const verification = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`)
    if (!verification.ok) {
      response.status(401).json({ error: 'Google could not verify this sign-in. Please try again.' })
      return
    }
    const claims = await verification.json()
    if (claims.aud !== process.env.GOOGLE_CLIENT_ID || claims.email_verified !== 'true' || !claims.sub || !claims.email) {
      response.status(401).json({ error: 'The Google account could not be verified.' })
      return
    }

    const email = claims.email.toLowerCase()
    const user = await prisma.user.upsert({
      where: { email },
      create: {
        name: claims.name || email.split('@')[0],
        email,
        googleSubject: claims.sub,
      },
      update: { googleSubject: claims.sub },
    })
    setSessionCookie(response, user.id)
    response.json({ data: publicUser(user) })
  } catch (error) {
    next(error)
  }
})

app.get('/api/auth/me', sessionUser, async (request, response, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: request.userId } })
    if (!user) {
      clearSessionCookie(response)
      response.status(401).json({ error: 'Please sign in to continue.' })
      return
    }
    response.json({ data: publicUser(user) })
  } catch (error) {
    next(error)
  }
})

app.post('/api/auth/logout', (_request, response) => {
  clearSessionCookie(response)
  response.status(204).end()
})

app.post('/api/auth/password-reset/request', limitResetRequests, async (request, response, next) => {
  const email = typeof request.body?.email === 'string' ? request.body.email.trim().toLowerCase() : ''
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    response.status(400).json({ error: 'Enter a valid email address.' })
    return
  }
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    response.status(503).json({
      error: 'Password reset email is not configured. Set RESEND_API_KEY and EMAIL_FROM in backend/.env.',
      code: 'EMAIL_PROVIDER_NOT_CONFIGURED',
    })
    return
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      response.json({ data: { message: 'If an account exists for that email, a reset link will be sent.' } })
      return
    }

    const token = randomBytes(32).toString('base64url')
    const tokenHash = hashResetToken(token)
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000)
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id, usedAt: null } })
    await prisma.passwordResetToken.create({ data: { userId: user.id, tokenHash, expiresAt } })

    const frontendBaseUrl = (process.env.FRONTEND_BASE_URL || 'http://127.0.0.1:5174').replace(/\/$/, '')
    const resetUrl = `${frontendBaseUrl}/reset-password?token=${encodeURIComponent(token)}`
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        from: process.env.EMAIL_FROM,
        to: [user.email],
        subject: 'Reset your FreshMart password',
        text: `We received a request to reset your FreshMart password. This link expires in 30 minutes.\n\n${resetUrl}\n\nIf you did not request this, you can ignore this email.`,
        html: `<p>We received a request to reset your FreshMart password.</p><p><a href="${resetUrl}">Reset your password</a></p><p>This link expires in 30 minutes. If you did not request this, you can ignore this email.</p>`,
      }),
    })

    if (!emailResponse.ok) {
      await prisma.passwordResetToken.deleteMany({ where: { tokenHash } })
      console.error('Password reset email provider returned status:', emailResponse.status)
      response.status(502).json({ error: 'The reset email could not be sent. Check the email provider configuration and try again.' })
      return
    }

    response.json({ data: { message: 'If an account exists for that email, a reset link will be sent.' } })
  } catch (error) {
    next(error)
  }
})

app.post('/api/auth/password-reset/complete', async (request, response, next) => {
  const token = typeof request.body?.token === 'string' ? request.body.token : ''
  const password = request.body?.password
  if (!token || token.length > 200 || typeof password !== 'string' || password.length < 8 || password.length > 128) {
    response.status(400).json({ error: 'Provide a valid reset link and a password between 8 and 128 characters.' })
    return
  }

  try {
    const tokenHash = hashResetToken(token)
    const now = new Date()
    const resetRecord = await prisma.passwordResetToken.findFirst({
      where: { tokenHash, usedAt: null, expiresAt: { gt: now } },
      select: { id: true, userId: true },
    })
    if (!resetRecord) {
      response.status(400).json({ error: 'This reset link is invalid or has expired. Request a new one.' })
      return
    }

    const passwordHash = await hashPassword(password)
    await prisma.$transaction(async (transaction) => {
      const claimed = await transaction.passwordResetToken.updateMany({
        where: { id: resetRecord.id, usedAt: null, expiresAt: { gt: now } },
        data: { usedAt: now },
      })
      if (claimed.count !== 1) {
        const error = new Error('This reset link is invalid or has expired. Request a new one.')
        error.status = 400
        throw error
      }
      await transaction.user.update({ where: { id: resetRecord.userId }, data: { passwordHash } })
      await transaction.passwordResetToken.updateMany({
        where: { userId: resetRecord.userId, usedAt: null },
        data: { usedAt: now },
      })
    })

    response.json({ data: { message: 'Password updated. You can now sign in with your new password.' } })
  } catch (error) {
    if (error.status) {
      response.status(error.status).json({ error: error.message })
      return
    }
    next(error)
  }
})

function parseProductInput(body) {
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const category = typeof body.category === 'string' ? body.category.trim() : ''
  const subcategory = typeof body.subcategory === 'string' ? body.subcategory.trim() : ''
  const unit = typeof body.unit === 'string' ? body.unit.trim() : ''
  const image = typeof body.image === 'string' ? body.image.trim() : ''
  const price = Number(body.price)
  const stock = Number(body.stock)

  if (name.length < 2 || name.length > 160 || category.length < 2 || category.length > 100
    || subcategory.length < 2 || subcategory.length > 100 || unit.length < 1 || unit.length > 30) {
    return { error: 'Enter a name, department, item type, and unit within the allowed lengths.' }
  }
  if (!Number.isSafeInteger(price) || price < 0 || price > 1000000000) {
    return { error: 'Price must be a whole RWF amount between 0 and 1,000,000,000.' }
  }
  if (!Number.isSafeInteger(stock) || stock < 0 || stock > 10000000) {
    return { error: 'Stock must be a whole number between 0 and 10,000,000.' }
  }
  if (image && (!/^https?:\/\//i.test(image) || image.length > 2000)) {
    return { error: 'Image must be an HTTP or HTTPS URL no longer than 2,000 characters.' }
  }

  return {
    data: {
      name,
      category,
      subcategory,
      unit,
      image,
      price,
      stock,
      ageRestricted: Boolean(body.ageRestricted),
      demoProduct: false,
    },
  }
}

app.get('/api/admin/summary', requireAdmin, async (_request, response, next) => {
  try {
    const [activeProducts, lowStockProducts, totalOrders, pendingOrders, recentOrders] = await Promise.all([
      prisma.product.count({ where: { isActive: true } }),
      prisma.product.count({ where: { isActive: true, stock: { lte: 5 } } }),
      prisma.order.count(),
      prisma.order.count({ where: { status: 'pending' } }),
      prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 8 }),
    ])
    response.json({
      data: { activeProducts, lowStockProducts, totalOrders, pendingOrders, recentOrders },
    })
  } catch (error) {
    next(error)
  }
})

app.get('/api/admin/products', requireAdmin, async (request, response, next) => {
  try {
    const page = Math.max(Number.parseInt(request.query.page, 10) || 1, 1)
    const limit = Math.min(Math.max(Number.parseInt(request.query.limit, 10) || 50, 1), 100)
    const search = typeof request.query.q === 'string' ? request.query.q.trim() : ''
    const where = search
      ? { OR: [{ name: { contains: search } }, { category: { contains: search } }] }
      : {}
    const [data, total] = await Promise.all([
      prisma.product.findMany({ where, orderBy: { id: 'desc' }, skip: (page - 1) * limit, take: limit }),
      prisma.product.count({ where }),
    ])
    response.json({ data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } })
  } catch (error) {
    next(error)
  }
})

app.post('/api/admin/products', requireAdmin, async (request, response, next) => {
  const parsed = parseProductInput(request.body)
  if (parsed.error) {
    response.status(400).json({ error: parsed.error })
    return
  }
  try {
    const product = await prisma.product.create({ data: parsed.data })
    response.status(201).json({ data: product })
  } catch (error) {
    next(error)
  }
})

app.patch('/api/admin/products/:id', requireAdmin, async (request, response, next) => {
  const id = Number.parseInt(request.params.id, 10)
  if (!Number.isSafeInteger(id) || id < 1) {
    response.status(400).json({ error: 'Product ID must be a positive integer.' })
    return
  }
  const parsed = parseProductInput(request.body)
  if (parsed.error) {
    response.status(400).json({ error: parsed.error })
    return
  }
  try {
    const product = await prisma.product.update({ where: { id }, data: parsed.data })
    response.json({ data: product })
  } catch (error) {
    if (error.code === 'P2025') {
      response.status(404).json({ error: 'Product not found.' })
      return
    }
    next(error)
  }
})

app.delete('/api/admin/products/:id', requireAdmin, async (request, response, next) => {
  const id = Number.parseInt(request.params.id, 10)
  if (!Number.isSafeInteger(id) || id < 1) {
    response.status(400).json({ error: 'Product ID must be a positive integer.' })
    return
  }
  try {
    const product = await prisma.product.update({ where: { id }, data: { isActive: false } })
    response.json({ data: product })
  } catch (error) {
    if (error.code === 'P2025') {
      response.status(404).json({ error: 'Product not found.' })
      return
    }
    next(error)
  }
})

app.post('/api/admin/products/:id/restore', requireAdmin, async (request, response, next) => {
  const id = Number.parseInt(request.params.id, 10)
  if (!Number.isSafeInteger(id) || id < 1) {
    response.status(400).json({ error: 'Product ID must be a positive integer.' })
    return
  }
  try {
    const product = await prisma.product.update({ where: { id }, data: { isActive: true } })
    response.json({ data: product })
  } catch (error) {
    if (error.code === 'P2025') {
      response.status(404).json({ error: 'Product not found.' })
      return
    }
    next(error)
  }
})

app.get('/api/admin/orders', requireAdmin, async (request, response, next) => {
  try {
    const status = typeof request.query.status === 'string' ? request.query.status : ''
    const where = status ? { status } : {}
    const orders = await prisma.order.findMany({
      where,
      include: { items: true },
      orderBy: { createdAt: 'desc' },
      take: 100,
    })
    response.json({ data: orders })
  } catch (error) {
    next(error)
  }
})

app.patch('/api/admin/orders/:id', requireAdmin, async (request, response, next) => {
  const id = Number.parseInt(request.params.id, 10)
  const nextStatus = request.body.status
  const allowedTransitions = {
    pending: ['processing', 'cancelled'],
    processing: ['ready', 'cancelled'],
    ready: ['delivered', 'cancelled'],
    delivered: [],
    cancelled: [],
  }
  if (!Number.isSafeInteger(id) || id < 1 || !Object.hasOwn(allowedTransitions, nextStatus)) {
    response.status(400).json({ error: 'Provide a valid order ID and next status.' })
    return
  }

  try {
    const updatedOrder = await prisma.$transaction(async (transaction) => {
      const current = await transaction.order.findUnique({ where: { id }, include: { items: true } })
      if (!current) {
        const error = new Error('Order not found.')
        error.status = 404
        throw error
      }
      if (!allowedTransitions[current.status]?.includes(nextStatus)) {
        const error = new Error(`Order cannot move from ${current.status} to ${nextStatus}.`)
        error.status = 409
        throw error
      }

      const changed = await transaction.order.updateMany({ where: { id, status: current.status }, data: { status: nextStatus } })
      if (changed.count !== 1) {
        const error = new Error('Order status changed concurrently. Refresh and try again.')
        error.status = 409
        throw error
      }
      if (nextStatus === 'cancelled') {
        for (const item of current.items) {
          await transaction.product.updateMany({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } },
          })
        }
      }
      return transaction.order.findUnique({ where: { id }, include: { items: true } })
    })
    response.json({ data: updatedOrder })
  } catch (error) {
    if (error.status) {
      response.status(error.status).json({ error: error.message })
      return
    }
    next(error)
  }
})

app.get('/api/health', async (_request, response, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    response.json({ status: 'ok', database: 'connected' })
  } catch (error) {
    next(error)
  }
})

app.get('/api/categories', async (_request, response, next) => {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      distinct: ['category'],
      select: { category: true },
      orderBy: { category: 'asc' },
    })
    response.json({ data: products.map((product) => product.category) })
  } catch (error) {
    next(error)
  }
})

app.get('/api/subcategories', async (request, response, next) => {
  try {
    const category = typeof request.query.category === 'string' ? request.query.category.trim() : ''
    const subcategories = await prisma.product.findMany({
      where: { isActive: true, ...(category && { category }) },
      distinct: ['subcategory'],
      select: { subcategory: true },
      orderBy: { subcategory: 'asc' },
    })
    response.json({ data: subcategories.map((product) => product.subcategory) })
  } catch (error) {
    next(error)
  }
})

app.get('/api/products', async (request, response, next) => {
  try {
    const page = Math.max(Number.parseInt(request.query.page, 10) || 1, 1)
    const limit = Math.min(Math.max(Number.parseInt(request.query.limit, 10) || 24, 1), 100)
    const search = typeof request.query.q === 'string' ? request.query.q.trim() : ''
    const category = typeof request.query.category === 'string' ? request.query.category.trim() : ''
    const subcategory = typeof request.query.subcategory === 'string' ? request.query.subcategory.trim() : ''
    const sort = request.query.sort

    const where = {
      isActive: true,
      ...(category && { category }),
      ...(subcategory && { subcategory }),
      ...(search && {
        OR: [
          { name: { contains: search } },
          { category: { contains: search } },
          { subcategory: { contains: search } },
        ],
      }),
    }

    const orderBy = sort === 'price-asc'
      ? { price: 'asc' }
      : sort === 'price-desc'
        ? { price: 'desc' }
        : sort === 'name'
          ? { name: 'asc' }
          : { id: 'asc' }

    const [data, total] = await Promise.all([
      prisma.product.findMany({ where, orderBy, skip: (page - 1) * limit, take: limit }),
      prisma.product.count({ where }),
    ])

    response.json({
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    next(error)
  }
})

app.get('/api/products/:id', async (request, response, next) => {
  const id = Number.parseInt(request.params.id, 10)
  if (!Number.isSafeInteger(id) || id < 1) {
    response.status(400).json({ error: 'Product ID must be a positive integer.' })
    return
  }

  try {
    const product = await prisma.product.findFirst({ where: { id, isActive: true } })
    if (!product) {
      response.status(404).json({ error: 'Product not found.' })
      return
    }

    response.json({ data: product })
  } catch (error) {
    next(error)
  }
})

app.post('/api/orders', async (request, response, next) => {
  const { customer, paymentMethod, items } = request.body
  const name = typeof customer?.name === 'string' ? customer.name.trim() : ''
  const email = typeof customer?.email === 'string' ? customer.email.trim().toLowerCase() : ''
  const phone = typeof customer?.phone === 'string' ? customer.phone.trim() : ''
  const address = typeof customer?.address === 'string' ? customer.address.trim() : ''

  if (name.length < 2 || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254
    || phone.length < 7 || phone.length > 30 || address.length < 5 || address.length > 500) {
    response.status(400).json({ error: 'Enter valid name, email, phone, and delivery address details.' })
    return
  }
  if (!['cash', 'mobile-money', 'card'].includes(paymentMethod)) {
    response.status(400).json({ error: 'Choose a supported payment method.' })
    return
  }
  if (paymentMethod !== 'cash') {
    response.status(503).json({
      error: `${paymentMethod === 'card' ? 'Card' : 'Mobile Money'} payments are not configured yet. No payment was taken and no order was created.`,
      code: 'PAYMENT_PROVIDER_NOT_CONFIGURED',
    })
    return
  }
  if (!Array.isArray(items) || items.length === 0 || items.length > 100) {
    response.status(400).json({ error: 'Add between 1 and 100 products to your basket.' })
    return
  }

  const quantities = new Map()
  for (const item of items) {
    const productId = Number(item?.productId)
    const quantity = Number(item?.quantity)
    if (!Number.isSafeInteger(productId) || productId < 1 || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > 100) {
      response.status(400).json({ error: 'Each basket line needs a valid product ID and quantity from 1 to 100.' })
      return
    }
    quantities.set(productId, (quantities.get(productId) || 0) + quantity)
  }

  try {
    const order = await prisma.$transaction(async (transaction) => {
      const productIds = [...quantities.keys()]
      const products = await transaction.product.findMany({ where: { id: { in: productIds }, isActive: true } })
      if (products.length !== productIds.length) {
        const productIdSet = new Set(products.map((product) => product.id))
        const missingProductIds = productIds.filter((id) => !productIdSet.has(id))
        const error = new Error(`Some products are no longer available: ${missingProductIds.join(', ')}.`)
        error.status = 400
        throw error
      }

      const orderItems = products.map((product) => {
        const quantity = quantities.get(product.id)
        if (product.stock < quantity) {
          const error = new Error(`${product.name} does not have enough stock for this quantity.`)
          error.status = 409
          throw error
        }
        return {
          productId: product.id,
          name: product.name,
          unitPrice: product.price,
          quantity,
          lineTotal: product.price * quantity,
        }
      })
      const subtotal = orderItems.reduce((total, item) => total + item.lineTotal, 0)

      for (const [productId, quantity] of quantities) {
        const update = await transaction.product.updateMany({
          where: { id: productId, stock: { gte: quantity } },
          data: { stock: { decrement: quantity } },
        })
        if (update.count !== 1) {
          const error = new Error('Stock changed while your order was being placed. Please review your basket.')
          error.status = 409
          throw error
        }
      }

      const reference = `FM-${Date.now().toString(36).toUpperCase()}-${randomBytes(3).toString('hex').toUpperCase()}`
      return transaction.order.create({
        data: {
          reference,
          customerName: name,
          email,
          phone,
          address,
          paymentMethod,
          paymentStatus: 'pay_on_delivery',
          status: 'pending',
          subtotal,
          items: { create: orderItems },
        },
        include: { items: true },
      })
    })

    response.status(201).json({ data: order })
  } catch (error) {
    if (error.status) {
      response.status(error.status).json({ error: error.message })
      return
    }
    next(error)
  }
})

app.post('/api/chat', async (request, response, next) => {
  const now = Date.now()
  const visitor = request.ip || request.socket.remoteAddress || 'unknown'
  const recentRequests = (chatAttempts.get(visitor) || []).filter((time) => now - time < 15 * 60 * 1000)
  if (recentRequests.length >= 30) {
    response.status(429).json({ error: 'You have reached the chat limit. Please wait a little and try again.' })
    return
  }
  recentRequests.push(now)
  chatAttempts.set(visitor, recentRequests)

  const message = typeof request.body?.message === 'string' ? request.body.message.trim() : ''
  const history = Array.isArray(request.body?.history) ? request.body.history.slice(-8) : []
  if (!message || message.length > 1000) {
    response.status(400).json({ error: 'Enter a message between 1 and 1,000 characters.' })
    return
  }
  if (!process.env.OPENAI_API_KEY) {
    response.status(503).json({
      error: 'The AI shopping assistant is not configured yet. Add OPENAI_API_KEY to the backend environment.',
      code: 'AI_PROVIDER_NOT_CONFIGURED',
    })
    return
  }

  const safeHistory = history
    .filter((entry) => ['user', 'assistant'].includes(entry?.role) && typeof entry.content === 'string')
    .map((entry) => ({ role: entry.role, content: entry.content.slice(0, 1000) }))

  try {
    const terms = [...new Set(message.toLowerCase().match(/[a-z0-9]+/g) || [])]
      .filter((term) => term.length > 2)
      .slice(0, 8)
    const productWhere = {
      isActive: true,
      stock: { gt: 0 },
      ...(terms.length && {
        OR: terms.flatMap((term) => [
          { name: { contains: term } },
          { category: { contains: term } },
          { subcategory: { contains: term } },
        ]),
      }),
    }
    let catalog = await prisma.product.findMany({
      where: productWhere,
      select: { id: true, name: true, category: true, subcategory: true, price: true, unit: true, stock: true },
      orderBy: { price: 'asc' },
      take: 12,
    })
    if (catalog.length === 0) {
      catalog = await prisma.product.findMany({
        where: { isActive: true, stock: { gt: 0 } },
        select: { id: true, name: true, category: true, subcategory: true, price: true, unit: true, stock: true },
        orderBy: { price: 'asc' },
        take: 8,
      })
    }

const aiResponse = await fetch(process.env.AI_API_URL || 'https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(20000),
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        temperature: 0.4,
        max_tokens: 350,
        messages: [
          {
            role: 'system',
            content: `You are FreshMart's grocery shopping assistant. Help with product discovery and simple shopping questions. Use only the supplied catalog for claims about products, stock, categories, and price. Prices are whole RWF amounts per unit. Never invent discounts or delivery policies. If the requested item is absent, say so and offer available alternatives. Be concise. Current catalog: ${JSON.stringify(catalog)}`,
          },
          ...safeHistory,
          { role: 'user', content: message },
        ],
      }),
    })
    const result = await aiResponse.json().catch(() => null)
    if (!aiResponse.ok) {
      console.error('AI provider request failed:', aiResponse.status, result?.error?.type || 'unknown error')
      response.status(502).json({ error: 'The shopping assistant could not respond right now. Please try again.' })
      return
    }
    const reply = result?.choices?.[0]?.message?.content?.trim()
    if (!reply) {
      response.status(502).json({ error: 'The shopping assistant returned an empty response. Please try again.' })
      return
    }
    response.json({ data: { reply, products: catalog } })
  } catch (error) {
    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      response.status(504).json({ error: 'The shopping assistant took too long to respond. Please try again.' })
      return
    }
    next(error)
  }
})

// These two handlers must stay LAST, after every route above.
app.use((_request, response) => {
  response.status(404).json({ error: 'API route not found.' })
})

app.use((error, _request, response, _next) => {
  if (error.message === 'Origin is not allowed by CORS') {
    response.status(403).json({ error: error.message })
    return
  }

  console.error(error)
  response.status(500).json({ error: 'An unexpected server error occurred.' })
})