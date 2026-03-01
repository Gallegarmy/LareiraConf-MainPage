import integraLogo from "@img/collaborators/integra.svg";
import adanLogo from "@img/collaborators/adan.svg";
import malteLogo from "@img/collaborators/malte.svg";
import udcLogo from "@img/collaborators/udc.svg";
import grupoBillinghamLogo from "@img/collaborators/grupo-billingham.svg";
import freakGzmLogo from "@img/collaborators/freak-gzm.svg";
import nessLogo from "@img/collaborators/ness.svg";
import sirviendoCodigoLogo from "@img/collaborators/sirviendo-codigo.svg";

export interface Collaborator {
  id: string;
  name: string;
  url: string;
  logo: string;
  alt: string;
}

// Para sustituir un logo placeholder por el real:
// 1. Pon el archivo en src/img/collaborators/
// 2. Actualiza el import correspondiente arriba

export const collaborators: Collaborator[] = [
  {
    id: "integra",
    name: "Integra",
    url: "https://integra.es",
    logo: integraLogo.src,
    alt: "Logo de Integra",
  },
  {
    id: "adan",
    name: "Adan",
    url: "https://adan.es",
    logo: adanLogo.src,
    alt: "Logo de Adan",
  },
  {
    id: "malte",
    name: "Malte",
    url: "https://malte.es",
    logo: malteLogo.src,
    alt: "Logo de Malte",
  },
  {
    id: "udc",
    name: "UDC",
    url: "https://udc.es",
    logo: udcLogo.src,
    alt: "Logo de UDC",
  },
  {
    id: "grupo-billingham",
    name: "Grupo Billingham",
    url: "https://grupobillingham.com",
    logo: grupoBillinghamLogo.src,
    alt: "Logo de Grupo Billingham",
  },
  {
    id: "freak-gzm",
    name: "Freak GZM",
    url: "https://freakgzm.com",
    logo: freakGzmLogo.src,
    alt: "Logo de Freak GZM",
  },
  {
    id: "ness",
    name: "Ness",
    url: "https://ness.com",
    logo: nessLogo.src,
    alt: "Logo de Ness",
  },
  {
    id: "sirviendo-codigo",
    name: "Sirviendo código",
    url: "https://sirviendocodigo.com",
    logo: sirviendoCodigoLogo.src,
    alt: "Logo de Sirviendo código",
  },
];
