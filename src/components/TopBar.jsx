import React from "react";
import { AiFillPhone, AiOutlineClockCircle } from "react-icons/ai";
import { BsChatSquareDots } from "react-icons/bs";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="flex justify-between items-center px-2 sm:px-4 py-2 bg-white relative z-20">
      <div className="flex items-center">
        <BsChatSquareDots
          size={20}
          className="text-[var(--primary-dark)] mr-1 sm:mr-2"
        />
        <h1 className="text-green-500 text-base sm:text-lg md:text-2xl lg:text-3xl font-bold">
          WORK
        </h1>
        <h1 className="text-black text-base sm:text-lg md:text-2xl lg:text-3xl font-bold">
          {"SIDE "}
        </h1>
        <h1 className="hidden sm:flex text-black text-base sm:text-lg md:text-2xl lg:text-3xl font-bold ml-1 sm:ml-2">
          {"Software"}
        </h1>
      </div>
      
      {/* Mobile layout */}
      <div className="flex md:hidden items-center space-x-2">
        <a href="tel:18001234567" className="flex items-center text-gray-700 hover:text-green-600">
          <AiFillPhone size={18} />
        </a>
        <Link 
          to="/registration" 
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm font-semibold transition-colors min-h-[44px] flex items-center"
        >
          Sign Up
        </Link>
      </div>
      
      {/* Desktop layout */}
      <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
        <div className="flex items-center px-2 lg:px-4">
          <AiOutlineClockCircle
            size={20}
            className="mr-2 text-[var(--primary-dark)]"
          />
          <p className="text-sm lg:text-base text-gray-800">Mon-Fri: 7am-5pm PST</p>
        </div>
        <div className="flex items-center px-2 lg:px-4">
          <AiFillPhone size={20} className="mr-2 text-[var(--primary-dark)]" />
          <p className="text-sm lg:text-base text-gray-800">1-800-123-4567</p>
        </div>
        <Link 
          to="/registration" 
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold transition-colors min-h-[44px] flex items-center"
        >
          Sign Up Now
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
