import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
}

export function EmptyState({ title, description, actionLabel, actionTo }: EmptyStateProps) {
  return (
    <div className="glass-card empty-state">
      <span className="eyebrow">Empty</span>
      <h2>{title}</h2>
      <p>{description}</p>
      {actionLabel && actionTo ? (
        <Link className="secondary-button" to={actionTo}>
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
