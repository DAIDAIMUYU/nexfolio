import type { ProjectItem } from './types';

export const projects: ProjectItem[] = [
  {
    id: 'nexfolio',
    title: 'NexFolio 个人数字平台',
    description: '聚合项目、文章、工具与个人方向的主站入口。',
    type: '个人网站',
    status: '开发中',
    tags: ['个人主页', '作品集', '内容聚合'],
    techStack: ['React', 'TypeScript', 'Vite', 'Framer Motion'],
    demoUrl: '/',
    githubUrl: 'https://github.com/',
    cover: '数字主站界面',
    background: '早期工具集合站过于松散，无法承载项目复盘、博客和长期作品展示。',
    detail:
      'NexFolio 将个人主页、项目作品、博客记录和工具入口收束成统一的蓝白极简空间，方便未来持续挂载新的数字产品。',
    features: ['统一导航与响应式布局', '本地 TypeScript 数据管理', '项目与博客详情路由', '横向卡片滑动体验'],
    futurePlan: ['接入 Markdown 内容源', '扩展 Lab 实验室栏目', '补充真实线上项目截图'],
  },
  {
    id: 'ai-prompt-desk',
    title: 'AI Prompt Desk',
    description: '用于沉淀常用提示词、场景模板和复盘笔记的轻量工具。',
    type: 'AI 应用',
    status: '计划中',
    tags: ['AI', '提示词', '知识管理'],
    techStack: ['React', 'Local Storage', 'OpenAI API'],
    cover: '提示词工作台',
    background: '日常使用 AI 时，常用场景和优质提示词容易散落在不同笔记中。',
    detail:
      '该工具计划提供模板管理、标签筛选、复制使用和效果记录，让高频 AI 工作流可以被持续优化。',
    features: ['提示词分类', '模板快速复制', '使用记录', '效果评分'],
    futurePlan: ['完成离线版本', '探索同步能力'],
  },
  {
    id: 'mini-automation-hub',
    title: 'Mini Automation Hub',
    description: '收纳个人自动化脚本与小型工作流的入口页。',
    type: '自动化工具',
    status: '维护中',
    tags: ['脚本', '效率', '自动化'],
    techStack: ['Node.js', 'PowerShell', 'GitHub Actions'],
    demoUrl: 'https://example.com',
    cover: '自动化入口',
    background: '重复性的本地任务、检查任务和发布任务需要统一的说明与入口。',
    detail:
      '该项目偏向个人内部使用，记录脚本用途、触发方式、依赖环境和运行注意事项。',
    features: ['脚本目录', '执行说明', '状态标记', '更新记录'],
    futurePlan: ['加入运行日志视图', '整理为公开模板'],
  },
  {
    id: 'glass-note',
    title: 'Glass Note',
    description: '蓝白玻璃风格的极简在线笔记原型。',
    type: '网页工具',
    status: '已暂停',
    tags: ['笔记', '原型', 'UI'],
    techStack: ['React', 'CSS Modules'],
    cover: '玻璃笔记原型',
    background: '探索轻拟态和玻璃质感在长文本编辑场景中的可读性。',
    detail:
      '这是一个视觉实验项目，主要验证卡片层级、柔和阴影和留白对写作体验的影响。',
    features: ['笔记列表', '编辑区域', '主题变量', '响应式面板'],
    futurePlan: ['保留为设计实验素材'],
  },
];

export const featuredProjects = projects;
