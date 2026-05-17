# Supabase Setup

本文档用于配置 NexFolio 第二阶段轻量真实后台。前台只展示 Supabase 中公开内容；未配置 Supabase 或表为空时显示空状态，不再回退到示例内容。

## 1. 创建 Supabase 项目

1. 登录 Supabase。
2. 新建一个项目。
3. 在 Project Settings -> API 中复制：
   - Project URL
   - anon public key
4. 不要把 `service_role` key 放入前端项目、GitHub 或 Vercel 前端环境变量。

## 2. 执行数据库 SQL

1. 打开 Supabase SQL Editor。
2. 复制并执行仓库中的 `supabase/schema.sql`。
3. SQL 会创建：
   - `posts`
   - `projects`
   - `tools`
4. SQL 已启用 Row Level Security，并包含公开读取已发布内容、站主管理自己内容的基础策略。
5. 如果你已经在旧版本执行过 SQL，请额外执行 `supabase/migrations/20260517_add_project_progress.sql`，为项目表补充独立 `progress` 字段。

## 3. 本地环境变量

复制 `.env.example` 为 `.env.local`，并填写：

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

未填写时：

- 前台显示空状态，不展示 mock / 示例内容。
- `/studio/login` 显示 Supabase 未配置提示。
- 测试不会依赖真实 Supabase 项目。

## 4. 创建第一个后台账号

1. 打开 Supabase Dashboard -> Authentication -> Users。
2. 创建站主邮箱账号。
3. 确认该账号可以使用邮箱密码登录。
4. 当前版本是单站主后台，不开放注册入口。

## 5. Vercel 环境变量

在 Vercel 项目中进入 Settings -> Environment Variables，添加：

```bash
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

保存后重新部署。不要添加 `service_role` key。

## 6. 内容发布规则

- Studio 使用“是否公开”控制 `is_published`。
- `is_published = false` 表示不公开 / 草稿，前台不会显示。
- `is_published = true` 表示公开，前台可以读取。
- 公开内容保存时会写入 `published_at`。
- 数据库历史 `status` 字段保留兼容，但后台 UI 不再显示 status 下拉。
- 前台只读取公开内容；如果 Supabase 请求失败或没有数据，会显示空状态。

## 7. Studio 字段规则

- slug 会根据标题 / 名称自动生成，中文标题会使用日期加短码 fallback。
- slug 默认隐藏在“高级设置”，手动修改后不会被标题变化覆盖。
- 博客、项目、工具分类均使用固定下拉。
- 项目使用独立“项目进度”字段 `progress`，不要再用标签或 status 表示开发阶段。

## 8. RLS 策略说明

- 匿名访客只能读取 `is_published = true` 的内容。
- 登录用户只能新增、编辑、删除 `owner_id = auth.uid()` 的内容。
- 插入内容时 `owner_id` 必须等于当前登录用户。
- 更新和删除也只允许操作自己的内容。
