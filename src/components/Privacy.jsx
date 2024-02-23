import React from "react";

const Privacy = () => {
  const OnClick = () => {
    window.history.back();
  };

  return (
    <div className="w-full h-[90vh]">
      <img
        src={process.env.PUBLIC_URL + "background.jpg"}
        alt="Background"
        className="w-full h-full object-cover"
      />
      <div className="max-w-[1140px] m-auto">
        <div className="absolute top-[20%] md:top-[15%] w-full md:-[50%] max-w-[600px] h-full flex flex-col text-white p-4">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">
            Workside Software
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl italic">
            Web Privacy Statement
          </h2>
          <p>
            This privacy statement provides information about privacy,
            confidentiality and related policies for individuals who use our
            websites and online services.{" "}
          </p>
          <br />
          <h2 className="text-xl md:text-2xl lg:text-3xl italic">
            Information collected by Workside Software
          </h2>
          <p>
            Workside Software uses various information to monitor and preserve
            the functioning and integrity of the system. In cases of suspected
            violations of Workside Software policies, especially unauthorized
            access to computing systems, the system administrator concerned may
            authorize detailed session logging.{" "}
          </p>
          <br />
          <h2 className="text-xl md:text-2xl lg:text-3xl italic">
            Disclosure of information
          </h2>
          <p>
            Workside Software does not sell or distribute confidential
            information it collects online to individuals or entities not
            affiliated with the Company.
          </p>
          <br />
          <h2 className="text-xl md:text-2xl lg:text-3xl italic">Contact</h2>
          <p>
            Questions about online privacy or security can be sent to
            dataprivacy@worksidesoftware.com.
          </p>
          <br />
          <button onClick={OnClick} className="w-[200px]">
            Close
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Privacy;
