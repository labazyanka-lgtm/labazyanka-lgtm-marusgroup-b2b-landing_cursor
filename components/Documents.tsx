import { FileText, Scale, AlertCircle } from "lucide-react";

const COLUMNS = [
  {
    icon: FileText,
    title: "Документы",
    items: [
      "юридическое лицо",
      "ИНН и ОГРН",
      "договор",
      "акт выполненных работ",
      "закрывающие документы",
    ],
  },
  {
    icon: Scale,
    title: "Ответственность",
    items: [
      "ответственность за сохранность согласованной зоны работ",
      "согласованный порядок допуска на объект",
      "гарантийные обязательства и порядок доработок — в договоре, под вид работ",
      "претензионный порядок прописываем заранее — без устных «разберёмся потом»",
    ],
  },
  {
    icon: AlertCircle,
    title: "Ограничения восстановления",
    items: [
      "не все повреждения можно устранить без замены",
      "решение принимается на этапе дефектовки",
      "ограничения фиксируются до начала работ",
      "не обещаем результат, который технически невозможен",
    ],
  },
];

export function Documents() {
  return (
    <section className="section bg-surface-subtle">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow">Документы и ответственность</p>
          <h2 className="mt-4 section-title text-balance">
            Официально, с прозрачными «красными линиями» — чтобы сделка не
            развалилась после фактуры
          </h2>
          <p className="section-subtitle">
            Юрлицо, договор, акт. Заранее фиксируем зоны, ограничения по дефектам
            и сценарий, если восстановление технически невозможно — без обещаний
            «сделаем любой космос».
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

        <div className="mt-10">
          <a href="#estimate" className="btn-secondary">
            Запросить пакет для согласования подрядчика
          </a>
        </div>
      </div>
    </section>
  );
}
