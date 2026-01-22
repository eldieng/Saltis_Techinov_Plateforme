"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Play, Calendar, MapPin, ArrowRight, Volume2, VolumeX } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

// Date de l'événement SALTIS 2025 (à ajuster selon la date réelle)
const EVENT_DATE = new Date("2025-11-25T09:00:00");

export function HeroSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft(EVENT_DATE));
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(EVENT_DATE));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const countdownItems = [
    { label: "Jours", value: timeLeft.days },
    { label: "Heures", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Secondes", value: timeLeft.seconds },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 mb-16">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/Video_officiel_saltis.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-8 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors group"
        aria-label={isMuted ? "Activer le son" : "Couper le son"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white group-hover:text-[#FF6B35] transition-colors" />
        ) : (
          <Volume2 className="w-5 h-5 text-white group-hover:text-[#FF6B35] transition-colors" />
        )}
      </button>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0d5a75]/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-[#FF6B35] font-semibold mr-2">●</span>
            <span className="text-white text-sm">Édition 2025 - Dakar, Sénégal</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            <span className="block">SALTIS</span>
            <span className="text-gradient-saltis">TechInov 2025</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Salon International des Algorithmes, des Sciences, des Technologies
            et de l&apos;Innovation du Sénégal
          </p>

          {/* Theme */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
            <p className="text-white/80 text-sm uppercase tracking-wider mb-2">
              Thème 2025
            </p>
            <p className="text-white text-lg md:text-xl font-medium italic">
              « Intelligence Artificielle et usages multisectoriels : pour une
              souveraineté technologique, inclusive et durable »
            </p>
          </div>

          {/* Event Info */}
          <div className="flex flex-wrap justify-center gap-6 text-white/90">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-[#FF6B35]" />
              <span>15-16 Juin 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-[#FF6B35]" />
              <span>Musée des Civilisations Noires, Dakar</span>
            </div>
          </div>

          {/* Countdown */}
          {mounted && (
            <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
              {countdownItems.map((item) => (
                <div
                  key={item.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-white/70 text-xs md:text-sm uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="pt-8 pb-4">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="/billetterie"
                className="inline-flex items-center justify-center bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white text-lg font-medium px-8 py-4 rounded-xl transition-colors"
              >
                Réserver ma place
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <Link
                href="/programme"
                className="inline-flex items-center justify-center border-2 border-white bg-white/20 hover:bg-white/30 text-white text-lg font-medium px-8 py-4 rounded-xl transition-colors"
              >
                <Play className="mr-2 w-5 h-5" />
                Découvrir le programme
              </Link>
            </div>
          </div>
        </div>
      </div>

      </section>
  );
}
