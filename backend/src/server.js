import 'dotenv/config'
import { app, prisma } from './app.js'

const port = Number.parseInt(process.env.PORT, 10) || 3000
const server = app.listen(port, () => {
  console.log(`FreshMart API listening at http://localhost:${port}`)
})

async function shutdown() {
  server.close(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)