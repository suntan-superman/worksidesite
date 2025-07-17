import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleNav = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className="w-full min-h-[50px] flex justify-between items-center relative z-10 text-white bg-gray-800">
      <ul className="hidden sm:flex px-4">
        <li>
          <Link className="text-sm md:text-base lg:text-lg py-8" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="text-sm md:text-base lg:text-lg py-8" to="/products">
            Products
          </Link>
        </li>
        <li>
          <Link className="text-sm md:text-base lg:text-lg py-8" to="/services">
            Services
          </Link>
        </li>
        <li>
          <Link className="text-sm md:text-base lg:text-lg py-8" to="/contact">
            Contact
          </Link>
        </li>

        <li>
          <Link className="text-sm md:text-base lg:text-lg py-8" to="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="text-sm md:text-base lg:text-lg py-8" to="/policies">
            Policies
          </Link>
        </li>
        <li>
          <Link className="text-sm md:text-base lg:text-lg py-8" to="/support">
            Support
          </Link>
        </li>
        <li>
          <Link className="text-sm md:text-base lg:text-lg py-8" to="/faq">
            FAQ
          </Link>
        </li>
        <li>
          <Link className="text-sm md:text-base lg:text-lg py-8" to="/terms">
            Terms
          </Link>
        </li>
        {/* ////////////////////////////////////////////////////////////////////// */}
        {/* Temporary Until I Can Get SMS Approval */}
        {/* ////////////////////////////////////////////////////////////////////// */}
        {/* <li>
          <Link
            className="text-lg md:text-xl lg:text-2xl py-8"
            to="/smstextoptinform"
          >
            SMS Program
          </Link>
        </li> */}
      </ul>
      <div className="flex justify-between">
        <FaFacebookF className="mx-4" />
        <FaTwitter className="mx-4" />
        <FaGooglePlusG className="mx-4" />
        <FaInstagram className="mx-4" />
      </div>
      {/* Hamburger Icon */}
      <button 
        onClick={handleNav} 
        className="sm:hidden z-10 p-2 hover:bg-gray-700 rounded transition-colors"
        aria-label="Toggle navigation menu"
      >
        <FaBars size={20} className="text-white" />
      </button>
      
      {/* Mobile Menu */}
      <div
        className={
          showMobileMenu
            ? "fixed md:hidden ease-in duration-300 inset-0 z-50 bg-black/95"
            : "fixed top-0 left-[-100%] ease-in duration-500 z-50"
        }
      >
        <div className="flex flex-col h-full">
          {/* Mobile menu header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-600">
            <h2 className="text-white text-lg font-bold">Menu</h2>
            <button 
              onClick={handleNav}
              className="p-2 hover:bg-gray-700 rounded transition-colors"
              aria-label="Close navigation menu"
            >
              <FaTimes size={20} className="text-white" />
            </button>
          </div>
          
          {/* Mobile menu items */}
          <ul className="flex-1 flex flex-col py-4">
            <li>
              <Link 
                className="block text-white text-lg py-4 px-6 hover:bg-green-600 transition-colors border-b border-gray-700"
                to="/"
                onClick={handleNav}
              >
                🏠 Home
              </Link>
            </li>
            <li>
              <Link
                className="block text-white text-lg py-4 px-6 hover:bg-green-600 transition-colors border-b border-gray-700"
                to="/products"
                onClick={handleNav}
              >
                📱 Products
              </Link>
            </li>
            <li>
              <Link
                className="block text-white text-lg py-4 px-6 hover:bg-green-600 transition-colors border-b border-gray-700"
                to="/services"
                onClick={handleNav}
              >
                🔧 Services
              </Link>
            </li>
            <li>
              <Link 
                className="block text-white text-lg py-4 px-6 hover:bg-green-600 transition-colors border-b border-gray-700" 
                to="/contact"
                onClick={handleNav}
              >
                📞 Contact
              </Link>
            </li>
            <li>
              <Link
                className="block text-white text-lg py-4 px-6 hover:bg-green-600 transition-colors border-b border-gray-700"
                to="/support"
                onClick={handleNav}
              >
                🆘 Support
              </Link>
            </li>
            <li>
              <Link
                className="block text-white text-lg py-4 px-6 hover:bg-green-600 transition-colors border-b border-gray-700"
                to="/faq"
                onClick={handleNav}
              >
                ❓ FAQ
              </Link>
            </li>
            <li>
              <Link
                className="block text-white text-lg py-4 px-6 hover:bg-green-600 transition-colors border-b border-gray-700"
                to="/policies"
                onClick={handleNav}
              >
                📋 Policies
              </Link>
            </li>
            <li>
              <Link
                className="block text-white text-lg py-4 px-6 hover:bg-green-600 transition-colors border-b border-gray-700"
                to="/terms"
                onClick={handleNav}
              >
                📜 Terms
              </Link>
            </li>
          </ul>
          
          {/* Mobile menu footer with social icons */}
          <div className="border-t border-gray-600 p-6">
            <p className="text-gray-400 text-sm mb-4 text-center">Follow Us</p>
            <div className="flex justify-center space-x-6">
              <FaFacebookF className="text-white hover:text-green-400 cursor-pointer" size={20} />
              <FaTwitter className="text-white hover:text-green-400 cursor-pointer" size={20} />
              <FaGooglePlusG className="text-white hover:text-green-400 cursor-pointer" size={20} />
              <FaInstagram className="text-white hover:text-green-400 cursor-pointer" size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
