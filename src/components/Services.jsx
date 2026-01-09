import React from "react";

const Services = () => {
  return (
    <div className="w-full min-h-screen">
      <img
        src={process.env.PUBLIC_URL + "background.jpg"}
        alt="Background"
        className="w-full h-full object-cover fixed top-0 left-0 -z-10"
      />
      <div className="max-w-[1200px] m-auto pt-10 pb-8">
        <div className="w-full flex flex-col text-white p-4">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-4 text-center text-white">
            Workside Software Services
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl italic mb-8 text-center">
            Your Efficiency Partner
          </h2>
          
          <div className="mb-6 bg-black/40 p-6 rounded-lg">
            <p className="text-white">
              At Workside Software, we are dedicated to powering the future of the
              oil and gas industry through innovative software solutions. Our
              comprehensive suite of services is designed to address the unique
              challenges faced by this sector, ensuring efficiency, compliance,
              and profitability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/40 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-green-300">Data Management and Analytics</h3>
              <p className="text-white">
                Harness the power of your data with our advanced analytics platform.
                From production to distribution, our software provides real-time
                insights to optimize operations, reduce costs, and enhance
                decision-making processes.
              </p>
            </div>

            <div className="bg-black/40 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-green-300">Asset Management</h3>
              <p className="text-white">
                Maximize the performance and lifecycle of your assets. Our solutions
                offer predictive maintenance, asset tracking, and management
                capabilities, reducing downtime and extending the lifespan of your
                equipment.
              </p>
            </div>

            <div className="bg-black/40 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-green-300">Regulatory Compliance</h3>
              <p className="text-white">
                Navigate the complex regulatory landscape with ease. Our software
                ensures compliance with local and international standards, helping
                you avoid costly penalties and maintain operational integrity.
              </p>
            </div>

            <div className="bg-black/40 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-green-300">Supply Chain Optimization</h3>
              <p className="text-white">
                Streamline your supply chain for peak efficiency. We provide tools
                for logistics management, demand forecasting, and inventory control,
                ensuring that your operations run smoothly and meet market demands.
              </p>
            </div>

            <div className="bg-black/40 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-green-300">Digital Transformation Services</h3>
              <p className="text-white">
                Embrace the digital revolution. Our experts work closely with your
                team to implement digital solutions that transform your operations,
                from field data capture to enterprise resource planning (ERP)
                systems integration.
              </p>
            </div>

            <div className="bg-black/40 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-green-300">Custom Software Development</h3>
              <p className="text-white">
                Tailored solutions to meet your unique needs. Our experienced
                developers can create custom software that integrates seamlessly
                with your existing systems, enhancing functionality and improving
                user experience.
              </p>
            </div>

            <div className="bg-black/40 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-green-300">Training and Support</h3>
              <p className="text-white">
                Empower your team with knowledge. We offer comprehensive training
                programs and ongoing support to ensure your staff is proficient with
                our software, maximizing the value of your investment.
              </p>
            </div>

            <div className="bg-black/40 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-green-300">Why Choose Workside Software?</h3>
              <div className="space-y-2 text-white">
                <p className="text-white"><strong>Industry Expertise:</strong> With years of experience in the oil and gas
                sector, we understand your challenges and how to solve them.</p>
                <p className="text-white"><strong>Innovation-Driven:</strong> We are constantly evolving our technology to meet
                the needs of a changing industry.</p>
                <p className="text-white"><strong>Customer-Centric Approach:</strong> Your success is our priority. We are committed to providing solutions
                that deliver tangible benefits to your business.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-black/40 p-6 rounded-lg text-center border border-gray-600">
            <h3 className="text-xl font-bold mb-3 text-white">Ready to Transform Your Operations?</h3>
            <p className="mb-4 text-white">
              At Workside Software, we are more than a software provider; we are a partner in
              your success. Contact us today to learn how we can help you achieve
              your operational goals and drive your business forward.
            </p>
            <div className="space-y-2">
              <p className="text-white">📞 Contact Sales: <a href="tel:202-933-5631" className="text-white font-medium hover:underline">202-933-5631</a></p>
              <p className="text-white">📧 Email: <a href="mailto:contact@worksidesoftware.com" className="text-white font-medium hover:underline">contact@worksidesoftware.com</a></p>
              <p className="mt-3">
                <a href="/contact" className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-2 rounded font-semibold transition-colors">
                  Get Started Today
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
