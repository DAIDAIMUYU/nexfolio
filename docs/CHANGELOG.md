# 个人数字平台开发记录 CHANGELOG

> 每次完成修改后，在本文件顶部新增记录。

---

## 2026-05-17：优化 Studio 工作流与内容模型

### 新增

- 新增 slug 工具函数：`generateSlug()`、`normalizeSlug()`、`createUniqueSlug()`、`hasUserEditedSlug()`。
- Studio 新建博客、项目、工具时根据标题 / 名称自动生成 slug；中文标题使用日期加短码 fallback。
- 项目新增独立 `progress` 字段和“项目进度”下拉，避免用标签或发布状态表达开发阶段。
- 新增 Supabase migration：`supabase/migrations/20260517_add_project_progress.sql`。
- 新增 slug helper 测试，覆盖英文 slug、中文 fallback、手动编辑判断和重复短码。

### 优化

- Studio 表单移除 status 下拉、发布按钮和取消发布按钮，统一改为“是否公开”。
- 新建内容默认公开；取消勾选即为不公开 / 草稿，前台仍只读取 `is_published = true`。
- 博客、项目、工具分类均改为固定下拉，减少手输分类导致的数据不一致。
- slug 默认隐藏在“高级设置”，用户手动修改后不再被标题变化覆盖；编辑已有内容时不自动改 slug。
- 项目卡片和项目详情页改为展示“项目进度”，技术栈继续作为标签展示。
- 前台公开读取层严格过滤 `is_published = true`，不再兼容缺失公开标记的旧行。
- 清理 Studio 页面旧发布语义和中文编码残留。

### 验证

- `npm run lint`：通过。
- `npm run test`：通过。
- `npm run build`：通过。
- `npm run test:ui`：通过。
- 额外本地浏览器抽查未完成：Node REPL 环境的 Playwright 未安装对应浏览器缓存；项目自带 Playwright 测试已通过。

### 保留

- 数据库 `status` 字段继续保留用于兼容历史数据，但 UI 和前台逻辑不再依赖 status。
- Supabase 真实项目、环境变量和站主账号仍需人工配置。

---

## 2026-05-17：第二阶段 UI / 架构重构

### 新增

- 新增 `packages/tavern/`，将 Tavern / roleplay 相关源码与文档从 NexFolio 主站隔离，为后续独立部署预留结构。
- 新增首页“个人介绍 + 当前重点”Hero，替换模板化展示卡片。
- 新增前台空状态策略：博客为空显示“暂无文章”，项目为空显示“暂无项目”，工具为空显示“暂无工具”，首页模块为空显示“暂未发布内容”。
- 新增发布内容渲染测试、空状态测试、Supabase 空表测试和草稿隐藏测试。

### 重构

- 主站移除 Tavern import、`/roleplay` 入口和导航项，NexFolio 只保留首页、项目、博客、工具、关于页、Studio 与 Supabase 内容系统。
- 前台内容层取消示例数据 fallback，只读取 Supabase `is_published = true` 内容；未配置、请求失败或空表时返回空数组。
- 清空前台本地项目、博客、工具示例数据，避免真实站点展示演示卡片。
- 首页信息结构调整为 Hero、About / Current Focus、精选项目、最新博客、工具、Footer。
- 统一数据类型、分类常量和卡片文案，减少历史编码残留和模板感。

### 验证

- `npm run lint`：通过。
- `npm run test`：通过，Vitest 覆盖空状态、空表、发布内容显示和草稿隐藏。
- `npm run build`：通过，Vite bundle 已不再包含主站 Tavern 代码。
- `npm run test:ui`：通过，Playwright 覆盖主导航、深层路由、空状态、Studio 登录和移动端宽度。

### 保留

- Studio 后台、Supabase SQL、草稿/发布流程继续保留。
- Tavern 代码未删除，只从主站隔离。
- 当前阶段不拆分线上子站，不引入评论、多用户、支付、Storage、Realtime 或 Edge Function。

