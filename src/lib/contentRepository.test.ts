import { describe, expect, it, vi } from 'vitest';
import {
  getPublishedPostBySlug,
  getPublishedPosts,
  getPublishedProjectBySlug,
  getPublishedProjects,
  getPublishedTools,
  keepPublishedRows,
} from './contentRepository';

vi.mock('./supabase', () => ({
  isSupabaseConfigured: false,
  supabase: null,
}));

describe('content repository', () => {
  it('returns empty public content when Supabase is missing', async () => {
    await expect(getPublishedProjects()).resolves.toEqual([]);
    await expect(getPublishedPosts()).resolves.toEqual([]);
    await expect(getPublishedTools()).resolves.toEqual([]);
    await expect(getPublishedProjectBySlug('nexfolio')).resolves.toBeUndefined();
    await expect(getPublishedPostBySlug('testing-from-day-one')).resolves.toBeUndefined();
  });

  it('keeps published rows and hides drafts before mapping content to the public site', () => {
    const rows = [
      { slug: 'published-post', is_published: true },
      { slug: 'legacy-row-without-flag' },
      { slug: 'draft-post', is_published: false },
    ];

    expect(keepPublishedRows(rows)).toEqual([
      { slug: 'published-post', is_published: true },
      { slug: 'legacy-row-without-flag' },
    ]);
  });

  it('handles an empty Supabase table as an empty public state', () => {
    expect(keepPublishedRows([])).toEqual([]);
    expect(keepPublishedRows(null)).toEqual([]);
  });
});
