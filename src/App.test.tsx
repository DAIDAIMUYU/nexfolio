import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from './App';

vi.mock('./lib/supabase', () => ({
  isSupabaseConfigured: false,
  supabase: null,
  supabaseConfigMessage: 'Supabase 未配置。请设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY 后再使用 Studio 后台。',
}));

function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('NexFolio app', () => {
  it('renders the rebuilt independent developer hero', async () => {
    renderApp('/');

    expect(screen.getByRole('heading', { name: '个人数字平台' })).toBeInTheDocument();
    expect(screen.getByText('持续构建中的个人数字平台')).toBeInTheDocument();
    expect(screen.getByText('当前重点')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getAllByText('暂未发布内容').length).toBeGreaterThan(0);
    });
  });

  it('shows empty blog state without local public content', async () => {
    const user = userEvent.setup();
    renderApp('/blog');

    expect(await screen.findByRole('heading', { name: '暂无文章' })).toBeInTheDocument();
    await user.type(screen.getByLabelText('搜索文章'), '任何内容');
    expect(screen.queryByText('真实文章')).not.toBeInTheDocument();
  });

  it('shows empty project and tool states without local public cards', async () => {
    const { unmount } = renderApp('/projects');
    expect(await screen.findByRole('heading', { name: '暂无项目' })).toBeInTheDocument();
    unmount();

    renderApp('/tools');
    expect(await screen.findByRole('heading', { name: '暂无工具' })).toBeInTheDocument();
  });

  it('does not expose Tavern from the NexFolio main route tree', () => {
    renderApp('/roleplay');

    expect(screen.getByRole('heading', { name: '页面没有找到' })).toBeInTheDocument();
  });

  it('shows Supabase configuration guidance on studio login when env is missing', () => {
    renderApp('/studio/login');

    expect(screen.getByRole('heading', { name: 'Supabase 未配置' })).toBeInTheDocument();
    expect(screen.getByText(/VITE_SUPABASE_URL/)).toBeInTheDocument();
  });

  it('redirects protected studio routes to login while Supabase is not configured', async () => {
    renderApp('/studio');

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Supabase 未配置' })).toBeInTheDocument();
    });
  });
});
