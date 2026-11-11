import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const closeNav = () => setShowMobileMenu(false);

  return (
    <nav className="main-nav" aria-label="Main navigation">
      <ul className="desktop-nav">
        <li>
          <Link className="text-sm md:text-base lg:text-lg py-8 text-white font-medium hover:text-gray-300 transition-colors" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="text-sm md:text-base lg:text-lg py-8 text-white font-medium hover:text-gray-300 transition-colors" to="/work">
            Our Work
          </Link>
        </li>
        <li>
          <Link className="text-sm md:text-base lg:text-lg py-8 text-white font-medium hover:text-gray-300 transition-colors" to="/services">
            Services
          </Link>
        </li>
        <li>
          <Link className="text-sm md:text-base lg:text-lg py-8 text-white font-medium hover:text-gray-300 transition-colors" to="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="text-sm md:text-base lg:text-lg py-8 text-white font-medium hover:text-gray-300 transition-colors" to="/contact">
            Contact
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
      <button 
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="sm:hidden z-10 p-2 hover:bg-gray-700 rounded transition-colors"
        aria-label="Toggle navigation menu"
        aria-expanded={showMobileMenu}
      >
        <FaBars size={20} className="text-white" />
      </button>
      
      {/* Mobile Menu */}
      <div
        className={
          showMobileMenu
            ? "fixed md:hidden ease-in duration-300 inset-0 z-50 bg-black/95"
            : "hidden"
        }
        aria-hidden={!showMobileMenu}
      >
        <div className="flex flex-col h-full">
          {/* Mobile menu header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-600">
            <h2 className="text-white text-lg font-bold">Menu</h2>
            <button 
              onClick={closeNav}
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
                onClick={closeNav}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="block text-white text-lg py-4 px-6 hover:bg-green-600 transition-colors border-b border-gray-700"
                to="/work"
                onClick={closeNav}
              >
                Our Work
              </Link>
            </li>
            <li>
              <Link
                className="block text-white text-lg py-4 px-6 hover:bg-green-600 transition-colors border-b border-gray-700"
                to="/services"
                onClick={closeNav}
              >
                Services
              </Link>
            </li>
            <li><Link className="block text-white text-lg py-4 px-6 hover:bg-green-600 transition-colors border-b border-gray-700" to="/about" onClick={closeNav}>About</Link></li>
            <li><Link className="block text-white text-lg py-4 px-6 hover:bg-green-600 transition-colors border-b border-gray-700" to="/contact" onClick={closeNav}>Contact</Link></li>
            <li>
              <Link
                className="block text-white text-lg py-4 px-6 hover:bg-green-600 transition-colors border-b border-gray-700"
                to="/support"
                onClick={closeNav}
              >
                🆘 Support
              </Link>
            </li>
            <li>
              <Link
                className="block text-white text-lg py-4 px-6 hover:bg-green-600 transition-colors border-b border-gray-700"
                to="/faq"
                onClick={closeNav}
              >
                ❓ FAQ
              </Link>
            </li>
            <li>
              <Link
                className="block text-white text-lg py-4 px-6 hover:bg-green-600 transition-colors border-b border-gray-700"
                to="/policies"
                onClick={closeNav}
              >
                📋 Policies
              </Link>
            </li>
            <li>
              <Link
                className="block text-white text-lg py-4 px-6 hover:bg-green-600 transition-colors border-b border-gray-700"
                to="/terms"
                onClick={closeNav}
              >
                📜 Terms
              </Link>
            </li>
          </ul>
          
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
