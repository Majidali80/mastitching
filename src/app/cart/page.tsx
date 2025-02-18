"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/cartContext';
import Swal from "sweetalert2";
import { urlFor } from "../../sanity/lib/client";
import Image from 'next/image';
import { FaTruck, FaShareAlt } from 'react-icons/fa';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [flashSaleTimeLeft, setFlashSaleTimeLeft] = useState(60); // in minutes
  const [progress, setProgress] = useState(0);  // For progress bar

  useEffect(() => {
    // Flash Sale Timer
    const timer = setInterval(() => {
      if (flashSaleTimeLeft > 0) {
        setFlashSaleTimeLeft(flashSaleTimeLeft - 1);
      }
    }, 60000); // Decrease every minute

    return () => clearInterval(timer);
  }, [flashSaleTimeLeft]);

  // Function to get the discounted price for an item
  const getDiscountedPrice = (price: number, discountPercentage: number) => {
    return price - (price * (discountPercentage / 100));
  };

  // Calculate total with dynamic discount percentage
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const discountedPrice = getDiscountedPrice(item.price, item.discountPercentage);
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

  // Calculate the progress based on the total cart value
  const calculateProgress = () => {
    const totalAmount = calculateTotal();
    if (totalAmount >= 4000) return 100;  // Full progress for large cart
    if (totalAmount >= 2000) return 50;   // 50% progress for medium cart
    return 0;                             // No progress for small cart
  };

  useEffect(() => {
    setProgress(calculateProgress());  // Update progress whenever the cart changes
  }, [cart]);  // Re-run when cart updates

  // Social media sharing
  const shareCart = () => {
    const cartUrl = window.location.href; // Share current cart page URL
    const text = `Check out my cart: ${cartUrl}`;
    const shareUrl = `https://twitter.com/share?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
  };

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
              {cart.map((item) => {
                // Get the discounted price for each item
                const discountedPrice = getDiscountedPrice(item.price, item.discountPercentage);
                return (
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
                      <p className="text-lg font-semibold text-blue-600">Rs. {(discountedPrice * item.quantity).toFixed(2)}</p>
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
                );
              })}
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

            {/* Progress Bar */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Discount Progress</h3>
              <div className="h-2 bg-gray-300 rounded-full mt-2">
                <div
                  style={{ width: `${progress}%` }}
                  className="h-2 bg-green-500 rounded-full"
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">You are {progress}% towards your discount!</p>
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
              {/* Example Recommendations */}
              <div className="flex items-center gap-4 border-b pb-4 mb-4">
                <Image
                  src="/images/product-a.jpg"
                  alt="Product A"
                  width={80}
                  height={80}
                  className="object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Product A</h3>
                  <p className="text-sm text-gray-500">Rs. 500</p>
                </div>
              </div>
              {/* Add more recommended products as needed */}
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
