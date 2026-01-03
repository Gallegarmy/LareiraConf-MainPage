import type { Speaker } from "./speakers-types";
import MiduImage from "@img/speakers/Midu.png";
import MiduRealImage from "@img/speakers/Midu-real.png";
import SamuelImage from "@img/speakers/Samuel.png";
import AlmudenaImage from "@img/speakers/Almudena.png";
import CristinaImage from "@img/speakers/Cristina.png";
import DiegoImage from "@img/speakers/Diego.png";
import NachoImage from "@img/speakers/Nacho.png";
import NereaImage from "@img/speakers/Nerea.png";

export const speakers: Speaker[] = [
  {
    id: "miguel-angel-duran",
    name: "Miguel Ángel Durán (midudev)",
    talkTitle: "La programación ha muerto. ¡Larga vida a la programación!",
    talkDescription:
      "La programación no muere, solo se transforma. La IA ha llegado para quedarse, sacudiendo los cimientos del desarrollo de software y abriendo un abanico de oportunidades y nuevas tecnologías. Una web más inteligente, modelos LLM corriendo en tu navegador, nuevas APIs como WebGPU para exprimir tu tarjeta gráfica y formas inéditas de llevar la experiencia de usuario a otro nivel. Y todo, con ejemplos en vivo. Porque saber programar es lo que marcará la diferencia entre crear cosas increíbles o confiar ciegamente en que la IA nunca se equivoca. (spoiler: se equivoca).",
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
    id: "samuel-jimenez",
    name: "Samuel A. Jiménez",
    talkTitle: "Por confirmar",
    talkDescription: "Más información próximamente.",
    role: "Por confirmar",
    summary:
      "Ponente confirmado para Lareira Conf '26. Más información próximamente.",
    image: { src: SamuelImage.src, alt: "Retrato de Samuel A. Jiménez" },
    socials: [],
    isRevealed: true,
  },
  {
    id: "speaker-3",
    name: "Almudena García Jurado-Centurión",
    talkTitle: "Por confirmar",
    talkDescription: "Más información próximamente.",
    role: "Por confirmar",
    summary:
      "Ponente confirmado para Lareira Conf '26. Más información próximamente.",
    image: {
      src: AlmudenaImage.src,
      alt: "Retrato de Almudena García Jurado-Centurión",
    },
    socials: [],
    isRevealed: false,
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
    name: "Diego Rodríguez",
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
    id: "speaker-6",
    name: "Nacho",
    talkTitle: "Por confirmar",
    talkDescription: "Más información próximamente.",
    role: "Por confirmar",
    summary:
      "Ponente confirmado para Lareira Conf '26. Más información próximamente.",
    image: { src: NachoImage.src, alt: "Retrato de Nacho" },
    socials: [],
    isRevealed: false,
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
    id: "speaker-8",
    name: "Ponente por confirmar",
    talkTitle: "Por confirmar",
    talkDescription: "Más información próximamente.",
    role: "Por confirmar",
    summary:
      "Ponente confirmado para Lareira Conf '26. Más información próximamente.",
    image: { src: SamuelImage.src, alt: "Retrato de ponente" },
    socials: [],
    isRevealed: false,
  },
  {
    id: "speaker-9",
    name: "Ponente por confirmar",
    talkTitle: "Por confirmar",
    talkDescription: "Más información próximamente.",
    role: "Por confirmar",
    summary:
      "Ponente confirmado para Lareira Conf '26. Más información próximamente.",
    image: { src: MiduImage.src, alt: "Retrato de ponente" },
    socials: [],
    isRevealed: false,
  },
  {
    id: "speaker-10",
    name: "Ponente por confirmar",
    talkTitle: "Por confirmar",
    talkDescription: "Más información próximamente.",
    role: "Por confirmar",
    summary:
      "Ponente confirmado para Lareira Conf '26. Más información próximamente.",
    image: { src: SamuelImage.src, alt: "Retrato de ponente" },
    socials: [],
    isRevealed: false,
  },
  {
    id: "speaker-11",
    name: "Ponente por confirmar",
    talkTitle: "Por confirmar",
    talkDescription: "Más información próximamente.",
    role: "Por confirmar",
    summary:
      "Ponente confirmado para Lareira Conf '26. Más información próximamente.",
    image: { src: MiduImage.src, alt: "Retrato de ponente" },
    socials: [],
    isRevealed: false,
  },
  {
    id: "speaker-12",
    name: "Ponente por confirmar",
    talkTitle: "Por confirmar",
    talkDescription: "Más información próximamente.",
    role: "Por confirmar",
    summary:
      "Ponente confirmado para Lareira Conf '26. Más información próximamente.",
    image: { src: SamuelImage.src, alt: "Retrato de ponente" },
    socials: [],
    isRevealed: false,
  },
];
