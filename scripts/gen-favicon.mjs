/**
 * Genera src/app/favicon.ico con la figura del logo.
 * Usa solo módulos built-in de Node.js (zlib + fs). Sin dependencias.
 * Formato: PNG-in-ICO 32×32 RGBA (soportado por todos los navegadores modernos).
 */

import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../src/app/favicon.ico");

const W = 32, H = 32;
const img = new Uint8Array(W * H * 4); // RGBA

// ── Helpers ──────────────────────────────────────────────────────────────────

function px(x, y, r, g, b, a = 255) {
  if (x < 0 || x >= W || y < 0 || y >= H) return;
  const i = (y * W + x) * 4;
  img[i] = r; img[i + 1] = g; img[i + 2] = b; img[i + 3] = a;
}

/** Rellena un círculo completo */
function fillCircle(cx, cy, r, r8, g8, b8, a8 = 255) {
  const r2 = r * r;
  for (let y = Math.ceil(cy - r); y <= Math.floor(cy + r); y++)
    for (let x = Math.ceil(cx - r); x <= Math.floor(cx + r); x++)
      if ((x - cx) ** 2 + (y - cy) ** 2 <= r2)
        px(x, y, r8, g8, b8, a8);
}

/** Rellena un rectángulo con esquinas redondeadas (approx) */
function fillRoundRect(x0, y0, w, h, rx, r8, g8, b8) {
  for (let y = y0; y < y0 + h; y++) {
    for (let x = x0; x < x0 + w; x++) {
      // Esquinas: comprobar si cae dentro del arco de la esquina
      let inside = true;
      const dx = Math.max(0, x0 + rx - x, x - (x0 + w - rx));
      const dy = Math.max(0, y0 + rx - y, y - (y0 + h - rx));
      if (dx > 0 && dy > 0 && dx * dx + dy * dy > rx * rx) inside = false;
      if (inside) px(x, y, r8, g8, b8);
    }
  }
}

/** Dibuja un segmento de recta con grosor (Bresenham + padding) */
function drawLine(x0, y0, x1, y1, r8, g8, b8, thickness = 1) {
  const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  const half = Math.floor(thickness / 2);
  let x = x0, y = y0;
  for (;;) {
    for (let ty = -half; ty <= half; ty++)
      for (let tx = -half; tx <= half; tx++)
        px(x + tx, y + ty, r8, g8, b8);
    if (x === x1 && y === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x += sx; }
    if (e2 < dx)  { err += dx; y += sy; }
  }
}

/** Dibuja una curva de Bézier cúbica como polilinea de N pasos */
function drawCubicBezier(p0, p1, p2, p3, r8, g8, b8, steps = 24, thickness = 1) {
  let [px0, py0] = p0;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps, t1 = 1 - t;
    const x = t1**3*p0[0] + 3*t1**2*t*p1[0] + 3*t1*t**2*p2[0] + t**3*p3[0];
    const y = t1**3*p0[1] + 3*t1**2*t*p1[1] + 3*t1*t**2*p2[1] + t**3*p3[1];
    drawLine(Math.round(px0), Math.round(py0), Math.round(x), Math.round(y), r8, g8, b8, thickness);
    [px0, py0] = [x, y];
  }
}

// ── Diseño del icono 32×32 ────────────────────────────────────────────────────
//
// La figura SVG original tiene viewBox="0 0 28 46".
// Escala y traslación para centrar en 32×32:
//   scale  = 30 / 46 ≈ 0.652   (altura 30px con 1px de margen arriba/abajo)
//   width  = 28 × 0.652 ≈ 18.3 → margen horizontal = (32-18.3)/2 ≈ 6.85
//   translate: tx=6.85, ty=1

const S = 30 / 46;          // escala
const TX = (W - 28 * S) / 2; // desplazamiento X ≈ 6.85
const TY = 1;                 // desplazamiento Y

function t(origX, origY) {
  return [TX + origX * S, TY + origY * S];
}

// 1. Fondo transparente
img.fill(0);

// 2. Círculo de fondo teal (#0d9488)
fillCircle(15.5, 15.5, 16, 13, 148, 136);

// 3. Cabeza blanca (círculo cx=16 cy=5.5 r=5.5 en coords originales)
const [hcx, hcy] = t(16, 5.5);
fillCircle(hcx, hcy, 5.5 * S, 255, 255, 255);

// 4. Cuello blanco (rect x=13 y=10.5 w=5.5 h=5 rx=2.75)
const [nx, ny] = t(13, 10.5);
fillRoundRect(Math.round(nx), Math.round(ny), Math.round(5.5 * S), Math.round(5 * S), Math.round(2.75 * S), 255, 255, 255);

