// @ts-check
import { defineConfig } from 'astro/config';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';

// 判断当前是不是在本地运行 npm run dev
// @ts-ignore
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  // 强制输出纯静态 HTML，彻底解决 Cloudflare Pages 404 找不到网页的问题
  output: 'static',
  
  // 只有在本地运行 npm run dev 时才加载 Keystatic 后台；
  // 线上 Cloudflare 打包 (npm run build) 时只打包文章和主页，不加载动态后台，也不需要 cloudflare adapter
  integrations: isDev ? [react(), keystatic()] : [],
});