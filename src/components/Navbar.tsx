"use client";

import Link from "next/link";
import { FaHeart, FaShoppingCart } from "react-icons/fa"; // Removed FaRegHeart
import { useCart } from "../app/context/cartContext"; // Using CartContext for Cart functionality

const Navbar = () => {
  const { cart } = useCart(); // Using Cart context

  // Calculate total items in the cart
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-yellow-500 text-white p-4 flex justify-between items-center">
      {/* Logo or Brand Name */}
      <Link href="/" className="text-2xl font-extrabold">
        <span className="text-white">Shop</span>
      </Link>

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
              <span className="absolute top-0 right-0 bg-black-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItemsInCart}
              </span>
            )}
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
