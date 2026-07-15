import React from 'react';
import { Camera } from 'lucide-react';
import { clientConfig } from '../config';

export default function Gallery() {
  // Using high-quality unsplash images as placeholders for the user's real images.
  const projects = [
    {
      title: "Création de Douche à l'italienne",
      description: "Installation complète avec paroi en verre, colonne de douche et faïence effet marbre.",
      img: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2069&auto=format&fit=crop",
      category: "Salle de bain"
    },
    {
      title: "Installation de Radiateurs",
      description: "Pose et raccordement de radiateurs à eau chaude dans le cadre d'une rénovation globale.",
      img: "https://images.unsplash.com/photo-1505322022379-7c3353ee6291?q=80&w=2000&auto=format&fit=crop",
      category: "Chauffage"
    },
    {
      title: "Raccordement sous évier",
      description: "Reprise complète de la tuyauterie et des évacuations sous un meuble de cuisine.",
      img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
      category: "Dépannage & Tuyauterie"
    },
    {
      title: "Chauffe-eau Électrique",
      description: "Remplacement d'un cumulus vétuste par un ballon neuf haute performance avec groupe de sécurité.",
      img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop",
      category: "Chauffe-eau"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <Camera className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Mes Réalisations</h1>
          <p className="text-lg text-gray-600">
            Découvrez quelques-uns de mes récents chantiers en {clientConfig.departmentName.split(' ')[0]}. Dépannage, installation, et rénovation, chaque intervention est réalisée avec le plus grand soin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group">
              <div className="relative h-72 overflow-hidden bg-gray-200">
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 uppercase tracking-wide">
                  {project.category}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 leading-relaxed">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-6">Note : Les photos peuvent être remplacées par vos propres clichés de chantiers.</p>
        </div>

      </div>
    </div>
  );
}
