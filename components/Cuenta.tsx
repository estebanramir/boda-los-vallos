"use client";

import { useEffect, useState } from "react";

type Restante = { dias: number; horas: number; minutos: number; segundos: number };

function calcular(objetivo: number): Restante | null {
  const delta = objetivo - Date.now();
  if (delta <= 0) return null;
  const s = Math.floor(delta / 1000);
  return {
    dias: Math.floor(s / 86400),
    horas: Math.floor((s % 86400) / 3600),
    minutos: Math.floor((s % 3600) / 60),
    segundos: s % 60,
  };
}

export function Cuenta({ objetivo }: { objetivo: string }) {
  const ts = new Date(objetivo).getTime();
  // Arranca en null para que el HTML del servidor y el primer render del
  // cliente coincidan; el reloj real entra tras la hidratación.
  const [restante, setRestante] = useState<Restante | null>(null);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    setRestante(calcular(ts));
    setListo(true);
    const id = setInterval(() => setRestante(calcular(ts)), 1000);
    return () => clearInterval(id);
  }, [ts]);

  if (listo && !restante) {
    return (
      <p className="script text-5xl sm:text-6xl" aria-live="polite">
        ¡Ya estamos celebrando!
      </p>
    );
  }

  const bloques = [
    { valor: restante?.dias, etiqueta: "Días" },
    { valor: restante?.horas, etiqueta: "Horas" },
    { valor: restante?.minutos, etiqueta: "Min" },
    { valor: restante?.segundos, etiqueta: "Seg" },
  ];

  return (
    <div
      className="flex items-start justify-center gap-4 sm:gap-7"
      role="timer"
      aria-label="Cuenta regresiva para el fin de semana"
    >
      {bloques.map(({ valor, etiqueta }, i) => (
        <div key={etiqueta} className="flex items-start gap-4 sm:gap-7">
          {i > 0 && (
            <span
              aria-hidden
              className="pt-1 text-2xl text-[var(--color-tinta-tenue)] sm:text-3xl"
            >
              ·
            </span>
          )}
          <div className="min-w-[3.4rem] text-center sm:min-w-[4.25rem]">
            <div className="cifra text-[2.35rem] leading-none sm:text-5xl">
              {listo && valor !== undefined
                ? String(valor).padStart(2, "0")
                : "—"}
            </div>
            <div className="versalita mt-2.5 text-[0.72rem] text-[var(--color-tinta-tenue)]">
              {etiqueta}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
