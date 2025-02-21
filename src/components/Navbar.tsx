"use client";

import Link from "next/link";
import { FaHeart, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useCart } from "../app/context/cartContext";
import Image from "next/image";
import { useState } from "react";
import SearchBar from './SearchBar';

const Navbar = () => {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  const menuItems = {
    stitching: [
      { name: "Women's 2 Piece", href: "/products/stitching/women-2piece" },
      { name: "Girl's 2 Piece", href: "/products/stitching/girls-2piece" },
      { name: "Men's Shalwar Kameez", href: "/products/stitching/men-shalwar" },
      { name: "Kids Shalwar Kameez", href: "/products/stitching/kids-shalwar" },
    ],
    unstitched: [
      { name: "Lawn Collection", href: "/unstitched/lawn" },
      { name: "Cotton Collection", href: "/unstitched/cotton" },
      { name: "Winter Collection", href: "/unstitched/winter" },
    ],
    readyMade: [
      { name: "Women's Wear", href: "/ready-to-wear/women" },
      { name: "Men's Wear", href: "/ready-to-wear/men" },
      { name: "Kids Wear", href: "/ready-to-wear/kids" },
    ],
  };

  const handleDropdownToggle = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <nav className="bg-gradient-to-r from-orange-100 to-orange-300 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <div className="flex items-center w-1/3">
            <button 
              className="lg:hidden text-orange-800 hover:text-orange-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>

            <div className="hidden lg:flex space-x-8 pl-4">
              <Link 
                href="/" 
                className="text-orange-900 font-medium hover:text-orange-700 transition-colors text-sm uppercase tracking-wide"
              >
                Home
              </Link>
              
              {Object.entries(menuItems).map(([key, items]) => (
                <div key={key} className="relative group">
                  <button
                    className="text-orange-900 font-medium hover:text-orange-700 transition-colors text-sm uppercase tracking-wide flex items-center"
                    onClick={() => handleDropdownToggle(key)}
                  >
                    {key === 'readyMade' ? 'Ready Made' : key.charAt(0).toUpperCase() + key.slice(1)}
                    <FaChevronDown className="ml-1 w-3 h-3" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-orange-900 hover:bg-orange-100 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <Link 
                href="/about" 
                className="text-orange-900 font-medium hover:text-orange-700 transition-colors text-sm uppercase tracking-wide"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-orange-900 font-medium hover:text-orange-700 transition-colors text-sm uppercase tracking-wide"
              >
                Contact
              </Link>
            </div>
          </div>

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

        <div 
          className={`
            lg:hidden
            overflow-hidden
            transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'max-h-[500px]' : 'max-h-0'}
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
            
            {Object.entries(menuItems).map(([key, items]) => (
              <div key={key} className="space-y-2">
                <button
                  className="w-full text-orange-900 hover:text-orange-700 transition-colors text-center font-medium text-sm uppercase tracking-wide flex items-center justify-center"
                  onClick={() => handleDropdownToggle(key)}
                >
                  {key === 'readyMade' ? 'Ready Made' : key.charAt(0).toUpperCase() + key.slice(1)}
                  <FaChevronDown className={`ml-1 w-3 h-3 transition-transform ${activeDropdown === key ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === key && (
                  <div className="bg-orange-50 py-2">
                    {items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block py-2 text-sm text-orange-900 hover:bg-orange-100 transition-colors text-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link 
              href="/about" 
              className="text-orange-900 hover:text-orange-700 transition-colors text-center font-medium text-sm uppercase tracking-wide"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-orange-900 hover:text-orange-700 transition-colors text-center font-medium text-sm uppercase tracking-wide"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
