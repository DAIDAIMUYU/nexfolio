import { Link } from 'react-router-dom';
import type { ProjectItem } from '../../data/types';

export function ProjectCard({ project, featured = false }: { project: ProjectItem; featured?: boolean }) {
  return (
    <article className={`glass-card project-card ${featured ? 'is-featured' : ''}`}>
      <div className="cover-panel" aria-label={project.cover ?? project.title}>
        <span>{project.type}</span>
      </div>
      <div className="card-meta">
        <span className="status-dot" />
        {project.status}
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="tag-row">
        {project.tags.slice(0, 3).map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <Link className="text-link" to={`/projects/${project.id}`}>
        查看详情
      </Link>
    </article>
  );
}
