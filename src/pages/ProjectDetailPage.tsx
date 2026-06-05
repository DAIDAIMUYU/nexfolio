import { Link, useParams } from 'react-router-dom';
import { MarkdownContent } from '../components/content/MarkdownContent';
import { EmptyState } from '../components/ui/EmptyState';
import { MotionPage } from '../components/ui/MotionPage';
import { useAsyncData } from '../hooks/useAsyncData';
import { getPublishedProjectBySlug } from '../lib/contentRepository';

export function ProjectDetailPage() {
  const { id = '' } = useParams();
  const { data: project, loading } = useAsyncData(() => getPublishedProjectBySlug(id), undefined, [id]);

  if (!project && !loading) {
    return (
      <MotionPage>
        <section className="page-section">
          <EmptyState
            title="项目不存在"
            description="这个项目可能尚未发布，或链接已经调整。"
            actionLabel="返回项目列表"
            actionTo="/projects"
          />
        </section>
      </MotionPage>
    );
  }

  if (!project) {
    return (
      <MotionPage>
        <section className="page-section">
          <EmptyState title="正在读取项目" description="正在加载已发布项目详情。" />
        </section>
      </MotionPage>
    );
  }

  return (
    <MotionPage>
      <article className="page-section detail-layout project-case">
        <div className="detail-main glass-card">
          <span className="eyebrow">{project.type}</span>
          <h1>{project.title}</h1>
          <MarkdownContent content={project.detail} className="lead markdown-lead" />
          <div className="tag-row">
            <span className="tag">{project.progress}</span>
            {project.techStack.map((tech) => (
              <span className="tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>

          <section>
            <h2>项目背景</h2>
            <MarkdownContent
              content={project.background || '暂未补充项目背景。'}
              className="article-content article-markdown section-markdown"
            />
          </section>
          <section>
            <h2>为什么做</h2>
            <MarkdownContent
              content={project.reason || '暂未补充项目动机。'}
              className="article-content article-markdown section-markdown"
            />
          </section>
          <section>
            <h2>解决什么问题</h2>
            <MarkdownContent
              content={project.problem || '暂未补充问题描述。'}
              className="article-content article-markdown section-markdown"
            />
          </section>
          <section>
            <h2>技术方案</h2>
            <MarkdownContent
              content={project.solution || '暂未补充技术方案。'}
              className="article-content article-markdown section-markdown"
            />
          </section>
          <section>
            <h2>核心功能</h2>
            {project.features.length > 0 ? (
              <ul className="feature-list">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            ) : (
              <p>暂未补充核心功能。</p>
            )}
          </section>
          <section>
            <h2>当前状态</h2>
            <MarkdownContent content={project.linkStatus} className="article-content article-markdown section-markdown" />
          </section>
          {project.futurePlan && project.futurePlan.length > 0 ? (
            <section>
              <h2>后续计划</h2>
              <ul className="feature-list">
                {project.futurePlan.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}
          <div className="detail-actions">
            <Link className="secondary-button" to="/projects">
              返回项目列表
            </Link>
            {project.demoUrl ? (
              <a className="primary-button" href={project.demoUrl} rel="noreferrer" target="_blank">
                访问项目
              </a>
            ) : (
              <span className="secondary-button is-disabled">暂未上线</span>
            )}
            {project.githubUrl ? (
              <a className="secondary-button" href={project.githubUrl} target="_blank" rel="noreferrer">
                GitHub
              </a>
            ) : null}
          </div>
        </div>
        <aside className="detail-side glass-card">
          <div className="cover-panel large">
            <span className="cover-kicker">{project.progress}</span>
            <strong>{project.cover ?? project.title}</strong>
            <i aria-hidden="true" />
          </div>
          <strong>技术栈</strong>
          <div className="tag-row">
            {project.techStack.map((tech) => (
              <span className="tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
          <strong>访问链接状态</strong>
          <MarkdownContent content={project.linkStatus} className="article-content article-markdown sidebar-markdown" />
        </aside>
      </article>
    </MotionPage>
  );
}
