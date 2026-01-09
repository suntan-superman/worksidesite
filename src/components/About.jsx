import React from "react";

const About = () => {
  return (
    <div className="w-full min-h-screen">
      <img
        src={process.env.PUBLIC_URL + "background.jpg"}
        alt="Background"
        className="fixed top-0 left-0 object-cover w-full h-full -z-10"
      />
      <div className="max-w-[1200px] m-auto pt-12 pb-8">
        <div className="flex flex-col w-full p-4 text-white">
          <h1 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            About Workside Software
          </h1>
          <h2 className="text-xl italic text-white md:text-2xl lg:text-3xl">
            Your Efficiency Partner
          </h2>
          <br />
          <p className="text-white">
            Workside Software has established itself as a pioneering force in
            the oil and gas industry, dedicated to transforming the landscape
            through innovative software solutions. Our mission is to empower
            energy companies with the tools they need to optimize their
            operations, ensure regulatory compliance, and significantly increase
            their operational efficiency.
          </p>
          <br />
          <p className="text-white">
            Our journey began with a simple vision: to address the
            complex challenges faced by the oil and gas sector through
            technology. With a deep understanding of the industry's intricacies,
            we set out to create software solutions that not only solve
            immediate problems but also pave the way for a more efficient,
            sustainable, and profitable future.
          </p>
          <br />
          <p className="text-white">
            At Workside Software, we specialize in delivering comprehensive
            software solutions that cover the entire value chain of the oil
            and gas industry. From exploration and production to distribution
            and retail, our products are designed to provide critical insights,
            automate workflows, and enhance decision-making. Our portfolio
            includes data analytics, asset management, regulatory compliance,
            supply chain optimization, and digital transformation services.
          </p>
          <br />
          <p className="text-white">
            What sets us apart is our unwavering commitment to innovation,
            quality, and customer success. Our team of industry  experts and tech
            visionaries work closely with clients to understand their unique
            challenges and objectives. This collaborative approach, combined with
            our cutting-edge technology, enables us to deliver tailor-made
            solutions that drive real results.
          </p>
          <br />
          <p className="text-white">
            We constantly push the boundaries of what's possible, seeking out new
            ideas and technologies to better serve our clients. Integrity:
            Transparency and honesty guide all our actions, fostering trust and
            long-term relationships with our clients. Excellence: We strive for
            excellence in everything we do, from the software we develop to the
            customer service we provide. Sustainability: We are committed to
            developing solutions that not only benefit our clients but also
            contribute to a more sustainable and responsible energy sector.
          </p>
          <br />
          <p className="text-white">
            As the oil and gas industry evolves, Workside Software remains at the
            forefront, ready to meet new challenges with innovative solutions. Our
            vision for the future is clear: to continue driving progress in the
            energy sector, helping our clients achieve unprecedented levels of
            efficiency and success.
          </p>
          <br />
          <p className="text-white">
            Join us in shaping the future of energy. Workside Software -
            Powering the Next Generation of Oil and Gas Innovation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
