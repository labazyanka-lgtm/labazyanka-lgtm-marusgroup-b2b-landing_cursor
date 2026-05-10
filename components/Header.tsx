"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { contacts } from "@/lib/site-config";

const NAV = [
  { href: "#for-whom", label: "Для кого" },
  { href: "#regulation", label: "Регламент" },
  { href: "#experience", label: "Опыт" },
  { href: "#contacts", label: "Контакты" },
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
          ? "bg-white/90 backdrop-blur-md ring-1 ring-line/70"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between gap-6">
        <a href="#" aria-label="MARUS GROUP — на главную" className="shrink-0">
          <Logo />
        </a>

        <nav aria-label="Главная навигация" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted hover:text-ink hover:bg-surface-subtle transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href={`tel:${contacts.phoneTel}`}
            data-analytics="header.phone"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent"
          >
            <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
            {contacts.phoneDisplay}
          </a>
          <a
            href="#estimate"
            data-analytics="header.cta_estimate"
            className="btn-primary"
          >
            Запросить оценку
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg ring-1 ring-line text-ink hover:bg-surface-subtle"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-line bg-white"
        >
          <nav className="container py-4" aria-label="Мобильная навигация">
            <ul className="flex flex-col gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-base font-medium text-ink hover:bg-surface-subtle"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-col gap-2">
              <a
                href={`tel:${contacts.phoneTel}`}
                data-analytics="header_mobile.phone"
                className="btn-secondary w-full"
                onClick={() => setOpen(false)}
              >
                <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                {contacts.phoneDisplay}
              </a>
              <a
                href="#estimate"
                data-analytics="header_mobile.cta_estimate"
                className="btn-primary w-full"
                onClick={() => setOpen(false)}
              >
                Запросить оценку
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
