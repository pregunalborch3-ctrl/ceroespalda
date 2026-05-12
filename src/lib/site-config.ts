export const siteConfig = {
  name: "Cero Espalda",
  shortName: "Cero Espalda",
  description:
    "Guías prácticas y basadas en evidencia sobre salud postural, dolor de espalda, ergonomía y ejercicios para vivir sin molestias.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ||
    "https://ceroespalda.com",
  locale: "es-ES",
  language: "es",
  ogImage: "/og-default.png",
  defaultCover: "/og-default.png",
  postsPerPage: 9,

  author: {
    name: "Roberto",
    url: "/sobre",
    bio: "Editor de Cero Espalda.",
  },

  organization: {
    name: "Cero Espalda",
    logo: "/icon.png",
  },

  nav: [
    { label: "Inicio", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Sobre", href: "/sobre" },
    { label: "Contacto", href: "/contacto" },
  ],

  footerNav: {
    contenido: [
      { label: "Blog", href: "/blog" },
      { label: "Sobre", href: "/sobre" },
      { label: "Contacto", href: "/contacto" },
    ],
    legal: [
      { label: "Aviso legal", href: "/aviso-legal" },
      { label: "Política de privacidad", href: "/privacidad" },
      { label: "Política de cookies", href: "/cookies" },
    ],
  },

  social: {
    twitter: "",
    instagram: "",
    youtube: "",
  },

  adsense: {
    enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true",
    clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
