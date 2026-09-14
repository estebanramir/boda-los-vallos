# Boda María Camila & Simón

Landing del itinerario del fin de semana de boda — 25, 26 y 27 de septiembre de 2026,
Brizantha Hotel Campestre, Villavicencio (Meta).

Los invitados entran por un QR, ven el itinerario de un vistazo y tocan
cualquier horario para ver los detalles.

## Correr en local

```bash
pnpm install
pnpm dev
```

## Cambiar el contenido

**Todo el texto vive en [`lib/content.ts`](lib/content.ts)** — horarios, lugares,
vestuario, hoteles, clima y recomendaciones. No hace falta tocar ningún componente
para corregir una hora o reescribir un párrafo.

## Decisiones de diseño

La página está pensada para que la use gente de todas las edades, desde el celular:

- **Escala tipográfica grande**: 18 px en móvil, 19 px de tablet en adelante.
- **Contraste WCAG AA** en todo el texto; los colores más claros quedan reservados
  para líneas y viñetas decorativas.
- **Nada por debajo de 12 px**, ni siquiera las versalitas.
- **Áreas táctiles de 48 px** como mínimo.
- **Un día a la vez** en pestañas, y los detalles ocultos tras `<details>` nativo
  (funciona con teclado y lector de pantalla, y sin JavaScript).
- Durante el fin de semana, la página **abre en el día que se está viviendo**.

### Tipografía

La familia es **Hoefler Text**, la misma de la invitación impresa, extraída del
paquete aprobado y convertida a `woff2` con subconjunto latino (~33 KB por estilo).

Hoefler Text mapea los dígitos a figuras *old-style* por defecto: preciosas en prosa,
pero confusas en horarios — un `11` se lee como `II`. Como es una fuente AAT de Apple
no expone la feature OpenType `lnum`, así que el script de conversión **reapunta los
dígitos 0–9 a los glifos lining** (`zero.standard` … `nine.standard`) dentro del
`cmap`. Por eso las horas se leen limpias.

> ⚠️ **Licencia**: Hoefler Text viene con macOS y su licencia no contempla la
> redistribución como webfont. Para una página privada de boda el riesgo es
> prácticamente nulo, pero si prefieres quedarte tranquilo, cambia
> `--font-serif` en [`app/globals.css`](app/globals.css) por **Cormorant Garamond**
> o **EB Garamond** (Google Fonts, libres y muy cercanas).

### Monograma

El `M · C · S` de [`public/monograma.svg`](public/monograma.svg) se extrajo como
vector desde el PDF aprobado, no es una imagen. Usa `currentColor`, así que toma el
color del contexto donde se coloque.

## Generar el QR

Una vez desplegado, con la URL real:

```bash
node scripts/qr.mjs https://tu-url.vercel.app
```

Deja en `qr/`:

| Archivo | Para qué |
| --- | --- |
| `qr.svg` | Vector, para la imprenta |
| `qr.png` | 2400 px, para mandar por WhatsApp |
| `tarjeta-a6.svg` | Tarjeta de 105 × 148 mm lista para imprimir |

El QR usa corrección de errores nivel H, así que sigue leyéndose aunque se doble,
se manche o se imprima pequeño.

## Desplegar en Vercel

```bash
vercel --prod
```

O conectando el repo desde el panel de Vercel. La página es estática: no necesita
variables de entorno ni base de datos.

Está marcada como `noindex` — es para los invitados, no para Google.
