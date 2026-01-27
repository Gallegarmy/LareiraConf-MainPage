import type { Speaker } from "./speakers-types";
import { type Locale, useTranslations } from "@/i18n/utils";
import MiduImage from "@img/speakers/Midu-x64.png";
import MiduRealImage from "@img/speakers/Midu-real.png";
import SamuelImage from "@img/speakers/Samuel-x64.png";
import SamuelRealImage from "@img/speakers/Samuel-real.JPG";
import AlmudenaImage from "@img/speakers/Almudena-x64.png";
import AlmudenaRealImage from "@img/speakers/Almudena-real.png";
import BorjaImage from "@img/speakers/Borja-x64.png";
import BorjaRealImage from "@img/speakers/Borja-real.jpg";
import AntonioImage from "@img/speakers/Antonio-x64.png";
import AntonioRealImage from "@img/speakers/Antonio-real.jpg";
import PilarImage from "@img/speakers/Pilar-x64.png";
import PilarRealImage from "@img/speakers/Pilar-real.JPG";
import CristinaImage from "@img/speakers/Cristina-x64.png";
import CristinaRealImage from "@img/speakers/Cristina-real.jpeg";
import DiegoImage from "@img/speakers/Diego-x64.png";
import DiegoRealImage from "@img/speakers/Diego-real.webp";
import NachoImage from "@img/speakers/Nacho-x64.png";
import NachoRealImage from "@img/speakers/Nacho-real.png";
import NereaImage from "@img/speakers/Nerea-x64.png";
import NereaRealImage from "@img/speakers/Nerea-real.jpg";
import EvaImage from "@img/speakers/Eva-x64.png";
import EvaRealImage from "@img/speakers/Eva-real.png";
import BraisImage from "@img/speakers/Brais-x64.png";
import BraisRealImage from "@img/speakers/Brais-real.jpg";

