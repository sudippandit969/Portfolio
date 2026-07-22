export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  type: "Full-time" | "Contract" | "Internship" | "Freelance";
  startDate: string;
  endDate: string; // or "Present"
  description: string;
  responsibilities: string[];
  technologies: string[];
  highlights?: string[];
}

export const experienceData: Experience[] = [
  {
    id: "senior-software-engineer-bi",
    role: "Senior Software Engineer & Data Analytics Lead",
    company: "Tech Solutions / Analytics Lab",
    location: "India (Hybrid)",
    type: "Full-time",
    startDate: "2023",
    endDate: "Present",
    description: "Leading the design, development, and deployment of scalable full-stack web applications and enterprise business intelligence analytics systems.",
    responsibilities: [
      "Architected high-throughput Django REST APIs and PostgreSQL database schemas with sub-second response times.",
      "Engineered automated ETL pipelines and interactive Power BI / Looker dashboards for real-time executive KPI monitoring.",
      "Integrated machine learning predictive models for automated decision-making and pattern recognition.",
      "Mentored junior developers and instituted clean code standards, unit testing pipelines, and CI/CD workflows."
    ],
    technologies: ["Python", "Django", "Django REST Framework", "React.js", "PostgreSQL", "Power BI", "Scikit-learn", "Tailwind CSS", "Git"],
    highlights: [
      "Reduced API query execution times by 40% through database normalization (3NF) and indexing.",
      "Built automated reporting tools saving over 15 hours of manual analysis per week for stakeholders."
    ]
  },
  {
    id: "full-stack-python-developer",
    role: "Full Stack Python Developer",
    company: "Digital Innovations",
    location: "West Bengal, India",
    type: "Full-time",
    startDate: "2022",
    endDate: "2023",
    description: "Developed web portals, biometric security modules, and custom database integrations for organizational clients.",
    responsibilities: [
      "Developed responsive SPA frontends using React.js, HTML5, CSS3, and Tailwind CSS.",
      "Implemented JWT authentication, RBAC authorization, and secure endpoints for client applications.",
      "Utilized OpenCV and face recognition libraries to create automated attendance systems.",
      "Created complex Excel & Google Sheets automation scripts (Power Query, ARRAYFORMULA, VLOOKUP/XLOOKUP)."
    ],
    technologies: ["Python", "Django", "React.js", "OpenCV", "JavaScript", "SQL", "Excel", "Postman"],
    highlights: [
      "Successfully launched 10+ web applications with 99.9% uptime."
    ]
  }
];
