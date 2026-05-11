import type { PostMeta } from "@/lib/content/types";
import { ArticleCard } from "./article-card";

interface ArticleGridProps {
  posts: PostMeta[];
  priorityFirst?: boolean;
}

export function ArticleGrid({ posts, priorityFirst = false }: ArticleGridProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed bg-muted/30 p-10 text-center text-muted-foreground">
        Aún no hay artículos publicados aquí. Vuelve pronto.
      </div>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, idx) => (
        <ArticleCard
          key={post.slug}
          post={post}
          priority={priorityFirst && idx === 0}
        />
      ))}
    </div>
  );
}
