import Link from "next/link";
import { categories } from "../../../data/categories";

export function CategoryPillList({
  activeSlug,
}: {
  activeSlug?: string;
}) {
  return (
    <nav
      aria-label="Categorías"
      className="flex flex-wrap gap-2 [-webkit-overflow-scrolling:touch]"
    >
      <Link
        href="/blog"
        aria-current={!activeSlug ? "page" : undefined}
        className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
          !activeSlug
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
        }`}
      >
        Todos
      </Link>
      {categories.map((c) => {
        const active = c.slug === activeSlug;
        return (
          <Link
            key={c.slug}
            href={`/categoria/${c.slug}`}
            aria-current={active ? "page" : undefined}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
            }`}
          >
            {c.name}
          </Link>
        );
      })}
    </nav>
  );
}
