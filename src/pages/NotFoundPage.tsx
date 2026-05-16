import { Link } from 'react-router-dom';
import { MotionPage } from '../components/ui/MotionPage';

export function NotFoundPage() {
  return (
    <MotionPage>
      <section className="page-section page-hero">
        <span className="eyebrow">404</span>
        <h1>页面没有找到</h1>
        <p>可以回到首页继续浏览项目、博客和工具入口。</p>
        <Link className="primary-button" to="/">
          返回首页
        </Link>
      </section>
    </MotionPage>
  );
}
