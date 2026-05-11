import { siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/utils";
import type { PostMeta } from "@/lib/content/types";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.organization.logo),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: siteConfig.locale,
    publisher: { "@id": `${siteConfig.url}#organization` },
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/sobre#person`,
    name: siteConfig.author.name,
    url: absoluteUrl(siteConfig.author.url),
  };
}

export function articleSchema(post: PostMeta) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    inLanguage: siteConfig.locale,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
      url: absoluteUrl("/sobre"),
    },
    publisher: { "@id": `${siteConfig.url}#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: post.cover ? absoluteUrl(post.cover) : absoluteUrl(siteConfig.ogImage),
    keywords: post.tags.join(", "),
    articleSection: post.category,
    wordCount: post.wordCount,
  };
}

export function breadcrumbsSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function collectionPageSchema(args: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: args.title,
    description: args.description,
    url: absoluteUrl(args.url),
    inLanguage: siteConfig.locale,
    isPartOf: { "@id": `${siteConfig.url}#website` },
  };
}
