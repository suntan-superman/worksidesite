import React from "react";

const Privacy = () => {
  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="py-16 md:py-20 border-b border-gray-200">
        <div className="container-max">
          <h1 className="mb-3">Privacy Policy</h1>
          <p className="text-gray-600">How we protect and handle your information</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-max section-spacing max-w-3xl">
        <div className="space-y-12">
          <section>
            <h2 className="mb-4">1. Information We Collect</h2>
            <div className="space-y-3 text-gray-600">
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-1">Account Information</h3>
                <p>Name, email address, phone number, company information, and user credentials.</p>
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-1">Usage Data</h3>
                <p>App interactions, feature usage, performance metrics, and system logs.</p>
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-1">Location Data</h3>
                <p>GPS coordinates for delivery tracking and route optimization (with permission).</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4">2. How We Use Information</h2>
            <ul className="space-y-2 text-gray-600">
              <li>Provide and improve our logistics management services</li>
              <li>Process service requests and coordinate vendor assignments</li>
              <li>Send notifications about job status and updates</li>
              <li>Analyze usage patterns to enhance platform functionality</li>
              <li>Provide customer support and technical assistance</li>
              <li>Ensure platform security and prevent unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4">3. Data Security</h2>
            <p className="text-gray-600 mb-3">We implement industry-standard security measures including:</p>
            <ul className="space-y-2 text-gray-600">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication requirements</li>
              <li>Secure data centers with physical and network security</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4">4. Your Rights</h2>
            <p className="text-gray-600 mb-3">You have the right to:</p>
            <ul className="space-y-2 text-gray-600">
              <li>Access and review your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Delete your account and associated data</li>
              <li>Opt out of marketing communications</li>
              <li>Control location sharing and other permissions</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4">5. Contact Us</h2>
            <p className="text-gray-600 mb-2">For privacy-related questions or requests:</p>
            <p className="text-base">
              <a href="mailto:privacy@worksidesoftware.com" className="font-medium hover:text-gray-600">
                privacy@worksidesoftware.com
              </a>
            </p>
          </section>

          <section className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Last updated: January 2026
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
