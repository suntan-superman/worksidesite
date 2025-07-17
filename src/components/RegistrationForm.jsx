import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "SUPPLIER", label: "Supplier" },
  { value: "CUSTOMER", label: "Customer" },
  { value: "DELIVERYASSOC", label: "Delivery Associate" },
];

const RegistrationForm = () => {
  const queryString = window.location.search;
  if (queryString !== "") console.log("QueryString: " + queryString);

  const [className, setClassName] = useState(null);
  
  function customTheme(theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "#16a34a",
        primary: "#15803d",
      },
    };
  }

  const OnClick = () => {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const nickName = document.getElementById("nickName").value;
    const company = document.getElementById("company").value;
    const userClass = className?.value;
    const email = document.getElementById("email").value;
    const mobileNumber = document.getElementById("mobileNumber").value;
    
    if (!firstName || !lastName || !nickName || !company || !userClass || !email || !mobileNumber) {
      alert("Please fill in all required fields.");
      return;
    }

    const data = {
      firstName,
      lastName,
      nickName,
      company,
      userClass,
      email,
      mobileNumber,
    };
    console.log("Registration Data:", JSON.stringify(data));
    alert("Registration submitted successfully! We will contact you soon.");
  };

  return (
    <div className="w-full min-h-screen">
      <img
        src={process.env.PUBLIC_URL + "background.jpg"}
        alt="Background"
        className="w-full h-full object-cover fixed top-0 left-0 -z-10"
      />
      <div className="max-w-[1000px] m-auto pt-10 pb-8">
        <div className="w-full flex flex-col text-white p-4">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-4 text-center">
            Workside Software Registration
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl italic mb-8 text-center">
            Join Our Logistics Platform
          </h2>
          
          <div className="bg-black/40 p-8 rounded-lg max-w-4xl mx-auto">
            <p className="text-center mb-6 text-gray-200">
              Register for access to our comprehensive logistics management platform. 
              Choose your role and get started today.
            </p>
            
            <form className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-green-300">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base font-semibold mb-3 text-green-200">
                      First Name *
                    </label>
                    <input
                      className="w-full px-4 py-4 text-base border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold mb-3 text-green-200">
                      Last Name *
                    </label>
                    <input
                      className="w-full px-4 py-4 text-base border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-green-300">Professional Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base font-semibold mb-3 text-green-200">
                      Nickname/Display Name *
                    </label>
                    <input
                      className="w-full px-4 py-4 text-base border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      id="nickName"
                      type="text"
                      placeholder="How you'd like to be called"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold mb-3 text-green-200">
                      Company *
                    </label>
                    <input
                      className="w-full px-4 py-4 text-base border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      id="company"
                      type="text"
                      placeholder="Your company name"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Account Type */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-green-300">Account Type</h3>
                <div>
                  <label className="block text-base font-semibold mb-3 text-green-200">
                    User Type *
                  </label>
                  <div className="w-full">
                    <Select
                      id="userClass"
                      options={options}
                      onChange={setClassName}
                      theme={customTheme}
                      placeholder="Select your role..."
                      isMulti={false}
                      isSearchable={false}
                      className="text-gray-800"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          minHeight: '56px',
                          fontSize: '16px',
                          padding: '0 8px'
                        }),
                        placeholder: (provided) => ({
                          ...provided,
                          fontSize: '16px'
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          fontSize: '16px'
                        })
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                    • <strong>Customer:</strong> Request services and track deliveries<br/>
                    • <strong>Supplier:</strong> Receive requests and manage deliveries<br/>
                    • <strong>Delivery Associate:</strong> Handle logistics operations
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-green-300">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base font-semibold mb-3 text-green-200">
                      Email Address *
                    </label>
                    <input
                      className="w-full px-4 py-4 text-base border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      id="email"
                      type="email"
                      placeholder="your.email@company.com"
                      required
                      autoComplete="email"
                      inputMode="email"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold mb-3 text-green-200">
                      Mobile Number *
                    </label>
                    <input
                      className="w-full px-4 py-4 text-base border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      id="mobileNumber"
                      type="tel"
                      placeholder="(555) 123-4567"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Section */}
              <div className="pt-6 text-center">
                <button
                  type="button"
                  onClick={OnClick}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-12 text-lg rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[56px]"
                >
                  Register Now
                </button>
                <p className="text-xs text-gray-300 mt-4">
                  By registering, you agree to our{" "}
                  <a href="/terms" className="text-green-300 underline">Terms of Use</a> and{" "}
                  <a href="/privacy" className="text-green-300 underline">Privacy Policy</a>.
                </p>
              </div>
            </form>
          </div>

          {/* Support Section */}
          <div className="mt-8 bg-green-900/30 p-6 rounded-lg text-center max-w-2xl mx-auto">
            <h3 className="text-lg font-bold mb-3 text-green-300">Need Help?</h3>
            <p className="mb-4 text-gray-200">
              Having trouble with registration or have questions about our platform?
            </p>
            <div className="space-y-2">
              <p>📧 Support: <a href="mailto:support@worksidesoftware.com" className="text-green-300 underline">support@worksidesoftware.com</a></p>
              <p>📞 Phone: <span className="text-green-300">1-888-555-6666</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
