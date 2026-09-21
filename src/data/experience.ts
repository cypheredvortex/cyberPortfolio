export interface Experience { id: string; role: string; company: string; location: string; period: string; description: string; responsibilities: string[]; technologies: string[]; context: string; }

export const experiences: Experience[] = [
  {
    id: "jesa-ics", role: "Intern — ICS Risk Assessment", company: "JESA SA", location: "Morocco", period: "Year-end internship",
    context: "Academic internship focused on a generic framework for quantitative risk assessment of Industrial Control Systems (ICS) using Bayesian Networks.",
    description: "Developed a full-stack framework for quantitative ICS risk assessment.",
    responsibilities: ["Developed a generic framework for quantitative ICS risk assessment based on Bayesian Networks", "Contributed to the React and TypeScript interface", "Used Python and FastAPI for the application backend", "Worked with SQLAlchemy 2.0 and SQLite for data persistence"],
    technologies: ["React", "TypeScript", "Python", "FastAPI", "SQLAlchemy 2.0", "SQLite"],
  },
  {
    id: "dcp-reporting", role: "Intern — Reporting Module", company: "Direction de la Concurrence, des Prix et de la Compensation", location: "Morocco", period: "Year-end internship",
    context: "Academic internship contributing to the reporting part of an office-supplies order-management application.",
    description: "Developed the reporting component of an internal order-management application.",
    responsibilities: ["Developed the reporting part of the office-supplies order-management application", "Worked with PHP, MySQL, JavaScript, HTML, and CSS", "Used Python and Django in the application environment"],
    technologies: ["PHP", "MySQL", "JavaScript", "HTML", "CSS", "Python", "Django"],
  },
];
