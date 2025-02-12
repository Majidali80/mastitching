"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/cartContext';
import Swal from "sweetalert2"; 
import { urlFor } from "../../sanity/lib/client"; 
import Image from 'next/image'; // Import Image component from next/image


export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();
  const [note, setNote] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const discountedPrice = item.price * 0.9; // 10% discount
      return total + discountedPrice * item.quantity;
    }, 0);
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

  return (
    <div>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Your shopping cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-6 mt-16 bg-[#fafafa]">
        <div className="flex gap-10">
          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Special Instructions</h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add special instructions for your order..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
            />
          </div>

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
                        width={80} // Specify width
                        height={80} // Specify height
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
                    <p className="text-sm text-gray-500 line-through">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-lg font-semibold text-blue-600">
                      ${(item.price * 0.9 * item.quantity).toFixed(2)}
                    </p>
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

            <div className="flex justify-between items-center border-t pt-6">
              <span className="text-lg font-semibold text-gray-800">Total:</span>
              <span className="text-xl font-bold text-blue-600">
                ${calculateTotal().toFixed(2)}
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
        </div>
      </main>
    </div>
  );
}
