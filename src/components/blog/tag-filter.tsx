"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface TagFilterProps {
  tags: string[];
  activeTag: string | null;
}

export function TagFilter({ tags, activeTag }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (tags.length === 0) return null;

  function handleTag(tag: string) {
    const params = new URLSearchParams(searchParams.toString());
    // Limpiar paginación al cambiar tag
    params.delete("page");

    if (activeTag === tag) {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }

    const query = params.toString();
    router.push(query ? `?${query}` : "?");
  }

  function handleAll() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tag");
    params.delete("page");
    const query = params.toString();
    router.push(query ? `?${query}` : "?");
  }

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="group"
      aria-label="Filtrar por etiqueta"
    >
      <button
        onClick={handleAll}
        className={cn(
          "rounded-full px-3.5 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          activeTag === null
            ? "bg-primary text-primary-foreground"
            : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
        aria-pressed={activeTag === null}
      >
        Todos
      </button>

      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTag(tag)}
          className={cn(
            "rounded-full px-3.5 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            activeTag === tag
              ? "bg-primary text-primary-foreground"
              : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
          aria-pressed={activeTag === tag}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
