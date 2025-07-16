import React from "react";

const ContactWorkside = () => {
  return (
    <div className="w-full min-h-screen">
      <img
        src={process.env.PUBLIC_URL + "background.jpg"}
        alt="Background"
        className="w-full h-full object-cover fixed top-0 left-0 -z-10"
      />
      <div className="max-w-[1200px] m-auto pt-20 pb-8">
        <div className="w-full flex flex-col text-white p-4">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-4 text-center">
            Contact Workside Software
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl italic mb-8 text-center">
            Your Efficiency Partner
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Sales & Inquiries */}
            <div className="bg-black/40 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4 text-green-300">💼 Sales & Product Inquiries</h3>
              <div className="space-y-3">
                <p className="text-sm">Discover how our software solutions can transform your operations.</p>
                <div>
                  <p className="font-semibold text-green-200">Email:</p>
                  <a href="mailto:contact@worksidesoftware.com" className="text-green-300 underline text-sm">
                    contact@worksidesoftware.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-green-200">Phone:</p>
                  <a href="tel:8885557777" className="text-green-300">1-888-555-7777</a>
                </div>
              </div>
            </div>

            {/* Customer Support */}
            <div className="bg-black/40 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4 text-green-300">🛠️ Customer Support</h3>
              <div className="space-y-3">
                <p className="text-sm">Existing clients needing assistance with our solutions.</p>
                <div>
                  <p className="font-semibold text-green-200">Email:</p>
                  <a href="mailto:support@worksidesoftware.com" className="text-green-300 underline text-sm">
                    support@worksidesoftware.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-green-200">Phone:</p>
                  <a href="tel:8885556666" className="text-green-300">1-888-555-6666</a>
                </div>
                <div>
                  <p className="font-semibold text-green-200">Hours:</p>
                  <p className="text-sm">Mon-Fri: 7am-5pm PST</p>
                </div>
              </div>
            </div>

            {/* Careers */}
            <div className="bg-black/40 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4 text-green-300">🚀 Careers</h3>
              <div className="space-y-3">
                <p className="text-sm">Join our team and help shape the future of logistics technology.</p>
                <div>
                  <p className="font-semibold text-green-200">Email:</p>
                  <a href="mailto:careers@worksidesoftware.com" className="text-green-300 underline text-sm">
                    careers@worksidesoftware.com
                  </a>
                </div>
                <div>
                  <a href="/contact" className="inline-block bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-semibold transition-colors">
                    View Opportunities
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Contact Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-green-900/30 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-green-300">Get In Touch</h3>
              <p className="mb-4 text-gray-200">
                Whether you're seeking solutions to complex challenges, interested in learning more about our innovative software, 
                or have questions about how we can support your business objectives, our team is ready to help.
              </p>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-green-200">Website:</p>
                  <a href="https://www.worksidesoftware.com" className="text-green-300 underline">
                    www.worksidesoftware.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-green-200">Location:</p>
                  <p className="text-gray-200">Bakersfield, CA</p>
                </div>
              </div>
            </div>

            <div className="bg-green-900/30 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-green-300">Connect With Us</h3>
              <p className="mb-4 text-gray-200">
                Stay connected with Workside Software through our social media channels for the latest news, 
                insights, and innovations in logistics technology.
              </p>
              <div className="flex space-x-4">
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-semibold transition-colors">
                  LinkedIn
                </button>
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-semibold transition-colors">
                  Twitter
                </button>
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-semibold transition-colors">
                  Facebook
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-black/40 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-4 text-green-300">Ready to Get Started?</h3>
            <p className="mb-6 text-gray-200">
              Experience the power of integrated logistics management with Workside Software.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/products" className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded font-semibold transition-colors">
                View Products
              </a>
              <a href="/support" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold transition-colors">
                Get Support
              </a>
              <a href="/registration" className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded font-semibold transition-colors">
                Register Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactWorkside;
