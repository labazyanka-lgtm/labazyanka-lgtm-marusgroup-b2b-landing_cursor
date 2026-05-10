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

## Что нужно подменить под боевой запуск

- Юридические данные (Юр. лицо / ИНН / ОГРН / КПП) — сейчас «уточняется».
- Адрес и режим работы — «уточняется».
- **Форма заявки:** эндпоинт `POST /api/estimate` (см. `app/api/estimate/route.ts`).
  Задайте в `.env` переменные из `.env.example`: почта через **Resend**
  (`RESEND_API_KEY`, `ESTIMATE_EMAIL_FROM`, `ESTIMATE_EMAIL_TO`) и/или копия
  заявки JSON на **`ESTIMATE_WEBHOOK_URL`** (CRM, Zapier и т.д.).
- **Аналитика:** `NEXT_PUBLIC_YANDEX_METRIKA_ID` и/или
  `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Цели в Метрике: `estimate_submit`,
  `header_estimate`, `mobile_cta_phone`, `mobile_cta_photo`, `mobile_cta_visit`
  (создайте их в интерфейсе Метрики).
- Реальные фото объектов — добавить в карточки `Experience.tsx`,
  если будет согласие застройщиков.
- Логотипы клиентов — не используем, пока нет файлов и письменного разрешения.
