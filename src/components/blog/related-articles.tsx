import type { PostMeta } from "@/lib/content/types";
import { ArticleCard } from "./article-card";

interface RelatedArticlesProps {
  posts: PostMeta[];
  currentCategory?: string;
}

export function RelatedArticles({ posts, currentCategory }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  const count = posts.length;
  const heading = `${count} ${count === 1 ? "artículo relacionado" : "artículos relacionados"}`;

  const allSameCategory =
    currentCategory !== undefined &&
    posts.every((p) => p.category === currentCategory);

  const subtitle = allSameCategory
    ? `Más artículos sobre ${currentCategory}`
    : "Otros contenidos que te pueden interesar";

  return (
    <section
      aria-labelledby="related-heading"
      className="mt-16 border-t pt-10"
    >
      <h2 id="related-heading" className="text-2xl font-semibold tracking-tight">
        {heading}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
