"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function GoogleAnalyticsInner({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId) return;
    if (typeof window === "undefined") return;
    if (!window.gtag) return;

    const search = searchParams?.toString();
    const pagePath = search ? `${pathname}?${search}` : pathname;

    // GA4: 明示的に page_view イベントを送信
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [gaId, pathname, searchParams]);

  return null;
}

export function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner gaId={gaId} />
    </Suspense>
  );
}


