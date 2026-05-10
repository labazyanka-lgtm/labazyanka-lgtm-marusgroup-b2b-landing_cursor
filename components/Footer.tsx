import { Logo } from "./Logo";
import { contacts, legal, PLACEHOLDER, siteConfig } from "@/lib/site-config";

const COL_NAV = [
  { href: "#for-whom", label: "Для кого работаем" },
  { href: "#regulation", label: "Регламент работ" },
  { href: "#experience", label: "Опыт и объекты" },
  { href: "#estimate", label: "Запросить оценку" },
  { href: "#contacts", label: "Контакты" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const legalRows: ReadonlyArray<readonly [string, string]> = [
    ["Юр. лицо", legal.legalName],
    ["ИНН", legal.inn],
    ["ОГРН", legal.ogrn],
  ];

  return (
    <footer className="border-t border-line bg-white">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-md text-sm text-ink-muted">
              B2B-подрядчик для застройщиков. Закрываем замечания по стеклу,
              фасадному остеклению и алюминиевому профилю на объектах перед
              приёмкой и передачей готовых помещений. На рынке с{" "}
              {siteConfig.sinceYear} года, {siteConfig.region}.
            </p>
            <p className="mt-6 text-sm">
              <a
                href={`tel:${contacts.phoneTel}`}
                data-analytics="footer.phone"
                className="font-semibold text-ink hover:text-accent"
              >
                {contacts.phoneDisplay}
              </a>
            </p>
            <p className="text-sm">
              <a
                href={`mailto:${contacts.email}`}
                data-analytics="footer.email"
                className="font-semibold text-ink hover:text-accent"
              >
                {contacts.email}
              </a>
            </p>
            <p className="mt-6 text-xs text-ink-soft">
              <a
                href="/privacy"
                className="hover:text-ink underline-offset-4 hover:underline"
              >
                Политика обработки персональных данных
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
              {legalRows.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <dt className="text-ink-soft">{k}</dt>
                  <dd className="text-ink-muted">
                    {v === PLACEHOLDER ? "уточняется" : v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-soft">
            © {year} {siteConfig.name}. Все права защищены.
          </p>
          <p className="text-xs text-ink-soft">
            {siteConfig.region} · работаем с {siteConfig.sinceYear} года
          </p>
        </div>
      </div>
    </footer>
  );
}
