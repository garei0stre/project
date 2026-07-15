import { Project, Experience, Education } from "./types";

export const projectsData: Project[] = [
  {
    id: "domotec-crm",
    title: "Smart CRM & Workspace Centralisé",
    client: "Domotec",
    period: "Septembre 2025 - Décembre 2025",
    role: "Project Manager Numérisation & Développeur Lead",
    description: "Centralisation complète des processus de vente et automatisation du suivi client dans un CRM sur mesure.",
    longDescription: "Audit et cartographie complète des flux de vente pour éliminer les pertes de productivité. Développement d'outils d'extraction et de reporting Excel avancés et paramétrage d'un CRM centralisé connecté aux outils métiers. Automatisation des rappels de relance commerciale et création de tableaux de bord de conversion.",
    technologies: ["React 19", "Tailwind CSS", "Node.js", "Express", "SQLite", "Power BI"],
    impacts: [
      "+25% de productivité sur la gestion commerciale",
      "Élimination complète des doubles saisies de données",
      "Centralisation de 100% du portefeuille clients",
      "Temps d'onboarding commercial réduit de moitié"
    ],
    color: "from-blue-600 to-indigo-500",
    textColor: "text-blue-400",
    bgAccent: "bg-blue-500/10 border-blue-500/20",
    type: "crm"
  },
  {
    id: "airbus-portal",
    title: "AeroShare - Cloud Collaboration Portal",
    client: "Akkodis / Airbus Helicopters",
    period: "Septembre 2023 - Septembre 2025",
    role: "Project Manager Officer (PMO)",
    description: "Portail cloud d'échange sécurisé et de suivi de performance sous-traitants déployé à l'échelle internationale.",
    longDescription: "Pilotage du déploiement d'une solution cloud en Roumanie pour Airbus Helicopters. Coordination MOA/MOE entre les équipes techniques françaises et locales. Gestion complète des sous-traitants (performance, facturation, bons de commande) et intégration de 30+ collaborateurs transverses dans un workflow unifié.",
    technologies: ["Next.js", "Express.js", "PostgreSQL", "Tailwind CSS", "Docker", "REST API"],
    impacts: [
      "100% des délais de déploiement respectés en Roumanie",
      "Intégration fluide de 30+ collaborateurs internationaux",
      "Réduction de 20% des litiges de facturation sous-traitants",
      "Traitement des livrables accéléré de 30%"
    ],
    color: "from-indigo-600 to-purple-500",
    textColor: "text-purple-400",
    bgAccent: "bg-purple-500/10 border-purple-500/20",
    type: "portal"
  },
  {
    id: "medical-sales",
    title: "MedQuote - CRM & Générateur de Devis Médicaux",
    client: "La Compagnie Médicale",
    period: "Septembre 2022 - Août 2023",
    role: "Business Developer & Designer CRM",
    description: "Application web d'accélération commerciale permettant la génération instantanée de devis sur mesure.",
    longDescription: "Conception et implémentation d'une interface de tarification dynamique pour le matériel médical. Ce portail a permis de automatiser les propositions commerciales complexes, d'attribuer automatiquement les prospects qualifiés et de suivre les interactions clients historiques en temps réel.",
    technologies: ["React.js", "Tailwind CSS", "Express API", "PDF Generator", "ChartJS"],
    impacts: [
      "+35% de taux de conversion des propositions commerciales",
      "Temps de génération de devis réduit de 2 heures à 2 minutes",
      "Zéro erreur de facturation sur les options techniques complexes",
      "Augmentation de 15% du panier d'achat moyen grâce aux suggestions IA"
    ],
    color: "from-emerald-600 to-teal-500",
    textColor: "text-emerald-400",
    bgAccent: "bg-emerald-500/10 border-emerald-500/20",
    type: "sales"
  },
  {
    id: "elior-qhse",
    title: "Elior SafeWork - QHSE Compliance & Dashboard",
    client: "Elior Services / Clinique de Marignane",
    period: "Août 2021 - Juillet 2022",
    role: "Manager QHSE & Concepteur Digital",
    description: "Système de suivi d'incidents, d'audit de conformité et de certification de formation en temps réel.",
    longDescription: "Création d'une application d'enregistrement des risques et de suivi des protocoles de sécurité pour la Clinique de Marignane. Inclus des modules d'e-learning sécurité, un registre d'incidents numériques interactif, et un tableau de bord analytique pour les directeurs d'établissement.",
    technologies: ["React.js", "Tailwind CSS", "Local DB", "ApexCharts", "JSON-Schema"],
    impacts: [
      "Réduction des accidents du travail de 12 à 0 en un an",
      "100% de conformité aux normes QHSE (ISO 9001, 14001, 45001)",
      "Taux de complétion des formations sécurité passé de 45% à 100%",
      "Temps de dispatch d'alertes d'incident divisé par 10"
    ],
    color: "from-amber-600 to-orange-500",
    textColor: "text-amber-400",
    bgAccent: "bg-amber-500/10 border-amber-500/20",
    type: "qhse"
  }
];

