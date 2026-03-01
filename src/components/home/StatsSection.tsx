"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const stats = [
  { value: 4000, suffix: "+", label: "participants sur 2 jours" },
  { value: 3000, suffix: "+", label: "vues du direct et replays" },
  { value: 29, suffix: "", label: "expositions et stands" },
  { value: 30, suffix: "", label: "démos & pitchs startups" },
  { value: 8, suffix: "", label: "MOU signés", padZero: true },
];

const images = [
  "/images/ias-1.jpg",
  "/images/ias-2.jpg",
  "/images/ias-3.jpg",
  "/images/ias-4.jpg",
  "/images/ias-5.jpg",
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

function StatCard({ value, suffix, label, padZero }: { value: number; suffix: string; label: string; padZero?: boolean }) {
  const { count, ref } = useCountUp(value);
  const displayValue = padZero ? String(count).padStart(2, "0") : count.toLocaleString();
  
  return (
    <div ref={ref} className="bg-[#0a4a62] rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[180px]">
      <div className="text-5xl md:text-6xl font-bold text-white mb-2">
        {displayValue}{suffix}
      </div>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
}

function ImageCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative rounded-2xl overflow-hidden min-h-[180px]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 bg-[#0d5a75]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Grid Layout - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Row 1 */}
          <StatCard value={stats[0].value} suffix={stats[0].suffix} label={stats[0].label} />
          <ImageCard src={images[0]} alt="SALTIS Event" />
          <StatCard value={stats[1].value} suffix={stats[1].suffix} label={stats[1].label} />
          
          {/* Row 2 */}
          <ImageCard src={images[1]} alt="SALTIS Event" />
          <StatCard value={stats[2].value} suffix={stats[2].suffix} label={stats[2].label} />
          <ImageCard src={images[2]} alt="SALTIS Event" />
          
          {/* Row 3 */}
          <StatCard value={stats[3].value} suffix={stats[3].suffix} label={stats[3].label} />
          <ImageCard src={images[3]} alt="SALTIS Event" />
          <StatCard value={stats[4].value} suffix={stats[4].suffix} label={stats[4].label} padZero />
        </div>
      </div>
    </section>
  );
}
