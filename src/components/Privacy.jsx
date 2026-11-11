import React from "react";

const Privacy = () => {
  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="py-16 md:py-20 border-b border-gray-200">
        <div className="container-max">
          <h1 className="mb-3">Privacy Policy</h1>
          <p className="text-gray-600">Information about Workside products and project inquiries</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-max section-spacing max-w-3xl">
        <div className="space-y-12">
          <section>
            <h2 className="mb-4">About this website</h2>
            <p className="text-gray-600">When you submit a project inquiry, we store the name, email address, project details, and any optional company or phone information you provide so we can review the request and follow up. Inquiry records are stored in Workside Software’s Firestore project and are accessed through authorized Workside systems. The website does not write inquiry data directly from your browser to Firestore.</p>
          </section>
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
              <li>Access controls and authentication requirements for account-based products</li>
              <li>Security practices appropriate to the product and the information it handles</li>
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
