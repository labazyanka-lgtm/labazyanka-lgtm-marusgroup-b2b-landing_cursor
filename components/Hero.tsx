import {
  ArrowRight,
  ShieldCheck,
  ClipboardList,
  CheckCircle2,
  FileCheck2,
  Camera,
  CalendarDays,
} from "lucide-react";

const MARKERS = [
  { icon: ShieldCheck, label: "Отделку закрываем — работаем только в зоне дефекта" },
  { icon: ClipboardList, label: "12 шагов: от заявки до акта, без «серых зон»" },
  { icon: CheckCircle2, label: "Фото до/после и осмотр — результат можно защитить" },
  { icon: FileCheck2, label: "Документы под договор и технадзор" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-radial">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-soft [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] opacity-30"
      />
      <div className="container relative pt-14 pb-20 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              Подрядчик по финальной стадии для застройщиков бизнес-класса
            </p>
            <h1 className="mt-5 text-balance text-[2rem] sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.05] tracking-tight">
              Доводим стекло и алюминиевый профиль на объектах бизнес-класса до{" "}
              <span className="text-accent">чистой приёмки</span> — без новых
              замечаний после наших работ
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-muted text-pretty">
              Итог, который выгоден заказчику: замечания по стеклу и профилю
              закрыты, готовые зоны не пострадали, сроки сдачи не размываются
              из‑за переделок. Первичный разбор — по фото; ответ по заявке — до
              1 рабочего дня.
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 max-w-lg">
              {MARKERS.map((m) => (
                <li
                  key={m.label}
                  className="flex items-center gap-2.5 text-sm text-ink"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-glass text-accent-700 ring-1 ring-inset ring-accent-200/70">
                    <m.icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="font-medium">{m.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#estimate" className="btn-primary">
                Получить разбор и следующий шаг
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#estimate" className="btn-secondary">
                <Camera className="h-4 w-4 text-accent" aria-hidden="true" />
                Бесплатный первичный разбор по фото
              </a>
              <a href="#estimate" className="btn-ghost">
                <CalendarDays className="h-4 w-4 text-accent" aria-hidden="true" />
                Забронировать выезд на дефектовку
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ObjectCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function ObjectCard() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-br from-glass via-white to-transparent blur-2xl opacity-80"
      />
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-line/70 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
              Карта объекта
            </span>
          </div>
          <span className="pill text-[11px] !text-accent-700 !ring-accent-200/70 !bg-glass">
            Зона готова к приёмке
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-wider text-ink-soft">
                Объект
              </dt>
              <dd className="mt-1 font-semibold text-ink">ЖК бизнес-класса</dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-wider text-ink-soft">
                Стадия
              </dt>
              <dd className="mt-1 font-semibold text-ink">
                Передача помещений
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-wider text-ink-soft">
                Зона работ
              </dt>
              <dd className="mt-1 font-semibold text-ink">
                Готовые помещения, МОПы, фасад
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-wider text-ink-soft">
                Тип замечаний
              </dt>
              <dd className="mt-1 font-semibold text-ink">
                Стекло, алюминиевый профиль
              </dd>
            </div>
          </dl>

          <ul className="mt-6 space-y-2.5">
            {[
              "Защита отделки и смежных поверхностей",
              "Регламент — 12 этапов до акта",
              "Контроль: стекло, профиль, периметр",
              "Акт и закрывающие по договору",
            ].map((row) => (
              <li
                key={row}
                className="flex items-center gap-3 rounded-xl bg-surface-subtle px-3.5 py-2.5 ring-1 ring-inset ring-line"
              >
                <CheckCircle2
                  className="h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-ink">{row}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs text-ink-soft">
            <span>На рынке с 2008 года</span>
            <span>Москва и МО</span>
          </div>
        </div>
      </div>
    </div>
  );
}
