import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles, User, RefreshCw, Layers, DollarSign, Calendar, ShieldAlert, Cpu, ClipboardList, HelpCircle } from "lucide-react";
import Markdown from "react-markdown";
import { ChatMessage, ProjectEstimate } from "../types";
import { clientConfig } from "../config";

export default function AiPlannerAndChat() {
  const [activeTab, setActiveTab] = useState<"chat" | "estimator">("chat");

  // Chat States
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Bonjour ! Je suis l'assistant virtuel de ${clientConfig.companyName}. Posez-moi vos questions sur nos services de plomberie, de chauffage, nos tarifs ou nos zones d'intervention. Comment puis-je vous accompagner aujourd'hui ?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Estimator States
  const [projectType, setProjectType] = useState("Rénovation de Salle de Bain");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [budget, setBudget] = useState("Standard (1 000€ - 3 000€)");
  const [timeline, setTimeline] = useState("1 à 2 semaines");
  const [isEstimating, setIsEstimating] = useState(false);
  const [estimateResult, setEstimateResult] = useState<ProjectEstimate | null>(null);
  const [estimatorError, setEstimatorError] = useState<string | null>(null);

  // Suggested questions for chat
  const suggestedQuestions = [
    "Quels sont vos tarifs pour un dépannage d'urgence ?",
    "Intervenez-vous pour un débouchage de canalisation ?",
    "Quels types de chauffe-eau installez-vous ?",
    "Quelles sont vos horaires d'intervention ?",
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatLoading]);

  // Chat handler
  const handleSendMessage = async (textToSend?: string) => {
    const input = textToSend || userInput;
    if (!input.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setUserInput("");
    setIsChatLoading(true);
    setChatError(null);

    try {
      // Map previous messages to simple history structure
      const history = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Une erreur est survenue.");

      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        content: data.response || "Désolé, je n'ai pas pu générer de réponse.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setChatError(err.message || "Erreur de communication avec le serveur.");
    } finally {
      setIsChatLoading(false);
    }
  };

  // Estimator handler
  const handleGenerateEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || isEstimating) return;

    setIsEstimating(true);
    setEstimatorError(null);
    setEstimateResult(null);

    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectType,
          description,
          features,
          budget,
          timeline,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Une erreur s'est produite lors de l'estimation.");

      setEstimateResult(data);
    } catch (err: any) {
      setEstimatorError(err.message || "Erreur de calcul d'estimation.");
    } finally {
      setIsEstimating(false);
    }
  };

  return (
    <div id="ai-planner-and-chat" className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 shadow-xl backdrop-blur-sm">
      {/* Selector Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold font-display text-white">Assistant IA & Estimateur de Travaux</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Interagissez en temps réel avec l'assistant virtuel de {clientConfig.companyName} ou estimez instantanément le budget de vos travaux.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-4 py-2 text-xs rounded-md transition-all font-medium flex items-center space-x-1.5 ${
              activeTab === "chat"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Assistant Plombier IA</span>
          </button>
          <button
            onClick={() => setActiveTab("estimator")}
            className={`px-4 py-2 text-xs rounded-md transition-all font-medium flex items-center space-x-1.5 ${
              activeTab === "estimator"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Estimateur de Travaux IA</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="mt-6 min-h-[440px]">
        {/* TAB 1: AI DOUBLE CHAT */}
        {activeTab === "chat" && (
          <div className="flex flex-col h-[460px]">
            {/* Chat message logs */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[340px] mb-4 scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-3 max-w-[85%] ${
                    msg.role === "user" ? "ml-auto flex-row-reverse space-x-reverse" : "mr-auto"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${
                      msg.role === "user"
                        ? "bg-indigo-600/20 border-indigo-500/30 text-indigo-300"
                        : "bg-slate-800 border-slate-700 text-slate-300"
                    }`}
                  >
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-indigo-400" />}
                  </div>

                  <div className="space-y-1">
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-indigo-600 text-white rounded-tr-none"
                          : "bg-slate-850 border border-slate-800 text-slate-100 rounded-tl-none"
                      }`}
                    >
                      <div className="markdown-body text-slate-100">
                        <Markdown>{msg.content}</Markdown>
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-500 block text-right px-1">{msg.timestamp}</span>
                  </div>
                </div>
              ))}

              {isChatLoading && (
                <div className="flex items-start space-x-3 mr-auto max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 text-slate-300">
                    <Bot className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="bg-slate-850 border border-slate-800 p-4 rounded-2xl rounded-tl-none flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"></span>
                  </div>
                </div>
              )}

              {chatError && (
                <div className="p-3 bg-red-500/10 border border-red-500/25 rounded-xl text-xs text-red-400">
                  {chatError}
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div className="mb-4">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-2">
                  Suggestions de questions :
                </span>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="px-3 py-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded-lg text-xs transition-all text-left"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="flex items-center space-x-2 pt-2 border-t border-slate-800">
              <input
                type="text"
                placeholder={`Posez votre question à l'IA de ${clientConfig.companyName}...`}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 bg-slate-950 text-xs px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-slate-100 placeholder:text-slate-500"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!userInput.trim() || isChatLoading}
                className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-xl transition-all shadow"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: AI PROJECT ESTIMATOR */}
        {activeTab === "estimator" && (
          <div className="space-y-6">
            {!estimateResult ? (
              <form onSubmit={handleGenerateEstimate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 font-semibold uppercase block mb-1">Type de Travaux</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-slate-950 text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-slate-100"
                  >
                    <option value="Rénovation de Salle de Bain">Rénovation de Salle de Bain</option>
                    <option value="Remplacement de Chauffe-Eau">Remplacement de Chauffe-Eau</option>
                    <option value="Installation de Chauffage / Chaudière">Installation de Chauffage / Chaudière</option>
                    <option value="Remise à neuf de la Plomberie (Logement complet)">Remise à neuf de la Plomberie</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-semibold uppercase block mb-1">Budget Estimé</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-slate-950 text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-slate-100"
                  >
                    <option value="Économique (Moins de 1 000€)">Économique (Moins de 1 000€)</option>
                    <option value="Standard (1 000€ - 3 000€)">Standard (1 000€ - 3 000€)</option>
                    <option value="Premium (Plus de 3 000€)">Premium (Plus de 3 000€)</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs text-slate-400 font-semibold uppercase block mb-1">
                    Description du Projet / Besoin
                  </label>
                  <textarea
                    placeholder="Décrivez votre projet de plomberie (ex: Rénovation d'une salle de bain de 6m2 avec douche à l'italienne, dépose de l'ancienne baignoire, pose de carrelage...)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-950 text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-slate-100 h-24 resize-none"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs text-slate-400 font-semibold uppercase block mb-1">
                    Options & Équipements Souhaités
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Douche à l'italienne, robinetterie Grohe, WC suspendus, chauffe-eau extra-plat..."
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    className="w-full bg-slate-950 text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-semibold uppercase block mb-1">Délai Souhaité</label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full bg-slate-950 text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-slate-100"
                  >
                    <option value="Moins de 1 semaine (Urgent)">Moins de 1 semaine (Urgent)</option>
                    <option value="1 à 2 semaines (Standard)">1 à 2 semaines (Standard)</option>
                    <option value="1 mois ou plus">1 mois ou plus</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isEstimating || !description.trim()}
                    className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-slate-800 disabled:to-slate-850 disabled:text-slate-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all shadow"
                  >
                    {isEstimating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Estimation IA en cours...</span>
                      </>
                    ) : (
                      <>
                        <Bot className="w-4 h-4" />
                        <span>Générer l'estimation & la Roadmap</span>
                      </>
                    )}
                  </button>
                </div>

                {estimatorError && (
                  <div className="md:col-span-2 p-3.5 bg-red-500/10 border border-red-500/25 rounded-xl text-xs text-red-400">
                    {estimatorError}
                  </div>
                )}
              </form>
            ) : (
              /* ESTIMATION OUTPUT RESULT */
              <div className="space-y-5 animate-fade-in text-slate-100 text-xs">
                {/* Hero Summary Card */}
                <div className="p-5 bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-2xl flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Proposition générée</span>
                    <h4 className="text-base font-bold text-white mt-1">{estimateResult.projectName}</h4>
                    <p className="text-slate-300 mt-2 text-xs leading-relaxed max-w-xl">
                      {estimateResult.executiveSummary}
                    </p>
                  </div>

                  {/* Badges Column */}
                  <div className="flex flex-row md:flex-col justify-center items-start gap-4 flex-shrink-0 md:border-l md:border-slate-800 md:pl-6">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Budget Estimé</span>
                      <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold font-mono text-base mt-0.5">
                        <DollarSign className="w-4 h-4" />
                        <span>{estimateResult.totalCostEstimate}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Délai Estimé</span>
                      <div className="flex items-center space-x-1.5 text-indigo-400 font-semibold font-mono text-base mt-0.5">
                        <Calendar className="w-4 h-4" />
                        <span>{estimateResult.durationWeeks} Semaines</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Recommended Stack */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 md:col-span-1">
                    <span className="text-[10px] text-indigo-400 uppercase tracking-wider font-bold block mb-2.5">
                      Architecture & Stack recommandée
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {estimateResult.recommendedStack.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded text-[10px] font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-900 space-y-2">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                        Fonctionnalités clés
                      </span>
                      <ul className="space-y-2">
                        {estimateResult.keyFeatures.map((feat, idx) => (
                          <li key={idx} className="text-[11px]">
                            <strong className="text-slate-200 block">{feat.name}</strong>
                            <span className="text-slate-400 text-[10px]">{feat.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Visual Roadmap Timeline */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 md:col-span-2 space-y-3">
                    <span className="text-[10px] text-indigo-400 uppercase tracking-wider font-bold block mb-2">
                      Roadmap d'implémentation (Gantt)
                    </span>
                    
                    <div className="space-y-3 relative before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-indigo-500/20 pl-6">
                      {estimateResult.roadmap.map((phase, idx) => (
                        <div key={idx} className="relative space-y-1">
                          <span className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-indigo-600 border border-slate-950 flex items-center justify-center text-[8px] font-bold text-white shadow-md">
                            {idx + 1}
                          </span>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-white text-[11px]">{phase.phase}</span>
                            <span className="text-[9px] text-slate-400 font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                              {phase.duration}
                            </span>
                          </div>
                          <ul className="list-disc list-inside text-slate-400 text-[10px] pl-1 space-y-0.5">
                            {phase.tasks.map((task, tidx) => (
                              <li key={tidx}>{task}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Risk and mitigation */}
                <div className="p-4 bg-amber-500/5 border border-amber-500/25 rounded-xl text-[11px] flex items-start space-x-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-400 block font-display">Gouvernance & Gestion des Risques</strong>
                    <span className="text-slate-400 text-[10px] leading-relaxed block mt-0.5">
                      {estimateResult.riskAssessment}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setEstimateResult(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-all"
                  >
                    Faire un nouveau diagnostic
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
