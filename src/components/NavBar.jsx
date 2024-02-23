import React, { useState } from "react";
import {
  FaBars,
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
    <div className="w-full min-h-[50px] flex justify-between items-center absolute z-10 text-white bg-gray-700/80">
      <ul className="hidden sm:flex px-4">
        <li>
          <Link className="text-lg md:text-xl lg:text-2xl py-8" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="text-lg md:text-xl lg:text-2xl py-8" to="/products">
            Products
          </Link>
        </li>
        <li>
          <Link className="text-lg md:text-xl lg:text-2xl py-8" to="/services">
            Services
          </Link>
        </li>
        <li>
          <Link className="text-lg md:text-xl lg:text-2xl py-8" to="/contact">
            Contact
          </Link>
        </li>
        <li>
          <Link className="text-lg md:text-xl lg:text-2xl py-8" to="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="text-lg md:text-xl lg:text-2xl py-8" to="/policies">
            Policies
          </Link>
        </li>
      </ul>
      <div className="flex justify-between">
        <FaFacebookF className="mx-4" />
        <FaTwitter className="mx-4" />
        <FaGooglePlusG className="mx-4" />
        <FaInstagram className="mx-4" />
      </div>
      {/* Hamburger Icon */}
      <div onClick={handleNav} className="sm:hidden z-10">
        <FaBars size={20} className="mr-4 cursor-pointer" />
      </div>
      {/* Mobile Menu */}
      <div
        onClick={handleNav}
        className={
          showMobileMenu
            ? "overflow-y-hidden md:hidden ease-in duration-300 absolute text-gray-300 left-0 top-0 h-screen bg-black/90 px-4 py-7 flex-col"
            : "absolute top-0 h-screen left-[-100%] ease-in duration-500"
        }
      >
        <ul className="h-full w-full text-center pt-12">
          <li>
            <Link className="text-lg md:text-xl lg:text-2xl py-8" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-lg md:text-xl lg:text-2xl py-8"
              to="/products"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              className="text-lg md:text-xl lg:text-2xl py-8"
              to="/services"
            >
              Services
            </Link>
          </li>
          <li>
            <Link className="text-lg md:text-xl lg:text-2xl py-8" to="/contact">
              Contact
            </Link>
          </li>
          <li>
            <Link className="text-lg md:text-xl lg:text-2xl py-8" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link
              className="text-lg md:text-xl lg:text-2xl py-8"
              to="/policies"
            >
              Policies
            </Link>
          </li>
          <li>
            <Link
              className="text-lg md:text-xl lg:text-2xl py-8"
              to="/smstextoptinform"
            >
              SMS Text Opt-In
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
