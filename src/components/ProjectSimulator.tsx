import React, { useState } from "react";
import { Check, Send, Sparkles, FileText, Download, AlertTriangle, Play, RefreshCw, Layers } from "lucide-react";

interface ProjectSimulatorProps {
  projectId: string;
}

export default function ProjectSimulator({ projectId }: ProjectSimulatorProps) {
  // Common states for Domotec CRM
  const [domotecTab, setDomotecTab] = useState<"dash" | "clients" | "pipeline">("dash");
  const [crmClients, setCrmClients] = useState([
    { id: 1, name: "Ets. Bernard & Fils", manager: "Pierre Bernard", value: "14,200 €", status: "Signé" },
    { id: 2, name: "Clinique du Sud", manager: "Dr. Lemoine", value: "32,000 €", status: "Relance" },
    { id: 3, name: "Groupe DomoWest", manager: "Valérie Giraud", value: "8,500 €", status: "Prospect" },
  ]);
  const [searchCrm, setSearchCrm] = useState("");
  const [crmNotification, setCrmNotification] = useState<string | null>(null);

  // Common states for Airbus Portal
  const [airbusTab, setAirbusTab] = useState<"cluster" | "subcontractors">("cluster");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncDone, setSyncDone] = useState(false);
  const [subcontractors, setSubcontractors] = useState([
    { id: "sub1", name: "TechAlloy SA", role: "Fournisseur pales", kpi: "98.5%", invoiceStatus: "En attente" },
    { id: "sub2", name: "AeroOptics", role: "Capteurs optiques", kpi: "94.2%", invoiceStatus: "Approuvé" },
    { id: "sub3", name: "HeliCore Ltd", role: "Pièces rotor", kpi: "99.1%", invoiceStatus: "En attente" },
  ]);

  // Common states for Medical Sales (MedQuote)
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({
    scanner: true,
    ecg: false,
    beds: true,
  });
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    scanner: 1,
    ecg: 3,
    beds: 12,
  });
  const [discount, setDiscount] = useState(10); // in %
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const medicalProducts = [
    { id: "scanner", name: "Scanner IRM High-Res 3T", price: 125000, description: "Imagerie médicale de dernière génération" },
    { id: "ecg", name: "Moniteur ECG Multi-Paramètres", price: 2400, description: "Affichage temps réel et stockage nuagique" },
    { id: "beds", name: "Lit d'hôpital médicalisé connecté", price: 1800, description: "Commandes électriques et capteurs de pression" },
  ];

  // Common states for Elior SafeWork
  const [incidents, setIncidents] = useState([
    { id: 1, date: "12 Juillet 2026", type: "Chute de plain-pied", severity: "Faible", status: "Résolu" },
    { id: 2, date: "14 Juillet 2026", type: "Contact produit chimique", severity: "Moyen", status: "En cours" },
  ]);
  const [newIncidentType, setNewIncidentType] = useState("");
  const [newIncidentSeverity, setNewIncidentSeverity] = useState("Faible");
  const [qhseNotification, setQhseNotification] = useState<string | null>(null);

  // Triggering simulations
  const triggerDomotecRelance = (clientName: string) => {
    setCrmNotification(`Email de relance automatique envoyé avec succès à ${clientName} !`);
    setTimeout(() => setCrmNotification(null), 4000);
  };

  const startAirbusSync = () => {
    setIsSyncing(true);
    setSyncProgress(0);
    setSyncDone(false);
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          setSyncDone(true);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  const approveInvoice = (id: string) => {
    setSubcontractors(prev =>
      prev.map(sub => (sub.id === id ? { ...sub, invoiceStatus: "Approuvé" } : sub))
    );
  };

  const toggleProduct = (id: string) => {
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const updateQuantity = (id: string, val: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, val) }));
  };

  const calculateMedQuoteTotal = () => {
    let rawTotal = 0;
    medicalProducts.forEach((prod) => {
      if (selectedItems[prod.id]) {
        rawTotal += prod.price * (quantities[prod.id] || 1);
      }
    });
    const discountAmount = (rawTotal * discount) / 100;
    const finalTotalHT = rawTotal - discountAmount;
    const tva = finalTotalHT * 0.2;
    const totalTTC = finalTotalHT + tva;
    return { rawTotal, discountAmount, finalTotalHT, tva, totalTTC };
  };

  const handleAddIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncidentType.trim()) return;
    const newInc = {
      id: incidents.length + 1,
      date: "Aujourd'hui",
      type: newIncidentType,
      severity: newIncidentSeverity,
      status: "Nouveau",
    };
    setIncidents([newInc, ...incidents]);
    setNewIncidentType("");
    setQhseNotification("Alerte d'incident enregistrée ! Le protocole d'urgence a été notifié aux équipes.");
    setTimeout(() => setQhseNotification(null), 5000);
  };

  const resolveIncident = (id: number) => {
    setIncidents(prev =>
      prev.map(inc => (inc.id === id ? { ...inc, status: "Résolu" } : inc))
    );
  };

  const { rawTotal, discountAmount, finalTotalHT, tva, totalTTC } = calculateMedQuoteTotal();

  return (
    <div id="project-simulator-root" className="w-full">
      {/* MacBook-style Frame */}
      <div className="relative mx-auto max-w-4xl bg-slate-900 rounded-2xl shadow-2xl border-4 border-slate-700 overflow-hidden">
        {/* Device Header/Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
          </div>
          {/* Address Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="bg-slate-950/60 text-slate-400 text-xs px-4 py-1.5 rounded-md flex items-center justify-between font-mono select-none">
              <span className="truncate">https://{projectId}-simulator.benlahssania.dev</span>
              <span className="text-[10px] text-indigo-400 font-semibold px-1 rounded bg-indigo-500/15">DEMO REÉLLE</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-[10px] text-slate-400 font-mono">100% Interactif</span>
          </div>
        </div>

        {/* Interactive Screen Area */}
        <div className="min-h-[460px] bg-slate-950 text-slate-200 p-5 font-sans relative">
          
          {/* 1. DOMOTEC CRM SIMULATOR */}
          {projectId === "domotec-crm" && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white text-sm">
                    D
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold tracking-tight text-white">Domotec Central CRM</h4>
                    <p className="text-[10px] text-slate-400">Système unifié de gestion de ventes</p>
                  </div>
                </div>
                {/* Simulator Tabs */}
                <div className="flex bg-slate-900 rounded p-0.5 border border-slate-800">
                  <button
                    onClick={() => setDomotecTab("dash")}
                    className={`px-2.5 py-1 text-xs rounded transition-all ${domotecTab === "dash" ? "bg-blue-600 text-white font-medium" : "text-slate-400 hover:text-white"}`}
                  >
                    Vue d'ensemble
                  </button>
                  <button
                    onClick={() => setDomotecTab("clients")}
                    className={`px-2.5 py-1 text-xs rounded transition-all ${domotecTab === "clients" ? "bg-blue-600 text-white font-medium" : "text-slate-400 hover:text-white"}`}
                  >
                    Base Clients
                  </button>
                </div>
              </div>

              {crmNotification && (
                <div className="mt-2.5 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded text-xs text-emerald-400 flex items-center space-x-2 animate-pulse">
                  <Sparkles className="w-4 h-4 flex-shrink-0" />
                  <span>{crmNotification}</span>
                </div>
              )}

              {/* CRM Content */}
              {domotecTab === "dash" ? (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-slate-900 p-3 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Portefeuille Total</span>
                    <span className="text-xl font-bold text-white font-mono">54,700 €</span>
                    <div className="mt-1 flex items-center text-[10px] text-emerald-400">
                      <span>+14.5% ce mois-ci</span>
                    </div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Clients Signés</span>
                    <span className="text-xl font-bold text-white font-mono">18</span>
                    <div className="mt-1 flex items-center text-[10px] text-blue-400">
                      <span>Taux de conversion : 68%</span>
                    </div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Tâches en attente</span>
                    <span className="text-xl font-bold text-amber-400 font-mono">3</span>
                    <div className="mt-1 flex items-center text-[10px] text-amber-500/80">
                      <span>2 relances urgentes</span>
                    </div>
                  </div>

                  <div className="md:col-span-3 bg-slate-900/60 p-4 rounded border border-slate-800/80 mt-1">
                    <h5 className="text-xs font-semibold text-slate-200 mb-2.5">Activité Recente & Actions Automatismes</h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs p-2 bg-slate-950 rounded border border-slate-900">
                        <div>
                          <span className="font-semibold text-slate-300">Clinique du Sud</span>
                          <p className="text-[10px] text-amber-400">Dernière interaction: Visite il y a 8 jours • Status: Relance</p>
                        </div>
                        <button
                          onClick={() => triggerDomotecRelance("Clinique du Sud")}
                          className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-medium transition-all"
                        >
                          Relance Auto
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-xs p-2 bg-slate-950 rounded border border-slate-900">
                        <div>
                          <span className="font-semibold text-slate-300">Ets. Bernard & Fils</span>
                          <p className="text-[10px] text-emerald-400">Dernière interaction: Contrat signé hier • Status: Signé</p>
                        </div>
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          Terminé
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Rechercher un client ou manager..."
                      value={searchCrm}
                      onChange={(e) => setSearchCrm(e.target.value)}
                      className="w-full bg-slate-900 text-xs px-3 py-2 rounded border border-slate-800 focus:outline-none focus:border-blue-500 text-slate-100"
                    />
                  </div>
                  <div className="bg-slate-900 rounded border border-slate-800 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-800 text-slate-400 text-[10px] uppercase tracking-wider">
                          <th className="p-2.5">Raison Sociale</th>
                          <th className="p-2.5">Interlocuteur</th>
                          <th className="p-2.5">Valeur estimée</th>
                          <th className="p-2.5">Status</th>
                          <th className="p-2.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {crmClients
                          .filter(
                            (c) =>
                              c.name.toLowerCase().includes(searchCrm.toLowerCase()) ||
                              c.manager.toLowerCase().includes(searchCrm.toLowerCase())
                          )
                          .map((client) => (
                            <tr key={client.id} className="border-b border-slate-800 hover:bg-slate-800/40">
                              <td className="p-2.5 font-semibold text-white">{client.name}</td>
                              <td className="p-2.5 text-slate-300">{client.manager}</td>
                              <td className="p-2.5 text-slate-400 font-mono">{client.value}</td>
                              <td className="p-2.5">
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[9px] ${
                                    client.status === "Signé"
                                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                                      : client.status === "Relance"
                                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/25"
                                        : "bg-blue-500/10 text-blue-400 border border-blue-500/25"
                                  }`}
                                >
                                  {client.status}
                                </span>
                              </td>
                              <td className="p-2.5 text-right">
                                <button
                                  onClick={() => triggerDomotecRelance(client.name)}
                                  className="text-[10px] text-blue-400 hover:underline font-medium"
                                >
                                  Relancer
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. AIRBUS HELICOPTERS CLOUD PORTAL */}
          {projectId === "airbus-portal" && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-600 to-purple-500 flex items-center justify-center text-white">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold tracking-tight text-white">Airbus AeroShare Portal</h4>
                    <p className="text-[10px] text-indigo-300">PMO Cluster Synchronizer (Roumanie)</p>
                  </div>
                </div>
                <div className="flex bg-slate-900 rounded p-0.5 border border-slate-800">
                  <button
                    onClick={() => setAirbusTab("cluster")}
                    className={`px-2.5 py-1 text-xs rounded transition-all ${airbusTab === "cluster" ? "bg-indigo-600 text-white font-medium" : "text-slate-400 hover:text-white"}`}
                  >
                    Cloud Deploy
                  </button>
                  <button
                    onClick={() => setAirbusTab("subcontractors")}
                    className={`px-2.5 py-1 text-xs rounded transition-all ${airbusTab === "subcontractors" ? "bg-indigo-600 text-white font-medium" : "text-slate-400 hover:text-white"}`}
                  >
                    Sous-traitants
                  </button>
                </div>
              </div>

              {/* Content */}
              {airbusTab === "cluster" ? (
                <div className="mt-4 space-y-4">
                  <div className="bg-slate-900 p-4 rounded border border-slate-800 text-center">
                    <h5 className="text-xs font-semibold text-indigo-300 mb-1">État du Déploiement Cloud Roumanie</h5>
                    <p className="text-[11px] text-slate-400 mb-3">
                      Serveurs d'échange de données techniques hébergés de manière sécurisée en Europe de l'Est.
                    </p>

                    <div className="max-w-xs mx-auto bg-slate-950 p-3 rounded border border-slate-800 flex flex-col items-center">
                      <span className="text-[10px] text-slate-400 font-mono mb-2">Version: v2.14-stable</span>
                      
                      {isSyncing ? (
                        <div className="w-full space-y-2">
                          <div className="flex justify-between text-[10px] text-slate-300 font-mono">
                            <span>Mise à jour des règles MOA/MOE...</span>
                            <span>{syncProgress}%</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2 rounded overflow-hidden">
                            <div className="bg-indigo-500 h-full transition-all duration-300" style={{ width: `${syncProgress}%` }}></div>
                          </div>
                        </div>
                      ) : syncDone ? (
                        <div className="text-xs text-emerald-400 font-semibold py-1.5 flex items-center space-x-1.5">
                          <Check className="w-4 h-4 bg-emerald-500/20 rounded-full p-0.5" />
                          <span>Mise à jour synchronisée à 100% !</span>
                        </div>
                      ) : (
                        <button
                          onClick={startAirbusSync}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium flex items-center space-x-1.5 transition-all shadow"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Lancer la Synchronisation</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900/60 p-3 rounded border border-slate-800">
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Latence Réseau</span>
                      <span className="text-base font-bold text-white font-mono">34 ms</span>
                      <span className="text-[9px] text-emerald-400 block mt-0.5">Optimal (SLA 99.9%)</span>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded border border-slate-800">
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Intégrité Données</span>
                      <span className="text-base font-bold text-white font-mono">100%</span>
                      <span className="text-[9px] text-indigo-400 block mt-0.5">Chiffrement AES-256</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <p className="text-[11px] text-slate-400">
                    Ce module permet de suivre en temps réel la conformité des livrables et de valider les bons de commande/facturations.
                  </p>
                  <div className="bg-slate-900 rounded border border-slate-800 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-800 text-slate-400 text-[10px] uppercase tracking-wider">
                          <th className="p-2">Partenaire</th>
                          <th className="p-2">Secteur</th>
                          <th className="p-2">Indice KPI</th>
                          <th className="p-2">Facture</th>
                          <th className="p-2 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subcontractors.map((sub) => (
                          <tr key={sub.id} className="border-b border-slate-800 hover:bg-slate-800/40">
                            <td className="p-2 font-semibold text-white">{sub.name}</td>
                            <td className="p-2 text-slate-300">{sub.role}</td>
                            <td className="p-2 font-mono text-indigo-400 font-semibold">{sub.kpi}</td>
                            <td className="p-2">
                              <span
                                className={`px-1.5 py-0.5 rounded text-[9px] ${
                                  sub.invoiceStatus === "Approuvé"
                                    ? "bg-emerald-500/10 text-emerald-400"
                                    : "bg-amber-500/10 text-amber-400"
                                }`}
                              >
                                {sub.invoiceStatus}
                              </span>
                            </td>
                            <td className="p-2 text-right">
                              {sub.invoiceStatus === "En attente" ? (
                                <button
                                  onClick={() => approveInvoice(sub.id)}
                                  className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] rounded font-medium transition-all"
                                >
                                  Approuver
                                </button>
                              ) : (
                                <span className="text-[9px] text-slate-500">Aucune</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. COMPAGNIE MÉDICALE QUOTE CALCULATOR */}
          {projectId === "medical-sales" && (
            <div className="flex flex-col h-full relative">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center text-white">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold tracking-tight text-white">Compagnie Médicale Tool</h4>
                    <p className="text-[10px] text-emerald-400">Générateur de devis de matériel instantané</p>
                  </div>
                </div>
              </div>

              {/* Main App */}
              <div className="mt-3 grid grid-cols-1 md:grid-cols-5 gap-3.5">
                {/* Product List */}
                <div className="md:col-span-3 space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Matériels disponibles</span>
                  {medicalProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => toggleProduct(prod.id)}
                      className={`p-2.5 rounded border text-left cursor-pointer transition-all ${
                        selectedItems[prod.id]
                          ? "bg-emerald-500/10 border-emerald-500/40 text-slate-100"
                          : "bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-400"
                      }`}
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-white">{prod.name}</span>
                        <span className="font-mono text-emerald-400 font-semibold">{prod.price.toLocaleString()} €</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{prod.description}</p>
                      
                      {selectedItems[prod.id] && (
                        <div className="mt-2.5 flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                          <span className="text-[10px] text-slate-300">Quantité :</span>
                          <input
                            type="number"
                            value={quantities[prod.id] || 1}
                            onChange={(e) => updateQuantity(prod.id, parseInt(e.target.value) || 1)}
                            className="w-12 bg-slate-950 text-center text-xs rounded border border-slate-700 py-0.5 text-white font-mono"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Calculation summary */}
                <div className="md:col-span-2 bg-slate-900 p-3 rounded border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-2">Synthèse Tarifs</span>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>Total Brut:</span>
                        <span className="font-mono text-slate-200">{(rawTotal || 0).toLocaleString()} €</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-400 mt-1">
                        <span className="text-[11px]">Remise commerciale:</span>
                        <div className="flex items-center space-x-1">
                          <input
                            type="number"
                            min="0"
                            max="50"
                            value={discount}
                            onChange={(e) => setDiscount(Math.min(50, Math.max(0, parseInt(e.target.value) || 0)))}
                            className="w-10 bg-slate-950 text-center py-0.5 rounded border border-slate-700 text-white font-mono text-[11px]"
                          />
                          <span>%</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-amber-400 text-[11px] border-b border-slate-800 pb-1.5">
                        <span>Économies:</span>
                        <span className="font-mono">- {discountAmount.toLocaleString()} €</span>
                      </div>
                      <div className="flex justify-between text-slate-300 font-semibold pt-1.5">
                        <span>Total HT:</span>
                        <span className="font-mono text-white">{finalTotalHT.toLocaleString()} €</span>
                      </div>
                      <div className="flex justify-between text-slate-400 text-[11px]">
                        <span>TVA (20%):</span>
                        <span className="font-mono">{tva.toLocaleString()} €</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-800">
                    <div className="flex justify-between text-sm font-bold text-white mb-3">
                      <span>Total TTC:</span>
                      <span className="font-mono text-emerald-400">{totalTTC.toLocaleString()} €</span>
                    </div>
                    <button
                      onClick={() => setShowInvoiceModal(true)}
                      className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Générer Devis PDF</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Invoice PDF Modal Simulator */}
              {showInvoiceModal && (
                <div className="absolute inset-0 bg-slate-950/95 z-20 flex flex-col justify-between p-4 rounded-b-xl border border-emerald-500/30 animate-fade-in">
                  <div className="border border-slate-800 bg-white text-slate-900 rounded p-4 font-serif text-[10px] space-y-2 shadow-2xl flex-1 overflow-y-auto">
                    <div className="flex justify-between items-start border-b border-slate-300 pb-2">
                      <div>
                        <h5 className="font-bold uppercase text-[11px] tracking-wide text-indigo-900">La Compagnie Médicale</h5>
                        <p className="text-[8px] text-slate-500">14 Boulevard de la Santé, Marseille</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-[11px]">DEVIS OFFICIEL</span>
                        <p className="text-[8px] text-slate-500">No: CM-2026-8871</p>
                        <p className="text-[8px] text-slate-500">Date: 15 Juillet 2026</p>
                      </div>
                    </div>

                    <div className="py-1">
                      <span className="text-[8px] text-slate-400 block">Destinataire:</span>
                      <p className="font-semibold">Clinique du Golfe - Dr. Antoine Martin</p>
                    </div>

                    <table className="w-full text-left border-collapse border-b border-slate-300">
                      <thead>
                        <tr className="bg-slate-100 font-sans text-[8px] font-bold">
                          <th className="p-1">Désignation</th>
                          <th className="p-1 text-center">Qté</th>
                          <th className="p-1 text-right">PU HT</th>
                          <th className="p-1 text-right">Total HT</th>
                        </tr>
                      </thead>
                      <tbody className="font-sans">
                        {medicalProducts.map((p) => {
                          if (selectedItems[p.id]) {
                            return (
                              <tr key={p.id} className="border-b border-slate-100">
                                <td className="p-1 font-semibold">{p.name}</td>
                                <td className="p-1 text-center">{quantities[p.id]}</td>
                                <td className="p-1 text-right">{p.price.toLocaleString()} €</td>
                                <td className="p-1 text-right">{(p.price * quantities[p.id]).toLocaleString()} €</td>
                              </tr>
                            );
                          }
                          return null;
                        })}
                      </tbody>
                    </table>

                    <div className="flex justify-end pt-1">
                      <div className="w-40 space-y-1 font-sans text-[8px]">
                        <div className="flex justify-between text-slate-500">
                          <span>Total Brut:</span>
                          <span>{(rawTotal || 0).toLocaleString()} €</span>
                        </div>
                        <div className="flex justify-between text-amber-600">
                          <span>Remise commerciale ({discount}%):</span>
                          <span>- {discountAmount.toLocaleString()} €</span>
                        </div>
                        <div className="flex justify-between font-bold border-t border-slate-300 pt-1 text-[9px]">
                          <span>Net HT:</span>
                          <span>{finalTotalHT.toLocaleString()} €</span>
                        </div>
                        <div className="flex justify-between text-slate-500">
                          <span>TVA (20%):</span>
                          <span>{tva.toLocaleString()} €</span>
                        </div>
                        <div className="flex justify-between font-bold text-indigo-950 border-t-2 border-double border-slate-950 pt-1 text-[10px]">
                          <span>TOTAL TTC:</span>
                          <span>{totalTTC.toLocaleString()} €</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-between">
                    <span className="text-[10px] text-slate-400 self-center">
                      ✓ Devis simulé généré avec succès.
                    </span>
                    <button
                      onClick={() => setShowInvoiceModal(false)}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs transition-all"
                    >
                      Fermer l'aperçu
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. ELIOR SERVICES - SAFEWORK */}
          {projectId === "elior-qhse" && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-600 to-orange-500 flex items-center justify-center text-white font-bold">
                    QHSE
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold tracking-tight text-white">Elior SafeWork Dashboard</h4>
                    <p className="text-[10px] text-amber-400">Monitoring de conformité et incidentologie</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold font-mono text-emerald-400 block">0</span>
                  <span className="text-[8px] text-slate-400 block uppercase tracking-wider">Accidents du Travail</span>
                </div>
              </div>

              {qhseNotification && (
                <div className="mt-2 p-2 bg-amber-500/15 border border-amber-500/35 rounded text-[10px] text-amber-300 flex items-center space-x-2 animate-bounce">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-400" />
                  <span>{qhseNotification}</span>
                </div>
              )}

              <div className="mt-3 grid grid-cols-1 md:grid-cols-5 gap-3.5">
                {/* Submit New Incident */}
                <form onSubmit={handleAddIncident} className="md:col-span-2 bg-slate-900 p-3 rounded border border-slate-800 flex flex-col justify-between space-y-2">
                  <span className="text-[10px] text-slate-300 font-bold uppercase block">Déclarer un risque/incident</span>
                  
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Type d'anomalie/incident</label>
                    <input
                      type="text"
                      placeholder="Ex: Obstacle dans le couloir principal"
                      value={newIncidentType}
                      onChange={(e) => setNewIncidentType(e.target.value)}
                      className="w-full bg-slate-950 text-xs px-2.5 py-1.5 rounded border border-slate-800 focus:outline-none focus:border-amber-500 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Niveau de gravité</label>
                    <select
                      value={newIncidentSeverity}
                      onChange={(e) => setNewIncidentSeverity(e.target.value)}
                      className="w-full bg-slate-950 text-xs px-2.5 py-1.5 rounded border border-slate-800 focus:outline-none focus:border-amber-500 text-white"
                    >
                      <option value="Faible">Faible (Alerte préventive)</option>
                      <option value="Moyen">Moyen (Action corrective requise)</option>
                      <option value="Critique">Critique (Urgence sécurité)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-1.5 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white rounded text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all"
                  >
                    <Send className="w-3 h-3" />
                    <span>Notifier le PMO</span>
                  </button>
                </form>

                {/* Live Incident Log Feed */}
                <div className="md:col-span-3 space-y-2">
                  <span className="text-[10px] text-slate-300 font-bold uppercase block">Registre numérique des risques</span>
                  <div className="space-y-1.5 max-h-[190px] overflow-y-auto pr-1">
                    {incidents.map((inc) => (
                      <div key={inc.id} className="p-2 bg-slate-900 border border-slate-800 rounded flex items-center justify-between">
                        <div className="text-[11px]">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-white">{inc.type}</span>
                            <span
                              className={`text-[8px] px-1 rounded ${
                                inc.severity === "Critique"
                                  ? "bg-red-500/10 text-red-400"
                                  : inc.severity === "Moyen"
                                    ? "bg-amber-500/10 text-amber-400"
                                    : "bg-blue-500/10 text-blue-400"
                              }`}
                            >
                              {inc.severity}
                            </span>
                          </div>
                          <span className="text-[9px] text-slate-400">{inc.date}</span>
                        </div>
                        
                        <div>
                          {inc.status === "Résolu" ? (
                            <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-semibold">
                              Résolu
                            </span>
                          ) : (
                            <button
                              onClick={() => resolveIncident(inc.id)}
                              className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] rounded font-medium transition-all"
                            >
                              Résoudre
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800/80 text-[10px] text-slate-400 flex items-start space-x-2">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Gouvernance:</strong> Les audits ISO sont conformes. Ce tableau de bord permet une gouvernance instantanée avec 100% de transparence pour les chefs d'établissement.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
