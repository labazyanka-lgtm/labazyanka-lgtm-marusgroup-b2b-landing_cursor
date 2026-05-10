"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Делегированный listener: любой кликабельный элемент с атрибутом
 * data-analytics="<location>" автоматически шлёт в аналитику событие.
 *
 * Тип события подбирается по href ближайшей ссылки:
 *   - tel:    → phone_click
 *   - mailto: → email_click
 *   - else    → cta_click
 *
 * Это даёт сквозную аналитику кликов по CTA / телефонам / почте без
 * расстановки руками handler'ов в каждый компонент.
 */
export function AnalyticsClicks() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>("[data-analytics]");
      if (!el) return;
      const location = el.getAttribute("data-analytics");
      if (!location) return;

      const link = el.closest("a") as HTMLAnchorElement | null;
      const href = link?.getAttribute("href") || "";
      let type: "phone_click" | "email_click" | "cta_click" = "cta_click";
      if (href.startsWith("tel:")) type = "phone_click";
      else if (href.startsWith("mailto:")) type = "email_click";

      trackEvent(type, { location, href: href || undefined });
    };

    document.addEventListener("click", handler, { capture: true });
    return () => document.removeEventListener("click", handler, { capture: true } as EventListenerOptions);
  }, []);

  return null;
}
