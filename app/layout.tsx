import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABI Contract Tool - 动态合约交互工具",
  description: "基于 ABI 动态生成智能合约交互界面，支持 MetaMask 钱包连接、多链切换、消息签名等功能",
  keywords: "Web3, Ethereum, Smart Contract, ABI, MetaMask, DApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

