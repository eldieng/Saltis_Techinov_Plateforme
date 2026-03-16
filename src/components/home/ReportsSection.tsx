"use client";

import { FileText } from "lucide-react";

const reports = [
  {
    badge: "NOUVEAU",
    title: "Rapport Officiel",
    highlight: "SALTIS 2025",
    description:
      "Découvrez le bilan complet de l'édition 2025 : discussions, innovations, chiffres clés et perspectives pour l'avenir de l'IA en Afrique de l'Ouest.",
    link: "/images/document/Rapport-SALTIS-2025-.pdf",
  },
  {
    badge: "NOUVEAU",
    title: "Rapport",
    highlight: "PAS Challenge 2025",
    description:
      "Retrouvez le rapport officiel du PAS Challenge 2025 : résultats, projets innovants et retours sur cette compétition dédiée à l'intelligence artificielle.",
    link: "/images/document/Rapport-officiel-du-challenge-PAS-2025.pdf",
  },
];

export function ReportsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0d5a75] to-[#094559]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reports.map((report, index) => (
            <div key={index} className="text-center">
              {/* Badge */}
              <span className="inline-block px-4 py-1.5 bg-[#FF6B35]/20 border border-[#FF6B35]/40 text-[#FF6B35] text-sm font-semibold rounded-full mb-6">
                {report.badge}
              </span>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {report.title}{" "}
                <span className="text-[#FF6B35]">{report.highlight}</span>
              </h3>

              {/* Description */}
              <p className="text-white/70 mb-8 max-w-md mx-auto leading-relaxed">
                {report.description}
              </p>

              {/* CTA Button */}
              <a
                href={report.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-lg shadow-[#FF6B35]/25"
              >
                <FileText className="w-5 h-5" />
                VOIR LE RAPPORT
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
