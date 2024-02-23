import React from "react";

const Services = () => {
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
            Workside Software Services
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl italic">
            Your Efficiency Partner
          </h2>
          <p>
            At Workside Software, we are dedicated to powering the future of the
            oil and gas industry through innovative software solutions. Our
            comprehensive suite of services is designed to address the unique
            challenges faced by this sector, ensuring efficiency, compliance,
            and profitability. Our Services Include:
          </p>
          <br />
          <p className="text-xl font-bold">Data Management and Analytics:</p>
          <p>
            Harness the power of your data with our advanced analytics platform.
            From production to distribution, our software provides real-time
            insights to optimize operations, reduce costs, and enhance
            decision-making processes.
          </p>
          <br />
          <p className="text-xl font-bold">Asset Management:</p>
          <p>
            Maximize the performance and lifecycle of your assets. Our solutions
            offer predictive maintenance, asset tracking, and management
            capabilities, reducing downtime and extending the lifespan of your
            equipment.
          </p>
          <br />
          <p className="text-xl font-bold">Regulatory Compliance:</p>
          <p>
            Navigate the complex regulatory landscape with ease. Our software
            ensures compliance with local and international standards, helping
            you avoid costly penalties and maintain operational integrity.
          </p>
          <br />
          <p className="text-xl font-bold">Supply Chain Optimization:</p>
          <p>
            Streamline your supply chain for peak efficiency. We provide tools
            for logistics management, demand forecasting, and inventory control,
            ensuring that your operations run smoothly and meet market demands.
          </p>
          <br />
          <p className="text-xl font-bold">Digital Transformation Services:</p>
          <p>
            Embrace the digital revolution. Our experts work closely with your
            team to implement digital solutions that transform your operations,
            from field data capture to enterprise resource planning (ERP)
            systems integration.
          </p>
          <br />
          <p className="text-xl font-bold">Custom Software Development:</p>
          <p>
            Tailored solutions to meet your unique needs. Our experienced
            developers can create custom software that integrates seamlessly
            with your existing systems, enhancing functionality and improving
            user experience.
          </p>
          <br />
          <p className="text-xl font-bold">Training and Support:</p>
          <p>
            Empower your team with knowledge. We offer comprehensive training
            programs and ongoing support to ensure your staff is proficient with
            our software, maximizing the value of your investment.
          </p>
          <br />
          <p className="text-xl font-bold">Why Choose Workside Software?</p>
          <p>
            Industry Expertise: With years of experience in the oil and gas
            sector, we understand your challenges and how to solve them.
            Innovation-Driven: We are constantly evolving our technology to meet
            the needs of a changing industry. Customer-Centric Approach: Your
            success is our priority. We are committed to providing solutions
            that deliver tangible benefits to your business. At Workside
            Software, we are more than a software provider; we are a partner in
            your success. Contact us today to learn how we can help you achieve
            your operational goals and drive your business forward.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
