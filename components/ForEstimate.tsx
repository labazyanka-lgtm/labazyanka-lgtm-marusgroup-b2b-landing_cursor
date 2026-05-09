const ITEMS = [
  "название объекта или ЖК",
  "зона работ",
  "стадия объекта",
  "фото дефектов",
  "примерный объём",
  "тип поверхностей",
  "желаемые сроки",
  "требования к доступу",
  "контакт ответственного лица",
  "нужен ли выезд на дефектовку",
  "требуется ли предварительное КП",
];

export function ForEstimate() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow">Предварительная оценка</p>
            <h2 className="mt-4 section-title text-balance">
              Что нужно для предварительной оценки объекта
            </h2>
            <p className="section-subtitle">
              Для первичной оценки достаточно передать информацию об объекте,
              зоне работ, характере замечаний и сроках.
            </p>
            <div className="mt-8">
              <a href="#estimate" className="btn-primary">
                Отправить данные по объекту
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="card p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {ITEMS.map((it) => (
                <li key={it} className="flex items-start gap-2.5 text-sm">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="text-ink">{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
