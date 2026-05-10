import { Square, Frame, MapPin } from "lucide-react";

const COLUMNS = [
  {
    icon: Square,
    title: "По стеклу",
    items: [
      "царапины",
      "окалина",
      "сколы",
      "потёртости",
      "следы строительных работ",
    ],
  },
  {
    icon: Frame,
    title: "По алюминиевому профилю",
    items: [
      "царапины",
      "потёртости",
      "следы механических повреждений",
      "локальные дефекты покрытия",
    ],
  },
  {
    icon: MapPin,
    title: "По зонам объекта",
    items: [
      "готовые помещения перед передачей",
      "МОПы",
      "входные группы",
      "фасадное остекление",
      "витражные конструкции",
      "алюминиевые конструкции",
    ],
  },
];

export function WhatWeFix() {
  return (
    <section className="section bg-surface-subtle">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow">Замечания, которые закрываем</p>
          <h2 className="mt-4 section-title text-balance">
            Какие замечания по стеклу и алюминиевому профилю закрываем перед
            приёмкой
          </h2>
          <p className="section-subtitle">
            Работаем с дефектами, которые появляются после строительных,
            монтажных и отделочных работ на объектах застройщиков.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title} className="card p-6 flex flex-col">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-glass text-accent-700 ring-1 ring-inset ring-accent-200/70">
                <col.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                {col.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm text-ink-muted">
          Возможность восстановления каждого дефекта определяется на этапе
          дефектовки. Некоторые повреждения требуют замены стекла или элемента
          профиля — об этом сообщаем до начала работ.
        </p>

        <div className="mt-8">
          <a href="#estimate" className="btn-secondary">
            Отправить фото дефектов для предварительной оценки
          </a>
        </div>
      </div>
    </section>
  );
}
