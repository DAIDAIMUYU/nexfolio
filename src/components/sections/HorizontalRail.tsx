import { useEffect, useRef, useState } from 'react';

interface HorizontalRailProps {
  children: React.ReactNode;
  label: string;
}

export function HorizontalRail({ children, label }: HorizontalRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) {
      return undefined;
    }

    const updateState = () => {
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      setCanScroll(maxScroll > 2);
      setProgress(maxScroll > 0 ? rail.scrollLeft / maxScroll : 0);
    };

    const handleWheel = (event: WheelEvent) => {
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      if (maxScroll <= 2 || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      const atStart = rail.scrollLeft <= 0;
      const atEnd = rail.scrollLeft >= maxScroll - 1;
      const wantsPrevious = event.deltaY < 0;
      const wantsNext = event.deltaY > 0;

      if ((atStart && wantsPrevious) || (atEnd && wantsNext)) {
        return;
      }

      event.preventDefault();
      rail.scrollLeft += event.deltaY;
      updateState();
    };

    updateState();
    rail.addEventListener('scroll', updateState, { passive: true });
    rail.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('resize', updateState);

    return () => {
      rail.removeEventListener('scroll', updateState);
      rail.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', updateState);
    };
  }, []);

  const scrollByPage = (direction: 'previous' | 'next') => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    rail.scrollBy({
      left: direction === 'next' ? rail.clientWidth * 0.82 : -rail.clientWidth * 0.82,
      behavior: 'smooth',
    });
  };

  return (
    <div className="rail-shell">
      <div className="rail-controls" aria-label={`${label} 控制`}>
        <span>横向滑动</span>
        <div className="rail-buttons">
          <button type="button" onClick={() => scrollByPage('previous')} aria-label="向左切换" disabled={!canScroll}>
            ‹
          </button>
          <button type="button" onClick={() => scrollByPage('next')} aria-label="向右切换" disabled={!canScroll}>
            ›
          </button>
        </div>
      </div>
      <div className="rail-fade rail-fade-left" aria-hidden="true" />
      <div className="rail-fade rail-fade-right" aria-hidden="true" />
      <div className="horizontal-rail" aria-label={label} tabIndex={0} ref={railRef}>
        {children}
      </div>
      <div className="rail-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${Math.max(progress, 0.08)})` }} />
      </div>
    </div>
  );
}
