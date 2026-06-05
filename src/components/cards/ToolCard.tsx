import { Link } from 'react-router-dom';
import { MarkdownContent } from '../content/MarkdownContent';
import type { ToolItem } from '../../data/types';

export function ToolCard({ tool }: { tool: ToolItem }) {
  const external = Boolean(tool.url?.startsWith('http'));
  const internal = Boolean(tool.url?.startsWith('/'));

  return (
    <article className={`glass-card tool-card ${tool.isRecommended ? 'is-recommended' : ''}`}>
      <div className="tool-card-head">
        <div className="tool-icon" aria-hidden="true">
          {tool.icon ?? tool.name.slice(0, 2)}
        </div>
        {tool.isRecommended ? <span className="recommend-badge">推荐</span> : null}
      </div>
      <div>
        <div className="card-meta">
          <span>{tool.category}</span>
          <span>{tool.isSelfBuilt ? '自研工具' : '常用资源'}</span>
          <span>{tool.status ?? '可访问'}</span>
        </div>
        <h3>{tool.name}</h3>
        <MarkdownContent content={tool.description} className="tool-description markdown-compact" />
      </div>
      {external && tool.url ? (
        <a className="text-link" href={tool.url} target="_blank" rel="noreferrer">
          打开工具
        </a>
      ) : null}
      {internal && tool.url ? (
        <Link className="text-link" to={tool.url}>
          查看详情
        </Link>
      ) : null}
      {!tool.url ? <span className="text-link is-disabled">暂未上线</span> : null}
    </article>
  );
}
