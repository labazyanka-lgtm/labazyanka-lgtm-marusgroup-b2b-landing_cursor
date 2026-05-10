"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Camera,
  CalendarDays,
  FileText,
} from "lucide-react";
import { trackEstimateSubmit } from "@/lib/analytics";

const STAGES = [
  "Передача помещений",
  "Подготовка к приёмке",
  "Эксплуатация",
  "Другая стадия",
];

const ZONES = [
  "Готовые помещения перед передачей",
  "МОПы",
  "Входные группы",
  "Фасадное остекление",
  "Витражные конструкции",
  "Алюминиевые конструкции",
];

const REQUEST_TYPES = [
  { id: "photo", label: "Оценка по фото" },
  { id: "visit", label: "Выезд на дефектовку" },
  { id: "kp", label: "Предварительное КП" },
  { id: "consult", label: "Консультация по объекту" },
];

const CONTACT_PREFS = ["Телефон", "Email", "Telegram", "WhatsApp"];

export function EstimateForm() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    setPending(true);
    const form = e.currentTarget;
    const body = new FormData(form);

    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        body,
      });
      const data: unknown = await res.json().catch(() => null);
      const message =
        data &&
        typeof data === "object" &&
        "error" in data &&
        typeof (data as { error: unknown }).error === "string"
          ? (data as { error: string }).error
          : null;

      if (!res.ok) {
        setSubmitError(
          message ??
            "Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь по телефону.",
        );
        return;
      }

      setSubmitted(true);
      trackEstimateSubmit();
      form.reset();
    } catch {
      setSubmitError(
        "Нет соединения с сервером. Проверьте интернет или позвоните нам.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="estimate" className="section bg-surface-subtle">
      <div className="container">
        <div className="card overflow-hidden">
          <div className="grid lg:grid-cols-12">
            <aside className="lg:col-span-5 bg-gradient-to-br from-accent-700 to-accent-900 p-8 sm:p-10 text-white">
              <p className="eyebrow !bg-white/10 !text-white !ring-white/20">
                Запросить оценку
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
                Запросить оценку по объекту
              </h2>
              <p className="mt-4 text-white/85 max-w-md">
                Передайте вводные по объекту — мы оценим характер замечаний,
                предложим следующий шаг и при необходимости согласуем выезд на
                дефектовку.
              </p>

              <ul className="mt-8 space-y-3 text-sm text-white/90">
                {[
                  {
                    icon: Camera,
                    text: "Принимаем фото дефектов для предварительной оценки",
                  },
                  {
                    icon: CalendarDays,
                    text: "Согласуем выезд на дефектовку и условия допуска",
                  },
                  {
                    icon: FileText,
                    text: "Готовим предварительное или детальное КП",
                  },
                ].map((row) => (
                  <li key={row.text} className="flex items-start gap-2.5">
                    <row.icon
                      className="mt-0.5 h-4 w-4 shrink-0 text-white/90"
                      aria-hidden="true"
                    />
                    <span>{row.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t border-white/15 pt-6 text-sm text-white/80">
                <p>
                  <a
                    href="tel:+79175162404"
                    className="font-semibold text-white hover:underline"
                  >
                    +7 (917) 516-24-04
                  </a>
                </p>
                <p className="mt-1">
                  <a
                    href="mailto:info@marusgroup.ru"
                    className="font-semibold text-white hover:underline"
                  >
                    info@marusgroup.ru
                  </a>
                </p>
              </div>
            </aside>

            <div className="lg:col-span-7 p-8 sm:p-10">
              {submitted ? (
                <div className="flex h-full flex-col items-start justify-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-glass text-accent-700 ring-1 ring-inset ring-accent-200/70">
                    <CheckCircle2 className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight">
                    Заявка по объекту получена
                  </h3>
                  <p className="mt-2 text-ink-muted max-w-md">
                    Ответственный специалист свяжется в течение 1 рабочего дня,
                    при необходимости запросит дополнительные данные и согласует
                    следующий шаг — оценку по фото, выезд на дефектовку или
                    подготовку КП.
                  </p>
                </div>
              ) : (
                <form
                  className="grid gap-4 sm:grid-cols-2"
                  onSubmit={onSubmit}
                  noValidate
                >
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="website-hp">Не заполнять</label>
                    <input
                      id="website-hp"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className="label">
                      Имя
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="input"
                      placeholder="Иван Петров"
                    />
                  </div>
                  <div>
                    <label htmlFor="position" className="label">
                      Должность
                    </label>
                    <input
                      id="position"
                      name="position"
                      type="text"
                      autoComplete="organization-title"
                      className="input"
                      placeholder="Главный инженер"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="label">
                      Компания
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      required
                      autoComplete="organization"
                      className="input"
                      placeholder="ООО «Застройщик»"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="label">
                      Телефон
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      className="input"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="label">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="input"
                      placeholder="ivanov@example.ru"
                    />
                  </div>

                  <div>
                    <label htmlFor="object" className="label">
                      Объект / ЖК
                    </label>
                    <input
                      id="object"
                      name="object"
                      type="text"
                      required
                      className="input"
                      placeholder="Например, ЖК Eleven, корпус 2"
                    />
                  </div>
                  <div>
                    <label htmlFor="stage" className="label">
                      Стадия объекта
                    </label>
                    <select
                      id="stage"
                      name="stage"
                      defaultValue=""
                      className="input"
                    >
                      <option value="" disabled>
                        Выберите стадию
                      </option>
                      {STAGES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="zone" className="label">
                      Зона работ
                    </label>
                    <select
                      id="zone"
                      name="zone"
                      defaultValue=""
                      className="input"
                    >
                      <option value="" disabled>
                        Выберите зону
                      </option>
                      {ZONES.map((z) => (
                        <option key={z} value={z}>
                          {z}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="defects" className="label">
                      Тип замечаний
                    </label>
                    <input
                      id="defects"
                      name="defects"
                      type="text"
                      className="input"
                      placeholder="Царапины, окалина, профиль…"
                    />
                  </div>

                  <div>
                    <label htmlFor="volume" className="label">
                      Примерный объём
                    </label>
                    <input
                      id="volume"
                      name="volume"
                      type="text"
                      className="input"
                      placeholder="Например, ~250 м² или 2 корпуса"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-pref" className="label">
                      Удобный способ связи
                    </label>
                    <select
                      id="contact-pref"
                      name="contact-pref"
                      defaultValue=""
                      className="input"
                    >
                      <option value="" disabled>
                        Выберите способ
                      </option>
                      {CONTACT_PREFS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <span className="label">Что требуется</span>
                    <div
                      role="group"
                      aria-label="Что требуется"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                    >
                      {REQUEST_TYPES.map((r) => (
                        <label
                          key={r.id}
                          className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 ring-1 ring-inset ring-line cursor-pointer hover:bg-surface-subtle"
                        >
                          <input
                            type="checkbox"
                            name="request-type"
                            value={r.id}
                            className="h-4 w-4 rounded border-line text-accent focus:ring-accent"
                          />
                          <span className="text-sm text-ink">{r.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="photos" className="label">
                      Загрузка фото (необязательно)
                    </label>
                    <input
                      id="photos"
                      name="photos"
                      type="file"
                      multiple
                      accept="image/*"
                      className="block w-full text-sm text-ink-muted file:mr-4 file:rounded-lg file:border-0 file:bg-glass file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-accent-700 hover:file:bg-accent-100"
                    />
                    <p className="mt-1.5 text-xs text-ink-soft">
                      Можно прикрепить несколько фото дефектов или зоны работ.
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="comment" className="label">
                      Комментарий
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      rows={4}
                      className="input resize-y"
                      placeholder="Сроки, ограничения по доступу, особенности объекта…"
                    />
                  </div>

                  {submitError ? (
                    <div className="sm:col-span-2">
                      <p
                        className="rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-900 ring-1 ring-inset ring-red-200"
                        role="alert"
                      >
                        {submitError}
                      </p>
                    </div>
                  ) : null}

                  <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-1">
                    <p className="text-xs text-ink-soft max-w-md">
                      Нажимая кнопку, вы соглашаетесь с политикой обработки
                      персональных данных.
                    </p>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={pending}
                    >
                      {pending ? "Отправка…" : "Запросить оценку по объекту"}
                      {!pending && (
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
