/**
 * ────────────────────────────────────────────────────────────────
 *  TODO EL CONTENIDO DE LA PÁGINA VIVE AQUÍ.
 *  Para cambiar textos, horas o vestuario, edita solo este archivo.
 * ────────────────────────────────────────────────────────────────
 */

export const boda = {
  novia: "María Camila",
  novio: "Simón",

  fechaCorta: "25 · 26 · 27 de septiembre",
  anio: "2026",
  sede: "Brizantha Hotel Campestre",
  region: "Villavicencio, Meta",
} as const;

/** Cierra la página. Para cambiarla, basta con editar estas dos líneas. */
export const cita = {
  texto: "Yo soy de mi amado, y mi amado es mío.",
  fuente: "Cantares 6:3",
} as const;

export type Evento = {
  hora: string;
  titulo: string;
  /** Dónde ocurre. Es la duda número uno de un invitado. */
  lugar?: string;
  detalle?: string;
  destacado?: boolean;
};

export type Dia = {
  id: string;
  /** Fecha del día en hora de Colombia, para resaltar "hoy". */
  fecha: string;
  diaSemana: string;
  numero: string;
  mes: string;
  momento: string;
  eventos: Evento[];
};

export const dias: Dia[] = [
  {
    id: "viernes",
    fecha: "2026-09-25",
    diaSemana: "Viernes",
    numero: "25",
    mes: "Septiembre",
    momento: "La bienvenida",
    eventos: [
      {
        hora: "5:00 pm — 10:00 pm",
        titulo: "Cóctel de bienvenida",
        lugar: "Brizantha · zona de piscina",
        detalle:
          "En la zona de piscina de Brizantha. Tendremos habilitada la barra de comida y la barra de cocteles.",
        destacado: true,
      },
    ],
  },
  {
    id: "sabado",
    fecha: "2026-09-26",
    diaSemana: "Sábado",
    numero: "26",
    mes: "Septiembre",
    momento: "El gran día",
    eventos: [
      {
        hora: "8:00 am — 10:00 am",
        titulo: "Desayuno",
        lugar: "Brizantha o Duranta",
        detalle: "En el hotel en el que te estés hospedando.",
      },
      {
        hora: "8:00 am — 1:00 pm",
        titulo: "Piscina libre",
        lugar: "Brizantha o Duranta",
        detalle: "Horario libre para usar la piscina de cualquiera de los dos hoteles.",
      },
      {
        hora: "12:30 pm — 2:30 pm",
        titulo: "Almuerzo",
        lugar: "Brizantha",
        detalle:
          "Si te estás hospedando en Duranta te invitamos a almorzar temprano en Brizantha, para que tengas tiempo de regresar y arreglarte.",
      },
      {
        hora: "1:00 pm",
        titulo: "Cierre de la piscina",
        lugar: "Brizantha",
        detalle: "Cierre total para empezar la decoración.",
      },
      {
        hora: "3:30 pm",
        titulo: "Apertura y entrada de invitados",
        lugar: "Brizantha",
        detalle:
          "Preséntate en la recepción de Brizantha: desde ahí te guiarán y te acomodarán en tu lugar.",
      },
      {
        hora: "4:00 pm",
        titulo: "Ceremonia y recepción",
        lugar: "Brizantha",
        detalle: "El momento que nos reúne a todos.",
        destacado: true,
      },
      {
        hora: "12:00 am — 6:00 am",
        titulo: "Conductores elegidos",
        lugar: "De Brizantha a Duranta",
        detalle:
          "Si te hospedas en Duranta y tienes carro, los conductores manejarán tu carro de Brizantha a Duranta. Si no tienes carro, te llevarán en el carro de alguien más.",
      },
    ],
  },
  {
    id: "domingo",
    fecha: "2026-09-27",
    diaSemana: "Domingo",
    numero: "27",
    mes: "Septiembre",
    momento: "La despedida",
    eventos: [
      {
        hora: "8:00 am — 10:00 am",
        titulo: "Desayuno",
        detalle: "En el hotel en el que te estés hospedando.",
      },
      {
        hora: "1:00 pm",
        titulo: "Asado llanero de despedida",
        lugar: "Brizantha · zona de piscina",
        detalle:
          "En la zona de piscina de Brizantha. El uso de la piscina de los dos hoteles estará habilitado todo el día.",
        destacado: true,
      },
    ],
  },
];

export const recomendaciones = [
  {
    titulo: "Dónde conseguir lo que te falte",
    texto:
      "Estamos en las afueras de Villavicencio. Si necesitas algo de fácil acceso, en Apiay lo consigues rápido. Si es algo más especializado, te recomendamos ir a Villavicencio como tal.",
  },
  {
    titulo: "Hospedaje y alimentación",
    texto:
      "Tu hospedaje y tu alimentación ya están cubiertos por nosotros. Solo deberás pagar tus consumos adicionales.",
  },
  {
    titulo: "Alergias y restricciones",
    texto:
      "Tenemos la información de tus alergias y organizamos todo para acomodarnos a tus necesidades. Aun así, no está de más que se lo recuerdes a la persona que te esté sirviendo.",
  },
  {
    titulo: "Check out de Duranta",
    texto:
      "Te recomendamos hacer el check out de Duranta antes de venir a almorzar en Brizantha, para que no tengas que volver por las maletas.",
  },
  {
    titulo: "Cualquier duda",
    texto:
      "Déjalo saber en la recepción del hotel donde te estés hospedando para que puedan ayudarte.",
  },
] as const;
