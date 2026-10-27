// @ts-check
import { defineConfig } from 'astro/config';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// 判断当前是不是本地开发模式 (npm run dev)
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  integrations: [react(), keystatic()],
  // 本地开发时不加载 cloudflare 适配器，线上构建 (npm run build) 时才加载
  adapter: isDev ? undefined : cloudflare(),
});