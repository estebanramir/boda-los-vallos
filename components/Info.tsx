import { clima, hoteles, intro, recomendaciones, vestuario } from "@/lib/content";
import type { ReactNode } from "react";

function Panel({
  titulo,
  nota,
  children,
}: {
  titulo: string;
  nota: string;
  children: ReactNode;
}) {
  return (
    <details className="group border-b border-[var(--color-linea)] last:border-b-0">
      <summary className="toque cursor-pointer list-none px-5 py-5 transition-colors hover:bg-[var(--color-papel)]/70 sm:px-6 [&::-webkit-details-marker]:hidden">
        <div className="flex w-full items-center justify-between gap-4">
          <span>
            <span className="versalita block text-[0.8rem] text-[var(--color-oliva-hondo)]">
              {titulo}
            </span>
            <span className="mt-1.5 block text-[0.92rem] text-[var(--color-tinta-tenue)]">
              {nota}
            </span>
          </span>
          <span
            aria-hidden
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-linea)] text-[var(--color-tinta-tenue)] transition-transform duration-300 group-open:rotate-180"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </summary>
      <div className="px-5 pb-7 sm:px-6">{children}</div>
    </details>
  );
}

export function Info() {
  return (
    <section id="info" className="px-4 pb-16 sm:px-6 sm:pb-24">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-sm border border-[var(--color-linea)] bg-[var(--color-papel-hueso)]">
        <Panel titulo="Vestuario" nota="Qué ponerse cada día">
          <dl className="space-y-6">
            {vestuario.map((v) => (
              <div key={v.dia}>
                <dt>
                  <span className="versalita text-[0.72rem] text-[var(--color-taupe)]">
                    {v.dia}
                  </span>
                  <span className="mt-1 block text-[1.05rem] text-[var(--color-tinta)]">
                    {v.codigo}
                  </span>
                </dt>
                <dd className="mt-2 text-[0.98rem] leading-[1.75] text-[var(--color-tinta-suave)]">
                  {v.detalle}
                  {v.lineas.map((l) => (
                    <span key={l.quien} className="mt-2 block">
                      <span className="text-[var(--color-tinta)]">{l.quien}:</span>{" "}
                      {l.texto}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel titulo="Los hoteles" nota="Brizantha y Duranta">
          <dl className="space-y-6">
            {hoteles.map((h) => (
              <div key={h.nombre}>
                <dt className="text-[1.05rem] text-[var(--color-tinta)]">{h.nombre}</dt>
                <dd className="mt-2 text-[0.98rem] leading-[1.75] text-[var(--color-tinta-suave)]">
                  {h.descripcion}
                  <a
                    href={h.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="versalita toque mt-2 inline-flex items-center gap-2 text-[0.72rem] text-[var(--color-oliva)] underline underline-offset-4"
                  >
                    Ver ubicación
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                      <path d="M7 17L17 7M17 7H9M17 7v8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel titulo="El clima" nota="Qué esperar y qué empacar">
          <p className="text-[0.98rem] leading-[1.75] text-[var(--color-tinta-suave)]">
            {clima.resumen}
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-y-4 border-y border-[var(--color-linea)] py-5">
            {clima.datos.map((d) => (
              <div key={d.etiqueta}>
                <dt className="versalita text-[0.68rem] text-[var(--color-tinta-tenue)]">
                  {d.etiqueta}
                </dt>
                <dd className="cifra mt-1 text-[1.05rem] text-[var(--color-tinta)]">
                  {d.valor}
                </dd>
              </div>
            ))}
          </dl>
          <ul className="mt-5 space-y-2.5">
            {clima.empaca.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-[0.98rem] leading-[1.7] text-[var(--color-tinta-suave)]"
              >
                <span
                  aria-hidden
                  className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-[var(--color-taupe-claro)]"
                />
                {item}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel titulo="Recomendaciones" nota="Para que todo fluya">
          <ol className="space-y-5">
            {recomendaciones.map((r) => (
              <li key={r.titulo}>
                <h3 className="text-[1.02rem] text-[var(--color-tinta)]">{r.titulo}</h3>
                <p className="mt-1.5 text-[0.98rem] leading-[1.75] text-[var(--color-tinta-suave)]">
                  {r.texto}
                </p>
              </li>
            ))}
          </ol>
        </Panel>

        <Panel titulo="Un mensaje nuestro" nota="Gracias por acompañarnos">
          <div className="space-y-4 text-[0.98rem] leading-[1.8] text-[var(--color-tinta-suave)]">
            {intro.parrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="script mt-6 text-4xl">{intro.cierre}</p>
        </Panel>
      </div>
    </section>
  );
}
