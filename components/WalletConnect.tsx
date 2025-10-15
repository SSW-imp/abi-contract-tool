'use client';

import { useWalletStore } from '@/store/walletStore';
import { SUPPORTED_NETWORKS } from '@/types';
import { Wallet, LogOut, Network } from 'lucide-react';
import { useState } from 'react';

export default function WalletConnect() {
  const { address, chainId, isConnected, connect, disconnect, switchNetwork } = useWalletStore();
  const [showNetworks, setShowNetworks] = useState(false);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getCurrentNetwork = () => {
    if (!chainId) return null;
    return SUPPORTED_NETWORKS[chainId];
  };

  const handleSwitchNetwork = async (newChainId: string) => {
    try {
      await switchNetwork(newChainId);
      setShowNetworks(false);
    } catch (error: any) {
      alert(`切换网络失败: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {/* 网络选择器 */}
      {isConnected && (
        <div className="relative">
          <button
            onClick={() => setShowNetworks(!showNetworks)}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-800 transition-colors text-sm border border-slate-600"
          >
            <Network className="w-4 h-4 flex-shrink-0" />
            <span className="hidden sm:inline">{getCurrentNetwork()?.chainName || '未知网络'}</span>
            <span className="sm:hidden">{getCurrentNetwork()?.nativeCurrency.symbol || 'ETH'}</span>
          </button>

          {/* 网络下拉菜单 */}
          {showNetworks && (
            <div className="absolute top-full mt-2 right-0 bg-white border border-slate-200 rounded-md shadow-lg min-w-[200px] z-10">
              {Object.values(SUPPORTED_NETWORKS).map((network) => (
                <button
                  key={network.chainId}
                  onClick={() => handleSwitchNetwork(network.chainId)}
                  className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors first:rounded-t-md last:rounded-b-md border-b border-slate-100 last:border-0 ${
                    chainId === network.chainId ? 'bg-blue-50 text-blue-700' : ''
                  }`}
                >
                  <div className="font-medium text-slate-900">{network.chainName}</div>
                  <div className="text-xs text-slate-500">{network.nativeCurrency.symbol}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 连接/断开按钮 */}
      {isConnected ? (
        <button
          onClick={disconnect}
          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors text-sm border border-slate-500"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm">{formatAddress(address!)}</span>
        </button>
      ) : (
        <button
          onClick={connect}
          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
        >
          <Wallet className="w-4 h-4 flex-shrink-0" />
          <span className="hidden xs:inline sm:inline">连接钱包</span>
          <span className="xs:hidden sm:hidden">连接</span>
        </button>
      )}
    </div>
  );
}

