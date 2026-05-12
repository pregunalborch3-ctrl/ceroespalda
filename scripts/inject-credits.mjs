/**
 * inject-credits.mjs
 * - Injects coverCredit + coverCreditUrl into the frontmatter of all 19 articles
 * - Downloads a better image for hernia-discal-lumbar-sintomas-tratamiento
 *   using query "spine anatomy back pain" and updates that article's credit
 *
 * Usage: node scripts/inject-credits.mjs
 */

import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import http from "node:http";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "content", "posts");
const IMAGES_DIR = path.join(ROOT, "public", "images", "posts");

const UNSPLASH_ACCESS_KEY = "B-MV-UQuipx1jJ_92D1-_OSTdCAUhZ67LXABlp6KsaY";

// ── Known credits from previous fetch run ────────────────────────────────────
const CREDITS = {
  "aliviar-dolor-lumbar-en-casa": {
    credit: "Sasun Bughdaryan",
    url: "https://unsplash.com/photos/woman-in-white-denim-shorts-X4gd4Lg8OwY",
  },
  "cervicalgia-que-es-tratamiento-casa": {
    credit: "Alex Hiller",
    url: "https://unsplash.com/photos/grayscale-photo-of-person-bending-body-Li4-dRUFvko",
  },
  "como-sentarse-correctamente-ordenador": {
    credit: "TheStandingDesk",
    url: "https://unsplash.com/photos/a-woman-standing-at-a-desk-using-a-computer-1BogYYVDkys",
  },
  "contractura-muscular-espalda": {
    credit: "THLT LCX",
    url: "https://unsplash.com/photos/person-in-white-shirt-lying-on-bed-nMG20MmJV-4",
  },
  "dolor-cuello-trapecio-movil": {
    credit: "Alicia Christin Gerald",
    url: "https://unsplash.com/photos/person-leans-on-a-wooden-table-with-their-elbow-F3W8UPgheL8",
  },
  "dolor-espalda-al-despertar-colchon": {
    credit: "Somnox Sleep",
    url: "https://unsplash.com/photos/man-in-white-t-shirt-standing-beside-black-sofa-avPgQrvScXw",
  },
  "dolor-espalda-estres": {
    credit: "Vitaly Gariev",
    url: "https://unsplash.com/photos/a-woman-sitting-at-a-table-using-a-laptop-computer-vAAtDZDAmko",
  },
  "ejercicios-lumbalgia-casa": {
    credit: "Vitaly Gariev",
    url: "https://unsplash.com/photos/couple-doing-yoga-cat-cow-pose-at-home-fbA_qViNdGw",
  },
  "escoliosis-adultos-ejercicios-tratamiento": {
    credit: "Margaret Young",
    url: "https://unsplash.com/photos/woman-practicing-yoga-childs-pose-on-mat-wVPRiZOE5WI",
  },
  "estiramientos-cervicales-oficina": {
    credit: "Vladimir Fedotov",
    url: "https://unsplash.com/photos/woman-in-white-long-sleeve-shirt-and-blue-denim-jeans-i9Hfmp3Z9J8",
  },
  "estiramientos-espalda-antes-dormir": {
    credit: "Joseph Spencer",
    url: "https://unsplash.com/photos/person-relaxing-in-bed-with-a-window-bR-HoD5lE20",
  },
  // hernia-discal: will be set after downloading the new image below
  "mejor-cojin-lumbar-silla-oficina": {
    credit: "EFFYDESK",
    url: "https://unsplash.com/photos/a-woman-sitting-at-a-desk-with-a-laptop-zyMtujfaZ_I",
  },
  "mejor-colchon-dolor-espalda": {
    credit: "Costa Live",
    url: "https://unsplash.com/photos/a-neatly-made-bed-with-a-patterned-mattress-and-pillows-lrKF0_SM0Eg",
  },
  "mejor-silla-ergonomica-dolor-espalda": {
    credit: "ObjectType RAW",
    url: "https://unsplash.com/photos/a-modern-office-chair-is-featured-in-green-YrXPGShView",
  },
  "por-que-duele-espalda-baja-manana": {
    credit: "Alvaro Palacios",
    url: "https://unsplash.com/photos/a-man-sitting-on-top-of-a-bed-in-a-room-SVN3EhLHgsA",
  },
  "postura-correcta-al-caminar": {
    credit: "Joao Vitor Marcilio",
    url: "https://unsplash.com/photos/people-walking-in-a-lush-green-park-with-trees-v-OMS13pPM0",
  },
  "postura-correcta-frente-al-ordenador": {
    credit: "Zesan H.",
    url: "https://unsplash.com/photos/a-man-sitting-in-front-of-a-computer-monitor-7ntqk3cXMrk",
  },
  "silla-ergonomica-merece-pena": {
    credit: "EFFYDESK",
    url: "https://unsplash.com/photos/a-woman-sitting-at-a-desk-with-a-laptop-zyMtujfaZ_I",
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fetchJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    const req = mod.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchJson(res.headers.location, options).then(resolve).catch(reject);
      }
      let body = "";
      res.on("data", (d) => (body += d));
      res.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch {
          reject(new Error(`Bad JSON: ${body.slice(0, 200)}`));
        }
      });
    });
    req.on("error", reject);
  });
}

