"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { href: "#services", label: "Услуги" },
  { href: "#process", label: "Как работаем" },
  { href: "#industries", label: "Индустрии" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors ${
        scrolled
          ? "bg-white/85 backdrop-blur-md ring-1 ring-slate-200/70"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between gap-6">
        <a href="#" aria-label="Marusgroup — на главную" className="shrink-0">
          <Logo />
        </a>

        <nav aria-label="Главная навигация" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted hover:text-ink hover:bg-slate-100 transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a href="tel:+74950000000" className="btn-ghost text-sm">
            +7 (495) 000-00-00
          </a>
          <a href="#contact" className="btn-primary">
            Оставить заявку
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg ring-1 ring-slate-200 text-ink hover:bg-slate-50"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-slate-200 bg-white"
        >
          <nav className="container py-4" aria-label="Мобильная навигация">
            <ul className="flex flex-col gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-base font-medium text-ink hover:bg-slate-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-col gap-2">
              <a
                href="tel:+74950000000"
                className="btn-secondary w-full"
                onClick={() => setOpen(false)}
              >
                +7 (495) 000-00-00
              </a>
              <a
                href="#contact"
                className="btn-primary w-full"
                onClick={() => setOpen(false)}
              >
                Оставить заявку
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
