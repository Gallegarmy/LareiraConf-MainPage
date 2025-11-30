import type { Speaker } from "./speakers-types";
import MoureImage from "@img/speakers/Moure.webp";
import ManriqueImage from "@img/speakers/Manrique.webp";
import CristinaImage from "@img/speakers/Cristina.webp";
import CarlaImage from "@img/speakers/Carla.webp";
import NestorImage from "@img/speakers/Nestor.webp";
import PabloImage from "@img/speakers/Pablo.webp";
import GodlikeImage from "@img/speakers/Godlike.webp";
import DavidImage from "@img/speakers/David.webp";

export const speakers: Speaker[] = [
  {
    id: "brais-moure",
    name: "Brais Moure",
    talkTitle: "15 consejos de senior que le daría a mi yo junior",
    role: "Ingeniero de software freelance y divulgador",
    summary:
      "MoureDev comparte cómo convertir la experiencia en aprendizaje práctico y accesible para la comunidad tech en castellano.",
    image: { src: MoureImage.src, alt: "Retrato de Brais Moure" },
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/braismoure" },
      { label: "Instagram", url: "https://www.instagram.com/mouredev" },
      { label: "X", url: "https://x.com/mouredev" },
    ],
  },
  {
    id: "jose-manrique",
    name: "José Manrique",
    talkTitle:
      "Nuestros primeros pasos poniendo en marcha una OSPO (Open Source Program Office)",
    role: "OSPO Manager · Inditex Tech",
    summary:
      "Comparte el arranque de una oficina de open source desde dentro de una corporación: políticas, cultura y comunidad.",
    image: { src: ManriqueImage.src, alt: "Retrato de José Manrique" },
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/jsmanrique" },
      { label: "X", url: "https://x.com/jsmanrique" },
      { label: "Bluesky", url: "https://jsmanrique.bsky.social" },
    ],
  },
  {
    id: "cristina-barreiro",
    name: "Cristina Barreiro (Saiku)",
    talkTitle: "De la idea al boceto: visualizando escenarios con Rainbow",
    role: "Programadora de videojuegos",
    summary:
      "Explora Rainbow, la herramienta que transforma formas básicas en entornos listos para tus concepts dentro de Unreal Engine.",
    image: { src: CristinaImage.src, alt: "Retrato de Cristina Barreiro" },
    socials: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/cristina-barreiro",
      },
      { label: "Bluesky", url: "https://cristinasaiku.bsky.social" },
    ],
  },
  {
    id: "carla-rodriguez",
    name: "Carla Rodríguez",
    talkTitle:
      "Descifrando los artículos científicos: una introducción esencial",
    role: "Frontend Developer · Sngular",
    summary:
      "Descompone la estructura de un paper para que cualquiera pueda orientarse en la escritura y lectura científica.",
    image: { src: CarlaImage.src, alt: "Retrato de Carla Rodríguez" },
    socials: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/carla-rodr%C3%ADguez-est%C3%A9vez-42b757243/",
      },
    ],
  },
  {
    id: "nestor-lopez",
    name: "Néstor López",
    talkTitle: "Rompiendo los límites de SQLite",
    role: "Software Architect · Zephyr Cloud",
    summary:
      "Presenta libSQL y cómo la comunidad está llevando SQLite a escenarios con replicación, vector search y WebAssembly.",
    image: { src: NestorImage.src, alt: "Retrato de Néstor López" },
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/nstlopez" },
      { label: "X", url: "https://x.com/nstlopez" },
    ],
  },
  {
    id: "pablo-pan",
    name: "Pablo Pan",
    talkTitle: "CI/CD: Pipelines sólidas en un mundo caótico",
    role: "DevOps Lead · DEUS",
    summary:
      "Propone prácticas realistas para mantener despliegues sanos cuando los incendios en producción son el pan de cada día.",
    image: { src: PabloImage.src, alt: "Retrato de Pablo Pan" },
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/pablo-pan-veira" },
      { label: "Instagram", url: "https://www.instagram.com/pablo.p.veira" },
      { label: "YouTube", url: "https://www.youtube.com/@PanDevOps" },
    ],
  },
  {
    id: "godlike",
    name: "Godlike",
    talkTitle: "3D minutos en el infierno",
    role: "Senior Principal Technical Support Engineer · Red Hat",
    summary:
      "Un viaje por los éxitos y fracasos de la impresión 3D FDM para sacar prototipos útiles sin caer en la desesperación.",
    image: { src: GodlikeImage.src, alt: "Retrato de Godlike" },
    socials: [{ label: "X", url: "https://x.com/godlike64" }],
  },
  {
    id: "david-bonilla",
    name: "David Bonilla",
    talkTitle: "Derribar marcos. Construir comunidad",
    role: "Co-fundador de Pétalo · Autor de la Bonilista",
    summary:
      "Reflexiona sobre qué hace real a una comunidad técnica y qué pasos dar para cuidarla desde Galicia hacia el mundo.",
    image: { src: DavidImage.src, alt: "Retrato de David Bonilla" },
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/dbonillaf" },
      { label: "Instagram", url: "https://www.instagram.com/dbonillaf" },
      { label: "Bluesky", url: "https://davidbonilla.bsky.social" },
    ],
  },
];
