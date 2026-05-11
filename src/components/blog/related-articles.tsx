import type { PostMeta } from "@/lib/content/types";
import { ArticleCard } from "./article-card";

export function RelatedArticles({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;
  return (
    <section
      aria-labelledby="related-heading"
      className="mt-16 border-t pt-10"
    >
      <h2 id="related-heading" className="text-2xl font-semibold tracking-tight">
        Artículos relacionados
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Otros contenidos que te pueden interesar.
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
