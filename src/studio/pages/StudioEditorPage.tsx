import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { generateSlug, hasUserEditedSlug, normalizeSlug } from '../../lib/slug';
import {
  createEmptyForm,
  deleteStudioRecord,
  getStudioRecord,
  recordToForm,
  saveStudioRecord,
  studioLabels,
  studioOptions,
} from '../studioRepository';
import type { StudioFormValues, StudioKind } from '../types';

function isStudioKind(value: string | undefined): value is StudioKind {
  return value === 'posts' || value === 'projects' || value === 'tools';
}

function titleLabel(kind: StudioKind) {
  if (kind === 'posts') {
    return '标题';
  }
  if (kind === 'projects') {
    return '项目名称';
  }
  return '工具名称';
}

function summaryLabel(kind: StudioKind) {
  if (kind === 'posts') {
    return '摘要';
  }
  if (kind === 'projects') {
    return '简介';
  }
  return '简介';
}

function contentLabel(kind: StudioKind) {
  if (kind === 'posts') {
    return '正文';
  }
  if (kind === 'projects') {
    return '详情';
  }
  return '补充说明';
}

function nextGeneratedSlug(kind: StudioKind, title: string, currentSlug: string) {
  const readableSlug = normalizeSlug(title);
  if (readableSlug) {
    return readableSlug;
  }

  return currentSlug || generateSlug(title, studioLabels[kind].slugKind);
}

