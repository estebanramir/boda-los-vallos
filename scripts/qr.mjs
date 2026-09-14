#!/usr/bin/env node
/**
 * Genera el QR que lleva a la landing, en los colores de la boda,
 * más una tarjeta imprimible lista para llevar a la imprenta.
 *
 *   node scripts/qr.mjs https://boda-los-vallos.vercel.app
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const salida = join(raiz, "qr");

const OLIVA = "#4a5241";
const PAPEL = "#faf8f4";
const TAUPE = "#6f6144";

const url = process.argv[2];
if (!url) {
  console.error(
    "Falta la URL.\n  node scripts/qr.mjs https://tu-sitio.vercel.app",
  );
  process.exit(1);
}

// Nivel H: aguanta hasta un 30% de daño o de superficie tapada, así que
// el QR sigue leyéndose impreso, doblado o con el monograma encima.
const opciones = {
  errorCorrectionLevel: "H",
  margin: 2,
  color: { dark: OLIVA, light: PAPEL },
};

await mkdir(salida, { recursive: true });

const svgQr = await QRCode.toString(url, { ...opciones, type: "svg" });
await writeFile(join(salida, "qr.svg"), svgQr);

await QRCode.toFile(join(salida, "qr.png"), url, { ...opciones, width: 2400 });

// Tarjeta A6 (105 × 148 mm) a tamaño real, para mandar a la imprenta.
const monograma = await readFile(join(raiz, "public/monograma.svg"), "utf8");
const vbMonograma = monograma.match(/viewBox="([^"]+)"/)[1];
const cuerpoMonograma = monograma
  .replace(/<svg[^>]*>/, "")
  .replace("</svg>", "")
  .trim();

// El SVG del QR trae su propio viewBox en módulos; lo anidamos con
// width/height en milímetros y dejamos que el viewBox haga la escala.
const vbQr = svgQr.match(/viewBox="([^"]+)"/)[1];
const qrInterno = svgQr
  .replace(/<\?xml[^>]*\?>/, "")
  .replace(/<svg[^>]*>/, "")
  .replace("</svg>", "")
  .trim();

const LADO_QR = 54;
const X_QR = (105 - LADO_QR) / 2;

const tarjeta = `<svg xmlns="http://www.w3.org/2000/svg" width="105mm" height="148mm" viewBox="0 0 105 148">
  <rect width="105" height="148" fill="${PAPEL}"/>
  <rect x="6" y="6" width="93" height="136" fill="none" stroke="${TAUPE}" stroke-width="0.25" opacity="0.45"/>

  <svg x="43" y="14" width="19" height="19" viewBox="${vbMonograma}" fill="${OLIVA}">
    ${cuerpoMonograma}
  </svg>

  <text x="52.5" y="42.5" text-anchor="middle" font-family="Hoefler Text, Georgia, serif"
        font-size="4.4" letter-spacing="0.85" fill="${OLIVA}">MARÍA CAMILA &amp; SIMÓN</text>
  <text x="52.5" y="49.5" text-anchor="middle" font-family="Hoefler Text, Georgia, serif"
        font-size="2.9" letter-spacing="0.45" fill="${TAUPE}">25 · 26 · 27 DE SEPTIEMBRE DE 2026</text>

  <svg x="${X_QR}" y="57" width="${LADO_QR}" height="${LADO_QR}" viewBox="${vbQr}" shape-rendering="crispEdges">
    ${qrInterno}
  </svg>

  <text x="52.5" y="124" text-anchor="middle" font-family="Hoefler Text, Georgia, serif"
        font-size="4.6" fill="${OLIVA}">Escanea para ver</text>
  <text x="52.5" y="131" text-anchor="middle" font-family="Hoefler Text, Georgia, serif"
        font-size="4.6" fill="${OLIVA}">el itinerario</text>
  <text x="52.5" y="138" text-anchor="middle" font-family="Hoefler Text, Georgia, serif"
        font-size="2.7" letter-spacing="0.35" fill="${TAUPE}">BRIZANTHA · VILLAVICENCIO</text>
</svg>`;

await writeFile(join(salida, "tarjeta-a6.svg"), tarjeta);

console.log(`✓ QR generado para: ${url}

  qr/qr.svg          vector, para imprenta
  qr/qr.png          2400 px, para WhatsApp o redes
  qr/tarjeta-a6.svg  tarjeta 105 × 148 mm lista para imprimir
`);
