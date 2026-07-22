export interface Education {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gradeOrCgpa?: string;
  description: string;
  coursework: string[];
  achievements?: string[];
}

export const educationData: Education[] = [
  {
    id: "bachelor-degree",
    degree: "Bachelor of Technology (B.Tech)",
    fieldOfStudy: "Computer Science & Engineering / Information Technology",
    institution: "WBUT / Maulana Abul Kalam Azad University of Technology",
    location: "West Bengal, India",
    startDate: "2020",
    endDate: "2024",
    gradeOrCgpa: "First Class Distinction",
    description: "Rigorous academic training in core computer science, software engineering principles, machine learning, and database management systems.",
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOP)",
      "Database Management Systems (DBMS)",
      "Operating Systems & Computer Networks",
      "Software Engineering & System Architecture",
      "Artificial Intelligence & Machine Learning"
    ],
    achievements: [
      "Published peer-reviewed research paper on Predictive Analytics in Research Square.",
      "Lead developer for College Smart Attendance System capstone project."
    ]
  },
  {
    id: "higher-secondary",
    degree: "Higher Secondary (10+2)",
    fieldOfStudy: "Science (Physics, Chemistry, Mathematics)",
    institution: "Paschim Medinipur High School",
    location: "Paschim Medinipur, West Bengal, India",
    startDate: "2018",
    endDate: "2020",
    description: "Focus on Higher Mathematics, Physics, and Computer Application fundamentals.",
    coursework: ["Mathematics", "Physics", "Chemistry", "Computer Science Fundamentals"]
  }
];
