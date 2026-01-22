"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Building2,
  CheckCircle,
  Loader2,
  Mail,
  Phone,
  User,
  Globe,
  Package,
} from "lucide-react";

const categories = [
  { value: "startup", label: "Startup" },
  { value: "entreprise", label: "Entreprise" },
  { value: "institution", label: "Institution" },
  { value: "association", label: "Association / ONG" },
  { value: "academique", label: "Institution Académique" },
  { value: "autre", label: "Autre" },
];

const packs = [
  {
    id: "standard",
    name: "Pack Standard",
    price: "500 000",
    features: [
      "Stand 9m²",
      "2 badges exposant",
      "Listing sur le site web",
      "Accès Wi-Fi",
    ],
  },
  {
    id: "premium",
    name: "Pack Premium",
    price: "1 000 000",
    popular: true,
    features: [
      "Stand 18m²",
      "4 badges exposant",
      "Logo sur les supports",
      "Mention dans la newsletter",
      "1 intervention de 15min",
      "Accès VIP networking",
    ],
  },
  {
    id: "platinum",
    name: "Pack Platinum",
    price: "2 000 000",
    features: [
      "Stand 36m²",
      "8 badges exposant",
      "Logo premium partout",
      "Keynote de 30min",
      "Article dédié",
      "Accès VIP complet",
      "Leads qualifiés",
    ],
  },
];

export default function FormulaireExposantPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    category: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    products: "",
    pack: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/submissions/exhibitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Une erreur est survenue");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Candidature envoyée !
          </h1>
          <p className="text-gray-600 mb-8">
            Merci pour votre intérêt à exposer au SALTIS TechInov 2025. Notre équipe
            examinera votre candidature et vous contactera dans les plus brefs délais.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full bg-[#0d5a75] hover:bg-[#0d5a75]/90">
              <Link href="/">Retour à l&apos;accueil</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/exposants">Voir les exposants</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0d5a75] to-[#0a4a62] text-white py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-[#FF6B35]" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Devenir Exposant</h1>
              <p className="text-white/80">SALTIS TechInov 2025</p>
            </div>
          </div>
          <p className="text-lg text-white/80 max-w-2xl">
            Présentez vos solutions innovantes à plus de 2000 visiteurs professionnels.
            Remplissez ce formulaire pour soumettre votre candidature.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Organization Info */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#0d5a75]" />
                  Informations sur l&apos;organisation
                </h2>

                <div>
                  <Label htmlFor="name">Nom de l&apos;organisation *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Ex: TechSenegal SA"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Catégorie *</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0d5a75] focus:border-transparent"
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="description">Description de l&apos;organisation *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Décrivez brièvement votre organisation et ses activités..."
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="website">Site web</Label>
                  <div className="relative mt-1">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://www.example.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="products">Produits/Services à exposer *</Label>
                  <Textarea
                    id="products"
                    name="products"
                    value={formData.products}
                    onChange={handleChange}
                    required
                    placeholder="Décrivez les produits ou services que vous souhaitez présenter..."
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Pack Selection */}
              <div className="space-y-4 pt-6 border-t">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#0d5a75]" />
                  Choisissez votre pack *
                </h2>
                <div className="grid gap-4">
                  {packs.map((pack) => (
                    <label
                      key={pack.id}
                      className={`relative flex cursor-pointer rounded-xl border-2 p-4 transition-all ${
                        formData.pack === pack.id
                          ? "border-[#FF6B35] bg-[#FF6B35]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="pack"
                        value={pack.id}
                        checked={formData.pack === pack.id}
                        onChange={handleChange}
                        className="sr-only"
                        required
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{pack.name}</span>
                            {pack.popular && (
                              <span className="px-2 py-0.5 bg-[#FF6B35] text-white text-xs rounded-full">
                                Populaire
                              </span>
                            )}
                          </div>
                          <span className="text-lg font-bold text-[#FF6B35]">
                            {pack.price} <span className="text-sm font-normal text-gray-500">FCFA</span>
                          </span>
                        </div>
                        <ul className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                          {pack.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-[#0d5a75]" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={`ml-4 flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                        formData.pack === pack.id
                          ? "border-[#FF6B35] bg-[#FF6B35]"
                          : "border-gray-300"
                      }`}>
                        {formData.pack === pack.id && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 pt-6 border-t">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#0d5a75]" />
                  Personne de contact
                </h2>

                <div>
                  <Label htmlFor="contactName">Nom complet *</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      placeholder="Prénom et Nom"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactEmail">Email *</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="contactEmail"
                        name="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        required
                        placeholder="email@example.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contactPhone">Téléphone *</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="contactPhone"
                        name="contactPhone"
                        type="tel"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        required
                        placeholder="+221 77 XXX XX XX"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-[#FF6B35] to-orange-500 hover:from-[#e55a2a] hover:to-orange-600 text-white font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Package className="w-5 h-5 mr-2" />
                      Soumettre ma candidature
                    </>
                  )}
                </Button>
                <p className="text-sm text-gray-500 text-center mt-4">
                  En soumettant ce formulaire, vous acceptez d&apos;être contacté par
                  l&apos;équipe SALTIS concernant votre candidature.
                </p>
              </div>
            </form>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-[#0d5a75]/5 rounded-2xl p-6 border border-[#0d5a75]/10">
            <h3 className="font-semibold text-[#0d5a75] mb-3">
              Pourquoi exposer au SALTIS ?
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#FF6B35] mt-0.5 shrink-0" />
                <span>Visibilité auprès de 2000+ visiteurs professionnels</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#FF6B35] mt-0.5 shrink-0" />
                <span>Networking avec les acteurs clés de l&apos;IA en Afrique</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#FF6B35] mt-0.5 shrink-0" />
                <span>Couverture médiatique nationale et internationale</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#FF6B35] mt-0.5 shrink-0" />
                <span>Stand personnalisé dans un espace premium</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
