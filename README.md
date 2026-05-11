# Cero Espalda

Blog de salud postural y dolor de espalda. Construido con **Next.js 16 (App Router) + TypeScript + Tailwind v4 + shadcn/ui + MDX**, optimizado para SEO y preparado para activar Google AdSense sin refactor.

---

## Empezar a trabajar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Variables de entorno

Copia `.env.example` a `.env.local` y ajusta cuando llegue el momento:

```
NEXT_PUBLIC_SITE_URL=https://ceroespalda.com
NEXT_PUBLIC_ADSENSE_ENABLED=false
NEXT_PUBLIC_ADSENSE_CLIENT_ID=
```

---

## Crear un artículo

Cada artículo es un archivo `.mdx` en `content/posts/`. El nombre del archivo (sin `.mdx`) es el slug de la URL.

**Plantilla mínima**:

```mdx
---
title: "Título del artículo"
description: "Resumen breve para SEO (140-160 caracteres)."
publishedAt: "2026-05-10"
updatedAt: "2026-05-12"   # opcional
category: "lumbalgia"     # debe existir en data/categories.ts
tags: ["lumbar", "ejercicios"]
author: "Roberto"
cover: "/images/posts/lumbar.jpg"   # opcional
coverAlt: "Texto alternativo descriptivo"
featured: false
draft: false
---

Tu contenido en Markdown / MDX...

## Un H2 con ancla automática

Texto normal.

<Callout type="tip" title="Truco">
Bloque destacado.
</Callout>

<InArticleAd />

Más texto.
```

### Componentes disponibles dentro de MDX

| Componente | Uso |
|---|---|
| `<Callout type="info\|tip\|warning\|danger" title="...">...</Callout>` | Bloques destacados |
| `<MdxImage src="/img.jpg" alt="..." caption="..." />` | Imagen optimizada con `next/image` |
| `<InArticleAd />` | Reserva de hueco para anuncio dentro del artículo |
| `<MedicalDisclaimer />` | Aviso médico (ya se incluye automáticamente al final, solo si quieres uno extra) |

### Borradores

Pon `draft: true` en el frontmatter. El artículo no aparecerá en el blog ni en el sitemap.

---

## Categorías

Definidas en [`data/categories.ts`](data/categories.ts). Para añadir una nueva:

1. Añade un objeto al array `categories` con `slug`, `name`, descripciones cortas/largas y `metaTitle` / `metaDescription`.
2. La página `/categoria/<slug>` se genera automáticamente.

---

## Estructura del proyecto

```
content/posts/         ← artículos en MDX
data/categories.ts     ← catálogo de categorías
src/
  app/
    layout.tsx         ← layout raíz (header + footer + cookies)
    page.tsx           ← home
    blog/              ← /blog, /blog/[slug]
    categoria/         ← /categoria/[slug]
    sobre, contacto, privacidad, aviso-legal, cookies
    feed.xml/route.ts  ← RSS
    sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx
  components/
    ui/                ← primitivas shadcn (button, card, badge, …)
    layout/            ← cabecera, pie, navegación
    blog/              ← tarjetas, TOC, breadcrumbs, related
    mdx/               ← componentes que se usan dentro de MDX
    ads/               ← AdSlot (placeholders preparados)
    consent/           ← banner de cookies (RGPD)
    seo/               ← JSON-LD
  lib/
    site-config.ts     ← constantes globales del sitio
    content/           ← lectura de MDX, frontmatter, categorías
    seo/               ← helpers de metadata y schema.org
    utils.ts           ← cn(), formatDateES(), absoluteUrl()
public/
  ads.txt              ← vacío, listo para AdSense
```

---

## Activar Google AdSense (cuando llegue el momento)

El sitio está preparado. Estos serán los pasos:

1. **Cuando AdSense apruebe el sitio**, copia el `ca-pub-XXXXX` que te da Google.
2. Pon en `.env.local` (y en Vercel):
   ```
   NEXT_PUBLIC_ADSENSE_ENABLED=true
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
   ```
3. Sustituye el contenido de `public/ads.txt` por la línea oficial:
   ```
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
4. Carga el script de AdSense en `src/app/layout.tsx` (usar `next/script` con `strategy="afterInteractive"` y solo si el usuario ha aceptado cookies — el `CookieBanner` ya guarda el consentimiento).
5. Edita `src/components/ads/ad-slot.tsx` para inyectar `<ins class="adsbygoogle">` cuando `siteConfig.adsense.enabled === true`.

Los huecos publicitarios (`<AdSlot variant="..." />`) ya están repartidos por el blog y reservan dimensiones fijas para evitar Cumulative Layout Shift.

---

## SEO

- Metadata por página (Open Graph + Twitter Card + canonical) en `src/lib/seo/metadata.ts`.
- JSON-LD `Article`, `BreadcrumbList`, `WebSite`, `Organization`, `Person`, `CollectionPage` en `src/lib/seo/schema.ts`.
- Sitemap dinámico (`/sitemap.xml`) con todas las páginas, categorías y artículos.
- `robots.txt` (`/robots.txt`) y `manifest.webmanifest` (`/manifest.webmanifest`).
- OG image dinámica por defecto en `src/app/opengraph-image.tsx`.
- RSS en `/feed.xml`.

---

## Scripts

```bash
npm run dev       # servidor de desarrollo (Turbopack)
npm run build     # build de producción
npm start         # servir el build
npm run lint      # ESLint flat config
```

---

## Despliegue

Pensado para Vercel:

```bash
npx vercel        # primer deploy (preview)
npx vercel --prod # deploy a producción
```

No olvides configurar las variables de entorno en el dashboard de Vercel.

---

## Checklist antes de pedir aprobación a AdSense

- [ ] Dominio propio activo (`ceroespalda.com`).
- [ ] HTTPS funcionando.
- [ ] Al menos 15-25 artículos publicados con contenido propio y útil.
- [ ] Política de privacidad, política de cookies y aviso legal completados con tus datos reales.
- [ ] Página /sobre con información sobre el autor.
- [ ] Página /contacto con email visible.
- [ ] Banner de cookies funcionando (Consent Mode v2).
- [ ] Core Web Vitals en verde (`vercel:performance-optimizer` puede ayudar).

---

Hecho con cuidado en España.
