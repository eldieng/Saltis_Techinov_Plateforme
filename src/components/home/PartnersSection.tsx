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
  { name: "Partner 25", logo: "/images/partenaire/1750793723556.jpg" },
  { name: "Partner 26", logo: "/images/partenaire/1_OX-WU_hVuyXCx8UX922IZg.png" },
  { name: "Partner 27", logo: "/images/partenaire/1e9ffea4-5254-4c0d-a07b-6ce083f76a2f.png" },
  { name: "MEN Alt", logo: "/images/partenaire/1logoMEN.png" },
  { name: "Partner 29", logo: "/images/partenaire/464732076_1108208484004941_8876554422618881927_n.jpg" },
  { name: "Partner 30", logo: "/images/partenaire/Capture-decran-2025-11-17-174656.png" },
  { name: "Partner 31", logo: "/images/partenaire/QWdM9dyv_400x400.jpg" },
  { name: "Partner 32", logo: "/images/partenaire/WhatsApp-Image-2025-11-08-a-14.26.16_01caaa60.jpg" },
  { name: "Partner 33", logo: "/images/partenaire/WhatsApp-Image-2025-11-13-at-17.03.03.jpeg" },
  { name: "Partner 34", logo: "/images/partenaire/channels4_profile.jpg" },
  { name: "Partner 35", logo: "/images/partenaire/cmfgozlj201tg5n901whcbuuc-company-logo.jpg" },
  { name: "Partner 36", logo: "/images/partenaire/dark-logo.png" },
  { name: "Partner 37", logo: "/images/partenaire/https___cdn.evbuc_.com_images_865563939_2356167854303_1_original.jpg" },
  { name: "Partner 38", logo: "/images/partenaire/image-scaled.jpg" },
  { name: "Partner 39", logo: "/images/partenaire/images.png" },
  { name: "Partner 40", logo: "/images/partenaire/images-1.png" },
  { name: "Partner 41", logo: "/images/partenaire/images-2.png" },
  { name: "Partner 42", logo: "/images/partenaire/images-3.png" },
  { name: "Partner 43", logo: "/images/partenaire/images-4.png" },
  { name: "Partner 44", logo: "/images/partenaire/images-5.png" },
  { name: "Partner 45", logo: "/images/partenaire/images-6.png" },
  { name: "Partner 46", logo: "/images/partenaire/logo_v2_rogner_2_1.png" },
  { name: "Partner 47", logo: "/images/partenaire/logoold2.png" },
];

export function PartnersSection() {
  const row1 = partners.slice(0, 16);
  const row2 = partners.slice(16, 32);
  const row3 = partners.slice(32);

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
        <div className="relative space-y-4">
          {/* First Row - Scrolling Left */}
          <div className="relative flex overflow-hidden">
            <div className="flex gap-4 animate-marquee-left">
              {[...row1, ...row1].map((partner, index) => (
                <div
                  key={`row1-${index}`}
                  className="shrink-0 flex items-center justify-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow h-16 w-32"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={80}
                    height={40}
                    className="object-contain max-h-10 w-auto"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-4 animate-marquee-left" aria-hidden="true">
              {[...row1, ...row1].map((partner, index) => (
                <div
                  key={`row1-dup-${index}`}
                  className="shrink-0 flex items-center justify-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow h-16 w-32"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={80}
                    height={40}
                    className="object-contain max-h-10 w-auto"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - Scrolling Right */}
          <div className="relative flex overflow-hidden">
            <div className="flex gap-4 animate-marquee-right">
              {[...row2, ...row2].map((partner, index) => (
                <div
                  key={`row2-${index}`}
                  className="shrink-0 flex items-center justify-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow h-16 w-32"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={80}
                    height={40}
                    className="object-contain max-h-10 w-auto"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-4 animate-marquee-right" aria-hidden="true">
              {[...row2, ...row2].map((partner, index) => (
                <div
                  key={`row2-dup-${index}`}
                  className="shrink-0 flex items-center justify-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow h-16 w-32"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={80}
                    height={40}
                    className="object-contain max-h-10 w-auto"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Third Row - Scrolling Left (slower) */}
          {row3.length > 0 && (
            <div className="relative flex overflow-hidden">
              <div className="flex gap-4 animate-marquee-left" style={{ animationDuration: '50s' }}>
                {[...row3, ...row3, ...row1.slice(0, 8)].map((partner, index) => (
                  <div
                    key={`row3-${index}`}
                    className="shrink-0 flex items-center justify-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow h-16 w-32"
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={80}
                      height={40}
                      className="object-contain max-h-10 w-auto"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-4 animate-marquee-left" style={{ animationDuration: '50s' }} aria-hidden="true">
                {[...row3, ...row3, ...row1.slice(0, 8)].map((partner, index) => (
                  <div
                    key={`row3-dup-${index}`}
                    className="shrink-0 flex items-center justify-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow h-16 w-32"
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={80}
                      height={40}
                      className="object-contain max-h-10 w-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
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
