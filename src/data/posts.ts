import type { BlogPost } from './types';

export const posts: BlogPost[] = [
  {
    id: 'building-personal-platform',
    title: '从工具集合到个人数字平台',
    summary: '记录 NexFolio 第一版的定位变化、页面结构和测试体系搭建思路。',
    category: '网站搭建',
    tags: ['React', 'Vite', '作品集'],
    date: '2026-05-16',
    cover: '站点建设记录',
    content:
      '最初的需求是一个工具集合站，但长期来看更适合演进为个人数字平台。第一版的关键不是堆功能，而是把项目、博客、工具和关于页放在同一个清晰的叙事里。技术上选择 React、Vite 和 TypeScript，内容先使用本地数据文件管理，方便快速上线，也方便未来迁移到 Markdown 或轻量 CMS。',
  },
  {
    id: 'motion-with-restraint',
    title: '克制动效如何服务阅读体验',
    summary: '滚动入场、卡片悬停和横向滑动都应该轻盈，而不是打断阅读。',
    category: '开发记录',
    tags: ['Framer Motion', '交互', '体验'],
    date: '2026-05-12',
    cover: '动效设计笔记',
    content:
      '个人主站的动效更像呼吸，而不是表演。滚动进入时使用淡入、轻微位移和短时过渡即可。项目与博客模块可以通过横向滑动提供局部切换感，但页面主轴仍然保持纵向滚动，避免变成难以维护的整站幻灯片。',
  },
  {
    id: 'local-data-first',
    title: '为什么第一版先用本地数据',
    summary: '不引入数据库和后台，让第一版聚焦信息架构、页面体验和可维护内容结构。',
    category: '学习笔记',
    tags: ['TypeScript', '数据结构', 'MVP'],
    date: '2026-05-06',
    cover: '本地数据策略',
    content:
      '第一版没有登录、后台、评论和数据库需求。用 TypeScript 数据文件可以获得类型约束，也能让组件开发更直接。等内容量真正增长后，再迁移到 Markdown、CMS 或数据库会更稳妥。',
  },
  {
    id: 'testing-from-day-one',
    title: '从第一天开始建立测试体系',
    summary: '组件测试负责基础渲染和交互，端到端测试负责路由、滑动和响应式。',
    category: '开发记录',
    tags: ['Vitest', 'Testing Library', 'Playwright'],
    date: '2026-05-01',
    cover: '测试体系',
    content:
      '测试不是项目收尾时的补丁。组件测试可以快速验证页面关键内容和筛选逻辑，Playwright 则负责真实浏览器里的页面访问、导航跳转、横向卡片滑动和移动端布局。',
  },
];

export const latestPosts = posts.slice(0, 3);
