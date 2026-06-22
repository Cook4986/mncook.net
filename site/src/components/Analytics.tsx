'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/* =========================================================
   Analytics — GoatCounter (cookieless, no consent banner)
   -----------------------------------------------------------------
   Stats are viewed on the hosted dashboard at
   https://cook4986.goatcounter.com (plus optional email reports);
   nothing is self-hosted here.

   count.js is loaded with `no_onload` so it never auto-counts. We
   instead fire one pageview per client-side route change below,
   which is necessary because next/link navigates without a full
   page reload. Set NEXT_PUBLIC_GOATCOUNTER_URL to override the
   endpoint (e.g. for a staging site).
   ========================================================= */

const GC_ENDPOINT =
  process.env.NEXT_PUBLIC_GOATCOUNTER_URL ?? 'https://cook4986.goatcounter.com/count';

declare global {
  interface Window {
    goatcounter?: {
      count?: (vars?: { path?: string; title?: string; event?: boolean }) => void;
      [key: string]: unknown;
    };
  }
}

function PageviewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // count.js loads async, so it may not be ready on the first
    // navigation — poll briefly until the count() method exists.
    // The cancelled flag + cleared timer prevent a stray pageview
    // (or a setState-after-unmount style leak) if the route changes
    // or the component unmounts before count.js finishes loading.
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let tries = 0;

    const send = () => {
      if (cancelled) return;
      if (window.goatcounter?.count) {
        window.goatcounter.count({
          path: window.location.pathname + window.location.search + window.location.hash,
        });
        return;
      }
      if (tries++ < 50) {
        timer = setTimeout(send, 100);
      }
    };
    send();

    return () => {
      cancelled = true;
      if (timer !== undefined) clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}

export default function Analytics() {
  return (
    <>
      <Script
        data-goatcounter={GC_ENDPOINT}
        data-goatcounter-settings='{"no_onload": true}'
        src="https://gc.zgo.at/count.js"
        strategy="afterInteractive"
      />
      <PageviewTracker />
    </>
  );
}
