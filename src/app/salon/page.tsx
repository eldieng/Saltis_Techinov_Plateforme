import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Sparkles,
  Play,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Le Salon",
  description:
    "Découvrez SALTIS TechInov, le plus grand salon de l'Intelligence Artificielle en Afrique de l'Ouest. Édition 5 - 08-09 Décembre 2026.",
};

const pourquoiSaltis = [
  {
    title: "Penser l'IA pour l'Afrique",
    description: "Bâtir une intelligence maîtrisée, ancrée dans nos réalités et au service de nos priorités",
  },
  {
    title: "L'Intelligence Artificielle comme levier de croissance",
    description: "Faire de la donnée un levier de prospérité économique, où l'innovation devient le moteur d'un développement durable.",
  },
  {
    title: "Gouvernance Éclairée et Citoyenne",
    description: "Nourrir les politiques publiques par la recherche et l'éthique, pour une technologie transparente et co-construite avec le citoyen.",
  },
  {
    title: "Révéler des Talents",
    description: "Détecter, soutenir et accompagner l'excellence africaine pour transformer nos innovateurs en leaders mondiaux.",
  },
];

const commentSaltisAgit = [
  "Un salon annuel international rassemblant plus de 5000 participants autour de conférences, masterclass, démos, IA & Elles, PAS Challenge...",
  "Un comité scientifique en action, garant de rigueur académique et de continuité stratégique.",
  "Un cadre de visibilité et de crédibilité pour les startups IA prometteuses.",
  "Un acteur d'influence, avec des propositions concrètes adressées aux autorités et citoyens.",
  "Un programme d'activités mensuelles, décentralisées à travers le pays, pour construire collectivement les thématiques clés de chaque édition.",
];

const ceQueViseSaltis = [
  "Une référence nationale pour la formation des hauts fonctionnaires aux enjeux de l'IA, des données et de la souveraineté numérique ;",
  "Un lieu de confiance pour référencer les startups IA solides, créer des ponts entre projets et institutions, et faciliter l'investissement ;",
  "Une vitrine sur les derniers développements des connaissances et des solutions avec des publications, notes de position et recommandations stratégiques au service de l'intérêt général.",
];

const historique = [
  {
    year: "2022",
    title: "Fondations & Éthique",
    items: [
      "Lancement du PAS Challenge.",
      "Initiation des premiers débats sur l'éthique et la gouvernance de l'IA",
    ],
  },
  {
    year: "2023",
    title: "Stratégie & Partenariats",
    items: [
      "Présentation de la Stratégie Nationale IA & Données.",
      "Développement et consolidation de partenariats stratégiques clés",
    ],
  },
  {
    year: "2024",
    title: "Rayonnement & Infrastructure",
    items: [
      "Obtention de la labellisation internationale.",
      "Présentation du supercalculateur Taouey, pilier de la souveraineté numérique",
    ],
  },
  {
    year: "2025",
    title: "Structuration & Expertise",
    items: [
      "Mise en place du comité scientifique et publication du premier Livre Blanc.",
      "Renforcement du portage institutionnel et consécration sur la scène internationale",
    ],
  },
  {
    year: "2026",
    title: "Expansion & Impact Territorial (Projection)",
    items: [
      "Rayonnement : Propulsion des champions continentaux vers le marché mondial et attraction d'investissements stratégiques.",
      "Inclusion : Territorialisation de l'IA via la CaNal'IA",
      "Leadership : Célébration de l'audace féminine à travers l'initiative Lingère avec l'insertion en stage d'au minimum 20 jeunes filles",
    ],
  },
];

