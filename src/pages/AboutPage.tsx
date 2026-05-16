import { MotionPage } from '../components/ui/MotionPage';
import { SectionHeading } from '../components/ui/SectionHeading';
import { site } from '../data/site';

export function AboutPage() {
  return (
    <MotionPage>
      <section className="page-section page-hero">
        <SectionHeading
          eyebrow="About"
          title="关于我"
          description="这里记录个人方向、正在构建的项目类型、技术兴趣与站点说明。"
        />
      </section>
      <section className="page-section about-page-grid">
        <article className="glass-card about-panel">
          <h2>个人简介</h2>
          <p>
            我关注前端工程、AI 工具、自动化工作流和个人知识产品，希望把零散想法逐步沉淀为可访问、可维护、可复用的数字作品。
          </p>
        </article>
        <article className="glass-card about-panel">
          <h2>当前关注方向</h2>
          <div className="tag-row">
            {site.focus.map((item) => (
              <span className="tag" key={item}>
                {item}
              </span>
            ))}
          </div>
        </article>
        <article className="glass-card about-panel">
          <h2>正在构建</h2>
          <p>个人主站、网页工具、AI 应用、自动化脚本入口和可复盘的项目详情页。</p>
        </article>
        <article className="glass-card about-panel">
          <h2>联系与说明</h2>
          <p>{site.description}</p>
          <div className="footer-links inline">
            <a className="text-link" href={site.contact.github} target="_blank" rel="noreferrer">
              GitHub 仓库
            </a>
            <span>{site.contact.emailLabel}</span>
          </div>
        </article>
      </section>
    </MotionPage>
  );
}
