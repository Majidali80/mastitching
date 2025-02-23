"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import client, { urlFor } from "../../sanity/lib/client"; // Import urlFor
import { Stitching } from "../../types/stitching"; // Import Stitching interface
import Image from "next/image";
import { useCart } from "../../app/context/cartContext"; // Import the useCart hook
import Swal from "sweetalert2"; // Import SweetAlert2 for alerts
import WhatsAppPopup from '../../components/WhatsAppPopup'; // Ensure this path is correct
import ImageZoom from '../../components/ImageZoom'; // Ensure this path is correct
import { FaWhatsapp } from 'react-icons/fa'; // Import social media icons
// Import the stitched product query

const StitchingProductPage = () => {
  const { slug } = useParams();
  const { addToCart } = useCart(); // Access the addToCart function from context

  const [stitchedProduct, setStitchedProduct] = useState<Stitching | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null); // State for the zoomed image
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false); // State to control WhatsApp popup visibility
  const [ setReviews] = useState<{ rating: number; comment: string; image?: string }[]>([]);
  const [review, setReview] = useState({ rating: 0, comment: '', image: '' });

  useEffect(() => {
    const fetchStitchedProductDetails = async () => {
      const query = `*[_type == "stitching" && slug.current == $slug][0]`;
      try {
        const productDetails = await client.fetch(query, { slug });
        setStitchedProduct(productDetails); 
          setReviews(productDetails.reviews || []);
      } catch (error) {
        console.error("Error fetching stitched product details:", error);
      }
    };

    if (slug) {
      fetchStitchedProductDetails();
    }
  }, [slug]);

  if (!stitchedProduct) {
    return <div>Loading product details...</div>;
  }

  const handleAddToCart = () => {
    addToCart({ ...stitchedProduct, selectedSize: 'default', quantity: 1 });
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart!',
      text: `${stitchedProduct.stitchType} has been added to your cart.`,
    });
  };

  return (
    <div className="container px-5 mx-auto my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <Image
            src={urlFor(stitchedProduct.stitchingImage).url()}
            alt={stitchedProduct.stitchType}
            width={500}
            height={500}
            className="w-full h-auto object-cover border-orange-900"
            onClick={() => setZoomedImage(urlFor(stitchedProduct.stitchingImage).url())} // Open zoom on main image click
          />

          {/* Thumbnails Section */}
          <div className="flex space-x-2 mt-4">
            {stitchedProduct.images.slice(0, 3).map((image, index) => (
              <Image
                key={index}
                src={urlFor(image).url()}
                alt={`Thumbnail ${index + 1}`}
                width={100}
                height={100}
                className="cursor-pointer border rounded"
                onClick={() => setZoomedImage(urlFor(image).url())} // Set zoomed image on thumbnail click
              />
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              className="bg-orange-900 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-orange-900">{stitchedProduct.stitchType}</h1>
          <p className="text-gray-700 mt-4">{stitchedProduct.description}</p>
          <p className="text-lg font-semibold mt-4">
            Price: <span className="text-red-500 font-bold">PKR {stitchedProduct.priceAdjustment}</span>
          </p>
        </div>
      </div>

      {zoomedImage && (
        <ImageZoom imageUrl={zoomedImage} onClose={() => setZoomedImage(null)} /> // Render the zoomed image modal
      )}

      {/* WhatsApp Icon */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          className="bg-green-500 text-white p-3 rounded-full shadow-lg"
          onClick={() => setShowWhatsAppPopup((prev) => !prev)} // Toggle visibility
        >
          <FaWhatsapp size={24} />
        </button>
      </div>

      {showWhatsAppPopup && (
        <WhatsAppPopup
          onClose={() => setShowWhatsAppPopup(false)}
          whatsappNumber="1234567890" // Replace with your WhatsApp number
          predefinedMessage={`Hello, I have a question about the product: ${stitchedProduct.stitchType}`} // Pass the predefined message
        />
      )}
    </div>
  );
};

export default StitchingProductPage; 