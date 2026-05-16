import { NavLink } from 'react-router-dom';
import { site } from '../../data/site';

const navItems = [
  { to: '/', label: '首页' },
  { to: '/projects', label: '项目' },
  { to: '/blog', label: '博客' },
  { to: '/tools', label: '工具' },
  { to: '/about', label: '关于' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <header className="topbar">
        <NavLink to="/" className="brand" aria-label="返回首页">
          <span className="brand-mark">N</span>
          <span>
            <strong>{site.name}</strong>
            <small>{site.shortName}</small>
          </span>
        </NavLink>
        <nav className="nav-links" aria-label="主导航">
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
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div>
          <strong>{site.name}</strong>
          <p>{site.description}</p>
        </div>
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
      </footer>
    </div>
  );
}
