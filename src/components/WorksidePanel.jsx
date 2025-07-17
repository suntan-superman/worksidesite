import React from "react";

const WorksidePanel = () => {
  return (
    <div className="w-full h-[90vh]">
      <img
        src={process.env.PUBLIC_URL + "background.jpg"}
        alt="Background"
        className="w-full h-full object-cover"
      />
      <div className="max-w-[1140px] m-auto">
        <div className="absolute top-[35%] sm:top-[40%] w-full md:-[50%] max-w-[90%] sm:max-w-[600px] h-full flex flex-col text-white p-4">
          <h1 className="font-bold text-3xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 sm:mb-0">
            Workside Software
          </h1>
          <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl italic mb-4 sm:mb-0">
            Your Efficiency Partner
          </h2>
          <p className="text-base sm:text-base leading-relaxed mt-2">
            Workside Statement of Purpose: Workside Software is committed to
            providing the highest quality software solutions to help businesses
            achieve their goals. We are dedicated to providing the best customer
            service and support to our clients. Our team is committed to
            delivering the best software solutions to help businesses streamline
            their operations and achieve their goals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorksidePanel;
