import Image from "next/image";

const STATS = [
  { v: "с 2008", k: "на рынке" },
  { v: "50+", k: "объектов ведущих застройщиков Москвы" },
  { v: "1500+ м²", k: "отшлифованного и отполированного стекла" },
];

const PROJECTS = [
  {
    name: "ЖК Eleven",
    client: "АО «Хлебозавод»",
    period: "с 02.2023",
    scope: "2 корпуса",
    image: "/projects/eleven.jpg",
    imageAlt:
      "Фрагмент фасада и остекления жилого комплекса Eleven после работ по реставрации СПК",
    works: [
      "реставрация СПК внутри корпусов и снаружи по фасаду",
      "шлифовка и полировка внутреннего СПК",
      "проектирование, испытание и монтаж анкерных точек для сезонной мойки (доп. контракт)",
    ],
  },
  {
    name: "ЖК City Bay",
    client: "ООО «СУ-10»",
    period: "с 08.2023",
    scope: "6 корпусов",
    image: "/projects/city-bay.jpg",
    imageAlt:
      "Объект City Bay: реставрация светопрозрачных конструкций на корпусах",
    works: [
      "реставрация СПК внутри корпусов и снаружи по фасаду с люлек и альпинистами",
      "мойка стекла перед проверкой",
      "работы по контракту продолжаются",
    ],
  },
  {
    name: "Level Причальный",
    client: "АО СЗ «ИНСПАЙР»",
    period: "с 11.2023",
    scope: "4 корпуса",
    image: "/projects/level-prichalny.jpg",
    imageAlt:
      "Комплекс Level Причальный: фасадное остекление и работы по профилю",
    works: [
      "реставрация СПК внутри корпусов и снаружи по фасаду альпинистами",
      "реставрация алюминиевых профилей ОБ",
      "гидроизоляция ОБ",
      "оклейка атермальной тонировочной плёнкой",
      "покрытие керамическим составом",
    ],
  },
  {
    name: "Level Нагатинская",
    client: "ООО «СЗ Инвестиционное развитие»",
    period: "с 03.2024",
    scope: "4 корпуса",
    image: "/projects/level-nagatinskaya.jpg",
    imageAlt:
      "Level Нагатинская: мойка и реставрация стекла на объекте застройщика",
    works: [
      "мойка после завершения строительных работ альпинистами и внутри корпусов",
      "реставрация алюминиевых профилей ОБ",
      "реставрация СПК внутри корпусов и снаружи альпинистами",
      "оклейка полиуретановой плёнкой",
      "покрытие гидрофобным составом",
    ],
  },
  {
    name: "ЖК Событие-2",
    client: "ООО «Донстрой»",
    period: "с 05.2024",
    scope: "2 корпуса",
    image: "/projects/sobytie-2.jpg",
    imageAlt:
      "ЖК Событие-2: реставрация фасадного остекления перед приёмкой",
    works: [
      "реставрация фасадного остекления альпинистами",
      "мойка стекла перед проверкой",
      "оклейка атермальной тонировочной плёнкой",
      "покрытие гидрофобным составом",
    ],
  },
  {
    name: "ЖК SOHO-NOHO",
    client: "ООО «Уэйнбридж девелопмент»",
    period: "с 06.2024",
    scope: "стилобат",
    image: "/projects/soho-noho.jpg",
    imageAlt:
      "ЖК SOHO-NOHO: витринное фасадное остекление стилобата после работ",
    works: [
      "реставрация фасадного витринного остекления",
      "мойка стекла перед проверкой",
      "оклейка полиуретановой плёнкой",
      "покрытие керамическим составом",
    ],
  },
  {
    name: "Level Стрешнево",
    client: "ООО «Левел Груп»",
    period: "с 08.2024",
    scope: "1 корпус",
    image: "/projects/level-streshnevo.jpg",
    imageAlt:
      "Level Стрешнево: балконный блок и светопрозрачные конструкции корпуса",
    works: [
      "комплексный ремонт и регулировка балконных дверей",
      "реставрация алюминиевого балконного блока",
      "мойка СПК",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="section bg-surface-subtle">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow">Опыт</p>
          <h2 className="mt-4 section-title text-balance">
            Не эксперимент на вашем объекте — десятки корпусов у девелоперов,
            которым нельзя промахнуться
          </h2>
          <p className="section-subtitle">
            С 2008 года делаем финишную стадию там, где ошибка видна с улицы и
            в акте. Ниже — факты по объектам: заказчик, объём, виды работ. Это
            ваш якорь вероятности «они уже проходили этот ад».
          </p>
        </div>

        <div className="mt-10 card p-8 sm:p-10 bg-gradient-to-br from-accent-700 to-accent-900 text-white ring-0 shadow-cta">
          <dl className="grid gap-8 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.k}>
                <dt className="text-3xl sm:text-4xl font-semibold tracking-tight">
                  {s.v}
                </dt>
                <dd className="mt-2 text-sm text-white/75 max-w-[18rem]">
                  {s.k}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold tracking-tight text-ink">
            Объекты, на которых работали и работаем
          </h3>
          <p className="mt-2 text-sm text-ink-muted max-w-2xl">
            Без выдуманных результатов — только фактический объём, заказчик и
            виды работ. Фото объектов перенесены с действующего сайта MARUS GROUP;
            логотипы клиентов не используем без отдельного разрешения.
          </p>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p) => (
              <li key={p.name} className="card overflow-hidden flex flex-col p-0">
                <div className="relative aspect-[4/3] w-full bg-surface-subtle">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-semibold tracking-tight text-ink">
                        {p.name}
                      </h4>
                      <p className="mt-1 text-sm text-ink-muted">{p.client}</p>
                    </div>
                    <span className="pill shrink-0">{p.period}</span>
                  </div>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                    Объём
                  </p>
                  <p className="mt-1 text-sm font-medium text-ink">{p.scope}</p>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                    Виды работ
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
                    {p.works.map((w) => (
                      <li key={w} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <a href="#estimate" className="btn-secondary">
            Показать задачу — сравним с похожим кейсом
          </a>
        </div>
      </div>
    </section>
  );
}
