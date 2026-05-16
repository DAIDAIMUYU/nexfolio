import { useMemo, useState } from 'react';
import { ToolCard } from '../components/cards/ToolCard';
import { EmptyState } from '../components/ui/EmptyState';
import { FilterPills } from '../components/ui/FilterPills';
import { MotionPage } from '../components/ui/MotionPage';
import { SectionHeading } from '../components/ui/SectionHeading';
import { toolCategories } from '../data/categories';
import type { ToolCategory } from '../data/types';
import { useAsyncData } from '../hooks/useAsyncData';
import { getPublishedTools } from '../lib/contentRepository';

export function ToolsPage() {
  const [category, setCategory] = useState<ToolCategory | '全部'>('全部');
  const { data: tools, error, loading } = useAsyncData(getPublishedTools, [], []);

  const filteredTools = useMemo(
    () => tools.filter((tool) => category === '全部' || tool.category === category),
    [category, tools],
  );

  const emptyTitle = tools.length === 0 ? '暂无工具' : '没有匹配工具';
  const emptyDescription =
    tools.length === 0 ? '工具发布后会显示在这里。' : '可以切换分类继续查看已发布工具。';

  return (
    <MotionPage>
      <section className="page-section page-hero">
        <SectionHeading
          eyebrow="Tools"
          title="工具入口"
          description="这里只展示真实发布的工具入口。没有真实链接的内容会保留在 Studio 草稿或未发布状态。"
        />
        {loading ? <p className="data-note">正在读取已发布工具...</p> : null}
        {error ? <p className="data-note">{error}</p> : null}
      </section>
      <section className="page-section compact-section">
        <div className="tool-summary">
          <div className="glass-card metric-card">
            <strong>{tools.filter((tool) => tool.isSelfBuilt).length}</strong>
            <span>自研工具</span>
          </div>
          <div className="glass-card metric-card">
            <strong>{tools.filter((tool) => !tool.isSelfBuilt).length}</strong>
            <span>常用资源</span>
          </div>
        </div>
        <FilterPills items={toolCategories} value={category} onChange={setCategory} label="工具分类筛选" />
        {filteredTools.length > 0 ? (
          <div className="card-grid tools-grid">
            {filteredTools.map((tool) => (
              <ToolCard tool={tool} key={tool.id} />
            ))}
          </div>
        ) : (
          <EmptyState title={emptyTitle} description={emptyDescription} />
        )}
      </section>
    </MotionPage>
  );
}
