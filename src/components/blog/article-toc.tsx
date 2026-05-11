import type { TocEntry } from "@/lib/content/mdx";
import { cn } from "@/lib/utils";

export function ArticleToc({ entries }: { entries: TocEntry[] }) {
  if (entries.length === 0) return null;
  return (
    <nav
      aria-label="Tabla de contenidos"
      className="rounded-lg border bg-muted/30 p-4 text-sm"
    >
      <p className="mb-2 font-semibold">En este artículo</p>
      <ol className="space-y-1.5">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className={cn(entry.level === 3 && "pl-4 text-muted-foreground")}
          >
            <a
              href={`#${entry.id}`}
              className="text-foreground/80 underline-offset-4 hover:text-primary hover:underline"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
