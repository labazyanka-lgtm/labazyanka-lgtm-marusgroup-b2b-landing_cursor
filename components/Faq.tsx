"use client";

const FAQ = [
  {
    q: "Сколько занимает запуск пилота?",
    a: "Пилот в среднем стартует через 2–3 недели после подписания договора. Первый измеримый результат — в горизонте 4–8 недель.",
  },
  {
    q: "С какими системами вы работаете?",
    a: "1С (УТ, ERP, ЗУП), Bitrix24, amoCRM, SAP, Microsoft 365, маркетплейсы, банковские API, собственные ИС клиентов.",
  },
  {
    q: "Как формируется стоимость?",
    a: "Фиксируем стоимость диагностики и каждого этапа внедрения. На сопровождении — прозрачная подписка с понятным SLA.",
  },
  {
    q: "Где находятся ваши данные и серверы?",
    a: "По умолчанию — в дата-центрах на территории РФ. По запросу разворачиваем решение в вашей инфраструктуре on-premise.",
  },
  {
    q: "Подпишете ли NDA до встречи?",
    a: "Да, высылаем шаблон NDA в день обращения и готовы подписать встречную форму заказчика.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 section-title text-balance">
            Короткие ответы на вопросы, которые задают чаще всего
          </h2>
        </div>

        <div className="mt-10 grid gap-3 lg:grid-cols-2">
          {FAQ.map((item, idx) => (
            <details
              key={item.q}
              className="card group p-5 open:shadow-card"
              {...(idx === 0 ? { open: true } : {})}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink">
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-100 text-ink-muted transition group-open:rotate-45 group-open:bg-brand-50 group-open:text-brand-700"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
