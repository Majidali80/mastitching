"use client";

import React, { useState } from "react";
import { useCart } from "../context/cartContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { urlFor } from "../../sanity/lib/client";
import Image from "next/image";
import { FaTruck, FaCreditCard, FaMoneyBillWave, FaWallet } from "react-icons/fa";

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();

  // State for delivery details
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    country: "Pakistan",
    phone: "",
    notes: "",
    subscribe: false,
  });

  // State for payment method
  const [paymentMethod, setPaymentMethod] = useState("");

  // Function to get discounted price
  const getDiscountedPrice = (price: number, discountPercentage: number) => {
    return price - price * (discountPercentage / 100);
  };

  // Calculate subtotal (sum of discounted prices)
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const discountedPrice = getDiscountedPrice(item.price, item.discountPercentage);
      return total + discountedPrice * item.quantity;
    }, 0);
  };

  // Calculate shipping cost
  const estimateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 30000 ? 0 : subtotal >= 6000 ? 600 : 250;
  };

  // Calculate total (subtotal + shipping)
  const calculateTotal = () => {
    return calculateSubtotal() + estimateShipping();
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all required fields are filled out
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address1 || !formData.city || !formData.phone) {
      Swal.fire("Error", "Please fill out all required fields", "error");
      return;
    }

    if (!paymentMethod) {
      Swal.fire("Error", "Please select a payment method", "error");
      return;
    }

    // Simulate order placement
    Swal.fire({
      title: "Order Placed!",
      text: "Your order has been successfully placed.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      router.push("/"); // Redirect to home after order is placed
    });
  };

  return (
    <div className="container mx-auto p-6 mt-16 bg-[#fafafa]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Delivery Details Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Delivery Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="p-2 border rounded-lg"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="p-2 border rounded-lg"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border rounded-lg"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="address1"
              placeholder="Address Line 1"
              className="w-full p-2 border rounded-lg"
              value={formData.address1}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="address2"
              placeholder="Address Line 2 (Optional)"
              className="w-full p-2 border rounded-lg"
              value={formData.address2}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full p-2 border rounded-lg"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
            <select
              name="country"
              className="w-full p-2 border rounded-lg"
              value={formData.country}
              onChange={handleInputChange}
              required
            >
              <option value="Pakistan">Pakistan</option>
              <option value="USA">United States</option>
              <option value="UK">United Kingdom</option>
            </select>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-2 border rounded-lg"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="notes"
              placeholder="Additional Notes (Optional)"
              className="w-full p-2 border rounded-lg"
              value={formData.notes}
              onChange={handleInputChange}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                name="subscribe"
                checked={formData.subscribe}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="subscribe" className="text-sm text-gray-600">
                Subscribe to our newsletter
              </label>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => {
              const discountedPrice = getDiscountedPrice(item.price, item.discountPercentage);
              return (
                <div key={item._id} className="flex items-center justify-between border-b pb-4">
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
                </div>
              );
            })}
          </div>

          {/* Shipping Estimate */}
          <div className="mt-6 p-4 border rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaTruck /> Shipping
            </h3>
            <p className="text-gray-700">
              {estimateShipping() === 0 ? "Free Shipping" : `Rs. ${estimateShipping()}`}
            </p>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center border-t pt-6">
            <span className="text-lg font-semibold text-gray-800">Total:</span>
            <span className="text-xl font-bold text-blue-600">Rs. {calculateTotal().toFixed(2)}</span>
          </div>

          {/* Payment Method */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h3>
            <div className="space-y-4">
              <button
                onClick={() => setPaymentMethod("credit_card")}
                className={`w-full p-4 border rounded-lg flex items-center gap-2 ${
                  paymentMethod === "credit_card" ? "bg-blue-50 border-blue-500" : "bg-white"
                }`}
              >
                <FaCreditCard /> Credit/Debit Card
              </button>
              <button
                onClick={() => setPaymentMethod("cod")}
                className={`w-full p-4 border rounded-lg flex items-center gap-2 ${
                  paymentMethod === "cod" ? "bg-blue-50 border-blue-500" : "bg-white"
                }`}
              >
                <FaMoneyBillWave /> Cash on Delivery
              </button>
              <button
                onClick={() => setPaymentMethod("easypaisa")}
                className={`w-full p-4 border rounded-lg flex items-center gap-2 ${
                  paymentMethod === "easypaisa" ? "bg-blue-50 border-blue-500" : "bg-white"
                }`}
              >
                <FaWallet /> EasyPaisa
              </button>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handleSubmit}
            className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Place Order
          </button>

          {/* Continue Shopping Button */}
          <button
            onClick={() => router.push("/")}
            className="w-full mt-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
