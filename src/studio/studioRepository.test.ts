import { describe, expect, it } from 'vitest';
import { buildProjectPayload } from './studioRepository';
import type { StudioFormValues } from './types';

function createProjectForm(): StudioFormValues {
  return {
    slug: 'demo-project',
    title: 'Demo Project',
    summary: 'Summary',
    content: 'Detail',
    category: '个人网站',
    tags: '',
    isPublished: true,
    progress: '开发中',
    type: '个人网站',
    techStack: 'React\nTypeScript',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/repo',
    cover: 'cover',
    background: 'background',
    reason: 'reason',
    problem: 'problem',
    solution: 'solution',
    features: 'feature a\nfeature b',
    linkStatus: '可访问',
    futurePlan: 'plan a',
    isFeatured: true,
    sortOrder: '1',
    seoTitle: 'seo title',
    seoDescription: 'seo description',
    url: '',
    icon: '',
    isSelfBuilt: false,
    isRecommended: false,
  };
}

describe('studioRepository project payload', () => {
  it('only includes project columns that exist in the projects table schema', () => {
    const payload = buildProjectPayload(
      {
        slug: 'demo-project',
        category: '个人网站',
        tags: [],
        seo_title: 'seo title',
        seo_description: 'seo description',
        sort_order: 1,
        is_published: true,
        status: 'published',
        published_at: '2026-06-06T00:00:00.000Z',
      },
      createProjectForm(),
    );

    expect(Object.keys(payload).sort()).toEqual(
      [
        'background',
        'category',
        'cover',
        'demo_url',
        'description',
        'detail',
        'features',
        'future_plan',
        'github_url',
        'is_featured',
        'is_published',
        'link_status',
        'problem',
        'progress',
        'published_at',
        'reason',
        'seo_description',
        'seo_title',
        'slug',
        'solution',
        'sort_order',
        'status',
        'tags',
        'tech_stack',
        'title',
        'type',
      ].sort(),
    );
  });
});
