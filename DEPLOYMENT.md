# 🚀 部署指南

## 部署到 Vercel（推荐）

### 前提条件

1. GitHub 账户
2. Vercel 账户（使用 GitHub 登录）

### 步骤 1：推送代码到 GitHub

```bash
# 创建 GitHub 仓库（在 GitHub 网站操作）
# 仓库名称：abi-contract-tool

# 关联远程仓库
git remote add origin https://github.com/YOUR_USERNAME/abi-contract-tool.git

# 推送代码
git branch -M main
git push -u origin main
```

### 步骤 2：在 Vercel 导入项目

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击「Import Project」
3. 选择「Import Git Repository」
4. 授权 GitHub 并选择 `abi-contract-tool` 仓库
5. 配置项目：
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next
   - **Install Command**: `npm install`

6. 点击「Deploy」

### 步骤 3：等待部署完成

- 构建时间：约 2-3 分钟
- 部署成功后，会生成访问链接：
  - 例如：`https://abi-contract-tool.vercel.app`

### 步骤 4：验证部署

1. 访问生成的链接
2. 测试所有功能：
   - ✅ 连接钱包
   - ✅ 消息签名
   - ✅ 换链操作
   - ✅ ABI 输入和解析
   - ✅ 合约调用

## 环境变量配置

当前项目不需要环境变量。如果未来需要添加（如 RPC 节点、API Key），可以在 Vercel 项目设置中配置：

```bash
# .env.example
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
NEXT_PUBLIC_INFURA_PROJECT_ID=your_infura_id
```

## 自定义域名（可选）

1. 在 Vercel 项目设置中点击「Domains」
2. 添加自定义域名（例如：`contract-tool.yourdomain.com`）
3. 按照提示配置 DNS 记录
4. 等待 DNS 生效（通常 5-10 分钟）

## 持续部署

Vercel 会自动监听 GitHub 仓库的变化：

- **推送到 main 分支** → 自动部署到生产环境
- **推送到其他分支** → 自动部署到预览环境

## 部署到其他平台

### Netlify

```bash
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Railway

1. 访问 [Railway](https://railway.app/)
2. 导入 GitHub 仓库
3. 自动检测 Next.js 项目
4. 点击 Deploy

## 性能优化建议

### 1. 启用 CDN

Vercel 默认启用全球 CDN，无需额外配置。

### 2. 图片优化

使用 Next.js Image 组件（当前项目未使用图片）：

```tsx
import Image from 'next/image';

<Image src="/logo.png" width={100} height={100} alt="Logo" />
```

### 3. 代码分割

已自动启用，无需手动配置。

### 4. 缓存策略

在 `next.config.mjs` 中配置：

```js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

## 监控和分析

### Vercel Analytics

1. 在项目设置中启用 Analytics
2. 查看访问量、性能指标等数据

### Web Vitals

查看 Core Web Vitals 指标：

- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)

## 故障排查

### 问题 1：部署失败

**错误信息**: `Build failed`

**解决方案**:
```bash
# 本地测试构建
npm run build

# 检查错误日志
# 修复后重新推送
```

### 问题 2：钱包连接失败

**原因**: HTTPS 环境下 MetaMask 需要安全上下文

**解决方案**: Vercel 默认启用 HTTPS，无需处理

### 问题 3：API 调用跨域

**解决方案**: 在 `next.config.mjs` 添加：

```js
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
      ],
    },
  ];
}
```

## 回滚部署

如果新部署有问题，可以在 Vercel Dashboard 回滚到之前的版本：

1. 进入项目 → Deployments
2. 找到稳定版本
3. 点击「···」→「Promote to Production」

## 成本

- **Vercel Free Plan**:
  - ✅ 无限部署
  - ✅ 100GB 带宽/月
  - ✅ HTTPS
  - ✅ 全球 CDN
  - ❌ 单个项目限制

- **Vercel Pro Plan** ($20/月):
  - ✅ 无限项目
  - ✅ 1TB 带宽/月
  - ✅ 团队协作

## 最佳实践

1. ✅ 使用 `main` 分支作为生产环境
2. ✅ 使用 `dev` 分支进行开发测试
3. ✅ 每次部署前本地测试 `npm run build`
4. ✅ 定期查看 Vercel Analytics 数据
5. ✅ 保持依赖更新 `npm audit`

## 备份策略

1. 定期备份 GitHub 仓库
2. 导出 Vercel 项目配置
3. 保存 .env 文件（如有）

---

**🎉 部署完成后，您将获得一个可公开访问的 Web3 DApp！**

