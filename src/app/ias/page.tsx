import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Users,
  Lightbulb,
  Target,
  BookOpen,
  Briefcase,
  School,
  Rocket,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Globe,
  Linkedin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Institut des Algorithmes du Sénégal (IAS)",
  description:
    "L'IAS est une association pionnière dédiée à la formation, la recherche et l'innovation en Intelligence Artificielle au Sénégal.",
};

const missions = [
  {
    icon: GraduationCap,
    title: "Former les talents",
    description:
      "Former, inspirer et accompagner les talents africains dans la maîtrise des technologies d'intelligence artificielle et de science des données.",
  },
  {
    icon: Users,
    title: "Démocratiser l'IA",
    description:
      "Démocratiser la compréhension de l'IA auprès des décideurs publics et privés pour encourager des politiques numériques responsables.",
  },
  {
    icon: Lightbulb,
    title: "Stimuler l'innovation",
    description:
      "Stimuler l'innovation locale, en accompagnant les startups et entreprises à intégrer l'IA dans leurs produits et services.",
  },
  {
    icon: Globe,
    title: "Développer des solutions",
    description:
      "Développer des solutions concrètes, conçues au Sénégal pour répondre aux défis du continent à travers Jàngat.AI.",
  },
];

const formations = [
  {
    icon: BookOpen,
    title: "Formations techniques",
    target: "Pour les étudiants, ingénieurs et chercheurs",
    items: [
      "Science des données, apprentissage automatique et deep learning",
      "Traitement du langage et vision par ordinateur",
      "Cloud computing, MLOps et IA éthique",
    ],
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Briefcase,
    title: "Formations pour décideurs",
    target: "Pour les cadres publics et dirigeants d'entreprise",
    items: [
      "Les enjeux stratégiques de l'IA et de la donnée",
      "La souveraineté numérique et la gouvernance éthique",
      "La transformation digitale des organisations",
      "Les données personnelles",
    ],
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: School,
    title: "Formations pour enseignants",
    target: "Pour les enseignants, formateurs et structures éducatives",
    items: [
      "Diffusion des compétences IA à grande échelle",
      "Renforcement du système éducatif",
      "Préparation des talents de demain",
    ],
    color: "from-green-500 to-green-600",
  },
];

const galleryImages = [
  {
    src: "/images/ias-1.jpg",
    alt: "Formation IAS - Session de travail",
    caption: "Session de formation en IA",
  },
  {
    src: "/images/ias-2.jpg",
    alt: "CANAL'IA - Caravane nationale",
    caption: "CANAL'IA en région",
  },
  {
    src: "/images/ias-3.jpg",
    alt: "Conférence IAS",
    caption: "Conférence annuelle",
  },
  {
    src: "/images/ias-4.jpg",
    alt: "Atelier pratique",
    caption: "Atelier pratique IA",
  },
  {
    src: "/images/ias-5.jpg",
    alt: "Équipe IAS",
    caption: "L'équipe IAS",
  },
  {
    src: "/images/ias-6.jpg",
    alt: "Hackathon IA",
    caption: "Hackathon IA Sénégal",
  },
];

const founders = [
  {
    name: "Ndiaye Dia",
    role: "Co-fondateur",
    image: "/images/Ndiaye-Dia.jpg",
    linkedin: "https://www.linkedin.com/in/ndiaye-dia-b39275166/",
  },
  {
    name: "Wedji Kane",
    role: "Co-fondatrice",
    image: "/images/Wedji-Kane.jpg",
    linkedin: "https://www.linkedin.com/in/wedji-k-373ba0142/",
  },
  {
    name: "Papa Séga Wade",
    role: "Co-fondateur & Chercheur",
    image: "/images/Papa-Séga-Wade.jpg",
    linkedin: "https://www.linkedin.com/in/papa-s%C3%A9ga-wade-phd-a5727513a/",
  },
  {
    name: "Fallou Diakhaté",
    role: "Co-fondateur",
    image: "/images/Fallou-Diakhaté.jpg",
    linkedin: "https://www.linkedin.com/in/fallou-diakhate-14941a191/",
  },
  {
    name: "Ibrahima Fall",
    role: "Co-fondateur",
    image: "/images/Ibrahima-Fall.jpg",
    linkedin: "https://www.linkedin.com/in/ibrahima-khalil-fall/",
  },
  {
    name: "Amsata Niang",
    role: "Co-fondateur",
    image: "/images/Amsata-Niang.jpg",
    linkedin: "https://www.linkedin.com/in/amsata-niang-89442b92/",
  },
  {
    name: "Ahmath Gadji",
    role: "Co-fondateur",
    image: "/images/Ahmath-Gadji.jpg",
    linkedin: "https://www.linkedin.com/in/ahmath-gadji-292a01195/",
  },
];

