export type SpeakerSocial = {
  label: string;
  url: string;
};

export type SpeakerImage = {
  src: string;
  alt: string;
};

export type TalkFormat = "charla" | "entrevista" | "taller";

export type MultiSpeaker = {
  name: string;
  role: string;
  company?: string;
  summary: string;
  image: SpeakerImage;
  imageReal?: SpeakerImage;
  socials?: SpeakerSocial[];
};

export type Speaker = {
  id: string;
  name: string;
  talkTitle: string;
  talkDescription?: string;
  talkFormat?: TalkFormat; 
  tag: string;
  role: string;
  company?: string;
  summary: string;
  image: SpeakerImage;
  imageReal?: SpeakerImage; // Foto real para mostrar en el modal
  socials?: SpeakerSocial[];
  isRevealed?: boolean; // Si es false, se muestra como silueta sin interacción
  colSpan?: number; // Número de columnas que ocupa (1 por defecto, 2 para charlas conjuntas)
  isMultiSpeaker?: boolean; // Si es true, es una charla con múltiples ponentes
  speakers?: MultiSpeaker[]; // Array de ponentes para charlas conjuntas
};
