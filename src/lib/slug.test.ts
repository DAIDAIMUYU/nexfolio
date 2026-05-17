import { describe, expect, it, vi } from 'vitest';
import { createUniqueSlug, generateSlug, hasUserEditedSlug, normalizeSlug } from './slug';

describe('slug helpers', () => {
  it('normalizes readable English titles', () => {
    expect(normalizeSlug('Build Personal Platform!')).toBe('build-personal-platform');
    expect(generateSlug('Build Personal Platform', 'post')).toBe('build-personal-platform');
  });

  it('generates fallback slugs for Chinese titles', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.68);
    expect(generateSlug('个人数字平台', 'project', new Date('2026-05-17T00:00:00Z'))).toMatch(
      /^project-20260517-[a-f0-9]{4}$/,
    );
    vi.restoreAllMocks();
  });

  it('detects manual slug edits and creates unique slugs', async () => {
    expect(hasUserEditedSlug('custom-slug', 'auto-slug')).toBe(true);
    await expect(createUniqueSlug('same-slug', async (slug) => slug === 'same-slug', () => 'a8f3')).resolves.toBe(
      'same-slug-a8f3',
    );
  });
});
