# Marusgroup B2B Landing

Изолированный проект современного B2B-лендинга Marusgroup для представителей застройщика жилья бизнес-класса.

## Стек

- Next.js App Router
- TypeScript
- CSS без сторонних UI-библиотек
- ESLint

## Локальный запуск

```bash
npm install
npm run dev
```

Приложение будет доступно на `http://localhost:3000`.

## Команды

- `npm run dev` — запуск dev-сервера Next.js.
- `npm run build` — production-сборка.
- `npm run lint` — проверка ESLint.

## Структура проекта

- `app/layout.tsx` — корневой layout и SEO-метаданные.
- `app/page.tsx` — контент лендинга и секции B2B-оффера.
- `app/globals.css` — глобальные стили, адаптивная сетка и визуальная система.
- `next.config.mjs` — конфигурация Next.js.
- `tsconfig.json` — настройки TypeScript.
- `eslint.config.mjs` — конфигурация ESLint.
