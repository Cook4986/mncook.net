import Link from 'next/link';
import { SECTION_LINKS } from '@/content/sections';

/* =========================================================
   Footer — site footer with full section navigation.
   `variant="dark"` recolors links for the dark-themed routes.
   ========================================================= */

interface FooterProps {
  variant?: 'warm' | 'dark';
}

export default function Footer({ variant = 'warm' }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={`site-footer${variant === 'dark' ? ' site-footer--dark' : ''}`}>
      <div className="footer-brand">
        © {year} matt cook
      </div>
      <nav aria-label="Footer">
        <ul className="footer-links">
          {SECTION_LINKS.map((s) => (
            <li key={s.href}>
              <Link href={s.href}>{s.label}</Link>
            </li>
          ))}
          <li>
            <Link href="https://github.com/Cook4986" target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
