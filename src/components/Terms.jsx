import React from "react";

const Terms = () => {
  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="py-16 md:py-20 border-b border-gray-200">
        <div className="container-max">
          <h1 className="mb-3">Terms of Use</h1>
          <p className="text-gray-600">General terms for Workside services</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-max section-spacing max-w-3xl">
        <div className="space-y-12">
          <section>
            <h2 className="mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing or using Workside Software, you agree to be bound by these Terms of Use and our Privacy Policy. 
              If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="mb-4">2. Description of Service</h2>
            <p className="text-gray-600 mb-4">
              Workside Software develops and operates software products and provides custom software development services. Product features and client project deliverables vary by engagement. When Workside provides access to a particular product or performs work under a separate written agreement, that agreement and any product-specific terms also apply.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Software products:</strong> Product features are described in the applicable product materials and may change over time.</li>
              <li><strong>Custom development:</strong> Project scope, delivery, fees, and ownership are governed by the applicable written agreement.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4">3. User Accounts</h2>
            <ul className="space-y-2 text-gray-600">
              <li>You must create an account to access our platform</li>
              <li>You are responsible for maintaining account confidentiality</li>
              <li>You must provide accurate and complete information during registration</li>
              <li>You are responsible for all activities under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4">4. Acceptable Use</h2>
            <p className="text-gray-600 mb-3">You agree to use our platform only for legitimate business purposes. You will not:</p>
            <ul className="space-y-2 text-gray-600">
              <li>Violate any applicable laws or regulations</li>
              <li>Submit false or misleading information</li>
              <li>Attempt unauthorized access to our systems</li>
              <li>Transmit viruses or malware</li>
              <li>Interfere with platform integrity or performance</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4">5. Intellectual Property</h2>
            <p className="text-gray-600">
              The Workside Software platform and all related content are our intellectual property. You receive a limited license 
              to use our software for business purposes. You may not copy, modify, distribute, or reverse engineer our software.
            </p>
          </section>

          <section>
            <h2 className="mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-600">
              Our liability is limited to the amount paid for services in the preceding 12 months. We are not liable for indirect, 
              incidental, or consequential damages. You use our platform at your own risk.
            </p>
          </section>

          <section>
            <h2 className="mb-4">7. Changes to Terms</h2>
            <p className="text-gray-600">
              We may modify these terms with reasonable notice. Continued use after changes constitutes acceptance.
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

export default Terms;
