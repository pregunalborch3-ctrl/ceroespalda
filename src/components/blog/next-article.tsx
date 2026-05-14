import Link from "next/link";
import type { PostMeta } from "@/lib/content/types";
import { getCategory } from "@/../data/categories";

interface NextArticleProps {
  nextPost: PostMeta | null;
}

export function NextArticle({ nextPost }: NextArticleProps) {
  if (!nextPost) return null;

  const cat = getCategory(nextPost.category);

  return (
    <div className="mt-10">
      <div className="relative rounded-xl border bg-muted/30 p-6 transition-colors hover:bg-muted/50">
        <Link
          href={`/blog/${nextPost.slug}`}
          className="absolute inset-0 rounded-xl"
          aria-label={`Leer: ${nextPost.title}`}
        />
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Siguiente en {cat?.name ?? nextPost.category}
        </p>
        <div className="flex items-start justify-between gap-4">
          <p className="text-base font-semibold leading-snug text-foreground">
            {nextPost.title}
          </p>
          <span
            className="mt-0.5 shrink-0 text-xl text-primary"
            aria-hidden="true"
          >
            →
          </span>
        </div>
        {nextPost.description ? (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {nextPost.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
