# 🚀 GitHub + Vercel 部署指南

## 📋 部署步骤

### 第一步：创建 GitHub 仓库

#### 1. 在 GitHub 上创建新仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   ```
   Repository name: abi-contract-tool
   Description: 🔧 Multi-chain ABI Contract Interaction Tool - Support 10+ wallets
   Public ✅ (选择 Public，这样 Vercel 可以免费部署)
   ❌ 不要勾选 "Add a README file"
   ❌ 不要勾选 ".gitignore"
   ❌ 不要勾选 "Choose a license"
   ```
3. 点击 **Create repository**

#### 2. 关联本地仓库到 GitHub

在项目目录下执行以下命令：

```bash
# 1. 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/abi-contract-tool.git

# 2. 查看远程仓库
git remote -v

# 3. 推送代码到 GitHub
git branch -M main
git push -u origin main
```

**示例**：
```bash
# 假设你的 GitHub 用户名是 wangshaowen
git remote add origin https://github.com/wangshaowen/abi-contract-tool.git
git branch -M main
git push -u origin main
```

---

### 第二步：部署到 Vercel

#### 方式一：通过 Vercel 网站部署（推荐）

1. **访问 Vercel**
   - 打开 https://vercel.com
   - 点击右上角 **Sign Up** 或 **Log In**
   - 使用 GitHub 账号登录（推荐）

2. **导入项目**
   - 登录后，点击 **Add New...** → **Project**
   - 选择 **Import Git Repository**
   - 找到你的 `abi-contract-tool` 仓库
   - 点击 **Import**

3. **配置项目**
   ```
   Project Name: abi-contract-tool
   Framework Preset: Next.js (自动检测)
   Root Directory: ./
   Build Command: npm run build (自动填充)
   Output Directory: .next (自动填充)
   Install Command: npm install (自动填充)
   ```

4. **环境变量**（可选）
   - 暂时不需要配置环境变量
   - 点击 **Deploy**

5. **等待部署**
   - 部署时间约 2-3 分钟
   - 部署成功后会显示：
     ```
     🎉 Congratulations!
     Your project is live at: https://abi-contract-tool.vercel.app
     ```

#### 方式二：通过 Vercel CLI 部署

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署项目
vercel

# 4. 部署到生产环境
vercel --prod
```

---

### 第三步：验证部署

#### 1. 访问网站
```
https://abi-contract-tool.vercel.app
或
https://abi-contract-tool-你的用户名.vercel.app
```

#### 2. 测试功能
- ✅ 连接钱包
- ✅ 切换网络
- ✅ 加载 USDC 示例
- ✅ 调用合约函数
- ✅ 消息签名

---

## 🔧 常见问题

### Q1: 推送代码时提示 "Permission denied"

**解决方案**：
```bash
# 方法 1: 使用 HTTPS + Personal Access Token
# 1. 访问 https://github.com/settings/tokens
# 2. 点击 "Generate new token (classic)"
# 3. 勾选 "repo" 权限
# 4. 生成 Token 并复制
# 5. 推送时使用 Token 作为密码

# 方法 2: 使用 SSH
# 1. 生成 SSH 密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 2. 添加 SSH 密钥到 GitHub
# 访问 https://github.com/settings/keys
# 添加 ~/.ssh/id_ed25519.pub 的内容

# 3. 修改远程仓库地址
git remote set-url origin git@github.com:YOUR_USERNAME/abi-contract-tool.git
```

### Q2: Vercel 部署失败

**常见原因和解决方案**：

1. **构建失败**
   ```bash
   # 本地测试构建
   npm run build
   
   # 如果本地构建成功，检查 Vercel 日志
   ```

2. **依赖安装失败**
   ```bash
   # 删除 node_modules 和 package-lock.json
   rm -rf node_modules package-lock.json
   
   # 重新安装
   npm install
   
   # 提交更新
   git add package-lock.json
   git commit -m "Update dependencies"
   git push
   ```

3. **环境变量问题**
   - 在 Vercel Dashboard → Settings → Environment Variables 中添加

### Q3: 网站无法连接钱包

**原因**：Vercel 默认使用 HTTPS，钱包扩展需要安全连接。

**解决方案**：
- ✅ Vercel 自动提供 HTTPS，无需额外配置
- ✅ 确保使用 `https://` 访问网站

### Q4: 如何更新部署？

```bash
# 1. 修改代码
# 2. 提交到 Git
git add .
git commit -m "Update: 描述你的更改"
git push

# 3. Vercel 会自动检测并重新部署（约 2-3 分钟）
```

---

