import React from "react";

const Policies = () => {
  return (
    <div className="w-full h-[90vh]">
      <img
        src={process.env.PUBLIC_URL + "background.jpg"}
        alt="Background"
        className="w-full h-full object-cover"
      />
      <div className="max-w-[1140px] m-auto">
        <div className="absolute top-[15%] w-full md:-[50%] max-w-[75%] h-full flex flex-col text-white p-4 overflow-auto hover:overflow-scroll">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">
            Workside Software Policies
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl italic">
            Your Efficiency Partner
          </h2>
          <br />
          <p className="text-xl font-bold">
            Workside Software is committed to protecting your privacy and
            ensuring that your personal information is handled in a safe and
            responsible manner. As part of this commitment, we have established
            this SMS Text Message Customer Opt-In Policy to outline how we
            collect, use, and safeguard your information when you agree to
            receive SMS text messages from us.
          </p>
          <br />
          <p className="text-xl font-bold"> Opt-In Consent</p>
          <p>
            By opting in to receive SMS text messages from Workside Software,
            you expressly consent to receive non-marketing text messages, to the
            telephone number(s) that you provide. You may receive alerts about
            our services. You confirm that you are the subscriber to the
            relevant phone number(s). You understand that your consent is not
            required as a condition of services from us.
          </p>
          <br />
          <p className="text-xl font-bold">How to Opt-In</p>
          <p>
            To opt-in to our SMS text messages, you can: Text JOIN to a
            designated short code provided by Workside Software. Provide your
            mobile number through our website and agree to these terms by
            selecting the appropriate checkbox or verbal agreement where
            applicable. Frequency of Messages The frequency of messages may
            vary. How to Opt-Out You can opt-out of receiving SMS messages from
            Workside Software at any time by texting the word STOP to the short
            code provided in our messages. After doing so, you will receive
            confirmation of your opt-out via SMS. Please note that opting out of
            SMS messages may impact your use of certain Workside Software
            services.
          </p>
          <br />
          <p className="text-xl font-bold"> Privacy Policy</p>
          <p>
            Workside Software respects your privacy. Our Privacy Policy provides
            further details on how we handle and protect your personal
            information. Changes to This Policy Workside Software reserves the
            right to modify this SMS Text Message Customer Opt-In Policy at any
            time.
          </p>
          <br />
          <p className="text-xl font-bold">Contact Us</p>
          <p>
            For any questions or concerns regarding this policy or our SMS text
            messages, please contact us at: contact@worksidesoftware.com.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Policies;
