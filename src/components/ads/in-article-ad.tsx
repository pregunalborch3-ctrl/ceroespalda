import { AdSlot } from "./ad-slot";

export function InArticleAd({ label }: { label?: string }) {
  return (
    <div className="not-prose my-10">
      <AdSlot variant="in-article" label={label ?? "Anuncio dentro del artículo"} />
    </div>
  );
}
