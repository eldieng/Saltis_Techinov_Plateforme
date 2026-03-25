"use client";

import Image from "next/image";
import { Download, ArrowRight } from "lucide-react";

export function ReportsSection() {
  return (
    <>
      {/* SALTIS 2025 Report Section */}
      <section className="py-16 bg-gradient-to-br from-[#0d5a75] via-[#0a4a62] to-[#094559] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-2xl" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left - Content */}
            <div className="text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 bg-[#FF6B35]/20 border border-[#FF6B35]/40 text-[#FF6B35] text-sm font-semibold rounded-full mb-6">
                RAPPORT OFFICIEL
              </span>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Rapport <span className="text-[#FF6B35]">SALTIS 2025</span>
              </h2>
              
              <p className="text-white/70 text-lg mb-8 leading-relaxed max-w-lg">
                Découvrez le bilan complet de l&apos;édition 2025 : discussions, innovations, 
                chiffres clés et perspectives pour l&apos;avenir de l&apos;IA en Afrique de l&apos;Ouest.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="/images/document/Rapport-SALTIS-2025-.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-lg shadow-[#FF6B35]/25"
                >
                  <Download className="w-5 h-5" />
                  Télécharger le rapport
                </a>
                <a
                  href="/images/document/Rapport-SALTIS-2025-.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-white/30 text-white font-medium rounded-xl hover:bg-white/10 transition-all"
                >
                  Consulter en ligne
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Right - Cover Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-72 h-96 rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300 overflow-hidden">
                  <Image
                    src="/images/rapport SALTIS.png"
                    alt="Rapport SALTIS 2025"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-72 h-96 bg-[#FF6B35]/20 rounded-lg -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAS Challenge 2025 Report Section */}
      <section className="py-16 bg-gradient-to-br from-[#094559] via-[#0a4a62] to-[#0d5a75] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-2xl" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left - Cover Image */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative">
                <div className="w-72 h-96 rounded-lg shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300 overflow-hidden">
                  <Image
                    src="/images/rapport PAS.png"
                    alt="Rapport PAS Challenge 2025"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-72 h-96 bg-white/10 rounded-lg -z-10" />
              </div>
            </div>
            
            {/* Right - Content */}
            <div className="text-center lg:text-left order-1 lg:order-2">
              <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/30 text-white text-sm font-semibold rounded-full mb-6">
                PAS CHALLENGE
              </span>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Rapport <span className="text-[#FF6B35]">PAS Challenge 2025</span>
              </h2>
              
              <p className="text-white/70 text-lg mb-8 leading-relaxed max-w-lg">
                Retrouvez le rapport officiel du PAS Challenge 2025 : résultats, projets innovants 
                et retours sur cette compétition dédiée à l&apos;intelligence artificielle.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="/images/document/Rapport-officiel-du-challenge-PAS-2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#0d5a75] font-semibold rounded-xl transition-all hover:scale-105 shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  Télécharger le rapport
                </a>
                <a
                  href="/images/document/Rapport-officiel-du-challenge-PAS-2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-white/30 text-white font-medium rounded-xl hover:bg-white/10 transition-all"
                >
                  Consulter en ligne
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
