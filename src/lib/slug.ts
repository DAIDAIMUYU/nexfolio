type SlugKind = 'post' | 'project' | 'tool';

const kindPrefix: Record<SlugKind, string> = {
  post: 'post',
  project: 'project',
  tool: 'tool',
};

function shortCode() {
  return Math.random().toString(16).slice(2, 6).padEnd(4, '0');
}

function dateStamp(date = new Date()) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}${month}${day}`;
}

export function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export function generateSlug(value: string, kind: SlugKind, date = new Date()) {
  const normalized = normalizeSlug(value);
  if (normalized) {
    return normalized;
  }

  return `${kindPrefix[kind]}-${dateStamp(date)}-${shortCode()}`;
}

export function hasUserEditedSlug(currentSlug: string, generatedSlug: string) {
  return currentSlug.trim().length > 0 && normalizeSlug(currentSlug) !== normalizeSlug(generatedSlug);
}

export async function createUniqueSlug(
  baseSlug: string,
  exists: (slug: string) => Promise<boolean>,
  makeSuffix = shortCode,
) {
  const base = normalizeSlug(baseSlug) || `item-${dateStamp()}-${makeSuffix()}`;
  if (!(await exists(base))) {
    return base;
  }

  for (let index = 0; index < 8; index += 1) {
    const candidate = `${base}-${makeSuffix()}`;
    if (!(await exists(candidate))) {
      return candidate;
    }
  }

  return `${base}-${Date.now().toString(36)}`;
}
