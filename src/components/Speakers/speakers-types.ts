export type SpeakerSocial = {
  label: string;
  url: string;
};

export type SpeakerImage = {
  src: string;
  alt: string;
};

export type Speaker = {
  id: string;
  name: string;
  talkTitle: string;
  talkDescription?: string;
  role: string;
  summary: string;
  image: SpeakerImage;
  imageReal?: SpeakerImage; // Foto real para mostrar en el modal
  socials?: SpeakerSocial[];
  isRevealed?: boolean; // Si es false, se muestra como silueta sin interacción
};
