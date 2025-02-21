"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { client, urlFor } from "../sanity/lib/client";
import { allProductsQuery } from "../sanity/lib/queries";
import { Product } from "../app/utils/types";
import { FaRegHeart, FaHeart, FaShoppingCart, FaTimes } from "react-icons/fa";
import { useCart } from "../app/context/cartContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const BestSelling = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("wishlist");
      return storedWishlist ? new Set<string>(JSON.parse(storedWishlist)) : new Set<string>();
    }
    return new Set<string>();
  });

  const [notification, setNotification] = useState<{
    message: string;
    type: string;
    action?: string;
  } | null>(null);

  const [notificationType, setNotificationType] = useState<string>('');

  useEffect(() => {
    async function fetchProduct() {
      const fetchedProduct: Product[] = await client.fetch(allProductsQuery);
      setProducts(fetchedProduct);
    }
    fetchProduct();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify([...wishlist]));
    }
  }, [wishlist]);

  const { cart, addToCart } = useCart();
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  const handleWishlistToggle = (productId: string, productName: string) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = new Set(prevWishlist);
      if (updatedWishlist.has(productId)) {
        updatedWishlist.delete(productId);
        setNotification({
          message: `${productName} removed from wishlist`,
          type: 'wishlist',
          action: 'remove'
        });
      } else {
        updatedWishlist.add(productId);
        setNotification({
          message: `${productName} added to wishlist`,
          type: 'wishlist',
          action: 'add'
        });
      }
      return updatedWishlist;
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setNotification({
      message: `${product.productName} added to cart`,
      type: 'cart',
      action: 'view'
    });
    setTimeout(() => setNotification(null), 3000);
  };

  // Function to get the discounted price
  const getDiscountedPrice = (price: number, discountPercentage: number) => {
    return price - (price * (discountPercentage / 100)); // Apply discount
  };

  return (
    <div className="mb-[100px] mt-[100px] overflow-hidden">
      <div className="container px-5 mx-auto">
        <div className="text-center mb-10">
          <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl text-myBlue">
            BEST SELLING PRODUCTS
          </h1>
          <div className="flex mt-2 justify-center">
            <div className="w-16 h-1 rounded-full bg-myOrange inline-flex" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => {
          const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage);

          return (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-2xl transition-all"
            >
              <Link href={`/products/${product.slug.current}`}>
                {/* Product Title with ellipsis */}
                <h2 className="text-lg font-bold mb-2 truncate hover:text-clip hover:whitespace-normal">
                  {product.productName}
                </h2>

                {/* Product Image */}
                {product.image ? (
                  <div className="relative">
                    <Image
                      src={urlFor(product.image).url()}
                      alt={product.title}
                      width={350}
                      height={300}
                      className="w-full h-48 object-cover mb-2 hover"
                    />
                    {/* Discount Badge */}
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold py-1 px-2 rounded-full">
                      {product.discountPercentage}% OFF
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No image available</p>
                )}

                {/* Enhanced Price Section */}
                <div className="flex justify-between items-center mb-4">
                  <span className="line-through text-gray-500">PKR {product.price}</span>
                  <span className="text-red-500 font-bold">PKR {discountedPrice.toFixed(2)}</span>
                </div>

                {/* Rating and Reviews */}
                
                <div className="flex items-center text-sm text-yellow-500 ml-16">
                  <span>★★★★☆</span> <span className="ml-1 text-gray-500">{product.reviews ? product.reviews.length : 0} reviews</span>
                </div>
              </Link>

              {/* Enhanced Action Buttons */}
              <div className="flex justify-between items-center space-x-4 mt-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleWishlistToggle(product._id, product.productName)}
                  className={`p-3 rounded-full shadow-md focus:outline-none transition-colors ${
                    wishlist.has(product._id)
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  {wishlist.has(product._id) ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 focus:outline-none"
                >
                  <FaShoppingCart size={24} />
                </motion.button>
              </div>

              {/* Product Tag (e.g. New, Best Seller) */}
              <div className="absolute top-2 left-5 bg-yellow-500 text-black text-xs font-semibold py-1 px-2 rounded-full">
                Best Seller
              </div>
              <div className="absolute top-10 right-8 bg-blue-500 text-black text-xs font-semibold py-1 px-2 rounded-full">
                Small
              </div>

              {/* Availability */}
              <div className="text-sm text-green-500 ml-28">In Stock</div>
            </motion.div>
          );
        })}
      </div>

      {/* Enhanced Mobile Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 z-50 md:w-96 md:left-1/2 md:-translate-x-1/2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-2 rounded-full ${
                  notification.type === 'cart' ? 'bg-blue-100 text-blue-500' : 'bg-red-100 text-red-500'
                }`}>
                  {notification.type === 'cart' ? <FaShoppingCart /> : <FaHeart />}
                </div>
                <span className="ml-3 text-gray-800">{notification.message}</span>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            {notification.action && (
              <Link href={notification.type === 'cart' ? '/cart' : '/wishlist'}>
                <div className="mt-2 text-center py-2 bg-gray-50 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">
                  {notification.type === 'cart' ? 'View Cart' : 'View Wishlist'}
                </div>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Icon */}
      <Link href="/cart">
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition duration-300"
        >
          <FaShoppingCart size={24} />
          {totalItemsInCart > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItemsInCart}
            </span>
          )}
        </button>
      </Link>
    </div>
  );
};

export default BestSelling;
