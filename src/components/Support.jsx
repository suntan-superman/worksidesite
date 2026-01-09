import React from "react";
import { Link } from "react-router-dom";
import { APP_INFO } from "../constants/appInfo";

const Support = () => {
  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="py-16 md:py-20 border-b border-gray-200">
        <div className="container-max">
          <h1 className="mb-3">Support & Help</h1>
          <p className="text-lg text-gray-600">We're here to help you succeed with Workside.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max section-spacing">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Methods */}
          <div>
            <h2 className="mb-8">Get in touch</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="mb-2">Phone</h3>
                <a href={`tel:${APP_INFO.phone.main}`} className="text-base font-medium hover:text-gray-600">
                  {APP_INFO.phone.main}
                </a>
              </div>
              
              <div>
                <h3 className="mb-2">Email</h3>
                <a href={`mailto:${APP_INFO.email.support}`} className="text-base font-medium hover:text-gray-600">
                  {APP_INFO.email.support}
                </a>
              </div>
              
              <div>
                <h3 className="mb-2">Hours</h3>
                <p className="text-gray-600">{APP_INFO.businessHours}</p>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h2 className="mb-8">Resources</h2>
            
            <div className="space-y-4">
              <Link to="/faq" className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <h3 className="text-base font-medium mb-1">Frequently Asked Questions</h3>
                <p className="text-sm text-gray-600">Find answers to common questions</p>
              </Link>
              
              <Link to="/privacy" className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <h3 className="text-base font-medium mb-1">Privacy Policy</h3>
                <p className="text-sm text-gray-600">Learn how we protect your data</p>
              </Link>
              
              <Link to="/terms" className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <h3 className="text-base font-medium mb-1">Terms of Use</h3>
                <p className="text-sm text-gray-600">Review our terms and conditions</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Common Issues */}
      <div className="bg-gray-50 py-20 md:py-24">
        <div className="container-max">
          <h2 className="mb-12">Common issues</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="mb-3">Account access</h3>
              <p className="text-gray-600 mb-4">
                Having trouble logging in? Reset your password or contact support for help regaining access.
              </p>
            </div>
            
            <div>
              <h3 className="mb-3">Performance</h3>
              <p className="text-gray-600 mb-4">
                If the app is running slowly, check your internet connection and ensure you're using the latest version.
              </p>
            </div>
            
            <div>
              <h3 className="mb-3">Technical issues</h3>
              <p className="text-gray-600 mb-4">
                For technical problems, try clearing your cache or contacting our technical support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support; 