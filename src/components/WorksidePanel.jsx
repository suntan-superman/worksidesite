import React from "react";
import { Link } from "react-router-dom";
import { APP_INFO } from "../constants/appInfo";

const WorksidePanel = () => {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <div className="py-16 md:py-20">
        <div className="text-center container-max">
          <h1 className="mb-6">Logistics management made simple.</h1>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-600 md:text-xl">
            Streamline your operations with our comprehensive platform designed for teams that value clarity and efficiency.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/contact" className="inline-block btn-primary">
              Get Started
            </Link>
            <a href={`tel:${APP_INFO.phone.main}`} className="inline-block btn-secondary">
              Call us: {APP_INFO.phone.main}
            </a>
          </div>
        </div>
      </div>

      {/* Value Proposition Sections */}
      <div className="py-8 bg-gray-50 md:py-12">
        <div className="container-max">
          <div className="grid gap-16 md:grid-cols-2">
            {/* Section 1 */}
            <div>
              <h2 className="mb-4">Designed for your team</h2>
              <p>
                Workside brings clarity to complex logistics. Our platform helps teams coordinate vendors, 
                track deliveries in real-time, and make decisions with confidence.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="mb-4">Built to scale with you</h2>
              <p>
                Whether you're managing a single operation or coordinating across multiple locations, 
                Workside grows with your business without adding complexity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-10 md:py-14">
        <div className="container-max">
          <h2 className="mb-16 text-center">Core capabilities</h2>
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <h3 className="mb-3">Real-time tracking</h3>
              <p className="text-gray-600">
                Monitor all deliveries as they happen with live GPS tracking and instant notifications.
              </p>
            </div>
            <div>
              <h3 className="mb-3">Smart vendor management</h3>
              <p className="text-gray-600">
                Connect with qualified suppliers, compare bids, and build lasting partnerships.
              </p>
            </div>
            <div>
              <h3 className="mb-3">Powerful analytics</h3>
              <p className="text-gray-600">
                Understand your operations with clear insights into performance and spending.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-10 bg-gray-50 md:py-12">
        <div className="text-center container-max">
          <h2 className="mb-4">Ready to get started?</h2>
          <p className="max-w-xl mx-auto mb-8 text-gray-600">
            Contact our team to schedule a demo and see how Workside can transform your logistics.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/contact" className="inline-block btn-primary">
              Schedule a demo
            </Link>
            <a href={`mailto:${APP_INFO.email.contact}`} className="inline-block btn-secondary">
              Email us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksidePanel;
