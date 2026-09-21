export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: "cybersecurity" | "fullstack" | "networking" | "systems";
  tags: string[];
  overview: string;
  problem: string;
  objective: string;
  architecture: string;
  technologies: string[];
  implementation: string[];
  securityConsiderations?: string[];
  challenges?: string[];
  results?: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "ics-risk-framework", title: "ICS Risk Assessment Framework", subtitle: "Quantitative risk assessment for industrial control systems", category: "cybersecurity",
    tags: ["Bayesian Networks", "ICS", "React", "TypeScript", "Python", "FastAPI"],
    overview: "A generic framework for quantitative risk assessment of industrial control systems (ICS), developed during a year-end internship at JESA SA.",
    problem: "Assessing risk in industrial control systems requires a structured way to represent dependencies and uncertainty.",
    objective: "Develop a framework based on Bayesian Networks for quantitative ICS risk assessment.",
    architecture: "A web application developed with React and TypeScript on the frontend, and Python with FastAPI on the backend. SQLAlchemy 2.0 and SQLite were used for data persistence.",
    technologies: ["React", "TypeScript", "Python", "FastAPI", "SQLAlchemy 2.0", "SQLite", "Bayesian Networks"],
    implementation: ["Developed a generic quantitative ICS risk-assessment framework", "Used Bayesian Networks to support the risk-assessment model", "Used React, TypeScript, Python, FastAPI, SQLAlchemy 2.0, and SQLite"],
    securityConsiderations: ["Applied the framework to the cybersecurity risk-assessment context of industrial control systems"],
    featured: true,
  },
  {
    slug: "mitm-vpn", title: "IPsec/IKEv2 VPN MITM Simulation", subtitle: "Controlled-lab network security analysis", category: "cybersecurity",
    tags: ["IPsec", "IKEv2", "StrongSwan", "ARP spoofing", "Wireshark", "hping3"],
    overview: "An academic simulation of a man-in-the-middle scenario involving an IPsec/IKEv2 VPN in a controlled lab environment.",
    problem: "The project examined VPN traffic and availability when ARP spoofing and IKE traffic flooding are introduced in a lab network.",
    objective: "Capture IKE and ESP traffic, observe ARP interception, and test the effect of traffic flooding on IKE over UDP port 500.",
    architecture: "A virtualized lab using StrongSwan to establish an IPsec/IKEv2 VPN, with Wireshark used for packet capture and analysis.",
    technologies: ["IPsec", "IKEv2", "StrongSwan", "Wireshark", "hping3", "ARP spoofing"],
    implementation: ["Performed ARP spoofing in the lab", "Captured IKE and ESP traffic", "Used hping3 for IKE traffic-flooding tests on UDP port 500", "Analyzed captured traffic with Wireshark"],
    securityConsiderations: ["The work was performed as a controlled academic simulation", "Examined IPsec/IKEv2 traffic and VPN availability rather than claiming payload decryption"],
    featured: true,
  },
  {
    slug: "soc-sim", title: "SOC Simulation: Log Detection and Correlation", subtitle: "Network intrusion detection and centralized log monitoring", category: "cybersecurity",
    tags: ["Snort", "Filebeat", "Elasticsearch", "Logstash", "Kibana", "Nmap"],
    overview: "A simulated SOC environment for detecting and correlating security logs using Snort, Filebeat, and the Elastic Stack.",
    problem: "Security monitoring requires collecting, correlating, and reviewing events from network detection and log sources.",
    objective: "Detect Nmap scans and SSH-related events, then visualize the resulting data in Kibana.",
    architecture: "Snort produces alerts; Filebeat forwards logs to the Elastic Stack, where Logstash processes them, Elasticsearch indexes them, and Kibana visualizes them.",
    technologies: ["Snort", "Filebeat", "Elasticsearch", "Logstash", "Kibana"],
    implementation: ["Configured Snort for network intrusion detection", "Used Filebeat and the Elastic Stack for log collection and processing", "Created Kibana dashboards", "Detected Nmap scans and SSH-related events"],
    securityConsiderations: ["Focused on security-event detection, log correlation, and visualization"],
    featured: true,
  },
  {
    slug: "net-supervision", title: "Network Security Supervision", subtitle: "Automated monitoring of exposed ports and services", category: "networking",
    tags: ["Python", "Nmap", "cron", "Linux"],
    overview: "A Python-based network supervision project that compares current Nmap scan results with a baseline to identify changes in exposed ports and services.",
    problem: "Changes in exposed ports and services can go unnoticed without repeated monitoring and a reference baseline.",
    objective: "Automate scans, compare baseline and current states, detect anomalies, and record results.",
    architecture: "Python scripts invoke Nmap and are scheduled with cron; comparison output and anomalies are recorded in logs.",
    technologies: ["Python", "Nmap", "cron", "Linux"],
    implementation: ["Automated port and service scans with Python and Nmap", "Compared baseline and current scan results", "Detected anomalies", "Recorded results in logs", "Scheduled execution with cron"],
    featured: false,
  },
  {
    slug: "elearning", title: "E-Learning Platform", subtitle: "Full-stack web application using MERN", category: "fullstack",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    overview: "A full-stack e-learning web application developed with MongoDB, Express, React, and Node.js.",
    problem: "Provide an e-learning platform through a full-stack web application.",
    objective: "Develop an e-learning platform using the MERN stack.",
    architecture: "A MERN application using MongoDB, Express, React, and Node.js.",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    implementation: ["Developed a full-stack e-learning platform with the MERN stack"],
    featured: false,
  },
  {
    slug: "stock-app", title: "Stock Management Web Application", subtitle: "Inventory-management application using Django", category: "fullstack",
    tags: ["Django", "Python", "SQLite", "JavaScript", "HTML", "CSS"],
    overview: "A web application for stock management developed with Django, Python, SQLite, JavaScript, HTML, and CSS.",
    problem: "Provide a web application for managing stock.",
    objective: "Develop a stock-management web application with Django.",
    architecture: "A Django web application using SQLite, enhanced with JavaScript, HTML, and CSS.",
    technologies: ["Django", "Python", "SQLite", "JavaScript", "HTML", "CSS"],
    implementation: ["Developed a stock-management web application using Django, Python, SQLite, JavaScript, HTML, and CSS"],
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined { return projects.find((project) => project.slug === slug); }
export function getFeaturedProjects(): Project[] { return projects.filter((project) => project.featured); }
export function getProjectsByCategory(category: Project["category"]): Project[] { return projects.filter((project) => project.category === category); }
