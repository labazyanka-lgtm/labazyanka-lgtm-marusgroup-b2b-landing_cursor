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
            Дефекты по стеклу и профилю, из‑за которых «висит» приёмка — в одном
            контракте
          </h2>
          <p className="section-subtitle">
            После стройки и отделки остаётся «хвост» по СПК и алюминию. Мы
            убираем типовые замечания там, где уже нельзя «просто заменить всё» —
            потому что вокруг готово и дорого.
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
          Честный фильтр: не каждое повреждение лечится полировкой. На
          дефектовке заранее говорим, что уйдёт в восстановление, а что — в
          замену стекла или элемента профиля, чтобы вы не вложились в невозможное
          обещание.
        </p>

        <div className="mt-8">
          <a href="#estimate" className="btn-secondary">
            Прислать фото — получить честный вердикт по дефектам
          </a>
        </div>
      </div>
    </section>
  );
}
