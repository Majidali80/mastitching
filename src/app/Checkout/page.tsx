  "use client";

  import { useState } from "react";
  import { useCart } from "../context/cartContext";
  import Link from "next/link";
  import { createClient } from "@sanity/client";
  import Swal from "sweetalert2";
  import { FaShoppingCart } from "react-icons/fa";
  import { urlFor } from "@//sanity/lib/client"; // Assuming you have this utility to get the image URLs from Sanity
  import Image from 'next/image';

  // Sanity client configuration
  const sanityClient = createClient({
    projectId: "ilhf9wt8",
    dataset: "production",
    apiVersion: "2023-05-03",
    useCdn: false,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  });

  interface OrderData {
    _type: string;
    customer: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address: {
        street1: string;
        street2?: string;
        city: string;
        country: string;
      };
      subscribe: boolean;
    };
    items: {
      _key: string;
      product: {
        _type: string;
        _ref: string;
      };
      quantity: number;
      price: number;
    }[];
    paymentMethod: string;
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
    orderDate: string;
    notes?: string;
  }

  export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [promoError, setPromoError] = useState("");
    const [paymentOption, setPaymentOption] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = 10; // Flat shipping rate
    const total = Math.max((subtotal - discount) + shipping, 0);

    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      address1: "",
      address2: "",
      city: "",
      country: "Pakistan",
      telephone: "",
      comment: "",
      subscribe: false,
    });

    const handleApplyDiscount = () => {
      if (promoCode.toUpperCase() === "DISCOUNT10") {
        setDiscount(subtotal * 0.1);
        setPromoError("");
        localStorage.setItem("appliedDiscount", "DISCOUNT10");
      } else {
        setPromoError("Invalid promo code");
        localStorage.removeItem("appliedDiscount");
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      const checked = (e.target as HTMLInputElement).checked;

      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    };

    const validateForm = () => {
      const requiredFields = ["firstName", "lastName", "email", "address1", "city", "telephone"];

      return requiredFields.every((field) => Boolean(formData[field as keyof typeof formData]));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      if (subtotal === 0) {
        Swal.fire("Error", "Your cart is empty. Please add items to your cart before placing an order.", "warning");
        setIsSubmitting(false);
        return;
      }

      if (!validateForm()) {
        Swal.fire("Error", "Please fill in all required fields", "error");
        setIsSubmitting(false);
        return;
      }

      if (!paymentOption) {
        Swal.fire("Error", "Please select a payment method", "error");
        setIsSubmitting(false);
        return;
      }

      const orderData: OrderData = {
        _type: "order",
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.telephone,
          address: {
            street1: formData.address1,
            street2: formData.address2 || undefined,
            city: formData.city,
            country: formData.country,
          },
          subscribe: formData.subscribe,
        },
        items: cart.map((item) => ({
          _key: item._id,
          product: {
            _type: "reference",
            _ref: item._id,
          },
          quantity: item.quantity,
          price: item.price,
        })),
        paymentMethod: paymentOption,
        subtotal,
        shipping,
        discount,
        total,
        orderDate: new Date().toISOString(),
        notes: formData.comment || undefined,
      };

      try {
        const result = await sanityClient.create(orderData);

        Swal.fire({
          title: "Order Placed!",
          html: `<div>
            <p>Order ID: <strong>${result._id.substring(0, 8)}</strong></p>
            <p>Total Amount: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}</p>
            <p>Payment Method: ${paymentOption}</p>
          </div>`,
          icon: "success",
        });

        clearCart();
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          address1: "",
          address2: "",
          city: "",
          country: "Pakistan",
          telephone: "",
          comment: "",
          subscribe: false,
        });

        setPromoCode("");
        setDiscount(0);
        localStorage.removeItem("appliedDiscount");

      } catch (error) {
        console.error("Order creation error:", error);
        Swal.fire("Error", "Failed to place order. Please try again.", "error");
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <>
        <div className="bg-gray-50 min-h-screen py-12">
          <div className="container mx-auto px-4 relative">
            <Link href="/cart" className="absolute top-4 left-4 flex items-center text-blue-600 hover:text-blue-800 ml-5">
              <FaShoppingCart size={24} />
              <div className="ml-5">Back to Cart</div>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Delivery Details Section */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 border-b pb-2 mt-5">Delivery Details</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
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
                    placeholder="Address 1"
                    className="w-full p-2 border rounded-lg"
                    value={formData.address1}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="address2"
                    placeholder="Address 2 (optional)"
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
                  <input
                    type="text"
                    name="telephone"
                    placeholder="Phone Number"
                    className="w-full p-2 border rounded-lg"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    required
                  />
                  <select
                    name="country"
                    className="w-full p-2 border rounded-lg"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="Pakistan">Pakistan</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                  <textarea
                    name="comment"
                    placeholder="Additional Comments (optional)"
                    className="w-full p-2 border rounded-lg"
                    value={formData.comment}
                    onChange={handleInputChange}
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="subscribe"
                      checked={formData.subscribe}
                      onChange={handleInputChange}
                      className="h-5 w-5"
                    />
                    <label htmlFor="subscribe" className="text-sm">Subscribe to newsletter</label>
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-2 rounded-lg shadow-lg hover:bg-green-700 disabled:bg-gray-400"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Placing Order..." : "Place Order"}
                    </button>
                  </div>

                  <div className="mt-4">
                    <Link href="/product" className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg shadow-lg hover:bg-blue-700">
                      Continue Shopping
                    </Link>
                  </div>
                </form>
              </div>

              {/* Order Summary Section */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Order Summary</h2>
                <div className="space-y-4">
                  {/* Display each item in the cart */}
                  {cart.map((item) => (
                    <div key={item._id} className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <Image
                          src={urlFor(item.image).url()}
                          alt={item.title}
                          width={48} // Adjust width and height accordingly
                          height={48}
                          className="object-cover rounded"
                        />
                        <div>
                          <div className="text-lg">{item.title}</div>
                          <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                        </div>
                      </div>
                      <span className="text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}

                  <div className="flex justify-between text-lg">
                    <span>Sub-Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        className="flex-1 p-2 border rounded-lg"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={handleApplyDiscount}
                        className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && <p className="text-red-500 text-sm">{promoError}</p>}
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount Applied:</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between text-lg">
                    <span>Flat Shipping Rate</span>
                    <span>PKR{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-4">
                    <span>Total</span>
                    <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}</span>
                  </div>

                  <div className="mt-4">
                    <select
                      value={paymentOption}
                      onChange={(e) => setPaymentOption(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      required
                    >
                      <option value="">Select Payment Method</option>
                      <option value="COD">Cash on Delivery (COD)</option>
                      <option value="Card">Credit/Debit Card</option>
                      <option value="EasyPaisa">EasyPaisa</option>
                      <option value="JazzCash">JazzCash</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
