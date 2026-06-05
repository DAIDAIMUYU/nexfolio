import { projectProgressOptions, projectTypes, blogCategories, toolCategories } from '../data/categories';
import { parseListInput, stringifyListInput } from '../lib/listFields';
import { createUniqueSlug, generateSlug } from '../lib/slug';
import { isSupabaseConfigured, supabase, supabaseConfigMessage } from '../lib/supabase';
import type { StudioFormValues, StudioKind, StudioRecord } from './types';

export const studioLabels: Record<StudioKind, { single: string; plural: string; table: string; slugKind: 'post' | 'project' | 'tool' }> = {
  posts: { single: '博客', plural: '博客', table: 'posts', slugKind: 'post' },
  projects: { single: '项目', plural: '项目', table: 'projects', slugKind: 'project' },
  tools: { single: '工具', plural: '工具', table: 'tools', slugKind: 'tool' },
};

export const studioOptions = {
  posts: {
    categories: blogCategories,
  },
  projects: {
    categories: projectTypes,
    progress: projectProgressOptions,
  },
  tools: {
    categories: toolCategories,
  },
};

type BasePayload = {
  slug: string;
  category: string;
  tags: string[];
  seo_title: string | null;
  seo_description: string | null;
  sort_order: number;
  is_published: boolean;
  status: string;
  published_at?: string;
};

function assertSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(supabaseConfigMessage);
  }

  return supabase;
}

function optionOrDefault(value: string | null | undefined, options: readonly string[], fallback: string) {
  return value && options.includes(value) ? value : fallback;
}

function formProgress(record: StudioRecord, fallback: string) {
  if (record.progress && projectProgressOptions.includes(record.progress as (typeof projectProgressOptions)[number])) {
    return record.progress;
  }

  if (record.status === 'published') {
    return '已上线';
  }

  if (record.status === 'archived') {
    return '已归档';
  }

  return fallback;
}

export function createEmptyForm(kind: StudioKind): StudioFormValues {
  return {
    slug: '',
    title: '',
    summary: '',
    content: '',
    category:
      kind === 'posts'
        ? studioOptions.posts.categories[0]
        : kind === 'projects'
          ? studioOptions.projects.categories[0]
          : studioOptions.tools.categories[0],
    tags: '',
    isPublished: true,
    progress: '开发中',
    type: kind === 'projects' ? studioOptions.projects.categories[0] : '',
    techStack: '',
    demoUrl: '',
    githubUrl: '',
    cover: '',
    background: '',
    reason: '',
    problem: '',
    solution: '',
    features: '',
    linkStatus: '',
    futurePlan: '',
    isFeatured: false,
    sortOrder: '0',
    seoTitle: '',
    seoDescription: '',
    url: '',
    icon: '',
    isSelfBuilt: kind === 'tools',
    isRecommended: false,
  };
}

export function recordToForm(kind: StudioKind, record: StudioRecord): StudioFormValues {
  const base = createEmptyForm(kind);
  const title = record.title || record.name || '';
  const categoryOptions = studioOptions[kind].categories;
  return {
    ...base,
    slug: record.slug,
    title,
    summary: record.summary || record.description || '',
    content: record.content || record.description || '',
    category: optionOrDefault(record.category || record.type, categoryOptions, base.category),
    tags: stringifyListInput(record.tags),
    isPublished: Boolean(record.is_published),
    progress: formProgress(record, base.progress),
    type: optionOrDefault(record.type || record.category, studioOptions.projects.categories, base.type),
    techStack: stringifyListInput(record.tech_stack),
    demoUrl: record.demo_url || '',
    githubUrl: record.github_url || '',
    cover: record.cover || '',
    background: record.background || '',
    reason: record.reason || '',
    problem: record.problem || '',
    solution: record.solution || '',
    features: stringifyListInput(record.features),
    linkStatus: record.link_status || '',
    futurePlan: stringifyListInput(record.future_plan),
    isFeatured: Boolean(record.is_featured),
    sortOrder: `${record.sort_order ?? 0}`,
    seoTitle: record.seo_title || '',
    seoDescription: record.seo_description || '',
    url: record.url || '',
    icon: record.icon || '',
    isSelfBuilt: Boolean(record.is_self_built),
    isRecommended: Boolean(record.is_recommended),
  };
}

export async function listStudioRecords(kind: StudioKind): Promise<StudioRecord[]> {
  const client = assertSupabase();
  const { data, error } = await client
    .from(studioLabels[kind].table)
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as StudioRecord[];
}

