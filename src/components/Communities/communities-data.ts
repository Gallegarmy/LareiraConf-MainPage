import wtfLogo from "@img/communities/all_flag-wtf.png";
import sysarmyLogo from "@img/communities/all_flag-sysarmy.png";
import pythonLogo from "@img/communities/all_flag-python.png";
import gpulLogo from "@img/communities/all_flag-gpul.png";
import bricolabsLogo from "@img/communities/all_flag-bricolabs.png";
import datolaLogo from "@img/communities/all_flag-datola.png";
import wpLogo from "@img/communities/all_flag-wp.png";
import exfLogo from "@img/communities/all_flag-exf.png";
import jugLogo from "@img/communities/all_flag-jug.png";
import aquelarreLogo from "@img/communities/all_flag-aquelarre.png";
import gdgLogo from "@img/communities/all_flag-gdg.png";

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
    logo: wtfLogo.src,
    alt: "Logo de CoruñaWTF",
  },
  {
    id: "sysarmy-galicia",
    name: "SysarmyGalicia",
    url: "https://sysarmy.com/es/",
    logo: sysarmyLogo.src,
    alt: "Logo de SysarmyGalicia",
  },
  {
    id: "python-corunha",
    name: "Python Coruña",
    url: "https://www.meetup.com/python-coruna/",
    logo: pythonLogo.src,
    alt: "Logo de Python Coruña",
  },
  {
    id: "gpul",
    name: "GPUL",
    url: "https://gpul.org/",
    logo: gpulLogo.src,
    alt: "Logo de GPUL",
  },
  {
    id: "bricolabs",
    name: "Bricolabs",
    url: "https://bricolabs.cc/",
    logo: bricolabsLogo.src,
    alt: "Logo de Bricolabs",
  },
  {
    id: "datola",
    name: "Datola",
    url: "https://datola.es/",
    logo: datolaLogo.src,
    alt: "Logo de Datola",
  },
  {
    id: "wordpress",
    name: "WordPress Coruña",
    url: "https://www.meetup.com/wordpress-coruna/",
    logo: wpLogo.src,
    alt: "Logo de WordPress Coruña",
  },
  {
    id: "enxeneria-sen-fronteiras",
    name: "Enxeñería Sen Fronteiras",
    url: "https://esf-galicia.org/",
    logo: exfLogo.src,
    alt: "Logo de Enxeñería Sen Fronteiras",
  },
  {
    id: "corunha-jug",
    name: "CoruñaJUG",
    url: "https://www.meetup.com/coruna-jug/",
    logo: jugLogo.src,
    alt: "Logo de CoruñaJUG",
  },
  {
    id: "aquelarre-dixital",
    name: "Aquelarre Dixital",
    url: "https://aquelarredixital.gal/",
    logo: aquelarreLogo.src,
    alt: "Logo de Aquelarre Dixital",
  },
  {
    id: "gdg-corunha",
    name: "GDG Coruña",
    url: "https://gdg.community/gdg-coruna/",
    logo: gdgLogo.src,
    alt: "Logo de GDG Coruña",
  },
];
