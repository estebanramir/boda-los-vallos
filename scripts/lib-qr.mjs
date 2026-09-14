/**
 * Dibuja un QR con la estética de la boda: módulos redondeados en verde oliva
 * sobre papel crema, ojos con esquinas suaves y el monograma en el centro.
 *
 * El hueco del monograma se apoya en la corrección de errores nivel H, que
 * tolera hasta un 30% de superficie perdida. El hueco que abrimos ronda el 8%,
 * así que queda mucho margen para dobleces, manchas y tinta corrida.
 */
import QRCode from "qrcode";

export const PALETA = {
  oliva: "#4a5241",
  papel: "#faf8f4",
  taupe: "#6f6144",
};

/** Los tres ojos ocupan 7×7 módulos en las esquinas menos la inferior derecha. */
function esOjo(x, y, size) {
  return (
    (x < 7 && y < 7) ||
    (x >= size - 7 && y < 7) ||
    (x < 7 && y >= size - 7)
  );
}

export function qrEstilizado(url, { monograma = null, huecoCentral = 0.28 } = {}) {
  const qr = QRCode.create(url, { errorCorrectionLevel: "H" });
  const size = qr.modules.size;
  const data = qr.modules.data;
  const encendido = (x, y) => data[y * size + x] === 1;

  const margen = 4;
  const total = size + margen * 2;

  // Ventana central reservada para el monograma, en módulos enteros.
  const ladoHueco = monograma ? Math.round(size * huecoCentral) : 0;
  const desde = Math.floor((size - ladoHueco) / 2);
  const hasta = desde + ladoHueco;
  const enHueco = (x, y) =>
    ladoHueco > 0 && x >= desde && x < hasta && y >= desde && y < hasta;

  const puntos = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!encendido(x, y) || esOjo(x, y, size) || enHueco(x, y)) continue;
      puntos.push(
        `<circle cx="${(x + 0.5).toFixed(2)}" cy="${(y + 0.5).toFixed(2)}" r="0.42"/>`,
      );
    }
  }

  // Los ojos se redibujan como marco redondeado + pupila, en vez de 49 cuadrados.
  const ojo = (ox, oy) => `
    <rect x="${ox + 0.5}" y="${oy + 0.5}" width="6" height="6" rx="1.9"
          fill="none" stroke="${PALETA.oliva}" stroke-width="1"/>
    <rect x="${ox + 2}" y="${oy + 2}" width="3" height="3" rx="1"
          fill="${PALETA.oliva}"/>`;

  const ojos = [ojo(0, 0), ojo(size - 7, 0), ojo(0, size - 7)].join("");

  let centro = "";
  if (monograma) {
    const vb = monograma.match(/viewBox="([^"]+)"/)[1];
    const cuerpo = monograma
      .replace(/<svg[^>]*>/, "")
      .replace("</svg>", "")
      .trim();
    // El monograma se dibuja algo menor que el hueco, para dejarle aire.
    const lado = ladoHueco * 0.82;
    const pos = (size - lado) / 2;
    centro = `
    <rect x="${desde - 0.4}" y="${desde - 0.4}" width="${ladoHueco + 0.8}" height="${ladoHueco + 0.8}"
          rx="1.2" fill="${PALETA.papel}"/>
    <svg x="${pos.toFixed(2)}" y="${pos.toFixed(2)}" width="${lado.toFixed(2)}" height="${lado.toFixed(2)}"
         viewBox="${vb}" fill="${PALETA.oliva}">${cuerpo}</svg>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}">
  <rect width="${total}" height="${total}" fill="${PALETA.papel}"/>
  <g transform="translate(${margen} ${margen})">
    <g fill="${PALETA.oliva}">${puntos.join("")}</g>
    ${ojos}
    ${centro}
  </g>
</svg>`;
}
