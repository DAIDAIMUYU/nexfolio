import { Link, useParams } from 'react-router-dom';
import { EmptyState } from '../components/ui/EmptyState';
import { MotionPage } from '../components/ui/MotionPage';
import { posts } from '../data/posts';

export function BlogDetailPage() {
  const { id } = useParams();
  const index = posts.findIndex((item) => item.id === id);
  const post = posts[index];
  const previous = posts[index - 1];
  const next = posts[index + 1];

  if (!post) {
    return (
      <MotionPage>
        <section className="page-section">
          <EmptyState title="文章不存在" description="这篇文章可能还没有发布，或链接已经调整。" actionLabel="返回博客列表" actionTo="/blog" />
        </section>
      </MotionPage>
    );
  }

  return (
    <MotionPage>
      <article className="page-section article-shell glass-card">
        <span className="eyebrow">{post.category}</span>
        <h1>{post.title}</h1>
        <div className="card-meta article-meta">
          <span>{post.date}</span>
          <span>{post.tags.join(' / ')}</span>
        </div>
        <p className="lead">{post.summary}</p>
        <div className="article-content">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="detail-actions split">
          <Link className="secondary-button" to="/blog">
            返回博客列表
          </Link>
          <div className="pager-links">
            {previous ? <Link to={`/blog/${previous.id}`}>上一篇</Link> : null}
            {next ? <Link to={`/blog/${next.id}`}>下一篇</Link> : null}
          </div>
        </div>
      </article>
    </MotionPage>
  );
}
