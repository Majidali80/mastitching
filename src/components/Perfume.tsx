"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { client } from "../sanity/lib/client";
import { allPerfumesQuery } from "../sanity/lib/queries";
import { Perfume } from "../app/utils/types";
import { FaRegHeart, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../app/context/cartContext";
import Image from "next/image";

const BestSelling = () => {
  const [products, setProducts] = useState<Perfume[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("wishlist");
      return storedWishlist ? new Set<string>(JSON.parse(storedWishlist)) : new Set<string>();
    }
    return new Set<string>();
  });

  const [notification, setNotification] = useState<string | null>(null);
  const [notificationType, setNotificationType] = useState<string>('');

  useEffect(() => {
    async function fetchProduct() {
      const fetchedProduct: Perfume[] = await client.fetch(allPerfumesQuery);
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

    setNotification('Item added to Wishlist');
    setNotificationType('wishlist');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddToCart = (perfume: Perfume) => {
    const productToAdd = {
      ...perfume,
      productImage: { asset: { url: perfume.image?.asset?.url } },
      image: perfume.image?.asset?.url,
      discountPercentage: perfume.discountPercentage || 0 // Default to 0 if undefined
    };
    
    addToCart(productToAdd);
    setNotification('Item added to Cart');
    setNotificationType('cart');
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
          const discountedPrice = getDiscountedPrice(
            product.price || 0, // Default to 0 if price is undefined
            product.discountPercentage || 0 // Default to 0 if discountPercentage is undefined
          );

          return (
            <div key={product._id} className="relative bg-white rounded shadow-lg p-6 cursor-pointer hover:shadow-2xl transition-shadow">
              <Link href={`/perfume/${product.slug.current}`}>
                <h2 className="text-lg font-bold mb-2">{product.title}</h2>

                {/* Product Image */}
                {product.image ? (
                  <div className="relative">
                    <Image
                      src={product.image?.asset?.url || "/placeholder.jpg"}
                      alt={product.title}
                      width={500}
                      height={500}
                      className="object-cover w-full h-full rounded-lg"
                    />
                    {/* Discount Badge */}
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold py-1 px-2 rounded-full">
                      {product.discountPercentage}% OFF
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No image available</p>
                )}

                {/* Price Section */}
                <p className="text-gray-900 font-bold mb-4">
                  <span className="line-through text-gray-500">PKR {product.price}</span>
                  <span className="ml-20 text-red-500 ">PKR {discountedPrice.toFixed(2)}</span>
                </p>

                {/* Rating and Reviews */}
                
                <div className="flex items-center text-sm text-yellow-500 ml-16">
                  <span>★★★★☆</span> <span className="ml-1 text-gray-500">{product.customerReviews ? product.reviews.length : 0} reviews</span>
                </div>
              </Link>

              {/* Add to Cart and Wishlist Buttons */}
              <div className="flex justify-between items-center space-x-4 mt-4">
                {/* Wishlist Button */}
                <button
                  onClick={() => handleWishlistToggle(product._id)}
                  className="bg-red-500 text-white p-3 rounded-full shadow-md hover:bg-red-600 focus:outline-none hover:scale-110 transition-transform"
                >
                  {wishlist.has(product._id) ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
                </button>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 focus:outline-none hover:scale-110 transition-transform"
                >
                  <FaShoppingCart size={24} />
                </button>
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
            </div>
          );
        })}
      </div>

      

      {/* Notification */}
      {notification && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md text-white ${notificationType === 'cart' ? 'bg-blue-500' : 'bg-red-500'}`}
        >
          {notification}
        </div>
      )}
    </div>
  );
};

export default BestSelling;
