// /WDT-Technologies-Site/src/lib/ssi/did-config.ts
export const DID_CONFIG = {
  primary: {
    web: 'did:web:wiz-devtech.github.io', // Your GitHub DID
    domain: 'did:web:wizdevtech.com',
    xrpl: 'did:pkh:xrpl:r9PnNgPMvyhZJU5LoXXuqGbWfH3Qec3wgW',
    polygon: 'did:pkh:polygon:0xdC78593EEeB39bD7C8507Ff9e4CB0e7B25eBA048',
    arbitrum: 'did:pkh:arbitrum:0xdC78593EEeB39bD7C8507Ff9e4CB0e7B25eBA048'
    crypto: 'did:web:wizdevtech.crypto'
  },
  endpoints: {
     did: 'https://wiz-devtech.github.io/.github/.well-known/did.json',
    website: 'https://wizdevtech.com',
    blockchain: 'https://wizdevtech.crypto',
    email: 'https://email.wizdevtech.com',
    api: 'https://api.wizdevtech.com',
    github: 'https://github.com/Wiz-DevTech',
    resolver: 'https://wiz-devtech.github.io/.github/',
    governance: 'https://wizdevtech.com/api/governance'
  },
  verificationMethods: {
    xrpl: 'did:web:wizdevtech.com#xrpl',
    polygon: 'did:web:wizdevtech.com#polygon',
    arbitrum: 'did:web:wizdevtech.com#arbitrum',
    web: 'did:web:wizdevtech.com#web'
  },
  services: {
    website: '#website',
    blockchain: '#blockchain',
    email: '#email-system',
    governance: '#token-governance'
  },
  addresses: {
    xrpl: 'r9PnNgPMvyhZJU5LoXXuqGbWfH3Qec3wgW',
    polygon: '0xdC78593EEeB39bD7C8507Ff9e4CB0e7B25eBA048',
    arbitrum: '0xdC78593EEeB39bD7C8507Ff9e4CB0e7B25eBA048'
  }
} as const;

export const SUPPORTED_DID_METHODS = [
  'web',
  'pkh',
  'key'
] as const;

export const BLOCKCHAIN_CONFIG = {
  xrpl: {
    network: 'mainnet',
    explorer: 'https://livenet.xrpl.org',
    chainId: 'xrpl-mainnet'
  },
  polygon: {
    network: 'mainnet',
    chainId: 137,
    explorer: 'https://polygonscan.com'
  },
  arbitrum: {
    network: 'mainnet', 
    chainId: 42161,
    explorer: 'https://arbiscan.io'
  }
} as const;

// Helper functions
export function getVerificationMethod(chain: 'xrpl' | 'polygon' | 'arbitrum') {
  return DID_CONFIG.verificationMethods[chain];
}

export function getBlockchainAccountId(chain: 'xrpl' | 'polygon' | 'arbitrum') {
  const address = DID_CONFIG.addresses[chain];
  switch (chain) {
    case 'xrpl':
      return `xrpl:${address}`;
    case 'polygon':
      return `polygon:${address}@eip155:137`;
    case 'arbitrum':
      return `arbitrum:${address}@eip155:42161`;
    default:
      return address;
  }
}

export function getExplorerUrl(chain: 'xrpl' | 'polygon' | 'arbitrum', hash: string, type: 'address' | 'tx' = 'address') {
  const base = BLOCKCHAIN_CONFIG[chain].explorer;
  if (chain === 'xrpl') {
    return type === 'address' ? `${base}/accounts/${hash}` : `${base}/transactions/${hash}`;
  } else {
    return type === 'address' ? `${base}/address/${hash}` : `${base}/tx/${hash}`;
  }
}