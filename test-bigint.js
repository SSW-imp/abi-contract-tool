// 测试 BigInt 运算
const estimatedGas = 21000n; // 模拟 Gas 估算结果

// 添加 20% 余量
const gasWithMargin = (estimatedGas * 120n) / 100n;

console.log('原始 Gas:', estimatedGas.toString());
console.log('添加 20% 后:', gasWithMargin.toString());
console.log('计算正确:', gasWithMargin === 25200n);

// 验证类型
console.log('类型:', typeof gasWithMargin); // 应该是 'bigint'

