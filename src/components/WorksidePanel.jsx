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
        <div className="absolute top-[40%] w-full md:-[50%] max-w-[600px] h-full flex flex-col text-white p-4">
          <h1 className="font-bold text-5xl">Workside Software</h1>
          <h2 className="text-3xl italic">Your Efficiency Partner</h2>
          <p>
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
