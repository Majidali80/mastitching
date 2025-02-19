"use client";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client, urlFor } from "../../../sanity/lib/client";
import { Product } from "../../../app/utils/types";
import Image from "next/image";
import { useCart } from "../../../app/context/cartContext"; // Import the useCart hook

const ProductDetailsPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { slug } = useParams();

  const { addToCart } = useCart(); // Access the addToCart function from context

  useEffect(() => {
    if (slug) {
      const fetchProductDetails = async () => {
        const query = `*[_type == "product" && slug.current == $slug][0]`;
        try {
          const productDetails = await client.fetch(query, { slug });
          setProduct(productDetails);
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
      alert("Please select a size before adding to the cart!");
      return;
    }

    const originalPrice = selectedSizeData ? selectedSizeData.price : product.price;

    addToCart({
      ...product,
      selectedSize,
      price: originalPrice,
      quantity,
    });

    alert("Product added to cart!");
  };

  return (
    <div className="container px-5 mx-auto my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          {product.discountPercentage && (
            <span className="absolute top-2 right-2 bg-myLgold text-white px-4 py-1 text-xl font-bold rounded-full">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.image && (
            <Image
              src={urlFor(product.image).url()}
              alt={product.title}
              width={500}
              height={100}
              className="w-full h-auto object-cover border-myLgold"
            />
          )}

          <div className="mt-6 flex justify-center gap-4">
            <button
              className="bg-myDgold text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
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
              className="bg-myLgold px-4 py-2 rounded-full"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <span className="mx-4 text-lg">{quantity}</span>
            <button
              className="bg-myLgold px-4 py-2 rounded-full"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          <div className="mt-4">
            <p className="text-xl font-semibold text-red-600">
              Discounted Price: PKR {(discountedPrice * quantity).toFixed(2)}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            <table className="table-auto border-collapse border border-gray-300 w-full text-left">
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
    </div>
  );
};

export default ProductDetailsPage;
