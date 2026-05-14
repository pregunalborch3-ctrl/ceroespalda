import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbsSchema, personSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";
import {
  BookOpen,
  Dumbbell,
  FlaskConical,
  Mail,
  ShoppingBag,
  TriangleAlert,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: `Sobre ${siteConfig.name} — Quién soy y por qué creé este blog`,
  description:
    "Roberto lleva años investigando sobre dolor de espalda después de sufrirlo en primera persona. Aquí te cuento qué es Cero Espalda y cómo puede ayudarte.",
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

      {/* ── Encabezado con avatar ─────────────────────────────────────── */}
      <section className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-12">
        {/* Avatar placeholder — figura humana del logo */}
        <div className="flex-shrink-0">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/20 sm:h-40 sm:w-40">
            <svg
              viewBox="0 0 28 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-auto sm:h-24"
              aria-hidden
            >
              <circle cx="16" cy="5.5" r="5.5" fill="#0d9488" />
              <rect x="13" y="10.5" width="5.5" height="5" rx="2.75" fill="#0d9488" />
              <path
                d="M10 15C7 17 6 21 6 25C6 29 7.5 32 8 35C8.5 37 9 39 9.5 40L20 40C20.5 38.5 21 36 21 34C21 30 22 26 22 22C22 18 21 16 19 15Z"
                fill="#0d9488"
              />
              <path
                d="M16 15C18.5 19 14 24 15.5 29.5C17 35 16 38 15.5 40"
                stroke="#10b981"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="15.5" cy="6" r="1.2" fill="#10b981" opacity="0.85" />
              <circle cx="15" cy="15.5" r="1.2" fill="#10b981" opacity="0.85" />
              <circle cx="15.5" cy="39" r="1.2" fill="#10b981" opacity="0.85" />
            </svg>
          </div>
        </div>

        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Sobre mí
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Hola, soy Roberto
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            No soy médico ni fisioterapeuta. Soy alguien que pasó años con dolor
            de espalda crónico, buscando respuestas en internet sin encontrar
            nada claro en español, y que decidió hacer algo al respecto.
          </p>
        </div>
      </section>

      {/* ── Aviso legal prominente ───────────────────────────────────── */}
      <div className="mt-10 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200">
        <TriangleAlert className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" aria-hidden />
        <p className="text-sm leading-relaxed">
          <strong>Aviso importante:</strong> No soy médico. Todo el contenido de
          este blog es informativo y educativo. No sustituye la consulta, el
          diagnóstico ni el tratamiento de un profesional de la salud. Si tienes
          dolor persistente o intenso, consulta siempre con tu médico o
          fisioterapeuta.
        </p>
      </div>

      {/* ── Mi historia ─────────────────────────────────────────────── */}
      <div className="prose prose-zinc mt-12 max-w-3xl dark:prose-invert prose-headings:tracking-tight prose-a:text-primary">
        <h2>Mi historia con el dolor de espalda</h2>
        <p>
          Todo empezó hace unos años con un dolor sordo en la zona lumbar que
          aparecía a media tarde, después de horas frente al ordenador. Al
          principio lo ignoré. Luego empeoró: me despertaba por la noche,
          limitaba mis actividades y empezó a afectar a mi trabajo y mi estado
          de ánimo.
        </p>
        <p>
          Hice lo que hacemos todos: buscar en Google. Encontré páginas con
          consejos genéricos del tipo &quot;estira más&quot; o
          &quot;compra este colchón&quot;, foros llenos de miedo y
          catastrofismo, y artículos médicos tan técnicos que eran imposibles de
          entender sin un posgrado. No había un lugar claro, honesto y en
          español donde alguien como yo pudiera entender qué le pasaba y qué
          podía hacer al respecto.
        </p>
        <p>
          Eso me llevó a leer mucho: revisiones sistemáticas, guías clínicas de
          fisioterapia, estudios sobre ergonomía en el trabajo, evidencia sobre
          ejercicio y dolor crónico. Y a experimentar: cambié mi silla, mi
          monitor, mis hábitos de movimiento, probé distintos ejercicios. El
          dolor no desapareció de la noche a la mañana, pero mejoró
          significativamente cuando empecé a entender qué lo causaba y qué lo
          aliviaba.
        </p>
        <p>
          <strong>Cero Espalda es lo que me habría gustado encontrar entonces.</strong>{" "}
          Un blog sin humo, sin promesas milagrosas, sin intereses ocultos, que
          explique las cosas como son.
        </p>

        <h2>Qué encontrarás en este blog</h2>
      </div>

      {/* ── Cards de contenido ──────────────────────────────────────── */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3 max-w-3xl">
        {[
          {
            icon: BookOpen,
            title: "Artículos basados en evidencia",
            desc: "Cada artículo parte de fuentes contrastadas: guías clínicas, asociaciones de fisioterapia y revisiones científicas. Siempre con lenguaje claro, sin jerga innecesaria.",
          },
          {
            icon: Dumbbell,
            title: "Guías y ejercicios prácticos",
            desc: "Ejercicios que puedes hacer en casa, sin equipamiento caro, explicados paso a paso. Priorizando los que la evidencia respalda para cada tipo de dolor.",
          },
          {
            icon: ShoppingBag,
            title: "Reviews honestos de productos",
            desc: "Colchones, sillas ergonómicas, cojines lumbares… Los analizo con criterios claros y te digo cuándo tiene sentido gastar dinero y cuándo no.",
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex flex-col gap-3 rounded-xl border bg-card p-5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <h3 className="font-semibold leading-snug">{title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      {/* ── Metodología ─────────────────────────────────────────────── */}
      <div className="prose prose-zinc mt-12 max-w-3xl dark:prose-invert prose-headings:tracking-tight prose-a:text-primary">
        <h2>Cómo trabajo cada artículo</h2>
        <ul>
          <li>
            Investigo partiendo de fuentes primarias: guías clínicas, revisiones
            de Cochrane, publicaciones de sociedades de fisioterapia y
            traumatología.
          </li>
          <li>
            Cuando hay consenso científico claro, lo digo. Cuando hay debate o
            la evidencia es limitada, también lo digo. No invento certezas donde
            no las hay.
          </li>
          <li>
            Los ejercicios que recomiendo los priorizo por su respaldo en la
            literatura científica y porque se pueden hacer en casa sin material
            especial.
          </li>
          <li>
            En las reviews de productos, explico los criterios objetivos que uso
            (firmeza, soporte lumbar, materiales, ergonomía) y dejo claro cuándo
            hay enlaces de afiliación.
          </li>
          <li>
            Si un artículo se queda desfasado por nueva evidencia, lo actualizo
            y lo indico con la fecha de revisión.
          </li>
        </ul>

        <h2>Cómo se sostiene el blog</h2>
        <p>
          {siteConfig.name} se financia con publicidad contextual (Google
          AdSense) y, en algunos artículos sobre productos, con enlaces de
          afiliación. Cuando uso enlaces de afiliación, lo indico explícitamente.
          Mi compromiso es que la publicidad <strong>nunca condiciona el
          contenido</strong>: si algo no me parece una buena opción, lo digo.
        </p>
      </div>

      {/* ── Contacto ────────────────────────────────────────────────── */}
      <div className="mt-12 max-w-3xl rounded-xl border bg-card p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-6 w-6 text-primary" aria-hidden />
          </div>
          <div>
            <h2 className="text-xl font-semibold">¿Tienes alguna pregunta?</h2>
            <p className="mt-2 text-muted-foreground">
              Si tienes dudas, sugerencias, quieres que trate algún tema o
              simplemente quieres contarme tu experiencia con el dolor de
              espalda, escríbeme. Leo todos los mensajes y respondo a la mayoría.
            </p>
            <p className="mt-4 flex items-center gap-2 font-medium text-primary">
              <Mail className="h-4 w-4" aria-hidden />
              <a
                href="mailto:pregunalborch3@gmail.com"
                className="hover:underline"
              >
                pregunalborch3@gmail.com
              </a>
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/contacto">Formulario de contacto</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/blog">Ver todos los artículos</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Disclaimer final ────────────────────────────────────────── */}
      <div className="mt-8 max-w-3xl flex items-start gap-3 rounded-xl border border-border/60 bg-muted/40 p-5">
        <FlaskConical className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" aria-hidden />
        <p className="text-sm leading-relaxed text-muted-foreground">
          <strong>Disclaimer:</strong> Soy un divulgador aficionado apasionado
          por la salud postural, no un profesional sanitario. La información de
          este blog es de carácter general e informativo. No reemplaza la
          valoración individualizada de un médico, fisioterapeuta u otro
          profesional de la salud. Ante cualquier síntoma de alarma —dolor
          irradiado a piernas o brazos, pérdida de fuerza, alteraciones
          urinarias o intestinales asociadas al dolor— acude a urgencias o
          consulta con un especialista sin demora.
        </p>
      </div>
    </Container>
  );
}
