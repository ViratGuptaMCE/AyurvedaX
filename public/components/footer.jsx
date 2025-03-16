"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowUp,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Github,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    alert(`Thank you for subscribing with: ${email}`);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-900 text-gray-100">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">TacX</h3>
          <p className="text-gray-300 max-w-xs">
            Creating amazing experiences since 2025. We're dedicated to
            excellence in everything we do.
          </p>
          <div className="flex space-x-4">
            <Link
              href="https://twitter.com"
              className="hover:text-blue-400 transition-colors"
            >
              <Twitter size={20} />
            </Link>
            <Link
              href="https://instagram.com"
              className="hover:text-pink-400 transition-colors"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="https://facebook.com"
              className="hover:text-blue-600 transition-colors"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="https://linkedin.com"
              className="hover:text-blue-500 transition-colors"
            >
              <Linkedin size={20} />
            </Link>
            <Link
              href="https://github.com"
              className="hover:text-gray-400 transition-colors"
            >
              <Github size={20} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-white transition-colors"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="hover:text-white transition-colors"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="hover:text-white transition-colors"
              >
                Careers
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <address className="not-italic text-gray-300 space-y-2">
            <p>123 Vigyaan Street</p>
            <p>Tech City, Delhi</p>
            <p>India</p>
            <p className="pt-2">
              <a
                href="mailto:info@yourcompany.com"
                className="hover:text-white transition-colors"
              >
                info@veda.com
              </a>
            </p>
            <p>
              <a
                href="tel:+15551234567"
                className="hover:text-white transition-colors"
              >
                +1234567890
              </a>
            </p>
          </address>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Stay Updated</h3>
          <p className="text-gray-300">
            Subscribe to our newsletter for the latest updates.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} TacX. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
