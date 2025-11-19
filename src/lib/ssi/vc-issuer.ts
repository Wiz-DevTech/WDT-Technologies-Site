import { v4 as uuidv4 } from 'uuid';

export interface VerifiableCredential {
  "@context": string[];
  id: string;
  type: string[];
  issuer: string;
  issuanceDate: string;
  credentialSubject: any;
  proof: {
    type: string;
    created: string;
    verificationMethod: string;
    proofPurpose: string;
    proofValue: string;
  };
}

export class VCIssuer {
  private issuerDID: string;

  constructor(issuerDID: string) {
    this.issuerDID = issuerDID;
  }

  async issueEmailCredential(
    subjectDID: string, 
    email: string, 
    attributes: any = {}
  ): Promise<VerifiableCredential> {
    const credential: VerifiableCredential = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/security/suites/ed25519-2020/v1"
      ],
      id: `https://wizdevtech.com/credentials/${uuidv4()}`,
      type: ["VerifiableCredential", "EmailCredential"],
      issuer: this.issuerDID,
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        id: subjectDID,
        email: email,
        ...attributes
      },
      proof: {
        type: "Ed25519Signature2020",
        created: new Date().toISOString(),
        verificationMethod: `${this.issuerDID}#web`,
        proofPurpose: "assertionMethod",
        proofValue: "PLACEHOLDER_SIGNATURE" // Would be actual signature
      }
    };

    return credential;
  }

  async issueDomainCredential(subjectDID: string, domain: string): Promise<VerifiableCredential> {
    const credential: VerifiableCredential = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://identity.foundation/.well-known/did-configuration/v1"
      ],
      id: `https://wizdevtech.com/credentials/${uuidv4()}`,
      type: ["VerifiableCredential", "DomainLinkageCredential"],
      issuer: this.issuerDID,
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        id: subjectDID,
        domain: domain,
        linkedAt: new Date().toISOString()
      },
      proof: {
        type: "Ed25519Signature2020",
        created: new Date().toISOString(),
        verificationMethod: `${this.issuerDID}#web`,
        proofPurpose: "assertionMethod",
        proofValue: "PLACEHOLDER_SIGNATURE"
      }
    };

    return credential;
  }
}