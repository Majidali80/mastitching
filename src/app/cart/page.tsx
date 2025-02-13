"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/cartContext';
import Swal from "sweetalert2";
import { urlFor } from "../../sanity/lib/client";
import Image from 'next/image';
import { FaTruck, FaGift, FaShareAlt } from 'react-icons/fa';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [flashSaleTimeLeft, setFlashSaleTimeLeft] = useState(60); // in minutes
  const [progress, setProgress] = useState(0); // Progress bar for progressive discounts

  useEffect(() => {
    // Flash Sale Timer
    const timer = setInterval(() => {
      if (flashSaleTimeLeft > 0) {
        setFlashSaleTimeLeft(flashSaleTimeLeft - 1);
      }
    }, 60000); // Decrease every minute

    return () => clearInterval(timer);
  }, [flashSaleTimeLeft]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const discountedPrice = item.price * 0.9; // 10% discount
      return total + discountedPrice * item.quantity;
    }, 0);
  };

  const estimateShipping = () => {
    const originalTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    return originalTotal >= 10000 ? 0 : originalTotal >= 7000 ? 500 : 250;
  };

  const applyPromoCode = () => {
    if (promoCode === 'DISCOUNT10') {
      setDiscount(0.1); // 10% off
    } else {
      setDiscount(0);
    }
  };

  const handleCheckout = () => {
    Swal.fire({
      title: 'Proceed to Checkout?',
      text: "Are you sure you want to proceed to the checkout page?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Proceed!',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/Checkout');
      }
    });
  };

  // Progressive Discounts (Buy more, save more)
  const progressiveDiscount = () => {
    const totalAmount = calculateTotal();
    if (totalAmount >= 4000) return 0.15; // 15% discount
    if (totalAmount >= 2000) return 0.10; // 10% discount
    return 0; // No discount
  };

  // Calculate progress bar for progressive discount
  const calculateProgress = () => {
    const totalAmount = calculateTotal();
    if (totalAmount >= 4000) return 100;
    if (totalAmount >= 2000) return 50;
    return 0;
  };

  // Social media sharing
  const shareCart = () => {
    const cartUrl = window.location.href; // Share current cart page URL
    const text = `Check out my cart: ${cartUrl}`;
    const shareUrl = `https://twitter.com/share?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
  };

  // Example Product Recommendations (Cross-selling & Upselling)
  const recommendedProducts = [
    { id: 1, title: "Product A", price: 500, image: "/images/product-a.jpg" },
    { id: 2, title: "Product B", price: 1500, image: "/images/product-b.jpg" },
    { id: 3, title: "Product C", price: 2500, image: "/images/product-c.jpg" },
  ];

  return (
    <div>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Your shopping cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-6 mt-16 bg-[#fafafa]">
        <div className="flex gap-10">
          {/* Order Summary Section */}
          <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item._id} className="flex items-center justify-between border-b pb-4 mb-4">
                  <div className="flex items-center space-x-4">
                    {item.image ? (
                      <Image
                        src={urlFor(item.image).url()}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 flex justify-center items-center rounded-md">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 line-through">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-lg font-semibold text-blue-600">Rs. {(item.price * 0.9 * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateQuantity(item._id, 'decrease')}
                      className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      -
                    </button>
                    <button
                      onClick={() => updateQuantity(item._id, 'increase')}
                      className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Section */}
            <div className="mt-6">
              <input
                type="text"
                placeholder="Enter Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={applyPromoCode}
                className="mt-2 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Apply Promo Code
              </button>
              {discount > 0 && (
                <div className="mt-4 text-green-500 font-semibold">
                  Promo Applied: {discount * 100}% Off
                </div>
              )}
            </div>

            {/* Progressive Discount Section */}
            <div className="mt-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-700">Progressive Discount</h3>
              <p className="text-gray-700">Spend more to unlock discounts:</p>
              <div className="flex justify-between items-center mt-2">
                <div>Spend Rs. 2000 to unlock 10% off</div>
                <div>Spend Rs. 4000 to unlock 15% off</div>
              </div>
              <div className="mt-4">
                <div className="text-gray-700">Your Progress:</div>
                <div className="h-2 bg-gray-300 rounded-full mt-2">
                  <div
                    style={{ width: `${calculateProgress()}%` }}
                    className="h-2 bg-green-500 rounded-full"
                  />
                </div>
                <div className="text-sm text-gray-600 mt-2">{calculateProgress()}% to the next discount</div>
              </div>
            </div>

            {/* Shipping Estimate */}
            <div className="mt-6 p-4 border rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaTruck /> Estimate Shipping
              </h3>
              <p className="text-gray-700">Shipping Fee: {estimateShipping() === 0 ? 'Free Shipping' : `Rs. ${estimateShipping()}`}</p>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center border-t pt-6">
              <span className="text-lg font-semibold text-gray-800">Total:</span>
              <span className="text-xl font-bold text-blue-600">
                Rs. {(
                  calculateTotal() * (1 - discount) + estimateShipping()
                ).toFixed(2)}
              </span>
            </div>

            <div className="mt-10">
              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

          {/* Product Recommendations */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">You May Also Like</h2>
            <div className="space-y-4">
              {recommendedProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4 border-b pb-4 mb-4">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={80}
                    height={80}
                    className="object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{product.title}</h3>
                    <p className="text-sm text-gray-500">Rs. {product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Media Sharing */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={shareCart}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <FaShareAlt /> Share Cart
          </button>
        </div>
      </main>
    </div>
  );
}
