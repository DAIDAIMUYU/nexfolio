interface SectionHeadingProps {
  /** Kept for caller compatibility; intentionally not rendered (eyebrow-restraint). */
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
