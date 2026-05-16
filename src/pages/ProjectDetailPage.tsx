import { Link, useParams } from 'react-router-dom';
import { MotionPage } from '../components/ui/MotionPage';
import { projects } from '../data/projects';

export function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find((item) => item.id === id);

  if (!project) {
    return (
      <MotionPage>
        <section className="page-section page-hero">
          <h1>项目不存在</h1>
          <Link className="secondary-button" to="/projects">
            返回项目列表
          </Link>
        </section>
      </MotionPage>
    );
  }

  return (
    <MotionPage>
      <article className="page-section detail-layout">
        <div className="detail-main glass-card">
          <span className="eyebrow">{project.type}</span>
          <h1>{project.title}</h1>
          <p className="lead">{project.detail}</p>
          <div className="tag-row">
            <span className="tag">{project.status}</span>
            {project.techStack.map((tech) => (
              <span className="tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
          <h2>项目背景</h2>
          <p>{project.background}</p>
          <h2>核心功能</h2>
          <ul className="feature-list">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          {project.futurePlan ? (
            <>
              <h2>后续计划</h2>
              <ul className="feature-list">
                {project.futurePlan.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : null}
          <div className="detail-actions">
            <Link className="secondary-button" to="/projects">
              返回项目列表
            </Link>
            {project.demoUrl ? (
              <a className="primary-button" href={project.demoUrl}>
                访问项目
              </a>
            ) : null}
            {project.githubUrl ? (
              <a className="secondary-button" href={project.githubUrl} target="_blank" rel="noreferrer">
                GitHub
              </a>
            ) : null}
          </div>
        </div>
        <aside className="detail-side glass-card">
          <div className="cover-panel large">
            <span>{project.cover ?? project.title}</span>
          </div>
          <strong>技术栈</strong>
          <div className="tag-row">
            {project.techStack.map((tech) => (
              <span className="tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        </aside>
      </article>
    </MotionPage>
  );
}
