"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";

const avantages = [
  "Stabilité institutionnelle",
  "Leadership diplomatique IA (PMIA, ONU)",
  "Vision politique claire :",
];

const visionItems = [
  "Vision Sénégal 2050",
  "New Deal Technologique",
  "Stratégie Nationale IA & Donnée",
];

const capitalHumain = [
  "Universités engagées : UCAD, Bambey, UVS, UGB, Thiès, Ziguinchor",
  "Coopérations internationales solides",
  "Diaspora scientifique mobilisée",
];

const infrastructures = [
  "Supercalculateur Taouey – 537 TFlops",
  "Data centers nationaux (CINERI)",
  "Réseaux télécoms robustes",
  "Écosystème fintech mature",
  "Satellite GaindéSat",
  "Plateformes géospatiales (GICC)",
];

const investissement = [
  "Émergence d'un fonds catalytique IA",
  "Startup Act opérationnel",
  "Appui bailleurs internationaux",
  "Ambition de levée de fonds régionale",
];

export function WhySenegalSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-16">
          <Image
            src="/images/Flag_of_Senegal.svg.png"
            alt="Drapeau du Sénégal"
            width={60}
            height={40}
            className="rounded shadow-sm"
          />
          <h2 className="text-4xl md:text-5xl font-bold text-[#0d5a75]">
            Pourquoi le <span className="text-[#FF6B35]">Sénégal</span> ?
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Avantages comparatifs */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
            <h3 className="text-[#FF6B35] font-bold text-lg mb-4">
              Avantages comparatifs structurants
            </h3>
            <ul className="space-y-3">
              {avantages.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-[#0d5a75] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <ul className="ml-7 mt-2 space-y-1">
              {visionItems.map((item, index) => (
                <li key={index} className="text-gray-600 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Capital humain */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
            <h3 className="text-[#FF6B35] font-bold text-lg mb-4">
              Capital humain & recherche
            </h3>
            <ul className="space-y-3">
              {capitalHumain.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-[#0d5a75] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dynamique d'investissement */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
            <h3 className="text-[#FF6B35] font-bold text-lg mb-4">
              Dynamique d&apos;investissement
            </h3>
            <ul className="space-y-3">
              {investissement.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-[#0d5a75] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Infrastructures - Full Width */}
        <div className="mt-8 bg-[#0d5a75] rounded-2xl p-8">
          <h3 className="text-[#FF6B35] font-bold text-xl mb-6">
            Infrastructures existantes
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {infrastructures.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3"
              >
                <CheckCircle className="w-5 h-5 text-[#FF6B35] shrink-0" />
                <span className="text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
