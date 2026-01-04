import React from "react";
import { Link } from "react-router-dom";
import { APP_INFO } from "../constants/appInfo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-green-500 text-xl font-bold">WORK</span>
              <span className="text-white text-xl font-bold">SIDE</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {APP_INFO.tagline}. Transforming logistics through innovative software solutions.
            </p>
          </div>
          
          {/* Products & Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Products</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/products" className="text-gray-400 hover:text-green-400 transition-colors">Platform Overview</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-green-400 transition-colors">Services</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/support" className="text-gray-400 hover:text-green-400 transition-colors">Help Center</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-green-400 transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-green-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <p>{APP_INFO.phone.sales}</p>
              <a href={`mailto:${APP_INFO.email.contact}`} className="block hover:text-green-400 transition-colors">
                {APP_INFO.email.contact}
              </a>
              <p>{APP_INFO.businessHours}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Copyright Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {APP_INFO.copyrightYear} Copyright {APP_INFO.companyName}
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-500 hover:text-green-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-500 hover:text-green-400 transition-colors">Terms of Use</Link>
              <Link to="/policies" className="text-gray-500 hover:text-green-400 transition-colors">Policies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
