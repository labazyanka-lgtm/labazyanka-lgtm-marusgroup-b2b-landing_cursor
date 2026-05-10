/**
 * Тонкий клиентский слой для аналитических событий.
 *
 * Поддерживаются Яндекс.Метрика и Google Analytics 4. Скрипты подключаются
 * только если выставлены соответствующие env-переменные (см. site-config).
 *
 * Использование:
 *
 * ```ts
 * import { trackEvent } from "@/lib/analytics";
 * trackEvent("cta_click", { location: "hero" });
 * ```
 */

import { analytics } from "./site-config";

declare global {
  interface Window {
    ym?: (counterId: number, action: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent =
  | "cta_click"
  | "phone_click"
  | "email_click"
  | "estimate_submit"
  | "estimate_success"
  | "estimate_error";

export function trackEvent(
  event: AnalyticsEvent,
  params: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;

  const ymId = analytics.yandexMetrikaId;
  if (ymId && window.ym) {
    const numeric = Number(ymId);
    if (!Number.isNaN(numeric)) {
      try {
        window.ym(numeric, "reachGoal", event, params);
      } catch {
        // no-op: аналитика никогда не должна ломать UX
      }
    }
  }

  if (analytics.gaMeasurementId && window.gtag) {
    try {
      window.gtag("event", event, params);
    } catch {
      // no-op
    }
  }
}
