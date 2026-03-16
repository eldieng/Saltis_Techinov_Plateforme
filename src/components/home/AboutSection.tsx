import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const highlights = [
  "Mettre en avant notre savoir faire",
  "Ouverture Internationale",
  "Attirer les investissements",
];

export function AboutSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <Image
                src="/images/Logo-SALTIS.png"
                alt="SALTIS Logo"
                width={120}
                height={60}
                className="h-12 w-auto mb-4"
              />
              <h2 className="text-4xl md:text-5xl font-bold text-[#0d5a75]">
                SALTIS
              </h2>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed">
              Est bien plus qu&apos;un événement. C&apos;est une plateforme stratégique et un acteur
              structurant de l&apos;écosystème technologique africain. Il a pour ambition de positionner
              le Sénégal comme une référence continentale en matière d&apos;excellence numérique,
              de recherche technologique et d&apos;innovation responsable.
            </p>

            <p className="text-gray-700 leading-relaxed">
              SALTIS est reconnu et soutenu par la Présidence et la Primature.
              Le Salon est porté par le Ministère de la communication des Télécommunications et
              du Numérique.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Labellisé par le Sommet International de l&apos;IA en 2024, SALTIS s&apos;impose désormais
              comme un espace d&apos;influence, de réflexion, de démonstration et de connexion. Il
              fédère chercheurs, startups, décideurs publics, investisseurs et citoyens autour de
              la transformation numérique du continent.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-3 pt-4">
              {highlights.map((item, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border border-[#0d5a75] text-[#0d5a75] rounded-lg text-sm font-medium"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                className="bg-[#0d5a75] hover:bg-[#0d5a75]/90 text-white"
                asChild
              >
                <Link href="/salon">
                  Découvrir le Salon
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/10"
                asChild
              >
                <Link href="/ias">À propos d&apos;IAS</Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden">
              <Image
                src="/images/ias-image.jpg"
                alt="SALTIS - Innovation Africaine"
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-100/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
