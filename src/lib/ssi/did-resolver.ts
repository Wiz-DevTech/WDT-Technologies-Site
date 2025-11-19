import { DIDResolutionResult, DIDResolver } from 'did-resolver';
import { getResolver } from 'web-did-resolver';
import { getResolver as getPkhResolver } from 'pkh-did-resolver';

export class WDTDIDResolver {
  private resolver: DIDResolver;

  constructor() {
    const webResolver = getResolver();
    const pkhResolver = getPkhResolver();
    
    this.resolver = new (require('did-resolver').Resolver)({
      ...webResolver,
      ...pkhResolver,
    });
  }

  async resolve(did: string): Promise<DIDResolutionResult> {
    return await this.resolver.resolve(did);
  }

  async resolveWebDID(domain: string): Promise<DIDResolutionResult> {
    const did = `did:web:${domain}`;
    return this.resolve(did);
  }

  async verifyDIDOwnership(did: string, signature: string, message: string): Promise<boolean> {
    try {
      const resolution = await this.resolve(did);
      if (!resolution.didDocument) return false;

      // Implement signature verification logic
      // This would use the verificationMethod from the DID Document
      return true;
    } catch (error) {
      console.error('DID verification error:', error);
      return false;
    }
  }
}

export const didResolver = new WDTDIDResolver();