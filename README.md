# MARUS GROUP — B2B Landing

B2B-лендинг MARUS GROUP для застройщиков жилья бизнес-класса. Закрываем
замечания по стеклу, фасадному остеклению и алюминиевому профилю на объектах
перед приёмкой и передачей готовых помещений.

## Стек

- Next.js 14 (App Router, RSC)
- React 18, TypeScript 5 (strict)
- Tailwind CSS 3 (фирменная палитра, утилитарные классы из `globals.css`)
- `lucide-react` для иконок

## Запуск

Требуется Node.js 18+.

```bash
npm install
cp .env.example .env.local   # задать переменные окружения (см. ниже)
npm run dev      # http://localhost:3000
npm run lint
npm run build
npm run start
```

## Структура страницы (`app/page.tsx`)

1. `Header` — sticky, моб. меню, телефон, CTA «Запросить оценку»
2. `Hero` — H1 «доводим стекло и алюминиевый профиль до состояния приёмки» + 4 маркера + 3 CTA + «карта объекта»
3. `ForWhom` — для кого работаем (8 ролей застройщика)
4. `Risks` — риски на финальной стадии объекта (8 шт.)
5. `HowWeClose` — как закрываем риски (6 шт.)
6. `WhatWeFix` — какие замечания закрываем (стекло / профиль / зоны объекта)
7. `SurfaceProtection` — защита прилегающих поверхностей (10 зон)
8. `Process` — регламент работ, 12 этапов
9. `Handover` — как сдаём результат
10. `Documents` — документы / ответственность / ограничения
11. `WhatWeAlign` — что согласуем перед началом работ (вместо FAQ)
12. `Experience` — реальные числа + 7 объектов застройщиков
13. `ForEstimate` — что нужно для предварительной оценки
14. `EstimateForm` — B2B-форма заявки (расширенный набор полей + загрузка фото),
    отправляется на `POST /api/estimate`
15. `Contacts` — контакты + юридические реквизиты (значения из `lib/site-config.ts`)
16. `Footer`
17. `MobileStickyCta` — sticky-панель быстрых действий на мобильном

Дополнительно:

- `/privacy` — политика обработки персональных данных (заглушка с пометками
  `TODO[real-data]`).
- `/sitemap.xml`, `/robots.txt` — автоматически генерируются Next.js
  (`app/sitemap.ts`, `app/robots.ts`).
- `/og-image.svg` — изображение для соцсетей (Open Graph / Twitter card).

## Палитра

- `--color-bg-primary` `#F7F8FA` (`bg-surface-subtle`)
- `--color-bg-secondary` `#FFFFFF` (`bg-white` / `bg-surface`)
- `--color-text-primary` `#15171A` (`text-ink`)
- `--color-text-secondary` `#5D6673` (`text-ink-muted`)
- `--color-border` `#DDE2E8` (`border-line`)
- `--color-accent` `#1F4E5F` / `--color-accent-hover` `#173D4B` (`bg-accent`, `bg-accent-hover`)
- `--color-metal` `#AAB3BC`, `--color-glass` `#DDEFF3`

## Конфиг и плейсхолдеры

Контакты, юр. реквизиты, ID счётчиков и каналы доставки заявок собраны в
`lib/site-config.ts`. Все значения, которые ещё не получены от заказчика,
помечены константой `PLACEHOLDER` (отображается в UI как `уточняется`).

Грепнуть остатки можно так:

```bash
rg "PLACEHOLDER|TODO\\[real-data\\]" lib components app
```

## Переменные окружения

Полный список — в `.env.example`. Краткий перечень:

| Переменная                          | Назначение                                         |
| ----------------------------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`              | базовый URL для metadata / sitemap / robots        |
| `NEXT_PUBLIC_YANDEX_METRIKA_ID`     | ID счётчика Яндекс.Метрики                         |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`     | Measurement ID GA4 (`G-XXXXXXX`)                   |
| `ESTIMATE_TELEGRAM_BOT_TOKEN`       | токен Telegram-бота для уведомлений                |
| `ESTIMATE_TELEGRAM_CHAT_ID`         | chat_id получателя в Telegram                      |
| `ESTIMATE_WEBHOOK_URL`              | произвольный JSON-webhook (Make / n8n / CRM)       |
| `RESEND_API_KEY` + `ESTIMATE_NOTIFY_EMAIL` | email-рассылка через Resend HTTP API        |
| `ESTIMATE_NOTIFY_FROM`              | (опц.) адрес отправителя для Resend                |

Если ни один канал доставки не сконфигурирован, заявка пишется в server-лог
(`console.warn`) — ничего не теряется, но лучше настроить хотя бы один канал.

## Аналитика

`components/Analytics.tsx` подключает Яндекс.Метрику и GA4 через `next/script`,
но **только если** заданы соответствующие env-переменные. Поэтому в dev-режиме
без этих ключей счётчики просто не рендерятся.

`components/AnalyticsClicks.tsx` ловит клики делегированно: на любой ссылке /
кнопке с `data-analytics="<location>"` отправляется событие `cta_click`,
`phone_click` или `email_click` (по `href`). Форма «Запросить оценку» сама
эмитит `estimate_submit` / `estimate_success` / `estimate_error`.

Helper для своих событий:

```ts
import { trackEvent } from "@/lib/analytics";
trackEvent("cta_click", { location: "hero" });
```

## Что нужно подменить под боевой запуск

Все пункты сейчас явно помечены `PLACEHOLDER` / `TODO[real-data]`:

- `lib/site-config.ts` → `legal.legalName / inn / ogrn / kpp` — реальные реквизиты.
- `lib/site-config.ts` → `contacts.address / workingHours` — адрес и режим работы.
- `.env.local` — задать минимум один канал доставки заявок и счётчики аналитики.
- `app/privacy/page.tsx` — финальная редакция политики, пройтись юристом.
- `components/Experience.tsx` + `public/projects/` — реальные фото объектов
  (только с письменного согласия застройщиков; см. `public/projects/README.md`).
- Логотипы клиентов — не используем, пока нет файлов и письменного разрешения.

## API

### `POST /api/estimate`

Принимает `multipart/form-data` со всеми полями формы (`name`, `company`,
`phone`, `object` — обязательные; остальные — опциональные) и до 10 файлов
в поле `photos`, общий размер до 25 МБ.

Ответы:

- `200 { ok: true }` — заявка успешно доставлена хотя бы одним каналом
  (или записана в логи, если каналы не сконфигурированы).
- `400 { ok: false, error }` — невалидные данные / нет обязательных полей.
- `413 { ok: false, error }` — превышены лимиты по числу файлов / размеру.
- `502 { ok: false, error }` — все настроенные каналы доставки упали.

Содержит honeypot-поле `website`: бот его заполняет, человек — нет;
заполненное поле возвращает `200`, но никуда не отправляет.
