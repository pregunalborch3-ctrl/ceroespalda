import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/container";
import { categories } from "../../../data/categories";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t bg-muted/30">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold"
              aria-label={`${siteConfig.name} — inicio`}
            >
              <span
                aria-hidden
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
              >
                <span className="text-sm font-bold">CE</span>
              </span>
              <span>{siteConfig.name}</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Salud postural y cuidado de la espalda, con guías prácticas y
              honestas.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold">Categorías</h2>
            <ul className="space-y-2 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categoria/${c.slug}`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold">Contenido</h2>
            <ul className="space-y-2 text-sm">
              {siteConfig.footerNav.contenido.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold">Legal</h2>
            <ul className="space-y-2 text-sm">
              {siteConfig.footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-lg border bg-background/60 p-4 text-xs text-muted-foreground">
          <strong className="font-semibold text-foreground">
            Aviso médico:
          </strong>{" "}
          La información publicada en {siteConfig.name} tiene carácter
          divulgativo y no sustituye el diagnóstico, tratamiento o consejo de un
          profesional sanitario. Si tienes dolor persistente, consulta con tu
          médico o fisioterapeuta.
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {year} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <p>
            Hecho con cuidado en España ·{" "}
            <Link href="/feed.xml" className="hover:text-primary">
              RSS
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
