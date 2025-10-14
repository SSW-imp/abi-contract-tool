'use client';

import { useState } from 'react';
import WalletConnect from '@/components/WalletConnect';
import MessageSigner from '@/components/MessageSigner';
import ABIInput from '@/components/ABIInput';
import ContractInteraction from '@/components/ContractInteraction';
import { Code2 } from 'lucide-react';

export default function Home() {
  const [abi, setAbi] = useState<any[]>([]);
  const [contractAddress, setContractAddress] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 头部 */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex-shrink-0">
                <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">ABI Contract Tool</h1>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">动态合约交互工具</p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <WalletConnect />
            </div>
          </div>
        </div>
      </header>

      {/* 主体内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：工具区 */}
          <div className="space-y-8">
            {/* 消息签名 */}
            <MessageSigner />

            {/* ABI 输入 */}
            <ABIInput onABIChange={setAbi} onAddressChange={setContractAddress} />
          </div>

          {/* 右侧：合约交互 */}
          <div>
            <ContractInteraction abi={abi} contractAddress={contractAddress} />
          </div>
        </div>

        {/* 页脚说明 */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">使用说明</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">1. 连接钱包</h4>
              <p>点击右上角「连接钱包」按钮，授权 MetaMask 钱包连接。</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">2. 切换网络</h4>
              <p>连接后可点击网络按钮，切换到目标链（默认 Ethereum 主网）。</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">3. 消息签名</h4>
              <p>输入或生成随机消息，点击「签名消息」验证钱包身份。</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">4. 输入合约信息</h4>
              <p>填写合约地址和 ABI JSON，系统自动生成交互界面。</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">5. 调用合约</h4>
              <p>填写函数参数，点击「查询」或「执行交易」按钮调用合约。</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">6. 查看结果</h4>
              <p>调用成功后，结果会显示在函数面板下方。</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>注意：</strong>当前版本仅支持基本类型参数（address、uint256、bool、string 等），
              不支持数组、结构体等复杂类型。请确保合约已部署在当前连接的网络上。
            </p>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="mt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>Built with Next.js 14 + TypeScript + Ethers.js v6</p>
          <p className="mt-1">参考 Remix IDE 设计 | 支持 EVM 兼容链</p>
        </div>
      </footer>
    </div>
  );
}

