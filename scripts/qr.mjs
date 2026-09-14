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
import { Resvg } from "@resvg/resvg-js";
import { PALETA, qrEstilizado } from "./lib-qr.mjs";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const salida = join(raiz, "qr");

const { oliva: OLIVA, papel: PAPEL, taupe: TAUPE } = PALETA;

const url = process.argv[2];
if (!url) {
  console.error(
    "Falta la URL.\n  node scripts/qr.mjs https://tu-sitio.vercel.app",
  );
  process.exit(1);
}

await mkdir(salida, { recursive: true });
const monograma = await readFile(join(raiz, "public/monograma.svg"), "utf8");

/** Rasteriza un SVG a PNG al ancho pedido. */
async function aPng(svg, ancho, destino) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: ancho },
    // La tarjeta lleva texto en Hoefler Text; sin esto saldría con otra fuente.
    font: {
      fontFiles: [join(raiz, "assets/fuente/HoeflerText-Regular.ttf")],
      defaultFontFamily: "Hoefler Text",
      loadSystemFonts: false,
    },
  });
  await writeFile(destino, resvg.render().asPng());
}

// ── Versión con la estética de la boda ──────────────────────────────────
const svgBonito = qrEstilizado(url, { monograma });
await writeFile(join(salida, "qr.svg"), svgBonito);
await aPng(svgBonito, 2000, join(salida, "qr.png"));

// ── Versión lisa, por si algún escáner viejo se atraganta ───────────────
const opcionesLisas = {
  errorCorrectionLevel: "H",
  margin: 2,
  color: { dark: OLIVA, light: PAPEL },
};
await writeFile(
  join(salida, "qr-simple.svg"),
  await QRCode.toString(url, { ...opcionesLisas, type: "svg" }),
);
await QRCode.toFile(join(salida, "qr-simple.png"), url, {
  ...opcionesLisas,
  width: 2400,
});

// ── Tarjeta A6 (105 × 148 mm) a tamaño real, para la imprenta ───────────
const vbMonograma = monograma.match(/viewBox="([^"]+)"/)[1];
const cuerpoMonograma = monograma
  .replace(/<svg[^>]*>/, "")
  .replace("</svg>", "")
  .trim();

const vbQr = svgBonito.match(/viewBox="([^"]+)"/)[1];
// Ojo: el QR estilizado lleva el monograma como <svg> anidado, así que hay
// que quitar el ÚLTIMO </svg>, no el primero, o el XML queda descuadrado.
const sinApertura = svgBonito.replace(/<svg[^>]*>/, "");
const qrInterno = sinApertura
  .slice(0, sinApertura.lastIndexOf("</svg>"))
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

  <svg x="${X_QR}" y="57" width="${LADO_QR}" height="${LADO_QR}" viewBox="${vbQr}">
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
// 1240 px de ancho = 105 mm a 300 ppp, la resolución que pide una imprenta.
await aPng(tarjeta, 1240, join(salida, "tarjeta-a6.png"));

console.log(`✓ QR generado para: ${url}

  qr/qr.png          2000 px · el QR con el monograma  ← el que quieres
  qr/qr.svg          el mismo, en vector para imprenta
  qr/tarjeta-a6.png  tarjeta 105 × 148 mm a 300 ppp
  qr/tarjeta-a6.svg  la misma, en vector
  qr/qr-simple.png   versión lisa de respaldo
`);
