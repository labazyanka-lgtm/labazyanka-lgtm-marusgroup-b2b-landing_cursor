import {
  Workflow,
  PlugZap,
  LineChart,
  ShieldCheck,
} from "lucide-react";

const SERVICES = [
  {
    icon: Workflow,
    title: "Автоматизация процессов",
    desc:
      "Перепроектируем и автоматизируем сквозные процессы — от продаж до закрытия периода — на проверенных платформах.",
    bullets: [
      "BPM/ERP/CRM",
      "Регламенты и SLA",
      "Контроль исполнения",
    ],
  },
  {
    icon: PlugZap,
    title: "Интеграции и данные",
    desc:
      "Соединяем 1С, CRM, маркетплейсы, банки и любые внутренние системы в единый управляемый контур.",
    bullets: [
      "API и шина данных",
      "ETL и хранилище",
      "Мониторинг качества данных",
    ],
  },
  {
    icon: LineChart,
    title: "Аналитика и BI",
    desc:
      "Прозрачная отчётность для CEO, CFO и операционных команд: дашборды, прогнозы и unit-экономика в одном окне.",
    bullets: [
      "Дашборды для C-level",
      "Прогнозные модели",
      "Юнит-экономика",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Сопровождение 24/7",
    desc:
      "Берём ответственность за результат после внедрения: SLA, регулярный аудит и развитие платформы.",
    bullets: [
      "SLA до 99.95%",
      "Аудит безопасности",
      "Команда поддержки",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow">Что мы делаем</p>
          <h2 className="mt-4 section-title text-balance">
            Полный стек услуг для управляемого роста бизнеса
          </h2>
          <p className="section-subtitle">
            Закрываем задачи на стыке процессов, технологий и данных. Подбираем
            архитектуру под вашу зрелость и масштабируем вместе с вами.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <li key={s.title} className="card p-6 flex flex-col">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100">
                <s.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {s.desc}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink-muted">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
