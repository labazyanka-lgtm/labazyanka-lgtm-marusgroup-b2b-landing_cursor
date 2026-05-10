import { Phone, Camera, CalendarDays } from "lucide-react";
import { contacts } from "@/lib/site-config";

export function MobileStickyCta() {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-line bg-white/95 backdrop-blur-md"
      aria-label="Быстрые действия"
    >
      <div className="grid grid-cols-3 divide-x divide-line">
        <a
          href={`tel:${contacts.phoneTel}`}
          data-analytics="mobile_sticky.phone"
          className="flex flex-col items-center justify-center gap-1 py-3 text-[11px] font-medium text-ink hover:bg-surface-subtle"
        >
          <Phone className="h-5 w-5 text-accent" aria-hidden="true" />
          Позвонить
        </a>
        <a
          href="#estimate"
          data-analytics="mobile_sticky.estimate_photo"
          className="flex flex-col items-center justify-center gap-1 py-3 text-[11px] font-medium text-ink hover:bg-surface-subtle"
        >
          <Camera className="h-5 w-5 text-accent" aria-hidden="true" />
          Оценить по фото
        </a>
        <a
          href="#estimate"
          data-analytics="mobile_sticky.estimate_visit"
          className="flex flex-col items-center justify-center gap-1 py-3 text-[11px] font-medium text-ink hover:bg-surface-subtle"
        >
          <CalendarDays className="h-5 w-5 text-accent" aria-hidden="true" />
          Назначить выезд
        </a>
      </div>
    </div>
  );
}