// 5. Torso blanco — polígono simplificado a partir del path SVG
//    Path: M10,15 C7,17 6,21 6,25 C6,29 7.5,32 8,35 C8.5,37 9,39 9.5,40
//          L20,40 C20.5,38.5 21,36 21,34 C21,30 22,26 22,22 C22,18 21,16 19,15 Z
//    Aproximación: scanline fill entre borde izquierdo (front) y derecho (back)

for (let sy = Math.round(t(0, 15)[1]); sy <= Math.round(t(0, 40)[1]); sy++) {
  // inversión de y→origY para calcular la posición relativa dentro del torso
  const origY = (sy - TY) / S;
  const span = origY - 15; // 0..25
  const frac = span / 25;  // 0..1

  // Borde izquierdo (frente del torso): va de x=10 a ~x=9.5 (casi recto)
  const xLeft  = t(10 - frac * 0.5, 0)[0];
  // Borde derecho (espalda del torso): va de x=19 a ~x=20, con panza en el medio
  // Thoracic kyphosis (borde derecho sale más a la derecha a mitad del torso)
  const bulgeFactor = Math.sin(frac * Math.PI); // 0→0→0 con pico en frac=0.5
  const xRight = t(19 + bulgeFactor * 3, 0)[0];

  for (let sx = Math.round(xLeft); sx <= Math.round(xRight); sx++)
    px(sx, sy, 255, 255, 255);
}

// 6. Curva S de la columna en verde (#10b981 = 16,185,129)
//    SVG original: M16,15 C18.5,19 14,24 15.5,29.5 C17,35 16,38 15.5,40
const G = [16, 185, 129];

// Primer segmento: M16,15 C18.5,19 14,24 15.5,29.5
drawCubicBezier(
  t(16, 15), t(18.5, 19), t(14, 24), t(15.5, 29.5),
  ...G, 28, 2
);
// Segundo segmento: continuación C17,35 16,38 15.5,40
drawCubicBezier(
  t(15.5, 29.5), t(17, 35), t(16, 38), t(15.5, 40),
  ...G, 28, 2
);

// 7. Puntos de alineación postural (verde)
for (const [ox, oy] of [[15.5, 6], [15, 15.5], [15.5, 39]]) {
  const [cx2, cy2] = t(ox, oy);
  fillCircle(cx2, cy2, 1.5 * S, ...G);
}

// ── Generar PNG ───────────────────────────────────────────────────────────────

function crc32(data) {
  const tbl = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    tbl[n] = c;
  }
  let c = 0xffffffff;
  for (const b of data) c = tbl[(c ^ b) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeB = Buffer.from(type, "ascii");
  const lenB  = Buffer.allocUnsafe(4); lenB.writeUInt32BE(data.length);
  const crcIn = Buffer.concat([typeB, data]);
  const crcB  = Buffer.allocUnsafe(4); crcB.writeUInt32BE(crc32(crcIn));
  return Buffer.concat([lenB, typeB, data, crcB]);
}

// IHDR: 32×32, 8-bit, RGBA (color type 6)
const ihdr = Buffer.allocUnsafe(13);
ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

// Scanlines: filter byte 0 (None) + RGBA per pixel
const raw = Buffer.allocUnsafe(H * (1 + W * 4));
for (let y = 0; y < H; y++) {
  raw[y * (1 + W * 4)] = 0;
  for (let x = 0; x < W; x++) {
    const dst = y * (1 + W * 4) + 1 + x * 4;
    const src = (y * W + x) * 4;
    raw[dst]     = img[src];
    raw[dst + 1] = img[src + 1];
    raw[dst + 2] = img[src + 2];
    raw[dst + 3] = img[src + 3];
  }
}

const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), // PNG signature
  pngChunk("IHDR", ihdr),
  pngChunk("IDAT", deflateSync(raw)),
  pngChunk("IEND", Buffer.alloc(0)),
]);

// ── Envolver en ICO ───────────────────────────────────────────────────────────
// ICONDIR (6 bytes): reserved=0, type=1 (ICO), count=1
const icoDir = Buffer.from([0, 0, 1, 0, 1, 0]);

// ICONDIRENTRY (16 bytes)
const entry = Buffer.allocUnsafe(16);
entry[0] = W;  entry[1] = H;   // width, height (0 = 256)
entry[2] = 0;  entry[3] = 0;   // colorCount, reserved
entry.writeUInt16LE(1, 4);      // planes
entry.writeUInt16LE(32, 6);     // bitCount
entry.writeUInt32LE(png.length, 8);             // sizeInBytes
entry.writeUInt32LE(icoDir.length + 16, 12);    // imageOffset

writeFileSync(OUT, Buffer.concat([icoDir, entry, png]));
console.log(`✅ favicon.ico generado (${png.length} bytes de PNG en ICO) → ${OUT}`);
