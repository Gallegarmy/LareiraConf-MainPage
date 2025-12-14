import nachoImg from "@img/crew/Nacho.png";
import jesusImg from "@img/crew/Yisus.png";
import andreaImg from "@img/crew/Andrea.png";
import tiziImg from "@img/crew/Tizi.png";
import type { TeamMember } from "./team-types";

export const teamMembers: TeamMember[] = [
  {
    id: "nacho",
    name: "Nacho Espósito",
    role: "Forjador de Sistemas",
    bio: "Soy un apasionado de la tecnología y de arrancar ideas que parecen imposibles. Me gusta conectar piezas, construir cosas y convencer al resto de que sí, esto podemos hacerlo.",
    image: { src: nachoImg.src, alt: "Retrato pixel art de Nacho" },
    socials: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/ignacioespositobusto",
      },
    ],
  },
  {
    id: "andrea",
    name: "Andrea Magán",
    role: "Tejedora de Historias",
    bio: "Diseño con mimo, pico código y disfruto creando experiencias que conectan a la gente. En la Lareira cojo el micro, guío la aventura y mantengo el campamento encendido.",
    image: { src: andreaImg.src, alt: "Retrato pixel art de Andrea" },
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/andreamaganrey" },
    ],
  },
  {
    id: "yisus",
    name: "Jesús Pérez-Roca",
    role: "Maestro Cervecero Errante",
    bio: "Soy profesor y un habitual de casi cualquier evento tech en Galicia. Me encanta aprender, compartir y charlar con calma… especialmente si hay una cerveza por medio.",
    image: { src: jesusImg.src, alt: "Retrato pixel art de Yisus" },
    mirrored: true,
    socials: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/jesusperezrocafernandez",
      },
    ],
  },
  {
    id: "tizi",
    name: "Tiziana Amicarella",
    role: "Guardiana del Tesoro",
    bio: "Guardo el cofre, organizo el campamento y siempre busco una solución cuando algo se tuerce. Vengo del mundo más oscuro del código y encuentro la luz siendo la Swiftie oficial del grupo.",
    image: { src: tiziImg.src, alt: "Retrato pixel art de Tizi" },
    initials: "TZ",
    mirrored: true,
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/tizianaamica" },
    ],
  },
];
