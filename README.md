# 🚀 ABI Contract Tool

基于 Solidity ABI 动态生成智能合约交互界面的 Web3 DApp。

## ✨ 功能特性

- ✅ **钱包连接**：支持所有兼容 EIP-1193 的钱包（MetaMask、OKX Wallet、Trust Wallet、Coinbase Wallet 等）
- ✅ **消息签名**：对随机字符串消息进行签名验证（支持多行文本输入）
- ✅ **多链切换**：支持 Ethereum、Sepolia、Polygon、BSC 等 EVM 兼容链
- ✅ **ABI 解析**：输入合约 ABI JSON 和地址，自动生成交互界面
- ✅ **动态调用**：根据 ABI 生成输入框和调用按钮
- ✅ **智能识别**：自动区分只读函数（view/pure）和写入函数（nonpayable/payable）
- ✅ **结果展示**：实时显示调用结果和交易哈希
- ✅ **响应式设计**：支持桌面端和移动端 H5

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **Web3**: Ethers.js v6
- **状态管理**: Zustand
- **图标**: Lucide React

## 📦 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 3. 构建生产版本

```bash
npm run build
npm start
```

## 📖 使用指南

### 1️⃣ 连接钱包

点击右上角「连接钱包」按钮，授权您的 Web3 钱包连接。

**支持的钱包**（基于 EIP-1193 标准）：
- 🦊 MetaMask
- 🅾️ OKX Wallet
- 🛡️ Trust Wallet
- 💙 Coinbase Wallet
- 🐰 Rabby Wallet
- 🦁 Brave Wallet
- 🔷 TokenPocket
- 💎 BitKeep (Bitget Wallet)
- ⚡ imToken
- 📱 Math Wallet

以及其他所有兼容 EIP-1193 标准的 EVM 钱包。

### 2️⃣ 切换网络

连接后点击网络按钮，选择目标区块链网络：

- Ethereum Mainnet
- Sepolia Testnet
- Polygon Mainnet
- BSC Mainnet

### 3️⃣ 消息签名

1. 点击「生成」按钮生成随机消息，或手动输入消息
2. 点击「签名消息」，MetaMask 会弹出签名请求
3. 确认后，签名结果会显示在下方

### 4️⃣ 输入合约信息

**合约地址**：输入已部署的合约地址（0x...）

**ABI JSON**：输入编译好的合约 ABI，例如：

```json
[
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
  }
]
```

💡 **提示**：点击「加载示例 (ERC20)」可以快速加载示例 ABI。

### 5️⃣ 调用合约函数

1. 系统会自动生成所有函数的交互面板
2. 填写函数参数（支持 address、uint256、bool、string 等基本类型）
3. 点击「查询」（只读函数）或「执行交易」（写入函数）
4. 确认 MetaMask 弹窗
5. 等待调用结果

## 📝 支持的参数类型

当前版本支持以下基本类型：

- ✅ `address`：以太坊地址
- ✅ `uint8` ~ `uint256`：无符号整数
- ✅ `int8` ~ `int256`：有符号整数
- ✅ `bool`：布尔值
- ✅ `string`：字符串
- ✅ `bytes`、`bytes32` 等：字节类型

❌ 暂不支持：

- 数组类型（`uint256[]`、`address[]` 等）
- 结构体（`struct`）
- 元组（`tuple`）

## 🌐 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 点击 Deploy，自动构建和部署

### 手动部署

```bash
npm run build
npm start
```





