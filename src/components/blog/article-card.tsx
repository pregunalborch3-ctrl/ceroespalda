import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/content/types";
import { Badge } from "@/components/ui/badge";
import { formatDateES } from "@/lib/utils";
import { getCategory } from "../../../data/categories";

interface ArticleCardProps {
  post: PostMeta;
  priority?: boolean;
}

export function ArticleCard({ post, priority = false }: ArticleCardProps) {
  const cat = getCategory(post.category);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md">
      {/* Imagen — sin Link propio; el overlay del título cubre toda la tarjeta */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.coverAlt ?? post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-accent to-secondary"
            aria-hidden
          >
            <span className="text-3xl font-bold text-primary/40">
              {post.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          {cat ? (
            /* relative z-10 para quedar por encima del overlay */
            <Link href={`/categoria/${cat.slug}`} className="relative z-10">
              <Badge variant="secondary">{cat.name}</Badge>
            </Link>
          ) : null}
          <span className="text-xs text-muted-foreground">
            {formatDateES(post.publishedAt)}
          </span>
        </div>

        <h3 className="text-lg font-semibold leading-snug tracking-tight">
          {/* after:absolute after:inset-0 crea el overlay clickable sobre toda la tarjeta */}
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 hover:text-primary"
          >
            {post.title}
          </Link>
        </h3>

        <p className="line-clamp-3 text-sm text-muted-foreground">
          {post.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <span>{post.readingTimeMinutes} min</span>
          <span className="inline-flex items-center gap-1 font-medium text-primary" aria-hidden>
            Leer
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
