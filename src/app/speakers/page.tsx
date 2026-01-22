import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Sparkles, ArrowRight, Mic } from "lucide-react";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Speakers",
  description:
    "Découvrez les speakers et intervenants de SALTIS TechInov 2025 : experts en IA, entrepreneurs et leaders du numérique.",
};

export default async function SpeakersPage() {
  const speakers = await prisma.speaker.findMany({
    where: { status: "APPROVED" },
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
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-white text-sm font-medium">{speakers.length} intervenants confirmés</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Nos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-orange-400">
                Speakers
              </span>
            </h1>

            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Rencontrez les visionnaires, experts et décideurs qui partagent
              leurs connaissances sur l&apos;IA et l&apos;innovation en Afrique.
            </p>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 80L60 73.3C120 66.7 240 53.3 360 46.7C480 40 600 40 720 43.3C840 46.7 960 53.3 1080 56.7C1200 60 1320 60 1380 60L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Speakers Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          {speakers.length === 0 ? (
            <div className="text-center py-16">
              <Mic className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Speakers à venir</h3>
              <p className="text-gray-500">Les speakers seront bientôt annoncés. Revenez plus tard !</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {speakers.map((speaker) => (
                <div
                  key={speaker.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden">
                    {speaker.image ? (
                      <Image
                        src={speaker.image}
                        alt={speaker.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0d5a75] to-[#0a4a62]">
                        <span className="text-5xl font-bold text-white">
                          {speaker.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Social Links */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                      {speaker.linkedin && (
                        <a
                          href={speaker.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-colors shadow-lg"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {speaker.twitter && (
                        <a
                          href={speaker.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-colors shadow-lg"
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#0d5a75] transition-colors">
                      {speaker.name}
                    </h3>
                    <p className="text-[#FF6B35] font-semibold mt-1">
                      {speaker.role}
                    </p>
                    <p className="text-gray-500 text-sm">{speaker.company}</p>
                    {speaker.bio && (
                      <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                        {speaker.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Become Speaker CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d5a75] to-[#083d52]">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF6B35]/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 mb-6">
              <Mic className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-white text-sm font-medium">Appel à speakers</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Vous souhaitez intervenir ?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Partagez votre expertise lors de SALTIS TechInov 2025.
              Proposez une conférence, un atelier ou participez à un panel.
            </p>
            <Button
              size="lg"
              className="h-14 px-8 text-lg bg-gradient-to-r from-[#FF6B35] to-orange-500 hover:opacity-90 text-white shadow-lg shadow-orange-500/25"
              asChild
            >
              <Link href="/formulaire-speaker">
                Proposer une intervention
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
