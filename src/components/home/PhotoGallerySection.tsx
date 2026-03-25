"use client";

import Image from "next/image";

const photos = [
  // Existing photos
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
  // New photos from Jour1
  {
    src: "/images/Jour1/7293970f80a02d49f44867a55e3d0495.JPG",
    alt: "SALTIS 2025 - Jour 1",
    size: "small",
  },
  {
    src: "/images/Jour1/909d479bc62da68d0db621ef84c41cd3.JPG",
    alt: "SALTIS 2025 - Conférence Jour 1",
    size: "small",
  },
  {
    src: "/images/Jour1/9e3a74561e98ec96b7915ea29bb684cc.JPG",
    alt: "SALTIS 2025 - Panel Jour 1",
    size: "small",
  },
  {
    src: "/images/Jour1/f2d77135588cbced88f2cfad97614986.JPG",
    alt: "SALTIS 2025 - Networking Jour 1",
    size: "small",
  },
  {
    src: "/images/Jour1/e4ca5d5cacafe4e3cd60e70e2b021b08.JPG",
    alt: "SALTIS 2025 - Présentation Jour 1",
    size: "small",
  },
  {
    src: "/images/Jour1/c91618841881159075ffcc8391052b0e.JPG",
    alt: "SALTIS 2025 - Discussion Jour 1",
    size: "small",
  },
  {
    src: "/images/Jour1/a18ab556cd2ad7c852a1077583dff0a9.JPG",
    alt: "SALTIS 2025 - Audience Jour 1",
    size: "small",
  },
  {
    src: "/images/Jour1/99b09db98534973b922bc955fbf3ebb7.JPG",
    alt: "SALTIS 2025 - Stand Jour 1",
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Large image - spans 2 rows and 2 cols on md+ */}
          <div className="col-span-2 row-span-2 relative h-[300px] md:h-[400px] rounded-xl overflow-hidden group">
            <Image
              src={photos[0].src}
              alt={photos[0].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          </div>

          {/* First row small images */}
          {photos.slice(1, 5).map((photo, index) => (
            <div
              key={index}
              className="relative h-[145px] md:h-[195px] rounded-xl overflow-hidden group"
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

          {/* Second row - 4 images */}
          {photos.slice(5, 9).map((photo, index) => (
            <div
              key={index + 5}
              className="relative h-[150px] md:h-[180px] rounded-xl overflow-hidden group"
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

          {/* Third row - 4 images */}
          {photos.slice(9, 13).map((photo, index) => (
            <div
              key={index + 9}
              className="relative h-[150px] md:h-[180px] rounded-xl overflow-hidden group"
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
