import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Users,
  MapPin,
  Sparkles,
  ArrowRight,
  Target,
  Lightbulb,
  Globe,
  CheckCircle,
  Medal,
  Award,
  Crown,
  Shield,
  Leaf,
  Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "P.A.S Challenge",
  description:
    "Le Challenge P.A.S - Préparer l'Afrique pour les Jeux Olympiques de la Jeunesse 2026 avec l'IA et les technologies numériques.",
};

const saltisObjectives = [
  {
    icon: Shield,
    title: "Souveraineté Numérique",
    description:
      "Renforcer la souveraineté numérique africaine à travers l'innovation et la technologie.",
  },
  {
    icon: Leaf,
    title: "Solutions Responsables",
    description:
      "Mettre en avant des solutions technologiques responsables et durables.",
  },
  {
    icon: Building2,
    title: "Hub Continental",
    description:
      "Faire du Sénégal un hub continental en intelligence artificielle, innovation sportive et technologies immersives.",
  },
];

const challengeObjectives = [
  {
    icon: Lightbulb,
    title: "Révéler des Talents",
    description:
      "Identifier et accompagner les jeunes innovateurs africains dans le développement de leurs projets.",
  },
  {
    icon: MapPin,
    title: "Faciliter l'Accueil et la Mobilité",
    description:
      "Faciliter les déplacements, la billetterie, la fluidité et la sécurité des visiteurs.",
  },
  {
    icon: Globe,
    title: "Valoriser le Tourisme et le Patrimoine",
    description:
      "Créer des expériences numériques immersives pour valoriser la culture sénégalaise.",
  },
];

const categories = [
  {
    title: "Accueil, Mobilité & Organisation",
    teams: "10 équipes",
    items: [
      "Transport intelligent",
      "Billetterie numérique",
      "Chatbots multilingues",
      "Sécurité, Santé & orientation",
    ],
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Tourisme, Culture & Patrimoine",
    teams: "15 équipes",
    items: [
      "Réalité augmentée & virtuelle",
      "Tourisme immersif & gamification",
      "Valorisation du patrimoine",
      "Expériences inclusives",
    ],
    color: "from-purple-500 to-purple-600",
  },
];

const sponsorTiers = [
  {
    name: "Bronze",
    icon: Medal,
    color: "from-amber-600 to-amber-700",
    features: [
      { text: "Logo sur supports de communication", included: true },
      { text: "Logo sur prix/remise officielle", included: false },
      { text: "Présence sur scène", included: false },
      { text: "Accès privilégié aux équipes", included: false },
    ],
  },
  {
    name: "Argent",
    icon: Award,
    color: "from-gray-400 to-gray-500",
    features: [
      { text: "Logo sur supports de communication", included: true },
      { text: "Logo sur prix/remise officielle", included: true },
      { text: "Présence sur scène", included: false },
      { text: "Accès privilégié aux équipes", included: false },
    ],
  },
  {
    name: "Or",
    icon: Crown,
    color: "from-yellow-400 to-yellow-500",
    popular: true,
    features: [
      { text: "Logo sur supports de communication", included: true },
      { text: "Logo sur prix/remise officielle", included: true },
      { text: "Présence sur scène (5 min)", included: true },
      { text: "Accès privilégié aux équipes", included: true },
    ],
  },
];

