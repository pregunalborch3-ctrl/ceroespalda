import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/container";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label={`${siteConfig.name} — inicio`}
        >
          {/* Figura humana de perfil con columna en verde */}
          <svg
            aria-hidden
            viewBox="0 0 28 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-auto"
          >
            {/* Cabeza */}
            <circle cx="16" cy="5.5" r="5.5" className="fill-foreground" />
            {/* Cuello */}
            <rect x="13" y="10.5" width="5.5" height="5" rx="2.75" className="fill-foreground" />
            {/* Torso — silueta de perfil con postura correcta */}
            <path
              d="M10 15C7 17 6 21 6 25C6 29 7.5 32 8 35C8.5 37 9 39 9.5 40L20 40C20.5 38.5 21 36 21 34C21 30 22 26 22 22C22 18 21 16 19 15Z"
              className="fill-foreground"
            />
            {/* Columna vertebral — curva S en verde (postura correcta) */}
            <path
              d="M16 15C18.5 19 14 24 15.5 29.5C17 35 16 38 15.5 40"
              stroke="#10b981"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Puntos de alineación oído-hombro-cadera */}
            <circle cx="15.5" cy="6" r="1.2" fill="#10b981" opacity="0.75" />
            <circle cx="15" cy="15.5" r="1.2" fill="#10b981" opacity="0.75" />
            <circle cx="15.5" cy="39" r="1.2" fill="#10b981" opacity="0.75" />
          </svg>

          {/* Logotipo: "Cero" fino + "Espalda" ultra-bold */}
          <span className="flex items-baseline gap-[3px] leading-none">
            <span className="text-lg font-light tracking-wide text-foreground">
              Cero
            </span>
            <span className="text-lg font-extrabold tracking-tight text-foreground">
              Espalda
            </span>
          </span>
        </Link>
        <MainNav />
        <MobileNav />
      </Container>
    </header>
  );
}
