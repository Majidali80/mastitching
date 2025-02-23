"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Stitching } from "../types/stitching";  // Import Stitching interface
import client from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/client";
import { stitchedProductQuery } from '../sanity/lib/queries';
import Link from 'next/link';

const StitchingPage = () => {
  const [stitchedProducts, setStitchedProducts] = useState<Stitching[]>([]);  // Changed to Stitching type

  useEffect(() => {
    async function fetchStitchedProducts() {
      // Fetch the stitching data
      const fetchedStitchedProducts: Stitching[] = await client.fetch(stitchedProductQuery);
      console.log("Fetched Stitched Products:", fetchedStitchedProducts);
      setStitchedProducts(fetchedStitchedProducts);
    }
    fetchStitchedProducts();
  }, []);

  return (
    <div className="product-grid">
      {Array.isArray(stitchedProducts) && stitchedProducts.length > 0 ? (
        stitchedProducts.map((stitchedProduct: Stitching) => (
          <div key={stitchedProduct._id} className="product-card">
            {stitchedProduct.stitchingImage ? (
              <Image
                src={urlFor(stitchedProduct.stitchingImage).url()}
                alt={stitchedProduct.stitchType}
                width={500}
                height={500}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
            <h2>{stitchedProduct.stitchType}</h2>
            <p>Category: {stitchedProduct.category}</p>
            <p>Technique: {stitchedProduct.technique}</p>
            <p>Stitch Pattern: {stitchedProduct.stitchPattern}</p>
            <p>Price Adjustment: PKR {stitchedProduct.priceAdjustment}</p>
            <p>Availability: {stitchedProduct.availability}</p>
             Optionally add links or more fields based on the Stitching type
            <Link href={`/stitched-products/${stitchedProduct._id}`}>View Details</Link>
          </div>
        ))
      ) : (
        <p>No stitched products available</p>
      )}
    </div>
  );
};

export default StitchingPage;
