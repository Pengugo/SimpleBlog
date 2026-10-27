import { config, fields, collection } from '@keystatic/core';

export default config({
  // 本地开发时使用 local，部署到线上时建议通过环境变量切换为 github
  storage: {
    kind: process.env.PUBLIC_KEYSTATIC_STORAGE === 'github' ? 'github' : 'local',
    repo: {
      owner: 'Pengugo',
      name: 'my-notes',
    },
  },
  collections: {
    notes: collection({
      label: '随笔列表',
      slugField: 'title',
      path: 'src/content/notes/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: '随笔标题' } }),
        publishedDate: fields.date({
          label: '发布日期',
          defaultValue: { kind: 'today' },
        }),
        tags: fields.array(fields.text({ label: '标签' }), {
          label: '标签',
          itemLabel: (props) => props.value || '请填写标签',
        }),
        content: fields.markdoc({
          label: '内容正文',
        }),
      },
    }),
  },
});