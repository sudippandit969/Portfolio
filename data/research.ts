export interface ResearchPaper {
  id: string;
  title: string;
  publicationPlatform: string;
  publicationDate: string;
  doiOrUrl: string;
  abstract: string;
  technologies: string[];
  citation?: string;
  authors: string[];
  keyInsights: string[];
  status: "Published" | "Under Review";
}

export const researchData: ResearchPaper[] = [
  {
    id: "predictive-analytics-ai-paper",
    title: "Predictive Analytics and AI-Driven Decision Models in Computational Systems",
    publicationPlatform: "Research Square",
    publicationDate: "2024",
    doiOrUrl: "https://www.researchsquare.com/article/rs-9742959/v1",
    abstract: "This paper presents a novel algorithmic framework combining exploratory data processing, decision tree feature selection, and automated statistical validation to optimize predictive accuracy in complex datasets. The study highlights significant quantitative performance improvements in forecasting model latency and pattern recognition reliability.",
    technologies: ["Python", "Machine Learning", "Predictive Analytics", "Statistical Analysis", "Scikit-learn", "Data Preprocessing"],
    citation: "Pandit, S. Predictive Analytics and AI-Driven Decision Models in Computational Systems. Research Square (2024). https://doi.org/10.21203/rs.3.rs-9742959/v1",
    authors: ["Sudip Pandit"],
    keyInsights: [
      "Designed algorithmic feature engineering techniques to minimize noisy data variance",
      "Achieved significant predictive stability improvements across benchmark datasets",
      "Established scalable data preprocessing pipeline for real-time model scoring"
    ],
    status: "Published"
  }
];
