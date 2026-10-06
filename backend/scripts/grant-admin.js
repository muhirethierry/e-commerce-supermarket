import { PrismaClient } from '@prisma/client'

const email = process.argv[2]?.trim().toLowerCase()
if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error('Usage: npm run admin:grant -- account@example.com')
  process.exit(1)
}

const prisma = new PrismaClient()
try {
  const user = await prisma.user.update({
    where: { email },
    data: { role: 'ADMIN' },
    select: { name: true, email: true, role: true },
  })
  console.log(`Granted ${user.role} access to ${user.name} (${user.email}).`)
} catch (error) {
  if (error.code === 'P2025') {
    console.error(`No account exists for ${email}. Register this account first, then run this command.`)
  } else {
    console.error('Could not grant admin access:', error.message)
  }
  process.exitCode = 1
} finally {
  await prisma.$disconnect()
}