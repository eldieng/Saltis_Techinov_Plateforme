"use client";

import Image from "next/image";

const photos = [
  {
    src: "/images/retour_photo/IMG_3647-scaled.jpg",
    alt: "SALTIS 2025 - Networking",
    size: "large",
  },
  {
    src: "/images/retour_photo/IMG_3636-scaled.jpg",
    alt: "SALTIS 2025 - Conférence",
    size: "small",
  },
  {
    src: "/images/retour_photo/IMG_3638-scaled.jpg",
    alt: "SALTIS 2025 - Panel",
    size: "small",
  },
  {
    src: "/images/retour_photo/IMG_3639-scaled.jpg",
    alt: "SALTIS 2025 - Discussion",
    size: "small",
  },
  {
    src: "/images/retour_photo/IMG_3651-scaled.jpg",
    alt: "SALTIS 2025 - Audience",
    size: "small",
  },
  {
    src: "/images/retour_photo/WhatsApp-Image-2025-12-21-at-15.10.34-1.jpeg",
    alt: "SALTIS 2025 - Stand",
    size: "small",
  },
  {
    src: "/images/retour_photo/WhatsApp-Image-2025-12-21-at-15.10.34-2.jpeg",
    alt: "SALTIS 2025 - Rencontre",
    size: "small",
  },
  {
    src: "/images/retour_photo/WhatsApp-Image-2025-12-21-at-15.10.40.jpeg",
    alt: "SALTIS 2025 - Échange",
    size: "small",
  },
];

export function PhotoGallerySection() {
  return (
    <section className="py-24 bg-[#0d5a75]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Retour en <span className="text-[#FF6B35]">Photos</span>
          </h2>
          <p className="text-white/70 mt-4">
            Les meilleurs moments de SALTIS 2025
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Large image - spans 2 rows and 2 cols on md+ */}
          <div className="col-span-2 row-span-2 relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden group">
            <Image
              src={photos[0].src}
              alt={photos[0].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          </div>

          {/* Small images */}
          {photos.slice(1, 5).map((photo, index) => (
            <div
              key={index}
              className="relative h-[140px] md:h-[190px] rounded-2xl overflow-hidden group"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>
          ))}

          {/* Bottom row - 3 images */}
          {photos.slice(5, 8).map((photo, index) => (
            <div
              key={index + 5}
              className="relative h-[140px] md:h-[180px] rounded-2xl overflow-hidden group"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
