import {
  Factory,
  Truck,
  ShoppingBag,
  Building2,
  Banknote,
  Stethoscope,
} from "lucide-react";

const INDUSTRIES = [
  { icon: Factory, title: "Производство", desc: "MES, плановое ТО, цифровой цех" },
  { icon: Truck, title: "Логистика", desc: "TMS, диспетчеризация, маршрутизация" },
  { icon: ShoppingBag, title: "Ритейл и e-commerce", desc: "Омниканальные продажи и аналитика SKU" },
  { icon: Building2, title: "Девелопмент", desc: "Управление портфелем и стройконтроль" },
  { icon: Banknote, title: "Финансы", desc: "Антифрод, скоринг, корпоративная отчётность" },
  { icon: Stethoscope, title: "Медицина", desc: "МИС, телемед, аналитика пациентопотока" },
];

export function Industries() {
  return (
    <section id="industries" className="section bg-surface-subtle">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Индустрии</p>
            <h2 className="mt-4 section-title text-balance">
              Понимаем специфику ваших процессов и регуляторики
            </h2>
            <p className="section-subtitle">
              Шесть ключевых индустрий, в которых у нас есть готовые решения и
              отраслевая экспертиза.
            </p>
          </div>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((i) => (
            <li
              key={i.title}
              className="card p-6 flex items-start gap-4 transition hover:-translate-y-0.5 hover:shadow-cta/40"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100">
                <i.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-base font-semibold tracking-tight">
                  {i.title}
                </h3>
                <p className="mt-1 text-sm text-ink-muted">{i.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
