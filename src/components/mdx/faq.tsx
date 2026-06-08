"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="mt-10 mb-6">
        <h2 className="text-2xl font-bold mb-6">Preguntas frecuentes</h2>
        <div className="divide-y divide-border border rounded-lg overflow-hidden">
          {items.map((item, i) => (
            <div key={i} className="bg-card">
              <button
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-medium text-base leading-snug">
                  {item.question}
                </span>
                <span
                  className="flex-shrink-0 text-muted-foreground transition-transform duration-200"
                  style={{ transform: open === i ? "rotate(180deg)" : "none" }}
                  aria-hidden
                >
                  ▾
                </span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 pt-1 text-muted-foreground text-sm leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
