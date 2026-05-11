import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { ArticleGrid } from "@/components/blog/article-grid";
import { CategoryPillList } from "@/components/blog/category-pill-list";
import { AdSlot } from "@/components/ads/ad-slot";
import { JsonLd } from "@/components/seo/json-ld";

import { getPostsByCategory } from "@/lib/content/posts";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbsSchema,
  collectionPageSchema,
} from "@/lib/seo/schema";
import {
  categories,
  getCategory,
  getCategorySlugs,
} from "../../../../data/categories";

export const dynamicParams = false;

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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  const cat = getCategory(categoria);
  if (!cat) notFound();
  const posts = getPostsByCategory(categoria);

  return (
    <Container className="py-12">
      <JsonLd
        data={[
          collectionPageSchema({
            title: cat.metaTitle,
            description: cat.metaDescription,
            url: `/categoria/${cat.slug}`,
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

      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Categoría
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          {cat.name}
        </h1>
        <p className="mt-3 text-muted-foreground">{cat.description}</p>
      </header>

      <div className="my-10">
        <CategoryPillList activeSlug={cat.slug} />
      </div>

      <AdSlot variant="leaderboard" />

      <ArticleGrid posts={posts} priorityFirst />

      {/* fallback for unused import warning if there are no related categories rendered */}
      {categories.length === 0 ? null : null}
    </Container>
  );
}
