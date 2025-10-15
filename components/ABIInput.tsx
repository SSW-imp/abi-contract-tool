'use client';

import { FileJson, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useWalletStore } from '@/store/walletStore';

interface ABIInputProps {
  onABIChange: (abi: any[]) => void;
  onAddressChange: (address: string) => void;
}

export default function ABIInput({ onABIChange, onAddressChange }: ABIInputProps) {
  const { chainId } = useWalletStore();
  const [abiText, setAbiText] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [error, setError] = useState('');

  // 验证并解析 ABI
  const handleABIChange = (text: string) => {
    setAbiText(text);
    setError('');

    if (!text.trim()) {
      onABIChange([]);
      return;
    }

    try {
      const parsed = JSON.parse(text);
      
      // 验证是否为数组
      if (!Array.isArray(parsed)) {
        throw new Error('ABI 必须是一个数组');
      }

      // 验证 ABI 格式
      const validABI = parsed.filter((item) => {
        if (item.type === 'function') {
          return (
            typeof item.name === 'string' &&
            Array.isArray(item.inputs) &&
            typeof item.stateMutability === 'string'
          );
        }
        return true;
      });

      onABIChange(validABI);
      
      if (validABI.length === 0) {
        setError('未找到有效的函数定义');
      }
    } catch (err: any) {
      setError(`ABI 解析失败: ${err.message}`);
      onABIChange([]);
    }
  };

  // 验证合约地址
  const handleAddressChange = (address: string) => {
    setContractAddress(address);
    
    // 基本地址验证（以 0x 开头，42 个字符）
    if (address && !/^0x[a-fA-F0-9]{40}$/.test(address)) {
      setError('合约地址格式不正确（应为 0x 开头的 42 位十六进制字符）');
    } else {
      setError('');
    }
    
    onAddressChange(address);
  };

  // 根据当前链获取 USDC 合约地址
  const getUSDCAddress = (currentChainId: string | null) => {
    const usdcAddresses: Record<string, { address: string; name: string }> = {
      '0x1': { 
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 
        name: 'USDC (Ethereum Mainnet)' 
      },
      '0xaa36a7': { 
        address: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', 
        name: 'USDC (Sepolia Testnet)' 
      },
      '0x89': { 
        address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', 
        name: 'USDC (Polygon)' 
      },
      '0x38': { 
        address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', 
        name: 'USDC (BSC)' 
      },
    };

    return usdcAddresses[currentChainId || '0x1'] || usdcAddresses['0x1'];
  };

  // 加载示例 ERC20 ABI（USDC 合约）
  const loadExampleABI = () => {
    // 检查是否连接钱包
    if (!chainId) {
      alert('⚠️ 请先连接钱包！');
      return;
    }

    // 真实的 USDC 合约 ABI（简化版，包含常用函数）
    const exampleABI = [
      {
        "type": "function",
        "name": "name",
        "inputs": [],
        "outputs": [{ "name": "", "type": "string" }],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "symbol",
        "inputs": [],
        "outputs": [{ "name": "", "type": "string" }],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "decimals",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint8" }],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "totalSupply",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256" }],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "balanceOf",
        "inputs": [{ "name": "account", "type": "address" }],
        "outputs": [{ "name": "", "type": "uint256" }],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "transfer",
        "inputs": [
          { "name": "to", "type": "address" },
          { "name": "amount", "type": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "bool" }],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "allowance",
        "inputs": [
          { "name": "owner", "type": "address" },
          { "name": "spender", "type": "address" }
        ],
        "outputs": [{ "name": "", "type": "uint256" }],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "approve",
        "inputs": [
          { "name": "spender", "type": "address" },
          { "name": "amount", "type": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "bool" }],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "transferFrom",
        "inputs": [
          { "name": "from", "type": "address" },
          { "name": "to", "type": "address" },
          { "name": "amount", "type": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "bool" }],
        "stateMutability": "nonpayable"
      }
    ];

    const abiString = JSON.stringify(exampleABI, null, 2);
    setAbiText(abiString);
    handleABIChange(abiString);
    
    // 根据当前链获取对应的 USDC 合约地址
    const usdcInfo = getUSDCAddress(chainId);
    setContractAddress(usdcInfo.address);
    handleAddressChange(usdcInfo.address);
    
    console.log('✅ 已加载 USDC 合约示例');
    console.log('📍 合约地址:', usdcInfo.address);
    console.log('🌐 网络:', usdcInfo.name);
    console.log('💡 提示: 如果切换网络，请重新点击「加载示例」');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="space-y-4">
        {/* 合约地址输入 */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            合约地址
          </label>
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => handleAddressChange(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          />
        </div>

        {/* ABI JSON 输入 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <FileJson className="w-4 h-4 text-blue-600" />
              合约 ABI (JSON)
            </label>
            <button
              onClick={loadExampleABI}
              className="text-xs text-blue-600 hover:text-blue-700 underline font-medium"
            >
              加载示例 (USDC)
            </button>
          </div>
          <textarea
            value={abiText}
            onChange={(e) => handleABIChange(e.target.value)}
            placeholder='[{"type":"function","name":"balanceOf","inputs":[{"name":"account","type":"address"}],...}]'
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-xs resize-y"
            rows={10}
          />
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* 使用提示 */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-xs text-blue-800 mb-2">
            💡 <strong>快速开始：</strong>点击右上角「加载示例 (USDC)」按钮，自动填充当前网络的 USDC 合约地址和 ABI。
          </p>
          <p className="text-xs text-blue-800">
            ⚠️ <strong>注意：</strong>不同链上的合约地址不同。切换网络后，请重新点击「加载示例」获取正确的合约地址。
          </p>
        </div>
        
        {/* 当前网络提示 */}
        {chainId && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
            <p className="text-xs text-slate-700">
              🌐 <strong>当前网络：</strong>
              {chainId === '0x1' && ' Ethereum Mainnet'}
              {chainId === '0xaa36a7' && ' Sepolia Testnet'}
              {chainId === '0x89' && ' Polygon Mainnet'}
              {chainId === '0x38' && ' BSC Mainnet'}
              {!['0x1', '0xaa36a7', '0x89', '0x38'].includes(chainId) && ` ${chainId}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

