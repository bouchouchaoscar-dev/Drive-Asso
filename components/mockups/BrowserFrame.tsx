import { cn } from "@/lib/cn";

/** Fenêtre de navigateur stylisée pour encadrer les aperçus d'interface. */
export function BrowserFrame({
  url = "votre-club.fr",
  children,
  className,
  tone = "light",
}: {
  url?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border shadow-lg",
        tone === "dark"
          ? "border-white/10 bg-ink-900"
          : "border-line bg-white",
        className
      )}
    >
      {/* Barre de fenêtre */}
      <div
        className={cn(
          "flex items-center gap-3 border-b px-4 py-3",
          tone === "dark" ? "border-white/10" : "border-line bg-paper-2"
        )}
      >
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ef4444]/80" />
          <span className="h-3 w-3 rounded-full bg-[#f59e0b]/80" />
          <span className="h-3 w-3 rounded-full bg-[#22c55e]/80" />
        </div>
        <div
          className={cn(
            "ml-2 flex h-7 flex-1 items-center gap-2 rounded-md px-3 text-xs",
            tone === "dark"
              ? "bg-white/5 text-white/50"
              : "bg-white text-smoke ring-1 ring-line"
          )}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm3 8H9V6a3 3 0 1 1 6 0v3Z"
              fill="currentColor"
            />
          </svg>
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}
