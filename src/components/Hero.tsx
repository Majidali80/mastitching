"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

const perfumes = [
  {
    name: "Mystic Cedar Whisper",
    image: "/cedar1.jpg",
    alt: "Mystic Cedar Whisper perfume bottle",
    slug: "mystic-cedar-whisper",
  },
  {
    name: "Citrus Bloom Sorceress",
    image: "/citrus1.jpg",
    alt: "Citrus Bloom Sorceress perfume bottle",
    slug: "citrus-bloom-sorceress",
  },
  {
    name: "Velvet Rose Mystic",
    image: "/rose1.jpg",
    alt: "Velvet Rose Mystic perfume bottle",
    slug: "velvet-rose-mystic",
  },
  {
    name: "Midnight Musk Enigma",
    image: "/musk1.jpg",
    alt: "Midnight Musk Enigma perfume bottle",
    slug: "midnight-musk-enigma",
  },
  {
    name: "Saffron Silk Sorceress",
    image: "/silk1.jpg",
    alt: "Saffron Silk Sorceress perfume bottle",
    slug: "saffron-silk-sorceress",
  },
];

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gray-100 py-12 md:py-20 overflow-hidden">
      {/* Art Deco Background Patterns */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="w-full h-full bg-repeat bg-[url('/bg1.jpg')]"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Tagline */}
        <h1 className="text-3xl md:text-5xl font-serif text-gold-500 mb-8 tracking-wide bg-white bg-opacity-70 inline-block py-2 px-6 rounded-lg shadow-md">
          DISCOVER YOUR MYSTICAL ESSENCE...
        </h1>

        {/* Perfume Bottles */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {perfumes.map((perfume, index) => (
            <div
              key={index}
              className="relative group transform hover:scale-110 transition-transform duration-300"
            >
              {/* Link to Product Page */}
              <Link href={`/perfume/${perfume.slug}`} passHref>
                <div className="block">
                  {/* Perfume Image */}
                  <Image
                    src={perfume.image}
                    alt={perfume.alt}
                    width={200}
                    height={600}
                    className="object-contain drop-shadow-lg"
                  />

                  {/* Perfume Name on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white bg-black bg-opacity-60 px-4 py-2 rounded-lg font-semibold text-base md:text-lg">
                      {perfume.name}
                    </span>
                  </div>

                  {/* Mystical Mist Effect */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="w-full h-full bg-[url('/mist.jpg')] bg-contain bg-no-repeat opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Section Title */}
        <h2 className="mt-12 text-2xl md:text-3xl font-bold uppercase tracking-widest text-gray-800">
          SIGNATURE SCENTS
        </h2>
      </div>
    </section>
  );
};

export default Hero;