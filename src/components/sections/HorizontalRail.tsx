interface HorizontalRailProps {
  children: React.ReactNode;
  label: string;
}

export function HorizontalRail({ children, label }: HorizontalRailProps) {
  return (
    <div className="horizontal-rail" aria-label={label} tabIndex={0}>
      {children}
    </div>
  );
}
