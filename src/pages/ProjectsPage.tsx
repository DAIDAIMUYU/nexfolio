import { useMemo, useState } from 'react';
import { ProjectCard } from '../components/cards/ProjectCard';
import { EmptyState } from '../components/ui/EmptyState';
import { FilterPills } from '../components/ui/FilterPills';
import { MotionPage } from '../components/ui/MotionPage';
import { SectionHeading } from '../components/ui/SectionHeading';
import { projectProgressOptions, projectTypes } from '../data/categories';
import type { ProjectProgress, ProjectType } from '../data/types';
import { useAsyncData } from '../hooks/useAsyncData';
import { getPublishedProjects } from '../lib/contentRepository';

export function ProjectsPage() {
  const [type, setType] = useState<ProjectType | '全部'>('全部');
  const [progress, setProgress] = useState<ProjectProgress | '全部'>('全部');
  const { data: projects, error, loading } = useAsyncData(getPublishedProjects, [], []);

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (project) => (type === '全部' || project.type === type) && (progress === '全部' || project.progress === progress),
      ),
    [projects, progress, type],
  );

  const emptyTitle = projects.length === 0 ? '暂无项目' : '没有匹配项目';
  const emptyDescription =
    projects.length === 0 ? '项目发布后会显示在这里。' : '可以切换类型或项目进度筛选，继续浏览已发布项目。';

  return (
    <MotionPage>
      <section className="page-section page-hero">
        <SectionHeading
          eyebrow="Projects"
          title="项目作品"
          description="这里仅展示从 Supabase 发布流读取的真实项目。草稿和未发布内容不会出现在前台。"
        />
        {loading ? <p className="data-note">正在读取已发布项目...</p> : null}
        {error ? <p className="data-note">{error}</p> : null}
      </section>
      <section className="page-section compact-section">
        <FilterPills items={projectTypes} value={type} onChange={setType} label="项目类型筛选" />
        <FilterPills items={projectProgressOptions} value={progress} onChange={setProgress} label="项目进度筛选" />
        {filteredProjects.length > 0 ? (
          <div className="card-grid">
            {filteredProjects.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </div>
        ) : (
          <EmptyState title={emptyTitle} description={emptyDescription} />
        )}
      </section>
    </MotionPage>
  );
}
