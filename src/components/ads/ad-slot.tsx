import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export type AdVariant =
  | "leaderboard"
  | "rectangle"
  | "in-article"
  | "sidebar"
  | "mobile-banner";

interface AdSlotProps {
  variant: AdVariant;
  label?: string;
  className?: string;
}

const dimensions: Record<
  AdVariant,
  { className: string; minHeight: number; description: string }
> = {
  leaderboard: {
    className: "hidden md:block w-full max-w-[728px] mx-auto",
    minHeight: 90,
    description: "728×90 leaderboard",
  },
  "mobile-banner": {
    className: "md:hidden w-full max-w-[320px] mx-auto",
    minHeight: 100,
    description: "320×100 mobile banner",
  },
  rectangle: {
    className: "w-full max-w-[336px] mx-auto",
    minHeight: 280,
    description: "336×280 medium rectangle",
  },
  "in-article": {
    className: "w-full mx-auto",
    minHeight: 250,
    description: "in-article fluid",
  },
  sidebar: {
    className: "w-full max-w-[300px] mx-auto",
    minHeight: 600,
    description: "300×600 half page (sticky)",
  },
};

/**
 * AdSlot
 *
 * Reserva el espacio para un anuncio con dimensiones fijas (previene CLS).
 * Hoy renderiza un placeholder. Cuando AdSense esté instalado y
 * NEXT_PUBLIC_ADSENSE_ENABLED=true, este componente cargará el bloque real.
 */
export function AdSlot({ variant, label, className }: AdSlotProps) {
  const config = dimensions[variant];
  const enabled = siteConfig.adsense.enabled;

  return (
    <div
      role="complementary"
      aria-label={label ?? "Espacio publicitario"}
      data-ad-slot={variant}
      className={cn("my-8", config.className, className)}
      style={{ minHeight: config.minHeight }}
    >
      {!enabled ? (
        <div
          aria-hidden
          className="flex h-full w-full items-center justify-center rounded-md border border-dashed border-border/60 bg-muted/30 text-xs text-muted-foreground/70"
          style={{ minHeight: config.minHeight }}
        >
          Espacio reservado · {config.description}
        </div>
      ) : (
        <div
          className="h-full w-full"
          style={{ minHeight: config.minHeight }}
          // El día que AdSense esté activo, aquí se inyectará el bloque
          // <ins class="adsbygoogle" ...>
        />
      )}
    </div>
  );
}
