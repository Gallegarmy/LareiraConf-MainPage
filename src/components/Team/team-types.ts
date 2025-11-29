export type SocialLink = {
  label: string;
  url: string;
};

export type TeamMemberImage = {
  src: string;
  alt: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: TeamMemberImage;
  initials?: string;
  mirrored?: boolean;
  socials: SocialLink[];
};
