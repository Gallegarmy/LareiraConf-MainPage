import nextdigitalLogo from "@img/sponsors/nextdigital.svg";
import accentureLogo from "@img/sponsors/accenture.svg";
import nttdataLogo from "@img/sponsors/nttdata.svg";

export interface JobOffer {
  id: string;
  company: string;
  logo: string;
  title: string;
  location: string;
  modality: "remoto" | "presencial" | "híbrido";
  description: string;
  requirements: string[];
  benefits?: string[];
  applyUrl: string;
  applyLabel: string;
}

export const jobOffers: JobOffer[] = [
  {
    id: "denodo-data-engineer",
    company: "NextDigital",
    logo: nextdigitalLogo.src,
    title: "Data Engineer",
    location: "España",
    modality: "remoto",
    description:
      "Buscamos a una persona con al menos 3 años de experiencia diseñando y desarrollando pipelines de datos en procesos ETL, con autonomía, iniciativa y capacidad para comunicarse eficazmente con el cliente. Valoramos experiencia con Airflow, dbt y AWS. Python y SQL imprescindibles.",
    requirements: [
      "Tu experiencia con Python y SQL. Porque podrás aportar valor desde el primer día.",
      "Conocimientos en Airflow, DBT o Spark. No hace falta dominarlos todos, pero sí sentirte cómodo/a en entornos de datos modernos.",
      "Tu visión cloud. Especialmente con AWS o Azure, para que puedas acompañar la evolución del stack.",
      "Curiosidad y ganas de aprender. Si eres de quienes siempre está probando herramientas nuevas, encajarás perfectamente.",
      "Responsabilidad y autonomía. Nos gusta confiar y que cada persona lidere su trabajo.",
    ],
    benefits: [
      "Flexibilidad horaria: trabajo 100% en remoto con horario ajustable. Jornada intensiva en julio, agosto y viernes.",
      "Aprende cada día: meetups, certificaciones pagadas, asistencia a eventos de programación y clases de inglés para todos los niveles.",
      "Retribución flexible: tarjeta restaurante, transporte, cheque guardería, seguro médico e internet.",
      "Wellhub o seguro médico como beneficio extra para cuidar cuerpo y mente.",
      "23 días de vacaciones, festivos regionales y una semana libre en Navidad. Un día adicional por cada dos años en Next.",
      "Eventos informales y Team Building para conocernos mejor y divertirnos.",
    ],
    applyUrl: "https://www.linkedin.com/jobs/view/4362030720",
    applyLabel: "Aplicar",
  },
  {
    id: "nextdigital-fullstack",
    company: "NextDigital",
    logo: nextdigitalLogo.src,
    title: "Fullstack Developer",
    location: "España",
    modality: "remoto",
    description:
      "Buscamos una persona con al menos 3 años de experiencia como Fullstack: con experiencia y pasión por el desarrollo de software de alta calidad. Este rol es ideal para alguien que disfruta trabajar tanto en el frontend como en el backend y que esté comprometido con la creación de experiencias de usuario excepcionales.",
    requirements: [
      "Experiencia mínima de 3 años en desarrollo Fullstack.",
      "Dominio de JavaScript y frameworks modernos como React, Angular o Vue.",
      "Experiencia en desarrollo backend con Node.js o Java - SpringBoot.",
      "Conocimientos sólidos de bases de datos SQL y NoSQL.",
      "Familiaridad con metodologías ágiles y herramientas de control de versiones como Git.",
      "Conocimientos de buenas prácticas, testing, metodología TDD y patrones de diseño como arquitectura hexagonal.",
    ],
    benefits: [
      "Flexibilidad horaria: trabajo 100% en remoto con horario ajustable. Jornada intensiva en julio, agosto y viernes.",
      "Aprende cada día: meetups, certificaciones pagadas, asistencia a eventos de programación y clases de inglés para todos los niveles.",
      "Retribución flexible: tarjeta restaurante, transporte, cheque guardería, seguro médico e internet.",
      "Wellhub o seguro médico como beneficio extra para cuidar cuerpo y mente.",
      "23 días de vacaciones, festivos regionales y una semana libre en Navidad. Un día adicional por cada dos años en Next.",
      "Eventos informales y Team Building para conocernos mejor y divertirnos.",
    ],
    applyUrl: "mailto:talento@nextdigital.es?subject=CV Fullstack developer - LareiraConf",
    applyLabel: "Aplicar",
  },
  {
    id: "nttdata-lareira",
    company: "NTT DATA",
    logo: nttdataLogo.src,
    title: "¡Queremos contar contigo!",
    location: "A Coruña",
    modality: "presencial",
    description:
      "Estamos en el Lareira Conf el viernes y sábado 20 y 21 de marzo. Un evento tech diseñado para apasionados de la tecnología, comunidades técnicas, estudiantes, desarrolladores y profesionales del sector IT. Un espacio para aprender, compartir y conectar. En NTT DATA apostamos por personas con motivación y ganas de crecimiento profesional.",
    requirements: [
      "Motivación y ganas de crecer profesionalmente en el sector IT.",
      "Interés por la tecnología, la innovación y el trabajo en equipo.",
      "Estudiantes, junior o perfiles con experiencia: todos son bienvenidos.",
    ],
    applyUrl: "https://careers.emeal.nttdata.com/s/evento/a06KA000002Xd0bYAC/lareira-conf?language=es",
    applyLabel: "Registrarme en el portal",
  },
  {
    id: "accenture-data-ai",
    company: "Accenture",
    logo: accentureLogo.src,
    title: "Data, Analytics & AI – Perfiles Tecnológicos",
    location: "A Coruña",
    modality: "híbrido",
    description:
      "En Accenture seguimos creciendo y buscamos perfiles tecnológicos para nuestros equipos de Data, Analytics e Inteligencia Artificial en A Coruña. Trabajamos en proyectos de transformación digital para grandes clientes, combinando datos, cloud, analítica avanzada, marketing technology e IA generativa, en un entorno colaborativo y con impacto real en negocio. Buscamos perfiles de distintos niveles de seniority, desde junior hasta senior/lead.",
    requirements: [
      "Experiencia o interés en Data & Big Data.",
      "Conocimientos de plataformas cloud: AWS, Azure o GCP.",
      "Analytics & BI: visualización y análisis de datos.",
      "Marketing Automation & CDP.",
      "IA, GenAI, LLMs y RAG.",
    ],
    applyUrl: "https://accenture.wd103.myworkdayjobs.com/es/AccentureCareers/job/A-Coruna-Canton-Grande/Data--Analytics---AI---Perfiles-Tecnolgicos--A-Corua-_R00313357",
    applyLabel: "Aplicar",
  },
];
