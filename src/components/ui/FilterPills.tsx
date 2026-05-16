interface FilterPillsProps<T extends string> {
  items: T[];
  value: T | '全部';
  onChange: (value: T | '全部') => void;
  label: string;
}

export function FilterPills<T extends string>({ items, value, onChange, label }: FilterPillsProps<T>) {
  return (
    <div className="filter-group" aria-label={label}>
      {(['全部', ...items] as Array<T | '全部'>).map((item) => (
        <button
          className={`pill-button ${value === item ? 'is-active' : ''}`}
          key={item}
          onClick={() => onChange(item)}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
