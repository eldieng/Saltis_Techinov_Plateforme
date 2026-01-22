"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  {
    src: "/images/ias-1.jpg",
    alt: "SALTIS 2024 - Conférence principale",
    caption: "Conférence d'ouverture SALTIS 2024",
  },
  {
    src: "/images/ias-2.jpg",
    alt: "SALTIS 2024 - Networking",
    caption: "Session de networking",
  },
  {
    src: "/images/ias-3.jpg",
    alt: "SALTIS 2024 - Panel IA",
    caption: "Panel sur l'Intelligence Artificielle",
  },
  {
    src: "/images/ias-4.jpg",
    alt: "SALTIS 2024 - Exposition",
    caption: "Espace exposition startups",
  },
  {
    src: "/images/ias-5.jpg",
    alt: "SALTIS 2024 - Atelier",
    caption: "Atelier pratique IA",
  },
  {
    src: "/images/ias-6.jpg",
    alt: "SALTIS 2024 - Cérémonie",
    caption: "Cérémonie de clôture",
  },
  {
    src: "/images/SEC-ias-1.jpeg",
    alt: "Formation IAS",
    caption: "Formation CANAL'IA",
  },
  {
    src: "/images/SEC-ias-2.jpeg",
    alt: "Session IAS",
    caption: "Session de formation",
  },
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Handle body overflow when lightbox is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#0d5a75]/10 text-[#0d5a75] px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Camera className="w-4 h-4" />
            Galerie Photos
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Retour en images sur{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d5a75] to-[#FF6B35]">
              SALTIS 2024
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Revivez les moments forts de l&apos;édition précédente du Salon International 
            des Algorithmes et de l&apos;Innovation.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className={`relative cursor-pointer group overflow-hidden rounded-2xl ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className={`relative ${index === 0 ? "aspect-square" : "aspect-square"}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-white text-sm font-medium">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More CTA */}
        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm">
            Plus de photos à venir pour l&apos;édition 2025
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors z-10"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Image */}
          <div 
            className="relative max-w-5xl max-h-[80vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              width={1200}
              height={800}
              className="object-contain w-full h-auto max-h-[80vh]"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-center font-medium">
                {galleryImages[selectedImage].caption}
              </p>
              <p className="text-white/60 text-center text-sm mt-1">
                {selectedImage + 1} / {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
