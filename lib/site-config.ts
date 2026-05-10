/**
 * Single source of truth for site identity, contacts, legal data,
 * analytics IDs and integration endpoints.
 *
 * Все значения, помеченные `PLACEHOLDER`, обязательно подменить перед боевым
 * запуском. Для удобства поиска — все они равны константе `PLACEHOLDER`
 * (грепается как `PLACEHOLDER` и/или `⟪ уточняется ⟫`).
 *
 * TODO[real-data]: пройтись по всем `PLACEHOLDER` ниже и подставить реальные
 * значения. Ничего, помеченного `PLACEHOLDER`, не должно остаться в проде.
 */

export const PLACEHOLDER = "⟪ уточняется ⟫";

export const isPlaceholder = (value: string | undefined | null): boolean =>
  !value || value === PLACEHOLDER;

const ENV_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteConfig = {
  name: "MARUS GROUP",
  /**
   * Базовый URL продакшн-сайта. Используется в metadata, sitemap и robots.
   * Можно переопределить через `NEXT_PUBLIC_SITE_URL`.
   */
  url: ENV_SITE_URL && ENV_SITE_URL.length > 0 ? ENV_SITE_URL : "https://marusgroup.ru",
  region: "Москва и Московский регион",
  /** На рынке с какого года (фактическая цифра). */
  sinceYear: 2008,
} as const;

/**
 * Контактные данные для CTA, шапки, подвала и формы.
 *
 * TODO[real-data]: `address` и `workingHours` — поставить реальные значения.
 */
export const contacts = {
  /** Отображаемый телефон. */
  phoneDisplay: "+7 (917) 516-24-04",
  /** Тот же телефон в формате `tel:`. */
  phoneTel: "+79175162404",
  /** Email для общения с клиентами. */
  email: "info@marusgroup.ru",
  /** Полный адрес офиса. PLACEHOLDER до подтверждения. */
  address: PLACEHOLDER,
  /** Режим работы. PLACEHOLDER до подтверждения. */
  workingHours: PLACEHOLDER,
} as const;

/**
 * Юридические реквизиты, нужные для договора и для блока «Контакты».
 *
 * TODO[real-data]: подставить реальные реквизиты MARUS GROUP. До этого все
 * поля помечены `PLACEHOLDER` и в верстке отображаются как «уточняется».
 */
export const legal = {
  /** Полное наименование юр. лица. */
  legalName: PLACEHOLDER,
  inn: PLACEHOLDER,
  ogrn: PLACEHOLDER,
  kpp: PLACEHOLDER,
} as const;

/**
 * IDs аналитических счётчиков. Заполняются через ENV-переменные на проде,
 * чтобы не светить значения в репозитории.
 *
 * - `NEXT_PUBLIC_YANDEX_METRIKA_ID`  — id счётчика Яндекс.Метрики.
 * - `NEXT_PUBLIC_GA_MEASUREMENT_ID`  — measurement id Google Analytics 4
 *   (формат `G-XXXXXXX`).
 *
 * TODO[real-data]: завести переменные окружения на хостинге деплоя.
 */
export const analytics = {
  yandexMetrikaId: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim() || "",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "",
} as const;

/**
 * Настройки доставки заявок из формы. Управляются на стороне сервера, поэтому
 * без префикса `NEXT_PUBLIC_` — значения не попадают в клиентский бандл.
 *
 * Поддерживаемые каналы (можно подключать любой / несколько):
 *
 * 1. Telegram-бот:
 *    `ESTIMATE_TELEGRAM_BOT_TOKEN`, `ESTIMATE_TELEGRAM_CHAT_ID`.
 *
 * 2. Произвольный webhook (например, Make / n8n / собственный CRM-приёмник):
 *    `ESTIMATE_WEBHOOK_URL` — POST application/json со всеми полями заявки.
 *
 * 3. Email через сервис Resend (HTTP API, без SMTP-зависимостей):
 *    `RESEND_API_KEY`, `ESTIMATE_NOTIFY_EMAIL` (адрес получателя),
 *    опц. `ESTIMATE_NOTIFY_FROM` (адрес отправителя, по умолчанию
 *    `MARUS GROUP <onboarding@resend.dev>`).
 *
 * Если ни один канал не сконфигурирован, форма всё равно работает: заявка
 * сохраняется в логах сервера, чтобы ничего не потерять.
 *
 * TODO[real-data]: на боевом окружении настроить как минимум один канал.
 */
export const estimateDeliveryChannels = {
  hasTelegram:
    !!process.env.ESTIMATE_TELEGRAM_BOT_TOKEN &&
    !!process.env.ESTIMATE_TELEGRAM_CHAT_ID,
  hasWebhook: !!process.env.ESTIMATE_WEBHOOK_URL,
  hasEmail: !!process.env.RESEND_API_KEY && !!process.env.ESTIMATE_NOTIFY_EMAIL,
} as const;
