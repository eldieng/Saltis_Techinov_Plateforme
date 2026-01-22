import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trophy, Users, Lightbulb, Rocket } from "lucide-react";

const highlights = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Solutions créatives pour les JOJ 2026",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Équipes pluridisciplinaires",
  },
  {
    icon: Trophy,
    title: "Compétition",
    description: "Prix et accompagnement",
  },
  {
    icon: Rocket,
    title: "Accélération",
    description: "Mentorat et financement",
  },
];

export function PASChallengeSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-orange-50 -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FF6B35]/10 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/ias-3.jpg"
                alt="PAS Challenge - Programme d'Accélération SALTIS"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent" />
              
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Édition 2025</p>
                      <p className="text-sm text-gray-600">Focus JOJ Dakar 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#FF6B35] to-orange-500 rounded-2xl -z-10 rotate-12" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl -z-10 -rotate-12" />
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Trophy className="w-4 h-4" />
                Programme d&apos;Accélération
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                PAS Challenge{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-[#FF6B35]">
                  2025
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Le Programme d&apos;Accélération SALTIS (PAS) Challenge est une compétition 
                d&apos;innovation qui permet aux jeunes talents de développer des solutions 
                technologiques innovantes pour répondre aux défis du Sénégal et de l&apos;Afrique.
              </p>
            </div>

            {/* Highlights grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-white border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-100 group-hover:bg-purple-500 flex items-center justify-center mb-3 transition-colors">
                    <item.icon className="w-5 h-5 text-purple-600 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/pag-challenge"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-medium transition-all shadow-lg shadow-purple-500/25"
              >
                Découvrir le PAS Challenge
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pag-challenge#candidater"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-purple-200 text-purple-700 hover:bg-purple-50 rounded-xl font-medium transition-colors"
              >
                Candidater
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
