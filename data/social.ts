export interface SocialLink {
  name: string;
  url: string;
  icon: string; // Lucide / React-icon identifier
  username?: string;
  description: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/sudippandit969",
    icon: "Github",
    username: "@sudippandit969",
    description: "Explore open-source projects, algorithms, and full-stack repositories."
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/sudip-pandit-100969261/",
    icon: "Linkedin",
    username: "sudip-pandit-100969261",
    description: "Connect professionally, view experience updates, and network."
  },
  {
    name: "Research Paper",
    url: "https://www.researchsquare.com/article/rs-9742959/v1",
    icon: "FileText",
    username: "Research Square",
    description: "Peer-reviewed research publication on predictive analytics and AI."
  },
  {
    name: "Email",
    url: "mailto:sudippandit969@gmail.com",
    icon: "Mail",
    username: "sudippandit969@gmail.com",
    description: "Direct email contact for project collaborations & employment."
  }
];
