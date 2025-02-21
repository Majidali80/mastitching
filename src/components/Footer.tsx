"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Thank you for subscribing to our newsletter!'
        });
        setEmail('');
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Failed to subscribe. Please try again.'
        });
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gradient-to-r from-orange-100 to-orange-300">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About Section */}
          <div className="space-y-4">
            <Link href="/" className="flex flex-col items-center md:items-start">
              <Image 
                src="/logo.png"
                alt="MA Tailor Logo"
                width={80}
                height={80}
                className="rounded-full"
              />
              <span className="text-orange-950 font-bold text-lg mt-2">
                MA Tailor
              </span>
            </Link>
            <p className="text-orange-900 text-sm text-center md:text-left">
              Your trusted destination for quality tailoring services and ready-to-wear fashion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-orange-950 font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-orange-900 hover:text-orange-700 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-orange-900 hover:text-orange-700 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/products/stitching" className="text-orange-900 hover:text-orange-700 transition-colors">
                  Stitching Services
                </Link>
              </li>
              <li>
                <Link href="/ready-to-wear" className="text-orange-900 hover:text-orange-700 transition-colors">
                  Ready to Wear
                </Link>
              </li>
              <li>
                <Link href="/unstitched" className="text-orange-900 hover:text-orange-700 transition-colors">
                  Unstitched Fabric
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-orange-950 font-bold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <FaPhone className="text-orange-900" />
                <a href="tel:+923123456789" className="text-orange-900 hover:text-orange-700 transition-colors">
                  +92 312 3456789
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FaWhatsapp className="text-orange-900" />
                <a href="https://wa.me/923123456789" className="text-orange-900 hover:text-orange-700 transition-colors">
                  WhatsApp Chat
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-orange-900" />
                <a href="mailto:info@matailor.com" className="text-orange-900 hover:text-orange-700 transition-colors">
                  info@matailor.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-orange-900" />
                <span className="text-orange-900">
                  123 Main Street, City, Country
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-orange-950 font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-900 hover:text-orange-700 transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-900 hover:text-orange-700 transition-colors"
              >
                <FaTwitter size={24} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-900 hover:text-orange-700 transition-colors"
              >
                <FaInstagram size={24} />
              </a>
            </div>
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-orange-950 font-semibold mb-2">Subscribe to Newsletter</h4>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="px-3 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-orange-500 text-white px-4 py-2 rounded-r-md transition-colors
                      ${isSubmitting 
                        ? 'bg-orange-400 cursor-not-allowed' 
                        : 'hover:bg-orange-600'
                      }`}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
                
                {/* Status Message */}
                {status.type && (
                  <div
                    className={`text-sm px-3 py-2 rounded-md ${
                      status.type === 'success'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {status.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-orange-200 mt-8 pt-6">
          <p className="text-center text-orange-900">
            © {new Date().getFullYear()} MA Tailor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 