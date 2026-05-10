import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { contacts, legal, PLACEHOLDER, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
  description:
    "Политика обработки персональных данных пользователей сайта MARUS GROUP.",
  robots: { index: true, follow: true },
};

/**
 * Заглушка-болванка политики обработки персональных данных.
 *
 * TODO[real-data]: пройтись юристом, актуализировать реквизиты, контакты
 * ответственного за обработку ПДн и сроки хранения. Все места, помеченные
 * `«уточняется»`, должны быть заполнены до боевого запуска.
 */
export default function PrivacyPage() {
  const updated = "10 мая 2026";
  const legalName = legal.legalName === PLACEHOLDER ? "уточняется" : legal.legalName;
  const inn = legal.inn === PLACEHOLDER ? "уточняется" : legal.inn;
  const address =
    contacts.address === PLACEHOLDER ? "уточняется" : contacts.address;

  return (
    <>
      <Header />
      <main id="main">
        <article className="section bg-white">
          <div className="container max-w-3xl">
            <p className="eyebrow">Документ</p>
            <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
              Политика обработки персональных данных
            </h1>
            <p className="mt-3 text-sm text-ink-soft">
              Действует с {updated}
            </p>

            <section className="mt-10 space-y-4 text-base text-ink-muted">
              <h2 className="text-xl font-semibold text-ink">1. Общие положения</h2>
              <p>
                Настоящая Политика регулирует порядок обработки и защиты
                персональных данных, получаемых {siteConfig.name} (далее —
                «Оператор», {legalName}, ИНН {inn}, адрес {address}) от
                пользователей сайта{" "}
                <Link href="/" className="text-accent hover:underline">
                  {siteConfig.url.replace(/^https?:\/\//, "")}
                </Link>
                .
              </p>
              <p>
                Оператор обрабатывает персональные данные в соответствии с
                требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О
                персональных данных».
              </p>
            </section>

            <section className="mt-8 space-y-4 text-base text-ink-muted">
              <h2 className="text-xl font-semibold text-ink">
                2. Состав обрабатываемых данных
              </h2>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>имя и должность представителя застройщика;</li>
                <li>наименование компании;</li>
                <li>номер телефона, email, мессенджеры для связи;</li>
                <li>сведения об объекте: название, стадия, зона, тип замечаний;</li>
                <li>фото и комментарии, переданные через форму на сайте;</li>
                <li>
                  технические данные: cookies, IP-адрес, тип устройства,
                  параметры сессии, данные счётчиков аналитики.
                </li>
              </ul>
            </section>

            <section className="mt-8 space-y-4 text-base text-ink-muted">
              <h2 className="text-xl font-semibold text-ink">3. Цели обработки</h2>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>
                  обработка заявок на оценку, выезд на дефектовку и подготовку
                  коммерческих предложений;
                </li>
                <li>заключение и исполнение договора с заказчиком;</li>
                <li>
                  улучшение работы сайта, аналитика трафика и эффективности
                  CTA через Яндекс.Метрику и Google Analytics;
                </li>
                <li>исполнение требований законодательства РФ.</li>
              </ul>
            </section>

            <section className="mt-8 space-y-4 text-base text-ink-muted">
              <h2 className="text-xl font-semibold text-ink">
                4. Согласие на обработку
              </h2>
              <p>
                Заполняя и отправляя форму на сайте, пользователь подтверждает
                ознакомление с настоящей Политикой и даёт согласие на обработку
                переданных персональных данных в целях, указанных выше. Согласие
                может быть отозвано путём направления письменного запроса на{" "}
                <a
                  href={`mailto:${contacts.email}`}
                  className="text-accent hover:underline"
                >
                  {contacts.email}
                </a>
                .
              </p>
            </section>

            <section className="mt-8 space-y-4 text-base text-ink-muted">
              <h2 className="text-xl font-semibold text-ink">
                5. Сроки и порядок хранения
              </h2>
              <p>
                Срок хранения данных — не более срока, необходимого для
                достижения целей обработки, либо до отзыва согласия. Точные
                сроки хранения по каждой категории данных — уточняются.
              </p>
            </section>

            <section className="mt-8 space-y-4 text-base text-ink-muted">
              <h2 className="text-xl font-semibold text-ink">
                6. Контакты Оператора
              </h2>
              <p>
                По вопросам обработки персональных данных можно обращаться:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>
                  Email:{" "}
                  <a
                    href={`mailto:${contacts.email}`}
                    className="text-accent hover:underline"
                  >
                    {contacts.email}
                  </a>
                </li>
                <li>
                  Телефон:{" "}
                  <a
                    href={`tel:${contacts.phoneTel}`}
                    className="text-accent hover:underline"
                  >
                    {contacts.phoneDisplay}
                  </a>
                </li>
                <li>Юр. лицо: {legalName}</li>
                <li>ИНН: {inn}</li>
              </ul>
            </section>

            <p className="mt-12">
              <Link href="/" className="btn-secondary">
                ← Вернуться на главную
              </Link>
            </p>
          </div>
        </article>
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
