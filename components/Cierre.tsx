import { boda, cita } from "@/lib/content";
import { Monograma } from "./Monograma";
import { Revelar } from "./Revelar";

export function Cierre() {
  return (
    <footer className="bg-[var(--color-taupe)] px-6 py-24 text-center text-[var(--color-papel)] sm:py-32">
      <Revelar>
        <Monograma className="mx-auto h-24 w-24 opacity-95 sm:h-28 sm:w-28" />

        <blockquote className="mt-9">
          <p className="script text-5xl leading-[1.05] sm:text-6xl" style={{ color: "inherit" }}>
            {cita.texto}
          </p>
          <cite className="versalita mt-5 block text-[0.68rem] not-italic opacity-75">
            {cita.fuente}
          </cite>
        </blockquote>

        <div className="mx-auto mt-9 flex max-w-xs flex-col items-center gap-3">
          <span aria-hidden className="h-px w-14 bg-[var(--color-papel)]/35" />
          <p className="versalita text-[0.62rem] opacity-90">
            {boda.novia} &amp; {boda.novio}
          </p>
          <p className="versalita text-[0.58rem] opacity-70">
            {boda.fechaCorta} de {boda.anio}
          </p>
          <span aria-hidden className="h-px w-14 bg-[var(--color-papel)]/35" />
        </div>
      </Revelar>
    </footer>
  );
}
