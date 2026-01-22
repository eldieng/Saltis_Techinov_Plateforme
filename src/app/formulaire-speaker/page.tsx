"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  CheckCircle,
  Loader2,
  Mail,
  Phone,
  User,
  Briefcase,
  Linkedin,
  Mic,
  MessageSquare,
  Camera,
  Upload,
} from "lucide-react";

export default function FormulaireSpeakerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    bio: "",
    email: "",
    phone: "",
    linkedin: "",
    topic: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        setFormData((prev) => ({ ...prev, image: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/submissions/speaker", {
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
            Merci pour votre intérêt à intervenir au SALTIS TechInov 2025. Notre équipe
            examinera votre candidature et vous contactera dans les plus brefs délais.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full bg-[#0d5a75] hover:bg-[#0d5a75]/90">
              <Link href="/">Retour à l&apos;accueil</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/speakers">Voir les speakers</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FF6B35] to-orange-500 text-white py-16">
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
              <Mic className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Devenir Speaker</h1>
              <p className="text-white/80">SALTIS TechInov 2025</p>
            </div>
          </div>
          <p className="text-lg text-white/80 max-w-2xl">
            Partagez votre expertise avec plus de 2000 professionnels passionnés par l&apos;IA.
            Remplissez ce formulaire pour proposer votre intervention.
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

              {/* Personal Info */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#FF6B35]" />
                  Informations personnelles
                </h2>

                <div>
                  <Label htmlFor="name">Nom complet *</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Prénom et Nom"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="role">Fonction / Titre *</Label>
                    <div className="relative mt-1">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        placeholder="Ex: CEO, CTO, Data Scientist..."
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="company">Organisation *</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      placeholder="Nom de votre organisation"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="image">Photo de profil</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                        <Upload className="w-4 h-4" />
                        Choisir une photo
                        <input
                          type="file"
                          id="image"
                          name="image"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG. Max 2MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Biographie *</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                    placeholder="Décrivez brièvement votre parcours et votre expertise..."
                    rows={4}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 pt-6 border-t">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#FF6B35]" />
                  Coordonnées
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="email@example.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Téléphone *</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+221 77 XXX XX XX"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="linkedin">Profil LinkedIn</Label>
                  <div className="relative mt-1">
                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="linkedin"
                      name="linkedin"
                      type="url"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/votre-profil"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Topic */}
              <div className="space-y-4 pt-6 border-t">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#FF6B35]" />
                  Proposition d&apos;intervention
                </h2>

                <div>
                  <Label htmlFor="topic">Sujet proposé *</Label>
                  <Textarea
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    required
                    placeholder="Décrivez le sujet que vous souhaitez présenter, les points clés que vous aborderez, et pourquoi ce sujet est pertinent pour le SALTIS..."
                    rows={5}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Thèmes suggérés : IA générative, Machine Learning, FinTech, HealthTech, 
                    AgriTech, Éducation, Éthique de l&apos;IA, Souveraineté numérique...
                  </p>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-[#0d5a75] to-[#0a4a62] hover:from-[#0a4a62] hover:to-[#0d5a75] text-white font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Mic className="w-5 h-5 mr-2" />
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
          <div className="mt-8 bg-[#FF6B35]/5 rounded-2xl p-6 border border-[#FF6B35]/10">
            <h3 className="font-semibold text-[#FF6B35] mb-3">
              Pourquoi intervenir au SALTIS ?
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#0d5a75] mt-0.5 shrink-0" />
                <span>Audience de 2000+ professionnels passionnés par l&apos;IA</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#0d5a75] mt-0.5 shrink-0" />
                <span>Visibilité nationale et internationale</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#0d5a75] mt-0.5 shrink-0" />
                <span>Networking avec les leaders de l&apos;écosystème tech africain</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#0d5a75] mt-0.5 shrink-0" />
                <span>Contribution au développement de l&apos;IA en Afrique</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
