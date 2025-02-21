import React from 'react'
import { Button } from "@/components/ui/button";
import { HiMiniShoppingBag } from "react-icons/hi2";
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="mb-[100px]">
      <div
  className="hero min-h-[80vh] custom-img bg-fixed bg-center bg-no-repeat">
  <div className="hero-overlay bg-opacity-70"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl scroll-m-20 font-extrabold tracking-tight lg:text-5xl text-myYellow"><span className="text-white lg:text-7xl">MA </span>STITCHING </h1> <h2 className=" text-2xl text-yellow-300">Online Boutique</h2>
      <p className="mb-5 text-myOrange font-bold scroll-m-40 text-xl tracking-tight mt-5">
      Online Tailoring Boutique – Premium Stitching Services for Every Occasion!
      </p>
      <Button className="outline outline-offset-2 outline-1 group hover:rounded-3xl duration-300 hover:outline-myYellow">
      <HiMiniShoppingBag className="mr-2 group-hover:animate-bounce"/>{" "} SHOP NOW
    </Button>
    </div>
    <div className="lg:w-1/2 flex justify-center items-center">
  <Image 
    src="/hero.png"  // Replace with your image path
    alt="Marketplace"
    className="w-[400px] sm:w-[700px] md:w-[600px] h-full object-cover object-center rounded-lg"
    width={1000}
    height={1000}
  />
</div>

  </div>
</div>
    </div>
  )
}

export default Hero
