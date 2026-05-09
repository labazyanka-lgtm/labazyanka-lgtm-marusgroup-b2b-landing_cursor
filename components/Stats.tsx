const STATS = [
  { v: "120+", k: "проектов с 2017" },
  { v: "₽ 2,4 млрд", k: "сэкономлено клиентами" },
  { v: "4×", k: "ускорение операций в среднем" },
  { v: "99.95%", k: "SLA на сопровождении" },
];

export function Stats() {
  return (
    <section aria-label="Результаты в цифрах" className="section">
      <div className="container">
        <div className="card p-8 sm:p-10 lg:p-14 bg-gradient-to-br from-brand-700 to-brand-900 text-white ring-0 shadow-cta">
          <div className="grid gap-10 lg:grid-cols-12 items-end">
            <div className="lg:col-span-5">
              <p className="eyebrow !bg-white/10 !text-white !ring-white/20">
                Результаты
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
                Цифры, которые видят финансисты, а не только маркетинг
              </h2>
              <p className="mt-4 text-white/80 max-w-md">
                Мы фиксируем целевые метрики на старте и отчитываемся по ним
                каждый квартал.
              </p>
            </div>
            <dl className="lg:col-span-7 grid grid-cols-2 gap-6 sm:gap-10">
              {STATS.map((s) => (
                <div key={s.k}>
                  <dt className="text-3xl sm:text-4xl font-semibold tracking-tight">
                    {s.v}
                  </dt>
                  <dd className="mt-1.5 text-sm text-white/70">{s.k}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