export default function IASPage() {
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
              <GraduationCap className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-white text-sm font-medium">Depuis 2020</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Institut des Algorithmes{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-orange-400">
                du Sénégal
              </span>
            </h1>

            <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto">
              Créé par une nouvelle génération d&apos;ingénieurs sénégalais passionnés par la science 
              et la transmission, l&apos;IAS est une association pionnière dédiée à la formation, 
              la recherche et l&apos;innovation en Intelligence Artificielle.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="h-14 px-8 text-lg bg-gradient-to-r from-[#FF6B35] to-orange-500 hover:opacity-90 text-white shadow-lg shadow-orange-500/25"
                asChild
              >
                <Link href="/contact">
                  Nous rejoindre
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg border-white/30 text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <Link href="#formations">Nos formations</Link>
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

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 rounded-full px-4 py-2 mb-6">
              <Target className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-[#FF6B35] text-sm font-semibold">Notre Mission</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Faire de l&apos;IA un levier de développement
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              L&apos;IAS s&apos;est imposé comme le catalyseur de l&apos;écosystème IA au Sénégal, en rassemblant 
              étudiants, enseignants, chercheurs, entreprises et institutions autour d&apos;un objectif commun : 
              faire de l&apos;IA un levier de développement durable, inclusif et souverain.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {missions.map((mission, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0d5a75] to-[#0a4a62] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <mission.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {mission.title}
                </h3>
                <p className="text-gray-600 text-sm">{mission.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formations Section */}
      <section id="formations" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-[#FF6B35] font-semibold text-sm uppercase tracking-wider mb-2">
              Formations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Une offre complète adaptée à chaque profil
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {formations.map((formation, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`bg-gradient-to-r ${formation.color} p-6`}>
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                    <formation.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{formation.title}</h3>
                  <p className="text-white/80 text-sm">{formation.target}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {formation.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#FF6B35]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle className="w-3.5 h-3.5 text-[#FF6B35]" />
                        </div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qui sommes-nous - Section avec image */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/images/SEC-ias-2.jpeg"
                    alt="Institut des Algorithmes du Sénégal"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#FF6B35]/20 rounded-full blur-2xl" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 rounded-full px-4 py-2 mb-6">
                <Users className="w-4 h-4 text-[#FF6B35]" />
                <span className="text-[#FF6B35] text-sm font-semibold">Qui sommes-nous ?</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Le catalyseur de l&apos;écosystème IA au Sénégal
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Né en 2020, l&apos;IAS s&apos;est imposé comme le catalyseur de l&apos;écosystème IA au Sénégal, 
                en rassemblant étudiants, enseignants, chercheurs, entreprises et institutions autour 
                d&apos;un objectif commun.
              </p>
              <p className="text-gray-600 mb-6">
                Faire de l&apos;IA un levier de développement durable, inclusif et souverain pour le Sénégal 
                et l&apos;Afrique.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                  <GraduationCap className="w-4 h-4 text-[#0d5a75]" />
                  <span className="text-sm font-medium text-gray-700">+500 formés</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                  <MapPin className="w-4 h-4 text-[#0d5a75]" />
                  <span className="text-sm font-medium text-gray-700">14 régions</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                  <Rocket className="w-4 h-4 text-[#0d5a75]" />
                  <span className="text-sm font-medium text-gray-700">+20 startups</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-[#FF6B35] font-semibold text-sm uppercase tracking-wider mb-2">
              Nos Initiatives
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Plus qu&apos;un formateur, un partenaire d&apos;innovation
            </h2>
          </div>

          {/* CANAL'IA - Full width with image */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <div className="relative h-64 lg:h-full min-h-[300px]">
                <Image
                  src="/images/SEC-ias-1.jpeg"
                  alt="CANAL'IA - Caravane Nationale"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 right-4 bg-[#FF6B35] text-white text-xs font-bold px-3 py-1 rounded-full">
                  Initiative phare
                </div>
              </div>
              <div className="p-8 lg:p-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  CANAL&apos;IA
                </h3>
                <p className="text-[#FF6B35] font-medium mb-4">
                  Caravane Nationale sur l&apos;Intelligence Artificielle
                </p>
                <p className="text-gray-600 mb-6">
                  Une initiative itinérante unique qui sillonne les régions du Sénégal pour démystifier 
                  l&apos;IA, sensibiliser les citoyens et révéler les talents locaux.
                </p>
                <ul className="space-y-2">
                  {["Ateliers pratiques", "Projections et conférences", "Démonstrations immersives", "L'IA au plus près des populations"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[#FF6B35]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Accompagnement startups */}
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <div className="p-8 lg:p-10 order-2 lg:order-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Accompagnement des startups
                </h3>
                <p className="text-[#FF6B35] font-medium mb-4">
                  Partenaire d&apos;innovation pour les acteurs économiques
                </p>
                <p className="text-gray-600 mb-6">
                  L&apos;IAS soutient les jeunes pousses et les PME dans leur intégration de l&apos;IA, 
                  de la conception à la mise en production.
                </p>
                <ul className="space-y-2">
                  {["Diagnostic technologique", "Accompagnement technique et stratégique", "Mentorat et mise en relation", "Réseautage via SALTIS"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[#FF6B35]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-64 lg:h-full min-h-[300px] order-1 lg:order-2">
                <Image
                  src="/images/ias-7.jpg"
                  alt="Accompagnement des startups"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-[#FF6B35] text-sm font-semibold">Galerie</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              L&apos;IAS en images
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos activités, formations et événements à travers le Sénégal.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl shadow-lg ${
                  index === 0 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <div className={`${index === 0 ? "aspect-square" : "aspect-[4/3]"} relative`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium text-sm">{image.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-[#FF6B35] font-semibold text-sm uppercase tracking-wider mb-2">
              L&apos;Équipe
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Les Fondateurs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une équipe passionnée d&apos;ingénieurs et chercheurs dédiés à l&apos;essor de l&apos;IA en Afrique.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {founders.map((founder, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 group-hover:scale-110 transition-transform ring-4 ring-[#0d5a75]/20">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {founder.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3">{founder.role}</p>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#0d5a75] hover:text-[#FF6B35] text-sm font-medium transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  Profil LinkedIn
                </a>
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
              <span className="text-white text-sm font-medium">Rejoignez-nous</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Prêt à faire partie de l&apos;aventure ?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Que vous soyez étudiant, professionnel, entreprise ou institution, 
              l&apos;IAS vous accompagne dans votre parcours vers l&apos;Intelligence Artificielle.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
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
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg border-white/30 text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <Link href="/salon">Découvrir SALTIS</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
