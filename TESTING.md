# 🧪 测试指南

## 测试环境准备

### 1. 安装 MetaMask

- 浏览器安装 [MetaMask](https://metamask.io/) 扩展
- 创建或导入钱包账户

### 2. 获取测试币

访问以下水龙头获取测试币：

- **Sepolia Testnet**: https://sepoliafaucet.com/
- **Polygon Mumbai**: https://faucet.polygon.technology/

## 功能测试清单

### ✅ 功能点 1：连接钱包

1. 打开应用 http://localhost:3000
2. 点击右上角「连接钱包」按钮
3. MetaMask 弹窗，点击「连接」
4. ✓ 成功后显示地址（例：0x1234...5678）

### ✅ 功能点 2：消息签名

1. 确保钱包已连接
2. 在「消息签名」面板点击「生成」按钮
3. 或手动输入消息：`Hello Web3`
4. 点击「签名消息」
5. MetaMask 弹窗，点击「签名」
6. ✓ 签名结果显示在下方（0x 开头的十六进制字符串）

### ✅ 功能点 3：换链操作

1. 点击网络按钮（默认显示 Ethereum Mainnet）
2. 选择其他网络（如 Sepolia Testnet）
3. MetaMask 弹窗，点击「切换网络」
4. ✓ 网络按钮显示更新为新网络名称

### ✅ 功能点 4 & 5：输入 ABI 和合约地址

**测试案例 1：使用示例 ERC20 ABI**

1. 点击「加载示例 (ERC20)」
2. ✓ ABI 输入框自动填充 JSON
3. ✓ 右侧自动生成 4 个函数面板：
   - balanceOf (View)
   - transfer (Write)
   - approve (Write)
   - totalSupply (View)

**测试案例 2：手动输入 ABI**

```json
[
  {
    "type": "function",
    "name": "getName",
    "inputs": [],
    "outputs": [{"name": "", "type": "string"}],
    "stateMutability": "view"
  }
]
```

✓ 右侧生成 1 个函数面板

### ✅ 功能点 6 & 7：调用合约

**测试合约：USDC on Sepolia**

- **合约地址**: `0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238`
- **网络**: Sepolia Testnet
- **ABI**: 使用示例 ERC20 ABI

**测试步骤：**

1. 切换到 Sepolia Testnet
2. 输入 USDC 合约地址
3. 加载示例 ERC20 ABI

**测试 View 函数（totalSupply）：**

1. 找到 `totalSupply` 函数面板
2. 直接点击「查询」按钮
3. ✓ 返回结果显示（例：1000000000000）

**测试 View 函数（balanceOf）：**

1. 找到 `balanceOf` 函数面板
2. 输入参数 `account`: 你的钱包地址
3. 点击「查询」
4. ✓ 返回你的 USDC 余额

**测试 Write 函数（approve）：**

1. 找到 `approve` 函数面板
2. 输入参数：
   - `spender`: `0x0000000000000000000000000000000000000001`
   - `amount`: `1000000`
3. 点击「执行交易」
4. MetaMask 弹窗，点击「确认」
5. 等待交易确认
6. ✓ 显示「交易成功！Gas Used: xxx」和交易哈希

## 错误场景测试

### ❌ 测试 1：未连接钱包

1. 断开钱包连接
2. 尝试签名消息
3. ✓ 显示「请先连接钱包」

### ❌ 测试 2：ABI 格式错误

1. 输入无效 JSON: `{invalid json}`
2. ✓ 显示「ABI 解析失败: Unexpected token ...」

### ❌ 测试 3：合约地址格式错误

1. 输入错误地址: `0x123`
2. ✓ 显示「合约地址格式不正确」

### ❌ 测试 4：参数类型错误

1. 在 `uint256` 类型参数输入: `abc`
2. 点击调用
3. ✓ 显示「参数解析失败」

### ❌ 测试 5：合约不存在

1. 输入不存在的地址: `0x0000000000000000000000000000000000000000`
2. 调用函数
3. ✓ 显示「调用失败」

## 性能测试

### 测试加载时间

1. 打开 Chrome DevTools → Network
2. 刷新页面
3. ✓ FCP (First Contentful Paint) < 2s
4. ✓ LCP (Largest Contentful Paint) < 3s

### 测试大型 ABI

1. 输入包含 50+ 函数的 ABI
2. ✓ 页面渲染流畅，无卡顿
3. ✓ 所有函数面板正常展开

## 浏览器兼容性

- ✅ Chrome 100+
- ✅ Firefox 100+
- ✅ Edge 100+
- ❌ Safari（MetaMask 不支持）

## 测试报告示例

```
测试日期: 2025-10-14
测试人员: 王少文
测试环境: Chrome 120, MetaMask 11.0

功能点 1 - 连接钱包: ✅ PASS
功能点 2 - 消息签名: ✅ PASS
功能点 3 - 换链操作: ✅ PASS
功能点 4 - ABI 输入: ✅ PASS
功能点 5 - 动态生成UI: ✅ PASS
功能点 6 - 合约调用: ✅ PASS
功能点 7 - 结果展示: ✅ PASS

Bug 数量: 0
评估结果: 所有功能正常
```

## 已知限制

1. ❌ 不支持数组类型参数（`uint256[]`）
2. ❌ 不支持结构体类型（`struct`）
3. ❌ 不支持元组类型（`tuple`）
4. ⚠️ 仅支持 MetaMask 钱包
5. ⚠️ 需要手动输入合约地址（无地址验证服务）

## 改进建议

1. 添加合约地址簿（保存常用合约）
2. 支持通过 Etherscan API 自动获取 ABI
3. 添加交易历史记录
4. 支持批量调用（MultiCall）
5. 添加参数预设模板

