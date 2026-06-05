import { Link, useParams } from 'react-router-dom';
import { MarkdownContent } from '../components/content/MarkdownContent';
import { EmptyState } from '../components/ui/EmptyState';
import { MotionPage } from '../components/ui/MotionPage';
import { useAsyncData } from '../hooks/useAsyncData';
import { getPublishedPostBySlug, getPublishedPosts } from '../lib/contentRepository';

export function BlogDetailPage() {
  const { id = '' } = useParams();
  const { data: post, loading } = useAsyncData(() => getPublishedPostBySlug(id), undefined, [id]);
  const { data: posts } = useAsyncData(getPublishedPosts, [], []);
  const index = posts.findIndex((item) => item.id === id);
  const previous = posts[index - 1];
  const next = posts[index + 1];

  if (!post && !loading) {
    return (
      <MotionPage>
        <section className="page-section">
          <EmptyState
            title="文章不存在"
            description="这篇文章可能尚未发布，或链接已经调整。"
            actionLabel="返回博客列表"
            actionTo="/blog"
          />
        </section>
      </MotionPage>
    );
  }

  if (!post) {
    return (
      <MotionPage>
        <section className="page-section">
          <EmptyState title="正在读取文章" description="正在加载已发布文章内容。" />
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
          <span>{post.date || '未设置日期'}</span>
          <span>{post.tags.join(' / ')}</span>
        </div>
        <p className="lead">{post.summary}</p>
        <MarkdownContent content={post.content} className="article-content article-markdown" />
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
