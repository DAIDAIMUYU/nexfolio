export type ProjectType = '个人网站' | 'AI 应用' | '自动化工具' | '角色系统' | '小程序' | '实验项目';

export type ProjectProgress = '构思中' | '开发中' | '测试中' | '已上线' | '持续维护' | '已暂停' | '已归档';

export type ProjectStatus = ProjectProgress;

export type BlogCategory = '开发记录' | '项目复盘' | 'AI 工具' | '学习笔记' | '网站搭建' | '生活想法';

export type ToolCategory = '自研工具' | 'AI 工具' | '开发工具' | '效率工具' | '资源收藏' | '常用链接';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  status: ProjectProgress;
  progress: ProjectProgress;
  tags: string[];
  techStack: string[];
  cover?: string;
  demoUrl?: string;
  githubUrl?: string;
  detail: string;
  background: string;
  reason: string;
  problem: string;
  solution: string;
  features: string[];
  linkStatus: string;
  futurePlan?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  category: BlogCategory;
  tags: string[];
  date: string;
  cover?: string;
  content: string[];
}

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  url?: string;
  icon?: string;
  isSelfBuilt: boolean;
  isRecommended?: boolean;
  status?: '可访问' | '暂未上线';
}
