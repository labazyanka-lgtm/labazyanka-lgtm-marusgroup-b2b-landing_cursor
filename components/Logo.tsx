export function Logo({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const color = variant === "light" ? "text-white" : "text-ink";
  return (
    <span
      className={`inline-flex items-center font-semibold tracking-[0.18em] uppercase ${color} ${className}`}
    >
      <span className="text-[15px] sm:text-base">MARUS</span>
      <span className="ml-1 text-[15px] sm:text-base text-accent">GROUP</span>
    </span>
  );
}
