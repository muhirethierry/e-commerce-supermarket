import { PrismaClient } from '@prisma/client'
import products from '../../frontend/src/data/products.js'

const prisma = new PrismaClient()

try {
  const seedOperations = products.map((product) => {
    const data = {
      name: product.name,
      category: product.category,
      subcategory: product.subcategory || product.category,
      price: product.price,
      unit: product.unit,
      image: product.image,
      stock: product.stock,
      demoProduct: Boolean(product.demoProduct),
      ageRestricted: Boolean(product.ageRestricted),
    }

    return prisma.product.upsert({
      where: { id: product.id },
      create: { id: product.id, ...data },
      update: data,
    })
  })

  await prisma.$transaction(seedOperations)

  console.log(`Seeded ${products.length} sample products.`)
} catch (error) {
  console.error('Could not seed sample products:', error)
  process.exitCode = 1
} finally {
  await prisma.$disconnect()
}