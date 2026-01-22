import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Users,
  Lightbulb,
  Target,
  Award,
  ArrowRight,
  Sparkles,
  Play,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Le Salon",
  description:
    "Découvrez SALTIS TechInov, le plus grand salon de l'Intelligence Artificielle en Afrique de l'Ouest. Musée des Civilisations Noires, Dakar.",
};

const highlights = [
  {
    icon: Users,
    title: "5000+ Participants",
    description: "Professionnels, entrepreneurs et passionnés du numérique",
  },
  {
    icon: Lightbulb,
    title: "100+ Exposants",
    description: "Startups, entreprises tech et institutions innovantes",
  },
  {
    icon: Target,
    title: "50+ Conférences",
    description: "Panels, keynotes et ateliers pratiques",
  },
  {
    icon: Award,
    title: "Networking Premium",
    description: "Rencontres B2B et opportunités de partenariat",
  },
];

const objectives = [
  "Promouvoir l'innovation technologique et l'IA en Afrique",
  "Créer un écosystème tech dynamique au Sénégal",
  "Faciliter les rencontres entre startups et investisseurs",
  "Former et sensibiliser aux nouvelles technologies",
  "Encourager la souveraineté technologique africaine",
];

export default function SalonPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Immersive */}
      <section className="relative pt-20 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d5a75] via-[#0a4a62] to-[#083d52]">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6B35]/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 mb-8">
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-white text-sm font-medium">Édition 2025 • Thème : Jàng, Jàngal, Jàngat</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Le plus grand Salon de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-orange-400">
                l&apos;IA
              </span>{" "}
              en Afrique de l&apos;Ouest
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              Deux jours d&apos;immersion au cœur de l&apos;Intelligence Artificielle, 
              des technologies innovantes et des rencontres stratégiques.
            </p>

            {/* Event Info Cards */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-[#FF6B35] flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">15-16 Juin 2025</p>
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

            {/* CTA Buttons */}
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

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Section - Floating Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-[#FF6B35] font-semibold text-sm uppercase tracking-wider mb-2">
              SALTIS en chiffres
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Un événement d&apos;envergure
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#0d5a75]/5 to-[#FF6B35]/5 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0d5a75] to-[#0a4a62] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0d5a75] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Modern Layout */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-[#FF6B35]" />
                <span className="text-[#FF6B35] text-sm font-semibold">À propos de SALTIS</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Un événement{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d5a75] to-[#FF6B35]">
                  unique
                </span>{" "}
                en son genre
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Le <strong className="text-[#0d5a75]">SALTIS</strong> (Salon International des Algorithmes, des Sciences,
                des Technologies et de l&apos;Innovation du Sénégal) est un
                événement annuel majeur qui rassemble les acteurs clés de
                l&apos;écosystème technologique africain.
              </p>
              <div className="bg-gradient-to-r from-[#0d5a75]/10 to-transparent p-6 rounded-2xl border-l-4 border-[#FF6B35] mb-8">
                <p className="text-gray-700 italic">
                  « Intelligence Artificielle et usages multisectoriels : pour une 
                  souveraineté technologique, inclusive et durable »
                </p>
                <p className="text-sm text-[#0d5a75] font-semibold mt-2">— Thème 2025</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-[#0d5a75] hover:bg-[#0d5a75]/90 text-white"
                  asChild
                >
                  <Link href="/programme">
                    Voir le programme
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#0d5a75] text-[#0d5a75]"
                  asChild
                >
                  <Link href="/speakers">Nos speakers</Link>
                </Button>
              </div>
            </div>
            
            {/* Objectives Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0d5a75] to-[#083d52] rounded-3xl transform rotate-3" />
              <div className="relative bg-gradient-to-br from-[#0d5a75] to-[#0a4a62] rounded-3xl p-8 lg:p-10">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <Target className="w-7 h-7 text-[#FF6B35]" />
                  Nos Objectifs
                </h3>
                <ul className="space-y-5">
                  {objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-4 group">
                      <div className="w-8 h-8 rounded-xl bg-[#FF6B35] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <span className="text-white text-sm font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-white/90 text-lg">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venue Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#0d5a75]/10 rounded-full px-4 py-2 mb-6">
                <MapPin className="w-4 h-4 text-[#0d5a75]" />
                <span className="text-[#0d5a75] text-sm font-semibold">Le Lieu</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Musée des Civilisations Noires
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Un lieu emblématique qui incarne la rencontre entre tradition et
                modernité, parfait pour accueillir un événement dédié à
                l&apos;innovation africaine.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#FF6B35]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Adresse</p>
                    <p className="text-gray-600">Place de la Nation, Dakar, Sénégal</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#FF6B35]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Capacité</p>
                    <p className="text-gray-600">+5000 participants</p>
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-[#0d5a75] hover:bg-[#0d5a75]/90 text-white"
                asChild
              >
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                  Voir sur Google Maps
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>
            
            {/* Map Placeholder */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#0d5a75] to-[#083d52] rounded-3xl h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-white/30 rounded-full" />
                  <div className="absolute top-1/3 right-1/3 w-48 h-48 border-2 border-white/20 rounded-full" />
                  <div className="absolute bottom-1/4 left-1/3 w-24 h-24 border-2 border-white/40 rounded-full" />
                </div>
                <div className="text-center z-10">
                  <div className="w-20 h-20 rounded-full bg-[#FF6B35] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/30">
                    <MapPin className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-white text-xl font-bold mb-2">Musée des Civilisations Noires</p>
                  <p className="text-white/70">Dakar, Sénégal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Modern */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d5a75] via-[#0a4a62] to-[#083d52]">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#FF6B35]/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
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
