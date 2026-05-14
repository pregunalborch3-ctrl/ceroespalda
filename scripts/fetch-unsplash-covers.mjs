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
  // Batch original (19 artículos)
  "aliviar-dolor-lumbar-en-casa": "lower back pain relief home",
  "postura-correcta-frente-al-ordenador": "ergonomic desk posture computer",
  "estiramientos-cervicales-oficina": "neck stretch office worker",
  "silla-ergonomica-merece-pena": "ergonomic office chair home",
  "por-que-duele-espalda-baja-manana": "morning back pain bed",
  "ejercicios-lumbalgia-casa": "home workout yoga mat back",
  "dolor-cuello-trapecio-movil": "neck pain smartphone phone",
  "como-sentarse-correctamente-ordenador": "ergonomic workspace desk",
  "estiramientos-espalda-antes-dormir": "stretching bedroom evening relax",
  "hernia-discal-lumbar-sintomas-tratamiento": "back pain physiotherapy treatment",
  "mejor-silla-ergonomica-dolor-espalda": "modern ergonomic office chair",
  "cervicalgia-que-es-tratamiento-casa": "neck pain woman tension",
  "mejor-colchon-dolor-espalda": "comfortable mattress bedroom",
  "contractura-muscular-espalda": "back muscle pain massage",
  "dolor-espalda-estres": "stressed office worker laptop",
  "escoliosis-adultos-ejercicios-tratamiento": "yoga spine back exercise",
  "mejor-cojin-lumbar-silla-oficina": "office chair home setup",
  "dolor-espalda-al-despertar-colchon": "morning wake up bed",
  "postura-correcta-al-caminar": "walking park person outdoor",

  // Batch 40 artículos nuevos
  "movilidad-toracica-ejercicios": "thoracic spine mobility exercise",
  "pilates-para-la-espalda": "pilates exercise core workout",
  "yoga-para-la-espalda": "yoga back stretch woman mat",
  "natacion-espalda-beneficios": "swimming pool backstroke water",
  "dolor-espalda-embarazo": "pregnancy back pain woman",
  "lumbalgia-cronica-tratamiento": "chronic back pain physiotherapy",
  "estenosis-espinal-lumbar": "spine doctor consultation elderly",
  "espondiloartrosis-lumbar": "spine anatomy lumbar vertebrae",
  "ciatica-ejercicios-alivio": "sciatic nerve pain leg stretch",
  "sindrome-piriforme-ciatica": "hip piriformis stretch exercise",
  "dolor-lumbar-lado-izquierdo": "lower back pain side adult",
  "dolor-dorsal-zona-media-espalda": "back pain upper middle spine woman",
  "cervicalgia-cronica-causas": "chronic neck pain cervical spine",
  "cefalea-tensional-cervical": "tension headache neck woman",
  "vertigo-cervical-ejercicios": "vertigo dizziness balance woman",
  "bruxismo-tension-cuello": "jaw tension headache stress",
  "tortícolis-causas-remedios": "stiff neck torticollis pain",
  "estiramientos-psoas-cadera": "hip flexor stretch lunge exercise",
  "foam-roller-espalda": "foam roller back exercise recovery",
  "dolor-espalda-al-correr": "runner back pain jogging",
  "dolor-espalda-despues-deporte": "sports injury back pain recovery",
  "dolor-espalda-trabajar-de-pie": "standing work fatigue back",
  "hipopresivos-espalda": "core exercise breathing abdominal",
  "marcha-nordica-espalda": "nordic walking poles park outdoor",
  "ejercicios-gluteos-para-espalda": "glute bridge exercise floor workout",
  "cifosis-dorsal-tratamiento": "kyphosis posture correction exercise",
  "hiperlordosis-lumbar-ejercicios": "lumbar lordosis posture exercise",
  "postura-al-dormir-espalda": "sleeping position side pillow",
  "postura-conducir-coche": "driver car seat ergonomic posture",
  "tecnica-levantar-peso": "proper lifting technique heavy box",
  "escritorio-de-pie-beneficios": "standing desk home office work",
  "reposapies-ergonomia": "footrest ergonomic office desk",
  "teclado-ergonomico-cual-elegir": "ergonomic keyboard split curved",
  "raton-vertical-ergonomico": "vertical ergonomic mouse wrist",
  "monitor-altura-ergonomia": "monitor height ergonomic eye level",
  "almohada-cervical-cual-elegir": "cervical pillow neck support ergonomic",
  "soporte-lumbar-coche": "lumbar support car seat cushion",
  "faja-lumbar-cuando-usarla": "lumbar belt support orthopaedic",
  "colchon-latex-vs-viscoelastica": "mattress latex memory foam bed",

  // Batch 60-110
  "dolor-espalda-cronico-vivir-mejor": "chronic back pain physiotherapy patient",
  "osteoporosis-dolor-espalda": "bone density scan elderly osteoporosis",
  "dolor-espalda-al-agacharse": "person bending back pain floor",
  "tension-muscular-espalda": "muscle tension back stress massage",
  "espalda-cargada-alivio": "back pain relief heat pad relax",
  "dolor-espalda-toser-estornudar": "back pain cough sneeze person",
  "dolor-espalda-menstrual": "woman period pain lower back heating",
  "dolor-espalda-side-sleeping": "woman sleeping side pillow bedroom",
  "sindrome-cola-caballo": "spine mri doctor emergency hospital",
  "dolor-lumbar-despues-parto": "new mother baby back pain postpartum",
  "vertigo-cervical-ejercicios-casa": "woman dizzy balance exercise neck",
  "dolor-cabeza-cuello-cervical": "headache neck pain woman office",
  "cuello-rigido-manana": "person stiff neck morning wake up",
  "hormigueo-brazos-manos-cervicales": "hand numbness tingling nerve pain",
  "dolor-cuello-trabajar-ordenador": "office worker neck pain laptop screen",
  "contractura-cervical-rapido": "neck muscle pain woman tension heat",
  "sindrome-outlet-toracico": "shoulder neck nerve pain anatomy",
  "dolor-occipital-cervicales": "occipital headache neck base pain",
  "rutina-movilidad-matutina-espalda": "morning stretching routine yoga mat",
  "ejercicios-mckenzie-espalda": "back extension exercise physiotherapy prone",
  "estiramientos-psoas-espalda": "hip flexor stretch lunge exercise mat",
  "ejercicios-hipopresivos-espalda": "breathing exercise core abdominal woman",
  "marcha-nordica-dolor-espalda": "nordic walking poles park forest outdoor",
  "ejercicios-suelo-pelvico-espalda": "pelvic floor exercise woman yoga",
  "estiramientos-isquiotibiales-espalda": "hamstring stretch mat exercise seated",
  "ejercicios-dorsales-casa": "back extension exercise home floor superman",
  "tai-chi-dolor-espalda": "tai chi park elderly slow movement",
  "ejercicios-respiracion-espalda": "breathing diaphragm exercise woman calm",
  "conducir-sin-danar-espalda": "car driver seat back posture ergonomic",
  "mochila-dolor-espalda": "backpack student carrying school heavy",
  "postura-telefono-movil-espalda": "text neck smartphone phone looking down",
  "ergonomia-cocina-espalda": "kitchen cooking posture countertop woman",
  "postura-leer-espalda": "person reading book posture sofa",
  "soporte-lumbar-coche-guia": "car seat lumbar support cushion driving",
  "pistola-masaje-espalda": "massage gun percussive therapy back",
  "plantillas-ortopedicas-espalda-guia": "orthopedic insoles shoe foot support",
  "colchoneta-yoga-espalda": "yoga mat exercise floor back stretch",
  "rodillo-cervical-almohada": "cervical pillow neck support roll sleep",
  "cinturon-postura-espalda": "posture corrector back brace support",
  "zapatos-dolor-espalda": "running shoes ergonomic footwear comfort",
  "aplicaciones-movil-dolor-espalda": "smartphone app health fitness tracker",
  "libros-dolor-espalda-recomendados": "books reading health spine medical",
  "tens-digital-vs-analogico": "tens machine electrodes back pain therapy",
  "acupuntura-dolor-espalda": "acupuncture needles back spine treatment",
  "osteopatia-dolor-espalda": "osteopath manual therapy back treatment",
  "masaje-terapeutico-espalda": "therapeutic massage back muscles therapy",
  "pilates-clinico-vs-deportivo": "pilates clinical reformer physiotherapy",
  "meditacion-dolor-cronico-espalda": "meditation mindfulness chronic pain calm",
  "dieta-antiinflamatoria-espalda": "anti inflammatory food vegetables omega",
  "suplementos-dolor-espalda": "supplements vitamins pills health back",
  "calor-vs-frio-dolor-espalda": "hot cold therapy heat ice pack back",
  "plantillas-ortopedicas-espalda": "orthopedic insoles shoe support",
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

async function imageExists(slug) {
  try {
    await fs.access(path.join(IMAGES_DIR, `${slug}.jpg`));
    return true;
  } catch {
    return false;
  }
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

  // Saltar solo si ya tiene cover Y el archivo de imagen existe en disco
  const imgExists = await imageExists(slug);
  if (hasCover(parsed.fm) && imgExists) {
    console.log(`⏭  ${slug} ya tiene cover e imagen, saltando`);
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

  // Solo actualizar frontmatter si no tiene cover aún
  if (!hasCover(parsed.fm)) {
    const newContent = injectCover(raw, `/images/posts/${slug}.jpg`);
    await fs.writeFile(filepath, newContent, "utf8");
    console.log(`   ✏  frontmatter actualizado`);
  }

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
