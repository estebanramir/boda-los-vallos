/**
 * ────────────────────────────────────────────────────────────────
 *  TODO EL CONTENIDO DE LA PÁGINA VIVE AQUÍ.
 *  Para cambiar textos, horas o vestuario, edita solo este archivo.
 * ────────────────────────────────────────────────────────────────
 */

export const boda = {
  novia: "María Camila",
  noviaApellidos: "Espinosa Granados",
  novio: "Simón",
  novioApellidos: "Ramírez Pineda",

  fechaCorta: "25 · 26 · 27 de septiembre",
  anio: "2026",
  sede: "Brizantha Hotel Campestre",
  region: "Villavicencio, Meta",

  /** Arranque del fin de semana: viernes 25 sept 2026, 5:00pm (hora Colombia) */
  inicio: "2026-09-25T17:00:00-05:00",
  /** Ceremonia: sábado 26 sept 2026, 4:00pm */
  ceremonia: "2026-09-26T16:00:00-05:00",

  mapsBrizantha: "https://maps.google.com/?q=Brizantha+Hotel+Campestre+Villavicencio+Meta",
  mapsDuranta: "https://maps.google.com/?q=Duranta+Hotel+Campestre+Villavicencio+Meta",
} as const;

export const intro = {
  titulo: "Un fin de semana para celebrar nuestro amor",
  parrafos: [
    "Queremos que estos días sean una experiencia inolvidable, llena de momentos para compartir, disfrutar y celebrar juntos.",
    "Como nuestra boda comienza el viernes y termina el domingo, preparamos este itinerario para que tengan claridad sobre los horarios y puedan disfrutar cada actividad sin preocupaciones.",
  ],
  cierre: "¡Gracias por acompañarnos en este momento tan especial de nuestras vidas!",
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
  /** Una línea con lo esencial del día, para quien no quiera leer todo. */
  resumen: string;
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
    resumen: "Cóctel de bienvenida en la piscina de Brizantha, a partir de las 5:00 pm.",
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
    resumen: "La ceremonia es a las 4:00 pm en Brizantha. Entrada de invitados desde las 3:30 pm.",
    eventos: [
      {
        hora: "8:00 am — 10:00 am",
        titulo: "Desayuno",
        lugar: "Tu hotel",
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
    resumen: "Asado llanero a la 1:00 pm en Brizantha, con piscina abierta todo el día.",
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

/** Tomado de la invitación oficial. El domingo no venía especificado: es sugerencia. */
export const vestuario = [
  {
    dia: "Viernes",
    evento: "Cóctel de bienvenida",
    codigo: "Sin código",
    detalle:
      "Entendemos que llegas de viaje, por lo que te sugerimos usar ropa fresca y cómoda.",
    lineas: [],
  },
  {
    dia: "Sábado",
    evento: "Ceremonia y recepción",
    codigo: "Formal veraniego",
    detalle: "",
    lineas: [
      {
        quien: "Mujeres",
        texto:
          "Vestido largo formal unicolor. Se reserva el color blanco, verde y similares.",
      },
      {
        quien: "Hombres",
        texto: "Camisa de lino o guayabera blanca manga larga y pantalón claro.",
      },
    ],
  },
  {
    dia: "Domingo",
    evento: "Asado llanero",
    codigo: "Casual y fresco",
    detalle:
      "Ropa ligera y vestido de baño. La piscina está abierta todo el día, así que ven listo para quedarte.",
    lineas: [],
  },
] as const;

export const hoteles = [
  {
    nombre: "Brizantha",
    descripcion: "Sede del cóctel, la ceremonia, la recepción y el asado de despedida.",
    maps: boda.mapsBrizantha,
  },
  {
    nombre: "Duranta",
    descripcion:
      "El segundo hotel del fin de semana. Habrá conductores elegidos para llevarte de vuelta después de la fiesta.",
    maps: boda.mapsDuranta,
  },
] as const;

export const clima = {
  resumen:
    "Septiembre en el llano es cálido y húmedo, con sol fuerte al mediodía y aguaceros cortos en la tarde.",
  datos: [
    { etiqueta: "Temperatura", valor: "23° — 31°" },
    { etiqueta: "Ambiente", valor: "Húmedo" },
    { etiqueta: "Lluvia", valor: "Chubascos en la tarde" },
    { etiqueta: "Altura", valor: "467 m s. n. m." },
  ],
  empaca: [
    "Protector solar y repelente",
    "Sombrero o gorra para el sol del mediodía",
    "Vestido de baño y toalla ligera",
    "Una chaqueta delgada para la noche",
  ],
} as const;

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