export default function PagChallengePage() {
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
              <Trophy className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-white text-sm font-medium">JOJ Dakar 2026</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              P.A.S{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-orange-400">
                Challenge
              </span>
            </h1>

            <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto">
              L&apos;Afrique doit préparer ses Jeux Olympiques de la Jeunesse 2026 en mobilisant 
              ses talents autour de l&apos;IA et des technologies numériques pour inventer des 
              solutions concrètes d&apos;accueil, de mobilité et de valorisation du patrimoine.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="h-14 px-8 text-lg bg-gradient-to-r from-[#FF6B35] to-orange-500 hover:opacity-90 text-white shadow-lg shadow-orange-500/25"
                asChild
              >
                <Link href="/contact">
                  Participer au Challenge
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg border-white/30 text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <Link href="#sponsors">Devenir Sponsor</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 80L60 73.3C120 66.7 240 53.3 360 46.7C480 40 600 40 720 43.3C840 46.7 960 53.3 1080 56.7C1200 60 1320 60 1380 60L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* SALTIS Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 rounded-full px-4 py-2 mb-6">
                <Trophy className="w-4 h-4 text-[#FF6B35]" />
                <span className="text-[#FF6B35] text-sm font-semibold">SALTIS</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Le Salon International des Algorithmes
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Le SALTIS – Salon International des Algorithmes, des Sciences - Technologies et de 
                l&apos;Innovation du Sénégal est l&apos;épicentre de la réflexion et de l&apos;action pour une 
                Afrique numérique et innovante.
              </p>
              <p className="text-gray-600">
                Labellisé par le Sommet International de l&apos;IA en 2024, le SALTIS est devenu un 
                rendez-vous incontournable pour connecter les idées, les talents et les solutions.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {saltisObjectives.map((objective, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0d5a75] to-[#0a4a62] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <objective.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {objective.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{objective.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Objectives Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 rounded-full px-4 py-2 mb-6">
              <Target className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-[#FF6B35] text-sm font-semibold">Le Challenge P.A.S</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Une conviction forte
            </h2>
            <p className="text-lg text-gray-600">
              Que les jeunes talents africains peuvent inventer des solutions concrètes pour les JOJ.
              Que les projets étudiants et innovateurs doivent être accompagnés et valorisés pour devenir réalité en 2026.
            </p>
          </div>

          {/* Objectives */}
          <div className="grid md:grid-cols-3 gap-8">
            {challengeObjectives.map((objective, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0d5a75] to-[#0a4a62] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <objective.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {objective.title}
                </h3>
                <p className="text-gray-600">{objective.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-[#FF6B35] font-semibold text-sm uppercase tracking-wider mb-2">
              Catégories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Catégorisation des Projets
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100"
              >
                <div className={`bg-gradient-to-r ${category.color} p-6`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                    <span className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-white text-sm font-medium">
                      {category.teams}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#FF6B35]/10 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-[#FF6B35]" />
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsor Tiers */}
      <section id="sponsors" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-[#FF6B35] font-semibold text-sm uppercase tracking-wider mb-2">
              Partenariat
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Devenez Partenaire du Challenge
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chaque partenaire contribue à façonner l&apos;accueil et le tourisme des JOJ Dakar 2026.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {sponsorTiers.map((tier, index) => (
              <div
                key={index}
                className={`relative rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                  tier.popular
                    ? "border-[#FF6B35] bg-gradient-to-br from-[#FF6B35]/5 to-orange-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#FF6B35] to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                      Recommandé
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center mx-auto mb-4`}>
                    <tier.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                </div>
                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        feature.included ? "bg-green-100" : "bg-gray-100"
                      }`}>
                        {feature.included ? (
                          <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <span className="w-2 h-0.5 bg-gray-400 rounded" />
                        )}
                      </div>
                      <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full mt-6 ${
                    tier.popular
                      ? "bg-gradient-to-r from-[#FF6B35] to-orange-500 hover:opacity-90 text-white"
                      : "bg-[#0d5a75] hover:bg-[#0d5a75]/90 text-white"
                  }`}
                  asChild
                >
                  <Link href="/contact">Devenir {tier.name}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d5a75] to-[#083d52]">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF6B35]/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 mb-6">
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-white text-sm font-medium">Rejoignez l&apos;aventure</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Prêt à relever le défi ?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Participez au Challenge P.A.S et contribuez à façonner l&apos;avenir 
              des Jeux Olympiques de la Jeunesse Dakar 2026.
            </p>
            <Button
              size="lg"
              className="h-14 px-8 text-lg bg-gradient-to-r from-[#FF6B35] to-orange-500 hover:opacity-90 text-white shadow-lg shadow-orange-500/25"
              asChild
            >
              <Link href="/contact">
                Nous contacter
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
