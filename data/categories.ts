export interface CategoryDefinition {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
}

export const categories: CategoryDefinition[] = [
  {
    slug: "lumbalgia",
    name: "Lumbalgia",
    shortDescription: "Dolor en la zona baja de la espalda.",
    description:
      "Todo lo que necesitas saber sobre el dolor lumbar: causas, prevención, ejercicios suaves y hábitos diarios que marcan la diferencia.",
    metaTitle: "Lumbalgia: causas, ejercicios y prevención del dolor lumbar",
    metaDescription:
      "Guías sobre lumbalgia: cómo aliviar el dolor lumbar, ejercicios seguros, errores frecuentes y rutinas para mantener una espalda fuerte.",
  },
  {
    slug: "cervicales",
    name: "Cervicales",
    shortDescription: "Dolor de cuello y trapecio.",
    description:
      "Estrategias para aliviar la tensión cervical, mejorar la movilidad del cuello y reducir las molestias del trapecio en el día a día.",
    metaTitle: "Cervicales: aliviar el dolor de cuello y trapecio",
    metaDescription:
      "Ejercicios, estiramientos y consejos para reducir la tensión cervical, el dolor de cuello y la rigidez del trapecio.",
  },
  {
    slug: "ejercicios",
    name: "Ejercicios",
    shortDescription: "Rutinas y estiramientos para la espalda.",
    description:
      "Rutinas guiadas, estiramientos y ejercicios funcionales pensados para fortalecer la espalda y prevenir molestias futuras.",
    metaTitle: "Ejercicios para la espalda: rutinas, estiramientos y guías",
    metaDescription:
      "Ejercicios y rutinas paso a paso para fortalecer la espalda, ganar movilidad y prevenir el dolor postural.",
  },
  {
    slug: "postura",
    name: "Postura",
    shortDescription: "Corregir y mantener una buena postura.",
    description:
      "Cómo identificar malas posturas, corregirlas y construir hábitos para mantener la espalda alineada en cualquier actividad.",
    metaTitle: "Postura corporal: cómo corregir y mantener una buena postura",
    metaDescription:
      "Aprende a evaluar tu postura, corregir desalineaciones comunes y mantener una espalda sana con hábitos sostenibles.",
  },
  {
    slug: "ergonomia",
    name: "Ergonomía",
    shortDescription: "Oficina, teletrabajo, sillas y escritorios.",
    description:
      "Ergonomía aplicada: cómo configurar tu puesto de trabajo, elegir sillas y escritorios y proteger la espalda en el teletrabajo.",
    metaTitle: "Ergonomía en oficina y teletrabajo: guía práctica",
    metaDescription:
      "Cómo organizar tu puesto de trabajo en casa o la oficina: silla, escritorio, monitor y hábitos para no cargar la espalda.",
  },
  {
    slug: "productos",
    name: "Productos",
    shortDescription: "Reviews y comparativas: colchones, sillas, gadgets.",
    description:
      "Análisis honestos y comparativas de productos para la espalda: colchones, sillas, cojines lumbares y gadgets útiles.",
    metaTitle: "Productos para la espalda: reviews y comparativas",
    metaDescription:
      "Reviews y comparativas detalladas de colchones, sillas ergonómicas, cojines lumbares y otros productos para cuidar la espalda.",
  },
];

export const categoryMap = new Map(categories.map((c) => [c.slug, c]));

export function getCategory(slug: string): CategoryDefinition | undefined {
  return categoryMap.get(slug);
}

export function getCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}
