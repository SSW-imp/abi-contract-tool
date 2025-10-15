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
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileSignature className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-bold text-slate-900">消息签名</h2>
      </div>

      <div className="space-y-4">
        {/* 消息输入 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-slate-700">
              待签名消息
            </label>
            <button
              onClick={generateRandomMessage}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isConnected}
            >
              <RefreshCw className="w-3 h-3" />
              生成随机
            </button>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="输入要签名的消息（支持多行）&#10;或点击右上角「生成随机」按钮"
            className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[100px] text-sm"
            disabled={!isConnected}
            rows={4}
          />
          <p className="mt-1 text-xs text-slate-500">
            💡 提示：支持多行文本输入，适合移动端和桌面端
          </p>
        </div>

        {/* 签名按钮 */}
        <button
          onClick={handleSign}
          disabled={!isConnected || loading}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {loading ? '签名中...' : '签名消息'}
        </button>

        {/* 签名结果 */}
        {signature && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              签名结果
            </label>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md">
              <p className="text-xs text-slate-700 break-all font-mono">{signature}</p>
            </div>
          </div>
        )}

        {/* 提示信息 */}
        {!isConnected && (
          <p className="text-sm text-slate-500 text-center">
            请先连接钱包以使用签名功能
          </p>
        )}
      </div>
    </div>
  );
}

