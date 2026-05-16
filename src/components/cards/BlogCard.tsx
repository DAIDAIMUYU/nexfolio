import { Link } from 'react-router-dom';
import type { BlogPost } from '../../data/types';

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="glass-card blog-card">
      <div className="cover-panel blog-cover" aria-label={post.cover ?? post.title}>
        <span className="cover-kicker">{post.category}</span>
        <strong>{post.cover ?? post.title}</strong>
        <i aria-hidden="true" />
      </div>
      <div className="card-meta">
        <span>{post.date || '未设置日期'}</span>
        <span>{post.category}</span>
      </div>
      <h3>{post.title}</h3>
      <p>{post.summary}</p>
      <div className="tag-row">
        {post.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <Link className="text-link" to={`/blog/${post.id}`}>
        阅读全文
      </Link>
    </article>
  );
}
