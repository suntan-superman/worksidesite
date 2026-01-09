import React from "react";
import { Link } from "react-router-dom";
import { APP_INFO } from "../constants/appInfo";

const TopBar = () => {
  return (
    <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container-max flex justify-between items-center py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-xl font-semibold text-gray-900">Workside Software</span>
        </Link>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/support" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Support</Link>
          <Link to="/faq" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">FAQ</Link>
          <Link to="/policies" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Policies</Link>
          <Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Privacy</Link>
          <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Terms</Link>
        </nav>
        
        {/* Mobile Menu - simplified */}
        <div className="md:hidden">
          <a href={`tel:${APP_INFO.phone.main}`} className="text-sm text-gray-600 hover:text-gray-900">
            {APP_INFO.phone.main}
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
