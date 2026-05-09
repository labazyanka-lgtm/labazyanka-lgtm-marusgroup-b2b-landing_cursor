const STEPS = [
  {
    n: "01",
    title: "Диагностика",
    desc:
      "Изучаем процессы, системы и метрики. Готовим карту узких мест и потенциала за 5–10 рабочих дней.",
  },
  {
    n: "02",
    title: "Архитектура решения",
    desc:
      "Предлагаем целевую архитектуру, дорожную карту, бюджет и KPI. Защищаем подход на уровне совета директоров.",
  },
  {
    n: "03",
    title: "Внедрение спринтами",
    desc:
      "Поставляем ценность каждые 2 недели. Прозрачные демо, фиксированная стоимость этапов, контроль рисков.",
  },
  {
    n: "04",
    title: "Сопровождение и развитие",
    desc:
      "Берём систему на SLA, развиваем roadmap и помогаем командам использовать платформу на 100%.",
  },
];

export function Process() {
  return (
    <section id="process" className="section bg-surface-subtle">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow">Как мы работаем</p>
          <h2 className="mt-4 section-title text-balance">
            Прозрачный процесс с измеримым результатом на каждом этапе
          </h2>
          <p className="section-subtitle">
            Никаких «чёрных ящиков». Вы видите промежуточные артефакты,
            метрики и риски — и принимаете решения на каждом шаге.
          </p>
        </div>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, idx) => (
            <li
              key={s.n}
              className="card relative p-6 flex flex-col"
            >
              <span className="text-sm font-semibold text-brand-600">
                {s.n}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {s.desc}
              </p>
              {idx < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden lg:block absolute top-7 -right-3 h-px w-6 bg-gradient-to-r from-brand-300 to-transparent"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
