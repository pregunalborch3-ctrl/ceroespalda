import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  getFeaturedPosts,
  getRecentPosts,
} from "@/lib/content/posts";
import { getCategoriesWithCounts } from "@/lib/content/categories";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArticleGrid } from "@/components/blog/article-grid";
import { ArticleCard } from "@/components/blog/article-card";
import { AdSlot } from "@/components/ads/ad-slot";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  const featured = getFeaturedPosts(3);
  const recent = getRecentPosts(6);
  const cats = getCategoriesWithCounts();
  const heroPost = featured[0];
  const sideFeatured = featured.slice(1);

  return (
    <>
      <section className="border-b bg-gradient-to-b from-accent/40 to-background">
        <Container className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
              Salud postural · sin humo
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Cuida tu espalda, sin atajos.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link href="/blog">
                  Leer el blog
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/sobre">Conocer al autor</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {heroPost ? (
        <Container className="py-16">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                Destacado
              </p>
              <ArticleCard post={heroPost} priority />
            </div>
            {sideFeatured.length > 0 ? (
              <div className="flex flex-col gap-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                  También destacados
                </p>
                {sideFeatured.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
            ) : null}
          </div>
        </Container>
      ) : null}

      <Container>
        <AdSlot variant="leaderboard" label="Anuncio principal" />
        <AdSlot variant="mobile-banner" label="Anuncio principal" />
      </Container>

      <Container className="py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Categorías</h2>
            <p className="mt-1 text-muted-foreground">
              Empieza por lo que más te interese.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className="group"
            >
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardContent className="flex h-full flex-col gap-2 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold tracking-tight group-hover:text-primary">
                      {c.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {c.postCount}{" "}
                      {c.postCount === 1 ? "artículo" : "artículos"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {c.shortDescription}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-primary">
                    Explorar
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Últimos artículos
            </h2>
            <p className="mt-1 text-muted-foreground">
              Lo más reciente del blog.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/blog">Ver todos</Link>
          </Button>
        </div>
        <ArticleGrid posts={recent} />
      </Container>
    </>
  );
}
