# NexFolio

NexFolio 是一个个人数字平台，用来集中展示项目、发布博客内容，并整理常用工具入口。

它既是一个对外展示的个人网站，也是一个长期迭代的内容阵地，包含面向访客的公开页面，以及用于管理内容的轻量 Studio 后台。

## Start

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run test
npm run build
npm run test:ui
```

## Markdown Rendering

- Studio editor keeps plain text Markdown input.
- Public blog details render Markdown automatically.
- Public project details and tool descriptions also render Markdown automatically.
- Supported syntax includes headings, unordered and ordered lists, bold, italic, blockquotes, inline code, fenced code blocks, images, and links.
- Existing database fields stay unchanged, and historical plain text content remains compatible.
