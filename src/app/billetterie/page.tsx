"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Check,
  Ticket,
  Star,
  Crown,
  Sparkles,
  ArrowRight,
  Loader2,
  CheckCircle,
  Calendar,
  MapPin,
  Users,
  Gift,
  Shield,
  ChevronDown,
  Mail,
  Phone,
  Building,
  User,
  CreditCard,
  Smartphone,
  AlertCircle,
} from "lucide-react";

interface Pass {
  id: string;
  name: string;
  price: number;
  description: string | null;
  features: string[];
  eventId: string;
}

interface PassDisplay extends Pass {
  priceLabel: string;
  icon: typeof Ticket;
  gradient: string;
  bgGradient: string;
  borderColor: string;
  popular: boolean;
  badge: string | null;
}

const passStyles: Record<string, { icon: typeof Ticket; gradient: string; bgGradient: string; borderColor: string; popular: boolean; badge: string | null }> = {
  "Pass Gratuit": {
    icon: Ticket,
    gradient: "from-gray-500 to-gray-600",
    bgGradient: "from-gray-50 to-gray-100",
    borderColor: "border-gray-200",
    popular: false,
    badge: null,
  },
  "Pass Standard": {
    icon: Star,
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100",
    borderColor: "border-blue-200",
    popular: false,
    badge: null,
  },
  "Pass Médium": {
    icon: Sparkles,
    gradient: "from-[#FF6B35] to-orange-600",
    bgGradient: "from-orange-50 to-orange-100",
    borderColor: "border-[#FF6B35]",
    popular: true,
    badge: "Le plus populaire",
  },
  "Pass Premium": {
    icon: Crown,
    gradient: "from-[#0d5a75] to-[#FF6B35]",
    bgGradient: "from-[#0d5a75]/5 to-[#FF6B35]/5",
    borderColor: "border-[#0d5a75]",
    popular: false,
    badge: "VIP",
  },
};

const defaultStyle = {
  icon: Ticket,
  gradient: "from-gray-500 to-gray-600",
  bgGradient: "from-gray-50 to-gray-100",
  borderColor: "border-gray-200",
  popular: false,
  badge: null,
};

const eventHighlights = [
  { icon: Calendar, label: "15-16 Juin 2025", sublabel: "2 jours" },
  { icon: MapPin, label: "Musée des Civilisations Noires", sublabel: "Dakar" },
  { icon: Users, label: "5000+ Participants", sublabel: "Attendus" },
];

