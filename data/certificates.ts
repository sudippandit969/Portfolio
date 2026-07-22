export interface Certificate {
  id: string;
  title: string;
  issuingOrganization: string;
  date: string;
  credentialId?: string;
  certificateImage: string;
  description: string;
  skillsLearned: string[];
  verificationLink?: string;
  pdfLink?: string;
  featured: boolean;
}

export const certificatesData: Certificate[] = [
  {
    id: "python-data-science-cert",
    title: "Data Analytics & Python Specialization",
    issuingOrganization: "Google / Coursera",
    date: "2023",
    credentialId: "G-DA-998271",
    certificateImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    description: "Comprehensive training in statistical data analysis, SQL query optimization, Python data processing (Pandas/NumPy), and interactive visualization.",
    skillsLearned: ["Python", "Pandas", "NumPy", "SQL", "Exploratory Data Analysis", "Data Cleaning"],
    verificationLink: "https://coursera.org/verify/example",
    featured: true
  },
  {
    id: "django-fullstack-cert",
    title: "Django REST Framework & Full Stack Architecture",
    issuingOrganization: "Meta / Coursera",
    date: "2023",
    credentialId: "META-DJ-77621",
    certificateImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    description: "Advanced backend engineering covering Django ORM, JWT authorization, PostgreSQL relational database design, and REST API deployment.",
    skillsLearned: ["Django", "Django REST Framework", "PostgreSQL", "JWT", "REST APIs", "Unit Testing"],
    verificationLink: "https://coursera.org/verify/example",
    featured: true
  },
  {
    id: "power-bi-business-intelligence",
    title: "Microsoft Certified: Power BI Data Analyst",
    issuingOrganization: "Microsoft",
    date: "2024",
    credentialId: "MS-PBI-440192",
    certificateImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    description: "Enterprise business intelligence dashboard creation, Power Query ETL pipelines, DAX measure modeling, and automated KPI reporting.",
    skillsLearned: ["Power BI", "DAX", "Power Query", "Data Modeling", "Business Intelligence", "Dashboard Design"],
    verificationLink: "https://learn.microsoft.com/certifications",
    featured: true
  },
  {
    id: "machine-learning-foundations",
    title: "Machine Learning & Predictive Analytics",
    issuingOrganization: "DeepLearning.AI",
    date: "2024",
    credentialId: "DLAI-ML-33019",
    certificateImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    description: "Supervised and unsupervised learning, feature engineering, decision tree classification, and model evaluation metrics.",
    skillsLearned: ["Scikit-learn", "Decision Trees", "Feature Engineering", "Model Evaluation", "Predictive Analytics"],
    verificationLink: "https://coursera.org/verify/example",
    featured: true
  },
  {
    id: "aws-cloud-practitioner",
    title: "AWS Cloud Infrastructure Practitioner",
    issuingOrganization: "Amazon Web Services (AWS)",
    date: "2023",
    credentialId: "AWS-CP-883910",
    certificateImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    description: "Foundational knowledge of AWS cloud architecture, EC2 compute instances, S3 object storage, IAM security policies, and deployment.",
    skillsLearned: ["AWS EC2", "AWS S3", "AWS IAM", "Cloud Architecture", "DevOps"],
    verificationLink: "https://aws.amazon.com/verification",
    featured: false
  }
];
