import React from "react";
import { Link } from "react-router-dom";

const SMSTextOptInForm = () => {
  return (
    <div className="w-full h-[90vh]">
      <img
        src={process.env.PUBLIC_URL + "background.jpg"}
        alt="Background"
        className="w-full h-full object-cover"
      />
      <div className="max-w-[1140px] m-auto">
        <div className="absolute top-[20%] md:top-[15%] w-full md:-[50%] max-w-[75%] h-full flex flex-col text-white p-4 overflow-auto hover:overflow-scroll">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">
            Workside Software
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl italic">
            SMS Text Message Opt-In Form
          </h2>
          <br />
          <p>
            Users who wish to receive SMS text messages from Workside Software
            can fill out this form in order to provide their mobile phone number
            and opt in, giving their permission to receive messages. Consent is
            not a condition of purchase. Msg & Data rates apply.
          </p>
          <br />
          <p className="text-xl font-bold">Mobile Phone Number: *</p>
          <input
            class="shadow appearance-none border rounded w-[250px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="mobileNumber"
            type="tel"
            placeholder="(555)-555-5555"
          ></input>
          <p>
            Enter the 10-digit mobile phone number at which you wish to receive
            test messages from Workside Software.
          </p>
          <br />
          <p className="text-xl font-bold">
            Opt in to receive text messages: *
          </p>
          {/* <br /> */}
          <p>
            <label class="block text-white">
              <input class="mr-2 leading-tight align-middle" type="checkbox" />
              {/* <span class="text-xl"> */}
              <span>
                I agree to receive SMS text messages from Workside Software at
                the mobile phone number provided above. I understand that I can
                opt out at any time by texting STOP to cancel. Msg frequency may
                vary. Msg&Data rates may apply.
              </span>
              {/* Check this box to give Workside Software permission to send SMS
                text messages according to{" "} */}
              <br />
              <br />
              <span>
                <Link className="py-8 font-bold text-green-300" to="/smsterms">
                  Terms and Conditions{" "}
                </Link>
                and our{" "}
                <Link className="py-8 font-bold text-green-300" to="/privacy">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </p>
          <br />
          <br />
          <button className="w-[200px]">Sign Up Now</button>
          <br />
          <br />
          <p>
            Text HELP for help. Text STOP to cancel. Msg frequency may vary.
            Msg&Data rates may apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SMSTextOptInForm;
