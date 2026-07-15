import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, ShieldCheck, Clock, Droplets, PenTool as Tool, CheckCircle, ArrowRight } from 'lucide-react';
import { clientConfig } from '../config';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          {/* Placeholder for hero background (e.g., pipes or a modern bathroom) */}
          <img 
            src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2070&auto=format&fit=crop" 
            alt="Plomberie moderne" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 font-bold text-sm mb-6 border border-blue-500/30">
              {clientConfig.badgeText}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Votre Expert Plomberie & Dépannage à <span className="text-blue-500">{clientConfig.mainCity} et Environs</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              {clientConfig.heroDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`tel:${clientConfig.phoneRaw}`} 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 transition-all shadow-lg hover:shadow-red-500/25"
              >
                <PhoneCall className="w-6 h-6" />
                <span>Urgence {clientConfig.phone}</span>
              </a>
              <Link 
                to="/contact" 
                className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 transition-all shadow-lg"
              >
                <span>Demander un devis gratuit</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Intervention Rapide</h3>
                <p className="text-sm text-gray-500 mt-1">Dépannage dans les plus brefs délais sur le {clientConfig.departmentCode}.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Artisan Qualifié</h3>
                <p className="text-sm text-gray-500 mt-1">Travail soigné, normes respectées, garantie décennale.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Devis Transparent</h3>
                <p className="text-sm text-gray-500 mt-1">Aucune mauvaise surprise, tarification claire.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Mes Prestations en Plomberie</h2>
            <p className="text-lg text-gray-600">
              De la fuite d'eau à la création complète de salle de bain, je réponds à tous vos besoins sanitaires et thermiques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Droplets className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Recherche de Fuite & Dépannage</h3>
              <p className="text-gray-600 mb-6 line-clamp-3">
                Intervention d'urgence pour stopper les fuites, remplacer les tuyaux percés et réparer les chasses d'eau défectueuses. Diagnostic précis et réparation immédiate.
              </p>
              <Link to="/services" className="text-blue-600 font-bold flex items-center hover:text-blue-700">
                En savoir plus <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Tool className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Débouchage Canalisations</h3>
              <p className="text-gray-600 mb-6 line-clamp-3">
                Évier bouché, douche qui stagne, toilettes obstruées ? J'utilise du matériel professionnel pour un débouchage efficace et durable de vos évacuations.
              </p>
              <Link to="/services" className="text-blue-600 font-bold flex items-center hover:text-blue-700">
                En savoir plus <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Robinetterie & Chauffe-Eau</h3>
              <p className="text-gray-600 mb-6 line-clamp-3">
                Installation et remplacement de mitigeurs, mélangeurs, colonnes de douche et chauffe-eau (cumulus). Matériel de qualité pour une longévité garantie.
              </p>
              <Link to="/services" className="text-blue-600 font-bold flex items-center hover:text-blue-700">
                En savoir plus <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-extrabold text-white mb-4">Besoin d'un plombier rapidement ?</h2>
              <p className="text-blue-100 text-lg max-w-2xl">
                N'attendez pas que le dégât des eaux s'aggrave. Appelez-moi directement pour une intervention dans le {clientConfig.departmentCode}.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a 
                href={`tel:${clientConfig.phoneRaw}`} 
                className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 transition-shadow shadow-lg"
              >
                <PhoneCall className="w-6 h-6" />
                <span>{clientConfig.phone}</span>
              </a>
              <Link 
                to="/contact" 
                className="bg-blue-700 hover:bg-blue-800 text-white border border-blue-500 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-colors"
              >
                Message via le site
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
