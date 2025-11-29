import nachoImg from "@img/crew/Nacho.png";
import jesusImg from "@img/crew/Yisus.png";
import andreaImg from "@img/crew/Andrea.png";
import tiziImg from "@img/crew/Tizi.png";
import type { TeamMember } from "./team-types";

export const teamMembers: TeamMember[] = [
  {
    id: "nacho",
    name: "Nacho Espósito",
    role: "Founder · DevOps",
    bio: "Apasionado por la tecnología y el desarrollo de soluciones digitales. He ayudado a traer Sysarmy a Galicia. Es el culpable de que estemos aquí.",
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
    role: "Host · Frontend dev",
    bio: "Diseña experiencias con mimo y a también las programa. Lleva el micrófono y anima el campamento.",
    image: { src: andreaImg.src, alt: "Retrato pixel art de Andrea" },
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/andreamaganrey" },
    ],
  },
  {
    id: "yisus",
    name: "Jesús Pérez-Roca",
    role: "Beerworking · Profesor",
    bio: "Profesor experimentado. No se pierde un evento tech en Galicia y siempre está dispuesto a compartir una buena cerveza.",
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
    role: "Tesorera · Backend dev",
    bio: "Coordina y maneja las cuentas. Tanto te maneja una base de datos como te monta un evento. Swiftie hasta la médula.",
    image: { src: tiziImg.src, alt: "Retrato pixel art de Tizi" },
    initials: "TZ",
    mirrored: true,
    socials: [{ label: "LinkedIn", url: "https://www.linkedin.com" }],
  },
];
