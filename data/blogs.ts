export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: "Software Engineering" | "Cloud & DevOps" | "Data Analytics" | "Career & Stories" | "AI Research";
  tags: string[];
  coverImage: string;
  featured: boolean;
  author: string;
}

export const blogsData: BlogPost[] = [
  {
    id: "my-engineering-journey",
    title: "From Code to Research: My Journey as a Graduate Software Engineer",
    slug: "my-engineering-journey",
    excerpt: "Reflecting on my learning path across Python, full-stack web architectures, data analytics, and publishing my first research paper.",
    content: `Building software is more than just writing syntax; it's about solving real human and business problems efficiently.

During my B.Tech journey, I fell in love with Python's versatility—from constructing high-speed RESTful APIs with Django Framework to building machine learning algorithms and business intelligence pipelines.

### Key Milestones:
1. **Full-Stack Mastery**: Developing production-ready platforms like Smart Attendance System (with biometric face recognition) and Pet Rescue.
2. **Data & Analytics**: Crafting multi-dimensional Power BI dashboards and mastering SQL query optimization.
3. **Research Square Publication**: Authoring a peer-reviewed research paper exploring predictive computational models.

For fellow freshers entering tech, my biggest advice is: **Build real projects and document your learning process.**`,
    date: "July 2024",
    readTime: "4 min read",
    category: "Career & Stories",
    tags: ["Engineering Journey", "Career", "Python", "Full Stack"],
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    author: "Sudip Pandit"
  },
  {
    id: "building-scalable-python-apis",
    title: "Building High-Performance REST APIs with Django & PostgreSQL",
    slug: "building-scalable-python-apis",
    excerpt: "Best practices for schema design, JWT authentication, query optimization, and structuring 3NF relational databases.",
    content: `When architecting backend services for scale, data layer efficiency and clean API contracts are paramount.

### Core Principles I Follow:
- **3NF Relational Normalization**: Minimizing redundant data while retaining query agility.
- **JWT Authentication**: Implementing secure, stateless authorization flows.
- **ORM Optimization**: Preventing N+1 query pitfalls using select_related and prefetch_related in Django ORM.

Whether building attendance management systems or e-commerce backends, clear endpoint modularity ensures clean maintainability.`,
    date: "June 2024",
    readTime: "5 min read",
    category: "Software Engineering",
    tags: ["Python", "Django", "PostgreSQL", "REST API"],
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    author: "Sudip Pandit"
  },
  {
    id: "power-bi-data-storytelling",
    title: "Turning Raw Data into Executive Insights with Power BI & DAX",
    slug: "power-bi-data-storytelling",
    excerpt: "How to structure automated ETL pipelines, DAX measures, and visual dashboards for business decision-making.",
    content: `Data is only valuable if stakeholders can extract actionable insights quickly.

Using Power BI alongside Python (Pandas/NumPy), I transform raw transactional datasets into interactive executive dashboards.

### Focus Areas:
- **Power Query ETL**: Cleaning and merging disparate data sources seamlessly.
- **DAX Modeling**: Crafting custom time-intelligence and KPI measures.
- **User-Centric Design**: Building intuitive visuals that answer critical business questions at a glance.`,
    date: "May 2024",
    readTime: "3 min read",
    category: "Data Analytics",
    tags: ["Power BI", "Data Analytics", "DAX", "SQL"],
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    author: "Sudip Pandit"
  }
];

export const blogCategories = [
  "All",
  "Software Engineering",
  "Cloud & DevOps",
  "Data Analytics",
  "Career & Stories",
  "AI Research"
] as const;
