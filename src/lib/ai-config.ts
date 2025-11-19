// lib/ai-config.ts
export const aiConfig = {
  anthropic: {
    url: process.env.AI_SERVICE_URL!,
    apiKey: process.env.AI_SERVICE_KEY!,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY!,
  },
  enabled: process.env.NEXT_PUBLIC_AI_FEATURES_ENABLED === 'true',
};