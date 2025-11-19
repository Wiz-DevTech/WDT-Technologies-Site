// lib/email-config.ts
export const emailConfig = {
  resend: {
    apiKey: process.env.RESEND_API_KEY!,
    from: process.env.FROM_EMAIL!,
  },
  storage: {
    emailPath: process.env.EMAIL_STORAGE_PATH || './storage/emails',
    attachmentPath: process.env.ATTACHMENT_STORAGE_PATH || './storage/attachments',
  },
  sync: {
    interval: parseInt(process.env.EMAIL_SYNC_INTERVAL || '300000'),
  },
};