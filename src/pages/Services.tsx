import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Wrench, Shield, Thermometer, Check } from 'lucide-react';

export default function Services() {
  const servicesList = [
    {
      title: "Dépannage & Fuites",
      icon: <Droplet className="w-8 h-8 text-blue-600" />,
      description: "Recherche et réparation de fuites d'eau (apparentes ou encastrées). Remplacement de tuyauterie endommagée (cuivre, PER, multicouche). Réparation de chasses d'eau, mécanismes et robinetterie.",
      points: ["Intervention d'urgence", "Détection non destructive", "Réparation durable"]
    },
    {
      title: "Débouchage Canalisations",
      icon: <Wrench className="w-8 h-8 text-blue-600" />,
      description: "Intervention rapide pour éviers, lavabos, douches, baignoires et WC bouchés. Curage et entretien des évacuations pour prévenir les bouchons futurs et les mauvaises odeurs.",
      points: ["Furet manuel/électrique", "Pompe professionnelle", "Produits respectueux"]
    },
    {
      title: "Installation & Rénovation",
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      description: "Création et modification de réseau de plomberie. Pose de sanitaires (WC suspendus, lavabos). Aménagement de salles de bain, installation de receveurs de douche et parois (douche à l'italienne).",
      points: ["Sur-mesure", "Finitions soignées", "Respect des normes DTU"]
    },
    {
      title: "Chauffe-eau & Thermique",
      icon: <Thermometer className="w-8 h-8 text-blue-600" />,
      description: "Installation, remplacement et dépannage de cumulus électriques. Remplacement de groupe de sécurité, détartrage, et modification de réseau de chauffage (déplacement de radiateurs).",
      points: ["Diagnostic thermique", "Pose de radiateurs", "Contrat d'entretien possible"]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Mes Services de Plomberie</h1>
          <p className="text-lg text-gray-600">
            Artisan plombier expérimenté, j'interviens sur tous types de chantiers sanitaires et thermiques en Isère (38), pour les particuliers et les professionnels.
          </p>
        </div>

        {/* Services Detail Grid */}
        <div className="space-y-12">
          {servicesList.map((service, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                {service.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-blue-50 border border-blue-100 rounded-3xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Un projet spécifique ou un doute ?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            N'hésitez pas à me contacter. Je me déplace sur l'ensemble de l'agglomération grenobloise pour vous établir un devis clair, gratuit et sans engagement.
          </p>
          <Link to="/contact" className="inline-flex bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-md">
            Obtenir mon devis gratuit
          </Link>
        </div>

      </div>
    </div>
  );
}
