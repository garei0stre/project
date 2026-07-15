import React from 'react';
import { PhoneCall, AlertTriangle, Clock, MapPin, Search } from 'lucide-react';
import { clientConfig } from '../config';

export default function Emergency() {
  return (
    <div className="bg-white min-h-screen">
      {/* Alert Hero Banner */}
      <section className="bg-red-600 text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-700 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-8 backdrop-blur-sm animate-pulse">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Urgence Plomberie 24/7 <br/>en {clientConfig.departmentName}
          </h1>
          <p className="text-xl md:text-2xl text-red-100 mb-10 font-medium max-w-2xl mx-auto">
            Fuite importante, canalisation bouchée, panne d'eau chaude ? J'interviens dans l'heure.
          </p>
          <a 
            href={`tel:${clientConfig.phoneRaw}`} 
            className="inline-flex bg-white hover:bg-gray-100 text-red-600 px-10 py-5 rounded-2xl font-extrabold text-2xl items-center justify-center space-x-4 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            <PhoneCall className="w-8 h-8" />
            <span>{clientConfig.phone}</span>
          </a>
        </div>
      </section>

      {/* Why call me? */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Réactivité Maximum</h3>
              <p className="text-gray-600">Je suis basé dans le {clientConfig.departmentCode} pour garantir des délais d'intervention réduits sur {clientConfig.mainCity} et alentours.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Diagnostic Rapide</h3>
              <p className="text-gray-600">Dès mon arrivée, j'identifie la source du problème (fuite encastrée, bouchon profond) avec des outils professionnels.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Véhicule Équipé</h3>
              <p className="text-gray-600">Mon camion dispose d'un stock de pièces (joints, raccords, mécanismes) pour réparer immédiatement dans 90% des cas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Immediate steps */}
      <section className="py-20 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">En attendant mon arrivée...</h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-6 bg-red-50 rounded-2xl border border-red-100">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0 mt-1">1</div>
              <div>
                <h4 className="text-lg font-bold text-red-900 mb-2">Coupez l'arrivée d'eau générale</h4>
                <p className="text-red-800">C'est la première chose à faire en cas de fuite ou de rupture de canalisation pour limiter les dégâts. Le robinet se trouve généralement près de votre compteur d'eau.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
              <div className="w-8 h-8 rounded-full bg-yellow-500 text-white font-bold flex items-center justify-center shrink-0 mt-1">2</div>
              <div>
                <h4 className="text-lg font-bold text-yellow-900 mb-2">Coupez l'électricité (si nécessaire)</h4>
                <p className="text-yellow-800">Si l'eau s'approche de prises électriques, d'appareils électroménagers ou du tableau électrique, disjonctez l'alimentation par sécurité.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 mt-1">3</div>
              <div>
                <h4 className="text-lg font-bold text-blue-900 mb-2">Dégagez l'accès</h4>
                <p className="text-blue-800">Si possible, épongez le surplus et dégagez les meubles autour de la zone sinistrée pour que je puisse intervenir dès mon arrivée.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
