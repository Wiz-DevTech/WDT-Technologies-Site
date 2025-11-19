import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// SQLite-specific connection helper
export const ensureDatabaseConnection = async () => {
  try {
    await db.$queryRaw`SELECT 1`
    console.log('✅ SQLite database connected successfully')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    throw error
  }
}

// Database health check for agents
export const checkDatabaseHealth = async () => {
  try {
    await db.$queryRaw`SELECT 1`
    return { status: 'healthy', provider: process.env.DATABASE_URL?.startsWith('file:') ? 'sqlite' : 'postgresql' }
  } catch (error) {
    // ✅ FIXED: Type guard for error handling
    if (error instanceof Error) {
      return { status: 'unhealthy', error: error.message }
    }
    return { status: 'unhealthy', error: String(error) }
  }
}

export { db as prisma }