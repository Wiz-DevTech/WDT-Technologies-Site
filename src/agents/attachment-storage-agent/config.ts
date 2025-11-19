import { z } from 'zod'

const AttachmentConfigSchema = z.object({
  database: z.object({
    url: z.string().default('file:./dev.db'),
    provider: z.enum(['sqlite', 'postgresql']).default('sqlite')
  }),
  storage: z.object({
    path: z.string().default('./storage/attachments'),
    maxFileSize: z.number().default(100 * 1024 * 1024), // 100MB
    allowedTypes: z.array(z.string()).default([
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ])
  })
})

export type AttachmentConfig = z.infer<typeof AttachmentConfigSchema>

export const getAttachmentConfig = (): AttachmentConfig => {
  return AttachmentConfigSchema.parse({
    database: {
      url: process.env.DATABASE_URL || 'file:./dev.db',
      provider: process.env.DATABASE_URL?.startsWith('file:') ? 'sqlite' : 'postgresql'
    },
    storage: {
      path: process.env.ATTACHMENT_STORAGE_PATH || './storage/attachments'
    }
  })
}

// Attachment storage agent database operations
export const initializeAttachmentAgent = async () => {
  const config = getAttachmentConfig()
  console.log(`📎 Attachment Storage Agent using ${config.database.provider} database`)
  
  // Verify database connection using your existing db instance
  const { db, ensureDatabaseConnection } = await import('../../lib/db')
  await ensureDatabaseConnection()
  
  return { db, config }
}