import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbsSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Política de cookies",
  description: `Política de cookies de ${siteConfig.name}: qué cookies usamos, para qué y cómo gestionarlas.`,
  path: "/cookies",
});

const lastUpdated = "10 de mayo de 2026";

export default function CookiesPage() {
  return (
    <Container className="py-12">
      <JsonLd
        data={breadcrumbsSchema([
          { name: "Inicio", url: "/" },
          { name: "Cookies", url: "/cookies" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Cookies", href: "/cookies", current: true },
        ]}
      />

      <article className="prose prose-zinc mx-auto mt-6 max-w-3xl prose-headings:tracking-tight">
        <h1>Política de cookies</h1>
        <p>
          <em>Última actualización: {lastUpdated}.</em>
        </p>

        <h2>1. Qué son las cookies</h2>
        <p>
          Las cookies son pequeños archivos que se almacenan en tu dispositivo
          cuando visitas un sitio web. Permiten reconocer tu navegación,
          recordar preferencias y obtener información estadística sobre el
          uso del sitio.
        </p>

        <h2>2. Tipos de cookies que utilizamos</h2>
        <ul>
          <li>
            <strong>Cookies técnicas (necesarias).</strong> Permiten el
            funcionamiento básico del sitio. No requieren consentimiento.
          </li>
          <li>
            <strong>Cookies de personalización.</strong> Recuerdan tus
            preferencias (por ejemplo, si has aceptado o rechazado el banner
            de cookies).
          </li>
          <li>
            <strong>Cookies analíticas.</strong> Nos ayudan a entender cómo se
            usa el sitio para mejorarlo. Solo se activan si las aceptas.
          </li>
          <li>
            <strong>Cookies publicitarias (Google AdSense).</strong> En el
            futuro podremos mostrar publicidad mediante Google AdSense. Estas
            cookies sirven para mostrar anuncios y medir su rendimiento. Solo
            se activan si las aceptas.
          </li>
        </ul>

        <h2>3. Gestión del consentimiento</h2>
        <p>
          La primera vez que visitas {siteConfig.name} aparece un banner que
          te permite <strong>aceptar</strong> o <strong>rechazar</strong> las
          cookies no necesarias. Tu elección se guarda durante 6 meses. Puedes
          modificarla en cualquier momento borrando los datos del sitio en tu
          navegador o pulsando de nuevo en el botón correspondiente del
          banner si lo activas desde el pie de página.
        </p>

        <h2>4. Cómo gestionar las cookies en tu navegador</h2>
        <p>
          Además del banner, puedes configurar tu navegador para bloquear o
          eliminar las cookies. Recuerda que algunas funcionalidades del sitio
          podrían dejar de funcionar correctamente.
        </p>
        <ul>
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
              target="_blank"
              rel="noopener noreferrer"
            >
              Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/es-es/microsoft-edge"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>

        <h2>5. Más información</h2>
        <p>
          Para más detalles sobre el tratamiento de tus datos personales,
          consulta la{" "}
          <a href="/privacidad">política de privacidad</a>.
        </p>
      </article>
    </Container>
  );
}
