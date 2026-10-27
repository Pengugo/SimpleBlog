import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    // 本地运行 npm run dev 时直接读写本地文件；部署到线上后通过 GitHub 读写
    kind: import.meta.env.DEV ? 'local' : 'github',
    repo: {
      owner: 'Pengugo',
      name: 'SimpleBlog',
    },
  },
  collections: {
    posts: collection({
      label: '我的随笔',
      slugField: 'title',
      // 直接指向你现有的随笔目录
      path: 'src/pages/posts/*',
      // 生成标准的 .md 文件（而不是默认的 .mdoc），完美兼容你现有的代码
      format: { contentField: 'content' },
      schema: {
        layout: fields.text({
          label: '页面布局 (请勿修改)',
          defaultValue: '../../layouts/PostLayout.astro',
        }),
        title: fields.slug({
          name: { label: '随笔标题' },
        }),
        date: fields.date({
          label: '发布日期',
          defaultValue: { kind: 'today' },
        }),
        content: fields.markdoc({
          label: '随笔正文',
          extension: 'md',
        }),
      },
    }),
  },
});