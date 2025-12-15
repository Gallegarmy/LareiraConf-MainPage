import type { Speaker } from "./speakers-types";
import MiduImage from "@img/speakers/Midu.png";
import SamuelImage from "@img/speakers/Samuel.png";

export const speakers: Speaker[] = [
  {
    id: "miguel-angel-duran",
    name: "Miguel Ángel Durán",
    talkTitle: "Por confirmar",
    role: "Desarrollador y creador de contenido",
    summary:
      "Midudev es uno de los referentes en la comunidad hispanohablante de desarrollo web, conocido por su pasión por enseñar y compartir conocimiento de forma clara y accesible.",
    image: { src: MiduImage.src, alt: "Retrato de Miguel Ángel Durán" },
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/midudev" },
      { label: "X", url: "https://x.com/midudev" },
      { label: "YouTube", url: "https://www.youtube.com/@midudev" },
    ],
  },
  {
    id: "samuel-jimenez",
    name: "Samuel A. Jiménez",
    talkTitle: "Por confirmar",
    role: "Por confirmar",
    summary:
      "Ponente confirmado para Lareira Conf '26. Más información próximamente.",
    image: { src: SamuelImage.src, alt: "Retrato de Samuel A. Jiménez" },
    socials: [],
  },
];
