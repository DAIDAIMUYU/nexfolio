import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from '../App';

vi.mock('../lib/contentRepository', () => ({
  getPublishedProjects: async () => [
    {
      id: 'real-project',
      title: 'Real Project',
      description: 'Project summary from Supabase.',
      type: '个人网站',
      status: '已上线',
      progress: '已上线',
      tags: ['Supabase'],
      techStack: ['React'],
      detail: '## Project detail\n\n- First feature',
      background: 'Plain background text.',
      reason: 'Need **faster** publishing.',
      problem: 'Broken paragraphs before markdown rendering.',
      solution: '```ts\nconst ok = true;\n```',
      features: ['Feature A'],
      linkStatus: '[Live demo](https://example.com)',
    },
  ],
  getPublishedProjectBySlug: async (slug: string) =>
    slug === 'real-project'
      ? {
          id: 'real-project',
          title: 'Real Project',
          description: 'Project summary from Supabase.',
          type: '个人网站',
          status: '已上线',
          progress: '已上线',
          tags: ['Supabase'],
          techStack: ['React'],
          detail: '## Project detail\n\n- First feature',
          background: 'Plain background text.',
          reason: 'Need **faster** publishing.',
          problem: 'Broken paragraphs before markdown rendering.',
          solution: '```ts\nconst ok = true;\n```',
          features: ['Feature A'],
          linkStatus: '[Live demo](https://example.com)',
        }
      : undefined,
  getPublishedPosts: async () => [
    {
      id: 'real-post',
      title: 'Real Post',
      summary: 'Post summary from Supabase.',
      category: '开发记录',
      tags: ['发布'],
      date: '2026-05-17',
      content: '# Markdown Title\n\n- Item one\n- Item two\n\n[Read more](https://example.com)\n\n![Diagram](https://example.com/diagram.png)',
    },
  ],
  getPublishedPostBySlug: async (slug: string) =>
    slug === 'real-post'
      ? {
          id: 'real-post',
          title: 'Real Post',
          summary: 'Post summary from Supabase.',
          category: '开发记录',
          tags: ['发布'],
          date: '2026-05-17',
          content:
            '# Markdown Title\n\n- Item one\n- Item two\n\n[Read more](https://example.com)\n\n![Diagram](https://example.com/diagram.png)',
        }
      : undefined,
  getPublishedTools: async () => [
    {
      id: 'real-tool',
      name: 'Real Tool',
      description: 'Use **Markdown** for docs and `code` snippets.',
      category: '自研工具',
      isSelfBuilt: true,
      isRecommended: true,
      status: '可访问',
      url: 'https://example.com/tool',
    },
  ],
  keepPublishedRows: (rows: unknown[]) => rows,
}));

function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('published Supabase content rendering', () => {
  it('renders published projects, posts, and tools on public pages', async () => {
    let view = renderApp('/projects');
    expect((await screen.findAllByText('Real Project')).length).toBeGreaterThan(0);
    view.unmount();

    view = renderApp('/blog');
    expect((await screen.findAllByText('Real Post')).length).toBeGreaterThan(0);
    view.unmount();

    renderApp('/tools');
    expect((await screen.findAllByText('Real Tool')).length).toBeGreaterThan(0);
  });

  it('renders markdown for blog details, project details, and tool descriptions', async () => {
    let view = renderApp('/blog/real-post');
    expect(await screen.findByRole('heading', { name: 'Markdown Title' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Read more' })).toHaveAttribute('href', 'https://example.com');
    expect(screen.getByRole('img', { name: 'Diagram' })).toHaveAttribute('src', 'https://example.com/diagram.png');
    view.unmount();

    view = renderApp('/projects/real-project');
    expect(await screen.findByRole('heading', { name: 'Project detail' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Live demo' })[0]).toHaveAttribute('href', 'https://example.com');
    expect(screen.getByText('const ok = true;')).toBeInTheDocument();
    view.unmount();

    renderApp('/tools');
    expect(await screen.findByText('Markdown')).toBeInTheDocument();
    expect(screen.getByText('code')).toBeInTheDocument();
  });
});
