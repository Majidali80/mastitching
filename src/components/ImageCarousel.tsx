'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { HiMiniShoppingBag } from "react-icons/hi2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';

const Slider = dynamic(() => import('react-slick'), {
  ssr: false
});

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    pauseOnHover: false,
    arrows: false
  };

  return (
    <div className="w-[85vw] sm:w-[90vw] md:w-[92vw] lg:w-[95vw] h-[200px] sm:h-[350px] md:h-[450px] lg:h-[600px] relative overflow-hidden rounded-lg">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative h-[200px] sm:h-[350px] md:h-[450px] lg:h-[600px]">
            {/* Image */}
            <Image 
              src={image}
              width={1200}
              height={1000}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
            
            {/* Content overlay */}
            <div className="absolute inset-0">
              {/* Text container - positioned at top */}
              <div className="absolute top-[20%] left-0 right-0 text-center space-y-2 sm:space-y-4">
                <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-yellow-400">
                  ASLAM O ALIKUM
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-orange-500 font-bold px-4">
                  Your Instant Marketplace! Where Deliver At Your Door Step.
                </p>
              </div>
              
              {/* Button container - positioned at bottom */}
              <div className="absolute bottom-[20%] left-0 right-0 flex justify-center">
                <Button 
                  className="outline outline-offset-2 outline-1 group hover:rounded-3xl duration-300 
                           hover:outline-yellow-400 w-fit bg-myDgold/50 hover:bg-myLgold"
                >
                  <HiMiniShoppingBag className="mr-2 group-hover:animate-bounce"/> 
                  <span className="text-sm sm:text-base">SHOP NOW</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel; 