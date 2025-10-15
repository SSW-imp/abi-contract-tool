# 🖥️ 控制台日志说明

## 📋 概述

为了方便调试和了解应用状态，我们在关键操作中添加了详细的控制台日志。

---

## 🔌 连接钱包日志

### 成功连接

```javascript
// 用户点击「连接钱包」按钮
正在连接钱包: MetaMask

// 连接成功后
✅ 钱包连接成功！
👛 钱包类型: MetaMask
📍 钱包地址: 0x1234567890abcdef1234567890abcdef12345678
🌐 当前网络: Ethereum Mainnet (0x1)
💰 原生代币: ETH
```

### 不同钱包的日志

```javascript
// MetaMask
正在连接钱包: MetaMask
✅ 钱包连接成功！
👛 钱包类型: MetaMask

// OKX Wallet
正在连接钱包: OKX Wallet
✅ 钱包连接成功！
👛 钱包类型: OKX Wallet

// Trust Wallet
正在连接钱包: Trust Wallet
✅ 钱包连接成功！
👛 钱包类型: Trust Wallet

// 未知钱包
正在连接钱包: Unknown Wallet
✅ 钱包连接成功！
👛 钱包类型: Unknown Wallet
```

---

## 🔄 切换网络日志

### 场景 1: 切换到已存在的网络

```javascript
// 用户点击切换到 Polygon
🔄 正在切换到网络: Polygon Mainnet (0x89)

// 切换成功
✅ 网络切换成功: Polygon Mainnet
📍 当前链 ID: 0x89
💰 原生代币: MATIC
```

### 场景 2: 切换到不存在的网络（自动添加）

```javascript
// 用户点击切换到 Polygon（钱包中没有）
🔄 正在切换到网络: Polygon Mainnet (0x89)

// 检测到网络不存在
❌ 切换网络错误: Error: Unrecognized chain ID...
⚠️ 网络不存在，正在添加: Polygon Mainnet

// 用户在钱包中批准添加
✅ 网络添加成功: Polygon Mainnet
🔄 已自动切换到新网络
📍 链 ID: 0x89
💰 原生代币: MATIC
```

### 场景 3: 用户取消切换

```javascript
// 用户点击切换网络
🔄 正在切换到网络: BSC Mainnet (0x38)

// 用户在钱包中点击「取消」
❌ 切换网络错误: Error: User rejected...
🚫 用户取消了切换网络
```

---

## 🔗 链变化监听日志

### 用户在钱包中手动切换网络

```javascript
// 用户在 MetaMask 中手动切换网络
🔄 检测到链变化: 0x89

// Provider 和 Signer 重新初始化
✅ Provider 和 Signer 已更新
📍 当前网络: Polygon Mainnet (0x89)
```

---

## 📊 完整操作流程示例

### 示例 1: 从连接钱包到切换网络

```javascript
// 1. 连接钱包
正在连接钱包: MetaMask
✅ 钱包连接成功！
👛 钱包类型: MetaMask
📍 钱包地址: 0x1234567890abcdef1234567890abcdef12345678
🌐 当前网络: Ethereum Mainnet (0x1)
💰 原生代币: ETH

// 2. 切换到 Polygon
🔄 正在切换到网络: Polygon Mainnet (0x89)
✅ 网络切换成功: Polygon Mainnet
📍 当前链 ID: 0x89
💰 原生代币: MATIC

// 3. 切换到 BSC
🔄 正在切换到网络: BSC Mainnet (0x38)
✅ 网络切换成功: BSC Mainnet
📍 当前链 ID: 0x38
💰 原生代币: BNB

// 4. 切换回 Ethereum
🔄 正在切换到网络: Ethereum Mainnet (0x1)
✅ 网络切换成功: Ethereum Mainnet
📍 当前链 ID: 0x1
💰 原生代币: ETH
```

### 示例 2: 添加新网络流程

```javascript
// 1. 尝试切换到 Sepolia 测试网（钱包中没有）
🔄 正在切换到网络: Sepolia Testnet (0xaa36a7)

// 2. 检测到网络不存在
❌ 切换网络错误: Error: Unrecognized chain ID "0xaa36a7"...
⚠️ 网络不存在，正在添加: Sepolia Testnet

// 3. 钱包弹窗，用户批准添加
✅ 网络添加成功: Sepolia Testnet
🔄 已自动切换到新网络
📍 链 ID: 0xaa36a7
💰 原生代币: SepoliaETH
```

---

## 🎨 日志图标说明

| 图标 | 含义 | 使用场景 |
|-----|------|---------|
| ✅ | 成功 | 操作成功完成 |
| ❌ | 错误 | 操作失败或出错 |
| ⚠️ | 警告 | 需要注意的情况 |
| 🔄 | 进行中 | 正在执行操作 |
| 🚫 | 取消 | 用户取消操作 |
| 👛 | 钱包 | 钱包相关信息 |
| 📍 | 地址/位置 | 地址或链 ID |
| 🌐 | 网络 | 网络名称 |
| 💰 | 代币 | 原生代币符号 |