function downloadBinary(url, destPath) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(destPath);
    const req = mod.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        return downloadBinary(res.headers.location, destPath).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    });
    req.on("error", (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function searchUnsplash(query) {
  const url =
    `https://api.unsplash.com/search/photos` +
    `?query=${encodeURIComponent(query)}` +
    `&per_page=5&orientation=landscape&content_filter=high`;
  const data = await fetchJson(url, {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      "Accept-Version": "v1",
    },
  });
  return data.results ?? [];
}

async function triggerDownload(downloadLocation) {
  await fetchJson(downloadLocation, {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      "Accept-Version": "v1",
    },
  });
}

// ── Frontmatter injection ─────────────────────────────────────────────────────

function injectCredit(raw, credit, creditUrl) {
  // Match the YAML frontmatter block
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return raw;

  const fm = fmMatch[1];

  // Remove existing coverCredit / coverCreditUrl lines if any
  const cleaned = fm
    .split("\n")
    .filter((l) => !/^coverCredit(Url)?:/.test(l))
    .join("\n");

  // Inject after coverAlt if present, else before featured
  const creditLines = `coverCredit: "${credit}"\ncoverCreditUrl: "${creditUrl}"`;

  let newFm;
  if (/^coverAlt:/m.test(cleaned)) {
    newFm = cleaned.replace(/(^coverAlt:.*)/m, `$1\n${creditLines}`);
  } else if (/^featured:/m.test(cleaned)) {
    newFm = cleaned.replace(/(^featured:)/m, `${creditLines}\n$1`);
  } else {
    newFm = cleaned + "\n" + creditLines;
  }

  return raw.replace(fmMatch[0], `---\n${newFm}\n---`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  // Step 1: Download better hernia image
  console.log("🔍 Buscando imagen de hernia-discal con query 'spine anatomy back pain'...");
  const herniaSlugs = "hernia-discal-lumbar-sintomas-tratamiento";
  let herniaCredit = null;
  let herniaCreditUrl = null;

  try {
    const results = await searchUnsplash("spine anatomy back pain");
    if (results.length > 0) {
      const photo = results[0];
      const photographer = photo.user.name;
      const photoUrl = `https://unsplash.com/photos/${photo.id}`;
      const rawDownloadUrl = photo.urls.raw;
      const downloadUrl = `${rawDownloadUrl}&w=1600&q=80&fm=jpg&fit=crop&crop=entropy`;
      const imagePath = path.join(IMAGES_DIR, `${herniaSlugs}.jpg`);

      console.log(`  Foto: "${photographer}" — descargando...`);
      await triggerDownload(photo.links.download_location);
      await downloadBinary(downloadUrl, imagePath);
      console.log(`  ✅ Imagen guardada en ${imagePath}`);

      herniaCredit = photographer;
      herniaCreditUrl = photoUrl;
    } else {
      console.warn("  ⚠️ Sin resultados para la búsqueda, se saltará la imagen de hernia.");
    }
  } catch (err) {
    console.error("  ❌ Error descargando imagen de hernia:", err.message);
  }

  if (herniaCredit) {
    CREDITS[herniaSlugs] = { credit: herniaCredit, url: herniaCreditUrl };
  }

  await sleep(1200);

  // Step 2: Inject credits into all frontmatters
  console.log("\n📝 Inyectando créditos en los frontmatters...");
  const slugs = Object.keys(CREDITS);

  for (const slug of slugs) {
    const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
    if (!fs.existsSync(mdxPath)) {
      console.warn(`  ⚠️ No encontrado: ${slug}.mdx`);
      continue;
    }
    const { credit, url } = CREDITS[slug];
    const raw = fs.readFileSync(mdxPath, "utf8");
    const updated = injectCredit(raw, credit, url);
    if (updated !== raw) {
      fs.writeFileSync(mdxPath, updated, "utf8");
      console.log(`  ✅ ${slug}.mdx → "${credit}"`);
    } else {
      console.log(`  — ${slug}.mdx (sin cambios)`);
    }
  }

  console.log("\n✅ Listo. Ahora haz git add + commit + push.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
