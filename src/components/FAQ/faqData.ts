export type FAQTextSegment = {
  text: string;
  em?: boolean;
  href?: string;
  external?: boolean;
};

export type FAQItem = {
  id: number;
  question: string;
  answer: FAQTextSegment[];
};

export const faqData: FAQItem[] = [
  {
    id: 1,
    question: "¿A quién está dirigida LareiraConf? ¿Es para mí?",
    answer: [
      {
        text: "A personas con curiosidad por la tecnología y la comunidad. Da igual si estás empezando o si tienes experiencia: es un evento pensado para aprender, compartir y conectar en un ambiente cercano. ",
      },
      {
        text: "Si te pica la curiosidad, seguramente este sea tu sitio.",
        em: true,
      },
    ],
  },
  {
    id: 2,
    question: "¿Qué tipo de contenido habrá durante el evento?",
    answer: [
      {
        text: "Habrá charlas sobre tecnología, entrevistas con referentes y actividades pensadas para conversar y compartir experiencias. El contenido está orientado a descubrir temas nuevos y conectar. ",
      },
      {
        text: "Aquí se viene a abrir la mente y a hablar con gente que sabe de lo suyo.",
        em: true,
      },
    ],
  },
  {
    id: 3,
    question: "¿Qué es la previa de LareiraConf y cómo funciona?",
    answer: [
      {
        text: "La previa es un encuentro social el viernes por la tarde para empezar a conocerse y entrar en el ambiente del evento. Habrá actividades y dinámicas para aprender y socializar. ",
      },
      {
        text: "La primera ronda corre de nuestra cuenta.",
        em: true,
      },
    ],
  },
  {
    id: 4,
    question: "¿Qué incluye la entrada?",
    answer: [
      {
        text: "Todas las entradas incluyen acceso al evento completo, la previa, charlas, actividades y espacios de comunidad, además de welcome pack, desayuno y comida. Las entradas de Guerrero y Paladín también incluyen acceso a la fiesta post-evento con cena. Puedes ver el detalle de cada entrada en la sección de ",
      },
      {
        text: "Entradas",
        href: "#tickets",
      },
      {
        text: ". ",
      },
      {
        text: "La resaca emocional no está incluida, pero la tendrás.",
        em: true,
      },
    ],
  },
  {
    id: 5,
    question: "Si mi empresa me paga la entrada, ¿podéis emitir factura?",
    answer: [
      {
        text: "Sí. Durante el proceso de compra podrás solicitar factura con los datos de tu empresa. Si tienes algún caso especial, puedes escribirnos y lo revisamos. ",
      }
    ],
  },
  {
    id: 6,
    question: "¿Pueden las empresas comprar entradas en bloque?",
    answer: [
      {
        text: "Sí. Si quieres comprar varias entradas, escríbenos a ",
      },
      {
        text: "info@lareiraconf.es",
        href: "mailto:info@lareiraconf.es",
      },
      {
        text: ". A partir de 5 entradas ofrecemos descuentos por volumen y te ayudamos con la gestión. ",
      },
      {
        text: "Para que gestionar entradas no sea otro marrón más.",
        em: true,
      },
    ],
  },
  {
    id: 7,
    question: "¿Cuándo y dónde se celebra LareiraConf? ¿Cómo puedo llegar?",
    answer: [
      {
        text: "El evento principal se celebra el día 21 de marzo en el ",
      },
      {
        text: "Rectorado de la UDC",
        href: "https://osm.org/go/b9lE1G7BY--?relation=11048863",
        external: true,
      },
      {
        text: ", en la calle Maestranza (A Coruña). Se puede llegar fácilmente a pie, en transporte público o en coche. ",
      },
      {
        text: "Llegar es fácil, marcharte te va a costar un poco más.",
        em: true,
      },
    ],
  },
  {
    id: 8,
    question: "¿Habrá comida o bebida durante el evento?",
    answer: [
      {
        text: "Sí. La entrada incluye desayuno y comida durante el evento. En la previa, la primera ronda corre de nuestra cuenta, y si tu entrada incluye acceso a la fiesta post-evento, también tendrás la cena incluida. Si tienes alguna necesidad alimentaria especial, puedes indicárnoslo durante el proceso de compra. ",
      },
      {
        text: "A ver dónde desayunas, comes y cenas por este precio… y además con espectáculo.",
        em: true,
      },
    ],
  },
  {
    id: 9,
    question: "Quiero colaborar con la Lareira, ¿cómo puedo hacerlo?",
    answer: [
      {
        text: "Si quieres patrocinar el evento, puedes consultar nuestro ",
      },
      {
        text: "dossier de patrocinio",
        href: "https://drive.google.com/file/d/1qAiU4k50GV9pbgfehwGJIA9ow2SCxUWh/view?usp=sharing",
        external: true,
      },
      {
        text: ". Si ofreces servicios o productos que puedan mejorar la experiencia, escríbenos a ",
      },
      {
        text: "info@lareiraconf.es",
        href: "mailto:info@lareiraconf.es",
      },
      {
        text: " y cuéntanos tu idea. Estamos abiertos a propuestas.",
      },
    ],
  },
  {
    id: 10,
    question: "Sigo teniendo dudas, ¿cómo puedo contactar con la organización?",
    answer: [
      {
        text: "Veo que mi ayuda no es suficiente…",
        em: true,
      },
      {
        text: " Puedes escribirnos a ",
      },
      {
        text: "info@lareiraconf.es",
        href: "mailto:info@lareiraconf.es",
      },
      {
        text: ". Estaremos encantados de resolverte cualquier duda.",
      },
    ],
  },
];
