import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Ticket, Users, Mic } from "lucide-react";

const ctaCards = [
  {
    icon: Ticket,
    title: "Participer",
    description:
      "Réservez votre place et plongez au cœur de l'innovation technologique africaine.",
    href: "/billetterie",
    buttonText: "Réserver ma place",
    primary: true,
  },
  {
    icon: Users,
    title: "Exposer",
    description:
      "Présentez vos solutions et connectez-vous avec des milliers de visiteurs qualifiés.",
    href: "/formulaire-exposant",
    buttonText: "Devenir exposant",
    primary: false,
  },
  {
    icon: Mic,
    title: "Intervenir",
    description:
      "Partagez votre expertise lors de conférences, panels et démonstrations en direct.",
    href: "/formulaire-speaker",
    buttonText: "Proposer une intervention",
    primary: false,
  },
];

export function CTASection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-wider">
            Rejoignez-nous
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0d5a75] mt-2 mb-4">
            Comment participer à SALTIS 2025 ?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Plusieurs façons de faire partie de cet événement majeur de
            l&apos;innovation technologique en Afrique.
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {ctaCards.map((card, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 transition-all duration-300 hover:shadow-xl ${
                card.primary
                  ? "bg-[#0d5a75] text-white"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  card.primary ? "bg-[#FF6B35]" : "bg-[#0d5a75]/10"
                }`}
              >
                <card.icon
                  className={`w-7 h-7 ${
                    card.primary ? "text-white" : "text-[#0d5a75]"
                  }`}
                />
              </div>

              <h3
                className={`text-xl font-semibold mb-3 ${
                  card.primary ? "text-white" : "text-[#0d5a75]"
                }`}
              >
                {card.title}
              </h3>

              <p
                className={`mb-6 ${
                  card.primary ? "text-white/80" : "text-gray-600"
                }`}
              >
                {card.description}
              </p>

              <Button
                className={`w-full ${
                  card.primary
                    ? "bg-white text-[#0d5a75] hover:bg-white/90"
                    : "bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90"
                }`}
                asChild
              >
                <Link href={card.href}>
                  {card.buttonText}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