export default function SalonPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d5a75] via-[#0a4a62] to-[#083d52]">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6B35]/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 mb-8">
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-white text-sm font-medium">Édition 5 du SALTIS : 08-09 Décembre 2026</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Une vitrine de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-orange-400">
                souveraineté technologique
              </span>{" "}
              africaine
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              SALTIS est une plateforme de convergence et d&apos;impact pour l&apos;écosystème technologique africain.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-[#FF6B35] flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">08-09 Décembre 2026</p>
                  <p className="text-white/60 text-sm">2 jours d&apos;événement</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-[#FF6B35] flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">Musée des Civilisations Noires</p>
                  <p className="text-white/60 text-sm">Dakar, Sénégal</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="h-14 px-8 text-lg bg-gradient-to-r from-[#FF6B35] to-orange-500 hover:opacity-90 text-white shadow-lg shadow-orange-500/25"
                asChild
              >
                <a href="/billetterie">
                  Réserver ma place
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg border-white/30 text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <Link href="/programme">
                  <Play className="mr-2 w-5 h-5" />
                  Voir le programme
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Pourquoi SALTIS Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <Image
                src="/images/Logo-SALTIS.png"
                alt="SALTIS Logo"
                width={120}
                height={60}
                className="h-12 w-auto mb-6"
              />
              <h2 className="text-4xl md:text-5xl font-bold text-[#0d5a75] mb-8">
                POURQUOI SALTIS ?
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                L&apos;Afrique doit construire ses propres cadres de pensée et d&apos;action sur l&apos;intelligence artificielle et les technologies émergentes.
              </p>
              
              <div className="bg-[#0d5a75] rounded-2xl p-6 text-white mb-8">
                <p className="font-semibold mb-4">SALTIS est né d&apos;une conviction forte :</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#FF6B35] shrink-0 mt-0.5" />
                    <span>L&apos;IA n&apos;est pas seulement une affaire de recherche ou de marché, mais un levier de transformation sociale, économique et politique</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#FF6B35] shrink-0 mt-0.5" />
                    <span>Il faut connecter les acteurs, rendre visibles les talents et projets, et traduire les ambitions nationales en actions concrètes</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              {pourquoiSaltis.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-[#FF6B35] font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comment SALTIS Agit Section */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Image
                src="/images/Logo-SALTIS.png"
                alt="SALTIS Logo"
                width={100}
                height={50}
                className="h-10 w-auto mb-6"
              />
              <h2 className="text-4xl md:text-5xl font-bold text-[#0d5a75] mb-8">
                COMMENT<br />SALTIS AGIT ?
              </h2>
              <div className="bg-[#0d5a75] rounded-2xl p-6 text-white">
                <p className="font-medium">SALTIS est une plateforme de convergence et d&apos;impact</p>
              </div>
            </div>

            <div className="space-y-4">
              {commentSaltisAgit.map((item, index) => (
                <div key={index} className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 rounded-full bg-[#FF6B35] flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ce que vise SALTIS Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden bg-gray-200">
              <Image
                src="/images/ias-image.jpg"
                alt="SALTIS Event"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0d5a75] mb-8">
                CE QUE VISE SALTIS
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                <strong>SALTIS ambitionne de devenir :</strong>
              </p>
              <ul className="space-y-4">
                {ceQueViseSaltis.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#0d5a75] shrink-0 mt-2" />
                    <p className="text-gray-700">{item}</p>
                  </li>
                ))}
              </ul>
              <p className="text-right text-sm text-[#FF6B35] font-medium mt-8">
                Édition 5 du SALTIS : 08-09 Décembre 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Historique & Évolution Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <Image
              src="/images/Logo-SALTIS.png"
              alt="SALTIS Logo"
              width={80}
              height={40}
              className="h-8 w-auto"
            />
            <h2 className="text-3xl md:text-4xl font-bold text-[#0d5a75]">
              HISTORIQUE & ÉVOLUTION
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              {historique.map((item, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-[#FF6B35]">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#FF6B35]" />
                  <h3 className="text-[#FF6B35] font-bold text-lg mb-1">
                    {item.year} | {item.title}
                  </h3>
                  <ul className="space-y-1">
                    {item.items.map((subItem, subIndex) => (
                      <li key={subIndex} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-gray-400">○</span>
                        {subItem}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="relative h-[400px] lg:h-full rounded-3xl overflow-hidden bg-gray-200">
              <Image
                src="/images/ias-1.jpg"
                alt="SALTIS History"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <p className="text-right text-sm text-[#FF6B35] font-medium mt-8">
            Édition 5 du SALTIS : 08-09 Décembre 2026
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d5a75] via-[#0a4a62] to-[#083d52]">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#FF6B35]/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 mb-8">
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-white text-sm font-medium">Places limitées</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Prêt à rejoindre l&apos;aventure ?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Réservez votre place dès maintenant et faites partie de cet
              événement majeur de l&apos;innovation technologique en Afrique.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="h-14 px-8 text-lg bg-gradient-to-r from-[#FF6B35] to-orange-500 hover:opacity-90 text-white shadow-lg shadow-orange-500/25"
                asChild
              >
                <a href="/billetterie">
                  Réserver ma place
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg border-white/30 text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
