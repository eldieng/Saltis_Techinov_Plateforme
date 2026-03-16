"use client";

import Image from "next/image";

const partners = [
  { name: "Ministère de la Communication", logo: "/images/partenaire/Logo-MCTN-scaled.png" },
  { name: "Ministère de l'Éducation", logo: "/images/partenaire/Logo-MEN-scaled.png" },
  { name: "Meta", logo: "/images/partenaire/Meta-Logo-scaled.png" },
  { name: "GIZ", logo: "/images/partenaire/giz.jpg" },
  { name: "ESTM", logo: "/images/partenaire/Logo-ESTM-paysage-1-scaled.png" },
  { name: "AI Hubs", logo: "/images/partenaire/AIHUBS-logo2.png" },
  { name: "Galsen AI", logo: "/images/partenaire/galsen_ai_logo.jpg" },
  { name: "WIC Sénégal", logo: "/images/partenaire/WIC-SN-1024x594-1.png" },
  { name: "IP3 Conseil", logo: "/images/partenaire/Logo-IP3conseil.png" },
  { name: "Kaikai", logo: "/images/partenaire/Logotype_Kaikai_white-orange-on-blue.jpg" },
  { name: "DER", logo: "/images/partenaire/logo-der-only-noir_0.png" },
  { name: "Festic", logo: "/images/partenaire/logo_festic_bg_less.png" },
  { name: "Syrate", logo: "/images/partenaire/logo_syrate.png" },
  { name: "Senyone", logo: "/images/partenaire/senyone_logo.jpg" },
  { name: "ANAQ-Sup", logo: "/images/partenaire/anaq_sup-removebg-preview-1.png" },
  { name: "CIGASS", logo: "/images/partenaire/cigass-logo-01.jpg" },
  { name: "Cosydep", logo: "/images/partenaire/logo-cosydep-png.jpg-1024x422-1.png" },
  { name: "Wossap AI", logo: "/images/partenaire/wossap.ai-1-scaled.png" },
  { name: "Dolph Stat", logo: "/images/partenaire/dolph_stat_consulting_logo.jpg" },
  { name: "PACE", logo: "/images/partenaire/logo-pacex400.png" },
  { name: "DIT", logo: "/images/partenaire/IconDIT.png" },
  { name: "Sceau", logo: "/images/partenaire/sceau.jpg" },
  { name: "Logo Portrait", logo: "/images/partenaire/Logo_Portrait-scaled.png" },
  { name: "Partner", logo: "/images/partenaire/logo.png" },
];

export function PartnersSection() {
  const row1 = partners.slice(0, 12);
  const row2 = partners.slice(12);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-wider">
            Nos Partenaires
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0d5a75] mt-2 mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des partenaires stratégiques qui partagent notre vision d&apos;une
            Afrique innovante et connectée.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative space-y-6">
          {/* First Row - Scrolling Left */}
          <div className="relative flex overflow-hidden group">
            <div className="flex gap-6 animate-marquee-left hover:[animation-play-state:paused]">
              {[...row1, ...row1].map((partner, index) => (
                <div
                  key={`row1-${index}`}
                  className="shrink-0 flex items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow h-20 w-36"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={100}
                    height={50}
                    className="object-contain max-h-12 w-auto"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-6 animate-marquee-left hover:[animation-play-state:paused]" aria-hidden="true">
              {[...row1, ...row1].map((partner, index) => (
                <div
                  key={`row1-dup-${index}`}
                  className="shrink-0 flex items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow h-20 w-36"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={100}
                    height={50}
                    className="object-contain max-h-12 w-auto"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - Scrolling Right */}
          <div className="relative flex overflow-hidden group">
            <div className="flex gap-6 animate-marquee-right hover:[animation-play-state:paused]">
              {[...row2, ...row2, ...row1.slice(0, 6)].map((partner, index) => (
                <div
                  key={`row2-${index}`}
                  className="shrink-0 flex items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow h-20 w-36"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={100}
                    height={50}
                    className="object-contain max-h-12 w-auto"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-6 animate-marquee-right hover:[animation-play-state:paused]" aria-hidden="true">
              {[...row2, ...row2, ...row1.slice(0, 6)].map((partner, index) => (
                <div
                  key={`row2-dup-${index}`}
                  className="shrink-0 flex items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow h-20 w-36"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={100}
                    height={50}
                    className="object-contain max-h-12 w-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Become Partner CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 bg-gradient-to-r from-[#0d5a75] to-[#1a7a9a] rounded-2xl">
            <div className="text-white text-center sm:text-left">
              <h3 className="text-xl font-semibold mb-1">
                Devenez partenaire de SALTIS 2026
              </h3>
              <p className="text-white/80 text-sm">
                Rejoignez l&apos;écosystème tech le plus dynamique d&apos;Afrique de
                l&apos;Ouest
              </p>
            </div>
            <a
              href="/contact"
              className="px-6 py-3 bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white font-medium rounded-xl transition-colors whitespace-nowrap"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
