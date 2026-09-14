import type { Metadata, Viewport } from "next";
import { Italianno } from "next/font/google";
import { boda } from "@/lib/content";
import "./globals.css";

const italianno = Italianno({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-italianno",
  display: "swap",
});

const titulo = `${boda.novia} & ${boda.novio}`;
const descripcion = `Itinerario del fin de semana · ${boda.fechaCorta} de ${boda.anio} · ${boda.sede}, ${boda.region}.`;

export const metadata: Metadata = {
  title: {
    default: `${titulo} · Itinerario`,
    template: `%s · ${titulo}`,
  },
  description: descripcion,
  openGraph: {
    title: `${titulo} · Itinerario del fin de semana`,
    description: descripcion,
    locale: "es_CO",
    type: "website",
  },
  robots: { index: false, follow: false },
  // Sin esto, el navegador del móvil detecta "8:00 am" o "26 de septiembre"
  // como datos accionables, los vuelve enlaces y los pinta con el color de
  // acento del sistema, rompiendo la paleta.
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#faf8f4",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO" className={italianno.variable}>
      <body className="papel-grano antialiased">{children}</body>
    </html>
  );
}