export async function getStudioRecord(kind: StudioKind, id: string): Promise<StudioRecord | null> {
  const client = assertSupabase();
  const { data, error } = await client.from(studioLabels[kind].table).select('*').eq('id', id).maybeSingle();

  if (error) {
    throw error;
  }

  return data as StudioRecord | null;
}

async function slugExists(kind: StudioKind, slug: string, currentId?: string) {
  const client = assertSupabase();
  const query = client.from(studioLabels[kind].table).select('id').eq('slug', slug).limit(1);
  const { data, error } = currentId ? await query.neq('id', currentId) : await query;
  if (error) {
    throw error;
  }

  return Boolean(data?.length);
}

async function resolveSlug(kind: StudioKind, values: StudioFormValues, id?: string) {
  const base = values.slug.trim() || generateSlug(values.title, studioLabels[kind].slugKind);
  return createUniqueSlug(base, (slug) => slugExists(kind, slug, id));
}

function publicationPayload(values: StudioFormValues) {
  if (values.isPublished) {
    return {
      is_published: true,
      status: 'published',
      published_at: new Date().toISOString(),
    };
  }

  return {
    is_published: false,
    status: 'draft',
  };
}

function createBasePayload(values: StudioFormValues, slug: string): BasePayload {
  return {
    slug,
    category: values.category,
    tags: parseListInput(values.tags),
    seo_title: values.seoTitle.trim() || null,
    seo_description: values.seoDescription.trim() || null,
    sort_order: Number.parseInt(values.sortOrder, 10) || 0,
    ...publicationPayload(values),
  };
}

export function buildProjectPayload(base: BasePayload, values: StudioFormValues) {
  return {
    ...base,
    title: values.title.trim(),
    description: values.summary.trim(),
    detail: values.content,
    type: values.category,
    progress: values.progress,
    tags: parseListInput(values.techStack),
    tech_stack: parseListInput(values.techStack),
    demo_url: values.demoUrl.trim() || null,
    github_url: values.githubUrl.trim() || null,
    cover: values.cover.trim() || null,
    background: values.background,
    reason: values.reason,
    problem: values.problem,
    solution: values.solution,
    features: parseListInput(values.features),
    link_status: values.linkStatus,
    future_plan: parseListInput(values.futurePlan),
    is_featured: values.isFeatured,
  };
}

function formToPayload(kind: StudioKind, values: StudioFormValues, slug: string) {
  const base = createBasePayload(values, slug);

  if (kind === 'posts') {
    return {
      ...base,
      title: values.title.trim(),
      summary: values.summary.trim(),
      content: values.content,
      cover: values.cover.trim() || null,
    };
  }

  if (kind === 'projects') {
    return buildProjectPayload(base, values);
  }

  return {
    ...base,
    name: values.title.trim(),
    description: values.summary.trim(),
    url: values.url.trim() || null,
    icon: values.icon.trim() || null,
    is_self_built: values.isSelfBuilt,
    is_recommended: values.isRecommended,
  };
}

export function formatStudioError(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (error && typeof error === 'object') {
    const maybeError = error as { message?: string; details?: string; hint?: string; code?: string };
    const parts = [maybeError.message, maybeError.details, maybeError.hint].filter(Boolean);

    if (parts.length > 0) {
      return parts.join(' | ');
    }

    if (maybeError.code) {
      return `${fallback} (${maybeError.code})`;
    }
  }

  return fallback;
}

export async function saveStudioRecord(kind: StudioKind, values: StudioFormValues, options: { id?: string }) {
  const client = assertSupabase();
  if (!values.title.trim()) {
    throw new Error(`${studioLabels[kind].single}名称不能为空`);
  }

  const { data: userResult, error: userError } = await client.auth.getUser();
  if (userError || !userResult.user) {
    throw new Error('请先登录 Studio');
  }

  const slug = await resolveSlug(kind, values, options.id);
  const payload = formToPayload(kind, values, slug);
  const table = studioLabels[kind].table;

  if (options.id) {
    const { error } = await client.from(table).update(payload).eq('id', options.id);
    if (error) {
      throw error;
    }
    return { id: options.id, slug };
  }

  const { data, error } = await client
    .from(table)
    .insert({ ...payload, owner_id: userResult.user.id })
    .select('id')
    .single();

  if (error) {
    throw error;
  }

  return { id: (data as { id: string }).id, slug };
}

export async function deleteStudioRecord(kind: StudioKind, id: string) {
  const client = assertSupabase();
  const { error } = await client.from(studioLabels[kind].table).delete().eq('id', id);
  if (error) {
    throw error;
  }
}
