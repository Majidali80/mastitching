"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { useCart } from "@/app/context/cartContext";
import sanityClient, { urlFor } from "@/sanity/lib/client";
import { Product } from "@/types/product";
import { motion, AnimatePresence } from 'framer-motion';
import Swal from "sweetalert2";

export default function Wishlist() {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("wishlist");
      return storedWishlist ? new Set<string>(JSON.parse(storedWishlist)) : new Set<string>();
    }
    return new Set<string>();
  });

  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await sanityClient.fetch('*[_type == "product"]{ _id, title, description, price, images, slug }');
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  const handleRemoveFromWishlist = (productId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedWishlist = new Set(wishlist);
        updatedWishlist.delete(productId);
        setWishlist(updatedWishlist);

        if (typeof window !== "undefined") {
          localStorage.setItem("wishlist", JSON.stringify([...updatedWishlist]));
        }
      }
    });
  };

  // Fallback image object
  const defaultImage = {
    asset: {
      url: "/default-image.jpg", // Path to your default image
    },
  };

  const handleAddToCart = (product: Product) => {
    const formattedProductImage = product.images.length > 0
      ? { asset: { url: urlFor(product.images[0].asset).url() } } // Use the first image in the images array
      : defaultImage; // Fallback to default image

    addToCart({
      ...product,
      productImage: formattedProductImage.asset.url, // Ensure this property exists in the Product interface
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            My Wishlist
          </h1>
          <div className="flex justify-center">
            <div className="w-16 h-1 rounded-full bg-orange-500" />
          </div>
        </div>

        {wishlist.size === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 mb-6">Your wishlist is empty. Start adding items you love!</p>
            <Link 
              href="/products"
              className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Explore Products
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {products
                .filter((product) => wishlist.has(product._id))
                .map((product) => (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <Link href={`/products/${product.slug.current}`}>
                      <div className="relative h-64">
                        {product.images.length > 0 ? (
                          <Image
                            src={urlFor(product.images[0].asset).url()}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <p className="text-gray-500">No image available</p>
                          </div>
                        )}
                      </div>
                    </Link>

                    <div className="p-4">
                      <Link href={`/products/${product.slug.current}`}>
                        <h2 className="text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors">
                          {product.title}
                        </h2>
                      </Link>
                      
                      <p className="text-gray-600 mt-2 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <p className="text-orange-600 font-bold mt-2">
                        PKR {product.price.toLocaleString()}
                      </p>

                      <div className="flex justify-between items-center mt-4">
                        <button
                          onClick={() => {
                            handleAddToCart(product);
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          <FaShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>

                        <button
                          onClick={() => handleRemoveFromWishlist(product._id)}
                          className="p-2 text-red-500 hover:text-red-600 transition-colors"
                          aria-label="Remove from wishlist"
                        >
                          <FaHeart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
