export interface SkillItem { name: string; classification: string; evidence?: string[]; }
export interface SkillCategory { name: string; description: string; items: SkillItem[]; }

export const skillCategories: SkillCategory[] = [
  { name: "Engineering competencies", description: "Applied technical competencies supported by internship, academic, and laboratory work.", items: [
    { name: "Network security analysis", classification: "Competency", evidence: ["mitm-vpn", "soc-sim"] },
    { name: "Network monitoring and baseline comparison", classification: "Competency", evidence: ["net-supervision"] },
    { name: "Intrusion detection and log analysis", classification: "Competency", evidence: ["soc-sim"] },
    { name: "Quantitative ICS risk assessment", classification: "Competency", evidence: ["ics-risk-framework"] },
    { name: "Frontend and backend web application development", classification: "Competency", evidence: ["ics-risk-framework", "elearning", "stock-app"] },
    { name: "Linux and network administration", classification: "Competency" },
  ]},
  { name: "Protocols & infrastructure", description: "Protocol and infrastructure knowledge applied in networking and security labs.", items: [
    { name: "TCP/IP, static routing, ARP, and IP forwarding", classification: "Networking protocols and concepts" },
    { name: "IPsec / ESP and IKEv2", classification: "VPN and security protocols", evidence: ["mitm-vpn"] },
    { name: "Linux: Kali, Ubuntu Server, and Lubuntu", classification: "Operating-system environments" },
    { name: "Netplan and cron", classification: "System configuration and scheduling" },
    { name: "VirtualBox", classification: "Type-2 hypervisor", evidence: ["mitm-vpn"] },
  ]},
  { name: "Security & network tooling", description: "Tools used to observe traffic, detect events, scan services, and support lab exercises.", items: [
    { name: "Wireshark", classification: "Network protocol analyzer", evidence: ["mitm-vpn"] },
    { name: "Nmap", classification: "Network discovery and security-auditing tool", evidence: ["soc-sim", "net-supervision"] },
    { name: "Snort", classification: "Network intrusion detection system", evidence: ["soc-sim"] },
    { name: "Filebeat", classification: "Log shipper", evidence: ["soc-sim"] },
    { name: "Elasticsearch, Logstash, and Kibana", classification: "Search, log-processing, and visualization stack", evidence: ["soc-sim"] },
    { name: "StrongSwan and hping3", classification: "IPsec implementation and packet-crafting tool", evidence: ["mitm-vpn"] },
  ]},
  { name: "Software technologies", description: "Languages, frameworks, libraries, runtimes, and data stores used in application projects.", items: [
    { name: "Python, JavaScript, Bash, and SQL", classification: "Programming, scripting, and query languages" },
    { name: "React", classification: "JavaScript UI library", evidence: ["ics-risk-framework", "elearning"] },
    { name: "FastAPI and Django", classification: "Python web frameworks", evidence: ["ics-risk-framework", "stock-app"] },
    { name: "Express and Node.js", classification: "Web framework and JavaScript runtime", evidence: ["elearning"] },
    { name: "TypeScript", classification: "Typed JavaScript language", evidence: ["ics-risk-framework"] },
    { name: "SQLAlchemy", classification: "Python SQL toolkit and ORM", evidence: ["ics-risk-framework"] },
    { name: "MongoDB, MySQL, and SQLite", classification: "Database management systems", evidence: ["ics-risk-framework", "elearning", "stock-app"] },
  ]},
];

export const languages = [{ name: "Arabic", level: "Native" }, { name: "French", level: "Professional" }, { name: "English", level: "Professional" }];
