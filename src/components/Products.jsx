import * as React from "react";
import { useState } from "react";
import "../index.css";

const Products = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const hostScreenshots = [
    {
      src: "host-dashboard.png",
      title: "Main Dashboard",
      description: "Comprehensive overview of all logistics operations"
    },
    {
      src: "host-live-tracker.png", 
      title: "Live Tracking",
      description: "Real-time tracking of all deliveries and routes"
    },
    {
      src: "host-request-details.png",
      title: "Request Management", 
      description: "Detailed request management and vendor coordination"
    },
    {
      src: "host-create-project.png",
      title: "Project Creation",
      description: "Easy project setup and configuration"
    },
    {
      src: "host-signup.png",
      title: "User Registration",
      description: "Simple onboarding process for new users"
    },
    {
      src: "host-login.png",
      title: "Secure Login",
      description: "Secure authentication system"
    }
  ];

  const clientScreenshots = [
    {
      src: "client-project-request-list.png",
      title: "Project Request List",
      description: "View and manage all your service requests"
    },
    {
      src: "client-live-request-tracking (1).png",
      title: "Live Request Tracking",
      description: "Real-time tracking of your requests and deliveries"
    }
  ];

  return (
    <div className="w-full min-h-screen">
      <img
        src={process.env.PUBLIC_URL + "background.jpg"}
        alt="Background"
        className="w-full h-full object-cover fixed top-0 left-0 -z-10"
      />
      <div className="max-w-[1200px] m-auto pt-10 pb-8">
        <div className="w-full flex flex-col text-white p-4">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-4 text-center text-white">
            Workside Software Platform
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl italic mb-8 text-center">
            Complete Logistics Management Solution
          </h2>
          
          <div className="mb-8 bg-black/40 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-white">Platform Overview</h3>
            <div className="grid md:grid-cols-3 gap-6 text-base md:text-base">
              <div className="bg-black/40 p-4 rounded-lg border border-gray-600">
                <h4 className="font-semibold text-white mb-2">🖥️ Web Host App</h4>
                <p className="text-white">Administrative dashboard for managing operations, vendor selection, and real-time tracking</p>
              </div>
              <div className="bg-black/40 p-4 rounded-lg border border-gray-600">
                <h4 className="font-semibold text-white mb-2">📱 Client Mobile App</h4>
                <p className="text-white">Submit requests, track progress, and manage vendor relationships on the go</p>
              </div>
              <div className="bg-black/40 p-4 rounded-lg border border-gray-600">
                <h4 className="font-semibold text-white mb-2">🚚 Supplier Mobile App</h4>
                <p className="text-white">Receive bids, navigate routes, and manage deliveries with real-time updates</p>
              </div>
            </div>
          </div>

          {/* Host App Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-white">🖥️ Web Host App Features</h3>
            <p className="mb-6 text-white">
              Explore the comprehensive features of our Web Host application through these live screenshots from the platform:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostScreenshots.map((screenshot, index) => (
                <div 
                  key={index} 
                  className="bg-black/40 p-4 rounded-lg hover:bg-black/60 transition-all cursor-pointer"
                  onClick={() => setSelectedImage(screenshot)}
                >
                  <img
                    src={process.env.PUBLIC_URL + screenshot.src}
                    alt={screenshot.title}
                    className="w-full h-48 object-cover rounded-lg mb-3 hover:scale-105 transition-transform"
                  />
                  <h4 className="font-semibold text-green-200 mb-2">{screenshot.title}</h4>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{screenshot.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Client Mobile App Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-green-300">📱 Client Mobile App Features</h3>
            <p className="mb-6 text-gray-200">
              See how easy it is to submit requests and track progress with our intuitive mobile application:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {clientScreenshots.map((screenshot, index) => (
                <div 
                  key={index} 
                  className="bg-black/40 p-4 rounded-lg hover:bg-black/60 transition-all cursor-pointer"
                  onClick={() => setSelectedImage(screenshot)}
                >
                  <img
                    src={process.env.PUBLIC_URL + screenshot.src}
                    alt={screenshot.title}
                    className="w-full h-64 object-cover rounded-lg mb-3 hover:scale-105 transition-transform"
                  />
                  <h4 className="font-semibold text-green-200 mb-2">{screenshot.title}</h4>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{screenshot.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-black/40 p-6 rounded-lg text-center border border-gray-600">
            <h3 className="text-xl font-bold mb-3 text-white">Ready to Get Started?</h3>
            <p className="mb-4 text-white">Experience the power of integrated logistics management</p>
            <div className="space-y-2">
              <p className="text-white">📞 Contact Sales: <a href="tel:202-933-5631" className="text-white font-medium hover:underline">202-933-5631</a></p>
              <p className="text-white">📧 Email: <a href="mailto:contact@worksidesoftware.com" className="text-white font-medium hover:underline">contact@worksidesoftware.com</a></p>
              <p className="mt-3">
                <a href="/contact" className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-2 rounded font-semibold transition-colors">
                  Request Demo
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-[90vh] bg-white/10 p-4 rounded-lg">
            <img
              src={process.env.PUBLIC_URL + selectedImage.src}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded"
            />
            <div className="text-center mt-4 text-white">
              <h4 className="font-bold text-lg">{selectedImage.title}</h4>
              <p className="text-white">{selectedImage.description}</p>
              <button 
                className="mt-2 bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded font-semibold"
                onClick={() => setSelectedImage(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
