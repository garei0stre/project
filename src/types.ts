export interface Project {
  id: string;
  title: string;
  client: string;
  period: string;
  role: string;
  description: string;
  longDescription: string;
  technologies: string[];
  impacts: string[];
  color: string; // Tailwind color class, e.g., "from-indigo-600 to-cyan-500"
  textColor: string; // e.g., "text-indigo-400"
  bgAccent: string; // e.g., "bg-indigo-500/10 border-indigo-500/20"
  type: "crm" | "portal" | "sales" | "qhse";
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
  details?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ProjectEstimate {
  projectName: string;
  totalCostEstimate: string;
  durationWeeks: number;
  recommendedStack: string[];
  executiveSummary: string;
  keyFeatures: { name: string; description: string }[];
  roadmap: { phase: string; duration: string; tasks: string[] }[];
  riskAssessment: string;
}
