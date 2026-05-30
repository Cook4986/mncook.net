import Link from 'next/link';

/* =========================================================
   Footer — Minimal site footer
   ========================================================= */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        © {year} matt cook
      </div>
      <ul className="footer-links">
        <li><Link href="https://github.com/Cook4986" target="_blank" rel="noopener noreferrer">GitHub</Link></li>
        <li><Link href="/textual">Writing</Link></li>
        <li><Link href="/professional">Projects</Link></li>
      </ul>
    </footer>
  );
}
