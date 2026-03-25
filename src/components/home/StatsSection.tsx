"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { TrendingUp, Users, FileText, Building2, Globe, Rocket, BookOpen, MapPin } from "lucide-react";

const mainStats = [
  { value: 10000, prefix: "+", label: "participants" },
  { value: 20, prefix: "+", label: "pays représentés" },
  { value: 200, prefix: "+", label: "exposants & organisations" },
  { value: 300, prefix: "+", label: "pitchs & demos" },
  { value: 50, prefix: "+", label: "MOU signés" },
];

const images = [
  "/images/retour_photo/IMG_3647-scaled.jpg",
  "/images/retour_photo/IMG_3636-scaled.jpg",
  "/images/retour_photo/IMG_3638-scaled.jpg",
  "/images/retour_photo/IMG_3651-scaled.jpg",
];

const impactItems = [
  { icon: Users, text: "Plus de 500 jeunes participants au PAS Challenge" },
  { icon: FileText, text: "+5 publications stratégiques produites" },
  { icon: BookOpen, text: "1 Livre Blanc scientifique structurant (2025)" },
  { icon: Building2, text: "Mobilisation d'investisseurs internationaux" },
  { icon: Globe, text: "Structuration d'un cluster IA national en émergence" },
  { icon: MapPin, text: "Déploiement territorial via CANAL'IA" },
  { icon: Rocket, text: "Accélération de la Stratégie Nationale IA & Données" },
];

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return { count, ref };
}

function StatCard({ value, prefix, label }: { value: number; prefix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  const displayValue = count.toLocaleString().replace(/,/g, " ");
  
  return (
    <div ref={ref} className="bg-[#0a4a62]/80 backdrop-blur rounded-xl p-4 flex flex-col items-center justify-center text-center">
      <div className="text-2xl md:text-3xl font-bold text-[#FF6B35] mb-1">
        {prefix}{displayValue}
      </div>
      <p className="text-white/70 text-xs">{label}</p>
    </div>
  );
}

function ImageCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0d5a75] to-[#094559]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 bg-[#FF6B35]/20 border border-[#FF6B35]/40 text-[#FF6B35] text-xs font-semibold rounded-full mb-3">
            BILAN 2022-2025
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
            SALTIS <span className="text-[#FF6B35]">2022-2025</span>
          </h2>
          <p className="text-white/60 text-sm">
            IMPACT - INFLUENCE - STRUCTURATION
          </p>
        </div>

        {/* Stats Grid with Images - Row 1 */}
        <div className="grid grid-cols-3 gap-3 mb-3 max-w-4xl mx-auto">
          <StatCard value={mainStats[0].value} prefix={mainStats[0].prefix} label={mainStats[0].label} />
          <ImageCard src={images[0]} alt="SALTIS Event" />
          <StatCard value={mainStats[1].value} prefix={mainStats[1].prefix} label={mainStats[1].label} />
        </div>

        {/* Stats Grid with Images - Row 2 */}
        <div className="grid grid-cols-3 gap-3 mb-3 max-w-4xl mx-auto">
          <ImageCard src={images[1]} alt="SALTIS Event" />
          <StatCard value={mainStats[2].value} prefix={mainStats[2].prefix} label={mainStats[2].label} />
          <ImageCard src={images[2]} alt="SALTIS Event" />
        </div>

        {/* Stats Grid with Images - Row 3 */}
        <div className="grid grid-cols-3 gap-3 mb-6 max-w-4xl mx-auto">
          <StatCard value={mainStats[3].value} prefix={mainStats[3].prefix} label={mainStats[3].label} />
          <ImageCard src={images[3]} alt="SALTIS Event" />
          <StatCard value={mainStats[4].value} prefix={mainStats[4].prefix} label={mainStats[4].label} />
        </div>

        {/* Platform Statement */}
        <div className="bg-[#0a4a62]/60 backdrop-blur rounded-full py-3 px-6 mb-10 max-w-xl mx-auto">
          <p className="text-white text-center text-sm">
            SALTIS est aujourd&apos;hui la <span className="text-[#FF6B35] font-bold underline">plateforme IA de référence</span> en Afrique francophone.
          </p>
        </div>

        {/* Impact Section */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[#FF6B35]" />
            <h3 className="text-lg font-bold text-white uppercase tracking-wide">
              Impact Économique & Écosystème
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {impactItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 hover:bg-white/10 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#FF6B35]/20 flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-[#FF6B35]" />
                </div>
                <span className="text-white/90 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
