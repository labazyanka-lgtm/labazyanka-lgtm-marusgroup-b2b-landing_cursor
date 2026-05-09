import { Logo } from "./Logo";

const COL_COMPANY = [
  { href: "#services", label: "Услуги" },
  { href: "#process", label: "Как работаем" },
  { href: "#industries", label: "Индустрии" },
  { href: "#faq", label: "FAQ" },
];

const COL_LEGAL = [
  { href: "#", label: "Политика конфиденциальности" },
  { href: "#", label: "Согласие на обработку ПДн" },
  { href: "#", label: "Реквизиты" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-surface-subtle">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-ink-muted">
              Marusgroup — B2B-решения для управляемого роста. Автоматизация,
              интеграции, аналитика и сопровождение под одной крышей.
            </p>
            <p className="mt-6 text-sm text-ink-muted">
              <a
                href="mailto:hello@marusgroup.example"
                className="font-medium text-ink hover:text-brand-700"
              >
                hello@marusgroup.example
              </a>
            </p>
            <p className="text-sm text-ink-muted">
              <a
                href="tel:+74950000000"
                className="font-medium text-ink hover:text-brand-700"
              >
                +7 (495) 000-00-00
              </a>
            </p>
          </div>

          <nav
            aria-label="Компания"
            className="md:col-span-3"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
              Компания
            </p>
            <ul className="mt-4 space-y-2.5">
              {COL_COMPANY.map((l) => (
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

          <nav aria-label="Документы" className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
              Документы
            </p>
            <ul className="mt-4 space-y-2.5">
              {COL_LEGAL.map((l) => (
                <li key={l.label}>
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
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-soft">
            © {year} Marusgroup. Все права защищены.
          </p>
          <p className="text-xs text-ink-soft">
            ИНН 0000000000 · ОГРН 0000000000000
          </p>
        </div>
      </div>
    </footer>
  );
}