## 📊 部署后的 URL 结构

### 生产环境 URL
```
https://abi-contract-tool.vercel.app
```

### 预览环境 URL（每次 Push 都会生成）
```
https://abi-contract-tool-git-分支名-你的用户名.vercel.app
```

### 自定义域名（可选）
```
1. 在 Vercel Dashboard → Settings → Domains
2. 添加你的域名
3. 配置 DNS 记录
```

---

## 🎯 完整命令清单

### 初次部署
```bash
# 1. 创建 GitHub 仓库（在网页上操作）

# 2. 关联远程仓库
git remote add origin https://github.com/YOUR_USERNAME/abi-contract-tool.git

# 3. 推送代码
git branch -M main
git push -u origin main

# 4. 在 Vercel 网站导入项目
# 访问 https://vercel.com/new
```

### 后续更新
```bash
# 1. 修改代码
# 2. 提交更改
git add .
git commit -m "描述你的更改"
git push

# 3. Vercel 自动部署（无需手动操作）
```

---

## 📝 项目信息模板

### GitHub 仓库描述
```
🔧 Multi-chain ABI Contract Interaction Tool

✨ Features:
- 🔌 Support 10+ EIP-1193 compatible wallets
- 🌐 Multi-chain support (Ethereum, Polygon, BSC, Sepolia)
- 🔄 Auto-detect and add networks
- 📝 Message signing
- 🎨 Beautiful UI with Tailwind CSS
- 📱 Mobile responsive

🛠️ Tech Stack:
- Next.js 14
- TypeScript
- Ethers.js v6
- Zustand
- Tailwind CSS

🚀 Live Demo: https://abi-contract-tool.vercel.app
```

### GitHub Topics（标签）
```
web3
blockchain
ethereum
nextjs
typescript
dapp
smart-contracts
ethers
wallet
defi
```

---

## 🎉 部署成功后

### 1. 更新 README.md
在 README.md 顶部添加徽章：

```markdown
# ABI Contract Tool

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/abi-contract-tool)
[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://abi-contract-tool.vercel.app)
[![GitHub](https://img.shields.io/github/stars/YOUR_USERNAME/abi-contract-tool?style=social)](https://github.com/YOUR_USERNAME/abi-contract-tool)
```

### 2. 分享链接
```
GitHub: https://github.com/YOUR_USERNAME/abi-contract-tool
Live Demo: https://abi-contract-tool.vercel.app
```

### 3. 添加到简历
```
项目名称：ABI Contract Tool
项目地址：https://github.com/YOUR_USERNAME/abi-contract-tool
在线演示：https://abi-contract-tool.vercel.app
技术栈：Next.js 14 + TypeScript + Ethers.js v6 + Zustand
```

---

## 💡 优化建议

### 1. 添加 Google Analytics（可选）
```typescript
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 2. 添加 SEO 优化
```typescript
// app/layout.tsx
export const metadata = {
  title: 'ABI Contract Tool - Multi-chain Smart Contract Interaction',
  description: 'Interact with any EVM smart contract using ABI. Support Ethereum, Polygon, BSC, and more.',
  keywords: 'web3, blockchain, ethereum, smart contract, abi, dapp',
  openGraph: {
    title: 'ABI Contract Tool',
    description: 'Multi-chain Smart Contract Interaction Tool',
    url: 'https://abi-contract-tool.vercel.app',
    siteName: 'ABI Contract Tool',
    images: ['/og-image.png'],
  },
};
```

### 3. 添加性能监控
```bash
# 在 Vercel Dashboard → Analytics 中启用
# 可以查看：
# - 页面加载时间
# - Core Web Vitals
# - 访问量统计
```

---

## 🔒 安全建议

### 1. 不要提交敏感信息
```bash
# .gitignore 已包含：
node_modules/
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### 2. 使用环境变量
```bash
# 如果需要 API Key，在 Vercel 中配置
# Settings → Environment Variables
NEXT_PUBLIC_INFURA_KEY=your_key
NEXT_PUBLIC_ALCHEMY_KEY=your_key
```

### 3. 启用 Vercel 安全功能
```
- ✅ HTTPS（自动启用）
- ✅ DDoS Protection（自动启用）
- ✅ Edge Network（自动启用）
```

---

## 📞 需要帮助？

如果遇到问题，可以：

1. **查看 Vercel 文档**
   - https://vercel.com/docs

2. **查看 Next.js 文档**
   - https://nextjs.org/docs

3. **查看部署日志**
   - Vercel Dashboard → Deployments → 点击具体部署 → View Function Logs

---

**祝部署顺利！🎉**

