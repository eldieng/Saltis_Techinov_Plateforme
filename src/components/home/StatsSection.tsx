"use client";

import { useEffect, useState, useRef } from "react";

const stats = [
  {
    value: 5000,
    suffix: "+",
    label: "Participants",
  },
  {
    value: 100,
    suffix: "+",
    label: "Startups",
  },
  {
    value: 50,
    suffix: "+",
    label: "Speakers",
  },
  {
    value: 30,
    suffix: "+",
    label: "Partenaires",
  },
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

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0d5a75]">
        {count.toLocaleString()}
        <span className="text-[#FF6B35]">{suffix}</span>
      </div>
      <div className="text-gray-600 text-lg mt-2 font-medium">{label}</div>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 border-b border-gray-200/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
