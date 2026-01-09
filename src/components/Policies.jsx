import React from "react";

const Policies = () => {
  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="py-16 md:py-20 border-b border-gray-200">
        <div className="container-max">
          <h1 className="mb-3">Policies</h1>
          <p className="text-lg text-gray-600">SMS Text Message Customer Opt-In Policy</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-max section-spacing max-w-3xl">
        <div className="space-y-8">
          <section>
            <h2 className="mb-4">SMS Text Message Customer Opt-In Policy</h2>
            <p className="text-gray-600 mb-4">
              Workside Software is committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. As part of this commitment, we have established this SMS Text Message Customer Opt-In Policy to outline how we collect, use, and safeguard your information when you agree to receive SMS text messages from us.
            </p>
          </section>

          <section>
            <h2 className="mb-4">Opt-In Consent</h2>
            <p className="text-gray-600">
              By opting in to receive SMS text messages from Workside Software, you expressly consent to receive non-marketing text messages to the telephone number(s) that you provide. You may receive alerts about our services. You confirm that you are the subscriber to the relevant phone number(s). You understand that your consent is not required as a condition of services from us.
            </p>
          </section>

          <section>
            <h2 className="mb-4">How to Opt-In</h2>
            <p className="text-gray-600 mb-3">To opt-in to our SMS text messages, you can:</p>
            <ul className="space-y-2 text-gray-600">
              <li>• Text JOIN to a designated short code provided by Workside Software</li>
              <li>• Provide your mobile number through our website and agree to these terms by selecting the appropriate checkbox</li>
              <li>• Provide verbal agreement where applicable</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4">Frequency of Messages</h2>
            <p className="text-gray-600">
              The frequency of messages may vary depending on your account activity and preferences.
            </p>
          </section>

          <section>
            <h2 className="mb-4">How to Opt-Out</h2>
            <p className="text-gray-600">
              You can opt-out of receiving SMS messages from Workside Software at any time by texting the word STOP to the short code provided in our messages. After doing so, you will receive confirmation of your opt-out via SMS. Please note that opting out of SMS messages may impact your use of certain Workside Software services.
            </p>
          </section>

          <section>
            <h2 className="mb-4">Privacy Policy</h2>
            <p className="text-gray-600">
              Workside Software respects your privacy. Our Privacy Policy provides further details on how we handle and protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="mb-4">Changes to This Policy</h2>
            <p className="text-gray-600">
              Workside Software reserves the right to modify this SMS Text Message Customer Opt-In Policy at any time. Changes will be effective immediately upon posting to our website.
            </p>
          </section>

          <section>
            <h2 className="mb-4">Contact Us</h2>
            <p className="text-gray-600">
              For any questions or concerns regarding this policy or our SMS text messages, please contact us at:
            </p>
            <p className="text-base font-medium mt-2">
              <a href="mailto:contact@worksidesoftware.com" className="hover:text-gray-600">
                contact@worksidesoftware.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Policies;
