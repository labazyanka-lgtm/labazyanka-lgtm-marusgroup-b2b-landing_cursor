import {
  Building2,
  ClipboardCheck,
  HardHat,
  ShieldCheck,
  Wrench,
  Headset,
  Briefcase,
  UserCheck,
} from "lucide-react";

const ROLES = [
  { icon: Building2, label: "Застройщик" },
  { icon: HardHat, label: "Технический заказчик" },
  { icon: Briefcase, label: "Руководитель проекта" },
  { icon: ShieldCheck, label: "Отдел качества" },
  { icon: Wrench, label: "Эксплуатация" },
  { icon: Headset, label: "Клиентский сервис" },
  { icon: ClipboardCheck, label: "Подрядный отдел" },
  { icon: UserCheck, label: "Ответственный за устранение замечаний" },
];

export function ForWhom() {
  return (
    <section id="for-whom" className="section bg-white">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow">Для кого работаем</p>
          <h2 className="mt-4 section-title text-balance">
            Для тех, кто держит ответ перед технадзором, УК и дольщиком
          </h2>
          <p className="section-subtitle">
            Подключаемся, когда счёт идёт на дни: приёмка, передача ключей,
            закрытие замечаний по стеклу и профилю. Вы получаете подрядчика,
            который не «ломает» финишную отделку и не создаёт второй фронт
            работ.
          </p>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ROLES.map((r) => (
            <li
              key={r.label}
              className="card-flat p-5 flex items-center gap-3 hover:bg-surface-subtle transition-colors"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-glass text-accent-700 ring-1 ring-inset ring-accent-200/70">
                <r.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-ink leading-snug">
                {r.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <a href="#estimate" className="btn-secondary">
            Зафиксировать слот под ваш срок сдачи
          </a>
        </div>
      </div>
    </section>
  );
}
