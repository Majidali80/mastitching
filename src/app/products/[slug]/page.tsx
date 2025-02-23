"use client"
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2"; // Make sure SweetAlert2 is imported
import { useParams, useRouter } from "next/navigation";
import client, { urlFor } from "../../../sanity/lib/client"; // Import urlFor
import { Product } from "../../../app/utils/types";
import Image from "next/image";
import { useCart } from "../../../app/context/cartContext"; // Import the useCart hook

const ProductDetailsPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { slug } = useParams();
  const router = useRouter(); // Initialize the router

  const { addToCart } = useCart(); // Access the addToCart function from context
  
  const [reviews, setReviews] = useState<{ rating: number; comment: string }[]>([]);
  const [review, setReview] = useState({ rating: 0, comment: '' });

  useEffect(() => {
    if (slug) {
      const fetchProductDetails = async () => {
        const query = `*[_type == "product" && slug.current == $slug][0]`;
        try {
          const productDetails = await client.fetch(query, { slug });
          setProduct(productDetails);
          setReviews(productDetails.reviews || []); // Set reviews from product details
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };
      fetchProductDetails();
    }
  }, [slug]);

  if (!product) {
    return <div>Loading product details...</div>;
  }

  const selectedSizeData = product.sizes?.find((size) => size.size === selectedSize);
  const discountedPrice =
    selectedSizeData
      ? selectedSizeData.price - (selectedSizeData.price * (product.discountPercentage || 0)) / 100
      : product.price - (product.price * (product.discountPercentage || 0)) / 100;
  const originalPrice = selectedSizeData ? selectedSizeData.price : product.price;

  const handleAddToCart = () => {
    if (!selectedSize) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please select a size before adding to the cart!',
      });
      return;
    }

    addToCart({
      ...product,
      selectedSize,
      price: originalPrice,
      quantity,
    });

    Swal.fire({
      icon: 'success',
      title: 'Added to Cart!',
      text: `${product.title} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please select a size before proceeding to buy!',
      });
      return;
    }

    // Add the product to the cart
    addToCart({
      ...product,
      selectedSize,
      price: originalPrice,
      quantity,
    });

    // Redirect to the checkout page using Next.js router
    router.push('/Checkout'); // Use router.push for navigation

    Swal.fire({
      icon: 'success',
      title: 'Proceeding to Checkout!',
      text: `${product.title} will be purchased.`,
    });
  };

  const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!review.rating || !review.comment) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Review',
        text: 'Please provide a rating and a comment.',
      });
      return;
    }

    // Add the new review to the reviews state
    setReviews((prevReviews) => [...prevReviews, review]);
    setReview({ rating: 0, comment: '' }); // Reset the form

    // Show success message
    Swal.fire({
      icon: 'success',
      title: 'Review Submitted!',
      text: 'Thank you for your feedback.',
    });
  };

  return (
    <div className="container px-5 mx-auto my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          {product.discountPercentage && (
            <span className="absolute top-2 right-2 bg-orange-900 text-white px-4 py-1 text-xl font-bold rounded-full">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.image && (
            <Image
              src={urlFor(product.image).url()}
              alt={product.title}
              width={500}
              height={100}
              className="w-full h-auto object-cover border-orange-900"
            />
          )}

          <div className="mt-6 flex justify-center gap-4">
            <button
              className="bg-orange-900 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="bg-myDgold text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-orange-900">{product.title}</h1>
          <p className="text-gray-700 mt-4">{product.description}</p>
          <p className="text-lg font-semibold mt-4">
            Original Price: <span className="line-through text-gray-500">PKR {originalPrice}</span>
          </p>

          <p
            className={`text-sm mt-2 ${
              product.availability === "In Stock" ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.availability}
          </p>
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-6">
              <p className="text-lg font-semibold text-myBkack">Available Sizes:</p>
              <select
                className="mt-2 p-2 border rounded"
                onChange={(e) => setSelectedSize(e.target.value)}
                value={selectedSize || ""}
              >
                <option value="" disabled>
                  Select a Size
                </option>
                {product.sizes.map((sizeOption, index) => (
                  <option key={index} value={sizeOption.size}>
                    {sizeOption.size} - PKR {sizeOption.price}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mt-6 flex items-center">
            <button
              className="bg-orange-900 px-4 py-2 rounded-full"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <span className="mx-4 text-lg">{quantity}</span>
            <button
              className="bg-orange-900 px-4 py-2 rounded-full"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          <div className="mt-4">
            <p className="text-xl font-semibold text-orange-900">
              Discounted Price: PKR {(discountedPrice * quantity).toFixed(2)}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            <table className="table-auto border-collapse border border-orange-900 w-full text-left">
              <tbody>
                {product.fabricType && (
                  <tr>
                    <th className="border border-gray-300 p-2 bg-gray-100">Fabric Type:</th>
                    <td className="border border-gray-300 p-2">{product.fabricType}</td>
                  </tr>
                )}
                {product.dimensions && (
                  <tr>
                    <th className="border border-gray-300 p-2 bg-gray-100">Dimensions:</th>
                    <td className="border border-gray-300 p-2">{product.dimensions}</td>
                  </tr>
                )}
                {product.category && (
                  <tr>
                    <th className="border border-gray-300 p-2 bg-gray-100">Category:</th>
                    <td className="border border-gray-300 p-2">{product.category}</td>
                  </tr>
                )}
                {product.colors && product.colors.length > 0 && (
                  <tr>
                    <th className="border border-gray-300 p-2 bg-gray-100">Colors:</th>
                    <td className="border border-gray-300 p-2">{product.colors.join(", ")}</td>
                  </tr>
                )}
                {product.materials && product.materials.length > 0 && (
                  <tr>
                    <th className="border border-gray-300 p-2 bg-gray-100">Materials:</th>
                    <td className="border border-gray-300 p-2">{product.materials.join(", ")}</td>
                  </tr>
                )}
                {product.careInstructions && (
                  <tr>
                    <th className="border border-gray-300 p-2 bg-gray-100">Care Instructions:</th>
                    <td className="border border-gray-300 p-2">{product.careInstructions}</td>
                  </tr>
                )}
                {product.shippingInformation && (
                  <tr>
                    <th className="border border-gray-300 p-2 bg-gray-100">Shipping Information:</th>
                    <td className="border border-gray-300 p-2">{product.shippingInformation}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <form onSubmit={handleReviewSubmit} className="mt-4">
          <div>
            <label className="block mb-2">Rating:</label>
            <select
              value={review.rating}
              onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
              className="border rounded p-2"
            >
              <option value={0}>Select Rating</option>
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
          <div className="mt-4">
            <label className="block mb-2">Comment:</label>
            <textarea
              value={review.comment}
              onChange={(e) => setReview({ ...review, comment: e.target.value })}
              className="border rounded p-2 w-full"
              rows={4}
            />
          </div>
          <button type="submit" className="bg-myDgold text-white py-2 px-4 rounded mt-4">
            Submit Review
          </button>
        </form>

        <div className="mt-6">
          <h3 className="text-xl font-bold">Reviews:</h3>
          {reviews.length > 0 ? (
            reviews.map((rev, index) => (
              <div key={index} className="border p-4 mt-2 rounded">
                <p className="font-semibold">Rating: {rev.rating} Stars</p>
                <p>{rev.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
