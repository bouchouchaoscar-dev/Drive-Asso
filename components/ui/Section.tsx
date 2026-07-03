import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "paper" | "paper-2" | "mist" | "ink";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper",
  "paper-2": "bg-paper-2",
  mist: "bg-mist",
  ink: "bg-ink-900 text-white",
};

/** Bloc de section : padding vertical généreux + conteneur, rythme régulier. */
export function Section({
  id,
  children,
  className,
  innerClassName,
  tone = "paper",
  contained = true,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  tone?: Tone;
  contained?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 section-y",
        toneClass[tone],
        className
      )}
    >
      {contained ? (
        <Container className={innerClassName}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}

/** En-tête de section réutilisable : eyebrow doré + titre + filet + intro. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  tone = "light",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  tone?: "light" | "dark";
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "max-w-2xl",
        centered && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div
          data-reveal
          className={cn(
            "eyebrow mb-4",
            tone === "dark" && "!text-gold",
            centered && "flex items-center justify-center gap-3"
          )}
        >
          {eyebrow}
        </div>
      )}
      <h2
        data-reveal
        data-reveal-delay="1"
        className={cn(
          "text-balance text-3xl font-extrabold leading-[1.1] sm:text-4xl md:text-[2.7rem]",
          tone === "dark" ? "text-white" : "text-ink-900"
        )}
      >
        {title}
      </h2>
      <div
        data-reveal
        data-reveal-delay="2"
        className={cn("gold-rule mt-6", centered && "mx-auto")}
      />
      {intro && (
        <p
          data-reveal
          data-reveal-delay="2"
          className={cn(
            "mt-6 text-lg leading-relaxed",
            tone === "dark" ? "text-white/70" : "text-smoke"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
