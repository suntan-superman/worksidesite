import React from "react";

const ContactWorkside = () => {
  return (
    <div className="w-full h-[90vh]">
      <img
        src={process.env.PUBLIC_URL + "background.jpg"}
        alt="Background"
        className="w-full h-full object-cover"
      />
      <div className="max-w-[1140px] m-auto">
        <div
          className="absolute top-[20%] md:top-[15%] w-full md:-[50%] max-w-[75%] h-full flex flex-col text-white p-4
          overflow-auto
          hover:overflow-scroll"
        >
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">
            Contact Workside Software
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl italic">
            Your Efficiency Partner
          </h2>
          <p>
            At Workside Software, we are always eager to connect with our
            clients, potential partners, and members of the oil and gas
            community. Whether you're seeking solutions to complex challenges,
            interested in learning more about our innovative software, or simply
            have questions about how we can support your business objectives,
            our team is ready to provide the answers and assistance you need.
          </p>
          <br />
          <p className="text-xl font-bold">Get in Touch</p>
          <p>
            For Sales and Product Inquiries: Discover how our software solutions
            can transform your operations. Contact our sales team at
            contact@worksidesoftware.com or call us at 888-555-7777.
          </p>
          <br />
          <p>
            Customer Support: Existing clients needing assistance can reach our
            support team at contact@worksidesoftware.com or through our customer
            support hotline at 888-555-6666. Our dedicated professionals are
            available to ensure your continued success with our solutions.
          </p>
          <br />
          <p>
            Careers: Join our team and help shape the future of the oil and gas
            industry. For career opportunities, please visit our careers page or
            email us at contact@worksidesoftware.com.
          </p>
          <br />
          <p>
            Visit our website at www.worksidesoftware.com to find the address
            and contact details for each of our locations. Social Media Stay
            connected with Workside Software through our social media channels.
            Follow us on LinkedIn, Twitter, and Facebook to keep up with the
            latest news, insights, and innovations we're bringing to the oil and
            gas industry.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactWorkside;

// For Sales and Product Inquiries: Discover how our
// software solutions can transform your operations. Contact our sales
// team at sales@worksidesoftware.com or call us directly at
// 888-555-7777. Customer Support: Existing clients needing assistance
// can reach our support team at support@worksidesoftware.com or
// through our customer support hotline at 888-555-6666. Our dedicated
// professionals are available to ensure your continued success with
// our solutions. Partnerships and Media: Interested in forming a
// partnership or need media information? Contact
// partnerships@worksidesoftware.com. We're excited about collaborative
// opportunities and sharing our story with the world. Careers: Join
// our team and help shape the future of the oil and gas industry. For
// career opportunities, please visit our careers page or email us at
// careers@worksidesoftware.com. Office Locations Workside Software has
// offices located in Bakersfield,CA. Visit our website at
// www.worksidesoftware.com to find the address and contact details for
// each of our locations. Social Media Stay connected with Workside
// Software through our social media channels. Follow us on LinkedIn,
// Twitter, and Facebook to keep up with the latest news, insights, and
// innovations we're bringing to the oil and gas industry.{" "}
