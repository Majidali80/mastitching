"use client";

import Link from "next/link";
import { FaHeart, FaShoppingCart } from "react-icons/fa"; // Removed FaRegHeart
import { useCart } from "../app/context/cartContext"; // Using CartContext for Cart functionality
import Image from "next/image";

const Navbar = () => {
  const { cart } = useCart(); // Using Cart context

  // Calculate total items in the cart
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-gradient-to-r from-yellow-100 to-orange-500 text-white p-2">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="flex items-center h-10">
          <Image 
            src="/logo.png" // Replace with the path to your logo image
            alt="Logo"
            className="h-20 w-28 mr-2" // Adjust the height of the logo as needed
            width={100}
            height={100}
          />
          <span className="text-2xl font-extrabold text-myBkack">MA Tailor</span>
        </Link>

        {/* Navigation Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link 
            href="/" 
            className="text-black font-semibold hover:text-gray-800 transition-colors"
          >
            HOME
          </Link>
          <Link 
            href="/stitching" 
            className="text-black font-semibold hover:text-gray-800 transition-colors"
          >
            STITCHING
          </Link>
          <Link 
            href="/Products" 
            className="text-black font-semibold hover:text-gray-800 transition-colors"
          >
            UNSTITCHED
          </Link>
          <Link 
            href="/ready-to-wear" 
            className="text-black font-semibold hover:text-gray-800 transition-colors"
          >
            READY TO WEAR
          </Link>
        </div>

        {/* Icons Section */}
        <div className="flex space-x-4 items-center">
          {/* Wishlist Icon */}
          <Link href="/wishlist">
            <button className="relative text-red-500 hover:text-red-600" aria-label="Wishlist">
              {/* Placeholder icon, adjust according to your design */}
              <FaHeart size={32} />
            </button>
          </Link>
  
          {/* Cart Icon */}
          <Link href="/cart">
            <button className="relative text-blue-500 hover:text-blue-600" aria-label="Cart">
              <FaShoppingCart size={32} />
              {totalItemsInCart > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItemsInCart}
                </span>
              )}
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu - Shows below navbar on small screens */}
      <div className="md:hidden flex justify-center space-x-4 mt-2 pb-2">
        <Link 
          href="/" 
          className="text-black font-semibold hover:text-gray-800 transition-colors"
        >
          HOME
        </Link>
        <Link 
          href="/stitching" 
          className="text-black font-semibold hover:text-gray-800 transition-colors"
        >
          STITCHING
        </Link>
        <Link 
          href="/unstitched" 
          className="text-black font-semibold hover:text-gray-800 transition-colors"
        >
          UNSTITCHED
        </Link>
        <Link 
          href="/ready-to-wear" 
          className="text-black font-semibold hover:text-gray-800 transition-colors"
        >
          READY TO WEAR
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
