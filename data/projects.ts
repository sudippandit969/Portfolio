export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  technologies: string[];
  category: "Full Stack" | "AI & Machine Learning" | "Data Analytics & BI" | "Web Applications";
  projectImage: string;
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  status: "Completed" | "Ongoing";
  featured: boolean;
  date: string;
  tags: string[];
  keyFeatures?: string[];
}

export const projectsData: Project[] = [
  {
    id: "smart-attendance-system",
    title: "Smart Attendance System",
    shortDescription: "Facial recognition and AI-powered automated biometric attendance logging platform with real-time analytics.",
    detailedDescription: "An advanced automated attendance management system leveraging OpenCV, face recognition algorithms, and Django REST backend. Designed to streamline institutional classroom and organizational employee verification with anti-spoofing techniques, role-based access control (RBAC), and automated PDF reporting.",
    technologies: ["Python", "Django", "Django REST Framework", "OpenCV", "face-api.js", "React.js", "PostgreSQL", "Tailwind CSS"],
    category: "AI & Machine Learning",
    projectImage: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://smart-attendance-system-zmm8.onrender.com/",
    githubUrl: "https://github.com/sudippandit969",
    status: "Completed",
    featured: true,
    date: "2024",
    tags: ["AI", "Face Recognition", "Django", "React", "Biometrics"],
    keyFeatures: [
      "Real-time facial detection and feature vector comparison",
      "Automated attendance report generation (PDF & Excel format)",
      "Role-Based Access Control (Admin, Instructor, Student)",
      "JWT-authenticated secure REST API endpoints"
    ]
  },
  {
    id: "pet-rescue",
    title: "Pet Rescue Platform",
    shortDescription: "Full-stack pet adoption, rescue coordination, and animal welfare community platform.",
    detailedDescription: "A comprehensive web portal connecting pet adopters, animal rescue organizations, and veterinary clinics. Features interactive geolocation mapping, pet status tracking, adoption application workflows, and automated donor notification systems.",
    technologies: ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "MongoDB", "Node.js", "Vercel"],
    category: "Full Stack",
    projectImage: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://petrescue-seven.vercel.app/",
    githubUrl: "https://github.com/sudippandit969",
    status: "Completed",
    featured: true,
    date: "2024",
    tags: ["Adoption", "Full Stack", "React", "Next.js", "MongoDB"],
    keyFeatures: [
      "Interactive pet filter catalog by breed, age, and health status",
      "Streamlined digital adoption application process",
      "Emergency rescue incident reporting with pin dropping",
      "Community forum for foster parents and volunteers"
    ]
  },
  {
    id: "smart-recipe-book",
    title: "Smart Recipe Book",
    shortDescription: "AI-driven recipe suggestion and nutritional analytics engine based on available ingredients.",
    detailedDescription: "An intelligent culinary platform that recommends personalized recipes based on household ingredients, dietary restrictions, and caloric targets. Includes automated meal planning, shopping list generation, and step-by-step cooking instructions with nutritional breakdowns.",
    technologies: ["Python", "Django", "PostgreSQL", "React.js", "Tailwind CSS", "REST API", "Edamam API"],
    category: "Full Stack",
    projectImage: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://smart-recipe-book-1.onrender.com/",
    githubUrl: "https://github.com/sudippandit969",
    status: "Completed",
    featured: true,
    date: "2024",
    tags: ["Recipe AI", "Django", "React", "Nutritional Analytics"],
    keyFeatures: [
      "Ingredient-matching algorithm for minimal kitchen waste",
      "Nutritional analytics dashboard showing Macro/Micro stats",
      "Bookmarkable digital cookbook with offline cache support",
      "User-submitted recipe review and rating workflow"
    ]
  },
  {
    id: "bi-sales-predictive-analytics",
    title: "Business Intelligence Sales & Predictive Analytics",
    shortDescription: "Interactive Power BI & Python analytics suite forecasting sales trends, LTV, and customer churn.",
    detailedDescription: "Enterprise business intelligence dashboard analyzing multi-year retail datasets. Features automated ETL pipelines using Python Power Query, interactive Looker Studio visualizations, and time-series ARIMA predictive modeling to forecast quarterly revenues and optimize inventory levels.",
    technologies: ["Python", "Scikit-learn", "Power BI", "Looker Studio", "SQL", "Pandas", "NumPy", "Excel"],
    category: "Data Analytics & BI",
    projectImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/sudippandit969",
    status: "Completed",
    featured: true,
    date: "2024",
    tags: ["Power BI", "Data Analytics", "Predictive Modeling", "SQL"],
    keyFeatures: [
      "Customer Cohort Analysis & Lifetime Value (LTV) estimation",
      "Dynamic RFM (Recency, Frequency, Monetary) Segmentation",
      "ETL pipeline processing 100,000+ transactional records",
      "Automated executive dashboard reporting with KPI tracking"
    ]
  },
  {
    id: "e-commerce-rbac-backend",
    title: "Enterprise E-Commerce API with RBAC",
    shortDescription: "Robust Django REST Framework API with Role-Based Access Control, JWT authentication, and Payment Gateways.",
    detailedDescription: "High-performance backend API system supporting multi-vendor e-commerce operations. Built with strict 3NF relational PostgreSQL database schemas, Redis caching, Stripe/Razorpay webhook integrations, and comprehensive API documentation via Swagger/Postman.",
    technologies: ["Python", "Django REST Framework", "PostgreSQL", "JWT", "Redis", "Swagger", "Postman"],
    category: "Web Applications",
    projectImage: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/sudippandit969",
    status: "Completed",
    featured: false,
    date: "2023",
    tags: ["Django REST", "PostgreSQL", "RBAC", "JWT", "API"],
    keyFeatures: [
      "Granular permission matrix (SuperAdmin, Vendor, Customer)",
      "Automated order state machine and stock decrement locks",
      "Sub-100ms response time on key product search endpoints",
      "Postman test suites with 95%+ endpoint test coverage"
    ]
  }
];

export const projectCategories = [
  "All",
  "Full Stack",
  "AI & Machine Learning",
  "Data Analytics & BI",
  "Web Applications"
] as const;
