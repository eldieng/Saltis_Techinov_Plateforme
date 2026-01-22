import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  ArrowRight,
  CheckCircle,
  Globe,
  Rocket,
  MapPin,
  Star,
  Crown,
  Sparkles,
} from "lucide-react";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Exposants",
  description:
    "Découvrez les exposants de SALTIS TechInov 2025 : startups, entreprises tech et institutions innovantes.",
};

const benefits = [
  "Visibilité auprès de 5000+ participants qualifiés",
  "Networking avec investisseurs et décideurs",
  "Génération de leads qualifiés",
  "Couverture médiatique nationale et internationale",
  "Opportunités de partenariats stratégiques",
  "Accès aux conférences et ateliers",
];

const packages = [
  {
    name: "Standard",
    price: "500 000",
    features: [
      "Stand 9m²",
      "2 badges exposant",
      "Listing sur le site web",
      "Accès Wi-Fi",
    ],
  },
  {
    name: "Premium",
    price: "1 000 000",
    popular: true,
    features: [
      "Stand 18m²",
      "4 badges exposant",
      "Logo sur les supports",
      "Mention dans la newsletter",
      "1 intervention de 15min",
      "Accès VIP networking",
    ],
  },
  {
    name: "Platinum",
    price: "2 000 000",
    features: [
      "Stand 36m²",
      "8 badges exposant",
      "Logo premium partout",
      "Keynote de 30min",
      "Article dédié",
      "Accès VIP complet",
      "Leads qualifiés",
    ],
  },
];

const categoryColors: Record<string, string> = {
  startup: "bg-green-100 text-green-700",
  entreprise: "bg-blue-100 text-blue-700",
  institution: "bg-purple-100 text-purple-700",
  association: "bg-orange-100 text-orange-700",
  media: "bg-yellow-100 text-yellow-700",
};

export default async function ExposantsPage() {
  const exposants = await prisma.exhibitor.findMany({
    where: { 
      isActive: true,
      status: "APPROVED",
    },
    orderBy: { name: "asc" },
  });
  return (
    <div className="min-h-screen">
      {/* Hero - Modern Gradient */}
      <section className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d5a75] via-[#0a4a62] to-[#083d52]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6B35]/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 mb-6">
              <Building2 className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-white text-sm font-medium">{exposants.length} exposants confirmés</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Nos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-orange-400">
                Exposants
              </span>
            </h1>

            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Découvrez les entreprises, startups et institutions qui exposent
              leurs innovations lors de SALTIS TechInov 2025.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10">
                <Building2 className="w-5 h-5 text-[#FF6B35]" />
                <div className="text-left">
                  <span className="text-white font-bold">100+</span>
                  <span className="text-white/70 text-sm ml-1">Exposants</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10">
                <Rocket className="w-5 h-5 text-[#FF6B35]" />
                <div className="text-left">
                  <span className="text-white font-bold">50+</span>
                  <span className="text-white/70 text-sm ml-1">Startups</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10">
                <Globe className="w-5 h-5 text-[#FF6B35]" />
                <div className="text-left">
                  <span className="text-white font-bold">20+</span>
                  <span className="text-white/70 text-sm ml-1">Pays</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 80L60 73.3C120 66.7 240 53.3 360 46.7C480 40 600 40 720 43.3C840 46.7 960 53.3 1080 56.7C1200 60 1320 60 1380 60L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Exposants Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-[#FF6B35] font-semibold text-sm uppercase tracking-wider mb-2">
              Ils nous font confiance
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Exposants confirmés
            </h2>
          </div>
          {exposants.length === 0 ? (
            <div className="text-center py-16">
              <Building2 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Exposants à venir</h3>
              <p className="text-gray-500">Les exposants seront bientôt annoncés. Revenez plus tard !</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exposants.map((exposant) => (
                <div
                  key={exposant.id}
                  className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    {exposant.logo ? (
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 group-hover:scale-110 transition-transform">
                        <Image
                          src={exposant.logo}
                          alt={exposant.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0d5a75] to-[#0a4a62] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Building2 className="w-7 h-7 text-white" />
                      </div>
                    )}
                    <Badge className={`${categoryColors[exposant.category] || "bg-gray-100 text-gray-700"} px-3 py-1 rounded-full text-xs font-semibold`}>
                      {exposant.category}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#0d5a75] transition-colors mb-2">
                    {exposant.name}
                  </h3>
                  {exposant.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {exposant.description}
                    </p>
                  )}
                  {exposant.boothNumber && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                      <MapPin className="w-4 h-4 text-[#FF6B35]" />
                      Stand: <span className="font-semibold text-[#0d5a75]">{exposant.boothNumber}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Become Exposant */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-[#FF6B35]" />
                <span className="text-[#FF6B35] text-sm font-semibold">Devenez exposant</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Pourquoi exposer à{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d5a75] to-[#FF6B35]">
                  SALTIS ?
                </span>
              </h2>
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-[#FF6B35]/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#FF6B35] transition-colors">
                      <CheckCircle className="w-4 h-4 text-[#FF6B35] group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                className="h-14 px-8 text-lg bg-gradient-to-r from-[#FF6B35] to-orange-500 hover:opacity-90 text-white shadow-lg shadow-orange-500/25"
                asChild
              >
                <Link href="/formulaire-exposant">
                  Demander un stand
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            {/* Packages */}
            <div className="space-y-5">
              {packages.map((pkg, index) => {
                const IconComponent = index === 0 ? Building2 : index === 1 ? Star : Crown;
                return (
                  <div
                    key={index}
                    className={`group rounded-3xl p-6 border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      pkg.popular
                        ? "border-[#FF6B35] bg-gradient-to-br from-[#FF6B35]/5 to-orange-50"
                        : "border-gray-200 bg-white hover:border-[#0d5a75]/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          pkg.popular 
                            ? "bg-gradient-to-br from-[#FF6B35] to-orange-500" 
                            : "bg-gradient-to-br from-[#0d5a75] to-[#0a4a62]"
                        }`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            Pack {pkg.name}
                          </h3>
                          <p className="text-2xl font-bold text-[#0d5a75]">
                            {pkg.price}{" "}
                            <span className="text-sm font-normal text-gray-500">
                              FCFA
                            </span>
                          </p>
                        </div>
                      </div>
                      {pkg.popular && (
                        <Badge className="bg-gradient-to-r from-[#FF6B35] to-orange-500 text-white border-0 px-3 py-1">
                          Populaire
                        </Badge>
                      )}
                    </div>
                    <ul className="grid grid-cols-2 gap-2">
                      {pkg.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle className={`w-4 h-4 ${pkg.popular ? "text-[#FF6B35]" : "text-[#0d5a75]"}`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
