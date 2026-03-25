"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Boubacar Roger Thiam",
    role: "Directeur de l'Économie Numérique et des Partenariats",
    image: "/images/temoignage/Boubacar Roger Thiam.jpeg",
    quote: "Au fil des éditions, le SALTIS s'est imposé comme un rendez-vous stratégique incontournable au Sénégal. Bien plus qu'un simple événement, il constitue un véritable espace de convergence, de réflexion et de décision, favorisant un dialogue fécond entre l'État, le secteur privé, les partenaires au développement et la jeunesse.",
  },
  {
    name: "Marlène Lasgouttes Sow",
    role: "General Management GOMYCODE",
    image: "/images/temoignage/Marlène lasgouttes Sow.jpeg",
    quote: "Je crois que nous avons au Sénégal une communauté de l'IA qui est vibrante et c'est une véritable chance car tous les pays n'ont pas encore cette maturité sur le sujet. Il est donc essentiel d'avoir des rendez-vous comme celui-ci pour permettre aux acteurs de se rencontrer, d'échanger et surtout pour que les jeunes puissent se sentir inspirés.",
  },
  {
    name: "Isodore Diouf",
    role: "Directeur Général, Sénégal Numérique SA",
    image: "/images/temoignage/Isodore Diouf.jpeg",
    quote: "Cet événement s'est désormais inscrit dans l'agenda de l'écosystème numérique sénégalais. En tant que Sénégal Numérique SA., il était essentiel pour nous de participer à cette initiative afin de partager notre vision sur la structuration d'un écosystème plus solide et inclusif mais aussi de déceler des talents à travers la séance de démonstration tenue le deuxième jour du SALTIS.",
  },
  {
    name: "Ouma Sani",
    role: "Directrice Women Investment Club (WIC)",
    image: "/images/temoignage/Ouma Sani.jpeg",
    quote: "Le SALTIS a été une très belle initiative pour mettre en avant les opportunités qu'offrent l'IA, le numérique et la technologie. Une attention particulière a été accordée aux femmes entrepreneures en leur montrant comment utiliser l'IA pour mieux s'intégrer dans le monde professionnel et entrepreneurial.",
  },
  {
    name: "Dr Lansana Gagny Sakho",
    role: "PCA APIX",
    image: "/images/temoignage/Dr Lansana gagny Sakho.jpeg",
    quote: "Ce type d'initiative mérite d'être soutenu et répliqué dans d'autres régions du Sénégal. Il était vraiment important de réunir les acteurs de l'intelligence artificielle et de l'innovation. L'événement a été un succès, mais le plus important reste ce qui sera fait après : définir une feuille de route, renforcer l'implication des pouvoirs publics et préparer l'édition 2026.",
  },
];

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScroll);
      return () => ref.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-[#0d5a75] via-[#1a6d8a] to-[#FF6B35] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Quelques témoignages sur le <span className="text-white">SALTIS 2025</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Découvrez ce que les acteurs de l&apos;écosystème pensent de notre événement
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-2 mb-6">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-3 rounded-full border border-white/30 transition-all ${
              canScrollLeft
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-white/5 text-white/30 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-3 rounded-full border border-white/30 transition-all ${
              canScrollRight
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-white/5 text-white/30 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Testimonials Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[350px] md:w-[400px] bg-white rounded-2xl p-6 shadow-xl snap-start"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-[#FF6B35]/30" />
              </div>
              
              {/* Quote Text */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#FF6B35]/20">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#0d5a75] text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
