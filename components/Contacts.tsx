import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Contacts() {
  const { contacts, legal, region } = siteConfig;

  const legalRows: Array<[string, string]> = [
    ["Юридическое лицо", legal.legalName],
    ["ИНН", legal.inn],
    ["ОГРН", legal.ogrn],
    ["КПП", legal.kpp],
  ];

  return (
    <section id="contacts" className="section bg-white">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow">Контакты</p>
          <h2 className="mt-4 section-title text-balance">
            Контакты и реквизиты MARUS GROUP
          </h2>
          <p className="section-subtitle">
            Свяжитесь с ответственным специалистом для оценки объекта, выезда на
            дефектовку или подготовки предварительного КП.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="card p-6 sm:p-8">
            <h3 className="text-base font-semibold tracking-tight text-ink">
              Связь с ответственным специалистом
            </h3>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-glass text-accent-700 ring-1 ring-inset ring-accent-200/70">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                    Телефон
                  </p>
                  <a
                    href={contacts.phoneHref}
                    data-analytics="contacts_phone"
                    className="mt-1 block text-base font-semibold text-ink hover:text-accent"
                  >
                    {contacts.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-glass text-accent-700 ring-1 ring-inset ring-accent-200/70">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                    Email
                  </p>
                  <a
                    href={contacts.emailHref}
                    data-analytics="contacts_email"
                    className="mt-1 block text-base font-semibold text-ink hover:text-accent"
                  >
                    {contacts.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-glass text-accent-700 ring-1 ring-inset ring-accent-200/70">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                    Адрес
                  </p>
                  <p className="mt-1 text-base text-ink-muted">
                    {region} · {contacts.address}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-glass text-accent-700 ring-1 ring-inset ring-accent-200/70">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                    Режим работы
                  </p>
                  <p className="mt-1 text-base text-ink-muted">
                    {contacts.workingHours}
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#estimate"
                data-analytics="contacts_cta_estimate"
                className="btn-primary"
              >
                Связаться по объекту
              </a>
              <a
                href={contacts.phoneHref}
                data-analytics="contacts_cta_call"
                className="btn-secondary"
              >
                Позвонить
              </a>
            </div>
          </div>

          <div className="card p-6 sm:p-8">
            <h3 className="text-base font-semibold tracking-tight text-ink">
              Юридические данные
            </h3>
            <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
              {legalRows.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                    {k}
                  </dt>
                  <dd className="mt-1 text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 rounded-xl bg-surface-subtle p-4 ring-1 ring-inset ring-line">
              <p className="text-sm text-ink-muted">
                Реквизиты для договора и тендерной документации передаём по
                запросу. Можем работать по форме договора заказчика, NDA
                подписываем в день обращения.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
