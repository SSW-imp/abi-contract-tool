# 📦 手动上传到 GitHub 指南

## 第一步：准备上传文件

### 需要上传的文件和文件夹：

```
✅ 需要上传的：
├── app/                    # Next.js 应用目录
├── components/             # 组件目录
├── store/                  # 状态管理
├── types/                  # TypeScript 类型
├── public/                 # 静态资源（如果有）
├── .gitignore             # Git 忽略文件
├── next.config.mjs        # Next.js 配置
├── package.json           # 依赖配置
├── package-lock.json      # 锁定依赖版本
├── tsconfig.json          # TypeScript 配置
├── tailwind.config.ts     # Tailwind 配置
├── postcss.config.mjs     # PostCSS 配置
├── README.md              # 项目说明
└── DEPLOY_GUIDE.md        # 部署指南

❌ 不要上传：
├── node_modules/          # 依赖包（太大，Vercel 会自动安装）
├── .next/                 # 构建产物（Vercel 会重新构建）
├── .git/                  # Git 历史（不需要）
└── deploy.md              # 临时文件
```

---

## 第二步：选择上传方式

### 🎯 方式 A：逐个文件上传（推荐，最简单）

#### 1. 访问你的 GitHub 仓库
```
https://github.com/SSW-imp/abi-contract-tool
```

#### 2. 上传文件夹和文件

**上传单个文件**：
1. 点击 "Add file" → "Upload files"
2. 拖拽或选择文件
3. 写提交信息：`Initial commit`
4. 点击 "Commit changes"

**上传文件夹**（需要逐个上传）：

##### a) 上传 app 文件夹
1. 点击 "Add file" → "Create new file"
2. 在文件名输入框输入：`app/globals.css`
3. 复制 `E:\web3\abi-contract-tool\app\globals.css` 的内容
4. 粘贴进去
5. 点击 "Commit changes"
6. 重复以上步骤，上传 `app/layout.tsx` 和 `app/page.tsx`

##### b) 上传 components 文件夹
1. 点击 "Add file" → "Create new file"
2. 输入：`components/ABIInput.tsx`
3. 复制内容，提交
4. 重复上传其他组件文件：
   - `components/WalletConnect.tsx`
   - `components/MessageSigner.tsx`
   - `components/ContractInteraction.tsx`

##### c) 上传 store 文件夹
1. 创建：`store/walletStore.ts`
2. 复制内容，提交

##### d) 上传 types 文件夹
1. 创建：`types/index.ts`
2. 复制内容，提交

##### e) 上传配置文件（在根目录）
依次上传：
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `next.config.mjs`
- `tailwind.config.ts`
- `postcss.config.mjs`
- `README.md`
- `.gitignore`

---

### 🎯 方式 B：使用压缩包上传（更快）

#### 1. 手动创建压缩包

**Windows 操作步骤**：

1. 打开 `E:\web3\abi-contract-tool` 文件夹
2. 选择需要的文件和文件夹（按住 Ctrl 多选）：
   ```
   ✅ 选择这些：
   - app 文件夹
   - components 文件夹
   - store 文件夹
   - types 文件夹
   - package.json
   - package-lock.json
   - tsconfig.json
   - next.config.mjs
   - tailwind.config.ts
   - postcss.config.mjs
   - README.md
   - .gitignore
   ```

3. 右键 → "发送到" → "压缩(zipped)文件夹"
4. 命名为：`abi-contract-tool.zip`

#### 2. 解压并上传到 GitHub

**但是 GitHub 不支持直接上传 zip 并解压**，所以这个方式需要配合 GitHub Desktop 使用。

---

## 第三步：推荐的上传步骤（详细）

由于文件较多，我建议分批上传：

### 批次 1：配置文件（最重要）

在 GitHub 仓库页面：

1. 点击 "Add file" → "Upload files"
2. 拖拽这些文件：
   - `package.json`
   - `package-lock.json`
   - `tsconfig.json`
   - `next.config.mjs`
   - `tailwind.config.ts`
   - `postcss.config.mjs`
   - `README.md`
3. 提交信息：`Add configuration files`
4. 点击 "Commit changes"

### 批次 2：类型定义

1. 点击 "Add file" → "Create new file"
2. 文件名：`types/index.ts`
3. 复制 `E:\web3\abi-contract-tool\types\index.ts` 的全部内容
4. 粘贴，点击 "Commit changes"

### 批次 3：状态管理

1. 点击 "Add file" → "Create new file"
2. 文件名：`store/walletStore.ts`
3. 复制 `E:\web3\abi-contract-tool\store\walletStore.ts` 的内容
4. 粘贴，点击 "Commit changes"

### 批次 4：组件

逐个创建：
1. `components/ABIInput.tsx`
2. `components/WalletConnect.tsx`
3. `components/MessageSigner.tsx`
4. `components/ContractInteraction.tsx`

### 批次 5：App 文件

逐个创建：
1. `app/globals.css`
2. `app/layout.tsx`
3. `app/page.tsx`

---

## 第四步：验证上传

上传完成后，你的仓库应该有这样的结构：

```
abi-contract-tool/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ABIInput.tsx
│   ├── WalletConnect.tsx
│   ├── MessageSigner.tsx
│   └── ContractInteraction.tsx
├── store/
│   └── walletStore.ts
├── types/
│   └── index.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── README.md
└── .gitignore
```

---

## 第五步：部署到 Vercel

### 1. 访问 Vercel
```
https://vercel.com
```

### 2. 使用 GitHub 登录
- 点击 "Sign Up" 或 "Log In"
- 选择 "Continue with GitHub"
- 授权 Vercel

### 3. 导入项目
- 点击 "Add New..." → "Project"
- 找到 `abi-contract-tool` 仓库
- 点击 "Import"

### 4. 配置（保持默认）
```
Framework Preset: Next.js ✅
Root Directory: ./ ✅
Build Command: npm run build ✅
Output Directory: .next ✅
```

### 5. 部署
- 点击 "Deploy"
- 等待 2-3 分钟
- 完成！🎉

### 6. 获取链接
```
https://abi-contract-tool.vercel.app
或
https://abi-contract-tool-你的vercel用户名.vercel.app
```

---

## 🎯 快速检查清单

上传前确认：

- [ ] 已删除 node_modules 文件夹
- [ ] 已删除 .next 文件夹
- [ ] 已删除 .git 文件夹
- [ ] package.json 文件存在
- [ ] 所有 TypeScript 文件都已上传
- [ ] 配置文件都已上传

---

## 💡 小技巧

### 如果文件太多，可以用 GitHub 网页版编辑器

1. 在仓库页面按键盘 `.` 键（句点）
2. 会打开 VS Code 网页版
3. 可以在浏览器中直接编辑和创建文件
4. 保存时会自动提交到 GitHub

---

## 📞 需要帮助？

如果遇到问题：

1. 截图当前状态
2. 告诉我卡在哪一步
3. 我会继续指导你

---

**现在开始上传吧！加油！🚀**

