import React from "react";

const Support = () => {
  return (
    <div className="w-full min-h-screen">
      <img
        src={process.env.PUBLIC_URL + "background.jpg"}
        alt="Background"
        className="w-full h-full object-cover fixed top-0 left-0 -z-10"
      />
      <div className="max-w-[1200px] m-auto pt-24 pb-8">
        <div className="w-full flex flex-col text-white p-4">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-4">
            Workside Software Support
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl italic mb-6">
            We're Here to Help
          </h2>
          
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-bold mb-3 text-green-300">App Support</h3>
              <div className="bg-black/40 p-4 rounded-lg">
                <p className="mb-2"><strong>Workside Host App:</strong> Web-based admin dashboard for managing logistics operations</p>
                <p className="mb-2"><strong>Workside Client App:</strong> Mobile app for submitting service requests and tracking progress</p>
                <p className="mb-2"><strong>Workside Supplier App:</strong> Mobile app for suppliers to receive bids and manage deliveries</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-green-300">Contact Support</h3>
              <div className="bg-black/40 p-4 rounded-lg space-y-3">
                <div>
                  <h4 className="font-semibold text-green-200">Email Support</h4>
                  <p>General Support: <a href="mailto:support@worksidesoftware.com" className="text-green-300 underline">support@worksidesoftware.com</a></p>
                  <p>Technical Issues: <a href="mailto:tech@worksidesoftware.com" className="text-green-300 underline">tech@worksidesoftware.com</a></p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-200">Phone Support</h4>
                  <p>Customer Support: <span className="text-green-300">1-888-555-6666</span></p>
                  <p>Technical Support: <span className="text-green-300">1-888-555-TECH (8324)</span></p>
                  <p className="text-sm">Hours: Monday - Friday, 7:00 AM - 5:00 PM PST</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-green-300">Getting Started</h3>
              <div className="bg-black/40 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-2">
                  <li>Download the appropriate Workside app from the App Store</li>
                  <li>Create your account or log in with existing credentials</li>
                  <li>Complete your profile setup</li>
                  <li>For enterprise clients: Contact support for organization setup</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-green-300">System Requirements</h3>
              <div className="bg-black/40 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-200 mb-2">iOS Requirements</h4>
                    <ul className="text-sm space-y-1">
                      <li>• iOS 13.0 or later</li>
                      <li>• iPhone 6s or newer</li>
                      <li>• iPad (6th generation) or newer</li>
                      <li>• Internet connection required</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-200 mb-2">Web App Requirements</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Modern web browser (Chrome, Safari, Firefox)</li>
                      <li>• Stable internet connection</li>
                      <li>• Screen resolution: 1024x768 minimum</li>
                      <li>• JavaScript enabled</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-green-300">Troubleshooting</h3>
              <div className="bg-black/40 p-4 rounded-lg">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-green-200">Login Issues</h4>
                    <p className="text-sm">Reset your password or contact support if you're unable to access your account.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-200">App Performance</h4>
                    <p className="text-sm">Ensure you have the latest app version and sufficient device storage.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-200">Connectivity Issues</h4>
                    <p className="text-sm">Check your internet connection and app permissions.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-green-300">Additional Resources</h3>
              <div className="bg-black/40 p-4 rounded-lg">
                <ul className="space-y-2">
                  <li>• <a href="/faq" className="text-green-300 underline">Frequently Asked Questions (FAQ)</a></li>
                  <li>• <a href="/terms" className="text-green-300 underline">Terms of Use</a></li>
                  <li>• <a href="/privacy" className="text-green-300 underline">Privacy Policy</a></li>
                  <li>• Email updates: <a href="mailto:support@worksidesoftware.com" className="text-green-300 underline">support@worksidesoftware.com</a></li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support; 