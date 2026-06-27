'use client';

import { useEffect, useRef, useState } from 'react';

/* =========================================================
   ShareButton — sits beside the close (✕) in a section popup.

   Shares the canonical hash URL for the open section
   (e.g. https://mncook.net/#textual) so a recipient lands on
   the gem with that popup auto-opened. Uses the native share
   sheet where available and falls back to copy-to-clipboard
   with a brief confirmation toast. Fires a GoatCounter event.
   ========================================================= */

interface ShareButtonProps {
  slug: string;
  title: string;
}

type Feedback = { kind: 'copied' | 'error'; text: string } | null;

export default function ShareButton({ slug, title }: ShareButtonProps) {
  const [feedback, setFeedback] = useState<Feedback>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const flash = (next: Feedback) => {
    setFeedback(next);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setFeedback(null), 2400);
  };

  const handleShare = async () => {
    // Build from the live origin so the link is correct in every
    // environment (prod, preview, localhost) while still resolving to
    // the canonical hash URL on mncook.net.
    const origin =
      typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : 'https://mncook.net';
    const url = `${origin}/#${slug}`;
    const shareTitle = `${title} — matt cook`;

    // Count the share intent (cookieless, no PII).
    window.goatcounter?.count?.({ path: `share/${slug}`, event: true });

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: shareTitle, url });
        return;
      } catch (err) {
        // User dismissed the sheet, or share was blocked — fall through
        // to clipboard only if it wasn't an explicit cancel.
        if (err instanceof DOMException && err.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      flash({ kind: 'copied', text: 'Link copied' });
    } catch {
      flash({ kind: 'error', text: 'Copy this link: ' + url });
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleShare}
        aria-label="Share this section"
        className="share-button"
        style={{
          position: 'absolute',
          top: 'clamp(12px, 3vw, 20px)',
          right: 'clamp(58px, 4vw + 42px, 70px)',
          background: 'none',
          border: 'none',
          color: 'var(--ivory-dim)',
          cursor: 'pointer',
          fontSize: '1.25rem',
          lineHeight: 1,
          zIndex: 10,
          padding: '8px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Share / link glyph (inline SVG so it matches the ✕ weight) */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
          <line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
        </svg>
      </button>

      <div className="share-toast-region" aria-live="polite" role="status">
        {feedback && <span className="share-toast">{feedback.text}</span>}
      </div>
    </>
  );
}
