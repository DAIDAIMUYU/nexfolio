import type { ToolItem } from '../../data/types';

export function ToolCard({ tool }: { tool: ToolItem }) {
  const external = tool.url.startsWith('http');

  return (
    <article className="glass-card tool-card">
      <div className="tool-icon" aria-hidden="true">
        {tool.icon ?? tool.name.slice(0, 2)}
      </div>
      <div>
        <div className="card-meta">
          <span>{tool.category}</span>
          <span>{tool.isSelfBuilt ? '自研' : '常用'}</span>
        </div>
        <h3>{tool.name}</h3>
        <p>{tool.description}</p>
      </div>
      <a
        className="text-link"
        href={tool.url}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
      >
        打开工具
      </a>
    </article>
  );
}
