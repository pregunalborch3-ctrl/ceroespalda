import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbsSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Política de privacidad",
  description: `Política de privacidad de ${siteConfig.name} conforme al RGPD y la LOPDGDD.`,
  path: "/privacidad",
});

const lastUpdated = "10 de mayo de 2026";

export default function PrivacidadPage() {
  return (
    <Container className="py-12">
      <JsonLd
        data={breadcrumbsSchema([
          { name: "Inicio", url: "/" },
          { name: "Privacidad", url: "/privacidad" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Privacidad", href: "/privacidad", current: true },
        ]}
      />

      <article className="prose prose-zinc mx-auto mt-6 max-w-3xl prose-headings:tracking-tight">
        <h1>Política de privacidad</h1>
        <p>
          <em>Última actualización: {lastUpdated}.</em>
        </p>

        <p>
          En {siteConfig.name} (en adelante, &quot;el sitio&quot;) tratamos tus
          datos personales con transparencia y conforme al Reglamento (UE)
          2016/679 (RGPD) y a la Ley Orgánica 3/2018 de Protección de Datos
          Personales y garantía de los derechos digitales (LOPDGDD). Esta
          política explica qué información recogemos, con qué fin y qué
          derechos tienes sobre ella.
        </p>

        <h2>1. Responsable del tratamiento</h2>
        <p>
          Responsable: {siteConfig.author.name} ({siteConfig.name}).
          <br />
          Sitio web: <a href={siteConfig.url}>{siteConfig.url}</a>.
          <br />
          Correo de contacto: hola@ceroespalda.com.
        </p>

        <h2>2. Qué datos tratamos</h2>
        <ul>
          <li>
            <strong>Datos que nos facilitas voluntariamente</strong> al
            escribirnos por correo electrónico (nombre, dirección de correo y
            el contenido del mensaje).
          </li>
          <li>
            <strong>Datos de navegación y dispositivo</strong>: dirección IP,
            tipo de navegador, páginas visitadas, idioma, sistema operativo y
            tiempos de visita. Estos datos se obtienen de forma agregada a
            través de cookies y tecnologías similares.
          </li>
        </ul>

        <h2>3. Finalidades</h2>
        <ul>
          <li>Responder a tus consultas y comunicaciones.</li>
          <li>
            Analizar el uso del sitio para mejorar el contenido y la
            experiencia.
          </li>
          <li>
            En el futuro, mostrar publicidad relevante a través de Google
            AdSense (ver punto 5).
          </li>
        </ul>

        <h2>4. Base jurídica</h2>
        <ul>
          <li>
            <strong>Consentimiento</strong> (art. 6.1.a RGPD), que prestas
            mediante el banner de cookies o al enviarnos un correo.
          </li>
          <li>
            <strong>Interés legítimo</strong> (art. 6.1.f RGPD) para mantener
            el sitio operativo, proteger su seguridad y analizar uso agregado.
          </li>
        </ul>

        <h2>5. Publicidad de terceros (Google AdSense)</h2>
        <p>
          El sitio puede mostrar publicidad de Google AdSense. Google y sus
          partners utilizan cookies para mostrar anuncios basados en tus
          visitas previas a este u otros sitios web. Puedes inhabilitar la
          publicidad personalizada en{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            la configuración de anuncios de Google
          </a>
          . Más información en{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            las políticas de Google
          </a>
          .
        </p>

        <h2>6. Cesión de datos</h2>
        <p>
          No vendemos ni cedemos tus datos personales a terceros. Únicamente
          determinados proveedores de servicio (alojamiento, analítica,
          publicidad contextual) pueden acceder a datos técnicos en el marco
          de su prestación, siempre con las garantías exigidas por la
          normativa.
        </p>

        <h2>7. Plazos de conservación</h2>
        <p>
          Conservamos los datos de contacto el tiempo necesario para
          atenderte, y los datos analíticos según la configuración de las
          herramientas (habitualmente 14-26 meses). Cuando ya no son
          necesarios, se eliminan o anonimizan.
        </p>

        <h2>8. Tus derechos</h2>
        <p>
          Puedes ejercer en cualquier momento tus derechos de acceso,
          rectificación, supresión, oposición, limitación y portabilidad
          enviando un correo a hola@ceroespalda.com. Si consideras que tu
          derecho a la protección de datos no se ha respetado, puedes
          presentar una reclamación ante la{" "}
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agencia Española de Protección de Datos
          </a>
          .
        </p>

        <h2>9. Cambios en esta política</h2>
        <p>
          Esta política puede actualizarse para adaptarla a cambios legales o
          a nuevos servicios del sitio. Cualquier cambio se reflejará en esta
          página con su fecha de actualización.
        </p>
      </article>
    </Container>
  );
}
