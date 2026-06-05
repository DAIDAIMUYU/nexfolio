export function parseListInput(value: string): string[] {
  return value
    .split(/[\n,\uFF0C]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function stringifyListInput(value: string[] | null | undefined): string {
  return Array.isArray(value) ? value.join('\n') : '';
}

export function normalizeRichTextContent(value: string | string[] | null | undefined): string {
  if (Array.isArray(value)) {
    return value
      .map((item) => item.trim())
      .filter(Boolean)
      .join('\n\n');
  }

  if (!value) {
    return '';
  }

  return value.trim();
}
