import React, { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  Linkedin,
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Sparkles,
  Layers,
  CheckCircle,
  Code,
  Shield,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  Check,
  Send,
  MessageSquare,
  RefreshCw
} from "lucide-react";
import { projectsData, experiencesData, educationData, skillCategories } from "./data";
import ProjectSimulator from "./components/ProjectSimulator";
import AiPlannerAndChat from "./components/AiPlannerAndChat";
import Hero3D from "./components/Hero3D";

export default function App() {
  const [selectedProject, setSelectedProject] = useState(projectsData[0]);
  const [timelineTab, setTimelineTab] = useState<"work" | "education">("work");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Contact Form states
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [localLogs, setLocalLogs] = useState<any[]>([]);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Load submissions from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("portfolio_contact_logs");
      if (stored) {
        setLocalLogs(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      const newLog = {
        id: Math.random().toString(),
        name: contactName,
        email: contactEmail,
        company: contactCompany,
        message: contactMessage,
        date: new Date().toLocaleString()
      };

      const updated = [newLog, ...localLogs];
      setLocalLogs(updated);
      try {
        localStorage.setItem("portfolio_contact_logs", JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }

      setIsSubmitting(false);
      setFormSuccess(true);
      
      // Reset fields
      setContactName("");
      setContactEmail("");
      setContactCompany("");
      setContactMessage("");

      setTimeout(() => setFormSuccess(false), 5000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-bold text-white shadow-lg">
              IB
            </div>
            <div>
              <span className="font-display font-bold text-white text-sm tracking-tight block leading-none">Illyass BENLAHSSANIA</span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider">PORTFOLIO DIGITAL</span>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-slate-300">
            <button onClick={() => scrollToSection("showroom")} className="hover:text-white transition-all cursor-pointer">
              Showroom Sites Web
            </button>
            <button onClick={() => scrollToSection("timeline")} className="hover:text-white transition-all cursor-pointer">
              Mon Parcours
            </button>
            <button onClick={() => scrollToSection("skills")} className="hover:text-white transition-all cursor-pointer">
              Compétences
            </button>
            <button onClick={() => scrollToSection("ai-lab")} className="hover:text-white transition-all cursor-pointer">
              IA Diagnostic Lab
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-white transition-all cursor-pointer">
              Contact
            </button>
          </nav>

          {/* Header Socials / Contact CTA */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-3 text-slate-400">
              <a href="mailto:benlahssania.elmehdi@gmail.com" className="hover:text-white transition-colors" title="Email">
                <Mail className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/illyass-benlahssania/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="tel:+33658397367" className="hover:text-white transition-colors" title="Téléphone">
                <Phone className="w-4 h-4" />
              </a>
            </div>
            <button
              onClick={() => scrollToSection("ai-lab")}
              className="px-3.5 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/25 rounded-lg text-[11px] font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Estimer mon Projet</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1">

        {/* HERO SECTION */}
        <section id="hero" className="relative py-20 lg:py-28 overflow-hidden bg-slate-950">
          <Hero3D />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Profile Intro Text */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[11px] text-indigo-400 font-semibold font-mono uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Disponible pour nouvelles opportunités</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
                  Ingénieur d'Affaires & <br />
                  <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                    Chef de Projet Digital
                  </span>
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                  Créateur de solutions web et de CRM sur-mesure. J'aide les entreprises à optimiser leurs flux, 
                  automatiser leurs ventes et numériser leurs opérations avec des outils interactifs performants.
                </p>

                {/* Key Achievements Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                    <span className="text-xl sm:text-2xl font-bold font-mono text-indigo-400">+30</span>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Collaborateurs Pilotés (PMO)</p>
                  </div>
                  <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                    <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">0</span>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Accidents QHSE (Clinique)</p>
                  </div>
                  <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl col-span-2 sm:col-span-1">
                    <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">100%</span>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Délais de Livraison Respectés</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => scrollToSection("showroom")}
                    className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all shadow-lg hover:shadow-indigo-500/20 cursor-pointer"
                  >
                    <span>Explorer le Showroom</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollToSection("ai-lab")}
                    className="px-5 py-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer"
                  >
                    <span>Essayer le Planificateur IA</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Graphical Card Visualizer Space - Occupied by 3D Canvas */}
              <div className="lg:col-span-5 relative hidden lg:flex justify-center items-center pointer-events-none">
                {/* The 3D element from Hero3D is rendered underneath this column */}
              </div>

            </div>
          </div>
        </section>


        {/* SHOWROOM - INTERACTIVE SITES PORTFOLIO */}
        <section id="showroom" className="py-20 border-t border-slate-900 bg-slate-950 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header Text */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-indigo-400 font-mono uppercase tracking-wider block">Portefeuille de Créations</span>
              <h2 className="text-3xl font-display font-extrabold text-white mt-1">Showroom Interactif des Sites Web</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Sélectionnez l'une de mes réalisations ci-dessous et manipulez-la directement dans l'émulateur d'ordinateur à droite.
              </p>
            </div>

            {/* Showcase Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Selector: Project list cards */}
              <div className="lg:col-span-4 space-y-3">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                  Projets disponibles ({projectsData.length})
                </span>
                {projectsData.map((project) => {
                  const isSelected = selectedProject.id === project.id;
                  return (
                    <div
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? `bg-slate-900 ${project.bgAccent}`
                          : "bg-slate-900/40 border-slate-900/60 hover:bg-slate-900/80"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase font-mono tracking-wider">
                          {project.client}
                        </span>
                        <span className="text-[9px] text-slate-500 font-mono">{project.period}</span>
                      </div>
                      
                      <h4 className="text-sm font-bold text-white mb-2 font-display">{project.title}</h4>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{project.description}</p>
                      
                      <div className="mt-3 flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 bg-slate-950 text-slate-400 rounded text-[9px] font-mono">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-1.5 py-0.5 bg-slate-950 text-slate-500 rounded text-[9px] font-mono">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right: Detailed description and active MacBook simulator */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Visual MacBook simulator */}
                <div className="w-full">
                  <ProjectSimulator projectId={selectedProject.id} />
                </div>

                {/* Selected Project Detailed Specs */}
                <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-4 text-left">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-3 gap-2">
                    <div>
                      <h3 className="text-base font-bold font-display text-white">{selectedProject.title}</h3>
                      <p className="text-xs text-indigo-400 mt-0.5 font-mono">{selectedProject.role}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-slate-400">Client:</span>
                      <strong className="text-xs text-white">{selectedProject.client}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>

                  {/* Impact points */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {selectedProject.impacts.map((impact, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-850 flex items-start space-x-2">
                        <CheckCircle className={`w-4 h-4 ${selectedProject.textColor} flex-shrink-0 mt-0.5`} />
                        <span className="text-[11px] text-slate-300 leading-tight">{impact}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies tags list */}
                  <div className="pt-2">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-2">Technologies & Concepts intégrés :</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-slate-950 border border-slate-850 text-slate-300 rounded text-[10px] font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>


        {/* INTERACTIVE TIMELINE - PARCOURS & EXPERIENCES */}
        <section id="timeline" className="py-20 bg-slate-950 border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-400 font-mono uppercase tracking-wider block">Cursus Professionnel</span>
                <h2 className="text-3xl font-display font-extrabold text-white mt-1">Mon Parcours & Écoles</h2>
                <p className="text-xs text-slate-400 mt-2">
                  Découvrez mes expériences de PMO, numérisation de processus et business engineer.
                </p>
              </div>

              {/* Selector Tabs */}
              <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setTimelineTab("work")}
                  className={`px-4 py-1.5 text-xs rounded-md font-medium transition-all flex items-center space-x-1.5 ${
                    timelineTab === "work" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Expériences</span>
                </button>
                <button
                  onClick={() => setTimelineTab("education")}
                  className={`px-4 py-1.5 text-xs rounded-md font-medium transition-all flex items-center space-x-1.5 ${
                    timelineTab === "education" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Diplômes & Écoles</span>
                </button>
              </div>
            </div>

            {/* TIMELINE LIST */}
            <div className="max-w-3xl mx-auto text-left">
              {timelineTab === "work" ? (
                <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-slate-800 pl-8 sm:pl-0">
                  {experiencesData.map((exp, idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                      <div key={exp.id} className={`relative flex flex-col sm:flex-row ${isEven ? "sm:flex-row-reverse" : ""} justify-between items-start sm:items-center`}>
                        {/* Timeline Center Bullet */}
                        <div className="absolute -left-[30px] sm:left-1/2 sm:-ml-2 top-1 w-4 h-4 rounded-full bg-indigo-500 border-4 border-slate-950 z-10 shadow"></div>
                        
                        {/* Card box */}
                        <div className="w-full sm:w-[46%] bg-slate-900 border border-slate-850 p-5 rounded-xl hover:border-slate-700 transition-all space-y-3 shadow-md">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <span className="text-[10px] text-indigo-400 font-mono uppercase tracking-wider block font-bold">
                                {exp.company}
                              </span>
                              <h4 className="text-xs font-bold text-white tracking-tight mt-0.5">{exp.role}</h4>
                            </div>
                            <span className="text-[9px] text-slate-500 font-mono flex-shrink-0 bg-slate-950 px-2 py-0.5 rounded border border-slate-850">
                              {exp.period}
                            </span>
                          </div>

                          <ul className="space-y-1.5 text-[11px] text-slate-300 leading-relaxed list-disc list-inside">
                            {exp.description.map((bullet, bidx) => (
                              <li key={bidx} className="pl-1 text-slate-300 text-[11px]">
                                {bullet}
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap gap-1 pt-1">
                            {exp.skills.map((skill, sidx) => (
                              <span
                                key={sidx}
                                onClick={() => setActiveFilter(activeFilter === skill ? null : skill)}
                                className={`px-1.5 py-0.5 rounded text-[8.5px] font-mono cursor-pointer transition-all ${
                                  activeFilter === skill
                                    ? "bg-indigo-600 text-white"
                                    : "bg-slate-950 text-slate-400 hover:text-slate-300 hover:bg-slate-900"
                                }`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Timeline blank opposite side (spacer) */}
                        <div className="hidden sm:block w-[46%]"></div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* EDUCATION TIMELINE */
                <div className="space-y-6">
                  {educationData.map((edu) => (
                    <div key={edu.id} className="p-5 bg-slate-900 border border-slate-850 rounded-xl hover:border-slate-800 transition-all flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex items-start space-x-3.5">
                        <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/25 rounded-xl flex items-center justify-center text-indigo-400 flex-shrink-0">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                          <span className="text-xs text-indigo-400 block mt-0.5 font-medium">{edu.school}</span>
                          {edu.details && (
                            <p className="text-[11px] text-slate-400 leading-relaxed mt-2.5 max-w-xl">
                              {edu.details}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <span className="px-2.5 py-1 bg-slate-950 border border-slate-850 text-slate-400 text-[10px] font-mono rounded-lg flex-shrink-0 self-start">
                        {edu.period}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </section>


        {/* INTERACTIVE SKILL MATRIX */}
        <section id="skills" className="py-20 bg-slate-950 border-t border-slate-900 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-indigo-400 font-mono uppercase tracking-wider block">Compétences Professionnelles</span>
              <h2 className="text-3xl font-display font-extrabold text-white mt-1">Matrice de Savoir-Faire</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Mon profil à la croisée des chemins entre l'ingénierie d'affaires, le pilotage agile de projet et le déploiement technique.
              </p>
            </div>

            {/* Skill categories cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {skillCategories.map((cat, idx) => (
                <div key={idx} className="p-5 bg-slate-900/60 border border-slate-850 rounded-xl space-y-4 text-left">
                  <div className="flex items-center space-x-2">
                    {idx === 0 && <Layers className="w-4.5 h-4.5 text-indigo-400" />}
                    {idx === 1 && <Code className="w-4.5 h-4.5 text-cyan-400" />}
                    {idx === 2 && <TrendingUp className="w-4.5 h-4.5 text-emerald-400" />}
                    {idx === 3 && <Shield className="w-4.5 h-4.5 text-amber-400" />}
                    
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
                      {cat.title}
                    </h4>
                  </div>

                  <div className="flex flex-col gap-2">
                    {cat.skills.map((skill, sidx) => {
                      const isHighlighted = activeFilter === skill;
                      return (
                        <div
                          key={sidx}
                          onClick={() => setActiveFilter(isHighlighted ? null : skill)}
                          className={`p-2 rounded text-xs transition-all cursor-pointer flex justify-between items-center ${
                            isHighlighted
                              ? "bg-indigo-600 text-white font-medium"
                              : "bg-slate-950 text-slate-300 hover:bg-slate-850 border border-slate-900"
                          }`}
                        >
                          <span>{skill}</span>
                          <ChevronRight className="w-3 h-3 opacity-60 flex-shrink-0" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Filter Reset notification bar */}
            {activeFilter && (
              <div className="mt-6 inline-flex items-center space-x-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-xs text-indigo-300 animate-pulse">
                <span>Filtre actif : <strong>{activeFilter}</strong></span>
                <button onClick={() => setActiveFilter(null)} className="underline font-bold hover:text-white cursor-pointer ml-1.5">
                  Réinitialiser
                </button>
              </div>
            )}

          </div>
        </section>


        {/* IA LAB SECTION (AiPlannerAndChat) */}
        <section id="ai-lab" className="py-20 bg-slate-950 border-t border-slate-900 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header Text */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-indigo-400 font-mono uppercase tracking-wider block">Innovation Numérique</span>
              <h2 className="text-3xl font-display font-extrabold text-white mt-1">IA Diagnostic Lab</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Concevez votre feuille de route logicielle sur-mesure ou posez toutes vos questions à mon double IA entraîné sur mon parcours.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <AiPlannerAndChat />
            </div>

          </div>
        </section>


        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 bg-slate-950 border-t border-slate-900 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
              
              {/* Left Column: Coordinates */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-bold text-indigo-400 font-mono uppercase tracking-wider block">Me Recruter / Collaborer</span>
                  <h2 className="text-3xl font-display font-extrabold text-white mt-1">Discutons de votre Transformation</h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2">
                    Vous souhaitez optimiser un workflow métier, créer un portail client sécurisé, installer un nouveau CRM, ou m'intégrer en tant que Chef de Projet Digital ? Remplissez ce formulaire d'ouverture de projet.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-center space-x-3 p-3 bg-slate-900/40 rounded-xl border border-slate-900/60">
                    <Phone className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[10px]">Téléphone direct</span>
                      <a href="tel:+33658397367" className="font-semibold text-white hover:underline">+33 6 58 39 73 67</a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-slate-900/40 rounded-xl border border-slate-900/60">
                    <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[10px]">Email professionnel</span>
                      <a href="mailto:benlahssania.elmehdi@gmail.com" className="font-semibold text-white hover:underline">benlahssania.elmehdi@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-slate-900/40 rounded-xl border border-slate-900/60">
                    <Linkedin className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[10px]">LinkedIn professionnel</span>
                      <a href="https://www.linkedin.com/in/illyass-benlahssania/" target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:underline">
                        linkedin.com/in/illyass-benlahssania
                      </a>
                    </div>
                  </div>
                </div>

                {/* Submissions log indicator (locally persisted) */}
                {localLogs.length > 0 && (
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
                      Vos propositions enregistrées ({localLogs.length})
                    </span>
                    <div className="max-h-24 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                      {localLogs.map((log) => (
                        <div key={log.id} className="text-[10px] bg-slate-950 p-2 rounded border border-slate-900 flex justify-between items-center">
                          <span className="font-semibold text-slate-200 truncate max-w-[120px]">{log.name}</span>
                          <span className="text-indigo-400 font-mono">{log.date.split(" ")[0]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7">
                <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl">
                  
                  {formSuccess ? (
                    <div className="py-12 text-center space-y-3 animate-fade-in">
                      <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-white">Demande reçue avec succès !</h4>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">
                        Merci pour votre proposition commerciale. Illyass Benlahssania étudiera votre cahier des charges et vous répondra sous 24h.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-slate-400 font-semibold block mb-1">Nom / Prénom</label>
                          <input
                            type="text"
                            placeholder="Ex: Jean Dupont"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="w-full bg-slate-950 text-xs px-3.5 py-2.5 rounded-xl border border-slate-850 focus:outline-none focus:border-indigo-500 text-slate-100"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 font-semibold block mb-1">Entreprise / Institution</label>
                          <input
                            type="text"
                            placeholder="Ex: Domotec SAS"
                            value={contactCompany}
                            onChange={(e) => setContactCompany(e.target.value)}
                            className="w-full bg-slate-950 text-xs px-3.5 py-2.5 rounded-xl border border-slate-855 focus:outline-none focus:border-indigo-500 text-slate-100"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 font-semibold block mb-1">Email de contact</label>
                        <input
                          type="email"
                          placeholder="Ex: contact@entreprise.fr"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="w-full bg-slate-950 text-xs px-3.5 py-2.5 rounded-xl border border-slate-850 focus:outline-none focus:border-indigo-500 text-slate-100"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 font-semibold block mb-1">Cahier des charges / Message</label>
                        <textarea
                          placeholder="Décrivez votre besoin d'optimisation numérique, de numérisation ou d'accompagnement de projet..."
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          className="w-full bg-slate-950 text-xs px-3.5 py-2.5 rounded-xl border border-slate-850 focus:outline-none focus:border-indigo-500 text-slate-100 h-28 resize-none"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 disabled:from-slate-800 disabled:to-slate-850 disabled:text-slate-600 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Envoi en cours...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Soumettre mon projet</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}

                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-bold text-white text-[10px]">
              IB
            </div>
            <span className="text-xs font-display font-bold text-white">Illyass BENLAHSSANIA</span>
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">
            Conçu de manière artisanale • Tous Droits Réservés © 2026
          </p>
          <p className="text-[10px] text-slate-600 max-w-sm mx-auto">
            Ce portfolio utilise une stack moderne basée sur React 19, Tailwind CSS v4, Express et l'intelligence artificielle Gemini.
          </p>
        </div>
      </footer>

    </div>
  );
}
