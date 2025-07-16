import React from "react";

const Terms = () => {
  return (
    <div className="w-full min-h-screen">
      <img
        src={process.env.PUBLIC_URL + "background.jpg"}
        alt="Background"
        className="w-full h-full object-cover fixed top-0 left-0 -z-10"
      />
      <div className="max-w-[1200px] m-auto pt-12 pb-8">
        <div className="w-full flex flex-col text-white p-4">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-4">
            Terms of Use
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl italic mb-6">
            Workside Software Platform Agreement
          </h2>
          
          <div className="space-y-6 text-sm md:text-base">
            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">1. Acceptance of Terms</h3>
              <p>
                By accessing or using any Workside Software application (Web Host App, Client Mobile App, or Supplier Mobile App), 
                you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, 
                please do not use our services.
              </p>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">2. Description of Service</h3>
              <p className="mb-3">
                Workside Software provides a logistics management platform consisting of:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Web Host App:</strong> Administrative dashboard for managing logistics operations, vendor selection, and performance tracking</li>
                <li><strong>Client Mobile App:</strong> Mobile application for submitting service requests, tracking progress, and managing vendor relationships</li>
                <li><strong>Supplier Mobile App:</strong> Mobile application for suppliers to receive requests, submit bids, and manage service delivery</li>
              </ul>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">3. User Accounts and Registration</h3>
              <div className="space-y-2">
                <p>• You must create an account to access most features of our platform</p>
                <p>• You are responsible for maintaining the confidentiality of your account credentials</p>
                <p>• You must provide accurate, current, and complete information during registration</p>
                <p>• You are responsible for all activities that occur under your account</p>
                <p>• Organizations may manage multiple user accounts under a single enterprise agreement</p>
              </div>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">4. Acceptable Use</h3>
              <div className="space-y-2">
                <p><strong>You agree to use our platform only for legitimate business purposes. You will NOT:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Submit false, misleading, or fraudulent information</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use the platform for any illegal or unauthorized purpose</li>
                  <li>Interfere with or disrupt the integrity or performance of the platform</li>
                  <li>Transmit viruses, malware, or other harmful content</li>
                </ul>
              </div>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">5. Payment and Billing</h3>
              <div className="space-y-2">
                <p>• Subscription fees are billed according to your chosen plan</p>
                <p>• Payments are due in advance and are non-refundable except as required by law</p>
                <p>• We may modify pricing with 30 days advance notice</p>
                <p>• You are responsible for all taxes related to your use of the service</p>
                <p>• Services may be suspended for non-payment</p>
              </div>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">6. Data and Privacy</h3>
              <div className="space-y-2">
                <p>• Your use of our platform is subject to our Privacy Policy</p>
                <p>• You retain ownership of your business data</p>
                <p>• We may collect analytics and usage data to improve our services</p>
                <p>• You are responsible for backing up your important data</p>
                <p>• We implement security measures to protect your data</p>
              </div>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">7. Intellectual Property</h3>
              <div className="space-y-2">
                <p>• The Workside Software platform and all related content are our intellectual property</p>
                <p>• You receive a limited license to use our software for business purposes</p>
                <p>• You may not copy, modify, distribute, or reverse engineer our software</p>
                <p>• All trademarks and service marks are property of their respective owners</p>
              </div>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">8. Third-Party Integrations</h3>
              <div className="space-y-2">
                <p>• Our platform may integrate with third-party services (ERP systems, payment processors, etc.)</p>
                <p>• Use of third-party services is subject to their respective terms</p>
                <p>• We are not responsible for third-party service availability or functionality</p>
                <p>• You may need separate agreements with integrated service providers</p>
              </div>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">9. Service Availability</h3>
              <div className="space-y-2">
                <p>• We strive for high availability but cannot guarantee uninterrupted service</p>
                <p>• Planned maintenance will be communicated in advance when possible</p>
                <p>• We are not liable for service interruptions beyond our control</p>
                <p>• Mobile apps require internet connectivity and compatible devices</p>
              </div>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">10. Limitation of Liability</h3>
              <div className="space-y-2">
                <p>• Our liability is limited to the amount paid for services in the preceding 12 months</p>
                <p>• We are not liable for indirect, incidental, or consequential damages</p>
                <p>• You use our platform at your own risk</p>
                <p>• Some jurisdictions do not allow limitation of liability, so these limits may not apply</p>
              </div>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">11. Termination</h3>
              <div className="space-y-2">
                <p>• Either party may terminate this agreement with appropriate notice</p>
                <p>• We may suspend or terminate accounts for terms violations</p>
                <p>• Upon termination, you may export your data for a limited time</p>
                <p>• Certain provisions survive termination (intellectual property, limitation of liability)</p>
              </div>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">12. Governing Law and Disputes</h3>
              <div className="space-y-2">
                <p>• These terms are governed by the laws of California, United States</p>
                <p>• Disputes will be resolved through binding arbitration when possible</p>
                <p>• Legal proceedings must be brought in California courts</p>
                <p>• You waive the right to participate in class action lawsuits</p>
              </div>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">13. Changes to Terms</h3>
              <div className="space-y-2">
                <p>• We may modify these terms with reasonable notice</p>
                <p>• Continued use after changes constitutes acceptance</p>
                <p>• Material changes will be clearly communicated</p>
                <p>• Current terms are always available at www.worksidesoftware.com/terms</p>
              </div>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">14. Contact Information</h3>
              <div className="space-y-2">
                <p><strong>For questions about these terms:</strong></p>
                <p>📧 Email: <a href="mailto:legal@worksidesoftware.com" className="text-green-300 underline">legal@worksidesoftware.com</a></p>
                <p>📧 General Support: <a href="mailto:support@worksidesoftware.com" className="text-green-300 underline">support@worksidesoftware.com</a></p>
                <p>📞 Phone: 1-888-555-6666</p>
                <p>🌐 Website: <a href="https://www.worksidesoftware.com" className="text-green-300 underline">www.worksidesoftware.com</a></p>
              </div>
            </section>

            <div className="mt-8 bg-green-900/30 p-4 rounded-lg text-center">
              <p className="text-sm">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>
              <p className="text-sm mt-2">
                Version 1.0 - Effective Date: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms; 