import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from '../App';

vi.mock('../lib/contentRepository', () => ({
  getPublishedProjects: async () => [
    {
      id: 'real-project',
      title: '真实项目',
      description: '从 Supabase 发布流读取的项目。',
      type: '个人网站',
      status: '已上线',
      tags: ['Supabase'],
      techStack: ['React'],
      detail: '真实项目详情。',
      background: '真实背景。',
      reason: '真实动机。',
      problem: '真实问题。',
      solution: '真实方案。',
      features: ['真实功能'],
      linkStatus: '已发布',
    },
  ],
  getPublishedProjectBySlug: async () => undefined,
  getPublishedPosts: async () => [
    {
      id: 'real-post',
      title: '真实文章',
      summary: '从 Supabase 发布流读取的文章。',
      category: '开发记录',
      tags: ['发布'],
      date: '2026-05-17',
      content: ['正文'],
    },
  ],
  getPublishedPostBySlug: async () => undefined,
  getPublishedTools: async () => [
    {
      id: 'real-tool',
      name: '真实工具',
      description: '从 Supabase 发布流读取的工具。',
      category: '自研工具',
      isSelfBuilt: true,
      isRecommended: true,
      status: '可访问',
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
    expect((await screen.findAllByText('真实项目')).length).toBeGreaterThan(0);
    expect(screen.queryByRole('heading', { name: '暂无项目' })).not.toBeInTheDocument();
    view.unmount();

    view = renderApp('/blog');
    expect((await screen.findAllByText('真实文章')).length).toBeGreaterThan(0);
    expect(screen.queryByRole('heading', { name: '暂无文章' })).not.toBeInTheDocument();
    view.unmount();

    renderApp('/tools');
    expect((await screen.findAllByText('真实工具')).length).toBeGreaterThan(0);
    expect(screen.queryByRole('heading', { name: '暂无工具' })).not.toBeInTheDocument();
  });
});
