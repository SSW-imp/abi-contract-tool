'use client';

import { FileJson, MapPin } from 'lucide-react';
import { useState } from 'react';

interface ABIInputProps {
  onABIChange: (abi: any[]) => void;
  onAddressChange: (address: string) => void;
}

export default function ABIInput({ onABIChange, onAddressChange }: ABIInputProps) {
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

  // 加载示例 ERC20 ABI
  const loadExampleABI = () => {
    const exampleABI = [
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
        "name": "totalSupply",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256" }],
        "stateMutability": "view"
      }
    ];

    const abiString = JSON.stringify(exampleABI, null, 2);
    setAbiText(abiString);
    handleABIChange(abiString);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="space-y-4">
        {/* 合约地址输入 */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 text-orange-600" />
            合约地址
          </label>
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => handleAddressChange(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm"
          />
        </div>

        {/* ABI JSON 输入 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FileJson className="w-4 h-4 text-orange-600" />
              合约 ABI (JSON)
            </label>
            <button
              onClick={loadExampleABI}
              className="text-xs text-blue-600 hover:text-blue-700 underline"
            >
              加载示例 (ERC20)
            </button>
          </div>
          <textarea
            value={abiText}
            onChange={(e) => handleABIChange(e.target.value)}
            placeholder='[{"type":"function","name":"balanceOf","inputs":[{"name":"account","type":"address"}],...}]'
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-xs resize-y"
            rows={10}
          />
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* 使用提示 */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            💡 提示：输入编译好的合约 ABI JSON 字符串，系统将自动解析并生成调用界面。
            目前仅支持基本类型参数（address、uint256、bool、string 等）。
          </p>
        </div>
      </div>
    </div>
  );
}

