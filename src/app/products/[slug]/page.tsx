"use client"; 
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use useParams from next/navigation for App Router
import { client, urlFor } from "../../../sanity/lib/client"; // Adjust import path
import { Product } from "../../../app/utils/types";
import Image from "next/image";

const ProductDetailsPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null); // Add state for size
  const [quantity, setQuantity] = useState(1); // Add state for quantity
  const [selectedImage, setSelectedImage] = useState<string>(""); // Add state for selected image
  const { slug } = useParams(); // Use useParams instead of useRouter

  useEffect(() => {
    if (slug) {
      const fetchProductDetails = async () => {
        const query = `*[_type == "product" && slug.current == $slug][0]`;
        try {
          const productDetails = await client.fetch(query, { slug });
          setProduct(productDetails);
          if (productDetails.images && productDetails.images.length > 0) {
            setSelectedImage(urlFor(productDetails.images[0]).url()); // Set the first image as the default
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

  // Find the selected size data
  const selectedSizeData = product.sizes?.find((size) => size.size === selectedSize);
  
  // Calculate discounted price based on selected size
  const discountedPrice =
    selectedSizeData ? selectedSizeData.price - (selectedSizeData.price * (product.discountPercentage || 0)) / 100 : product.price - (product.price * (product.discountPercentage || 0)) / 100;

  // Original price should be updated according to the selected size
  const originalPrice = selectedSizeData ? selectedSizeData.price : product.price;

  // Add to Cart functionality
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to the cart!");
      return;
    }
    setCart((prevCart) => [...prevCart, { ...product, selectedSize }]);
    alert("Product added to cart!");
  };

  // Add to Wishlist functionality
  const handleAddToWishlist = () => {
    if (!wishlist.some((item) => item.slug.current === product.slug.current)) {
      setWishlist((prevWishlist) => [...prevWishlist, product]);
      alert("Product added to wishlist!");
    } else {
      alert("Product is already in your wishlist.");
    }
  };

  return (
    <div className="container px-5 mx-auto my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
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

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-700 mt-4">{product.description}</p>

          {/* Pricing */}
          <p className="text-lg font-semibold mt-4">
            Original Price:{" "}
            <span className="line-through text-gray-500">PKR {originalPrice}</span>
          </p>
          <p className="text-2xl text-red-500">
            Discounted Price: PKR {discountedPrice.toFixed(2)}
          </p>

          {/* Availability */}
          <p
            className={`text-sm mt-2 ${
              product.availability === "In Stock"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {product.availability}
          </p>

          {/* Sizes */}
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

          {/* Quantity Selector */}
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

          {/* Total Price Calculation */}
          <div className="mt-4">
            <p className="text-xl font-semibold">Total Price: PKR {(discountedPrice * quantity).toFixed(2)}</p>
          </div>

          {/* Add to Cart Button */}
          <button
            className="bg-blue-500 text-white py-3 px-6 rounded-full mt-6 hover:bg-blue-600 transition"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          {/* Add to Wishlist Button */}
          <button
            className="bg-purple-500 text-white py-3 px-6 rounded-full mt-4 hover:bg-purple-600 transition"
            onClick={handleAddToWishlist}
          >
            Add to Wishlist
          </button>
        </div>
      </div>

      {/* Thumbnails */}
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
