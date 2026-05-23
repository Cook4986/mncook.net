'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/* =========================================================
   SiteNav — Floating navigation bar
   
   Transparent on the dark hero landing, transitions to a
   solid backdrop on scroll.
   ========================================================= */

interface SiteNavProps {
  variant?: 'dark' | 'warm';
}

export default function SiteNav({ variant = 'dark' }: SiteNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = variant === 'warm'
    ? 'site-nav site-nav--warm'
    : scrolled
      ? 'site-nav site-nav--solid'
      : 'site-nav site-nav--transparent';

  const logoClass = variant === 'warm' ? 'nav-logo nav-logo--dark' : 'nav-logo';

  return (
    <nav className={navClass} id="site-navigation">
      <Link href="/" className={logoClass}>
        matt cook
      </Link>
    </nav>
  );
}
