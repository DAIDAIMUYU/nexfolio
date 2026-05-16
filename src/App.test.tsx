import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('NexFolio app', () => {
  it('renders home hero and primary entries', () => {
    renderApp('/');

    expect(screen.getByRole('heading', { name: '个人数字平台' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '探索我的项目' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '阅读我的博客' })).toBeInTheDocument();
  });

  it('filters blog posts by search keyword', async () => {
    const user = userEvent.setup();
    renderApp('/blog');

    await user.type(screen.getByLabelText('搜索文章'), '第一天');

    expect(screen.getByText('从第一天开始建立测试体系')).toBeInTheDocument();
    expect(screen.queryByText('从工具集合到个人数字平台')).not.toBeInTheDocument();
  });

  it('renders project detail route', () => {
    renderApp('/projects/nexfolio');

    expect(screen.getByRole('heading', { name: 'NexFolio 个人数字平台' })).toBeInTheDocument();
    expect(screen.getByText('项目背景')).toBeInTheDocument();
    expect(screen.getByText('核心功能')).toBeInTheDocument();
  });
});
