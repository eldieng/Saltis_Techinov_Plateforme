import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Brain, GraduationCap, Users, MapPin } from "lucide-react";

const initiatives = [
  {
    icon: GraduationCap,
    title: "Formations IA",
    description: "Programmes de formation en intelligence artificielle",
  },
  {
    icon: Users,
    title: "CANAL'IA",
    description: "Caravane nationale de sensibilisation à l'IA",
  },
  {
    icon: MapPin,
    title: "Présence nationale",
    description: "Actions dans toutes les régions du Sénégal",
  },
];

export function IASSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#0d5a75] via-[#0a4a62] to-[#083d52]">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6B35]/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="space-y-8 text-white">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Brain className="w-4 h-4 text-[#FF6B35]" />
                Institut des Algorithmes du Sénégal
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                L&apos;IAS : Pionniers de{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-orange-400">
                  l&apos;IA au Sénégal
                </span>
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
                L&apos;Institut des Algorithmes du Sénégal (IAS) est une organisation 
                dédiée à la promotion et au développement de l&apos;intelligence artificielle 
                au Sénégal. Notre mission : démocratiser l&apos;accès à l&apos;IA et former 
                la prochaine génération de talents africains.
              </p>
            </div>

            {/* Initiatives */}
            <div className="space-y-4">
              {initiatives.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/20 group-hover:bg-[#FF6B35] flex items-center justify-center transition-colors">
                    <item.icon className="w-6 h-6 text-[#FF6B35] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{item.title}</h4>
                    <p className="text-sm text-white/60">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/ias"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B35] hover:bg-[#e55a2a] text-white rounded-xl font-medium transition-colors shadow-lg shadow-orange-500/25"
              >
                Découvrir l&apos;IAS
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/ias#formations"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white hover:bg-white/10 bg-transparent rounded-xl font-medium transition-colors"
              >
                Nos formations
              </Link>
            </div>
          </div>

          {/* Right - Image with stats */}
          <div className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Main image */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/SEC-ias-2.jpeg"
                  alt="Institut des Algorithmes du Sénégal"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d5a75]/80 via-transparent to-transparent" />
              </div>

              {/* Floating stats cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-xl z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0d5a75] flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">7</p>
                    <p className="text-xs text-gray-500">Co-fondateurs</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FF6B35] flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">1000+</p>
                    <p className="text-xs text-gray-500">Personnes formées</p>
                  </div>
                </div>
              </div>

              {/* Logo overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3 shadow-lg">
                  <Image
                    src="/images/IAS - Logo.png"
                    alt="IAS Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Institut des Algorithmes</p>
                    <p className="text-xs text-gray-500">du Sénégal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
