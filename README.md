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

Требуется Node.js 18+ (в CI используется актуальный LTS).

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run test     # Vitest: обработчик POST /api/estimate
npm run build
npm run start
npx playwright install chromium   # один раз локально
npm run build && npm run test:e2e              # smoke (порт 3000)
npm run build && npm run test:e2e:estimate    # успешный POST /api/estimate через локальный mock webhook (порт 3001)
```

### CI

В GitHub Actions (`.github/workflows/ci.yml`) на каждый push и PR выполняются:
`npm ci` → `npm run lint` → `npm run test` → `npm run build` → установка Chromium для Playwright → `npm run test:e2e` → `npm run test:e2e:estimate`.

### Переменные окружения (staging и production)

Минимальный набор для **рабочей формы заявки** задан в `.env.example`:

| Условие | Переменные |
|--------|------------|
| Только дублирование заявки во внешнюю систему | `ESTIMATE_WEBHOOK_URL` |
| Отправка письма через Resend | `RESEND_API_KEY`, `ESTIMATE_EMAIL_FROM`; опционально `ESTIMATE_EMAIL_TO` |
| И почта, и webhook | все перечисленные — webhook при ошибке не отменяет успешную отправку письма |

Без одного из каналов (Resend или webhook) эндпоинт отвечает **503** — это ожидаемая защита от «тихой» потери заявок.

**Публичные реквизиты и адрес** в блоках контактов и футера задаются через `NEXT_PUBLIC_*` из `.env.example`. Если переменные не заданы, остаются заглушки до боевого запуска.

**Аналитика:** `NEXT_PUBLIC_YANDEX_METRIKA_ID` и/или `NEXT_PUBLIC_GA_MEASUREMENT_ID` — см. ниже.

#### Что значит «выставить переменные из `.env.example` в проде»

На хостинге (Vercel, VPS и т.д.) в настройках проекта задаются те же имена переменных, что и в `.env.example`, чтобы приложение при старте их прочитало.

- **`RESEND_API_KEY` + `ESTIMATE_EMAIL_FROM`** — включают отправку письма через [Resend](https://resend.com): ключ API и адрес отправителя (домен должен быть верифицирован в Resend).
- **`ESTIMATE_EMAIL_TO`** — куда слать письмо; если не задать, в коде используется значение по умолчанию `info@marusgroup.ru`.
- **`ESTIMATE_WEBHOOK_URL`** — URL вашего приёмника JSON (CRM, Zapier, самописный endpoint): заявка дублируется POST-запросом без реальной почты.

Достаточно **либо** связки Resend (**`RESEND_API_KEY` и `ESTIMATE_EMAIL_FROM`** — обязательны вместе), **либо** только **`ESTIMATE_WEBHOOK_URL`**. Если не задать ни то ни другое, форма получит **503** — так сервер сигнализирует, что заявки никуда не уходят.

### npm audit

Цепочка `eslint-config-next` переведена на безопасную по GHSA версию **glob** через `overrides` в `package.json`. Предупреждение npm о «устаревшем» glob исходит от политики автора пакета и не означает регрессию по закрытому GHSA для ESLint.

Отчёт `npm audit` может по-прежнему показывать **next** и вложенный **postcss** (Next 14 жёстко тянет postcss 8.4.x): закрытие без перехода на следующую мажорную линию Next обычно приходит с патчем фреймворка — имеет смысл периодически обновлять `next` в пределах 14.x и планировать миграцию на 15+, когда это уместно для проекта.

## Структура страницы (`app/page.tsx`)

1. `Header` — sticky, моб. меню, телефон, CTA «Запросить оценку»
2. `Hero` — H1 про доведение стекла и профиля до состояния приёмки + 4 маркера + 3 CTA + «карта объекта»
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
15. `Contacts` — контакты + юридические реквизиты (`NEXT_PUBLIC_*`, иначе заглушки)
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

## Что нужно подменить под боевой запуск

- Юридические данные и адрес: переменные `NEXT_PUBLIC_LEGAL_ENTITY_NAME`, `NEXT_PUBLIC_COMPANY_INN`, `NEXT_PUBLIC_COMPANY_OGRN`, `NEXT_PUBLIC_COMPANY_KPP`, `NEXT_PUBLIC_OFFICE_ADDRESS`, `NEXT_PUBLIC_OFFICE_HOURS` (см. `.env.example`).
- **Форма заявки:** эндпоинт `POST /api/estimate` (см. `app/api/estimate/route.ts`).
  Минимальный набор переменных для почты и webhook — в разделе «Переменные окружения» выше и в `.env.example`.
- **Аналитика:** `NEXT_PUBLIC_YANDEX_METRIKA_ID` и/или
  `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Цели в Метрике: `estimate_submit`,
  `header_estimate`, `mobile_cta_phone`, `mobile_cta_photo`, `mobile_cta_visit`
  (создайте их в интерфейсе Метрики).
- Фото объектов в блоке опыта лежат в `public/projects/` (исходники — с действующего сайта marusgroup.ru); при необходимости замените файлы или пути в `Experience.tsx`.
- Логотипы клиентов — не используем, пока нет файлов и письменного разрешения.