export const experiencesData: Experience[] = [
  {
    id: "exp1",
    role: "PROJECT MANAGER NUMÉRISATION",
    company: "DOMOTEC",
    period: "Septembre 2025 - Décembre 2025",
    location: "France",
    description: [
      "Élicitation des besoins métier : entretiens avec 4 services, cartographie des flux de vente et identification des points bloquants.",
      "Quantification chiffrée des pertes de productivité et proposition de solutions d'optimisation.",
      "Création d'outils d'analyse de données Excel complexes et centralisation de la base de données CRM.",
      "Paramétrage applicatif complet des logiciels métiers (droits, règles de validation, champs) et rédaction des documentations fonctionnelles."
    ],
    skills: ["Cartographie des flux", "CRM Customization", "Excel avancé", "Documentation fonctionnelle", "Spécifications techniques"]
  },
  {
    id: "exp2",
    role: "PROJECT MANAGER OFFICER (PMO)",
    company: "AKKODIS - AIRBUS HELICOPTERS",
    period: "Septembre 2023 - Septembre 2025",
    location: "France & Roumanie",
    description: [
      "Gestion de projet transverse : pilotage de l'intégration et de l'avancement de plus de 30 collaborateurs (planning, jalons, gestion des risques).",
      "Gestion complète des sous-traitants : organisation des réunions de lancement, validation des bons de commande, et rationalisation de la facturation.",
      "Mise en place d'indicateurs de performance (KPI) et d'actions correctives ciblées.",
      "Coordination MOA/MOE pour le déploiement réussi d'une solution cloud collaborative critique en Roumanie (100% des jalons respectés)."
    ],
    skills: ["Pilotage PMO", "Coordination MOA/MOE", "Suivi de KPI", "Management transverse", "Gestion de sous-traitants"]
  },
  {
    id: "exp3",
    role: "COMMERCIAL SÉDENTAIRE",
    company: "LA COMPAGNIE MÉDICALE",
    period: "Septembre 2022 - Août 2023",
    location: "Marseille, France",
    description: [
      "Négociation commerciale directe à haut niveau avec des établissements de santé et cliniques privées.",
      "Présentation de produits de haute technologie et conclusion de ventes complexes pour dépasser les objectifs mensuels.",
      "Mise en place et gestion d'un nouveau CRM interne pour rationaliser le suivi client et démultiplier l'efficacité commerciale."
    ],
    skills: ["Négociation B2B", "Stratégie de conversion", "CRM Salesforce", "Satisfaction client", "Ingénierie d'affaires"]
  },
  {
    id: "exp4",
    role: "MANAGER QHSE",
    company: "ELIOR SERVICES",
    period: "Août 2021 - Juillet 2022",
    location: "Marignane, France",
    description: [
      "Animation de formations sécurité innovantes et accompagnement au changement pour le personnel soignant et technique.",
      "Réduction historique des accidents du travail de 12 à 0 par an au sein de la Clinique de Marignane via des plans d'action digitaux.",
      "Sensibilisation continue aux protocoles de sécurité et conformité stricte aux normes ISO (9001, 14001, 45001)."
    ],
    skills: ["Conduite du changement", "Normes ISO 9001/14001/45001", "Gestion des risques", "Animation de formation", "Audits de sécurité"]
  }
];

export const educationData: Education[] = [
  {
    id: "edu1",
    degree: "MASTER INGÉNIEUR D'AFFAIRES (MSc)",
    school: "KEDGE BUSINESS SCHOOL TOULON",
    period: "Septembre 2025 - En cours",
    details: "Triple accréditation (AACSB, AMBA, EQUIS). Formation d'élite combinant ingénierie de projet, négociation complexe, finance de projet, et transformation digitale."
  },
  {
    id: "edu2",
    degree: "BACHELOR EN MANAGEMENT",
    school: "KEDGE BUSINESS SCHOOL MARSEILLE",
    period: "Août 2023",
    details: "Mise au point de compétences en stratégie d'entreprise, gestion financière, marketing B2B et management interculturel."
  },
  {
    id: "edu3",
    degree: "BTS MÉTIERS ET SERVICES À L'ENVIRONNEMENT",
    school: "CFA INHNI MARSEILLE",
    period: "Juillet 2022"
  }
];

export const skillCategories = [
  {
    title: "Gestion de Projets & Agile",
    skills: ["Pilotage PMO & Transverse", "Planification & Jalons", "Gestion de sous-traitants", "Méthode Agile / Scrum", "Suivi de KPI de performance"]
  },
  {
    title: "Outils Techniques & Numérisation",
    skills: ["Salesforce & MS Dynamics", "Outils CRM personnalisés", "Power BI & Excel avancé", "Architecture Cloud & APIs", "Modélisation de flux (BPMN)"]
  },
  {
    title: "Développement Business",
    skills: ["Négociation B2B complexe", "Ingénierie d'affaires", "Conduite du changement", "Suivi grands comptes", "Vente de solutions SaaS"]
  },
  {
    title: "Conformité & Risques",
    skills: ["Normes QHSE", "ISO 9001, 14001, 45001", "Analyse de risques opérationnels", "Audits de conformité", "Sensibilisation équipes"]
  }
];
