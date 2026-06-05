# Markdown Rendering

## Scope

- Studio editors continue to store plain text Markdown.
- Public blog detail pages render Markdown automatically.
- Public project detail pages render Markdown for rich text sections.
- Public tool cards render Markdown inside descriptions.

## Supported Syntax

- `#`, `##`, `###`
- `-` unordered lists
- `1.` ordered lists
- `**bold**`
- `*italic*`
- `> blockquote`
- `` `inline code` ``
- fenced code blocks
- images
- links

## Implementation Notes

- Uses `react-markdown` with `remark-gfm`.
- Keeps the existing database schema unchanged.
- Normalizes legacy array content into Markdown text for backward compatibility.
- Adds responsive typography and code block styles for mobile and desktop.
