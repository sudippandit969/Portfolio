export interface SiteConfig {
  name: string;
  title: string;
  subtitles: string[];
  bio: string;
  detailedBio: string[];
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  contact: {
    email: string;
    phone?: string;
    locationString: string;
  };
  resumeUrl: string;
  profileImage: string;
  adminPin: string;
  stats: {
    label: string;
    value: string;
    description: string;
  }[];
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    description: string;
    siteUrl: string;
    ogImage: string;
    keywords: string[];
  };
}

export const siteConfig: SiteConfig = {
  name: "Sudip Pandit",
  title: "Software Engineer & AI Developer | Python, Cloud & Data Analytics",
  subtitles: [
    "Software Engineer",
    "Full Stack Python Developer",
    "Cloud & AWS Enthusiast",
    "Data Analyst & BI Developer",
    "AI & Machine Learning Researcher"
  ],
  bio: "Motivated Graduate Software Engineer & Data Analyst skilled in Python, Full Stack Web Architecture, AWS Cloud, Data Analytics, and AI Research.",
  detailedBio: [
    "I am a passionate Graduate Software Engineer and Data Analyst with a solid foundation in Computer Science, Full Stack Web Development, Cloud Computing, and Applied AI.",
    "Leveraging strong technical skills in Python, Django REST Framework, React, SQL databases, AWS Cloud services, and Data Analytics tools (Power BI, Pandas, NumPy), I build clean, production-grade applications, automated API pipelines, and interactive business intelligence dashboards.",
    "As an active researcher with a published peer-reviewed paper on Research Square, I thrive on solving complex computational challenges, writing clean code, and adapting rapidly to modern engineering environments."
  ],
  location: {
    address: "Paschim Medinipur",
    city: "Paschim Medinipur",
    state: "West Bengal",
    pincode: "721426",
    country: "India"
  },
  contact: {
    email: "sudippandit969@gmail.com",
    locationString: "Paschim Medinipur, West Bengal, 721426, India"
  },
  resumeUrl: "/resume.pdf",
  profileImage: "/profile.jpg",
  adminPin: "721426",
  stats: [
    { label: "Projects Completed", value: "7+", description: "Production & Academic builds" },
    { label: "Research Papers", value: "1", description: "Peer-reviewed publication" },
    { label: "Certifications", value: "5+", description: "Cloud, ML & Web Stack" },
    { label: "Technologies", value: "25+", description: "Languages, DBs & Tools" }
  ],
  seo: {
    defaultTitle: "Sudip Pandit | Software Engineer, Cloud & Data Analytics Specialist",
    titleTemplate: "%s | Sudip Pandit",
    description: "Personal Portfolio of Sudip Pandit - Graduate Software Engineer, Full Stack Python Developer, Cloud Enthusiast, and Data Analytics Specialist.",
    siteUrl: "https://sudip-pandit-portfolio.vercel.app",
    ogImage: "/profile.jpg",
    keywords: [
      "Sudip Pandit",
      "Software Engineer Fresher",
      "Full Stack Developer",
      "Python Developer",
      "Django Developer",
      "Cloud AWS Engineer",
      "Data Analyst",
      "Business Intelligence",
      "React Developer",
      "Machine Learning Research",
      "Paschim Medinipur"
    ]
  }
};
