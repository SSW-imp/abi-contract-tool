// 网络配置类型
export interface Network {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
}

// 支持的网络列表
export const SUPPORTED_NETWORKS: Record<string, Network> = {
  '0x1': {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://eth.llamarpc.com'],
    blockExplorerUrls: ['https://etherscan.io'],
  },
  '0xaa36a7': {
    chainId: '0xaa36a7',
    chainName: 'Sepolia Testnet',
    nativeCurrency: { name: 'Sepolia Ether', symbol: 'SepoliaETH', decimals: 18 },
    rpcUrls: ['https://rpc.sepolia.org'],
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
  },
  '0x89': {
    chainId: '0x89',
    chainName: 'Polygon Mainnet',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrls: ['https://polygonscan.com'],
  },
  '0x38': {
    chainId: '0x38',
    chainName: 'BSC Mainnet',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com'],
  },
};

// ABI 函数参数类型
export interface ABIInput {
  name: string;
  type: string;
  internalType?: string;
}

// ABI 函数输出类型
export interface ABIOutput {
  name: string;
  type: string;
  internalType?: string;
}

// ABI 函数定义
export interface ABIFunction {
  type: 'function' | 'constructor' | 'receive' | 'fallback';
  name?: string;
  inputs: ABIInput[];
  outputs?: ABIOutput[];
  stateMutability: 'pure' | 'view' | 'nonpayable' | 'payable';
}

// 合约调用结果
export interface ContractCallResult {
  success: boolean;
  data?: any;
  error?: string;
  txHash?: string;
}

