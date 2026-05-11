import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbsSchema, personSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: `Sobre ${siteConfig.name}`,
  description: `Quién está detrás de ${siteConfig.name}, por qué existe el blog y cómo se elabora cada artículo.`,
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <Container className="py-12">
      <JsonLd
        data={[
          personSchema(),
          breadcrumbsSchema([
            { name: "Inicio", url: "/" },
            { name: "Sobre", url: "/sobre" },
          ]),
        ]}
      />

      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Sobre", href: "/sobre", current: true },
        ]}
      />

      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Sobre
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Hola, soy {siteConfig.author.name}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {siteConfig.name} nace de una idea sencilla: la mayoría de problemas
          de espalda se previenen, se reducen o se conviven mejor cuando uno
          entiende qué está pasando y cambia algunas rutinas. Este blog reúne
          lo que aprendo, leo y pruebo, contado en lenguaje claro y sin
          atajos.
        </p>
      </header>

      <div className="prose prose-zinc mt-10 max-w-3xl prose-headings:tracking-tight">
        <h2>Por qué existe este blog</h2>
        <p>
          Pasé años acumulando malas posturas frente al ordenador, sillas
          terribles, mochilas mal cargadas y muchas horas sentado. Cuando
          empezó a doler, hice lo que hace casi todo el mundo: buscar en
          internet. La mayoría de lo que encontré era humo, publirreportajes o
          consejos contradictorios. {siteConfig.name} es lo que me habría
          gustado encontrar entonces: artículos honestos, sin promesas
          milagrosas, con referencias cuando las hay y con la humildad de
          decir &quot;esto depende&quot; cuando hace falta.
        </p>

        <h2>Cómo elaboro los artículos</h2>
        <ul>
          <li>
            Investigo cada tema partiendo de fuentes públicas (guías clínicas,
            asociaciones de fisioterapia, revisiones científicas
            recientes).
          </li>
          <li>
            Cuando recomiendo ejercicios, priorizo los que están avalados por
            profesionales y que se pueden hacer en casa, sin material caro.
          </li>
          <li>
            Cuando reviso productos (colchones, sillas, cojines), explico mis
            criterios y cuándo tiene sentido —y cuándo no— gastar dinero.
          </li>
          <li>
            Si un artículo se queda desfasado, lo actualizo y dejo constancia
            de la fecha de revisión.
          </li>
        </ul>

        <h2>Lo que NO soy</h2>
        <p>
          <strong>No soy médico ni fisioterapeuta.</strong> Soy un divulgador
          que escribe sobre lo que afecta a millones de personas. Los
          artículos del blog tienen carácter informativo y educativo. No
          sustituyen el diagnóstico ni el consejo personalizado de un
          profesional sanitario. Si tienes dolor persistente, intenso o
          acompañado de otros síntomas, consulta con tu médico o
          fisioterapeuta.
        </p>

        <h2>Cómo se sostiene el blog</h2>
        <p>
          {siteConfig.name} se mantendrá en el futuro con publicidad
          contextual (Google AdSense) y, en algunos artículos de productos,
          enlaces de afiliación. Cuando sea el caso, lo verás indicado de
          forma clara. Mi compromiso es que la publicidad nunca condicione el
          contenido: si reseño algo, lo digo tal y como lo veo.
        </p>

        <h2>Hablemos</h2>
        <p>
          ¿Tienes dudas, sugerencias o un tema que te gustaría que trate?
          Escríbeme desde la{" "}
          <Link href="/contacto">página de contacto</Link>. Leo todos los
          mensajes.
        </p>
      </div>

      <Card className="mt-12 max-w-3xl border-primary/20 bg-accent/30">
        <CardContent className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">¿Empezamos por algo?</h2>
            <p className="text-sm text-muted-foreground">
              Echa un vistazo al blog o ponte en contacto.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/contacto">Contacto</Link>
            </Button>
            <Button asChild>
              <Link href="/blog">Ir al blog</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
