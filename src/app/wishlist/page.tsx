// src/app/wishlist/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { useCart } from "../context/cartContext";
import sanityClient, { urlFor } from "../../sanity/lib/client";
import { Product } from "../utils/types";

const Wishlist = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(() => {
    // Retrieve wishlist from local storage if available
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("wishlist");
      return storedWishlist ? new Set<string>(JSON.parse(storedWishlist)) : new Set<string>();
    }
    return new Set<string>();
  });

  // Cart context
  const { addToCart } = useCart();

  // Fetch all products
  useEffect(() => {
    async function fetchProducts() {
      const products = await sanityClient.fetch('*[_type == "product"]{ _id, title, description, price, image, slug, productImage }');
      setProducts(products);
    }
    fetchProducts();
  }, []);

  // Handle wishlist item removal
  const handleRemoveFromWishlist = (productId: string) => {
    const updatedWishlist = new Set(wishlist);
    updatedWishlist.delete(productId);
    setWishlist(updatedWishlist);

    // Save to local storage
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify([...updatedWishlist]));
    }
  };

  return (
    <div className="mb-[100px] mt-[100px] overflow-hidden">
      <div className="container px-5 mx-auto">
        <div className="text-center mb-10">
          <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl text-myBlue">
            MY WISHLIST
          </h1>
          <div className="flex mt-2 justify-center">
            <div className="w-16 h-1 rounded-full bg-myOrange inline-flex" />
          </div>
        </div>
      </div>

      {wishlist.size === 0 ? (
        <div className="text-center">
          <p>Your wishlist is empty. Start adding items to your wishlist!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products
            .filter((product) => wishlist.has(product._id)) // Only display products in the wishlist
            .map((product) => (
              <div key={product._id} className="relative bg-white rounded shadow p-4 cursor-pointer">
                <Link href={`/products/${product.slug.current}`}>
                  {product.image ? (
                    <Image
                      src={urlFor(product.image).url()}
                      alt={product.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover mb-2"
                    />
                  ) : (
                    <p className="text-gray-500">No image available</p>
                  )}
                  <h2 className="text-lg font-bold">{product.title}</h2>
                  <p className="text-gray-700">{product.description?.substring(0, 100)}...</p>
                  <p className="text-gray-900 font-bold">PKR {product.price}</p>
                </Link>

                {/* Remove from Wishlist Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(product._id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-600 transition duration-300"
                >
                  <FaHeart size={24} />
                </button>

                {/* Add to Cart Button */}
                <button
                  onClick={() =>
                    addToCart({
                      ...product,
                      productImage: product.productImage || "default-image.jpg", // Add fallback for missing productImage
                    })
                  }
                  className="absolute bottom-2 right-2 text-blue-500 hover:text-blue-600 transition duration-300"
                >
                  <FaShoppingCart size={24} />
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
