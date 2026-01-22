"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

// Helper function to determine redirect URL based on user role
const getRedirectUrl = (role?: string): string => {
  switch (role) {
    case "ADMIN":
    case "ORGANIZER":
      return "/admin";
    case "HOSTESS":
      return "/admin/checkin";
    default:
      return "/dashboard";
  }
};

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      console.log("SignIn result:", result);

      if (result?.error) {
        if (result.error === "Configuration") {
          // This is a NextAuth config issue, but auth might have succeeded
          // Try to navigate anyway - get session to check role
          const session = await getSession();
          const redirectUrl = getRedirectUrl(session?.user?.role);
          router.push(redirectUrl);
          router.refresh();
        } else {
          setError("Email ou mot de passe incorrect");
        }
      } else if (result?.ok) {
        // Get session to determine redirect based on role
        const session = await getSession();
        const redirectUrl = getRedirectUrl(session?.user?.role);
        router.push(redirectUrl);
        router.refresh();
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Gradient Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d5a75] via-[#0a4a62] to-[#083d52]">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF6B35]/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/15 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
          <div className="mb-8">
            <Image
              src="/images/Logo-SALTIS.png"
              alt="SALTIS Logo"
              width={100}
              height={100}
              className="mx-auto"
            />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Bienvenue sur SALTIS
          </h2>
          <p className="text-white/80 text-lg max-w-md">
            Connectez-vous pour accéder à votre espace personnel et gérer vos billets pour SALTIS TechInov 2025.
          </p>
          <div className="mt-12 flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 border border-white/20">
            <Sparkles className="w-5 h-5 text-[#FF6B35]" />
            <span className="text-white text-sm">15-16 Juin 2025 • Dakar</span>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Image
              src="/images/Logo-SALTIS.png"
              alt="SALTIS Logo"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Connexion</h1>
            <p className="text-gray-600 mt-2">
              Accédez à votre espace SALTIS TechInov
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className="pl-12 h-12 rounded-xl border-gray-200 focus:border-[#0d5a75] focus:ring-[#0d5a75]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-gray-700 font-medium">Mot de passe</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-[#FF6B35] hover:underline font-medium"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="pl-12 h-12 rounded-xl border-gray-200 focus:border-[#0d5a75] focus:ring-[#0d5a75]"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 bg-gradient-to-r from-[#0d5a75] to-[#0a4a62] hover:opacity-90 text-white rounded-xl shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Pas encore de compte ?{" "}
                <Link
                  href="/register"
                  className="text-[#FF6B35] font-semibold hover:underline"
                >
                  Créer un compte
                </Link>
              </p>
            </div>
          </div>

          {/* Back to home */}
          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-gray-500 text-sm hover:text-[#0d5a75] transition-colors"
            >
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
