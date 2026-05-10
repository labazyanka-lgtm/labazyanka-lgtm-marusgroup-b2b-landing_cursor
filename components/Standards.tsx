import { CheckCircle2, FileText, Ruler, ShieldCheck } from "lucide-react";

const STANDARDS = [
  {
    code: "ГОСТ 111-2014",
    title: "Стекло листовое бесцветное. Технические условия",
    use: "ориентир для требований к базовому листовому стеклу",
  },
  {
    code: "ГОСТ 24866-2014",
    title: "Стеклопакеты клееные. Технические условия",
    use: "учитываем при работах со стеклопакетами и проверке результата",
  },
  {
    code: "ГОСТ 23166-2024",
    title: "Блоки оконные и балконные. Общие технические условия",
    use: "сверяем требования к оконным и балконным светопрозрачным блокам",
  },
  {
    code: "ГОСТ 22233-2025",
    title:
      "Профили прессованные из алюминиевых сплавов для ограждающих конструкций. Технические условия",
    use: "применяем как ориентир для алюминиевых профилей и покрытий",
  },
  {
    code: "ГОСТ 30971-2012",
    title:
      "Швы монтажные узлов примыкания оконных блоков к стеновым проемам. Общие технические условия",
    use: "проверяем узлы примыкания, если задача затрагивает монтажные швы",
  },
  {
    code: "ГОСТ 34379-2018",
    title:
      "Конструкции ограждающие светопрозрачные. Правила обследования технического состояния",
    use: "используем при дефектовке и фиксации состояния конструкций",
  },
];

const PROCESS = [
  {
    icon: FileText,
    title: "Сверяем ТЗ и проект",
    text: "Перед стартом фиксируем тип конструкции, материалы, зону работ и применимые нормы.",
  },
  {
    icon: Ruler,
    title: "Делаем дефектовку",
    text: "Разделяем устранимые дефекты, ограничения восстановления и риски для стекла или профиля.",
  },
  {
    icon: ShieldCheck,
    title: "Сдаём результат",
    text: "Передаём выполненный объём с фотофиксацией, актами и согласованными критериями приёмки.",
  },
];

export function Standards() {
  return (
    <section id="standards" className="section bg-white">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow">ГОСТы и приёмка</p>
            <h2 className="mt-4 section-title text-balance">
              Работаем по проектной документации и применимым ГОСТам
            </h2>
            <p className="section-subtitle">
              Перечень стандартов уточняется под конкретный объект, тип
              остекления и состав работ, чтобы не обещать лишнего и сдавать
              результат по понятным критериям.
            </p>

            <div className="mt-8 space-y-4">
              {PROCESS.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-glass text-accent-700 ring-1 ring-inset ring-accent-200/70">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-ink-muted">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="card overflow-hidden">
              <div className="border-b border-line bg-surface-subtle px-5 py-4 sm:px-6">
                <p className="text-sm font-semibold text-ink">
                  Основные стандарты, на которые ориентируемся
                </p>
              </div>
              <ul className="divide-y divide-line">
                {STANDARDS.map((standard) => (
                  <li key={standard.code} className="p-5 sm:p-6">
                    <div className="flex gap-4">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="font-display text-xl font-semibold leading-tight text-ink">
                          {standard.code}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-ink">
                          {standard.title}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-ink-muted">
                          {standard.use}
                        </p>
                      </div>
                    </div>
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
