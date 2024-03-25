import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "SUPPLIER", label: "Supplier" },
  { value: "CUSTOMER", label: "Customer" },
  { value: "DELIVERYASSOC", label: "Delivery Assoc" },
];

const RegistrationForm = () => {
  const [className, setClassName] = useState(null);
  function customTheme(theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "green",
        primary: "black",
      },
    };
  }

  const OnClick = () => {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const nickName = document.getElementById("nickName").value;
    const company = document.getElementById("company").value;
    // const userClass = document.getElementById("userClass").value;
    const userClass = className.value;
    const email = document.getElementById("email").value;
    const mobileNumber = document.getElementById("mobileNumber").value;
    const data = {
      firstName,
      lastName,
      nickName,
      company,
      userClass,
      email,
      mobileNumber,
    };
    console.log("Data:" + JSON.stringify(data));
  };

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
            Registration
          </h2>
          <br />
          <p className="text-xl font-bold">First Name: *</p>
          <input
            class="shadow appearance-none border rounded w-[250px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            type="text"
          ></input>
          <p className="text-xl font-bold">Last Name: *</p>
          <input
            class="shadow appearance-none border rounded w-[250px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            type="text"
          ></input>
          <p className="text-xl font-bold">Nickname: *</p>
          <input
            class="shadow appearance-none border rounded w-[250px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nickName"
            type="text"
          ></input>
          <p className="text-xl font-bold">Company: *</p>
          <input
            class="shadow appearance-none border rounded w-[250px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="company"
            type="text"
          ></input>
          <p className="text-xl font-bold">Class: *</p>
          <div className="text-xl w-[250px] text-black ">
            <Select
              id="userClass"
              options={options}
              onChange={setClassName}
              theme={customTheme}
              className="mb-1 mt-1 border-black"
              isMulti={false}
              autoFocus={true}
              isSearchable={false}
            />
          </div>
          <p className="text-xl font-bold">Email: *</p>
          <input
            class="shadow appearance-none border rounded w-[250px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
          ></input>
          <p className="text-xl font-bold">Cell Number: *</p>
          <input
            class="shadow appearance-none border rounded w-[250px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="mobileNumber"
            type="tel"
            placeholder="(555)-555-5555"
          ></input>
          <br />
          <button className="w-[250px]" onClick={OnClick}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