---

## 🔍 如何查看日志

### 方法 1: Chrome DevTools

```bash
1. 按 F12 打开开发者工具
2. 切换到「Console」标签
3. 进行操作（连接钱包、切换网络等）
4. 查看彩色日志输出
```

### 方法 2: 过滤日志

```javascript
// 只查看成功日志
✅

// 只查看错误日志
❌

// 只查看网络相关日志
🌐 或 🔄
```

---

## 📝 日志级别

### console.log (普通日志)
```javascript
✅ 网络切换成功: Polygon Mainnet
📍 当前链 ID: 0x89
💰 原生代币: MATIC
```

### console.error (错误日志)
```javascript
❌ 切换网络错误: Error: User rejected...
❌ 添加网络失败: Error: ...
```

---

## 🧪 测试日志输出

### 测试脚本

在浏览器控制台运行以下代码测试日志：

```javascript
// 测试连接钱包
console.log(`✅ 钱包连接成功！`);
console.log(`👛 钱包类型: MetaMask`);
console.log(`📍 钱包地址: 0x1234...5678`);
console.log(`🌐 当前网络: Ethereum Mainnet (0x1)`);
console.log(`💰 原生代币: ETH`);

// 测试切换网络
console.log(`🔄 正在切换到网络: Polygon Mainnet (0x89)`);
console.log(`✅ 网络切换成功: Polygon Mainnet`);
console.log(`📍 当前链 ID: 0x89`);
console.log(`💰 原生代币: MATIC`);

// 测试错误
console.error(`❌ 切换网络错误:`, new Error('Test error'));
console.log(`🚫 用户取消了切换网络`);
```

---

## 💡 调试技巧

### 1. 使用日志追踪状态变化

```javascript
// 连接钱包前
console.log('Before connect:', { address: null, chainId: null });

// 连接钱包后
✅ 钱包连接成功！
📍 钱包地址: 0x1234...5678
🌐 当前网络: Ethereum Mainnet (0x1)

// 切换网络前
console.log('Before switch:', { chainId: '0x1' });

// 切换网络后
✅ 网络切换成功: Polygon Mainnet
📍 当前链 ID: 0x89
```

### 2. 监控 Provider 和 Signer 更新

```javascript
// 链变化时
🔄 检测到链变化: 0x89
✅ Provider 和 Signer 已更新
📍 当前网络: Polygon Mainnet (0x89)
```

### 3. 追踪网络添加流程

```javascript
// 完整流程
🔄 正在切换到网络: Polygon Mainnet (0x89)
❌ 切换网络错误: Error: Unrecognized chain ID...
⚠️ 网络不存在，正在添加: Polygon Mainnet
✅ 网络添加成功: Polygon Mainnet
🔄 已自动切换到新网络
📍 链 ID: 0x89
💰 原生代币: MATIC
```

---

## 🎯 常见日志场景

### 场景 1: 首次使用（连接 + 切换）

```javascript
// 连接钱包
正在连接钱包: MetaMask
✅ 钱包连接成功！
👛 钱包类型: MetaMask
📍 钱包地址: 0xABC...DEF
🌐 当前网络: Ethereum Mainnet (0x1)
💰 原生代币: ETH

// 切换到测试网
🔄 正在切换到网络: Sepolia Testnet (0xaa36a7)
⚠️ 网络不存在，正在添加: Sepolia Testnet
✅ 网络添加成功: Sepolia Testnet
🔄 已自动切换到新网络
📍 链 ID: 0xaa36a7
💰 原生代币: SepoliaETH
```

### 场景 2: 快速切换多个网络

```javascript
// Ethereum → Polygon
🔄 正在切换到网络: Polygon Mainnet (0x89)
✅ 网络切换成功: Polygon Mainnet
📍 当前链 ID: 0x89

// Polygon → BSC
🔄 正在切换到网络: BSC Mainnet (0x38)
✅ 网络切换成功: BSC Mainnet
📍 当前链 ID: 0x38

// BSC → Ethereum
🔄 正在切换到网络: Ethereum Mainnet (0x1)
✅ 网络切换成功: Ethereum Mainnet
📍 当前链 ID: 0x1
```

### 场景 3: 用户操作失败

```javascript
// 尝试切换
🔄 正在切换到网络: Polygon Mainnet (0x89)

// 用户取消
❌ 切换网络错误: Error: User rejected the request
🚫 用户取消了切换网络
```

---

## 📚 相关文档

- [NETWORK_ERRORS.md](./NETWORK_ERRORS.md) - 网络错误处理指南
- [CHAIN_SWITCHING.md](./CHAIN_SWITCHING.md) - 切换链功能详解
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - 项目总结

---

**文档版本**: v1.0  
**最后更新**: 2025-10-15  
**作者**: ABI Contract Tool Team

