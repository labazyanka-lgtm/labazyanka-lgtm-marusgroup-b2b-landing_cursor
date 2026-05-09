import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-radial">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-soft [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] opacity-40"
      />
      <div className="container relative pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              B2B-платформа для устойчивого роста
            </p>
            <h1 className="mt-5 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
              Управляйте бизнесом{" "}
              <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                как единой системой
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-muted text-balance">
              Marusgroup объединяет автоматизацию, интеграции и аналитику в один
              управляемый контур: от первой заявки до отчётности для совета
              директоров.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn-primary">
                Получить демо
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#services" className="btn-secondary">
                Что мы делаем
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-muted">
              <li className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-600" aria-hidden="true" />
                ФЗ-152, ISO 27001
              </li>
              <li className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-600" aria-hidden="true" />
                SLA 99.95%
              </li>
              <li className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-600" aria-hidden="true" />
                Внедрение от 4 недель
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5">
            <HeroPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-brand-500/15 to-transparent blur-2xl" />
      <div className="card overflow-hidden">
        <div className="flex items-center gap-1.5 border-b border-slate-100 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          <span className="ml-3 text-xs font-medium text-ink-soft">
            marusgroup • dashboard
          </span>
        </div>
        <div className="p-5">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">
                Выручка, MTD
              </p>
              <p className="mt-1 text-3xl font-semibold tracking-tight text-ink">
                ₽ 24,7 млн
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-100">
              ▲ 12,4%
            </span>
          </div>

          <div className="mt-5">
            <Sparkline />
          </div>

          <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
            {[
              { k: "Сделки", v: "1 284" },
              { k: "Конверсия", v: "31%" },
              { k: "NPS", v: "72" },
            ].map((m) => (
              <div
                key={m.k}
                className="rounded-xl bg-slate-50 px-3 py-3 ring-1 ring-inset ring-slate-100"
              >
                <dt className="text-[11px] font-medium uppercase tracking-wider text-ink-soft">
                  {m.k}
                </dt>
                <dd className="mt-1 text-lg font-semibold text-ink">{m.v}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-5 space-y-2.5">
            {[
              { t: "Интеграция с 1С: УТ", s: "синхронизировано" },
              { t: "Поток заявок из CRM", s: "в работе" },
              { t: "Отчёт для CFO", s: "готов к выгрузке" },
            ].map((row) => (
              <li
                key={row.t}
                className="flex items-center justify-between rounded-lg bg-white px-3 py-2 ring-1 ring-inset ring-slate-100"
              >
                <span className="text-sm text-ink">{row.t}</span>
                <span className="text-xs text-ink-soft">{row.s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Sparkline() {
  const points = [12, 18, 14, 22, 19, 28, 26, 34, 31, 40, 38, 46];
  const w = 320;
  const h = 80;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const stepX = w / (points.length - 1);
  const norm = (v: number) => h - ((v - min) / (max - min)) * (h - 8) - 4;
  const d = points
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * stepX},${norm(v)}`)
    .join(" ");
  const area = `${d} L ${w},${h} L 0,${h} Z`;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full"
      role="img"
      aria-label="Динамика выручки растёт"
    >
      <defs>
        <linearGradient id="spark" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#3563ff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3563ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spark)" />
      <path
        d={d}
        fill="none"
        stroke="#1f43f5"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
