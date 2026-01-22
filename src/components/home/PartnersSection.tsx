const partners = [
  { name: "Partner 1", logo: "/partners/partner1.png" },
  { name: "Partner 2", logo: "/partners/partner2.png" },
  { name: "Partner 3", logo: "/partners/partner3.png" },
  { name: "Partner 4", logo: "/partners/partner4.png" },
  { name: "Partner 5", logo: "/partners/partner5.png" },
  { name: "Partner 6", logo: "/partners/partner6.png" },
];

export function PartnersSection() {
  return (
    <section className="py-20">
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

        {/* Partners Grid - Placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors h-24"
            >
              <div className="text-gray-400 text-sm font-medium text-center">
                {partner.name}
              </div>
            </div>
          ))}
        </div>

        {/* Become Partner CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 bg-gradient-to-r from-[#0d5a75] to-[#1a7a9a] rounded-2xl">
            <div className="text-white text-center sm:text-left">
              <h3 className="text-xl font-semibold mb-1">
                Devenez partenaire de SALTIS 2025
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
