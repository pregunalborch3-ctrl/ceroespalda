import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Tag } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { ArticleCard } from "@/components/blog/article-card";
import { TagFilter } from "@/components/blog/tag-filter";
import { AdSlot } from "@/components/ads/ad-slot";
import { JsonLd } from "@/components/seo/json-ld";

import {
  getPostsByCategory,
  getPostsByCategoryAndTag,
  getTagsByCategory,
} from "@/lib/content/posts";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbsSchema, collectionPageSchema } from "@/lib/seo/schema";
import { formatDateES, cn } from "@/lib/utils";
import { getCategorySlugs, getCategory } from "../../../../data/categories";
import type { PostMeta } from "@/lib/content/types";

export const dynamicParams = false;

const PAGE_SIZE = 12;

export function generateStaticParams() {
  return getCategorySlugs().map((categoria) => ({ categoria }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const cat = getCategory(categoria);
  if (!cat) return {};
  return buildMetadata({
    title: cat.metaTitle,
    description: cat.metaDescription,
    path: `/categoria/${cat.slug}`,
  });
}

// Card grande para el artículo destacado
function FeaturedCard({ post }: { post: PostMeta }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        {/* Imagen */}
        <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-muted md:aspect-auto md:w-2/5">
          {post.cover ? (
            <Image
              src={post.cover}
              alt={post.coverAlt ?? post.title}
              fill
              priority
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className="flex h-full min-h-52 w-full items-center justify-center bg-gradient-to-br from-primary/20 via-accent to-secondary"
              aria-hidden
            >
              <span className="text-6xl font-bold text-primary/30">
                {post.title.charAt(0)}
              </span>
            </div>
          )}
          {/* Badge "Destacado" */}
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            Destacado
          </span>
        </div>

        {/* Contenido */}
        <div className="flex flex-1 flex-col justify-between gap-4 p-6 md:p-8">
          <div className="flex flex-col gap-3">
            <p className="text-xs text-muted-foreground">
              {formatDateES(post.publishedAt)} &middot; {post.readingTimeMinutes} min de lectura
            </p>
            <h2 className="text-2xl font-bold leading-snug tracking-tight md:text-3xl">
              <Link
                href={`/blog/${post.slug}`}
                className="after:absolute after:inset-0 hover:text-primary"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-muted-foreground md:text-base">
              {post.description}
            </p>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary" aria-hidden>
            Leer artículo
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  );
}

// Paginación con searchParams
function Pagination({
  currentPage,
  totalPages,
  baseHref,
}: {
  currentPage: number;
  totalPages: number;
  baseHref: string;
}) {
  if (totalPages <= 1) return null;

  function pageHref(page: number) {
    const url = new URL(baseHref, "https://x.com");
    if (page > 1) url.searchParams.set("page", String(page));
    else url.searchParams.delete("page");
    const qs = url.searchParams.toString();
    return qs ? `?${qs}` : "?";
  }

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-3"
      aria-label="Paginación"
    >
      {currentPage > 1 ? (
        <Link
          href={pageHref(currentPage - 1)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
            "hover:bg-muted",
          )}
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium opacity-40 cursor-not-allowed">
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </span>
      )}

      <span className="text-sm text-muted-foreground">
        Página {currentPage} de {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={pageHref(currentPage + 1)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
            "hover:bg-muted",
          )}
        >
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium opacity-40 cursor-not-allowed">
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ categoria: string }>;
  searchParams: Promise<{ tag?: string; page?: string }>;
}) {
  const { categoria } = await params;
  const { tag, page: pageParam } = await searchParams;

  const cat = getCategory(categoria);
  if (!cat) notFound();

  // Todos los posts de la categoría (para el featured y el schema)
  const allCategoryPosts = getPostsByCategory(categoria);

  // Tags disponibles
  const tags = getTagsByCategory(categoria);

  // Posts filtrados por tag (o todos)
  const activeTag = tag ?? null;
  const filteredPosts = getPostsByCategoryAndTag(categoria, activeTag);

  // Artículo destacado: el primero con featured=true, o el más reciente si no hay
  const featuredPost: PostMeta | null =
    allCategoryPosts.find((p) => p.featured) ?? allCategoryPosts[0] ?? null;

  // Excluir el featured del grid solo cuando no hay filtro activo (mostramos todos al filtrar)
  const gridPosts =
    featuredPost && !activeTag
      ? filteredPosts.filter((p) => p.slug !== featuredPost.slug)
      : filteredPosts;

  // Paginación
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const totalPages = Math.ceil(gridPosts.length / PAGE_SIZE);
  const paginatedPosts = gridPosts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // baseHref para la paginación (mantiene el tag activo si existe)
  const baseHref = activeTag ? `?tag=${encodeURIComponent(activeTag)}` : "?";

  // Datos para el schema
  const schemaPosts = allCategoryPosts.map((p) => ({
    title: p.title,
    url: `/blog/${p.slug}`,
    datePublished: p.publishedAt,
  }));

  return (
    <Container className="py-12">
      <JsonLd
        data={[
          collectionPageSchema({
            title: cat.metaTitle,
            description: cat.metaDescription,
            url: `/categoria/${cat.slug}`,
            posts: schemaPosts,
          }),
          breadcrumbsSchema([
            { name: "Inicio", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: cat.name, url: `/categoria/${cat.slug}` },
          ]),
        ]}
      />

      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: cat.name, href: `/categoria/${cat.slug}`, current: true },
        ]}
      />

      {/* Hero de categoría */}
      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Categoría
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          {cat.name}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{cat.description}</p>
        <p className="mt-3 text-sm font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            {allCategoryPosts.length}{" "}
            {allCategoryPosts.length === 1 ? "artículo" : "artículos"}
          </span>
        </p>
      </header>

      {/* Artículo destacado — solo cuando no hay filtro de tag activo */}
      {featuredPost && !activeTag && (
        <section className="mt-10" aria-label="Artículo destacado">
          <FeaturedCard post={featuredPost} />
        </section>
      )}

      <AdSlot variant="leaderboard" />

      {/* Filtro de tags */}
      {tags.length > 0 && (
        <section className="mt-8" aria-label="Filtrar por etiqueta">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Tag className="h-4 w-4" />
            Filtrar por etiqueta
          </div>
          <Suspense fallback={null}>
            <TagFilter tags={tags} activeTag={activeTag} />
          </Suspense>
        </section>
      )}

      {/* Grid de artículos */}
      <section className="mt-10" aria-label="Artículos">
        {paginatedPosts.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.map((post, i) => (
                <ArticleCard
                  key={post.slug}
                  post={post}
                  priority={i < 3 && currentPage === 1}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseHref={baseHref}
            />
          </>
        ) : (
          <div className="rounded-xl border border-dashed py-16 text-center">
            <p className="text-muted-foreground">
              No hay artículos con la etiqueta seleccionada.
            </p>
            <Link
              href={`/categoria/${cat.slug}`}
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              Ver todos los artículos
            </Link>
          </div>
        )}
      </section>
    </Container>
  );
}
