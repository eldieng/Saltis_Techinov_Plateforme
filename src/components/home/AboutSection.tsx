import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Globe, Lightbulb } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Technologie & Innovation",
    description:
      "Découvrez les dernières avancées en Intelligence Artificielle et leur application dans divers secteurs.",
  },
  {
    icon: Globe,
    title: "Héritage Culturel",
    description:
      "L'Afrofuturisme rencontre la tradition : une vision unique de l'innovation ancrée dans notre identité.",
  },
  {
    icon: Lightbulb,
    title: "Vision Afrofuturiste",
    description:
      "Un dialogue entre modernité et tradition, homme et machine, passé et avenir pour l'Afrique.",
  },
];

export function AboutSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-wider">
                À propos de SALTIS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0d5a75] mt-2">
                L&apos;Afrofuturisme rencontre la Tradition
              </h2>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              SALTIS TechInov est un événement incontournable au Sénégal dédié à
              l&apos;innovation technologique. Il rassemble institutions,
              entrepreneurs, investisseurs et passionnés du numérique autour
              d&apos;une vision commune : façonner l&apos;avenir technologique de
              l&apos;Afrique.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Notre symbole : une femme cyborg humanoïde africaine, incarnant la
              rencontre entre technologie avancée et culture ancestrale, portant
              fièrement un tingade traditionnel sénégalais.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
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

          {/* Right Content - Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex gap-6 p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-[#0d5a75] flex items-center justify-center group-hover:bg-[#FF6B35] transition-colors">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#0d5a75] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
