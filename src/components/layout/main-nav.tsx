import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function MainNav() {
  return (
    <nav
      aria-label="Navegación principal"
      className="hidden items-center gap-6 md:flex"
    >
      {siteConfig.nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
