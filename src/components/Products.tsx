"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import sanityClient, { client, urlFor } from "../sanity/lib/client";
import { allProductsQuery } from "../sanity/lib/queries";
import { Product } from "../app/utils/types";
import { FaRegHeart, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../app/context/cartContext";

const BestSelling = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("wishlist");
      return storedWishlist ? new Set<string>(JSON.parse(storedWishlist)) : new Set<string>();
    }
    return new Set<string>();
  });

  const [notification, setNotification] = useState<string | null>(null); // For notifications
  const [notificationType, setNotificationType] = useState<string>(''); // For notification type (cart/wishlist)

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

  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

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

    // Show notification for wishlist action
    setNotification('Item added to Wishlist');
    setNotificationType('wishlist');
    setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);

    // Show notification for cart action
    setNotification('Item added to Cart');
    setNotificationType('cart');
    setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
  };

  // Calculate discounted price (assuming a 10% discount for the example)
  const getDiscountedPrice = (price: number) => price * 0.9; // 10% discount
  const getDiscountPercentage = (price: number, discountedPrice: number) => {
    return Math.round(((price - discountedPrice) / price) * 100); // Calculate the percentage of discount
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
          const discountedPrice = getDiscountedPrice(product.price);
          const discountPercentage = getDiscountPercentage(product.price, discountedPrice);

          return (
            <div key={product._id} className="relative bg-white rounded shadow-lg p-4 cursor-pointer hover:shadow-2xl transition-shadow">
              <Link href={`/products/${product.slug.current}`}>
                <h2 className="text-lg font-bold mb-2">{product.title}</h2>
                {product.image ? (
                  <div className="relative">
                    <img
                      src={urlFor(product.image).url()}
                      alt={product.title}
                      className="w-full h-48 object-cover mb-2"
                    />
                    {/* Discount Badge */}
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold py-1 px-2 rounded-full">
                      {discountPercentage}% OFF
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No image available</p>
                )}

                {/* Display original and discounted prices */}
                <p className="text-gray-900 font-bold mb-4">
                  <span className="line-through text-gray-500">PKR {product.price}</span>
                  <span className="ml-2 text-red-500">PKR {discountedPrice.toFixed(2)}</span>
                </p>
              </Link>

              {/* Buttons Section - Add to Wishlist & Add to Cart */}
              <div className="flex justify-between items-center space-x-4">
                {/* Wishlist Button */}
                <button
                  onClick={() => handleWishlistToggle(product._id)}
                  className="bg-red-500 text-white p-3 rounded-full shadow-md hover:bg-red-600 focus:outline-none"
                >
                  {wishlist.has(product._id) ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
                </button>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 focus:outline-none"
                >
                  <FaShoppingCart size={24} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

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
