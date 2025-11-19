export const parseJSON = <T>(jsonString: string | null): T | null => {
  if (!jsonString) return null;
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return null;
  }
};

export const stringifyJSON = (data: any): string => {
  return JSON.stringify(data);
};

// Type definitions for JSON fields
export interface EmailRecipient {
  email: string;
  name?: string;
}

export interface EmailLabels {
  system: string[];
  user: string[];
}

export interface AccountSettings {
  imap?: {
    host: string;
    port: number;
    secure: boolean;
  };
  smtp?: {
    host: string;
    port: number;
    secure: boolean;
  };
  oauth?: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  };
}