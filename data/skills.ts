export interface Skill {
  name: string;
  level?: "Expert" | "Advanced" | "Proficient";
  iconName?: string;
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  category: string;
  description: string;
  skills: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    id: "programming-languages",
    category: "Programming Languages",
    description: "Core algorithms, data structures, and multi-paradigm software engineering.",
    skills: [
      { name: "Python", level: "Expert", highlight: true },
      { name: "SQL", level: "Expert", highlight: true },
      { name: "JavaScript", level: "Advanced", highlight: true },
      { name: "Java", level: "Proficient" },
      { name: "C", level: "Proficient" }
    ]
  },
  {
    id: "frontend-development",
    category: "Frontend Development",
    description: "Responsive, animated, accessible user interfaces and modern SPA architectures.",
    skills: [
      { name: "React.js", level: "Expert", highlight: true },
      { name: "HTML5", level: "Expert" },
      { name: "CSS3", level: "Expert" },
      { name: "Tailwind CSS", level: "Expert", highlight: true },
      { name: "Next.js", level: "Advanced", highlight: true },
      { name: "TypeScript", level: "Advanced" }
    ]
  },
  {
    id: "backend-development",
    category: "Backend Development",
    description: "High-concurrency APIs, microservices, authentication, and backend security.",
    skills: [
      { name: "Django", level: "Expert", highlight: true },
      { name: "Django REST Framework", level: "Expert", highlight: true },
      { name: "REST APIs", level: "Expert", highlight: true },
      { name: "JWT Authentication", level: "Advanced" },
      { name: "Role-Based Access Control (RBAC)", level: "Advanced" }
    ]
  },
  {
    id: "databases",
    category: "Databases",
    description: "Relational modeling, indexing, NoSQL collections, and 3NF database normalization.",
    skills: [
      { name: "PostgreSQL", level: "Expert", highlight: true },
      { name: "MongoDB", level: "Advanced" },
      { name: "SQLite", level: "Expert" },
      { name: "Django ORM", level: "Expert", highlight: true },
      { name: "Mongoose", level: "Advanced" },
      { name: "Relational Database Design", level: "Expert" },
      { name: "Database Normalization (3NF)", level: "Expert" }
    ]
  },
  {
    id: "data-analytics",
    category: "Data Analytics",
    description: "Exploratory data analysis, statistical modeling, ETL pipelines, and trend forecasting.",
    skills: [
      { name: "Data Cleaning", level: "Expert", highlight: true },
      { name: "Data Validation", level: "Expert" },
      { name: "Exploratory Data Analysis (EDA)", level: "Expert", highlight: true },
      { name: "Data Preprocessing", level: "Expert" },
      { name: "Statistical Analysis", level: "Advanced" },
      { name: "Trend Analysis", level: "Advanced" },
      { name: "Pattern Recognition", level: "Advanced" },
      { name: "Business Analytics", level: "Expert", highlight: true },
      { name: "KPI Analysis", level: "Expert" },
      { name: "Business Reporting", level: "Expert" },
      { name: "Dashboard Development", level: "Expert", highlight: true },
      { name: "Data Visualization", level: "Expert" },
      { name: "ETL", level: "Advanced" },
      { name: "Query Optimization", level: "Advanced" }
    ]
  },
  {
    id: "business-intelligence",
    category: "Business Intelligence",
    description: "Interactive visual analytics dashboards, executive KPIs, and data aggregation.",
    skills: [
      { name: "Power BI", level: "Expert", highlight: true },
      { name: "Looker Studio", level: "Advanced", highlight: true },
      { name: "Microsoft Excel", level: "Expert", highlight: true },
      { name: "Google Sheets", level: "Expert" }
    ]
  },
  {
    id: "excel-google-sheets",
    category: "Excel & Google Sheets",
    description: "Complex formulas, automated data transformation, Power Query, and reporting.",
    skills: [
      { name: "Pivot Tables", level: "Expert" },
      { name: "Pivot Charts", level: "Expert" },
      { name: "VLOOKUP", level: "Expert" },
      { name: "XLOOKUP", level: "Expert" },
      { name: "INDEX-MATCH", level: "Expert" },
      { name: "IF / SUMIF / SUMIFS / COUNTIF", level: "Expert" },
      { name: "Conditional Formatting", level: "Expert" },
      { name: "Power Query", level: "Advanced", highlight: true },
      { name: "QUERY & FILTER", level: "Expert" },
      { name: "ARRAYFORMULA", level: "Advanced" }
    ]
  },
  {
    id: "machine-learning-ai",
    category: "Machine Learning & AI",
    description: "Predictive analytics algorithms, computer vision, feature extraction, and model evaluation.",
    skills: [
      { name: "Scikit-learn", level: "Advanced", highlight: true },
      { name: "NumPy & Pandas", level: "Expert", highlight: true },
      { name: "TensorFlow.js", level: "Proficient" },
      { name: "face-api.js", level: "Advanced" },
      { name: "Decision Trees", level: "Advanced" },
      { name: "Feature Engineering", level: "Advanced" },
      { name: "Model Evaluation", level: "Advanced" },
      { name: "Predictive Analytics", level: "Advanced", highlight: true }
    ]
  },
  {
    id: "cloud-tools",
    category: "Cloud & Tools",
    description: "DevOps infrastructure deployment, version control pipelines, and API testing.",
    skills: [
      { name: "AWS EC2", level: "Advanced", highlight: true },
      { name: "AWS S3", level: "Advanced" },
      { name: "AWS IAM", level: "Proficient" },
      { name: "Git", level: "Expert", highlight: true },
      { name: "GitHub", level: "Expert" },
      { name: "Postman", level: "Expert" }
    ]
  },
  {
    id: "core-computer-science",
    category: "Core Computer Science",
    description: "Academic computer science fundamentals, network protocols, and cryptographic concepts.",
    skills: [
      { name: "Object-Oriented Programming (OOP)", level: "Expert" },
      { name: "Data Structures & Algorithms", level: "Advanced", highlight: true },
      { name: "Database Management Systems (DBMS)", level: "Expert" },
      { name: "Operating Systems", level: "Advanced" },
      { name: "Computer Networks", level: "Advanced" },
      { name: "Cryptography Fundamentals", level: "Proficient" },
      { name: "Cyber Law & Information Ethics", level: "Proficient" }
    ]
  },
  {
    id: "business-analytics-concepts",
    category: "Business Analytics Concepts",
    description: "Customer lifecycle analytics, unit economics, demand forecasting, and inventory metrics.",
    skills: [
      { name: "Customer Behavior Analysis", level: "Advanced" },
      { name: "Sales Trend Analysis", level: "Expert", highlight: true },
      { name: "Operational Analytics", level: "Advanced" },
      { name: "Marketing Analytics", level: "Advanced" },
      { name: "Inventory Analysis", level: "Advanced" },
      { name: "Demand Forecasting", level: "Advanced" },
      { name: "Customer Cohort Analysis", level: "Advanced", highlight: true },
      { name: "Customer Retention & LTV", level: "Advanced" },
      { name: "CAC & ROAS Optimization", level: "Advanced" },
      { name: "KPI Tracking", level: "Expert" }
    ]
  },
  {
    id: "research-documentation",
    category: "Research & Documentation",
    description: "Scientific publication writing, peer-reviewed literature, and software specification.",
    skills: [
      { name: "Technical Documentation", level: "Expert", highlight: true },
      { name: "Research Writing", level: "Advanced", highlight: true },
      { name: "Peer-reviewed Publications", level: "Advanced" }
    ]
  },
  {
    id: "soft-skills",
    category: "Soft Skills",
    description: "Professional communication, strategic leadership, and adaptive problem solving.",
    skills: [
      { name: "Analytical Thinking", level: "Expert" },
      { name: "Problem Solving", level: "Expert" },
      { name: "Attention to Detail", level: "Expert" },
      { name: "Leadership", level: "Advanced" },
      { name: "Team Collaboration", level: "Expert" },
      { name: "Communication", level: "Expert" },
      { name: "Presentation Skills", level: "Advanced" },
      { name: "Time Management", level: "Expert" },
      { name: "Adaptability", level: "Expert" },
      { name: "Cross-functional Collaboration", level: "Expert" }
    ]
  }
];
