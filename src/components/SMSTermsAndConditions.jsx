import React from "react";

const SMSTermsAndConditions = () => {
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
            SMS Terms And Conditions
          </h2>
          <p>
            Text messaging is a method of communication that Workside Software
            may utilize to reach out to the members of our community.{" "}
          </p>
          <br />
          <h2 className="text-xl md:text-2xl lg:text-3xl italic">
            Guiding Principles
          </h2>
          <p>
            Workside Software will preserve texting as a channel for important
            work-related communications as outlined in the Categories of
            Messages section. Workside Software will keep texts to a minimum to
            ensure that customers remain in the texting program and do not
            opt-out because of overuse.
          </p>
          <br />
          <h2 className="text-xl md:text-2xl lg:text-3xl italic">
            Categories of Messages
          </h2>
          <p>
            Texting is reserved for information that is considered
            time-sensitive. Messages will only be permitted for communication
            between members of or community.{" "}
          </p>
          <p>
            Text messages will not be used for personal matters or solicitation.{" "}
          </p>
          <br />
          <h2 className="text-xl md:text-2xl lg:text-3xl italic">
            Opt-In/Opt-Out Feature
          </h2>
          <p>Users may opt-in or opt-out of receiving texts at any time.</p>
          <br />
          <button onClick={OnClick} className="w-[200px]">
            Close
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default SMSTermsAndConditions;
