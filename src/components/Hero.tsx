import React from 'react'
import { Button } from "@/components/ui/button";
import { HiMiniShoppingBag } from "react-icons/hi2";

const Hero = () => {
  return (
    <div className="mb-[100px]">
      <div
  className="hero min-h-[80vh] custom-img bg-fixed bg-center bg-no-repeat">
  <div className="hero-overlay bg-opacity-70"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl scroll-m-20 font-extrabold tracking-tight lg:text-5xl text-myYellow">ASLAM O ALIKUM</h1>
      <p className="mb-5 text-myOrange font-bold scroll-m-40 text-xl tracking-tight">
      Your Instant Marketplace! Where Deliver At Your Door Step.
      </p>
      <Button className="outline outline-offset-2 outline-1 group hover:rounded-3xl duration-300 hover:outline-myYellow">
      <HiMiniShoppingBag className="mr-2 group-hover:animate-bounce"/>{" "} SHOP NOW
    </Button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Hero
