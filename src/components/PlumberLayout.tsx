import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Droplet, Wrench, Clock, MapPin, Mail, ChevronRight } from 'lucide-react';
import { clientConfig } from '../config';

export default function PlumberLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Urgence 24/7', path: '/urgence' },
    { name: 'Réalisations', path: '/realisations' },
    { name: 'Contact & Devis', path: '/contact' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 selection:bg-blue-600 selection:text-white">
      {/* Top Banner - Emergency Focus */}
      <div className="bg-red-600 text-white text-sm font-medium py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-2">
          <div className="flex items-center space-x-2">
            <Droplet className="w-4 h-4 animate-pulse" />
            <span>Dépannage Urgent {clientConfig.departmentName} - Intervention Rapide</span>
          </div>
          <a href={`tel:${clientConfig.phoneRaw}`} className="flex items-center space-x-2 bg-white text-red-600 px-3 py-1 rounded-full font-bold hover:bg-gray-100 transition-colors">
            <Phone className="w-4 h-4" />
            <span>{clientConfig.phone}</span>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-32">
            {/* Logo */}
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              {clientConfig.logo ? (
                <img
                  src={clientConfig.logo}
                  alt={clientConfig.companyName}
                  className="h-32 w-auto object-contain shrink-0"
                />
              ) : (
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0">
                  <Wrench className="w-7 h-7" />
                </div>
              )}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-bold transition-colors ${location.pathname === link.path
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right actions (CTA / Mobile Menu) */}
            <div className="flex items-center space-x-4">
              <Link
                to="/contact"
                className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg items-center space-x-2 shrink-0"
              >
                <span>Demander un devis</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={`block px-3 py-4 text-base font-bold rounded-md ${location.pathname === link.path
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {clientConfig.logo ? (
                  <img
                    src={clientConfig.logo}
                    alt={clientConfig.companyName}
                    className="max-h-14 w-auto max-w-[180px] object-contain shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0">
                    <Wrench className="w-6 h-6" />
                  </div>
                )}
                <h2 className="font-extrabold text-xl">{clientConfig.companyName}</h2>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Artisan plombier de confiance en {clientConfig.departmentName}. Dépannage urgent, installation sanitaire, et rénovation. Devis gratuit et intervention rapide.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4 border-b border-gray-800 pb-2">Contactez-nous</h3>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-medium">Urgences & Devis</span>
                    <a href={`tel:${clientConfig.phoneRaw}`} className="text-white font-bold hover:text-blue-400 text-base">{clientConfig.phone}</a>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-medium">Email</span>
                    <a href={`mailto:${clientConfig.email}`} className="hover:text-blue-400">{clientConfig.email}</a>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>{clientConfig.areaCovered}</span>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-bold mb-4 border-b border-gray-800 pb-2">Nos Services</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/urgence" className="hover:text-blue-400">Dépannage Urgent 24/7</Link></li>
                <li><Link to="/services" className="hover:text-blue-400">Débouchage canalisations</Link></li>
                <li><Link to="/services" className="hover:text-blue-400">Recherche de fuite</Link></li>
                <li><Link to="/services" className="hover:text-blue-400">Changement de robinetterie</Link></li>
                <li><Link to="/services" className="hover:text-blue-400">Installation chauffe-eau</Link></li>
                <li><Link to="/services" className="hover:text-blue-400">Création salle de bain</Link></li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h3 className="text-lg font-bold mb-4 border-b border-gray-800 pb-2">Horaires</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex justify-between items-center">
                  <span>Lundi - Vendredi</span>
                  <span className="text-white font-medium">{clientConfig.hoursWeek}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Samedi</span>
                  <span className="text-white font-medium">{clientConfig.hoursSaturday}</span>
                </li>
                <li className="flex justify-between items-center pt-2 border-t border-gray-800">
                  <span className="text-red-400 font-bold">Urgences</span>
                  <span className="text-red-400 font-bold">{clientConfig.hoursEmergency}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>© {new Date().getFullYear()} {clientConfig.companyName} - {clientConfig.plumberName}. Tous droits réservés.</p>
            <div className="mt-4 md:mt-0 space-x-4">
              <Link to="/" className="hover:text-white">Mentions Légales</Link>
              <Link to="/" className="hover:text-white">Politique de confidentialité</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Emergency Button (Mobile Only) */}
      <a
        href={`tel:${clientConfig.phoneRaw}`}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-red-700 transition-colors z-50 animate-bounce"
        style={{ animationDuration: '2s' }}
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}