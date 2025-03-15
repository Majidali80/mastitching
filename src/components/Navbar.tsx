"use client";

import Link from "next/link";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Wishlist icons
import { AiOutlineShoppingCart, AiFillShopping } from "react-icons/ai"; // Cart icons
import { useCart } from "../app/context/cartContext"; // Cart context

const Navbar = () => {
  const { cart } = useCart(); // Using Cart context
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle
  const [isWishlistActive, setIsWishlistActive] = useState(false); // Simulated wishlist state

  // Calculate total items in the cart
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  // Toggle wishlist state (for demo purposes)
  const toggleWishlist = () => setIsWishlistActive(!isWishlistActive);

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 shadow-lg">
      {/* Mobile Menu Button */}
      <div className="lg:hidden flex justify-between items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <Link href="/" className="text-xl font-extrabold text-center flex-grow">
          Mystic Essence
        </Link>
      </div>

      {/* Logo and Menu */}
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl md:text-3xl font-extrabold text-white hidden lg:block">
          Mystic Essence
        </Link>
        <Link href="/" className="text-2xl md:text-3xl font-extrabold text-white block lg:hidden mx-auto">
          Mystic Essence
        </Link>

        {/* Navigation Menu */}
        <div className="hidden lg:flex space-x-6 items-center">
          <Link href="/" className="hover:text-gold-300 transition-colors">
            Home
          </Link>
          <Link href="/shop" className="hover:text-gold-300 transition-colors">
            Shop
          </Link>
          <Link href="/about" className="hover:text-gold-300 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-gold-300 transition-colors">
            Contact
          </Link>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-gray-800 z-50 p-4 shadow-md">
            <Link href="/" className="block py-2 hover:text-gold-300 transition-colors">
              Home
            </Link>
            <Link href="/shop" className="block py-2 hover:text-gold-300 transition-colors">
              Shop
            </Link>
            <Link href="/about" className="block py-2 hover:text-gold-300 transition-colors">
              About
            </Link>
            <Link href="/contact" className="block py-2 hover:text-gold-300 transition-colors">
              Contact
            </Link>
          </div>
        )}

        {/* Icons */}
        <div className="flex space-x-6 items-center">
          {/* Wishlist Icon */}
          <Link href="/wishlist">
            <button
              onClick={toggleWishlist}
              className="relative text-red-300 hover:text-red-500 transition-colors"
              aria-label="Wishlist"
            >
              {isWishlistActive ? <FaHeart size={28} /> : <FaRegHeart size={28} />}
            </button>
          </Link>

          {/* Cart Icon */}
          <Link href="/cart">
            <button className="relative text-blue-300 hover:text-blue-500 transition-colors" aria-label="Cart">
              {totalItemsInCart > 0 ? <AiFillShopping size={28} /> : <AiOutlineShoppingCart size={28} />}
              {totalItemsInCart > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItemsInCart}
                </span>
              )}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;