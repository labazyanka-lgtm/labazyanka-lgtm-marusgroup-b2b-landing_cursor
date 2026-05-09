const COMPANIES = [
  "Северсталь-Логистика",
  "Промтех Капитал",
  "АльфаДистрибуция",
  "Технополис",
  "Восток Ритейл",
  "Аркада Финанс",
];

export function TrustBar() {
  return (
    <section
      aria-label="Нам доверяют"
      className="border-y border-slate-200/70 bg-surface-subtle"
    >
      <div className="container py-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
          Нам доверяют команды из 80+ компаний среднего и крупного бизнеса
        </p>
        <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-4 items-center">
          {COMPANIES.map((c) => (
            <li
              key={c}
              className="text-center text-sm font-semibold tracking-tight text-ink-muted/80"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
