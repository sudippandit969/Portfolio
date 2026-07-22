export interface Achievement {
  id: string;
  title: string;
  category: "Award" | "Publication" | "Hackathon" | "Recognition" | "Certification";
  organization: string;
  date: string;
  description: string;
  icon?: string;
  link?: string;
  badgeText?: string;
}

export const achievementsData: Achievement[] = [
  {
    id: "research-publication-award",
    title: "Published Peer-Reviewed Research Author",
    category: "Publication",
    organization: "Research Square",
    date: "2024",
    description: "Authored and published research paper titled 'Predictive Analytics and AI-Driven Decision Models in Computational Systems'.",
    badgeText: "Research Square DOI",
    link: "https://www.researchsquare.com/article/rs-9742959/v1"
  },
  {
    id: "smart-attendance-capstone",
    title: "Best Capstone System Innovation",
    category: "Award",
    organization: "Academic Engineering Symposium",
    date: "2024",
    description: "Awarded top honor for building an automated facial recognition attendance management platform using Django REST & OpenCV.",
    badgeText: "1st Place Innovation"
  },
  {
    id: "full-stack-excellence",
    title: "Full-Stack Development Hackathon Top Finalist",
    category: "Hackathon",
    organization: "National Developer Summit",
    date: "2023",
    description: "Designed and deployed a responsive Web App with real-time analytics in under 36 hours.",
    badgeText: "Top Finalist"
  },
  {
    id: "bi-data-analyst-badge",
    title: "Recognized Business Intelligence & Data Analyst",
    category: "Recognition",
    organization: "Analytics Society",
    date: "2023",
    description: "Recognized for expertise in Power BI dashboard design, statistical EDA, and multi-source ETL pipeline construction.",
    badgeText: "Certified Data Specialist"
  }
];
