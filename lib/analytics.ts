/**
 * Тонкая обёртка над Яндекс.Метрикой и GA4. Не падает, если ни одна из систем
 * не подключена (отсутствуют env-переменные) — просто становится no-op.
 */

import { siteConfig } from "@/lib/site-config";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    ym?: (counterId: number | string, action: string, ...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params?: Params): void {
  if (typeof window === "undefined") return;

  const cleaned: Params = {};
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined) cleaned[k] = v;
    }
  }

  const ymId = siteConfig.analytics.yandexMetrikaId;
  if (ymId && typeof window.ym === "function") {
    try {
      window.ym(ymId, "reachGoal", name, cleaned);
    } catch {
      /* swallow */
    }
  }

  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", name, cleaned);
    } catch {
      /* swallow */
    }
  }
}
