"use client";

const ITEMS = [
  {
    q: "Зона и стадия объекта",
    a: "Согласуем, где выполняются работы: готовые помещения перед передачей, МОПы, входные группы, фасадное остекление или другие зоны объекта.",
  },
  {
    q: "Характер замечаний",
    a: "Определяем, какие дефекты можно восстановить, а какие требуют замены или отдельного технического решения.",
  },
  {
    q: "Доступ и условия работы",
    a: "Согласуем порядок допуска на объект, время работ, ответственных лиц и требования к перемещению по объекту.",
  },
  {
    q: "Защита отделки",
    a: "До начала работ фиксируем, какие поверхности находятся рядом с рабочей зоной и требуют защиты.",
  },
  {
    q: "Порядок сдачи результата",
    a: "Согласуем, кто принимает работы, как проводится осмотр и какие документы требуются.",
  },
  {
    q: "Ограничения восстановления",
    a: "Некоторые повреждения нельзя устранить без замены стекла или элемента профиля. Это определяется на этапе дефектовки.",
  },
];

export function WhatWeAlign() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow">Согласования до начала работ</p>
          <h2 className="mt-4 section-title text-balance">
            Нулевая неопределённость: всё важное — до первого визита бригады
          </h2>
          <p className="section-subtitle">
            Меньше ваших нервных звонков на объекте: зона, доступ, защита,
            формат акта — в протоколе. Вы тратите время один раз на старте, а
            не на «догоняйку» в конце.
          </p>
        </div>

        <div className="mt-10 grid gap-3 lg:grid-cols-2">
          {ITEMS.map((item, idx) => (
            <details
              key={item.q}
              className="card group p-5 open:shadow-card"
              {...(idx === 0 ? { open: true } : {})}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink">
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface-subtle text-ink-muted transition group-open:rotate-45 group-open:bg-glass group-open:text-accent-700"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