export default function BilletteriePage() {
  const router = useRouter();
  const [passes, setPasses] = useState<PassDisplay[]>([]);
  const [isLoadingPasses, setIsLoadingPasses] = useState(true);
  const [selectedPass, setSelectedPass] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Load passes from API
  useEffect(() => {
    async function loadPasses() {
      try {
        const response = await fetch("/api/passes");
        const data = await response.json();
        
        if (data.passes && data.passes.length > 0) {
          const formattedPasses: PassDisplay[] = data.passes.map((pass: Pass) => {
            const style = passStyles[pass.name] || defaultStyle;
            return {
              ...pass,
              priceLabel: pass.price === 0 ? "Gratuit" : `${pass.price.toLocaleString()} FCFA`,
              ...style,
            };
          });
          setPasses(formattedPasses);
        }
      } catch (err) {
        console.error("Error loading passes:", err);
      } finally {
        setIsLoadingPasses(false);
      }
    }
    loadPasses();
  }, []);

  const handlePassSelect = (passId: string) => {
    setSelectedPass(passId);
    setStep(2);
    setError(null);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPass) return;

    const selectedPassData = passes.find((p) => p.id === selectedPass);
    if (!selectedPassData) return;

    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: selectedPassData.eventId,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerFirstName: formData.firstName,
          customerLastName: formData.lastName,
          customerOrganization: formData.organization || undefined,
          items: [{ passId: selectedPass, quantity: 1 }],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la création de la commande");
      }

      // If free pass or payment URL available, redirect
      if (data.redirectUrl) {
        router.push(data.redirectUrl);
      } else if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        // Order created but no payment gateway configured
        setStatus("success");
        // Redirect to confirmation page after a short delay
        setTimeout(() => {
          router.push(`/billetterie/confirmation/${data.order.orderNumber}`);
        }, 1500);
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    }
  };

  const selectedPassData = passes.find((p) => p.id === selectedPass);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Modern & Immersive */}
      <section className="relative pt-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[#0d5a75]">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B35]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-[#FF6B35] rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">
                Réservations ouvertes - Places limitées
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Réservez votre place au{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-orange-400">
                SALTIS 2025
              </span>
            </h1>

            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              <span className="font-semibold text-[#FF6B35]">Jàng, Jàngal, Jàngat</span>
              <br />
              Apprendre, transmettre, propager — L&apos;IA pour l&apos;école, par l&apos;école
            </p>

            {/* Event Highlights */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
              {eventHighlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">{item.label}</p>
                    <p className="text-white/60 text-xs">{item.sublabel}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <button
              onClick={() => document.getElementById("passes")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <span className="text-sm">Voir les pass</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* Passes Section */}
      <section id="passes" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-[#FF6B35] font-semibold text-sm uppercase tracking-wider mb-2">
              Choisissez votre expérience
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0d5a75] mb-4">
              Nos différents Pass
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sélectionnez le pass qui correspond à vos attentes pour vivre le SALTIS TechInov 2025
            </p>
          </div>

          {/* Passes Grid */}
          {isLoadingPasses ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#0d5a75]" />
            </div>
          ) : passes.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Aucun pass disponible pour le moment</p>
            </div>
          ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {passes.map((pass) => (
              <div
                key={pass.id}
                onClick={() => handlePassSelect(pass.id)}
                className={`relative group cursor-pointer rounded-3xl border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                  pass.borderColor
                } ${
                  selectedPass === pass.id
                    ? "ring-4 ring-[#FF6B35] ring-offset-4 shadow-2xl scale-[1.02]"
                    : "hover:border-[#FF6B35]/50"
                }`}
              >
                {/* Badge */}
                {pass.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className={`bg-gradient-to-r ${pass.gradient} text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg`}>
                      {pass.badge}
                    </span>
                  </div>
                )}

                {/* Card Content */}
                <div className={`p-6 lg:p-8 rounded-3xl bg-gradient-to-br ${pass.bgGradient}`}>
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${pass.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <pass.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Title & Price */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {pass.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3">{pass.description}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-3xl font-bold bg-gradient-to-r ${pass.gradient} bg-clip-text text-transparent`}>
                        {pass.price === 0 ? "Gratuit" : pass.price.toLocaleString()}
                      </span>
                      {pass.price > 0 && (
                        <span className="text-gray-500 text-sm">FCFA</span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {pass.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${pass.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <Button
                    className={`w-full h-12 text-white font-semibold rounded-xl bg-gradient-to-r ${pass.gradient} hover:opacity-90 transition-opacity shadow-lg`}
                  >
                    {selectedPass === pass.id ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Sélectionné
                      </>
                    ) : (
                      <>
                        Choisir ce pass
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Reservation Form Section */}
      <section ref={formRef} className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className={`flex items-center gap-2 ${step >= 1 ? "text-[#0d5a75]" : "text-gray-400"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= 1 ? "bg-[#0d5a75] text-white" : "bg-gray-200"
                }`}>
                  1
                </div>
                <span className="font-medium hidden sm:inline">Choisir un pass</span>
              </div>
              <div className={`w-16 h-1 rounded ${step >= 2 ? "bg-[#0d5a75]" : "bg-gray-200"}`} />
              <div className={`flex items-center gap-2 ${step >= 2 ? "text-[#0d5a75]" : "text-gray-400"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= 2 ? "bg-[#0d5a75] text-white" : "bg-gray-200"
                }`}>
                  2
                </div>
                <span className="font-medium hidden sm:inline">Vos informations</span>
              </div>
              <div className={`w-16 h-1 rounded ${status === "success" ? "bg-[#0d5a75]" : "bg-gray-200"}`} />
              <div className={`flex items-center gap-2 ${status === "success" ? "text-[#0d5a75]" : "text-gray-400"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  status === "success" ? "bg-[#0d5a75] text-white" : "bg-gray-200"
                }`}>
                  3
                </div>
                <span className="font-medium hidden sm:inline">Confirmation</span>
              </div>
            </div>

            {status === "success" ? (
              /* Success State */
              <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-[#0d5a75] mb-4">
                  Réservation confirmée ! 🎉
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Votre {selectedPassData?.name} a été réservé avec succès. Un email de confirmation avec votre QR code a été envoyé.
                </p>
                <div className="bg-gray-50 rounded-2xl p-6 max-w-sm mx-auto mb-8">
                  <p className="text-sm text-gray-500 mb-2">Votre pass</p>
                  <p className="text-xl font-bold text-[#0d5a75]">{selectedPassData?.name}</p>
                  <p className="text-[#FF6B35] font-semibold">{selectedPassData?.priceLabel}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    className="border-[#0d5a75] text-[#0d5a75] hover:bg-[#0d5a75] hover:text-white"
                    onClick={() => {
                      setStatus("idle");
                      setSelectedPass(null);
                      setStep(1);
                    }}
                  >
                    Réserver un autre pass
                  </Button>
                  <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white">
                    Voir mon billet
                  </Button>
                </div>
              </div>
            ) : (
              /* Form */
              <div className="grid lg:grid-cols-5 gap-8">
                {/* Form Fields */}
                <div className="lg:col-span-3">
                  <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-[#0d5a75] mb-6">
                      Vos informations
                    </h2>

                    {!selectedPass && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                        <Gift className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <p className="text-amber-800 text-sm">
                          Veuillez d&apos;abord sélectionner un pass ci-dessus
                        </p>
                      </div>
                    )}

                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                        <p className="text-red-800 text-sm">{error}</p>
                      </div>
                    )}

                    <form
                      onSubmit={handleSubmit}
                      className={`space-y-5 ${!selectedPass ? "opacity-50 pointer-events-none" : ""}`}
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-gray-700 font-medium">
                            Prénom *
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              placeholder="Votre prénom"
                              className="pl-10 h-12 rounded-xl border-gray-200 focus:border-[#0d5a75] focus:ring-[#0d5a75]"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-gray-700 font-medium">
                            Nom *
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              placeholder="Votre nom"
                              className="pl-10 h-12 rounded-xl border-gray-200 focus:border-[#0d5a75] focus:ring-[#0d5a75]"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 font-medium">
                          Email *
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="votre@email.com"
                            className="pl-10 h-12 rounded-xl border-gray-200 focus:border-[#0d5a75] focus:ring-[#0d5a75]"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700 font-medium">
                          Téléphone *
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+221 77 XXX XX XX"
                            className="pl-10 h-12 rounded-xl border-gray-200 focus:border-[#0d5a75] focus:ring-[#0d5a75]"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="organization" className="text-gray-700 font-medium">
                          Organisation <span className="text-gray-400">(optionnel)</span>
                        </Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="organization"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            placeholder="Votre entreprise ou organisation"
                            className="pl-10 h-12 rounded-xl border-gray-200 focus:border-[#0d5a75] focus:ring-[#0d5a75]"
                          />
                        </div>
                      </div>

                      {/* Payment Methods Preview */}
                      {selectedPassData && selectedPassData.price > 0 && (
                        <div className="pt-4">
                          <p className="text-sm text-gray-500 mb-3">Moyens de paiement acceptés</p>
                          <div className="flex gap-3">
                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                              <Smartphone className="w-5 h-5 text-orange-500" />
                              <span className="text-sm font-medium">Orange Money</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                              <Smartphone className="w-5 h-5 text-blue-500" />
                              <span className="text-sm font-medium">Wave</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                              <CreditCard className="w-5 h-5 text-gray-600" />
                              <span className="text-sm font-medium">Carte</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-[#FF6B35] to-orange-500 hover:opacity-90 text-white shadow-lg shadow-orange-500/25"
                        disabled={!selectedPass || status === "loading"}
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Traitement en cours...
                          </>
                        ) : selectedPassData?.price === 0 ? (
                          <>
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Confirmer ma réservation gratuite
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-5 h-5 mr-2" />
                            Procéder au paiement
                          </>
                        )}
                      </Button>

                      <p className="text-center text-gray-400 text-xs">
                        <Shield className="w-4 h-4 inline mr-1" />
                        Paiement sécurisé • Données protégées
                      </p>
                    </form>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 sticky top-24">
                    <h3 className="text-lg font-bold text-[#0d5a75] mb-6">
                      Récapitulatif
                    </h3>

                    {selectedPassData ? (
                      <>
                        <div className={`rounded-2xl p-4 bg-gradient-to-br ${selectedPassData.bgGradient} mb-6`}>
                          <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${selectedPassData.gradient} flex items-center justify-center`}>
                              <selectedPassData.icon className="w-7 h-7 text-white" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{selectedPassData.name}</p>
                              <p className="text-sm text-gray-500">{selectedPassData.description}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 mb-6">
                          {selectedPassData.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <Check className="w-4 h-4 text-green-500" />
                              {feature}
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-gray-100 pt-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-500">Sous-total</span>
                            <span className="font-medium">{selectedPassData.priceLabel}</span>
                          </div>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-500">Frais</span>
                            <span className="font-medium text-green-600">Gratuit</span>
                          </div>
                          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <span className="text-lg font-bold text-[#0d5a75]">Total</span>
                            <span className={`text-2xl font-bold bg-gradient-to-r ${selectedPassData.gradient} bg-clip-text text-transparent`}>
                              {selectedPassData.priceLabel}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Ticket className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500">
                          Sélectionnez un pass pour voir le récapitulatif
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            <div className="flex items-center gap-3 text-gray-500">
              <Shield className="w-6 h-6" />
              <span className="text-sm font-medium">Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <CheckCircle className="w-6 h-6" />
              <span className="text-sm font-medium">Confirmation instantanée</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <Gift className="w-6 h-6" />
              <span className="text-sm font-medium">QR Code par email</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <Users className="w-6 h-6" />
              <span className="text-sm font-medium">+5000 participants</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
