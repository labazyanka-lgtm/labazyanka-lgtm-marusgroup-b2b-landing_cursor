export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-semibold tracking-tight ${className}`}
    >
      <span
        aria-hidden="true"
        className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-cta"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 18V6l5 7 5-7v12" />
          <circle cx="19" cy="17" r="2" fill="currentColor" stroke="none" />
        </svg>
      </span>
      <span className="text-lg">
        Marus<span className="text-brand-600">group</span>
      </span>
    </span>
  );
}
