"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

export function HeroSection() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Full Screen Video Background */}
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
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-3">
        <button
          onClick={togglePlay}
          className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white" fill="currentColor" />
          )}
        </button>
        <button
          onClick={toggleMute}
          className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors"
          aria-label={isMuted ? "Activer le son" : "Couper le son"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* Centered Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto pt-20">
        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-[0.15em] mb-4">
          SALTIS
        </h1>
        
        {/* AI Event Badge */}
        <div className="inline-block border border-white/50 px-6 py-2 mb-8">
          <span className="text-white text-sm md:text-base tracking-[0.3em] uppercase">
            AI Event
          </span>
        </div>

        {/* Full Title */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6 leading-relaxed">
          Salon International des Algorithmes,<br />
          des Sciences, des Technologies et<br />
          de l&apos;Innovation du Sénégal
        </h2>

        {/* Subtitle */}
        <p className="text-white/80 text-sm md:text-base mb-6 max-w-2xl">
          Le <span className="text-[#FF6B35] font-semibold">rendez-vous incontournable</span> de l&apos;Intelligence Artificielle
          et de l&apos;Innovation Technologique en Afrique de l&apos;Ouest
        </p>

        {/* Theme */}
        <p className="text-white/70 text-sm md:text-base italic mb-8 max-w-2xl">
          Transformer les réalités africaines en opportunités durables et révéler les champions du continent
        </p>

        {/* Date */}
        <p className="text-white text-2xl md:text-4xl font-bold tracking-wider mb-10 uppercase">
          08-09 Décembre 2026
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/billetterie"
            className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white text-sm md:text-base font-semibold px-8 py-4 tracking-wider uppercase hover:bg-white hover:text-[#0d5a75] transition-all"
          >
            Préinscrivez-vous
          </Link>
          <Link
            href="/formulaire-exposant"
            className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white text-sm md:text-base font-semibold px-8 py-4 tracking-wider uppercase hover:bg-white hover:text-[#0d5a75] transition-all"
          >
            Exposez au salon
          </Link>
        </div>
      </div>
    </section>
  );
}
