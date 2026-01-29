import placeholderLogo from "@img/icons/shield.svg";

export interface Community {
  id: string;
  name: string;
  url: string;
  logo: string;
  alt: string;
}

export const communities: Community[] = [
  {
    id: "corunha-wtf",
    name: "CoruñaWTF",
    url: "https://corunhawtf.com",
    logo: placeholderLogo.src,
    alt: "Logo de CoruñaWTF",
  },
  {
    id: "sysarmy-galicia",
    name: "SysarmyGalicia",
    url: "https://sysarmy.com/es/",
    logo: placeholderLogo.src,
    alt: "Logo de SysarmyGalicia",
  },
  {
    id: "python-corunha",
    name: "Python Coruña",
    url: "https://www.meetup.com/python-coruna/",
    logo: placeholderLogo.src,
    alt: "Logo de Python Coruña",
  },
  {
    id: "gpul",
    name: "GPUL",
    url: "https://gpul.org/",
    logo: placeholderLogo.src,
    alt: "Logo de GPUL",
  },
  {
    id: "bricolabs",
    name: "Bricolabs",
    url: "https://bricolabs.cc/",
    logo: placeholderLogo.src,
    alt: "Logo de Bricolabs",
  },
  {
    id: "datola",
    name: "Datola",
    url: "https://datola.es/",
    logo: placeholderLogo.src,
    alt: "Logo de Datola",
  },
  {
    id: "wordpress",
    name: "WordPress Coruña",
    url: "https://www.meetup.com/wordpress-coruna/",
    logo: placeholderLogo.src,
    alt: "Logo de WordPress Coruña",
  },
  {
    id: "enxeneria-sen-fronteiras",
    name: "Enxeñería Sen Fronteiras",
    url: "https://esf-galicia.org/",
    logo: placeholderLogo.src,
    alt: "Logo de Enxeñería Sen Fronteiras",
  },
  {
    id: "corunha-jug",
    name: "CoruñaJUG",
    url: "https://www.meetup.com/coruna-jug/",
    logo: placeholderLogo.src,
    alt: "Logo de CoruñaJUG",
  },
  {
    id: "aquelarre-dixital",
    name: "Aquelarre Dixital",
    url: "https://aquelarredixital.gal/",
    logo: placeholderLogo.src,
    alt: "Logo de Aquelarre Dixital",
  },
];
