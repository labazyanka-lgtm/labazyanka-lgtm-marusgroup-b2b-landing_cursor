import Image from "next/image";
import { Logo } from "./Logo";

const STATS = [
  { value: "с 2008", label: "на рынке" },
  { value: "50+", label: "объектов ведущих застройщиков Москвы" },
  { value: "1500+ м²", label: "отшлифованного и отполированного стекла" },
];

const PROJECTS = [
  {
    name: "ЖК Eleven",
    image: "/projects/eleven.jpg",
    client: "АО «Хлебозавод»",
    period: "с 02.2023",
    scope: "2 корпуса",
    works: [
      "реставрация СПК внутри корпусов и снаружи по фасаду",
      "шлифовка и полировка внутреннего СПК",
      "монтаж анкерных точек для сезонной мойки",
    ],
  },
  {
    name: "ЖК City Bay",
    image: "/projects/city-bay.jpg",
    client: "ООО «СУ-10»",
    period: "с 08.2023",
    scope: "6 корпусов",
    works: [
      "реставрация СПК внутри корпусов и снаружи по фасаду",
      "работа с люлек и промышленными альпинистами",
      "мойка стекла перед проверкой",
    ],
  },
  {
    name: "ЖК SOHO-NOHO",
    image: "/projects/soho-noho.jpg",
    client: "ООО «Уэйнбридж девелопмент»",
    period: "с 06.2024",
    scope: "стилобат",
    works: [
      "реставрация фасадного витринного остекления",
      "мойка стекла перед проверкой",
      "покрытие керамическим составом",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="section bg-[#282827] text-white">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow !bg-white/10 !text-[#dabfa6] !ring-white/15">
              Реализованные объекты
            </p>
            <h2 className="mt-4 font-display text-3xl font-normal uppercase leading-[1.05] tracking-tight text-[#dabfa6] sm:text-5xl">
              Примеры выполненных работ MARUS GROUP
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              Фирменная подача MARUS GROUP: логотип, шрифтовая пара Jost /
              Montserrat, тёмный фон и реальные примеры объектов из портфолио
              компании.
            </p>
          </div>

          <div className="lg:col-span-5 lg:justify-self-end">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-cta">
              <Logo variant="light" className="w-[220px]" />
              <dl className="mt-8 grid grid-cols-3 gap-5">
                {STATS.map((item) => (
                  <div key={item.label}>
                    <dt className="font-display text-2xl font-normal text-[#dabfa6] sm:text-3xl">
                      {item.value}
                    </dt>
                    <dd className="mt-2 text-xs leading-5 text-white/65">
                      {item.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <li
              key={project.name}
              className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white text-ink shadow-card"
            >
              <div className="relative h-56">
                <Image
                  src={project.image}
                  alt={`Фото объекта ${project.name}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#282827]">
                    {project.period}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-normal uppercase leading-tight text-[#c89f79]">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm text-ink-muted">
                      {project.client}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#f7efe7] px-3 py-1 text-xs font-semibold text-[#8f6741]">
                    {project.scope}
                  </span>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-ink-muted">
                  {project.works.map((work) => (
                    <li key={work} className="flex gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c89f79]"
                      />
                      <span>{work}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#estimate" className="btn-on-dark">
            Показать похожую задачу на вашем объекте
          </a>
          <p className="text-sm text-white/60">
            Данные по объектам — из публичного портфолио MARUS GROUP.
          </p>
        </div>
      </div>
    </section>
  );
}
