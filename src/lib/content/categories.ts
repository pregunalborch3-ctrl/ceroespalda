import "server-only";

import { cache } from "react";
import {
  categories,
  getCategory as getCategoryDef,
  type CategoryDefinition,
} from "../../../data/categories";
import { getAllPosts } from "./posts";

export const getAllCategories = cache((): CategoryDefinition[] => categories);

export const getCategoryWithCount = cache(
  (slug: string): (CategoryDefinition & { postCount: number }) | undefined => {
    const def = getCategoryDef(slug);
    if (!def) return undefined;
    const postCount = getAllPosts().filter((p) => p.category === slug).length;
    return { ...def, postCount };
  },
);

export const getCategoriesWithCounts = cache(() => {
  const posts = getAllPosts();
  return categories.map((c) => ({
    ...c,
    postCount: posts.filter((p) => p.category === c.slug).length,
  }));
});

export { getCategoryDef as getCategory };
