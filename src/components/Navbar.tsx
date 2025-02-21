"use client";

import Link from "next/link";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useCart } from "../app/context/cartContext";
import Image from "next/image";
import { useState } from "react";
import SearchBar from './SearchBar';

const Navbar = () => {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-gradient-to-r from-orange-100 to-orange-300 shadow-md">
      <div className="container mx-auto px-4">
        {/* Main Navbar Content */}
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Left Section - Hamburger/Menu */}
          <div className="flex items-center w-1/3">
            {/* Hamburger for Mobile */}
            <button 
              className="lg:hidden text-orange-800 hover:text-orange-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8 pl-4">
              <Link 
                href="/" 
                className="text-orange-900 font-medium hover:text-orange-700 transition-colors text-sm uppercase tracking-wide"
              >
                Home
              </Link>
              <Link 
                href="/products/stitching" 
                className="text-orange-900 font-medium hover:text-orange-700 transition-colors text-sm uppercase tracking-wide"
              >
                Stitching
              </Link>
              <Link 
                href="/unstitched" 
                className="text-orange-900 font-medium hover:text-orange-700 transition-colors text-sm uppercase tracking-wide"
              >
                Unstitched
              </Link>
              <Link 
                href="/ready-to-wear" 
                className="text-orange-900 font-medium hover:text-orange-700 transition-colors text-sm uppercase tracking-wide"
              >
                Ready Made
              </Link>
            </div>
          </div>

          {/* Center Section - Logo */}
          <div className="flex-1 flex justify-center items-center">
            <Link href="/" className="flex flex-col items-center">
              <Image 
                src="/logo.png"
                alt="MA Tailor Logo"
                className="h-12 w-16 sm:h-14 sm:w-20 lg:h-16 lg:w-24 object-contain"
                width={96}
                height={64}
                priority
              />
              <span className="text-orange-950 font-bold text-sm sm:text-base lg:text-lg mt-1">
                MA Tailor
              </span>
            </Link>
          </div>

          {/* Right Section - Icons */}
          <div className="flex justify-end items-center w-1/3 space-x-4 sm:space-x-6">
            <SearchBar />
            <Link href="/wishlist">
              <button 
                className="relative text-orange-700 hover:text-orange-500 transition-colors p-2"
                aria-label="Wishlist"
              >
                <FaHeart className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </Link>

            <Link href="/cart">
              <button 
                className="relative text-orange-700 hover:text-orange-500 transition-colors p-2"
                aria-label="Cart"
              >
                <FaShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                {totalItemsInCart > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItemsInCart}
                  </span>
                )}
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`
            lg:hidden
            overflow-hidden
            transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'max-h-64' : 'max-h-0'}
          `}
        >
          <div className="flex flex-col space-y-4 py-4">
            <Link 
              href="/" 
              className="text-orange-900 hover:text-orange-700 transition-colors text-center font-medium text-sm uppercase tracking-wide"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/products/stitching" 
              className="text-orange-900 hover:text-orange-700 transition-colors text-center font-medium text-sm uppercase tracking-wide"
              onClick={() => setIsMenuOpen(false)}
            >
              Stitching
            </Link>
            <Link 
              href="/unstitched" 
              className="text-orange-900 hover:text-orange-700 transition-colors text-center font-medium text-sm uppercase tracking-wide"
              onClick={() => setIsMenuOpen(false)}
            >
              Unstitched
            </Link>
            <Link 
              href="/ready-to-wear" 
              className="text-orange-900 hover:text-orange-700 transition-colors text-center font-medium text-sm uppercase tracking-wide"
              onClick={() => setIsMenuOpen(false)}
            >
              Ready Made
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
