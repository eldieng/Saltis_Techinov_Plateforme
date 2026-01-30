import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Linkedin, User } from "lucide-react";
import { prisma } from "@/lib/db";

interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string | null;
  image: string | null;
  linkedin: string | null;
}

async function getSpeakers(): Promise<Speaker[]> {
  const speakers = await prisma.speaker.findMany({
    where: { status: "APPROVED" },
    orderBy: { name: "asc" },
    take: 4,
    select: {
      id: true,
      name: true,
      role: true,
      company: true,
      image: true,
      linkedin: true,
    },
  });
  return speakers;
}

export async function SpeakersSection() {
  const speakers = await getSpeakers();
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-wider">
            Nos Intervenants
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0d5a75] mt-2 mb-4">
            Speakers de renommée mondiale
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Rencontrez les visionnaires, experts et décideurs qui partagent
            leurs connaissances sur l&apos;IA, l&apos;innovation et la transformation
            numérique en Afrique.
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                {speaker.image ? (
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-20 h-20 text-gray-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Social Links */}
                {speaker.linkedin && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={speaker.linkedin}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-[#0d5a75]">
                  {speaker.name}
                </h3>
                <p className="text-[#FF6B35] text-sm font-medium mt-1">
                  {speaker.role}
                </p>
                <p className="text-gray-500 text-sm mt-1">{speaker.company}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-[#0d5a75] text-[#0d5a75] hover:bg-[#0d5a75] hover:text-white"
            asChild
          >
            <Link href="/speakers">
              Voir tous les speakers
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
