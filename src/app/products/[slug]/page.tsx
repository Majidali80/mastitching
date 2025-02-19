"use client";
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
  const [selectedImage, setSelectedImage] = useState<string>("");
  const { slug } = useParams();
  
  const { addToCart } = useCart(); // Access the addToCart function from context

  useEffect(() => {
    if (slug) {
      const fetchProductDetails = async () => {
        const query = `*[_type == "product" && slug.current == $slug][0]`;
        try {
          const productDetails = await client.fetch(query, { slug });
          setProduct(productDetails);
          if (productDetails.images && productDetails.images.length > 0) {
            setSelectedImage(urlFor(productDetails.images[0]).url());
          }
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

  // Add to Cart functionality using context
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to the cart!");
      return;
    }
    addToCart({ ...product, selectedSize, price: discountedPrice, quantity });
    alert("Product added to cart!");
  };

  return (
    <div className="container px-5 mx-auto my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          {product.discountPercentage && (
            <span className="absolute top-2 right-2 bg-red-500 text-white px-4 py-1 text-xl font-bold rounded-full">
              {product.discountPercentage}% OFF
            </span>
          )}
          {selectedImage && (
            <Image
              src={selectedImage}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-700 mt-4">{product.description}</p>
          <p className="text-lg font-semibold mt-4">
            Original Price: <span className="line-through text-gray-500">PKR {originalPrice}</span>
          </p>
          <p className="text-2xl text-red-500">
            Discounted Price: PKR {discountedPrice.toFixed(2)}
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
              <p className="text-lg font-semibold">Available Sizes:</p>
              <select
                className="mt-2 p-2 border rounded"
                onChange={(e) => setSelectedSize(e.target.value)}
                value={selectedSize || ""}
              >
                <option value="" disabled>Select a Size</option>
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
              className="bg-gray-300 px-4 py-2 rounded-full"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <span className="mx-4 text-lg">{quantity}</span>
            <button
              className="bg-gray-300 px-4 py-2 rounded-full"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <div className="mt-4">
            <p className="text-xl font-semibold">Total Price: PKR {(discountedPrice * quantity).toFixed(2)}</p>
          </div>
          <button
            className="bg-blue-500 text-white py-3 px-6 rounded-full mt-6 hover:bg-blue-600 transition"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-6 flex space-x-4">
        {product.images && product.images.length > 0 && product.images.map((image, index) => (
          <div key={index} className="w-20 h-20 cursor-pointer">
            <Image
              src={urlFor(image).url()}
              alt={`Thumbnail ${index}`}
              width={80}
              height={80}
              className="object-cover"
              onClick={() => setSelectedImage(urlFor(image).url())}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