export function StudioEditorPage() {
  const params = useParams();
  const navigate = useNavigate();
  const kind = isStudioKind(params.kind) ? params.kind : 'posts';
  const id = params.id === 'new' ? undefined : params.id;
  const [values, setValues] = useState<StudioFormValues>(() => createEmptyForm(kind));
  const [slugEdited, setSlugEdited] = useState(false);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setMessage('');
    setSlugEdited(Boolean(id));
    setValues(createEmptyForm(kind));
    if (id) {
      getStudioRecord(kind, id)
        .then((record) => {
          if (record) {
            setValues(recordToForm(kind, record));
          } else {
            setMessage('内容不存在或当前账号无权访问。');
          }
        })
        .catch((error) => setMessage(error instanceof Error ? error.message : '读取内容失败'));
    }
  }, [id, kind]);

  const heading = useMemo(() => `${id ? '编辑' : '新建'}${studioLabels[kind].single}`, [id, kind]);

  const update = (key: keyof StudioFormValues, value: string | boolean) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const updateTitle = (title: string) => {
    setValues((current) => {
      if (id || slugEdited) {
        return { ...current, title };
      }

      return {
        ...current,
        title,
        slug: nextGeneratedSlug(kind, title, current.slug),
      };
    });
  };

  const updateSlug = (slug: string) => {
    const normalized = normalizeSlug(slug);
    const generated = generateSlug(values.title, studioLabels[kind].slugKind);
    setSlugEdited(hasUserEditedSlug(normalized, generated));
    update('slug', normalized);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage('');
    setSaving(true);
    try {
      const saved = await saveStudioRecord(kind, values, { id });
      setValues((current) => ({ ...current, slug: saved.slug }));
      setSlugEdited(true);
      setMessage(values.isPublished ? '已保存，前台公开可见。' : '已保存为不公开内容。');
      if (!id) {
        navigate(`/studio/${kind}/${saved.id}/edit`, { replace: true });
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !window.confirm('确认删除这条内容？此操作不可撤销。')) {
      return;
    }
    await deleteStudioRecord(kind, id);
    navigate(`/studio/${kind}`);
  };

  return (
    <section className="studio-page">
      <div className="studio-page-head">
        <div>
          <span className="eyebrow">{studioLabels[kind].single}</span>
          <h1>{heading}</h1>
        </div>
        <Link className="secondary-button" to={`/studio/${kind}`}>
          返回列表
        </Link>
      </div>

      <form className="glass-card studio-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            {titleLabel(kind)}
            <input value={values.title} onChange={(event) => updateTitle(event.target.value)} required />
          </label>
          <label>
            分类
            <select value={values.category} onChange={(event) => update('category', event.target.value)}>
              {studioOptions[kind].categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          {kind === 'projects' ? (
            <label>
              项目进度
              <select value={values.progress} onChange={(event) => update('progress', event.target.value)}>
                {studioOptions.projects.progress.map((progress) => (
                  <option value={progress} key={progress}>
                    {progress}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
          <label className="check-row publish-row">
            <input
              type="checkbox"
              checked={values.isPublished}
              onChange={(event) => update('isPublished', event.target.checked)}
            />
            是否公开
          </label>
        </div>

        <label>
          {summaryLabel(kind)}
          <textarea value={values.summary} onChange={(event) => update('summary', event.target.value)} rows={3} />
        </label>

        {kind !== 'tools' ? (
          <label>
            {contentLabel(kind)}
            <textarea
              className={kind === 'posts' ? 'tall' : undefined}
              value={values.content}
              onChange={(event) => update('content', event.target.value)}
              rows={kind === 'posts' ? 10 : 6}
            />
          </label>
        ) : null}

        {kind === 'posts' ? (
          <label>
            标签（逗号或换行分隔）
            <textarea value={values.tags} onChange={(event) => update('tags', event.target.value)} rows={3} />
          </label>
        ) : null}

        {kind === 'projects' ? (
          <div className="form-extra">
            <div className="form-grid">
              <label>
                技术栈标签（逗号或换行分隔）
                <textarea value={values.techStack} onChange={(event) => update('techStack', event.target.value)} rows={3} />
              </label>
              <label>
                访问链接状态
                <input
                  value={values.linkStatus}
                  onChange={(event) => update('linkStatus', event.target.value)}
                  placeholder="例如：暂未上线 / 可访问"
                />
              </label>
              <label>
                演示链接
                <input value={values.demoUrl} onChange={(event) => update('demoUrl', event.target.value)} />
              </label>
              <label>
                GitHub 链接
                <input value={values.githubUrl} onChange={(event) => update('githubUrl', event.target.value)} />
              </label>
            </div>
            <label>
              项目背景
              <textarea value={values.background} onChange={(event) => update('background', event.target.value)} rows={3} />
            </label>
            <label>
              为什么做
              <textarea value={values.reason} onChange={(event) => update('reason', event.target.value)} rows={3} />
            </label>
            <label>
              解决什么问题
              <textarea value={values.problem} onChange={(event) => update('problem', event.target.value)} rows={3} />
            </label>
            <label>
              技术方案
              <textarea value={values.solution} onChange={(event) => update('solution', event.target.value)} rows={3} />
            </label>
            <label>
              核心功能（逗号或换行分隔）
              <textarea value={values.features} onChange={(event) => update('features', event.target.value)} rows={4} />
            </label>
            <label>
              后续计划（逗号或换行分隔）
              <textarea value={values.futurePlan} onChange={(event) => update('futurePlan', event.target.value)} rows={4} />
            </label>
            <label className="check-row">
              <input type="checkbox" checked={values.isFeatured} onChange={(event) => update('isFeatured', event.target.checked)} />
              设为精选项目
            </label>
          </div>
        ) : null}

        {kind === 'tools' ? (
          <div className="form-extra">
            <label>
              工具链接
              <input value={values.url} onChange={(event) => update('url', event.target.value)} />
            </label>
            <label className="check-row">
              <input type="checkbox" checked={values.isSelfBuilt} onChange={(event) => update('isSelfBuilt', event.target.checked)} />
              自研工具
            </label>
            <label className="check-row">
              <input
                type="checkbox"
                checked={values.isRecommended}
                onChange={(event) => update('isRecommended', event.target.checked)}
              />
              推荐工具
            </label>
          </div>
        ) : null}

        <details className="advanced-settings">
          <summary>高级设置</summary>
          <div className="form-grid">
            <label>
              slug
              <input
                value={values.slug}
                onChange={(event) => updateSlug(event.target.value)}
                placeholder="保存时会自动生成"
              />
            </label>
            <label>
              SEO 标题
              <input value={values.seoTitle} onChange={(event) => update('seoTitle', event.target.value)} />
            </label>
            <label>
              SEO 描述
              <input value={values.seoDescription} onChange={(event) => update('seoDescription', event.target.value)} />
            </label>
            {kind !== 'posts' ? (
              <label>
                排序权重
                <input type="number" value={values.sortOrder} onChange={(event) => update('sortOrder', event.target.value)} />
              </label>
            ) : null}
            {kind === 'projects' ? (
              <label>
                封面标识
                <input value={values.cover} onChange={(event) => update('cover', event.target.value)} />
              </label>
            ) : null}
            {kind === 'tools' ? (
              <label>
                图标 URL
                <input value={values.icon} onChange={(event) => update('icon', event.target.value)} />
              </label>
            ) : null}
          </div>
        </details>

        {message ? <p className="form-message">{message}</p> : null}
        <div className="studio-form-actions">
          <button className="primary-button" type="submit" disabled={saving}>
            {saving ? '保存中...' : '保存内容'}
          </button>
          {id ? (
            <button className="danger-button" type="button" onClick={() => void handleDelete()}>
              删除
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
}
