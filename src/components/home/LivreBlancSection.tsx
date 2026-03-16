"use client";

import Image from "next/image";
import { BookOpen, Brain, Globe, Users, TrendingUp, Download } from "lucide-react";

const features = [
  { icon: Brain, text: "Comprendre l'IA et ses enjeux" },
  { icon: Globe, text: "Applications en Afrique" },
  { icon: Users, text: "Contributions d'experts" },
  { icon: TrendingUp, text: "Perspectives stratégiques" },
];

export function LivreBlancSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Left Content */}
              <div className="lg:col-span-3 p-8 lg:p-12">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white text-sm font-semibold rounded-lg mb-6">
                  <BookOpen className="w-4 h-4" />
                  PUBLICATION EXCLUSIVE
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0d5a75] mb-4">
                  Livre Blanc <span className="text-[#0d5a75]">officiel du</span>
                  <br />
                  <span className="text-[#FF6B35]">SALTIS 2025</span>
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Découvrez notre livre blanc exclusif qui explore l&apos;Intelligence
                  Artificielle et ses applications multisectorielles. Rédigé par des
                  experts reconnus, ce guide vous offre une vision complète de l&apos;IA
                  en Afrique.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#FF8A5C] flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium text-sm">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href="/images/document/Livre-Blanc-Officiel-SALTIS-2025 (2).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 w-full sm:w-auto justify-center px-8 py-4 bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-lg shadow-[#FF6B35]/25"
                >
                  <Download className="w-5 h-5" />
                  Télécharger le Livre Blanc
                </a>

                {/* Info Tags */}
                <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-gray-100">
                  <div>
                    <span className="text-[#FF6B35] font-bold text-lg">PDF</span>
                    <p className="text-gray-500 text-sm">Format</p>
                  </div>
                  <div>
                    <span className="text-[#FF6B35] font-bold text-lg">Gratuit</span>
                    <p className="text-gray-500 text-sm">Accès</p>
                  </div>
                  <div>
                    <span className="text-[#FF6B35] font-bold text-lg">2025</span>
                    <p className="text-gray-500 text-sm">Édition</p>
                  </div>
                </div>
              </div>

              {/* Right - Book Cover */}
              <div className="lg:col-span-2 bg-gradient-to-br from-[#0d5a75] to-[#094559] p-8 lg:p-12 flex flex-col items-center justify-center">
                <div className="relative">
                  {/* Book mockup */}
                  <div className="w-48 h-64 bg-white rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <div className="w-full h-full bg-gradient-to-br from-[#0d5a75] to-[#1a7a9a] rounded-lg p-4 flex flex-col items-center justify-center text-center">
                      <Image
                        src="/images/Logo-SALTIS.png"
                        alt="SALTIS Logo"
                        width={60}
                        height={60}
                        className="mb-4"
                      />
                      <h4 className="text-white font-bold text-lg mb-1">LIVRE BLANC</h4>
                      <p className="text-white/70 text-xs">Comité Scientifique du SALTIS</p>
                    </div>
                  </div>
                </div>

                {/* QR Code section */}
                <div className="mt-8 bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                  <p className="text-white/80 text-sm font-medium mb-2">
                    SCANNEZ POUR TÉLÉCHARGER
                  </p>
                  <div className="w-24 h-24 bg-white rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-gray-400 text-xs">QR Code</span>
                  </div>
                  <p className="text-white/60 text-xs mt-2">
                    Accès direct au téléchargement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
