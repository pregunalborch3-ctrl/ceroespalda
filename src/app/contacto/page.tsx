import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbsSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Contacto",
  description: `Contacta con ${siteConfig.name}: dudas, sugerencias, colaboraciones o correcciones sobre los artículos del blog.`,
  path: "/contacto",
});

const CONTACT_EMAIL = "hola@ceroespalda.com";

export default function ContactoPage() {
  return (
    <Container className="py-12">
      <JsonLd
        data={breadcrumbsSchema([
          { name: "Inicio", url: "/" },
          { name: "Contacto", url: "/contacto" },
        ])}
      />

      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Contacto", href: "/contacto", current: true },
        ]}
      />

      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Contacto
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Cuéntame
        </h1>
        <p className="mt-3 text-muted-foreground">
          Para dudas, sugerencias de temas, correcciones, colaboraciones o
          temas legales.
        </p>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="flex flex-col gap-3 p-6">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
              >
                <Mail className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-semibold">Email</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              La forma más directa. Respondo en cuanto puedo.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-3 p-6">
            <h2 className="text-lg font-semibold">Antes de escribir</h2>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>
                Si buscas consejo médico, contacta con un profesional
                sanitario. No puedo dar diagnósticos por correo.
              </li>
              <li>
                Si quieres proponer un producto para review, indícalo y dime
                por qué crees que encaja con el blog.
              </li>
              <li>
                Si has visto un error en un artículo, dime cuál y de dónde
                viene la corrección. Lo agradezco mucho.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        Datos de contacto a efectos de la LSSI-CE: {siteConfig.name}, {" "}
        <a
          className="underline-offset-4 hover:underline"
          href={`mailto:${CONTACT_EMAIL}`}
        >
          {CONTACT_EMAIL}
        </a>
        . Más información en el{" "}
        <a className="underline-offset-4 hover:underline" href="/aviso-legal">
          aviso legal
        </a>
        .
      </p>
    </Container>
  );
}
