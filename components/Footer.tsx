import { Logo } from "./Logo";

const COL_NAV = [
  { href: "#for-whom", label: "Для кого работаем" },
  { href: "#regulation", label: "Регламент работ" },
  { href: "#experience", label: "Опыт и объекты" },
  { href: "#estimate", label: "Запросить оценку" },
  { href: "#contacts", label: "Контакты" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-white">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-md text-sm text-ink-muted">
              B2B-подрядчик для застройщиков. Закрываем замечания по стеклу,
              фасадному остеклению и алюминиевому профилю на объектах перед
              приёмкой и передачей готовых помещений. На рынке с 2008 года,
              Москва и Московский регион.
            </p>
            <p className="mt-6 text-sm">
              <a
                href="tel:+79175162404"
                className="font-semibold text-ink hover:text-accent"
              >
                +7 (917) 516-24-04
              </a>
            </p>
            <p className="text-sm">
              <a
                href="mailto:info@marusgroup.ru"
                className="font-semibold text-ink hover:text-accent"
              >
                info@marusgroup.ru
              </a>
            </p>
          </div>

          <nav aria-label="Разделы" className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
              Разделы
            </p>
            <ul className="mt-4 space-y-2.5">
              {COL_NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-ink-muted hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
              Реквизиты
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              {[
                ["Юр. лицо", "уточняется"],
                ["ИНН", "уточняется"],
                ["ОГРН", "уточняется"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <dt className="text-ink-soft">{k}</dt>
                  <dd className="text-ink-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-soft">
            © {year} MARUS GROUP. Все права защищены.
          </p>
          <p className="text-xs text-ink-soft">
            Москва и Московский регион · работаем с 2008 года
          </p>
        </div>
      </div>
    </footer>
  );
}
