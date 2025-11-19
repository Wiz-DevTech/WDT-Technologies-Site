import { NextRequest, NextResponse } from 'next/server';
import { didResolver } from './did-resolver';

export interface SSISession {
  did: string;
  verified: boolean;
  credentials: any[];
  expiration: number;
}

export class SSIMiddleware {
  static async verifyDIDHeader(request: NextRequest): Promise<SSISession | null> {
    const didHeader = request.headers.get('x-verifiable-did');
    const signatureHeader = request.headers.get('x-did-signature');
    
    if (!didHeader || !signatureHeader) {
      return null;
    }

    try {
      const isValid = await didResolver.verifyDIDOwnership(
        didHeader, 
        signatureHeader,
        await request.text()
      );

      if (isValid) {
        return {
          did: didHeader,
          verified: true,
          credentials: [],
          expiration: Date.now() + 3600000 // 1 hour
        };
      }
    } catch (error) {
      console.error('DID verification failed:', error);
    }

    return null;
  }

  static async requireDIDAuth(request: NextRequest): Promise<Response | null> {
    const session = await this.verifyDIDHeader(request);
    
    if (!session || !session.verified) {
      return new Response(
        JSON.stringify({ error: 'DID authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return null;
  }
}

// Middleware for Next.js API routes
export function withSSIAuth(handler: Function) {
  return async (request: NextRequest, ...args: any[]) => {
    const authError = await SSIMiddleware.requireDIDAuth(request);
    if (authError) return authError;

    return handler(request, ...args);
  };
}