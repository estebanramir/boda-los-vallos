import { recomendaciones } from "@/lib/content";
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
      </div>
    </section>
  );
}
