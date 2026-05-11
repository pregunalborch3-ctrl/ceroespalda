import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ArticleGrid } from "@/components/blog/article-grid";
import { CategoryPillList } from "@/components/blog/category-pill-list";
import { AdSlot } from "@/components/ads/ad-slot";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllPosts } from "@/lib/content/posts";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbsSchema,
  collectionPageSchema,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Todos los artículos de Cero Espalda: lumbalgia, cervicales, ergonomía, postura, ejercicios y reviews honestas de productos para la espalda.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <Container className="py-12">
      <JsonLd
        data={[
          collectionPageSchema({
            title: `Blog · ${siteConfig.name}`,
            description: "Todos los artículos de Cero Espalda",
            url: "/blog",
          }),
          breadcrumbsSchema([
            { name: "Inicio", url: "/" },
            { name: "Blog", url: "/blog" },
          ]),
        ]}
      />

      <header className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Blog
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Artículos sobre tu espalda
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Guías prácticas y basadas en evidencia. Filtra por categoría o explora
          todo lo publicado.
        </p>
      </header>

      <div className="mb-10">
        <CategoryPillList />
      </div>

      <AdSlot variant="leaderboard" />

      <ArticleGrid posts={posts} priorityFirst />
    </Container>
  );
}
