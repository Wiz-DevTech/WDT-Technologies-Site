import { z } from 'zod'

const AgentConfigSchema = z.object({
  database: z.object({
    url: z.string().default('file:./dev.db'),
    provider: z.enum(['sqlite', 'postgresql']).default('sqlite')
  }),
  storage: z.object({
    emailPath: z.string().default('./storage/emails'),
    attachmentPath: z.string().default('./storage/attachments'),
    maxEmailSize: z.number().default(50 * 1024 * 1024) // 50MB
  })
})

export type AgentConfig = z.infer<typeof AgentConfigSchema>

export const getAgentConfig = (): AgentConfig => {
  return AgentConfigSchema.parse({
    database: {
      url: process.env.DATABASE_URL || 'file:./dev.db',
      provider: process.env.DATABASE_URL?.startsWith('file:') ? 'sqlite' : 'postgresql'
    },
    storage: {
      emailPath: process.env.EMAIL_STORAGE_PATH || './storage/emails',
      attachmentPath: process.env.ATTACHMENT_STORAGE_PATH || './storage/attachments'
    }
  })
}

// Email storage agent database operations
export const initializeEmailAgent = async () => {
  const config = getAgentConfig()
  console.log(`📧 Email Storage Agent using ${config.database.provider} database`)
  
  // Verify database connection using your existing db instance
  const { db, ensureDatabaseConnection } = await import('../../lib/db')
  await ensureDatabaseConnection()
  
  return { db, config }
}