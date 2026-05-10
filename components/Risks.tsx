import {
  RefreshCw,
  AlertTriangle,
  Hammer,
  Footprints,
  FileWarning,
  CalendarX,
  Wallet,
  TrendingDown,
} from "lucide-react";

const RISKS = [
  { icon: RefreshCw, label: "Повторные переделки" },
  { icon: AlertTriangle, label: "Новые повреждения отделки" },
  {
    icon: Hammer,
    label: "Повреждение дверей, батарей, подоконников, стен и полов",
  },
  { icon: Footprints, label: "Следы работ в готовых помещениях" },
  { icon: FileWarning, label: "Претензии от технадзора, УК или покупателя" },
  { icon: CalendarX, label: "Срыв сроков сдачи" },
  { icon: Wallet, label: "Дополнительные расходы" },
  { icon: TrendingDown, label: "Репутационные риски для застройщика" },
];

export function Risks() {
  return (
    <section className="section bg-surface-subtle">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow">Риски на финальной стадии</p>
          <h2 className="mt-4 section-title text-balance">
            На готовом объекте важен не только результат, но и отсутствие новых
            проблем после работ
          </h2>
          <p className="section-subtitle">
            Ошибки подрядчика на финальной стадии могут привести к повторным
            переделкам, новым повреждениям отделки и претензиям при приёмке.
          </p>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {RISKS.map((r) => (
            <li
              key={r.label}
              className="card-flat p-5 flex items-start gap-3"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-accent-700 ring-1 ring-inset ring-line">
                <r.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-ink leading-snug">
                {r.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <a href="#estimate" className="btn-secondary">
            Показать объект для оценки рисков и объёма работ
          </a>
        </div>
      </div>
    </section>
  );
}
