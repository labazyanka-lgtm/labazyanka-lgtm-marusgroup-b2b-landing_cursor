declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const ymId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function ymIdNum(): number | null {
  if (!ymId) return null;
  const n = Number(ymId);
  return Number.isFinite(n) ? n : null;
}

/** Успешная отправка формы заявки — цель в Метрике и конверсия в GA4 */
export function trackEstimateSubmit(): void {
  if (typeof window === "undefined") return;

  const id = ymIdNum();
  if (id !== null && typeof window.ym === "function") {
    window.ym(id, "reachGoal", "estimate_submit");
  }

  if (gaId && typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", { form_id: "estimate" });
  }
}

/** Клик по CTA: имя цели должно совпадать с настроенной в Яндекс.Метрике */
export function trackCtaClick(goal: string): void {
  if (typeof window === "undefined") return;

  const id = ymIdNum();
  if (id !== null && typeof window.ym === "function") {
    window.ym(id, "reachGoal", goal);
  }

  if (gaId && typeof window.gtag === "function") {
    window.gtag("event", goal, { event_category: "cta" });
  }
}
