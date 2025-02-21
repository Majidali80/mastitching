import React from 'react'
import { Button } from "@/components/ui/button";
import { HiMiniShoppingBag } from "react-icons/hi2";

const Hero = () => {
  return (
    <div className="mb-20">
      <div className="hero min-h-[90vh] custom-img bg-fixed bg-center bg-no-repeat mt-5">
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content flex items-center justify-center min-h-full">
          <div className="text-center max-w-md">
            <h1 className=" text-fixed  mt-72 mb-5 text-5xl scroll-m-20 font-extrabold tracking-tight lg:text-5xl text-yellow-400">
              ASLAM O ALIKUM
            </h1>
            <p className="mt-5 mb-8 text-orange-500 font-bold scroll-m-40 text-xl tracking-tight text-center">
              Your Instant Marketplace! Where Deliver At Your Door Step.
            </p>
            <Button className="outline outline-offset-2 outline-1 group hover:rounded-3xl duration-300 hover:outline-yellow-400 w-fit">
              <HiMiniShoppingBag className="text-myYellow mr-2 group-hover:animate-bounce"/> SHOP NOW
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;
