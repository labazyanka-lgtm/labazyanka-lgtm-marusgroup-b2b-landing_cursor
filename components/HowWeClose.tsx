import {
  Camera,
  Shield,
  Hand,
  Eraser,
  ClipboardCheck,
  PackageCheck,
} from "lucide-react";

const ITEMS = [
  {
    icon: Camera,
    title: "Фиксируем исходное состояние",
    desc: "Перед началом работ фото- и описательно фиксируем состояние рабочей зоны и прилегающих поверхностей.",
  },
  {
    icon: Shield,
    title: "Защищаем прилегающие поверхности",
    desc: "Закрываем двери, подоконники, полы, фасадные элементы и другие готовые зоны до начала работ.",
  },
  {
    icon: Hand,
    title: "Работаем аккуратно на готовом объекте",
    desc: "Учитываем, что на объекте уже есть отделка, инженерные элементы и зоны, готовые к передаче.",
  },
  {
    icon: Eraser,
    title: "Не оставляем следов вмешательства",
    desc: "Цель — закрыть замечание, не создавая новых дефектов и видимых следов работ.",
  },
  {
    icon: ClipboardCheck,
    title: "Контролируем результат",
    desc: "Осматриваем стекло, профиль и прилегающие поверхности, фиксируем результат перед сдачей.",
  },
  {
    icon: PackageCheck,
    title: "Сдаём работы по понятному порядку",
    desc: "Передаём результат ответственному представителю заказчика по согласованному регламенту.",
  },
];

export function HowWeClose() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow">Как закрываем риски</p>
          <h2 className="mt-4 section-title text-balance">
            Закрываем замечания так, чтобы после нас не пришлось устранять
            последствия
          </h2>
          <p className="section-subtitle">
            Работаем по регламенту: фиксируем исходное состояние, защищаем
            рабочую зону, аккуратно выполняем восстановление и сдаём результат
            по понятному порядку.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <li key={it.title} className="card p-6 flex flex-col">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-glass text-accent-700 ring-1 ring-inset ring-accent-200/70">
                <it.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {it.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {it.desc}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <a href="#estimate" className="btn-secondary">
            Назначить выезд на дефектовку
          </a>
        </div>
      </div>
    </section>
  );
}
