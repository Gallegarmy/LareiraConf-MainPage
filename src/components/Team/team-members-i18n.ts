import nachoImg from "@img/crew/Nacho.png";
import jesusImg from "@img/crew/Yisus.png";
import andreaImg from "@img/crew/Andrea.png";
import tiziImg from "@img/crew/Tizi.png";
import type { TeamMember } from "./team-types";
import { type Locale, useTranslations } from "@/i18n/utils";

export function getTeamMembers(locale: Locale): TeamMember[] {
  const t = useTranslations(locale);
  const members = t("team.members");

  return [
    {
      id: "nacho",
      name: "Nacho Espósito",
      role: members.nacho.role,
      bio: members.nacho.bio,
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
      role: members.andrea.role,
      bio: members.andrea.bio,
      image: { src: andreaImg.src, alt: "Retrato pixel art de Andrea" },
      socials: [
        {
          label: "LinkedIn",
          url: "https://www.linkedin.com/in/andreamaganrey",
        },
      ],
    },
    {
      id: "yisus",
      name: "Jesús Pérez-Roca",
      role: members.yisus.role,
      bio: members.yisus.bio,
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
      role: members.tizi.role,
      bio: members.tizi.bio,
      image: { src: tiziImg.src, alt: "Retrato pixel art de Tizi" },
      initials: "TZ",
      mirrored: true,
      socials: [
        { label: "LinkedIn", url: "https://www.linkedin.com/in/tizianaamica" },
      ],
    },
  ];
}
