const ZONES = [
  "двери",
  "батареи",
  "подоконники",
  "стены",
  "полы",
  "откосы",
  "фасадные элементы",
  "инженерные элементы",
  "рабочая зона",
  "проходы и места перемещения оборудования",
];

export function SurfaceProtection() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow">Защита отделки</p>
            <h2 className="mt-4 section-title text-balance">
              Бонус к основной работе: сохраняем то, за что вы уже заплатили
              дольщику
            </h2>
            <p className="section-subtitle">
              Восстановление стекла бессмысленно, если рядом испортить пол или
              подоконник. Защита смежных зон — не опция, а часть пакета, чтобы
              суммарный риск для вас не вырос.
            </p>
            <div className="mt-8">
              <a href="#estimate" className="btn-secondary">
                Согласовать перечень защищаемых зон на объекте
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="card p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
                Зоны, которые защищаем перед началом работ
              </p>
              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {ZONES.map((z) => (
                  <li key={z} className="flex items-start gap-2.5 text-sm">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span className="text-ink">{z}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
