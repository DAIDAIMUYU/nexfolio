import { useMemo, useState } from 'react';
import { ToolCard } from '../components/cards/ToolCard';
import { FilterPills } from '../components/ui/FilterPills';
import { MotionPage } from '../components/ui/MotionPage';
import { SectionHeading } from '../components/ui/SectionHeading';
import { toolCategories } from '../data/categories';
import { tools } from '../data/tools';
import type { ToolCategory } from '../data/types';

export function ToolsPage() {
  const [category, setCategory] = useState<ToolCategory | '全部'>('全部');

  const filteredTools = useMemo(
    () => tools.filter((tool) => category === '全部' || tool.category === category),
    [category],
  );

  return (
    <MotionPage>
      <section className="page-section page-hero">
        <SectionHeading
          eyebrow="Tools"
          title="工具入口"
          description="区分自研工具和常用工具，方便快速进入高频资源。"
        />
      </section>
      <section className="page-section compact-section">
        <div className="tool-summary">
          <div className="glass-card metric-card">
            <strong>{tools.filter((tool) => tool.isSelfBuilt).length}</strong>
            <span>自研工具</span>
          </div>
          <div className="glass-card metric-card">
            <strong>{tools.filter((tool) => !tool.isSelfBuilt).length}</strong>
            <span>常用工具</span>
          </div>
        </div>
        <FilterPills items={toolCategories} value={category} onChange={setCategory} label="工具分类筛选" />
        <div className="card-grid tools-grid">
          {filteredTools.map((tool) => (
            <ToolCard tool={tool} key={tool.id} />
          ))}
        </div>
      </section>
    </MotionPage>
  );
}
