import type { BlogPost, ProjectItem, ToolItem } from '../data/types';
import { contentToParagraphs } from './listFields';
import { isSupabaseConfigured, supabase } from './supabase';

type ProjectRow = {
  slug: string;
  title: string;
  description: string;
  type: string | null;
  status: string | null;
  tags: string[] | null;
  tech_stack: string[] | null;
  cover: string | null;
  demo_url: string | null;
  github_url: string | null;
  detail: string | null;
  background: string | null;
  reason: string | null;
  problem: string | null;
  solution: string | null;
  features: string[] | null;
  link_status: string | null;
  future_plan: string[] | null;
  is_published?: boolean | null;
};

type PostRow = {
  slug: string;
  title: string;
  summary: string;
  category: string | null;
  tags: string[] | null;
  published_at: string | null;
  cover: string | null;
  content: string | null;
  is_published?: boolean | null;
};

type ToolRow = {
  slug: string;
  name: string;
  description: string;
  category: string | null;
  url: string | null;
  icon: string | null;
  is_self_built: boolean | null;
  is_recommended: boolean | null;
  status: string | null;
  is_published?: boolean | null;
};

export function keepPublishedRows<T extends { is_published?: boolean | null }>(rows: T[] | null | undefined): T[] {
  return Array.isArray(rows) ? rows.filter((row) => row.is_published !== false) : [];
}

function toProject(row: ProjectRow): ProjectItem {
  return {
    id: row.slug,
    title: row.title,
    description: row.description,
    type: (row.type ?? '个人网站') as ProjectItem['type'],
    status: (row.status ?? '已上线') as ProjectItem['status'],
    tags: row.tags ?? [],
    techStack: row.tech_stack ?? [],
    cover: row.cover ?? undefined,
    demoUrl: row.demo_url ?? undefined,
    githubUrl: row.github_url ?? undefined,
    detail: row.detail ?? row.description,
    background: row.background ?? '',
    reason: row.reason ?? '',
    problem: row.problem ?? '',
    solution: row.solution ?? '',
    features: row.features ?? [],
    linkStatus: row.link_status ?? '暂无公开访问链接。',
    futurePlan: row.future_plan ?? [],
  };
}

function toPost(row: PostRow): BlogPost {
  return {
    id: row.slug,
    title: row.title,
    summary: row.summary,
    category: (row.category ?? '开发记录') as BlogPost['category'],
    tags: row.tags ?? [],
    date: row.published_at ? row.published_at.slice(0, 10) : '',
    cover: row.cover ?? undefined,
    content: contentToParagraphs(row.content),
  };
}

function toTool(row: ToolRow): ToolItem {
  return {
    id: row.slug,
    name: row.name,
    description: row.description,
    category: (row.category ?? '自研工具') as ToolItem['category'],
    url: row.url ?? undefined,
    icon: row.icon ?? undefined,
    isSelfBuilt: Boolean(row.is_self_built),
    isRecommended: Boolean(row.is_recommended),
    status: (row.status as ToolItem['status']) ?? '可访问',
  };
}

export async function getPublishedProjects(): Promise<ProjectItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .order('is_featured', { ascending: false })
    .order('published_at', { ascending: false });

  if (error) {
    return [];
  }

  return keepPublishedRows(data as ProjectRow[] | null).map(toProject);
}

export async function getPublishedProjectBySlug(slug: string): Promise<ProjectItem | undefined> {
  if (!isSupabaseConfigured || !supabase) {
    return undefined;
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error || !data || (data as ProjectRow).is_published === false) {
    return undefined;
  }

  return toProject(data as ProjectRow);
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) {
    return [];
  }

  return keepPublishedRows(data as PostRow[] | null).map(toPost);
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (!isSupabaseConfigured || !supabase) {
    return undefined;
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error || !data || (data as PostRow).is_published === false) {
    return undefined;
  }

  return toPost(data as PostRow);
}

export async function getPublishedTools(): Promise<ToolItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('is_published', true)
    .order('is_recommended', { ascending: false })
    .order('updated_at', { ascending: false });

  if (error) {
    return [];
  }

  return keepPublishedRows(data as ToolRow[] | null).map(toTool);
}
