"use client";

import { useEffect, useRef, useState } from "react";
import type { TocEntry } from "@/lib/content/mdx";
import { cn } from "@/lib/utils";

export function ArticleToc({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (entries.length === 0) return;

    const headingIds = entries.map((e) => e.id);

    // Keep track of which headings are currently intersecting
    const intersecting = new Set<string>();

    observerRef.current = new IntersectionObserver(
      (observerEntries) => {
        for (const entry of observerEntries) {
          if (entry.isIntersecting) {
            intersecting.add(entry.target.id);
          } else {
            intersecting.delete(entry.target.id);
          }
        }

        // Pick the topmost intersecting heading (first in document order)
        const active = headingIds.find((id) => intersecting.has(id));
        if (active !== undefined) {
          setActiveId(active);
        }
      },
      {
        rootMargin: "0px 0px -60% 0px",
        threshold: 0,
      }
    );

    const observer = observerRef.current;

    for (const id of headingIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, [entries]);

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
              className={cn(
                "underline-offset-4 hover:text-primary hover:underline",
                activeId === entry.id
                  ? "font-medium text-primary"
                  : "text-foreground/80"
              )}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
