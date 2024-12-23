import React from "react";
import { FaInstagram, FaFacebook, FaYoutube, FaPinterest, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <foot className="bg-[#fdeee7] py-10">
      {/* Footer Content */}
      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-4 gap-6">
          {/* Column 1: Top Category */}
          <div>
            <h4 className="text-lg font-semibold mb-4">TOP CATEGORY</h4>
            <ul className="space-y-2 text-sm">
              <li>Suit Sets</li>
              <li>Kurta Sets</li>
              <li>Dresses</li>
              <li>Co-ord Sets</li>
              <li>Sarees</li>
              <li>Lehenga</li>
            </ul>
          </div>

          {/* Column 2: Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">INFORMATION</h4>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Customer Reviews</li>
              <li>Exchange, Cancellation and Refund Policy</li>
              <li>Blogs</li>
              <li>Bulk Order / Wholesale</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Size Chart</li>
              <li>Sitemap</li>
            </ul>
          </div>

          {/* Column 3: Get Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">GET SUPPORT</h4>
            <ul className="space-y-2 text-sm">
              <li>Contact Us</li>
              <li>Submit for Returns & Exchanges</li>
              <li>Media Query</li>
              <li>Track Your Orders</li>
              <li>Your Addresses</li>
            </ul>
          </div>

          {/* Column 4: Connect With Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4">CONNECT WITH US</h4>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
            <div className="flex space-x-4">
              <FaInstagram className="w-6 h-6 text-gray-700 cursor-pointer" />
              <FaFacebook className="w-6 h-6 text-gray-700 cursor-pointer" />
              <FaYoutube className="w-6 h-6 text-gray-700 cursor-pointer" />
              <FaPinterest className="w-6 h-6 text-gray-700 cursor-pointer" />
              <FaLinkedin className="w-6 h-6 text-gray-700 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 text-center text-sm text-gray-600">
          © 2024 Ambraee Enterprises. All Rights Reserved.
        </div>
      </div>
    </foot>
  );
};

export default Footer;
