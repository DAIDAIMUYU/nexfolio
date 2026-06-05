import { Link } from 'react-router-dom';
import { BlogCard } from '../components/cards/BlogCard';
import { ProjectCard } from '../components/cards/ProjectCard';
import { ToolCard } from '../components/cards/ToolCard';
import { HorizontalRail } from '../components/sections/HorizontalRail';
import { EmptyState } from '../components/ui/EmptyState';
import { MotionPage } from '../components/ui/MotionPage';
import { MotionSection } from '../components/ui/MotionSection';
import { SectionHeading } from '../components/ui/SectionHeading';
import { site } from '../data/site';
import { useAsyncData } from '../hooks/useAsyncData';
import { getPublishedPosts, getPublishedProjects, getPublishedTools } from '../lib/contentRepository';

const currentFocus = ['Studio 后台', 'Supabase 内容系统', '自动化工具', '长期内容平台'];

export function HomePage() {
  const { data: projects, loading: projectsLoading } = useAsyncData(getPublishedProjects, [], []);
  const { data: posts, loading: postsLoading } = useAsyncData(getPublishedPosts, [], []);
  const { data: tools, loading: toolsLoading } = useAsyncData(getPublishedTools, [], []);

  // Only render stats that carry a meaningful (non-zero) value.
  const stats = [
    { value: projects.length, label: '公开项目' },
    { value: posts.length, label: '博客记录' },
    { value: site.stats.experienceYears, suffix: '+', label: '持续构建（年）' },
    { value: site.stats.commits, suffix: '+', label: 'Commits' },
  ].filter((stat) => stat.value > 0);

  return (
    <MotionPage>
      <section className="hero">
        <span className="hero-pill">👋 欢迎来到我的主页</span>
        <span className="hero-subtitle">Independent Digital Platform</span>
        <h1>{site.name}</h1>
        <p className="hero-desc">{site.tagline}</p>
        <div className="hero-actions">
          <Link className="primary-button" to="/projects">
            查看项目
          </Link>
          <Link className="secondary-button" to="/blog">
            阅读博客
          </Link>
        </div>
      </section>

      {stats.length > 0 ? (
        <div className="stats-stripe">
          <section className="hero-stats" aria-label="平台数据概览">
            {stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <strong>
                  {stat.value}
                  {stat.suffix ? <em>{stat.suffix}</em> : null}
                </strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </section>
        </div>
      ) : null}

      <section className="page-section about-cards" aria-label="个人数字平台简介">
        <article className="visual-card main profile-card">
          <span>持续构建中的个人数字平台</span>
          <strong>NexFolio</strong>
          <p>记录项目、博客、工具与长期开发过程。</p>
          <div className="tag-row">
            {site.focus.map((item) => (
              <span className="tag" key={item}>
                {item}
              </span>
            ))}
          </div>
        </article>
        <article className="visual-card focus-card">
          <span className="eyebrow">当前重点</span>
          <ul>
            {currentFocus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <MotionSection className="page-section about-strip">
        <div>
          <span className="eyebrow">About / Current Focus</span>
          <h2>把项目、写作与工具沉淀成可长期维护的公开系统。</h2>
          <p>{site.description}</p>
        </div>
        <Link className="secondary-button" to="/about">
          了解更多
        </Link>
      </MotionSection>

      <MotionSection className="page-section" id="featured-projects">
        <SectionHeading
          eyebrow="Projects"
          title="精选项目"
          description={projectsLoading ? '正在读取已发布项目...' : '只展示已发布的真实项目内容。'}
        />
        {projects.length > 0 ? (
          <HorizontalRail label="精选项目横向滑动">
            {projects.slice(0, 5).map((project, index) => (
              <ProjectCard project={project} featured={index === 0} key={project.id} />
            ))}
          </HorizontalRail>
        ) : (
          <EmptyState title="内容即将发布" description="项目会在 Studio 发布后显示在这里。" />
        )}
      </MotionSection>

      <MotionSection className="page-section">
        <SectionHeading
          eyebrow="Blog"
          title="最新博客"
          description={postsLoading ? '正在读取已发布文章...' : '只展示已发布的真实博客内容。'}
        />
        {posts.length > 0 ? (
          <HorizontalRail label="最新博客横向滑动">
            {posts.slice(0, 3).map((post) => (
              <BlogCard post={post} key={post.id} />
            ))}
          </HorizontalRail>
        ) : (
          <EmptyState title="内容即将发布" description="文章会在 Studio 发布后显示在这里。" />
        )}
      </MotionSection>

      <MotionSection className="page-section">
        <SectionHeading
          eyebrow="Tools"
          title="工具"
          description={toolsLoading ? '正在读取已发布工具...' : '只展示已发布的真实工具入口。'}
        />
        {tools.length > 0 ? (
          <HorizontalRail label="工具横向滑动">
            {tools.slice(0, 5).map((tool) => (
              <ToolCard tool={tool} key={tool.id} />
            ))}
          </HorizontalRail>
        ) : (
          <EmptyState title="内容即将发布" description="工具会在 Studio 发布后显示在这里。" />
        )}
      </MotionSection>
    </MotionPage>
  );
}
