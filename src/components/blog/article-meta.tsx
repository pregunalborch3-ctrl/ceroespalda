import { Clock, Calendar } from "lucide-react";
import { formatDateES } from "@/lib/utils";

interface ArticleMetaProps {
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  author?: string;
}

export function ArticleMeta({
  publishedAt,
  updatedAt,
  readingTimeMinutes,
  author,
}: ArticleMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
      {author ? (
        <span>
          Por <span className="font-medium text-foreground">{author}</span>
        </span>
      ) : null}
      <span className="inline-flex items-center gap-1.5">
        <Calendar className="h-4 w-4" aria-hidden />
        <time dateTime={publishedAt}>{formatDateES(publishedAt)}</time>
        {updatedAt && updatedAt !== publishedAt ? (
          <>
            <span aria-hidden>·</span>
            <span>actualizado {formatDateES(updatedAt)}</span>
          </>
        ) : null}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-4 w-4" aria-hidden />
        {readingTimeMinutes} min de lectura
      </span>
    </div>
  );
}
