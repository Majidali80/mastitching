"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Stitching } from "../types/stitching"; // Import Stitching interface
import client from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/client";
import { stitchedProductQuery } from '../sanity/lib/queries';
import Link from 'next/link';
import { useCart } from "../app/context/cartContext";
import { FaRegHeart, FaHeart, FaShoppingCart, FaStar, FaRegStar } from "react-icons/fa";

const StitchingPage = () => {
  const [stitchedProducts, setStitchedProducts] = useState<Stitching[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("wishlist");
      return storedWishlist ? new Set<string>(JSON.parse(storedWishlist)) : new Set<string>();
    }
    return new Set<string>();
  });
  const { cart, addToCart } = useCart();
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    async function fetchStitchedProducts() {
      const fetchedStitchedProducts: Stitching[] = await client.fetch(stitchedProductQuery);
      setStitchedProducts(fetchedStitchedProducts);
    }
    fetchStitchedProducts();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify([...wishlist]));
    }
  }, [wishlist]);

  // Handle Wishlist toggle
  const handleWishlistToggle = (productId: string) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = new Set(prevWishlist);
      if (updatedWishlist.has(productId)) {
        updatedWishlist.delete(productId);
      } else {
        updatedWishlist.add(productId);
      }
      return updatedWishlist;
    });
  };

  // Handle Add to Cart
  const handleAddToCart = (stitchedProduct: Stitching) => {
    addToCart({ ...stitchedProduct, selectedSize: 'default', quantity: 1 });
  };

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= rating ? (
            <FaStar className="text-yellow-400" />
          ) : (
            <FaRegStar className="text-yellow-400" />
          )}
        </span>
      ))}
    </div>
  );

  return (
    <div className="mb-[100px] mt-[100px] overflow-hidden">
      <div className="container px-5 mx-auto">
        <div className="text-center mb-10">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-orange-500 mb-4">
            Our Stitched Products
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Explore our custom stitching options, tailored to your preferences.
          </p>
          <div className="flex mt-2 justify-center">
            <div className="w-16 h-1 rounded-full bg-orange-500 inline-flex" />
          </div>
        </div>
      </div>

      {/* Displaying Stitched Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {stitchedProducts.map((stitchedProduct: Stitching) => (
          <div key={stitchedProduct._id} className="relative bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-2xl transition-all">
            <div className="absolute top-10 right-6 flex flex-col gap-2 z-10">
              {stitchedProduct.isBestSeller && (
                <span className="bg-orange-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
                  Best Seller
                </span>
              )}
            </div>

            <Link href={`/stitched-products/${stitchedProduct._id}`}> 
              {/* Product Image */}
              <div className="relative aspect-square mb-4">
                {stitchedProduct.stitchingImage ? (
                  <Image
                    src={urlFor(stitchedProduct.stitchingImage).url()}
                    alt={stitchedProduct.stitchType}
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}
              </div>

              {/* Product Title */}
              <h2 className="text-lg font-bold text-gray-800 truncate">{stitchedProduct.stitchType}</h2>

              {/* Price Section */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col">
                  <span className="line-through text-gray-500">PKR {stitchedProduct.price}</span>
                  <span className="text-red-500 font-bold">PKR {stitchedProduct.priceAdjustment}</span>
                </div>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center justify-between mb-4">
                <StarRating rating={stitchedProduct.rating || 0} />
                <span className="text-sm text-gray-600">({stitchedProduct.reviews ? stitchedProduct.reviews.length : 0} reviews)</span>
              </div>
            </Link>

            {/* Action Buttons */}
            <div className="flex justify-center items-center space-x-4 mt-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleWishlistToggle(stitchedProduct._id);
                }}
                className={`p-3 rounded-full shadow-md focus:outline-none transition-colors ${
                  wishlist.has(stitchedProduct._id)
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-orange-500 hover:text-white'
                }`}
                title={wishlist.has(stitchedProduct._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                {wishlist.has(stitchedProduct._id) ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart(stitchedProduct);
                }}
                className="p-3 rounded-full shadow-md focus:outline-none transition-colors bg-orange-500 text-white hover:bg-orange-600"
              >
                <FaShoppingCart size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Icon for Add to Cart */}
      {cart.length > 0 && (
        <Link href="/cart">
          <div className="fixed bottom-8 right-8 z-50 bg-orange-500 text-white rounded-full p-4 shadow-lg cursor-pointer">
            <FaShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {totalItemsInCart}
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default StitchingPage;
