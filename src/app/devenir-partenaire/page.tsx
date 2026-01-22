"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  Users,
  Megaphone,
  Trophy,
  CheckCircle,
  Send,
  Sparkles,
  ArrowRight,
} from "lucide-react";

type PartnerType = "gold" | "silver" | "bronze" | "media";

interface PartnerOption {
  id: PartnerType;
  title: string;
  price: string;
  color: string;
  bgGradient: string;
  features: string[];
}

const partnerOptions: PartnerOption[] = [
  {
    id: "gold",
    title: "Partenaire Gold",
    price: "Sur devis",
    color: "from-yellow-400 to-amber-500",
    bgGradient: "bg-gradient-to-br from-yellow-50 to-amber-100",
    features: [
      "Logo sur tous les supports",
      "Stand premium 20m²",
      "5 passes VIP inclus",
      "Prise de parole en plénière",
      "Visibilité maximale",
    ],
  },
  {
    id: "silver",
    title: "Partenaire Silver",
    price: "Sur devis",
    color: "from-gray-300 to-gray-500",
    bgGradient: "bg-gradient-to-br from-gray-50 to-gray-200",
    features: [
      "Logo sur le site web",
      "Stand 12m²",
      "3 passes VIP inclus",
      "Mention dans les communications",
      "Networking privilégié",
    ],
  },
  {
    id: "bronze",
    title: "Partenaire Bronze",
    price: "Sur devis",
    color: "from-orange-300 to-orange-600",
    bgGradient: "bg-gradient-to-br from-orange-50 to-orange-100",
    features: [
      "Logo sur le site web",
      "Stand 6m²",
      "2 passes inclus",
      "Visibilité digitale",
    ],
  },
  {
    id: "media",
    title: "Partenaire Média",
    price: "Échange",
    color: "from-purple-400 to-indigo-600",
    bgGradient: "bg-gradient-to-br from-purple-50 to-indigo-100",
    features: [
      "Échange de visibilité",
      "Couverture médiatique",
      "2 passes presse",
      "Accès zone média",
    ],
  },
];

export default function DevenirPartenairePage() {
  const [selectedPartner, setSelectedPartner] = useState<PartnerType>("gold");
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
  };

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section with Gradient Background */}
      <section className="relative py-20 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d5a75] via-[#0a4a62] to-[#083d52]">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF6B35]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#FF6B35] mr-2" />
            <span className="text-white text-sm">Rejoignez l&apos;aventure SALTIS</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Devenez Partenaire
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Associez votre marque au plus grand Salon de l&apos;Intelligence Artificielle 
            en Afrique de l&apos;Ouest et bénéficiez d&apos;une visibilité exceptionnelle.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">5000+</div>
              <div className="text-white/70">Participants</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">100+</div>
              <div className="text-white/70">Startups</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">50+</div>
              <div className="text-white/70">Speakers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">2</div>
              <div className="text-white/70">Jours</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi devenir partenaire ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              SALTIS TechInov vous offre une plateforme unique pour connecter avec 
              les décideurs et innovateurs de l&apos;écosystème tech africain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#0d5a75] to-[#0a4a62] flex items-center justify-center">
                <Megaphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Visibilité</h3>
              <p className="text-gray-600 text-sm">
                Exposition maximale auprès de milliers de professionnels et décideurs
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#e85a2a] flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Networking</h3>
              <p className="text-gray-600 text-sm">
                Rencontrez les acteurs clés de l&apos;innovation en Afrique
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Positionnement</h3>
              <p className="text-gray-600 text-sm">
                Affirmez votre engagement pour l&apos;innovation technologique
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Leadership</h3>
              <p className="text-gray-600 text-sm">
                Devenez un acteur majeur de l&apos;écosystème IA africain
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Packages */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Offres Partenaires
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choisissez le niveau de partenariat qui correspond à vos objectifs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {partnerOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => setSelectedPartner(option.id)}
                className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  selectedPartner === option.id
                    ? "ring-2 ring-[#0d5a75] shadow-xl scale-105"
                    : "shadow-md hover:shadow-lg"
                } ${option.bgGradient}`}
              >
                {selectedPartner === option.id && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0d5a75] text-white text-xs font-medium rounded-full">
                    Sélectionné
                  </div>
                )}

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${option.color} flex items-center justify-center mb-4`}>
                  <Trophy className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">{option.title}</h3>
                <p className="text-[#0d5a75] font-semibold mb-4">{option.price}</p>

                <ul className="space-y-2">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-[#0d5a75] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Contactez-nous
              </h2>
              <p className="text-gray-600">
                Remplissez le formulaire ci-dessous et notre équipe vous recontactera 
                dans les plus brefs délais.
              </p>
            </div>

            {status === "success" ? (
              <div className="text-center p-12 bg-green-50 rounded-2xl">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Demande envoyée !
                </h3>
                <p className="text-gray-600">
                  Merci pour votre intérêt. Notre équipe vous contactera très prochainement.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de l&apos;entreprise *
                    </label>
                    <Input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      placeholder="Votre entreprise"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du contact *
                    </label>
                    <Input
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      placeholder="Prénom Nom"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email professionnel *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="email@entreprise.com"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+221 XX XXX XX XX"
                      className="h-12"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site web
                  </label>
                  <Input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://www.votre-site.com"
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Parlez-nous de vos objectifs et attentes..."
                    className="resize-none"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">
                    <strong>Offre sélectionnée :</strong>{" "}
                    {partnerOptions.find((p) => p.id === selectedPartner)?.title}
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full h-14 bg-gradient-to-r from-[#0d5a75] to-[#0a4a62] hover:from-[#0a4a62] hover:to-[#0d5a75] text-white text-lg"
                >
                  {status === "loading" ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      Envoyer ma demande
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-gray-500">
                  Ou contactez-nous directement à{" "}
                  <a href="mailto:partenaires@saltis-techinov.org" className="text-[#0d5a75] hover:underline">
                    partenaires@saltis-techinov.org
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0d5a75] to-[#0a4a62]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Prêt à rejoindre l&apos;aventure ?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Contactez notre équipe partenariats pour discuter de vos objectifs 
            et trouver la formule qui vous convient.
          </p>
          <Button
            className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white px-8 py-6 text-lg"
            asChild
          >
            <a href="mailto:partenaires@saltis-techinov.org">
              Nous contacter
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
