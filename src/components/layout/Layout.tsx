import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { site } from '../../data/site';

const navItems = [
  { to: '/', label: '首页' },
  { to: '/projects', label: '项目' },
  { to: '/blog', label: '博客' },
  { to: '/tools', label: '工具' },
  { to: '/about', label: '关于' },
];

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  if (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark') {
    return 'dark';
  }
  return 'light';
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((current) => {
      const next: Theme = current === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem('theme', next);
      } catch {
        /* ignore storage failures (private mode) */
      }
      return next;
    });
  };

  return (
    <div className="site-shell">
      <header className={`topbar ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-menu-open' : ''}`}>
        <NavLink to="/" className="brand" aria-label="返回首页">
          <span className="brand-mark">N</span>
          <span>
            <strong>{site.shortName}</strong>
            <small>{site.name}</small>
          </span>
        </NavLink>
        <nav
          className={`nav-links ${menuOpen ? 'is-open' : ''}`}
          id="primary-navigation"
          aria-label="主导航"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path
                  strokeLinecap="round"
                  d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
              </svg>
            )}
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
            <strong>菜单</strong>
          </button>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div>
          <strong>{site.shortName}</strong>
          <p>{site.description}</p>
          <span className="footer-version">{site.version} · Studio 已接入，内容由 Supabase 发布流驱动</span>
        </div>
        <div className="footer-links" aria-label="站点链接">
          <a href={site.contact.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <span>{site.contact.emailLabel}</span>
        </div>
      </footer>
    </div>
  );
}
