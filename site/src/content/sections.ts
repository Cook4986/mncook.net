/* =========================================================
   Section links — single source of truth for site navigation.
   Used by the footer, the homepage's accessible/no-JS nav, the
   404 page, and the sitemap so they never drift out of sync.
   ========================================================= */

export interface SectionLink {
  href: string;
  label: string;
}

export const SECTION_LINKS: SectionLink[] = [
  { href: '/textual', label: 'Textual' },
  { href: '/professional', label: 'Professional' },
  { href: '/spatial', label: 'Spatial' },
  { href: '/audiovisual', label: 'Audiovisual' },
  { href: '/technical', label: 'Technical' },
  { href: '/contact', label: 'Contact' },
];
