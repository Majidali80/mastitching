  "use client";

  import { useEffect, useState } from "react";
  import Link from "next/link";
  import client from "../sanity/lib/client";  
  import { urlFor } from "../sanity/lib/client";
  import { productQuery } from "../sanity/lib/queries"; // Import only the productQuery
  import { Product } from "../types/product";
  import { FaRegHeart, FaHeart, FaShoppingCart, FaStar, FaRegStar } from "react-icons/fa";
  import { useCart } from "../app/context/cartContext";
  import Image from "next/image";
  import React from 'react';


  const BestSelling = () => {
    const [products, setProducts] = useState<Product[]>([]); // Standard products state
    const [wishlist, setWishlist] = useState<Set<string>>(() => {
      if (typeof window !== "undefined") {
        const storedWishlist = localStorage.getItem("wishlist");
        return storedWishlist ? new Set<string>(JSON.parse(storedWishlist)) : new Set<string>();
      }
      return new Set<string>();
    });

    const { cart, addToCart } = useCart();
    const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);
    
    // State for popup visibility
    const [showPopup, setShowPopup] = useState(false);

    // Fetching standard products
    useEffect(() => {
      async function fetchProduct() {
        const fetchedProduct: Product[] = await client.fetch(productQuery);
        setProducts(fetchedProduct);
      }
      fetchProduct();
    }, []);

    // Saving wishlist to localStorage
    useEffect(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify([...wishlist]));
      }
    }, [wishlist]);

    // Handling wishlist toggles
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

    // Handling Add to Cart
    const handleAddToCart = (product: Product) => {
      if (product.stockQuantity > 0) { // Only add to cart if in stock
        addToCart({ ...product, selectedSize: 'default', quantity: 1 });
        setShowPopup(true); // Show the popup when an item is added
      }
    };

    // Discount Calculation
    const getDiscountedPrice = (price: number, discountPercentage: number) => {
      return price - (price * (discountPercentage / 100)); // Apply discount
    };

    // Star Rating
    const StarRating = ({ rating }: { rating: number }) => {
      return (
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
    };

    if (!products) return <div>Loading...</div>;

    return (
      <div className="mb-[100px] mt-[100px] overflow-hidden">
        <div className="container px-5 mx-auto">
          <div className="text-center mb-10">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-orange-500 mb-4">
              Our Best Selling Products
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Discover our most popular and highly-rated items
            </p>
            <div className="flex mt-2 justify-center">
              <div className="w-16 h-1 rounded-full bg-orange-500 inline-flex" />
            </div>
          </div>
        </div>

        {/* Displaying standard products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {products.map((product: Product) => {
            const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage);
            const inStock = product.stockQuantity > 0; // Check if the product is in stock
            const averageRating = product.reviews && product.reviews.length > 0 
              ? product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length 
              : 0;

            return (
              <div
                key={product._id}
                className="relative bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-2xl transition-all"
              >
                <div className="absolute top-72 left-4 flex flex-col gap-2 z-10">
                  {product.isNewArrival && (
                    <span className="bg-orange-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
                      New Arrival
                    </span>
                  )}
                </div>
                <div className="absolute top-10 right-6 flex flex-col gap-2 z-10">
                  {product.isBestSeller && (
                    <span className="bg-orange-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
                      Best Seller
                    </span>
                  )}
                </div>

                <Link href={`/products/${product.slug.current}`}>
                  {/* Product Image */}
                  <div className="relative aspect-square mb-4">
                    {product.images.length > 0 ? (
                      <Image
                        src={urlFor(product.images[0]).url()}
                        alt={`${product.productName} - Product image`}
                        fill
                        className="object-cover rounded-lg"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">No image available</p>
                      </div>
                    )}
                    {/* Discount Badge */}
                    {product.discountPercentage > 0 && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold py-1 px-2 rounded-full">
                        {product.discountPercentage}% OFF
                      </div>
                    )}
                  </div>

                  {/* Product Title */}
                  <div className="group min-h-[3rem] mb-4">
                    <h2 className="text-lg font-bold text-gray-800 truncate group-hover:text-clip group-hover:whitespace-normal group-hover:text-myBlue transition-colors">
                      {product.productName}
                    </h2>
                  </div>

                  {/* Price Section */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col">
                      <span className="line-through text-gray-500">PKR {product.price}</span>
                      <span className="text-red-500 font-bold">PKR {discountedPrice.toFixed(2)}</span>
                    </div>
                    {/* Stock Status */}
                    <div className={`text-sm font-semibold ${inStock ? 'text-orange-500' : 'text-red-500'}`}>
                      {inStock ? `${product.stockQuantity} in Stock` : 'Out of Stock'}
                    </div>
                  </div>

                  {/* Rating and Reviews */}
                  <div className="flex items-center justify-between mb-4">
                    <StarRating rating={averageRating} />
                    <span className="text-sm text-gray-600">
                      ({product.reviews ? product.reviews.length : 0} reviews)
                    </span>
                  </div>
                </Link>

                {/* Action Buttons */}
                <div className="flex justify-center items-center space-x-4 mt-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleWishlistToggle(product._id);
                    }}
                    className={`p-3 rounded-full shadow-md focus:outline-none transition-colors ${
                      wishlist.has(product._id)
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-500 hover:bg-orange-500 hover:text-white'
                    }`}
                    title={wishlist.has(product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    {wishlist.has(product._id) ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    disabled={!inStock}
                    className={`p-3 rounded-full shadow-md focus:outline-none transition-colors ${
                      inStock
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    title={inStock ? 'Add to Cart' : 'Out of Stock'}
                  >
                    <FaShoppingCart size={24} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Popup Icon for Add to Cart */}
        {showPopup && (
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

  export default BestSelling;
