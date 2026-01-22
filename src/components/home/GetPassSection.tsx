"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Rocket, 
  TrendingUp, 
  Building2, 
  Check, 
  ArrowRight,
  Sparkles
} from "lucide-react";

type PassType = "visitor" | "startup" | "investor" | "sponsor";

interface PassOption {
  id: PassType;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  features: string[];
  cta: string;
  href: string;
}

const passOptions: PassOption[] = [
  {
    id: "visitor",
    title: "Visiteur",
    subtitle: "Découvrez l'innovation",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50 hover:bg-blue-100",
    features: [
      "Accès aux conférences",
      "Networking avec les exposants",
      "Accès à l'espace exposition",
      "Badge personnalisé",
    ],
    cta: "Réserver mon pass",
    href: "/billetterie",
  },
  {
    id: "startup",
    title: "Startup",
    subtitle: "Exposez votre innovation",
    icon: Rocket,
    color: "text-[#FF6B35]",
    bgColor: "bg-orange-50 hover:bg-orange-100",
    features: [
      "Stand d'exposition dédié",
      "Pitch devant les investisseurs",
      "Accès VIP aux sessions",
      "Mise en relation privilégiée",
    ],
    cta: "Postuler comme Startup",
    href: "/billetterie?type=startup",
  },
  {
    id: "investor",
    title: "Investisseur",
    subtitle: "Découvrez les pépites",
    icon: TrendingUp,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 hover:bg-emerald-100",
    features: [
      "Accès prioritaire aux pitchs",
      "Rencontres B2B organisées",
      "Lounge investisseurs exclusif",
      "Deal flow personnalisé",
    ],
    cta: "Devenir Investisseur",
    href: "/billetterie?type=investor",
  },
  {
    id: "sponsor",
    title: "Sponsor",
    subtitle: "Soutenez l'innovation",
    icon: Building2,
    color: "text-[#0d5a75]",
    bgColor: "bg-cyan-50 hover:bg-cyan-100",
    features: [
      "Visibilité maximale",
      "Espace partenaire premium",
      "Prise de parole en plénière",
      "Package communication inclus",
    ],
    cta: "Devenir Sponsor",
    href: "/contact?subject=sponsor",
  },
];

export function GetPassSection() {
  const [activePass, setActivePass] = useState<PassType>("visitor");

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#0d5a75]/10 mb-6">
            <Sparkles className="w-4 h-4 text-[#FF6B35] mr-2" />
            <span className="text-[#0d5a75] text-sm font-medium">
              Rejoignez-nous
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Réservez Votre Place
          </h2>
          <p className="text-lg text-gray-600">
            Participez au plus grand Salon de l&apos;Intelligence Artificielle en Afrique de l&apos;Ouest.
            Choisissez le pass qui correspond à votre profil.
          </p>
        </div>

        {/* Pass Type Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {passOptions.map((pass) => {
            const Icon = pass.icon;
            return (
              <button
                key={pass.id}
                onClick={() => setActivePass(pass.id)}
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activePass === pass.id
                    ? "bg-[#0d5a75] text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {pass.title}
              </button>
            );
          })}
        </div>

        {/* Pass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {passOptions.map((pass) => {
            const Icon = pass.icon;
            const isActive = activePass === pass.id;
            
            return (
              <div
                key={pass.id}
                className={`relative rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-white shadow-xl ring-2 ring-[#0d5a75] scale-105"
                    : "bg-white shadow-md hover:shadow-lg"
                }`}
                onClick={() => setActivePass(pass.id)}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#FF6B35] text-white text-xs font-medium rounded-full">
                    Sélectionné
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${pass.bgColor} flex items-center justify-center mb-4 transition-colors`}>
                  <Icon className={`w-7 h-7 ${pass.color}`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {pass.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{pass.subtitle}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {pass.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <Check className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${pass.color}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`w-full ${
                    isActive
                      ? "bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                  asChild
                >
                  <a href={pass.href}>
                    {pass.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            );
          })}
        </div>

        {/* Bottom Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-[#0d5a75]/5 rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#FF6B35] rounded-full animate-pulse" />
              <span className="text-[#0d5a75] font-medium">15-16 Juin 2025</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-[#0d5a75]/20" />
            <span className="text-gray-600">Musée des Civilisations Noires, Dakar</span>
            <div className="hidden sm:block w-px h-6 bg-[#0d5a75]/20" />
            <span className="text-[#0d5a75] font-semibold">Places limitées</span>
          </div>
        </div>
      </div>
    </section>
  );
}
