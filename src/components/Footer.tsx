"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

// Define the schema options directly from the Sanity schema
const categories = [
  { title: "Men's", value: "mens" },
  { title: "Women's", value: "womens" },
  { title: "Unisex", value: "unisex" },
];

const subCategories = [
  { title: "Floral", value: "floral" },
  { title: "Woody", value: "woody" },
  { title: "Oriental", value: "oriental" },
  { title: "Citrus", value: "citrus" },
  { title: "Fruity", value: "fruity" },
  { title: "Aromatic", value: "aromatic" },
  { title: "Aquatic", value: "aquatic" },
  { title: "Gourmand", value: "gourmand" },
];

const occasions = [
  { title: "Casual", value: "casual" },
  { title: "Evening", value: "evening" },
  { title: "Formal", value: "formal" },
  { title: "Special Occasion", value: "special_occasion" },
  { title: "Seasonal", value: "seasonal" },
];

const usageTypes = [
  { title: "Perfume Oils", value: "perfume_oils" },
  { title: "Sprays", value: "sprays" },
  { title: "Deodorants", value: "deodorants" },
];

const brands = [
  { title: "Luxury", value: "luxury" },
  { title: "Designer", value: "designer" },
  { title: "Niche", value: "niche" },
  { title: "Celebrity", value: "celebrity" },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Top Section: Logo, Navigation, and Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section with Logo */}
          <div className="text-center md:text-center lg:text-left">
            <h3 className="text-2xl font-serif text-gold-500 mb-4 block lg:hidden mx-auto">Mystic Essence Fragrance</h3>
            <h3 className="text-2xl font-serif text-gold-500 mb-4 hidden lg:block">Mystic Essence Fragrance</h3>
            <p className="text-gray-400">
              Discover the magic of scents with our exquisite collection of perfumes, crafted to captivate your senses.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-gold-500 mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-4">
              {/* Basic Links */}
              <div>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-gray-400 hover:text-gold-500 transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop" className="text-gray-400 hover:text-gold-500 transition-colors">
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-gray-400 hover:text-gold-500 transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-400 hover:text-gold-500 transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Schema-Based Links */}
              <div>
                {/* Categories */}
                <h5 className="text-sm font-semibold text-gold-500 mb-2">Categories</h5>
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category.value}>
                      <Link
                        href={`/shop?category=${category.value}`}
                        className="text-gray-400 hover:text-gold-500 transition-colors text-sm"
                      >
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Sub-Categories */}
                <h5 className="text-sm font-semibold text-gold-500 mt-4 mb-2">Scent Profiles</h5>
                <ul className="space-y-1">
                  {subCategories.map((subCategory) => (
                    <li key={subCategory.value}>
                      <Link
                        href={`/shop?subCategory=${subCategory.value}`}
                        className="text-gray-400 hover:text-gold-500 transition-colors text-sm"
                      >
                        {subCategory.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Additional Schema Links (Occasions, Usage Types, Brands) */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {/* Occasions */}
              <div>
                <h5 className="text-sm font-semibold text-gold-500 mb-2">Occasions</h5>
                <ul className="space-y-1">
                  {occasions.map((occasion) => (
                    <li key={occasion.value}>
                      <Link
                        href={`/shop?occasion=${occasion.value}`}
                        className="text-gray-400 hover:text-gold-500 transition-colors text-sm"
                      >
                        {occasion.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Usage Types */}
              <div>
                <h5 className="text-sm font-semibold text-gold-500 mb-2">Usage Types</h5>
                <ul className="space-y-1">
                  {usageTypes.map((usage) => (
                    <li key={usage.value}>
                      <Link
                        href={`/shop?usageType=${usage.value}`}
                        className="text-gray-400 hover:text-gold-500 transition-colors text-sm"
                      >
                        {usage.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Brands */}
              <div>
                <h5 className="text-sm font-semibold text-gold-500 mb-2">Brands</h5>
                <ul className="space-y-1">
                  {brands.map((brand) => (
                    <li key={brand.value}>
                      <Link
                        href={`/shop?brand=${brand.value}`}
                        className="text-gray-400 hover:text-gold-500 transition-colors text-sm"
                      >
                        {brand.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-gold-500 mb-4">Contact Us</h4>
            <p className="text-gray-400 flex items-center justify-center md:justify-end mb-2">
              <FaEnvelope className="mr-2" /> info@mysticessence.com
            </p>
            <p className="text-gray-400 flex items-center justify-center md:justify-end mb-2">
              <FaPhone className="mr-2" /> +1-234-567-890
            </p>
            <p className="text-gray-400 flex items-center justify-center md:justify-end">
              <FaMapMarkerAlt className="mr-2" /> 123 Mystic Lane, Fragrance City
            </p>
          </div>
        </div>

        {/* Middle Section: Social Media and Newsletter */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Social Media */}
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gold-500 mb-4">Follow Us</h4>
              <div className="flex justify-center space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-500">
                  <FaFacebookF size={24} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-500">
                  <FaTwitter size={24} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-500">
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gold-500 mb-4">Subscribe to Our Newsletter</h4>
              <form className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-gold-500 text-white p-2 rounded-md hover:bg-gold-600 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright and Legal */}
        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Mystic Essence Fragrance. All rights reserved.
          </p>
          <div className="mt-2 space-x-4">
            <Link href="/terms" className="text-gray-400 hover:text-gold-500 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-gold-500 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;