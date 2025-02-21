'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden"
        >
          {/* Hero Section */}
          <div className="relative h-[300px] sm:h-[400px]">
            <Image
              src="/about-hero.jpg" // Add your image to public folder
              alt="About Us Hero"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-white text-center">
                About Us
              </h1>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-12">
            {/* Mission Statement */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600">
                To provide high-quality products at competitive prices while ensuring 
                exceptional customer service and satisfaction.
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-gray-50 rounded-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Products</h3>
                <p className="text-gray-600">
                  We carefully select and verify all products to ensure the highest quality 
                  standards.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 bg-gray-50 rounded-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600">
                  Quick and reliable delivery service to get your products to you as soon as 
                  possible.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 bg-gray-50 rounded-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Support</h3>
                <p className="text-gray-600">
                  24/7 customer support to assist you with any questions or concerns.
                </p>
              </motion.div>
            </div>

            {/* Story Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2023, our marketplace has grown from a small local business 
                to a trusted online destination for quality products. We started with a 
                simple mission: to make quality products accessible to everyone.
              </p>
              <p className="text-gray-600 mb-4">
                Today, we serve thousands of customers, offering a wide range of products 
                while maintaining our commitment to quality and customer satisfaction. 
                Our team works tirelessly to source the best products and ensure a 
                seamless shopping experience.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 