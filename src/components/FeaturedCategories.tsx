'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  {
    name: "Women's Stitching",
    image: "/1.jpg",
    link: "/products/stitching/women",
    description: "Custom tailored women's wear"
  },
  {
    name: "Men's Collection",
    image: "/2.jpeg",
    link: "/products/stitching/men",
    description: "Traditional & modern men's wear"
  },
  {
    name: "Unstitched Fabric",
    image: "/3.jpeg",
    link: "/unstitched",
    description: "Premium quality fabrics"
  },
  {
    name: "Ready to Wear",
    image: "/4.jpeg",
    link: "/ready-to-wear",
    description: "Instant wear collection"
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-50 to-orange-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop By Category
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Link href={category.link}>
                <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative h-64 w-full">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories; 