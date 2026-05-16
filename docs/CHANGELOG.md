# 个人数字平台开发记录 CHANGELOG

> 每次完成修改后，在本文件顶部新增记录。

---

## 2026-05-16：记录线上复测问题、后台计划与长期拆分架构

### 新增

- 记录 Vercel 深层路由刷新 404 问题。
- 记录 SEO 基础文件缺失问题。
- 记录占位内容清理任务。
- 记录横向滑动模块滚轮交互问题。
- 记录横向模块缺少操作提示问题。
- 记录卡片视觉比例问题。
- 记录移动端导航复查任务。
- 追加第二阶段 Supabase 轻后台规划。
- 追加长期总站 + 子站拆分架构预留。
- 明确当前阶段不拆分子站，只预留数据结构和路由迁移思路。

### 待修复

- React Router 部署到 Vercel 后需配置 rewrite。
- 横向滑动容器需要支持鼠标滚轮横向滚动。
- 卡片封面和外层比例需要重新调整。
- `robots.txt`、`sitemap.xml`、favicon 需要补齐。
- 示例链接和示例邮箱需要清理。
- 移动端导航需要复查。

### 下一步

- 先完成第一阶段线上补丁。
- 线上补丁复测通过后，再进入第二阶段 Supabase 后台。
- Supabase 后台完成后，再根据内容规模评估是否拆分博客、项目或工具子站。
- 不要在本轮补丁中直接引入 Supabase，避免第一阶段修复范围失控。
- 不要在当前阶段拆分子站，避免架构过早复杂化。

---

## 2026-05-16：完成第一版 React + Vite 站点

### 新增

- 初始化 React + Vite + TypeScript 前端项目。
- 安装并配置 React Router、Framer Motion、ESLint、Prettier、Vitest、Testing Library、jest-dom、jsdom、Playwright。
- 配置 `npm run dev`、`npm run build`、`npm run lint`、`npm run format`、`npm run test`、`npm run test:ui`。
- 新增全局布局、顶部导航、Footer、蓝白极简拟态主题样式。
- 新增首页、项目页、项目详情页、博客页、博客详情页、工具页、关于页。
- 新增本地数据文件：`site.ts`、`projects.ts`、`posts.ts`、`tools.ts`、`categories.ts`、`types.ts`。
- 新增共享组件：项目卡片、博客卡片、工具卡片、横向滑动容器、筛选胶囊、动效页面与动效区块。
- 新增 Vitest 组件测试与 Playwright 端到端测试。
- 新增项目内 Playwright 浏览器运行目录 `.playwright-browsers`，避免依赖用户系统浏览器目录。
- 新增 `scripts/run-playwright.mjs`，用于启动 Vite、执行 Playwright、结束测试服务。

### 修改

- 将 Playwright 精确锁定到兼容当前 Node 18.17.0 的 `1.42.1`。
- 将 ESLint 配置调整为兼容当前 Node 版本的 ESLint 8 + TypeScript ESLint 6。
- 修正 `tsconfig.node.json`，避免 `tsc -b` 生成配置文件副产物。

### 修复

- 修复 jsdom 环境缺少 `IntersectionObserver` 和 `ResizeObserver` 导致 Framer Motion 组件测试失败的问题。
- 修复 Vitest 扫描 Playwright e2e 文件的问题。
- 修复 Playwright 选择器匹配过宽导致导航测试失败的问题。
- 修复首页精选项目卡片数量不足导致桌面端横向滑动测试无溢出的问题。

### 已完成任务

- 对应 `TASKS.md`：项目初始化、全局布局、首页、项目页、项目详情页、博客页、博客详情页、工具页、关于页、动效交互、响应式适配、基础测试体系。

### 验证

- `npm run lint`：通过。
- `npm run test`：通过。
- `npm run build`：通过。
- `npm run test:ui`：通过。

### 待处理

- npm 审计报告存在依赖漏洞提示，暂未执行强制修复，避免破坏当前兼容 Node 18.17.0 的工具链。

---

## 2026-05-16：需求文档创建

### 新增

- 创建《个人数字平台主需求书 PRD》。
- 创建《开发任务清单 TASKS》。
- 创建《开发记录 CHANGELOG》。
- 创建《验收标准 ACCEPTANCE》。
- 确认项目名称为“个人数字平台”。
- 确认视觉方向为蓝白极简拟态风。
- 确认交互方向为“纵向主滚动 + 局部切换式展示”。
- 确认首页视觉参考图 `docs/assets/homepage-concept.png`。