export function getSpeakersData(locale: Locale): Speaker[] {
  const t = useTranslations(locale);
  const speakersData = t("speakers.data");

  return [
    {
      id: "miguel-angel-duran",
      name: "Miguel Ángel Durán",
      talkTitle: speakersData["miguel-angel-duran"].talkTitle,
      talkDescription: speakersData["miguel-angel-duran"].talkDescription,
      talkFormat: "charla",
      tag: "Programación",
      role: speakersData["miguel-angel-duran"].role,
      company: "midudev",
      summary: speakersData["miguel-angel-duran"].summary,
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
      id: "nerea-luis",
      name: "Nerea Luis",
      talkTitle: speakersData["nerea-luis"].talkTitle,
      talkDescription: speakersData["nerea-luis"].talkDescription,
      talkFormat: "charla",
      tag: "IA",
      role: speakersData["nerea-luis"].role,
      company: "Lumi Labs",
      summary: speakersData["nerea-luis"].summary,
      image: { src: NereaImage.src, alt: "Retrato de Nerea Luis" },
      imageReal: {
        src: NereaRealImage.src,
        alt: "Fotografía de Nerea Luis",
      },
      socials: [
        { label: "X", url: "https://x.com/sailormerqury" },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/nerealuis/" },
      ],
      isRevealed: true,
    },
    {
      id: "antonio-fernandes-pilar-vila",
      name: "Antonio Fernandes & Pilar Vila",
      talkTitle: speakersData["antonio-fernandes-pilar-vila"].talkTitle,
      talkDescription:
        speakersData["antonio-fernandes-pilar-vila"].talkDescription,
      talkFormat: "charla",
      tag: "Ciberseguridad",
      role: speakersData["antonio-fernandes-pilar-vila"].role,
      summary: speakersData["antonio-fernandes-pilar-vila"].summary,
      image: { src: AntonioImage.src, alt: "Retrato de Antonio Fernandes" },
      socials: [],
      isRevealed: true,
      colSpan: 2,
      isMultiSpeaker: true,
      speakers: [
        {
          name: "Antonio Fernandes",
          role: speakersData["antonio-fernandes-pilar-vila"].speakers.antonio
            .role,
          summary:
            speakersData["antonio-fernandes-pilar-vila"].speakers.antonio
              .summary,
          image: { src: AntonioImage.src, alt: "Retrato de Antonio Fernandes" },
          imageReal: {
            src: AntonioRealImage.src,
            alt: "Fotografía de Antonio Fernandes",
          },
          socials: [
            {
              label: "LinkedIn",
              url: "https://www.linkedin.com/in/afernandesvigo/",
            },
            { label: "Web", url: "https://www.fernandes.es/" },
          ],
          flipImage: true,
        },
        {
          name: "Pilar Vila",
          role: speakersData["antonio-fernandes-pilar-vila"].speakers.pilar
            .role,
          company:
            speakersData["antonio-fernandes-pilar-vila"].speakers.pilar.company,
          summary:
            speakersData["antonio-fernandes-pilar-vila"].speakers.pilar.summary,
          image: { src: PilarImage.src, alt: "Retrato de Pilar Vila" },
          imageReal: {
            src: PilarRealImage.src,
            alt: "Fotografía de Pilar Vila",
          },
          socials: [
            {
              label: "LinkedIn",
              url: "https://www.linkedin.com/in/pilar-vila-forensicsec/",
            },
          ],
        },
      ],
    },
    {
      id: "borja-perez",
      name: "Borja Pérez",
      talkTitle: speakersData["borja-perez"].talkTitle,
      talkDescription: speakersData["borja-perez"].talkDescription,
      talkFormat: "taller",
      tag: "Empleabilidad",
      role: speakersData["borja-perez"].role,
      company: speakersData["borja-perez"].company,
      summary: speakersData["borja-perez"].summary,
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
      talkTitle: speakersData["almudena-barreiro"].talkTitle,
      talkDescription: speakersData["almudena-barreiro"].talkDescription,
      talkFormat: "charla",
      tag: "Datos",
      role: speakersData["almudena-barreiro"].role,
      company: speakersData["almudena-barreiro"].company,
      summary: speakersData["almudena-barreiro"].summary,
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
      name: "Cristina G. Aradas (Mapache)",
      talkTitle: speakersData["speaker-4"].talkTitle,
      talkDescription: speakersData["speaker-4"].talkDescription,
      talkFormat: "taller",
      tag: "Videojuegos",
      role: speakersData["speaker-4"].role,
      summary: speakersData["speaker-4"].summary,
      image: { src: CristinaImage.src, alt: "Retrato de Cristina G. Aradas" },
      imageReal: {
        src: CristinaRealImage.src,
        alt: "Fotografía de Cristina G. Aradas",
      },
      socials: [
        {
          label: "LinkedIn",
          url: "https://www.linkedin.com/in/cristina-garcía-aradas-074154135",
        },
      ],
      isRevealed: true,
      flipImage: true,
    },
    {
      id: "nacho-marquez",
      name: "Nacho Márquez",
      talkTitle: speakersData["nacho-marquez"].talkTitle,
      talkDescription: speakersData["nacho-marquez"].talkDescription,
      tag: "OSS",
      role: speakersData["nacho-marquez"].role,
      company: speakersData["nacho-marquez"].company,
      summary: speakersData["nacho-marquez"].summary,
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
      id: "eva-gonzalez-brais-calvo",
      name: "Eva González & Brais Calvo",
      talkTitle: speakersData["eva-gonzalez-brais-calvo"].talkTitle,
      talkDescription: speakersData["eva-gonzalez-brais-calvo"].talkDescription,
      talkFormat: "taller",
      tag: "Analítica",
      role: speakersData["eva-gonzalez-brais-calvo"].role,
      summary: speakersData["eva-gonzalez-brais-calvo"].summary,
      image: { src: EvaImage.src, alt: "Retrato de Eva González" },
      socials: [],
      isRevealed: true,
      colSpan: 2,
      isMultiSpeaker: true,
      speakers: [
        {
          name: "Eva González",
          role: speakersData["eva-gonzalez-brais-calvo"].speakers.eva.role,
          company:
            speakersData["eva-gonzalez-brais-calvo"].speakers.eva.company,
          summary:
            speakersData["eva-gonzalez-brais-calvo"].speakers.eva.summary,
          image: { src: EvaImage.src, alt: "Retrato de Eva González" },
          imageReal: {
            src: EvaRealImage.src,
            alt: "Fotografía de Eva González",
          },
          socials: [
            { label: "X", url: "https://x.com/evagvior" },
            {
              label: "LinkedIn",
              url: "https://www.linkedin.com/in/evamariagonzalez",
            },
          ],
        },
        {
          name: "Brais Calvo",
          role: speakersData["eva-gonzalez-brais-calvo"].speakers.brais.role,
          company:
            speakersData["eva-gonzalez-brais-calvo"].speakers.brais.company,
          summary:
            speakersData["eva-gonzalez-brais-calvo"].speakers.brais.summary,
          image: { src: BraisImage.src, alt: "Retrato de Brais Calvo" },
          imageReal: {
            src: BraisRealImage.src,
            alt: "Fotografía de Brais Calvo",
          },
          socials: [
            { label: "X", url: "https://x.com/braiscv" },
            {
              label: "LinkedIn",
              url: "https://www.linkedin.com/in/braiscalvo",
            },
            { label: "Web", url: "https://braiscalvo.com" },
          ],
        },
      ],
    },
    {
      id: "diego-marino",
      name: "Diego Mariño",
      talkTitle: speakersData["speaker-5"].talkTitle,
      talkDescription: speakersData["speaker-5"].talkDescription,
      tag: "Negocio",
      role: speakersData["speaker-5"].role,
      company: speakersData["speaker-5"].company,
      summary: speakersData["speaker-5"].summary,
      image: { src: DiegoImage.src, alt: "Retrato de Diego Mariño" },
      imageReal: {
        src: DiegoRealImage.src,
        alt: "Fotografía de Diego Mariño",
      },
      socials: [
        { label: "X", url: "https://x.com/diegomarino" },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/diegomarino" },
      ],
      isRevealed: true,
      flipImage: true,
    },
    {
      id: "samuel-jimenez",
      name: "Samuel Jiménez",
      talkTitle: speakersData["samuel-jimenez"].talkTitle,
      talkDescription: speakersData["samuel-jimenez"].talkDescription,
      talkFormat: "charla",
      tag: "IoT",
      role: speakersData["samuel-jimenez"].role,
      summary: speakersData["samuel-jimenez"].summary,
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
        {
          label: "LinkedIn",
          url: "https://www.linkedin.com/in/sjimenezromero",
        },
      ],
      isRevealed: true,
    },
  ];
}
