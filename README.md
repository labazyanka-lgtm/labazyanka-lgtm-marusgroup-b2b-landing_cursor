# Marusgroup B2B Landing

B2B-лендинг для Marusgroup на Next.js 14 (App Router) + TypeScript + Tailwind CSS.

## Стек

- Next.js 14 (App Router, RSC)
- React 18, TypeScript 5 (strict)
- Tailwind CSS 3
- `lucide-react` для иконок

## Запуск

Требуется Node.js 18+.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
npm run start    # запуск продакшен-сборки
```

## Структура

```
app/
  layout.tsx        # корневой layout, метаданные, OG, lang=ru
  page.tsx          # главная страница (композиция секций)
  globals.css       # tailwind + базовые слои/компоненты
components/
  Header.tsx        # шапка с навигацией и моб. меню
  Hero.tsx          # hero c CTA и превью «дашборда»
  TrustBar.tsx      # полоса с клиентами
  Services.tsx      # 4 услуги
  Process.tsx       # 4 шага работы
  Stats.tsx         # KPI-блок
  Industries.tsx    # индустрии
  Faq.tsx           # FAQ (нативный <details>)
  ContactCta.tsx    # форма заявки + CTA
  Footer.tsx        # футер
```

## Что нужно подменить под реального клиента

- Контактные данные (телефон, e-mail, реквизиты) в `Header`, `ContactCta`, `Footer`.
- Список клиентов в `TrustBar` (заменить на реальные логотипы/названия).
- KPI и кейсы в `Stats`.
- Тексты услуг и индустрий — на актуальную линейку Marusgroup.
- Пункт «политика обработки ПДн» в форме — заменить на реальную ссылку.
- Подключить реальный backend для отправки формы (сейчас — имитация).
