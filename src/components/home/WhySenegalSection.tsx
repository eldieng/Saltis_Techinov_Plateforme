"use client";

import Image from "next/image";
import { MapPin, Server, GraduationCap, TrendingUp } from "lucide-react";

const avantages = [
  "Stabilité institutionnelle",
  "Leadership diplomatique IA (PMIA, ONU)",
  "Vision politique claire : Vision Sénégal 2050, New Deal Technologique, Stratégie Nationale IA & Données",
];

const infrastructures = [
  "Supercalculateur Taouey - 537 TFlops",
  "Data centers nationaux (CINERI)",
  "Réseaux télécoms robustes",
  "Écosystème fintech mature",
  "Satellite GaindéSat",
  "Plateformes géospatiales (GICC)",
];

const capitalHumain = [
  "Universités engagées (UCAD, UGB, Thiès, Ziguinchor, Bambey)",
  "Coopérations internationales (France, UE, ONU)",
  "Diaspora scientifique mobilisée",
];

const investissement = [
  "Émergence d'un fonds catalytique IA",
  "Startup Act opérationnel",
  "Appui bailleurs internationaux",
  "Ambition de levée de fonds régionale",
];

export function WhySenegalSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Image
              src="/images/Flag_of_Senegal.svg.png"
              alt="Drapeau du Sénégal"
              width={50}
              height={35}
              className="rounded shadow-sm"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Pourquoi le <span className="text-[#FF6B35]">Sénégal</span> ?
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Card 1 - Avantages comparatifs */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#FF6B35]" />
              </div>
              <h3 className="font-bold text-gray-900">Avantages comparatifs structurants</h3>
            </div>
            <ul className="space-y-3">
              {avantages.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 - Infrastructures */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center">
                <Server className="w-5 h-5 text-[#FF6B35]" />
              </div>
              <h3 className="font-bold text-gray-900">Infrastructures existantes</h3>
            </div>
            <ul className="space-y-3">
              {infrastructures.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3 - Capital humain */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-[#FF6B35]" />
              </div>
              <h3 className="font-bold text-gray-900">Capital humain & recherche</h3>
            </div>
            <ul className="space-y-3">
              {capitalHumain.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 4 - Dynamique d'investissement */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#FF6B35]" />
              </div>
              <h3 className="font-bold text-gray-900">Dynamique d&apos;investissement</h3>
            </div>
            <ul className="space-y-3">
              {investissement.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