---

## 2026-05-16：完成第二阶段 Supabase Studio 轻后台

### 新增

- 安装并接入 `@supabase/supabase-js`，通过 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY` 读取配置。
- 新增统一内容访问层，前台项目、博客、工具优先读取 Supabase 已发布内容。
- 新增 `/studio/login`、`/studio`、`/studio/posts`、`/studio/projects`、`/studio/tools` 及新建/编辑路由。
- 新增 Supabase Auth 邮箱密码登录、受保护 Studio 路由、登出和未配置提示。
- 新增博客、项目、工具的轻量 CRUD 表单，支持草稿、发布、取消发布和删除。
- 新增 `supabase/schema.sql`，包含 `posts`、`projects`、`tools` 表、更新时间 trigger、RLS policy 和后期迁移字段。
- 新增 `.env.example` 和 `docs/SUPABASE_SETUP.md`，说明本地、Vercel、SQL、RLS 和首个站主账号配置方式。
- 新增列表字段转换、Studio 未配置降级和 Playwright Studio 登录页测试。

### 优化

- 首页、项目页、项目详情页、博客页、博客详情页、工具页改为异步读取已发布内容。
- Studio 后台沿用 NexFolio 蓝白极简玻璃风格，桌面和移动端均可使用。
- 保留第一阶段 Vercel rewrite、SEO 文件、横向 rail、404、空状态和 Footer 优化。

### 验证

- `npm run lint`：通过。
- `npm run test`：通过。
- `npm run build`：通过。
- `npm run test:ui`：通过，Playwright 覆盖前台核心路径、横向 rail、移动端导航和 Studio 未配置降级。

### 保留

- 仍需站主手动创建 Supabase 项目、执行 `supabase/schema.sql`、配置本地与 Vercel 环境变量。
- 不在前端暴露 `service_role` key。
- 当前阶段不拆分子站，不做评论、多用户、支付、Storage、Realtime 或 Edge Function。

---

## 2026-05-16：完成第一阶段线上补丁与第一版体验优化

### 新增

- 新增 `vercel.json`，将 Vercel 上所有前端路由 rewrite 到 `/index.html`。
- 新增 `public/favicon.svg`、`public/robots.txt`、`public/sitemap.xml`。
- 为 `index.html` 补充 title、description、Open Graph、Twitter Card 和 theme-color。
- 为横向滑动模块增加左右切换按钮、进度条、边缘渐隐提示和鼠标滚轮横向滚动。
- 新增优雅空状态组件，用于项目、博客、工具筛选为空和详情不存在场景。
- 增强 404 页面，提供返回首页和查看项目入口。
- 增强移动端导航，手机和平板宽度下使用菜单按钮展开导航。

### 优化

- 清理 `hello@nexfolio.dev`、`https://github.com/`、`https://example.com` 等占位内容。
- 无真实访问链接的项目和工具显示“暂未上线”或“查看计划”，不跳转到假地址。
- 统一项目、博客、工具卡片封面比例为更稳定的 16:9 / 4:3 浅蓝视觉面板。
- 项目详情页补充项目背景、为什么做、解决什么问题、技术方案、当前状态、访问链接状态和后续计划。
- 博客详情页优化为更适合长文阅读的正文结构和行宽。
- 工具页强化“自研工具”和“常用资源”区分，并为推荐工具增加视觉标记。
- Footer 增加站点说明、GitHub、Email 状态、版本信息和 Studio 入口预留说明。

### 验证

- `npm run lint`：通过。
- `npm run test`：通过。
- `npm run build`：通过。
- `npm run test:ui`：通过，桌面端覆盖深层路由、SEO 文件、横向滚轮滑动；移动端覆盖菜单导航和 390px / 430px / 768px 宽度。

### 保留

- Supabase 轻后台仍属于第二阶段，本次未引入登录、数据库、RLS 或后台管理代码。
- 博客、项目、工具拆分为独立子站仍为长期架构预留，本次未拆分子站。

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
