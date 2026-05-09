"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function ContactCta() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setTimeout(() => {
      setPending(false);
      setSubmitted(true);
    }, 600);
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="card overflow-hidden">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-5 bg-gradient-to-br from-brand-700 to-brand-900 p-8 sm:p-10 text-white">
              <p className="eyebrow !bg-white/10 !text-white !ring-white/20">
                Связаться
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
                Покажем работающую систему за одну встречу
              </h2>
              <p className="mt-4 text-white/80">
                Оставьте заявку — за 1 рабочий день вернёмся с релевантным
                кейсом и предложим повестку демо под вашу задачу.
              </p>

              <ul className="mt-8 space-y-3 text-sm text-white/90">
                {[
                  "Демо релевантного решения, а не общая презентация",
                  "Под NDA — обсуждаем ваши процессы и системы",
                  "Бесплатно: оценка целевой архитектуры и эффекта",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white/90" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7 p-8 sm:p-10">
              {submitted ? (
                <div className="flex h-full flex-col items-start justify-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-100">
                    <CheckCircle2 className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight">
                    Спасибо! Заявка отправлена.
                  </h3>
                  <p className="mt-2 text-ink-muted max-w-md">
                    Менеджер свяжется в течение 1 рабочего дня. Если задача
                    срочная — позвоните нам напрямую.
                  </p>
                </div>
              ) : (
                <form
                  className="grid gap-4 sm:grid-cols-2"
                  onSubmit={onSubmit}
                  noValidate
                >
                  <div className="sm:col-span-1">
                    <label htmlFor="name" className="label">
                      Ваше имя
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
                  <div className="sm:col-span-1">
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
                      placeholder="ООО «Пример»"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="email" className="label">
                      Рабочий e-mail
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="input"
                      placeholder="ivan@example.com"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="phone" className="label">
                      Телефон
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className="input"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="task" className="label">
                      Кратко о задаче
                    </label>
                    <textarea
                      id="task"
                      name="task"
                      rows={4}
                      className="input resize-y"
                      placeholder="Что хотите автоматизировать или улучшить?"
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-1">
                    <p className="text-xs text-ink-soft max-w-xs">
                      Отправляя форму, вы соглашаетесь с{" "}
                      <a
                        href="#"
                        className="text-brand-700 underline underline-offset-2 hover:text-brand-800"
                      >
                        политикой обработки персональных данных
                      </a>
                      .
                    </p>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={pending}
                    >
                      {pending ? "Отправка…" : "Отправить заявку"}
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
