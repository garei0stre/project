import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { clientConfig } from '../config';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'depannage',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: '', phone: '', email: '', service: 'depannage', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 800);
  };

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Contact & Devis</h1>
          <p className="text-lg text-gray-600">
            Une urgence ? Un projet de rénovation ? Contactez-moi par téléphone ou via le formulaire ci-dessous. Devis gratuit et intervention rapide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Mes Coordonnées</h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Téléphone (Urgences)</h3>
                  <p className="text-gray-500 mb-2">Disponible 24h/24 et 7j/7 pour les urgences.</p>
                  <a href={`tel:${clientConfig.phoneRaw}`} className="text-2xl font-extrabold text-blue-600 hover:text-blue-700 transition-colors">
                    {clientConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Email</h3>
                  <p className="text-gray-500 mb-2">Pour vos demandes de devis et questions générales.</p>
                  <a href={`mailto:${clientConfig.email}`} className="text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors break-all">
                    {clientConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Zone d'intervention</h3>
                  <p className="text-gray-600 font-medium">{clientConfig.shortAreaCovered}</p>
                  <p className="text-gray-500 text-sm mt-1">{clientConfig.detailedAreaText}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2">À propos</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {clientConfig.aboutDescription}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Demander un Devis Gratuit</h2>
            
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-900 mb-2">Message envoyé !</h3>
                <p className="text-green-700">Merci de m'avoir contacté. Je vous répondrai dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nom et Prénom *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="Jean Dupont"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Téléphone *</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="06 12 34 56 78"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="jean@exemple.fr"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Type d'intervention *</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    <option value="depannage">Dépannage Urgent (Fuite, etc.)</option>
                    <option value="debouchage">Débouchage canalisation</option>
                    <option value="chauffe_eau">Chauffe-eau / Chaudière</option>
                    <option value="renovation">Installation / Rénovation</option>
                    <option value="autre">Autre demande</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Votre Message *</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                    placeholder="Décrivez brièvement votre problème ou votre projet..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <span>Envoyer ma demande</span>
                  <Send className="w-5 h-5" />
                </button>
                <p className="text-xs text-gray-400 text-center mt-4">
                  Vos données sont protégées et ne seront utilisées que pour vous recontacter.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
