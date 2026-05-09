import { CheckCircle2 } from "lucide-react";

const ITEMS = [
  "контроль качества",
  "осмотр стекла, профиля и прилегающих поверхностей",
  "проверка отсутствия следов вмешательства",
  "фиксация результата",
  "устранение замечаний, если они есть в рамках согласованного объёма",
  "акт выполненных работ",
  "закрывающие документы",
];

export function Handover() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow">Сдача результата</p>
            <h2 className="mt-4 section-title text-balance">
              Сдаём результат так, чтобы его можно было предъявить ответственным
              сторонам
            </h2>
            <p className="section-subtitle">
              После выполнения работ проводится осмотр зоны, контроль качества и
              передача результата по согласованному порядку.
            </p>
            <div className="mt-8">
              <a href="#estimate" className="btn-secondary">
                Обсудить порядок сдачи работ на вашем объекте
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="card p-6 sm:p-8 space-y-3">
              {ITEMS.map((it) => (
                <li
                  key={it}
                  className="flex items-start gap-3 rounded-xl bg-surface-subtle px-4 py-3 ring-1 ring-inset ring-line"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-ink">{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
