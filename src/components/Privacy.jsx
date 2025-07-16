import React from "react";

const Privacy = () => {

  return (
    <div className="w-full min-h-screen">
      <img
        src={process.env.PUBLIC_URL + "background.jpg"}
        alt="Background"
        className="w-full h-full object-cover fixed top-0 left-0 -z-10"
      />
      <div className="max-w-[1200px] m-auto pt-12 pb-8">
        <div className="w-full flex flex-col text-white p-4">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">
            Workside Software
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl italic mb-6">
            Privacy Policy
          </h2>
          
          <div className="space-y-6 text-sm md:text-base">
            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">1. Information We Collect</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-green-200">Account Information:</h4>
                  <p>Name, email address, phone number, company information, and user credentials</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-200">Usage Data:</h4>
                  <p>App interactions, feature usage, performance metrics, and system logs</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-200">Location Data:</h4>
                  <p>GPS coordinates for delivery tracking and route optimization (with permission)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-200">Device Information:</h4>
                  <p>Device type, operating system, app version, and unique device identifiers</p>
                </div>
              </div>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">2. How We Use Information</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Provide and improve our logistics management services</li>
                <li>Process service requests and coordinate vendor assignments</li>
                <li>Send notifications about job status and updates</li>
                <li>Analyze usage patterns to enhance platform functionality</li>
                <li>Provide customer support and technical assistance</li>
                <li>Ensure platform security and prevent unauthorized access</li>
                <li>Comply with legal obligations and business requirements</li>
              </ul>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">3. Information Sharing</h3>
              <div className="space-y-2">
                <p><strong>We do not sell your personal information.</strong> We may share information in these circumstances:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>With vendors and clients as necessary for service coordination</li>
                  <li>With third-party integrations you choose to connect (ERP systems, etc.)</li>
                  <li>With service providers who assist our operations (hosting, analytics)</li>
                  <li>When required by law or to protect rights and safety</li>
                  <li>In connection with business transfers or reorganizations</li>
                </ul>
              </div>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">4. Mobile App Permissions</h3>
              <div className="space-y-2">
                <p><strong>Our mobile apps may request these permissions:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Location:</strong> For route tracking and delivery coordination</li>
                  <li><strong>Camera:</strong> To capture proof of delivery photos</li>
                  <li><strong>Push Notifications:</strong> For job alerts and status updates</li>
                  <li><strong>Network Access:</strong> To sync data and communicate with our servers</li>
                  <li><strong>Storage:</strong> To cache data and store temporary files</li>
                </ul>
                <p className="text-sm text-green-200 mt-2">You can control permissions through your device settings at any time.</p>
              </div>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">5. Data Security</h3>
              <div className="space-y-2">
                <p>We implement industry-standard security measures including:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and authentication requirements</li>
                  <li>Secure data centers with physical and network security</li>
                  <li>Employee training on data protection practices</li>
                </ul>
              </div>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">6. Your Rights and Choices</h3>
              <div className="space-y-2">
                <p><strong>You have the right to:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Access and review your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Control location sharing and other permissions</li>
                  <li>Request data portability where applicable</li>
                </ul>
              </div>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">7. Data Retention</h3>
              <div className="space-y-2">
                <p>We retain your information for as long as necessary to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Provide ongoing services to your account</li>
                  <li>Comply with legal and regulatory requirements</li>
                  <li>Resolve disputes and enforce agreements</li>
                  <li>Maintain business records and analytics</li>
                </ul>
                <p className="text-sm text-green-200 mt-2">Deleted accounts are purged within 30 days, except as required by law.</p>
              </div>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">8. International Data Transfers</h3>
              <p>
                Our services may involve international data transfers. We ensure appropriate safeguards 
                are in place to protect your information when transferred outside your country of residence.
              </p>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">9. Changes to This Policy</h3>
              <p>
                We may update this privacy policy to reflect changes in our practices or legal requirements. 
                We will notify you of material changes through the app or by email.
              </p>
            </section>

            <section className="bg-black/40 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-green-300">10. Contact Us</h3>
              <div className="space-y-2">
                <p><strong>For privacy-related questions or requests:</strong></p>
                <p>📧 Privacy Officer: <a href="mailto:privacy@worksidesoftware.com" className="text-green-300 underline">privacy@worksidesoftware.com</a></p>
                <p>📧 General Support: <a href="mailto:support@worksidesoftware.com" className="text-green-300 underline">support@worksidesoftware.com</a></p>
                <p>📞 Phone: 1-888-555-6666</p>
                <p>🌐 Website: <a href="https://www.worksidesoftware.com" className="text-green-300 underline">www.worksidesoftware.com</a></p>
              </div>
            </section>

                         <div className="mt-6 bg-green-900/30 p-4 rounded-lg text-center">
               <p className="text-sm">
                 <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
               </p>
               <p className="text-sm mt-2">
                 Effective Date: {new Date().toLocaleDateString()}
               </p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
