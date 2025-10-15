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

      // ✅ 连接成功提示
      const { SUPPORTED_NETWORKS } = await import('@/types');
      const networkName = SUPPORTED_NETWORKS[chainId]?.chainName || '未知网络';
      
      console.log(`✅ 钱包连接成功！`);
      console.log(`👛 钱包类型: ${walletName}`);
      console.log(`📍 钱包地址: ${accounts[0]}`);
      console.log(`🌐 当前网络: ${networkName} (${chainId})`);
      console.log(`💰 原生代币: ${SUPPORTED_NETWORKS[chainId]?.nativeCurrency.symbol || 'Unknown'}`);

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
      window.ethereum.on('chainChanged', async (chainId: string) => {
        console.log(`🔄 检测到链变化: ${chainId}`);
        
        set({ chainId });
        
        // 刷新 provider 和 signer
        if (window.ethereum) {
          const newProvider = new BrowserProvider(window.ethereum);
          newProvider.getSigner().then((signer) => {
            set({ provider: newProvider, signer });
            
            // 获取网络名称
            import('@/types').then(({ SUPPORTED_NETWORKS }) => {
              const networkName = SUPPORTED_NETWORKS[chainId]?.chainName || '未知网络';
              console.log(`✅ Provider 和 Signer 已更新`);
              console.log(`📍 当前网络: ${networkName} (${chainId})`);
            });
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
    // 清理事件监听器，防止内存泄漏
    if (window.ethereum) {
      window.ethereum.removeAllListeners?.('accountsChanged');
      window.ethereum.removeAllListeners?.('chainChanged');
    }
    
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
        throw new Error('未安装钱包扩展');
      }

      // 获取网络配置（用于日志）
      const { SUPPORTED_NETWORKS } = await import('@/types');
      const networkConfig = SUPPORTED_NETWORKS[chainId];
      const networkName = networkConfig?.chainName || chainId;

      console.log(`🔄 正在切换到网络: ${networkName} (${chainId})`);

      // 尝试切换网络
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });

      // 切换成功后，等待一下再更新状态
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 重新获取当前链 ID（确保同步）
      const currentChainId = await window.ethereum.request({
        method: 'eth_chainId',
      });
      
      set({ chainId: currentChainId });

      // ✅ 切换成功提示
      console.log(`网络切换成功: ${networkName}`);
      console.log(`当前链 ID: ${currentChainId}`);
      console.log(`原生代币: ${networkConfig?.nativeCurrency.symbol || 'Unknown'}`);

    } catch (error: any) {
      console.error('❌ 切换网络错误:', error);
      
      // 错误代码 4902: 钱包中不存在该网络，需要先添加
      if (error.code === 4902) {
        try {
          // 动态导入网络配置
          const { SUPPORTED_NETWORKS } = await import('@/types');
          const networkConfig = SUPPORTED_NETWORKS[chainId];
          
          if (!networkConfig) {
            throw new Error('不支持的网络');
          }

          console.log(`网络不存在，正在添加: ${networkConfig.chainName}`);

          // 添加网络到钱包
          await window.ethereum!.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: networkConfig.chainId,
                chainName: networkConfig.chainName,
                nativeCurrency: networkConfig.nativeCurrency,
                rpcUrls: networkConfig.rpcUrls,
                blockExplorerUrls: networkConfig.blockExplorerUrls,
              },
            ],
          });

          // 添加成功后，更新状态
          set({ chainId });
          
          // ✅ 添加并切换成功提示
          console.log(`网络添加成功: ${networkConfig.chainName}`);
          console.log(`已自动切换到新网络`);
          console.log(`链 ID: ${chainId}`);
          console.log(`原生代币: ${networkConfig.nativeCurrency.symbol}`);
          
        } catch (addError: any) {
          console.error('❌ 添加网络失败:', addError);
          throw new Error(`添加网络失败: ${addError.message}`);
        }
      } 
      // 错误代码 4001: 用户拒绝切换
      else if (error.code === 4001) {
        console.log('用户取消了切换网络');
        throw new Error('用户取消了切换网络');
      }
      // 其他错误
      else {
        throw new Error(error.message || '切换网络失败');
      }
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

