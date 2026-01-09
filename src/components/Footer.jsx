import React from "react";
import { Link } from "react-router-dom";
import { APP_INFO } from "../constants/appInfo";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container-max section-spacing">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Brand */}
          <div className="flex-shrink-0">
            <p className="text-sm font-medium text-gray-600">Workside Software</p>
          </div>
          
          {/* Navigation Links */}
          <div className="flex flex-wrap gap-6">
            <Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy</Link>
            <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms</Link>
            <Link to="/support" className="text-sm text-gray-600 hover:text-gray-900">Support</Link>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500">© {APP_INFO.copyrightYear} Workside Software LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
