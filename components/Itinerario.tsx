"use client";

import { useEffect, useState } from "react";
import { dias, type Evento } from "@/lib/content";

function IconoLugar() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[0.95em] w-[0.95em] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <path
        d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

/** Cabecera de un evento: hora, título y lugar. Es lo que se ve siempre. */
function Resumen({ evento }: { evento: Evento }) {
  return (
    <div className="min-w-0 flex-1">
      {/* La hora va sola en su línea: es el ancla para escanear la lista. */}
      <p
        className={`cifra leading-none ${
          evento.destacado
            ? "text-[1rem] text-[var(--color-oliva-hondo)]"
            : "text-[0.95rem] text-[var(--color-oliva)]"
        }`}
      >
        {evento.hora}
      </p>

      <p
        className={`mt-1.5 leading-snug text-[var(--color-tinta)] ${
          evento.destacado ? "text-[1.15rem]" : "text-[1.05rem]"
        }`}
      >
        {evento.titulo}
        {evento.lugar && (
          <span className="text-[0.92rem] text-[var(--color-taupe)]">
            <span aria-hidden className="mx-1.5 text-[var(--color-decorativo)]">
              ·
            </span>
            {evento.lugar}
          </span>
        )}
      </p>
    </div>
  );
}

function Fila({ evento }: { evento: Evento }) {
  const marco = evento.destacado
    ? "border-l-[3px] border-[var(--color-oliva)] bg-[var(--color-papel-hueso)]"
    : "border-l-[3px] border-transparent";

  // Sin detalle no hay nada que desplegar: fila plana, sin afordancia falsa.
  if (!evento.detalle) {
    return (
      <li className={`${marco} px-4 py-3 sm:px-5`}>
        <Resumen evento={evento} />
      </li>
    );
  }

  return (
    <li className={marco}>
      <details className="group">
        <summary className="cursor-pointer list-none px-4 py-3 transition-colors hover:bg-[var(--color-papel-hueso)]/70 sm:px-5 [&::-webkit-details-marker]:hidden">
          <div className="flex items-start gap-3">
            <Resumen evento={evento} />
            <span
              aria-hidden
              className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-linea)] text-[var(--color-tinta-tenue)] transition-transform duration-300 group-open:rotate-180"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </summary>
        <p className="px-4 pb-4 text-[0.98rem] leading-[1.7] text-[var(--color-tinta-suave)] sm:px-5 sm:pr-14">
          {evento.detalle}
        </p>
      </details>
    </li>
  );
}

/** Fecha de hoy en Bogotá, como YYYY-MM-DD. */
function hoyEnBogota() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function Itinerario() {
  const [activo, setActivo] = useState(dias[0].id);
  const [hoy, setHoy] = useState<string | null>(null);

  // Durante el fin de semana, abrir directo en el día que se está viviendo.
  // Va en un efecto para no romper la hidratación con la fecha del cliente.
  useEffect(() => {
    const fecha = hoyEnBogota();
    setHoy(fecha);
    const deHoy = dias.find((d) => d.fecha === fecha);
    if (deHoy) setActivo(deHoy.id);
  }, []);

  const dia = dias.find((d) => d.id === activo) ?? dias[0];

  return (
    <section id="itinerario" className="px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <h2 className="script text-center text-4xl sm:text-5xl">Itinerario</h2>

        {/* Pestañas: un día a la vez */}
        <div
          role="tablist"
          aria-label="Días del fin de semana"
          className="mt-5 grid grid-cols-3 gap-1.5 rounded-sm border border-[var(--color-linea)] bg-[var(--color-papel-hueso)] p-1.5"
        >
          {dias.map((d) => {
            const esActivo = d.id === activo;
            const esHoy = hoy === d.fecha;
            return (
              <button
                key={d.id}
                role="tab"
                type="button"
                id={`tab-${d.id}`}
                aria-selected={esActivo}
                aria-controls={`panel-${d.id}`}
                onClick={() => setActivo(d.id)}
                className={`flex min-h-[54px] flex-col items-center justify-center gap-1 rounded-[2px] px-1 transition-colors ${
                  esActivo
                    ? "bg-[var(--color-oliva)] text-[var(--color-papel)]"
                    : "text-[var(--color-tinta-suave)] hover:bg-[var(--color-papel)]"
                }`}
              >
                <span className="versalita text-[0.72rem] leading-none">
                  {d.diaSemana}
                </span>
                <span className="cifra text-[1.2rem] leading-none">{d.numero}</span>
                {esHoy && (
                  <span
                    className={`versalita text-[0.58rem] leading-none ${
                      esActivo ? "text-[var(--color-papel)]/80" : "text-[var(--color-taupe)]"
                    }`}
                  >
                    Hoy
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Panel del día activo */}
        <div
          key={dia.id}
          role="tabpanel"
          id={`panel-${dia.id}`}
          aria-labelledby={`tab-${dia.id}`}
          className="surgir mt-5"
          style={{ animationDuration: "450ms" }}
        >
          <ol className=" list-none divide-y divide-[var(--color-linea)] overflow-hidden rounded-sm border border-[var(--color-linea)] bg-[var(--color-papel)]">
            {dia.eventos.map((e) => (
              <Fila key={e.titulo} evento={e} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
