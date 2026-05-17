import type { BlogCategory, ProjectProgress, ProjectType, ToolCategory } from './types';

export const projectTypes: ProjectType[] = ['个人网站', 'AI 应用', '自动化工具', '角色系统', '小程序', '实验项目'];

export const projectProgressOptions: ProjectProgress[] = ['构思中', '开发中', '测试中', '已上线', '持续维护', '已暂停', '已归档'];

export const projectStatuses = projectProgressOptions;

export const blogCategories: BlogCategory[] = ['开发记录', '项目复盘', 'AI 工具', '学习笔记', '网站搭建', '生活想法'];

export const toolCategories: ToolCategory[] = ['自研工具', 'AI 工具', '开发工具', '效率工具', '资源收藏', '常用链接'];
