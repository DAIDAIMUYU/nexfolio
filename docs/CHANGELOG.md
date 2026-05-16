# 个人数字平台开发记录 CHANGELOG

> 每次完成修改后，在本文件顶部新增记录。

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
