"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { client, urlFor } from "../sanity/lib/client";
import { allProductsQuery } from "../sanity/lib/queries";
import { Product } from "../app/utils/types"; // Verify this path
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsCartPlus, BsCartPlusFill } from "react-icons/bs";
import { useCart } from "../app/context/cartContext"; // Verify this path
import Image from "next/image";

const BestSelling = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("wishlist");
      return storedWishlist ? new Set<string>(JSON.parse(storedWishlist)) : new Set<string>();
    }
    return new Set<string>();
  });

  const [notification, setNotification] = useState<{ message: string; type: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const fetchedProduct: Product[] = await client.fetch(allProductsQuery);
        if (!Array.isArray(fetchedProduct)) {
          throw new Error("Fetched data is not an array");
        }
        setProducts(fetchedProduct);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      }
    }
    fetchProduct();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify([...wishlist]));
    }
  }, [wishlist]);

  const cartContext = useCart();
  if (!cartContext) {
    console.error("useCart is undefined. Ensure CartProvider is wrapped around the app in layout.tsx.");
    setError("Cart context is not available. Please check the setup.");
    return <div className="text-center text-red-500">{error}</div>;
  }
  const { cart, addToCart } = cartContext;

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  const handleWishlistToggle = (productId: string) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = new Set(prevWishlist);
      if (updatedWishlist.has(productId)) {
        updatedWishlist.delete(productId);
        setNotification({ message: "Item removed from Wishlist", type: "wishlist" });
      } else {
        updatedWishlist.add(productId);
        setNotification({ message: "Item added to Wishlist", type: "wishlist" });
      }
      setTimeout(() => setNotification(null), 3000);
      return updatedWishlist;
    });
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setNotification({ message: "Item added to Cart", type: "cart" });
    setTimeout(() => setNotification(null), 3000);
  };

  const getDiscountedPrice = (price: number, discountPercentage?: number) => {
    return discountPercentage ? price - (price * (discountPercentage / 100)) : price;
  };

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="mb-[100px] mt-[100px] overflow-hidden">
      <div className="container px-5 mx-auto">
        <div className="text-center mb-10">
          <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl text-gold-500">
            BEST PERFUMES FOR YOUR DAILY USE
          </h1>
          <div className="flex mt-2 justify-center">
            <div className="w-16 h-1 rounded-full bg-gold-500 inline-flex" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage);

          return (
            <div
              key={product._id}
              className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg p-6 cursor-pointer group hover:shadow-2xl transition-shadow duration-300"
            >
              <Link href={`/products/${product.slug.current}`}>
                <h2 className="text-lg font-serif text-white mb-4">{product.title}</h2>

                {/* Product Image */}
                {product.image ? (
                  <div className="relative">
                    <Image
                      src={urlFor(product.image).url()}
                      alt={product.title}
                      width={350}
                      height={300}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    {/* Discount Badge */}
                    {product.discountPercentage && (
                      <div className="absolute top-2 left-2 bg-red-700 text-white text-xs font-semibold py-1 px-2 rounded-full">
                        {product.discountPercentage}% OFF
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400">No image available</p>
                )}

                {/* Price Section */}
                <p className="text-white font-bold mb-4">
                  {product.discountPercentage ? (
                    <>
                      <span className="line-through text-gray-400">PKR {product.price}</span>
                      <span className="ml-2 text-gold-500">PKR {discountedPrice.toFixed(2)}</span>
                    </>
                  ) : (
                    <span>PKR {product.price}</span>
                  )}
                </p>

                {/* Availability */}
                <div className="text-sm text-green-400 mb-4">{product.availability}</div>
              </Link>

              {/* Hover Icons (Wishlist and Add to Cart) */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 opacity-0 group-hover:opacity-100">
                <div className="flex space-x-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleWishlistToggle(product._id);
                    }}
                    className="bg-red-700 text-white p-3 rounded-full shadow-md hover:bg-red-800 focus:outline-none transition-transform hover:scale-110"
                  >
                    {wishlist.has(product._id) ? <AiFillHeart size={28} /> : <AiOutlineHeart size={28} />}
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                    className="bg-gold-500 text-white p-3 rounded-full shadow-md hover:bg-gold-600 focus:outline-none transition-transform hover:scale-110"
                  >
                    {totalItemsInCart > 0 ? <BsCartPlusFill size={28} /> : <BsCartPlus size={28} />}
                  </button>
                </div>
              </div>

              {/* Product Tag (Best Seller) */}
              {product.bestSeller && (
                <div className="absolute top-2 left-5 bg-gold-500 text-gray-900 text-xs font-semibold py-1 px-2 rounded-full">
                  Best Seller
                </div>
              )}
            </div>
          );
        })}
      </div>



{/* Cart Icon */}
<Link href="/cart">
  <button className="fixed bottom-6 right-6 bg-yellow-400 text-black rounded-full p-4 shadow-lg hover:bg-gold-600 transition duration-300 z-50">
    {totalItemsInCart > 0 ? <BsCartPlusFill size={24} /> : <BsCartPlus size={24} />}
    {totalItemsInCart > 0 && (
      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {totalItemsInCart}
      </span>
    )}
  </button>
</Link>

      {/* Notification */}
      {notification && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md text-white ${
            notification.type === "cart" ? "bg-gold-500" : "bg-red-700"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default BestSelling;