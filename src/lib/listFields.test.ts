import { describe, expect, it } from 'vitest';
import { normalizeRichTextContent, parseListInput, stringifyListInput } from './listFields';

describe('list field helpers', () => {
  it('turns comma and newline separated text into a clean array', () => {
    expect(parseListInput('React, TypeScript\nSupabase，Vite')).toEqual(['React', 'TypeScript', 'Supabase', 'Vite']);
  });

  it('keeps array fields compatible with textarea editing', () => {
    expect(stringifyListInput(['draft', 'published'])).toBe('draft\npublished');
    expect(normalizeRichTextContent(['First paragraph', 'Second paragraph'])).toBe(
      'First paragraph\n\nSecond paragraph',
    );
  });
});
