import React from "react";
import { AiFillPhone, AiOutlineClockCircle } from "react-icons/ai";
import { BsChatSquareDots } from "react-icons/bs";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white relative z-20">
      <div className="flex items-center">
        <BsChatSquareDots
          size={20}
          className="text-[var(--primary-dark)] mr-2"
        />
        <h1 className="text-green-500 text-lg md:text-2xl lg:text-3xl font-bold">
          WORK
        </h1>
        {/* <h1 className="text-black text-lg md:text-2xl lg:text-3xl font-bold">
          SIDE Software
        </h1> */}
        <h1 className="text-black text-lg md:text-2xl lg:text-3xl font-bold">
          {"SIDE "}
        </h1>
        <h1 className="hidden md:flex text-black text-lg md:text-2xl lg:text-3xl font-bold ml-2">
          {"Software"}
        </h1>
      </div>
      <div className="flex space-x-16">
        <div className="hidden md:flex items-center px-6">
          <AiOutlineClockCircle
            size={20}
            className="mr-2 text-[var(--primary-dark)]"
          />
          <p className="text-base text-gray-800">Mon-Fri: 7am-5pm PST</p>
        </div>
        <div className="hidden md:flex items-center px-6">
          <AiFillPhone size={20} className="mr-2 text-[var(--primary-dark)]" />
          <p className="text-base text-gray-800">1-800-123-4567</p>
        </div>
        <Link 
          to="/registration" 
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold transition-colors"
        >
          Sign Up Now
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
