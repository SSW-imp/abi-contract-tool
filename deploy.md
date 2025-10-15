# 🚀 快速部署指南

## 📝 **你需要做的事情**

### 第一步：创建 GitHub 仓库（5 分钟）

1. **访问 GitHub**
   ```
   https://github.com/new
   ```

2. **填写仓库信息**
   ```
   Repository name: abi-contract-tool
   Description: 🔧 Multi-chain ABI Contract Interaction Tool
   Public ✅
   ```

3. **创建后，GitHub 会显示一个页面，上面有你的仓库地址**
   ```
   例如: https://github.com/你的用户名/abi-contract-tool.git
   ```

---

### 第二步：推送代码到 GitHub（2 分钟）

**复制以下命令，替换 `你的用户名` 后执行：**

```bash
# 1. 添加远程仓库（替换 你的用户名）
git remote add origin https://github.com/你的用户名/abi-contract-tool.git

# 2. 推送代码
git branch -M main
git push -u origin main
```

**示例**（假设你的 GitHub 用户名是 `wangshaowen`）：
```bash
git remote add origin https://github.com/wangshaowen/abi-contract-tool.git
git branch -M main
git push -u origin main
```

**如果推送时要求输入密码**：
- 用户名：你的 GitHub 用户名
- 密码：需要使用 Personal Access Token（不是 GitHub 密码）

**如何获取 Personal Access Token**：
1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 勾选 "repo" 权限
4. 生成并复制 Token
5. 在推送时使用 Token 作为密码

---

### 第三步：部署到 Vercel（3 分钟）

1. **访问 Vercel**
   ```
   https://vercel.com
   ```

2. **使用 GitHub 账号登录**
   - 点击 "Sign Up" 或 "Log In"
   - 选择 "Continue with GitHub"
   - 授权 Vercel 访问你的 GitHub

3. **导入项目**
   - 点击 "Add New..." → "Project"
   - 找到 `abi-contract-tool` 仓库
   - 点击 "Import"

4. **配置项目**（保持默认设置即可）
   ```
   Framework Preset: Next.js ✅ (自动检测)
   Root Directory: ./ ✅
   Build Command: npm run build ✅
   Output Directory: .next ✅
   ```

5. **点击 "Deploy"**
   - 等待 2-3 分钟
   - 部署成功！🎉

6. **获取访问链接**
   ```
   https://abi-contract-tool.vercel.app
   或
   https://abi-contract-tool-你的用户名.vercel.app
   ```

---

## ✅ **完成后你会得到**

### 1. GitHub 仓库地址
```
https://github.com/你的用户名/abi-contract-tool
```

### 2. Vercel 部署链接
```
https://abi-contract-tool.vercel.app
```

### 3. 可以分享的链接
```
📦 源码: https://github.com/你的用户名/abi-contract-tool
🌐 在线演示: https://abi-contract-tool.vercel.app
```

---

## 🎯 **测试部署是否成功**

访问你的 Vercel 链接，测试以下功能：

- ✅ 页面正常加载
- ✅ 连接钱包
- ✅ 切换网络
- ✅ 加载 USDC 示例
- ✅ 调用合约函数

---

## 🔧 **如果遇到问题**

### 问题 1: 推送代码时提示 "Permission denied"

**解决方案**：使用 Personal Access Token

```bash
# 1. 访问 https://github.com/settings/tokens
# 2. 生成新 Token（勾选 repo 权限）
# 3. 推送时使用 Token 作为密码
```

### 问题 2: Vercel 部署失败

**解决方案**：查看构建日志

```bash
# 1. 在 Vercel Dashboard 点击失败的部署
# 2. 查看 "Building" 日志
# 3. 根据错误信息修复
```

### 问题 3: 网站无法访问

**解决方案**：等待 DNS 传播

```bash
# 部署成功后，可能需要等待 1-2 分钟
# 刷新页面或清除浏览器缓存
```

---

## 📞 **需要帮助？**

如果遇到任何问题，可以：

1. 查看 Vercel 文档：https://vercel.com/docs
2. 查看 GitHub 文档：https://docs.github.com
3. 或者告诉我具体的错误信息，我来帮你解决

---

**祝部署顺利！🚀**

