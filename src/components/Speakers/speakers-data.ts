import type { Speaker } from "./speakers-types";
import MiduImage from "@img/speakers/Midu-x64.png";
import MiduRealImage from "@img/speakers/Midu-real.png";
import SamuelImage from "@img/speakers/Samuel-x64.png";
import SamuelRealImage from "@img/speakers/Samuel-real.JPG";
import AlmudenaImage from "@img/speakers/Almudena-x64.png";
import AlmudenaRealImage from "@img/speakers/Almudena-real.png";
import BorjaImage from "@img/speakers/Borja-x64.png";
import BorjaRealImage from "@img/speakers/Borja-real.jpg";
import AntonioImage from "@img/speakers/Antonio-x64.png";
import PilarImage from "@img/speakers/Pilar-x64.png";
import CristinaImage from "@img/speakers/Cristina-x64.png";
import DiegoImage from "@img/speakers/Diego-x64.png";
import NachoImage from "@img/speakers/Nacho-x64.png";
import NachoRealImage from "@img/speakers/Nacho-real.png";
import NereaImage from "@img/speakers/Nerea-x64.png";

export const speakers: Speaker[] = [
  {
    id: "miguel-angel-duran",
    name: "Miguel Ángel Durán (midudev)",
    talkTitle: "La programación ha muerto. ¡Larga vida a la programación!",
    talkDescription:
      "La programación no muere, solo se transforma. La IA ha llegado para quedarse, sacudiendo los cimientos del desarrollo de software y abriendo un abanico de oportunidades y nuevas tecnologías. Una web más inteligente, modelos LLM corriendo en tu navegador, nuevas APIs como WebGPU para exprimir tu tarjeta gráfica y formas inéditas de llevar la experiencia de usuario a otro nivel. Y todo, con ejemplos en vivo. Porque saber programar es lo que marcará la diferencia entre crear cosas increíbles o confiar ciegamente en que la IA nunca se equivoca. (spoiler: se equivoca).",
    talkFormat: "charla",
    role: "Creador de contenido y divulgador en programación",
    summary:
      "Miguel Ángel Durán, conocido como midudev, es desarrollador de software y divulgador con más de 17 años de experiencia. Creador de contenido sobre programación, JavaScript e inteligencia artificial, organiza conferencias y proyectos educativos para miles de desarrolladores en habla hispana.",
    image: { src: MiduImage.src, alt: "Retrato de Miguel Ángel Durán" },
    imageReal: {
      src: MiduRealImage.src,
      alt: "Fotografía de Miguel Ángel Durán",
    },
    socials: [
      { label: "X", url: "https://x.com/midudev" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/midudev" },
      { label: "Instagram", url: "https://www.instagram.com/midu.dev" },
    ],
    isRevealed: true,
  },
  {
    id: "speaker-7",
    name: "Nerea Luis",
    talkTitle: "Por confirmar",
    talkDescription: "Más información próximamente.",
    role: "Por confirmar",
    summary:
      "Ponente confirmado para Lareira Conf '26. Más información próximamente.",
    image: { src: NereaImage.src, alt: "Retrato de Nerea Luis" },
    socials: [],
    isRevealed: false,
  },
  {
    id: "antonio-fernandes-pilar-vila",
    name: "Antonio Fernandes & Pilar Vila",
    talkTitle: "Ciberseguridad",
    talkDescription: "Más información próximamente.",
    talkFormat: "charla",
    role: "Por confirmar",
    summary: "Charla conjunta sobre ciberseguridad.",
    image: { src: AntonioImage.src, alt: "Retrato de Antonio Fernandes" },
    socials: [],
    isRevealed: true,
    colSpan: 2,
    isMultiSpeaker: true,
    speakers: [
      {
        name: "Antonio Fernandes",
        role: "Por confirmar",
        summary:
          "Ponente confirmado para Lareira Conf '26. Más información próximamente.",
        image: { src: AntonioImage.src, alt: "Retrato de Antonio Fernandes" },
        socials: [],
      },
      {
        name: "Pilar Vila",
        role: "Por confirmar",
        summary:
          "Ponente confirmado para Lareira Conf '26. Más información próximamente.",
        image: { src: PilarImage.src, alt: "Retrato de Pilar Vila" },
        socials: [],
      },
    ],
  },
  {
    id: "borja-perez",
    name: "Borja Pérez",
    talkTitle: "Recruiting",
    talkDescription: "Más información próximamente.",
    talkFormat: "charla",
    role: "Community & Marketing Lead",
    company: "Manfred",
    summary: "Comunicación, recruiting y sobre todo, ayudar a la gente.",
    image: { src: BorjaImage.src, alt: "Retrato de Borja Pérez" },
    imageReal: {
      src: BorjaRealImage.src,
      alt: "Fotografía de Borja Pérez",
    },
    socials: [
      { label: "X", url: "https://x.com/borjaperfra" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/borjaperfra/" },
    ],
    isRevealed: true,
  },
  {
    id: "almudena-barreiro",
    name: "Almudena Barreiro",
    talkTitle: "Cómo usar los datos & nómada digital",
    talkDescription: "Más información próximamente.",
    talkFormat: "charla",
    role: "Científica de datos",
    company: "Next Digital y Data for Good Madrid",
    summary:
      "Almudena Barreiro es cofundadora de Data for Good Madrid y consultora/científica de datos en Next Digital, donde lidera proyectos de calidad del dato, analítica predictiva e IA responsable. Combina formación en matemáticas y estadística con un fuerte enfoque ético (equidad, transparencia y dignidad humana) y colabora en Sesgo404 (Sirviendo Código) divulgando sobre el impacto social de la IA.",
    image: {
      src: AlmudenaImage.src,
      alt: "Retrato de Almudena Barreiro",
    },
    imageReal: {
      src: AlmudenaRealImage.src,
      alt: "Fotografía de Almudena Barreiro",
    },
    socials: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/almudena-barreiro/",
      },
    ],
    isRevealed: true,
  },
  {
    id: "speaker-4",
    name: "Cristina Rodríguez",
    talkTitle: "Por confirmar",
    talkDescription: "Más información próximamente.",
    role: "Por confirmar",
    summary:
      "Ponente confirmado para Lareira Conf '26. Más información próximamente.",
    image: { src: CristinaImage.src, alt: "Retrato de Cristina Rodríguez" },
    socials: [],
    isRevealed: false,
  },
  {
    id: "speaker-5",
    name: "Diego Mariño",
    talkTitle: "Por confirmar",
    talkDescription: "Más información próximamente.",
    role: "Por confirmar",
    summary:
      "Ponente confirmado para Lareira Conf '26. Más información próximamente.",
    image: { src: DiegoImage.src, alt: "Retrato de Diego Rodríguez" },
    socials: [],
    isRevealed: false,
  },
  {
    id: "eva-gonzalez-brais-calvo",
    name: "Eva González & Brais Calvo",
    talkTitle: "Taller conjunto",
    talkDescription: "Más información próximamente.",
    talkFormat: "taller",
    role: "Por confirmar",
    summary: "Taller conjunto.",
    image: { src: CristinaImage.src, alt: "Retrato de Eva González" },
    socials: [],
    isRevealed: false,
    colSpan: 2,
    isMultiSpeaker: true,
    speakers: [
      {
        name: "Eva González",
        role: "Por confirmar",
        summary:
          "Ponente confirmado para Lareira Conf '26. Más información próximamente.",
        image: { src: CristinaImage.src, alt: "Retrato de Eva González" },
        socials: [],
      },
      {
        name: "Brais Calvo",
        role: "Por confirmar",
        summary:
          "Ponente confirmado para Lareira Conf '26. Más información próximamente.",
        image: { src: DiegoImage.src, alt: "Retrato de Brais Calvo" },
        socials: [],
      },
    ],
  },
  {
    id: "nacho-marquez",
    name: "Nacho Marquez",
    talkTitle: "Por confirmar",
    talkDescription: "Más información próximamente.",
    role: "Co-fundador",
    company: "Rural Hackers",
    summary:
      "Hola! Soy Nacho, cofundador de Rural Hackers: desde una aldea gallega de 97 habitantes convertimos el espíritu hacker en impacto real, juntamos talento, comunidad local e internacional con tecnología para luchar contra la despoblación rural. ¿Te animas a venirte a uno de nuestros proyectos?",
    image: { src: NachoImage.src, alt: "Retrato de Nacho Marquez" },
    imageReal: {
      src: NachoRealImage.src,
      alt: "Fotografía de Nacho Marquez",
    },
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/ruralhackers" },
    ],
    isRevealed: true,
  },
  {
    id: "samuel-jimenez",
    name: "Samuel Jiménez",
    talkTitle:
      "25 años de MQTT. Homenaje [sin PowerPoint] al protocolo de la IoT",
    talkDescription:
      "Los grandes protocolos nacen con el superpoder de la invisibilidad, y MQTT es uno de ellos. Está por todas partes: escondido en los ambientes más hostiles, viviendo meses con miliamperios, transmitiendo con anchos de banda de pocos kilobytes y cumpliendo con la misión de entregar y recibir mensajes a toda costa. Vamos a rendir homenaje a Andy Stanford-Clark y Arlen Nipper despellejando y destripando su creación para entender sus porqués de una buena vez, sin PowerPoint y en riguroso directo. Implementaciones anómalas, probablemente inútiles en la práctica, pero divertidas para aprender sin prejuicios. ¿Podrían ordenadores de hace 45 años, 8 bits y 64 Kilobytes de RAM ejecutar MQTT? ¿Os apetece comprobarlo?",
    talkFormat: "charla",
    role: "Arquitecto",
    summary:
      "Supe que sería ingeniero justo después de ver Juegos de Guerra, un clásico de los ochentas que todo informático de bien debería ver. Me encanta el cacharreo. Creo que es la mejor forma de aprender algo de verdad, porque te enseña a manejar la frustración y a gestionar recursos escasos. Una vez hecho esto, nada mejor que compartir lo que has aprendido para ser feliz.",
    image: { src: SamuelImage.src, alt: "Retrato de Samuel Jiménez" },
    imageReal: {
      src: SamuelRealImage.src,
      alt: "Fotografía de Samuel Jiménez",
    },
    socials: [
      {
        label: "BlueSky",
        url: "https://bsky.app/profile/emitdrop.bsky.social",
      },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/sjimenezromero" },
    ],
    isRevealed: true,
  },
];
