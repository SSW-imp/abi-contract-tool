'use client';

import { useWalletStore } from '@/store/walletStore';
import { FileSignature, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function MessageSigner() {
  const { isConnected, signMessage } = useWalletStore();
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [loading, setLoading] = useState(false);

  // 生成随机消息
  const generateRandomMessage = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    setMessage(`签名验证消息 - ${timestamp} - ${random}`);
  };

  // 签名消息
  const handleSign = async () => {
    if (!message.trim()) {
      alert('请输入或生成消息');
      return;
    }

    setLoading(true);
    try {
      const sig = await signMessage(message);
      setSignature(sig);
    } catch (error: any) {
      alert(`签名失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileSignature className="w-5 h-5 text-purple-600" />
        <h2 className="text-xl font-bold text-gray-800">消息签名</h2>
      </div>

      <div className="space-y-4">
        {/* 消息输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            待签名消息
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="输入消息或点击生成随机消息"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={!isConnected}
            />
            <button
              onClick={generateRandomMessage}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isConnected}
            >
              <RefreshCw className="w-4 h-4" />
              生成
            </button>
          </div>
        </div>

        {/* 签名按钮 */}
        <button
          onClick={handleSign}
          disabled={!isConnected || loading}
          className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {loading ? '签名中...' : '签名消息'}
        </button>

        {/* 签名结果 */}
        {signature && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              签名结果
            </label>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs text-gray-600 break-all font-mono">{signature}</p>
            </div>
          </div>
        )}

        {/* 提示信息 */}
        {!isConnected && (
          <p className="text-sm text-gray-500 text-center">
            请先连接钱包以使用签名功能
          </p>
        )}
      </div>
    </div>
  );
}

