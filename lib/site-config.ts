/**
 * Единый источник истины по всем «реальным» данным компании.
 *
 * Все поля, по которым ещё нет данных от заказчика, помечены константой
 * PLACEHOLDER (рендерится как «уточняется») и комментарием TODO[real-data].
 *
 * Грепнуть остатки перед боевым запуском:
 *   rg "PLACEHOLDER|TODO\[real-data\]" lib components app
 */

export const PLACEHOLDER = "уточняется" as const;

export type Placeholder = typeof PLACEHOLDER;
export type Maybe<T> = T | Placeholder;

export const isPlaceholder = (v: unknown): v is Placeholder =>
  v === PLACEHOLDER;

const env = (key: string): string | undefined => {
  const v = process.env[key];
  return v && v.length > 0 ? v : undefined;
};

const SITE_URL = env("NEXT_PUBLIC_SITE_URL") ?? "https://marusgroup.ru";

export const siteConfig = {
  url: SITE_URL,
  brand: "MARUS GROUP",
  region: "Москва и Московский регион",
  foundedYear: 2008,

  contacts: {
    phone: "+7 (917) 516-24-04",
    phoneHref: "tel:+79175162404",
    email: "info@marusgroup.ru",
    emailHref: "mailto:info@marusgroup.ru",
    // TODO[real-data]: уточнить у заказчика адрес офиса.
    address: PLACEHOLDER as Maybe<string>,
    // TODO[real-data]: уточнить у заказчика режим работы.
    workingHours: PLACEHOLDER as Maybe<string>,
  },

  // TODO[real-data]: получить от заказчика юридические реквизиты MARUS GROUP
  // (юр. лицо, ИНН, ОГРН, КПП). До этого момента отображаем «уточняется».
  legal: {
    legalName: PLACEHOLDER as Maybe<string>,
    inn: PLACEHOLDER as Maybe<string>,
    ogrn: PLACEHOLDER as Maybe<string>,
    kpp: PLACEHOLDER as Maybe<string>,
  },

  analytics: {
    // TODO[real-data]: ID счётчика Яндекс.Метрики (NEXT_PUBLIC_YANDEX_METRIKA_ID).
    yandexMetrikaId: env("NEXT_PUBLIC_YANDEX_METRIKA_ID"),
    // TODO[real-data]: GA4 Measurement ID (NEXT_PUBLIC_GA_MEASUREMENT_ID).
    gaMeasurementId: env("NEXT_PUBLIC_GA_MEASUREMENT_ID"),
  },

  estimateApi: {
    endpoint: "/api/estimate",
    maxFiles: 10,
    maxTotalBytes: 25 * 1024 * 1024,
  },
} as const;

export type SiteConfig = typeof siteConfig;
