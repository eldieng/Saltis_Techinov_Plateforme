"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, Loader2 } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setStatus("success");
    setEmail("");
    
    // Reset after 3 seconds
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section className="py-20 bg-[#0d5a75]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FF6B35] mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>

          {/* Content */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Restez informé
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir les dernières
            actualités, le programme détaillé et les offres exclusives de SALTIS
            2025.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#FF6B35]"
              disabled={status === "loading" || status === "success"}
            />
            <Button
              type="submit"
              className="h-12 px-8 bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading" && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              {status === "success" && (
                <CheckCircle className="w-4 h-4 mr-2" />
              )}
              {status === "success" ? "Inscrit !" : "S'inscrire"}
            </Button>
          </form>

          {/* Success Message */}
          {status === "success" && (
            <p className="text-[#FF6B35] mt-4 text-sm">
              Merci ! Vous recevrez bientôt nos actualités.
            </p>
          )}

          {/* Privacy Note */}
          <p className="text-white/50 text-xs mt-6">
            En vous inscrivant, vous acceptez de recevoir nos communications.
            Vous pouvez vous désinscrire à tout moment.
          </p>
        </div>
      </div>
    </section>
  );
}
