import Image from "next/image";

export function Logo({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const tone = variant === "light" ? "" : "invert";
  return (
    <Image
      src="/brand/marus-logo.png"
      alt="MARUS GROUP"
      width={575}
      height={59}
      priority
      className={`h-auto w-[160px] ${tone} ${className}`}
    />
  );
}
