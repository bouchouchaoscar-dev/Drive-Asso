import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "on-dark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-display font-semibold rounded-full " +
  "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "focus-visible:ring-gold focus-visible:ring-offset-white " +
  "disabled:opacity-60 disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  // Doré sur fond clair = OK pour un bouton (surface, pas du texte courant). Texte anthracite lisible.
  primary:
    "bg-gold text-ink-900 shadow-[0_8px_24px_-8px_rgba(212,160,23,0.5)] " +
    "hover:bg-gold-600 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-10px_rgba(212,160,23,0.6)] active:translate-y-0",
  secondary:
    "bg-ink-900 text-white shadow-sm hover:-translate-y-0.5 hover:bg-ink-700 active:translate-y-0",
  ghost:
    "bg-white text-ink-900 ring-1 ring-line hover:ring-ink-900/20 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
  // Sur fond anthracite (footer / sections sombres)
  "on-dark":
    "bg-white text-ink-900 hover:-translate-y-0.5 hover:bg-white/90 active:translate-y-0 focus-visible:ring-offset-ink-900",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base py-3.5",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps &
  ({ href: string } | { href?: undefined }) &
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
