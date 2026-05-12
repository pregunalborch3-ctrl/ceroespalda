// Descarga portadas de Unsplash para cada artículo en content/posts/
// y actualiza el frontmatter con el campo `cover`.
//
// Uso: UNSPLASH_ACCESS_KEY=xxx node scripts/fetch-unsplash-covers.mjs
//
// Respeta los términos de Unsplash: dispara el endpoint /download_location
// tras cada descarga (telemetría requerida por la API).

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "content", "posts");
const IMAGES_DIR = path.join(ROOT, "public", "images", "posts");

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!ACCESS_KEY) {
  console.error("Falta la variable de entorno UNSPLASH_ACCESS_KEY.");
  process.exit(1);
}

// Mapeo slug -> query en inglés (Unsplash funciona mucho mejor en inglés).
const SLUG_QUERIES = {
  "aliviar-dolor-lumbar-en-casa": "lower back pain relief home",
  "postura-correcta-frente-al-ordenador": "ergonomic desk posture computer",
  "estiramientos-cervicales-oficina": "neck stretch office worker",
  "silla-ergonomica-merece-pena": "ergonomic office chair home",
  "por-que-duele-espalda-baja-manana": "morning back pain bed",
  "ejercicios-lumbalgia-casa": "home workout yoga mat back",
  "dolor-cuello-trapecio-movil": "neck pain smartphone phone",
  "como-sentarse-correctamente-ordenador": "ergonomic workspace desk",
  "estiramientos-espalda-antes-dormir": "stretching bedroom evening relax",
  "hernia-discal-lumbar-sintomas-tratamiento": "spine anatomy back model",
  "mejor-silla-ergonomica-dolor-espalda": "modern ergonomic office chair",
  "cervicalgia-que-es-tratamiento-casa": "neck pain woman tension",
  "mejor-colchon-dolor-espalda": "comfortable mattress bedroom",
  "contractura-muscular-espalda": "back muscle pain massage",
  "dolor-espalda-estres": "stressed office worker laptop",
  "escoliosis-adultos-ejercicios-tratamiento": "yoga spine back exercise",
  "mejor-cojin-lumbar-silla-oficina": "office chair home setup",
  "dolor-espalda-al-despertar-colchon": "morning wake up bed",
  "postura-correcta-al-caminar": "walking park person outdoor",
};

function readFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  return { fm: match[1], fmFull: match[0] };
}

function hasCover(fm) {
  return /^cover:\s*\S/m.test(fm);
}

function injectCover(raw, coverPath) {
  const parsed = readFrontmatter(raw);
  if (!parsed) throw new Error("Frontmatter no encontrado");
  const { fm, fmFull } = parsed;

  const coverLine = `cover: "${coverPath}"`;
  let newFm;

  if (/^cover:/m.test(fm)) {
    newFm = fm.replace(/^cover:.*$/m, coverLine);
  } else if (/^coverAlt:/m.test(fm)) {
    // Insertar la línea cover antes de coverAlt
    newFm = fm.replace(/^coverAlt:/m, `${coverLine}\ncoverAlt:`);
  } else {
    newFm = fm + "\n" + coverLine;
  }

  return raw.replace(fmFull, `---\n${newFm}\n---`);
}

async function searchUnsplash(query) {
  const url =
    "https://api.unsplash.com/search/photos" +
    `?query=${encodeURIComponent(query)}` +
    "&per_page=5&orientation=landscape&content_filter=high";

  const res = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
      "Accept-Version": "v1",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Unsplash search ${res.status}: ${text}`);
  }

  const data = await res.json();
  if (!data.results || data.results.length === 0) return null;
  return data.results[0];
}

async function triggerDownload(downloadLocation) {
  // Requerido por los términos de la API de Unsplash
  try {
    await fetch(downloadLocation, {
      headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
    });
  } catch (err) {
    console.warn("  ⚠ No se pudo notificar la descarga:", err.message);
  }
}

async function downloadImage(url, targetPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Descarga ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(targetPath, buf);
}

async function processPost(filename) {
  const slug = filename.replace(/\.mdx$/, "");
  const filepath = path.join(POSTS_DIR, filename);
  const raw = await fs.readFile(filepath, "utf8");
  const parsed = readFrontmatter(raw);

  if (!parsed) {
    console.warn(`⚠  ${filename}: sin frontmatter, saltando`);
    return null;
  }

  if (hasCover(parsed.fm)) {
    console.log(`⏭  ${slug} ya tiene cover, saltando`);
    return null;
  }

  const query =
    SLUG_QUERIES[slug] ||
    `back pain ${slug.replace(/-/g, " ")}`;

  console.log(`🔍 ${slug} -> "${query}"`);

  const photo = await searchUnsplash(query);
  if (!photo) {
    console.warn(`⚠  Sin resultados para ${slug}`);
    return null;
  }

  const imgPath = path.join(IMAGES_DIR, `${slug}.jpg`);
  await downloadImage(photo.urls.regular, imgPath);
  await triggerDownload(photo.links.download_location);
  console.log(`   ✅ ${slug}.jpg descargada (por ${photo.user.name})`);

  const newContent = injectCover(raw, `/images/posts/${slug}.jpg`);
  await fs.writeFile(filepath, newContent, "utf8");
  console.log(`   ✏  frontmatter actualizado`);

  return {
    slug,
    photographer: photo.user.name,
    photographerUrl: photo.user.links.html,
    photoUrl: photo.links.html,
  };
}

async function main() {
  await fs.mkdir(IMAGES_DIR, { recursive: true });

  const files = (await fs.readdir(POSTS_DIR))
    .filter((f) => f.endsWith(".mdx"))
    .sort();

  console.log(`📚 ${files.length} artículos encontrados\n`);

  const credits = [];
  for (const file of files) {
    try {
      const result = await processPost(file);
      if (result) credits.push(result);
      // Margen entre peticiones: 50/hora = 1 cada 72s. Vamos relajados con 1.2s.
      await new Promise((r) => setTimeout(r, 1200));
    } catch (err) {
      console.error(`❌ Error en ${file}:`, err.message);
    }
  }

  console.log(`\n✨ Completado. ${credits.length} imágenes nuevas.\n`);
  if (credits.length > 0) {
    console.log("📸 Créditos Unsplash:");
    credits.forEach((c) => {
      console.log(`  - ${c.slug}: ${c.photographer} (${c.photoUrl})`);
    });
  }
}

main().catch((err) => {
  console.error("Error fatal:", err);
  process.exit(1);
});
