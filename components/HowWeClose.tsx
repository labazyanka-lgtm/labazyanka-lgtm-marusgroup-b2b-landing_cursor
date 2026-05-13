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
    desc: "До первого движения — фото и описание зоны работ и того, что рядом. Это ваша страховка в споре о причинности.",
  },
  {
    icon: Shield,
    title: "Защищаем прилегающие поверхности",
    desc: "Двери, подоконники, полы, фасадные и инженерные узлы закрываем до старта — чтобы не купить новый дефект вместе с закрытием старого.",
  },
  {
    icon: Hand,
    title: "Работаем как на музейном экспонате",
    desc: "Готовые помещения и МОПы: минимальный след, согласованные маршруты и время — меньше хаоса для эксплуатации и дольщиков.",
  },
  {
    icon: Eraser,
    title: "Убираем проблему — не добавляем историю",
    desc: "Задача — не «замазать», а убрать дефект так, чтобы не появились новые вопросы на приёмке.",
  },
  {
    icon: ClipboardCheck,
    title: "Контроль с чек-листом",
    desc: "Стекло, профиль, периметр: осмотр до подписи. Замечания в рамках согласованного объёма закрываем до сдачи вам.",
  },
  {
    icon: PackageCheck,
    title: "Сдаём по регламенту заказчика",
    desc: "Кто подписывает, какие приложения к акту — согласуем заранее, чтобы не тормозить ваш внутренний процесс.",
  },
];

export function HowWeClose() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow">Как закрываем риски</p>
          <h2 className="mt-4 section-title text-balance">
            Механика «без сюрпризов»: фиксируем до, защищаем вокруг, сдаём с
            осмотром
          </h2>
          <p className="section-subtitle">
            Каждый шаг повышает вероятность приёмки с первого раза: исходное
            состояние в фото и описании, экранирование смежных зон, работа без
            «следа кисти», финальный осмотр и передача по согласованному
            регламенту — чтобы у заказчика не осталось вопросов «а что было
            до?».
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
            Забронировать дефектовку под график объекта
          </a>
        </div>
      </div>
    </section>
  );
}
