import { create } from 'zustand';
import { BrowserProvider, JsonRpcSigner } from 'ethers';

interface WalletState {
  // 状态
  address: string | null;
  chainId: string | null;
  isConnected: boolean;
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  
  // 方法
  connect: () => Promise<void>;
  disconnect: () => void;
  switchNetwork: (chainId: string) => Promise<void>;
  signMessage: (message: string) => Promise<string>;
  setProvider: (provider: BrowserProvider | null) => void;
  setSigner: (signer: JsonRpcSigner | null) => void;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  // 初始状态
  address: null,
  chainId: null,
  isConnected: false,
  provider: null,
  signer: null,

  // 连接钱包
  connect: async () => {
    try {
      if (!window.ethereum) {
        alert('请安装支持 EVM 的钱包扩展（如 MetaMask、OKX Wallet、Trust Wallet 等）');
        return;
      }

      // 检测钱包类型（可选，用于日志）
      const walletName = window.ethereum.isMetaMask ? 'MetaMask' 
        : window.ethereum.isOkxWallet ? 'OKX Wallet'
        : window.ethereum.isTrust ? 'Trust Wallet'
        : window.ethereum.isCoinbaseWallet ? 'Coinbase Wallet'
        : window.ethereum.isRabby ? 'Rabby Wallet'
        : 'Unknown Wallet';
      
      console.log(`正在连接钱包: ${walletName}`);

      // 请求账户权限
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // 获取当前链 ID
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      // 创建 provider 和 signer
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      set({
        address: accounts[0],
        chainId,
        isConnected: true,
        provider,
        signer,
      });

      // 监听账户变化
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          get().disconnect();
        } else {
          set({ address: accounts[0] });
          // 重新获取 signer
          provider.getSigner().then((signer) => set({ signer }));
        }
      });

      // 监听链变化
      window.ethereum.on('chainChanged', (chainId: string) => {
        set({ chainId });
        // 刷新 provider 和 signer
        if (window.ethereum) {
          const newProvider = new BrowserProvider(window.ethereum);
          newProvider.getSigner().then((signer) => {
            set({ provider: newProvider, signer });
          });
        }
      });

    } catch (error) {
      console.error('连接钱包失败:', error);
      alert('连接钱包失败，请重试');
    }
  },

  // 断开连接
  disconnect: () => {
    set({
      address: null,
      chainId: null,
      isConnected: false,
      provider: null,
      signer: null,
    });
  },

  // 切换网络
  switchNetwork: async (chainId: string) => {
    try {
      if (!window.ethereum) {
        throw new Error('未安装 MetaMask');
      }

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });

      set({ chainId });

    } catch (error: any) {
      // 如果网络不存在，尝试添加
      if (error.code === 4902) {
        console.log('网络不存在，需要添加网络');
      }
      throw error;
    }
  },

  // 签名消息
  signMessage: async (message: string) => {
    const { signer, address } = get();
    
    if (!signer || !address) {
      throw new Error('请先连接钱包');
    }

    try {
      const signature = await signer.signMessage(message);
      return signature;
    } catch (error) {
      console.error('签名失败:', error);
      throw error;
    }
  },

  // 设置 provider
  setProvider: (provider: BrowserProvider | null) => {
    set({ provider });
  },

  // 设置 signer
  setSigner: (signer: JsonRpcSigner | null) => {
    set({ signer });
  },
}));

// 类型扩展：添加 ethereum 到 window
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, handler: (...args: any[]) => void) => void;
      removeListener: (event: string, handler: (...args: any[]) => void) => void;
      isMetaMask?: boolean;
      isOkxWallet?: boolean;
      isTrust?: boolean;
      isCoinbaseWallet?: boolean;
      isRabby?: boolean;
      isBraveWallet?: boolean;
      isTokenPocket?: boolean;
      isBitKeep?: boolean;
      isImToken?: boolean;
    };
  }
}

