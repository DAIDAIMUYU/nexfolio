import { Link } from 'react-router-dom';
import { MotionPage } from '../components/ui/MotionPage';

export function NotFoundPage() {
  return (
    <MotionPage>
      <section className="page-section not-found">
        <div className="glass-card not-found-card">
          <span className="eyebrow">404</span>
          <h1>页面没有找到</h1>
          <p>这个入口可能还没有发布，或路径已经调整。可以回到首页继续浏览项目、博客和工具入口。</p>
          <div className="hero-actions">
            <Link className="primary-button" to="/">
              返回首页
            </Link>
            <Link className="secondary-button" to="/projects">
              查看项目
            </Link>
          </div>
        </div>
      </section>
    </MotionPage>
  );
}
