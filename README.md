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
14. `EstimateForm` — B2B-форма заявки (расширенный набор полей + загрузка фото)
15. `Contacts` — контакты + юридические реквизиты (то, чего нет, помечено `уточняется`)
16. `Footer`
17. `MobileStickyCta` — sticky-панель быстрых действий на мобильном

## Палитра

- `--color-bg-primary` `#F7F8FA` (`bg-surface-subtle`)
- `--color-bg-secondary` `#FFFFFF` (`bg-white` / `bg-surface`)
- `--color-text-primary` `#15171A` (`text-ink`)
- `--color-text-secondary` `#5D6673` (`text-ink-muted`)
- `--color-border` `#DDE2E8` (`border-line`)
- `--color-accent` `#1F4E5F` / `--color-accent-hover` `#173D4B` (`bg-accent`, `bg-accent-hover`)
- `--color-metal` `#AAB3BC`, `--color-glass` `#DDEFF3`

## Boundary с заказчиком

Все «реальные» данные собраны в одном файле — `lib/site-config.ts`. Там же
помечены поля, по которым ещё нет данных от заказчика, константой
`PLACEHOLDER` (рендерится как «уточняется») и комментарием `TODO[real-data]:`.

Грепнуть остатки перед боевым запуском:

```bash
rg "PLACEHOLDER|TODO\[real-data\]" lib components app
```

### Env-переменные (`.env.local`)

См. `.env.example`. Все переменные опциональные:

| Переменная | Зачем |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Базовый URL продакшена для Open Graph / `metadataBase` |
| `NEXT_PUBLIC_YANDEX_METRIKA_ID` | ID счётчика Яндекс.Метрики |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 Measurement ID (`G-XXXXXXX`) |
| `ESTIMATE_TELEGRAM_BOT_TOKEN` + `ESTIMATE_TELEGRAM_CHAT_ID` | Доставка заявок в Telegram |
| `ESTIMATE_WEBHOOK_URL` | Универсальный JSON-webhook (Make / n8n / CRM) |
| `RESEND_API_KEY` + `ESTIMATE_NOTIFY_EMAIL` + `ESTIMATE_NOTIFY_FROM` | Email через Resend |

Если ни один канал доставки не сконфигурирован, заявка пишется в server-лог,
чтобы не теряться.

### Что ещё нужно от заказчика

- Юридические реквизиты (Юр. лицо / ИНН / ОГРН / КПП) — `lib/site-config.ts`,
  блок `legal`.
- Адрес офиса и режим работы — `lib/site-config.ts`, блок `contacts`.
- Реальные фото объектов — добавить в карточки `Experience.tsx`,
  если будет согласие застройщиков.
- Логотипы клиентов — не используем, пока нет файлов и письменного разрешения.

## API формы — `POST /api/estimate`

- Принимает `multipart/form-data` (см. поля в `components/EstimateForm.tsx`).
- Обязательные: `name`, `company`, `phone`, `object`.
- До 10 файлов, суммарно до 25 МБ. Honeypot-поле `website` тихо отбрасывает ботов.
- Все три канала доставки независимы — выставлен любой / любая комбинация.
- Без новых npm-зависимостей.

## Аналитика

- `components/Analytics.tsx` подключает Я.Метрику и GA4 через `next/script`,
  только если выставлены соответствующие env-переменные.
- `components/AnalyticsClicks.tsx` — делегированный listener: любой
  `data-analytics="<location>"` на ссылке/кнопке шлёт `cta_click` /
  `phone_click` / `email_click`. Тип события подбирается по `href`.
- `lib/analytics.ts` экспортирует `trackEvent(name, params)`. Форма дополнительно
  эмитит `estimate_submit` / `estimate_success` / `estimate_error`.
