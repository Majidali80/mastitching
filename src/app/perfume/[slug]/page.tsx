"use client";
import { useState, useEffect } from "react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/app/context/cartContext";
import Image from "next/image";



const productBySlugQuery = `*[_type == "perfume" && slug.current == $slug][0] {
  _id,
  title,
  price,
  productImage {
    asset-> {
      url
    },
    alt
  },
  inventory,
  sizes,
  scentNotes,
  category,
  bestSeller,
  discount,
  isActive,
  stock,
  slug { current }
}`;

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await sanityFetch({
          query: productBySlugQuery,
          params: { slug: params.slug },
        });
        if (!fetchedProduct) {
          setError("Product not found");
        } else {
          setProduct(fetchedProduct);
        }
      } catch (err) {
        setError("Failed to load product");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.slug]);

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">{error}</div>;
  }

  if (!product) {
    return null;
  }

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative">
          <Image
            src={product.productImage?.asset?.url || "/placeholder.jpg"}
            alt={product.productImage?.alt || product.title}
            width={500}
            height={500}
            className="object-cover w-full h-full rounded-lg"
          />
          {product.bestSeller && (
            <span className="absolute bottom-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
              Best Seller
            </span>
          )}
          {product.discount && (
            <span className="absolute bottom-0 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}% Off
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div className="flex justify-between items-start">
            <p className="text-sm text-blue-500">Brand: {product.category || "N/A"}</p>
            <div className="text-right text-sm">
              {product.discount ? (
                <>
                  <span className="line-through text-gray-500">PKR {product.price}</span>
                  <span className="block text-red-500 text-lg font-semibold">
                    PKR {discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-green-500">{product.stock}</span>
                  <span className="block text-gray-500">Inventory: {product.inventory}</span>
                </>
              ) : (
                <>
                  <span className="text-lg font-semibold">PKR {product.price}</span>
                  <span className="block text-gray-500">{product.stock}</span>
                  <span className="block text-gray-500">Inventory: {product.inventory}</span>
                </>
              )}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <p className="text-sm font-semibold">Available Sizes:</p>
            <p className="text-sm text-gray-600">
              {product.sizes && product.sizes.length > 0
                ? product.sizes.map((sizeOption, index) => (
                    <span key={index}>
                      {sizeOption.size}ml (+{sizeOption.priceAdjustment} PKR)
                      {index < product.sizes.length - 1 ? ", " : ""}
                    </span>
                  ))
                : "N/A"}
            </p>
          </div>

          {/* Scent Notes */}
          <div>
            <p className="text-sm font-semibold">Scent Notes:</p>
            <p className="text-sm text-gray-600">
              {product.scentNotes ? (
                <>
                  Top: {product.scentNotes.top.join(", ")} <br />
                  Heart: {product.scentNotes.heart.join(", ")} <br />
                  Base: {product.scentNotes.base.join(", ")}
                </>
              ) : (
                "N/A"
              )}
            </p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product)}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            <FaShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}