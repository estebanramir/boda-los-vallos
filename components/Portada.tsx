import { boda } from "@/lib/content";
import { Cuenta } from "./Cuenta";
import { Monograma } from "./Monograma";

export function Portada() {
  return (
    <header className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      {/* Halo cálido de fondo, muy tenue */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 8%, #ffffff 0%, var(--color-papel) 42%, var(--color-papel-hueso) 100%)",
        }}
      />

      <Monograma className="surgir h-20 w-20 text-[var(--color-oliva)] sm:h-32 sm:w-32" />

      <p
        className="surgir versalita mt-7 text-[0.75rem] text-[var(--color-tinta-tenue)] sm:mt-9"
        style={{ animationDelay: "160ms" }}
      >
        Nuestra boda
      </p>

      <h1 className="surgir mt-4" style={{ animationDelay: "260ms" }}>
        <span className="versalita block text-[1.75rem] leading-[1.2] text-[var(--color-oliva-hondo)] sm:text-5xl lg:text-6xl">
          {boda.novia}
        </span>
        <span
          aria-hidden
          className="script my-1.5 block text-5xl text-[var(--color-taupe-claro)] sm:my-3 sm:text-6xl"
        >
          &
        </span>
        <span className="versalita block text-3xl leading-[1.15] text-[var(--color-oliva-hondo)] sm:text-5xl lg:text-6xl">
          {boda.novio}
        </span>
      </h1>

      <div
        className="surgir mt-7 flex flex-col items-center gap-2.5 sm:mt-9"
        style={{ animationDelay: "380ms" }}
      >
        <span aria-hidden className="h-px w-16 bg-[var(--color-linea)]" />
        <p className="cifra text-[1.1rem] text-[var(--color-tinta-suave)] sm:text-xl">
          {boda.fechaCorta} de {boda.anio}
        </p>
        <p className="versalita max-w-[19rem] text-[0.75rem] leading-relaxed text-[var(--color-tinta-tenue)]">
          {boda.sede} · {boda.region}
        </p>
        <span aria-hidden className="h-px w-16 bg-[var(--color-linea)]" />
      </div>

      <div
        className="surgir mt-8 text-[var(--color-oliva)] sm:mt-10"
        style={{ animationDelay: "500ms" }}
      >
        <Cuenta objetivo={boda.inicio} />
      </div>

      <a
        href="#itinerario"
        className="surgir toque group mt-9 flex-col items-center gap-2.5 text-[var(--color-tinta-tenue)] transition-colors hover:text-[var(--color-oliva)] focus-visible:text-[var(--color-oliva)]"
        style={{ animationDelay: "640ms" }}
      >
        <span className="versalita text-[0.75rem]">Ver el itinerario</span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-linea)] transition-transform group-hover:translate-y-1">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </a>
    </header>
  );
}
