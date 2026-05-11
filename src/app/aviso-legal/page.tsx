import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbsSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Aviso legal",
  description: `Aviso legal de ${siteConfig.name} conforme a la LSSI-CE.`,
  path: "/aviso-legal",
});

const lastUpdated = "10 de mayo de 2026";

export default function AvisoLegalPage() {
  return (
    <Container className="py-12">
      <JsonLd
        data={breadcrumbsSchema([
          { name: "Inicio", url: "/" },
          { name: "Aviso legal", url: "/aviso-legal" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Aviso legal", href: "/aviso-legal", current: true },
        ]}
      />

      <article className="prose prose-zinc mx-auto mt-6 max-w-3xl prose-headings:tracking-tight">
        <h1>Aviso legal</h1>
        <p>
          <em>Última actualización: {lastUpdated}.</em>
        </p>

        <h2>1. Datos identificativos</h2>
        <p>
          En cumplimiento de la Ley 34/2002, de 11 de julio, de servicios de la
          sociedad de la información y de comercio electrónico (LSSI-CE), se
          informa de lo siguiente:
        </p>
        <ul>
          <li>
            <strong>Titular:</strong> {siteConfig.author.name}.
          </li>
          <li>
            <strong>Sitio web:</strong>{" "}
            <a href={siteConfig.url}>{siteConfig.url}</a>.
          </li>
          <li>
            <strong>Correo electrónico:</strong> hola@ceroespalda.com.
          </li>
        </ul>
        <p>
          Si actúas como consumidor, tienes derecho a la información prevista
          en el Real Decreto Legislativo 1/2007 de Defensa de Consumidores y
          Usuarios.
        </p>

        <h2>2. Objeto</h2>
        <p>
          El sitio tiene como finalidad ofrecer contenido divulgativo sobre
          salud postural, dolor de espalda, ergonomía y temas relacionados.
          Los contenidos se publican con fines informativos y educativos. No
          constituyen consejo médico personalizado ni sustituyen al criterio
          de un profesional sanitario.
        </p>

        <h2>3. Condiciones de uso</h2>
        <p>
          El acceso al sitio es libre y gratuito. El usuario se compromete a
          utilizar los contenidos de forma lícita, respetando la legalidad
          vigente, los derechos de terceros y la buena fe.
        </p>

        <h2>4. Propiedad intelectual</h2>
        <p>
          Todos los textos, imágenes, marcas y demás elementos del sitio son
          propiedad de su titular o están utilizados con autorización. Queda
          prohibida la reproducción total o parcial de los contenidos sin
          consentimiento expreso, salvo cita breve y con atribución.
        </p>

        <h2>5. Enlaces externos</h2>
        <p>
          El sitio puede contener enlaces a páginas de terceros. No nos hacemos
          responsables de los contenidos, políticas o prácticas de dichas
          páginas, que se enlazan únicamente con fines informativos.
        </p>

        <h2>6. Enlaces de afiliación</h2>
        <p>
          Algunos artículos de la sección Productos pueden contener enlaces de
          afiliación. Si compras a través de uno de ellos, podemos recibir una
          pequeña comisión sin coste adicional para ti. Esto no condiciona el
          contenido de las reviews. Cuando un enlace sea de afiliación, se
          indicará claramente.
        </p>

        <h2>7. Limitación de responsabilidad</h2>
        <p>
          El titular del sitio no se responsabiliza de las decisiones tomadas a
          partir del contenido publicado. Si tienes dolor persistente, intenso
          o cualquier síntoma que te preocupe, consulta con un profesional
          sanitario.
        </p>

        <h2>8. Legislación aplicable</h2>
        <p>
          Estas condiciones se rigen por la legislación española. Para
          cualquier controversia, las partes se someten a los Juzgados y
          Tribunales del domicilio del usuario consumidor.
        </p>
      </article>
    </Container>
  );
}
