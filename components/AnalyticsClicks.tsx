"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/**
 * Делегированный обработчик кликов: пробегает по DOM-вверх в поисках
 * `data-analytics="<location>"` и эмитит соответствующее событие.
 *
 * Тип события определяется по `href`:
 * - `tel:`    -> phone_click
 * - `mailto:` -> email_click
 * - всё остальное -> cta_click
 *
 * Чтобы аналитика срабатывала, достаточно дописать
 * `data-analytics="<location>"` на ссылку или кнопку.
 */
export function AnalyticsClicks() {
  useEffect(() => {
    const handler = (ev: MouseEvent) => {
      const target = ev.target;
      if (!(target instanceof Element)) return;
      const node = target.closest<HTMLElement>("[data-analytics]");
      if (!node) return;

      const location = node.dataset.analytics;
      if (!location) return;

      let event: AnalyticsEvent = "cta_click";
      const href = (node as HTMLAnchorElement).href || "";
      if (href.startsWith("tel:")) event = "phone_click";
      else if (href.startsWith("mailto:")) event = "email_click";

      trackEvent(event, { location });
    };

    document.addEventListener("click", handler, { capture: true });
    return () => document.removeEventListener("click", handler, { capture: true });
  }, []);

  return null;
}
