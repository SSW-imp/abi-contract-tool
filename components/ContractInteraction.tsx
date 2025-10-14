'use client';

import { useWalletStore } from '@/store/walletStore';
import { ABIFunction, ContractCallResult } from '@/types';
import { Contract } from 'ethers';
import { Play, Eye, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface ContractInteractionProps {
  abi: any[];
  contractAddress: string;
}

export default function ContractInteraction({ abi, contractAddress }: ContractInteractionProps) {
  const { isConnected, provider, signer } = useWalletStore();
  const [inputValues, setInputValues] = useState<Record<string, Record<string, string>>>({});
  const [results, setResults] = useState<Record<string, ContractCallResult>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  // 过滤出函数类型
  const functions: ABIFunction[] = abi.filter(
    (item) => item.type === 'function'
  ) as ABIFunction[];

  // 更新输入值
  const handleInputChange = (functionName: string, inputName: string, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [functionName]: {
        ...prev[functionName],
        [inputName]: value,
      },
    }));
  };

  // 解析输入参数
  const parseInputValue = (type: string, value: string): any => {
    if (!value && type !== 'bool') return value;

    try {
      // bool 类型
      if (type === 'bool') {
        return value === 'true' || value === '1';
      }

      // uint/int 类型
      if (type.startsWith('uint') || type.startsWith('int')) {
        return BigInt(value || '0');
      }

      // address 类型
      if (type === 'address') {
        if (!/^0x[a-fA-F0-9]{40}$/.test(value)) {
          throw new Error('地址格式不正确');
        }
        return value;
      }

      // bytes 类型
      if (type.startsWith('bytes')) {
        return value;
      }

      // string 类型
      return value;
    } catch (error: any) {
      throw new Error(`参数 "${type}" 解析失败: ${error.message}`);
    }
  };

  // 格式化返回值
  const formatOutput = (value: any, type: string): string => {
    if (value === null || value === undefined) {
      return 'null';
    }

    // BigInt 类型
    if (typeof value === 'bigint') {
      return value.toString();
    }

    // 数组
    if (Array.isArray(value)) {
      return JSON.stringify(value, (_, v) =>
        typeof v === 'bigint' ? v.toString() : v
      );
    }

    // 对象
    if (typeof value === 'object') {
      return JSON.stringify(value, (_, v) =>
        typeof v === 'bigint' ? v.toString() : v
      , 2);
    }

    return String(value);
  };

  // 调用合约函数
  const handleCallFunction = async (func: ABIFunction) => {
    if (!func.name) return;

    const functionName = func.name;
    setLoading((prev) => ({ ...prev, [functionName]: true }));
    setResults((prev) => ({ ...prev, [functionName]: { success: false } }));

    try {
      // 验证钱包连接
      if (!isConnected || !provider) {
        throw new Error('请先连接钱包');
      }

      // 验证合约地址
      if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
        throw new Error('合约地址格式不正确');
      }

      // 解析输入参数
      const args: any[] = [];
      for (const input of func.inputs) {
        const inputValue = inputValues[functionName]?.[input.name] || '';
        const parsedValue = parseInputValue(input.type, inputValue);
        args.push(parsedValue);
      }

      // 创建合约实例
      const isReadOnly = func.stateMutability === 'view' || func.stateMutability === 'pure';
      const contract = new Contract(
        contractAddress,
        abi,
        isReadOnly ? provider : signer
      );

      // 调用合约
      if (isReadOnly) {
        // 只读调用（view/pure 函数）
        const result = await contract[functionName](...args);
        
        // 处理返回值
        let formattedResult: any;
        if (func.outputs && func.outputs.length > 0) {
          if (func.outputs.length === 1) {
            formattedResult = formatOutput(result, func.outputs[0].type);
          } else {
            formattedResult = func.outputs.map((output, index) =>
              formatOutput(result[index], output.type)
            );
          }
        } else {
          formattedResult = formatOutput(result, 'unknown');
        }

        setResults((prev) => ({
          ...prev,
          [functionName]: {
            success: true,
            data: formattedResult,
          },
        }));

      } else {
        // 写入调用（需要签名）
        const tx = await contract[functionName](...args);
        
        // 等待交易确认
        const receipt = await tx.wait();

        setResults((prev) => ({
          ...prev,
          [functionName]: {
            success: true,
            data: `交易成功！Gas Used: ${receipt.gasUsed.toString()}`,
            txHash: receipt.hash,
          },
        }));
      }

    } catch (error: any) {
      console.error('调用失败:', error);
      setResults((prev) => ({
        ...prev,
        [functionName]: {
          success: false,
          error: error.reason || error.message || '调用失败',
        },
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [functionName]: false }));
    }
  };

  // 渲染输入组件
  const renderInput = (func: ABIFunction, input: any) => {
    const functionName = func.name!;
    const value = inputValues[functionName]?.[input.name] || '';

    // bool 类型用下拉选择
    if (input.type === 'bool') {
      return (
        <select
          value={value}
          onChange={(e) => handleInputChange(functionName, input.name, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        >
          <option value="">选择值</option>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      );
    }

    // 其他类型用文本输入
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => handleInputChange(functionName, input.name, e.target.value)}
        placeholder={`${input.type}${input.name ? ` ${input.name}` : ''}`}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
      />
    );
  };

  // 获取函数状态标签
  const getStateMutabilityBadge = (stateMutability: string) => {
    const badges = {
      view: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'View' },
      pure: { bg: 'bg-green-100', text: 'text-green-700', label: 'Pure' },
      nonpayable: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Write' },
      payable: { bg: 'bg-red-100', text: 'text-red-700', label: 'Payable' },
    };

    const badge = badges[stateMutability as keyof typeof badges] || badges.nonpayable;

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  if (functions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500 text-center">请输入有效的 ABI 以生成合约交互界面</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">合约交互面板</h2>
        <p className="text-indigo-100">共找到 {functions.length} 个可调用函数</p>
      </div>

      {functions.map((func, index) => {
        const functionName = func.name!;
        const isReadOnly = func.stateMutability === 'view' || func.stateMutability === 'pure';
        const result = results[functionName];
        const isLoading = loading[functionName];

        return (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            {/* 函数头部 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {isReadOnly ? (
                  <Eye className="w-5 h-5 text-blue-600" />
                ) : (
                  <Send className="w-5 h-5 text-orange-600" />
                )}
                <h3 className="text-lg font-bold text-gray-800">{functionName}</h3>
                {getStateMutabilityBadge(func.stateMutability)}
              </div>
            </div>

            {/* 输入参数 */}
            {func.inputs.length > 0 && (
              <div className="space-y-3 mb-4">
                {func.inputs.map((input, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {input.name || `参数${idx + 1}`}
                      <span className="text-gray-500 ml-2">({input.type})</span>
                    </label>
                    {renderInput(func, input)}
                  </div>
                ))}
              </div>
            )}

            {/* 调用按钮 */}
            <button
              onClick={() => handleCallFunction(func)}
              disabled={!isConnected || isLoading}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isReadOnly
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-orange-600 hover:bg-orange-700 text-white'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>调用中...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>{isReadOnly ? '查询' : '执行交易'}</span>
                </>
              )}
            </button>

            {/* 调用结果 */}
            {result && (
              <div className="mt-4">
                {result.success ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm font-medium text-green-800 mb-2">✓ 调用成功</div>
                    {result.data && (
                      <div className="text-xs text-gray-700 font-mono break-all whitespace-pre-wrap">
                        {result.data}
                      </div>
                    )}
                    {result.txHash && (
                      <div className="mt-2 text-xs text-green-700">
                        交易哈希: <span className="font-mono">{result.txHash}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="text-sm font-medium text-red-800 mb-1">✗ 调用失败</div>
                    <div className="text-xs text-red-600">{result.error}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

