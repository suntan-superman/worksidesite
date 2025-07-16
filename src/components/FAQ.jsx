import React, { useState } from "react";

const FAQ = () => {
  const [openSections, setOpenSections] = useState({ general: true });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const faqSections = [
    {
      id: 'general',
      title: 'General Questions',
      questions: [
        {
          q: 'What is Workside Software?',
          a: 'Workside Software is a comprehensive logistics management platform that includes three integrated applications: a Web Host App for admin management, a Client Mobile App for service requests, and a Supplier Mobile App for vendor operations.'
        },
        {
          q: 'Who can use Workside apps?',
          a: 'Our platform is designed for energy companies, logistics coordinators, field service managers, suppliers, and any business that coordinates multiple vendors and daily service operations.'
        },
        {
          q: 'How much does Workside cost?',
          a: 'Pricing varies based on your organization size and needs. Contact our sales team at contact@worksidesoftware.com or call 1-888-555-7777 for a custom quote.'
        },
        {
          q: 'Is there a free trial available?',
          a: 'Yes, we offer a 30-day free trial for new organizations. Contact support to set up your trial account.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      questions: [
        {
          q: 'What devices are supported?',
          a: 'iOS devices: iPhone 6s or newer with iOS 13.0+, iPad (6th generation) or newer. Web App: Modern browsers (Chrome, Safari, Firefox) with JavaScript enabled.'
        },
        {
          q: 'Do I need an internet connection?',
          a: 'Yes, all Workside apps require an active internet connection for real-time synchronization and data access.'
        },
        {
          q: 'How do I reset my password?',
          a: 'Use the "Forgot Password" link on the login screen, or contact support at support@worksidesoftware.com for assistance.'
        },
        {
          q: 'The app is running slowly. What should I do?',
          a: 'Ensure you have the latest app version, adequate device storage, and a stable internet connection. If issues persist, contact technical support at tech@worksidesoftware.com.'
        }
      ]
    },
    {
      id: 'client',
      title: 'Client App',
      questions: [
        {
          q: 'How do I submit a service request?',
          a: 'Open the Client App, tap "New Request," fill in the required details including location, service type, and preferred time window, then submit for vendor bidding.'
        },
        {
          q: 'Can I track my service requests?',
          a: 'Yes, the Client App provides real-time tracking with status updates, ETA alerts, and progress notifications from en route to completion.'
        },
        {
          q: 'How do I select a vendor?',
          a: 'After submitting a request, you\'ll receive bids from qualified vendors. Review their profiles, ratings, and pricing, then select your preferred vendor.'
        },
        {
          q: 'Can I schedule future services?',
          a: 'Yes, you can schedule services in advance and set preferred time windows that work for your operations.'
        }
      ]
    },
    {
      id: 'supplier',
      title: 'Supplier App',
      questions: [
        {
          q: 'How do I receive job notifications?',
          a: 'Enable push notifications in the Supplier App. You\'ll receive alerts for new requests matching your service areas and capabilities.'
        },
        {
          q: 'How does the bidding process work?',
          a: 'When a relevant request appears, review the details and submit your bid including pricing and estimated completion time. Clients will review and select their preferred vendor.'
        },
        {
          q: 'Can I use GPS navigation in the app?',
          a: 'Yes, the Supplier App includes integrated turn-by-turn navigation to help you reach job sites efficiently.'
        },
        {
          q: 'How do I mark a job as completed?',
          a: 'Use the app to update job status at each milestone (en route, on-site, completed) and upload proof of delivery including photos, notes, and digital signatures.'
        }
      ]
    },
    {
      id: 'admin',
      title: 'Web Host App (Admin)',
      questions: [
        {
          q: 'What features are available in the admin dashboard?',
          a: 'The Web Host App includes request management, vendor selection, interactive dashboards, route planning with map visualization, real-time tracking, and integration with ERP systems.'
        },
        {
          q: 'Can I integrate with existing business systems?',
          a: 'Yes, Workside integrates with popular systems including SAP, QuickBooks, ZoHo, and other ERP, accounting, and inventory management platforms.'
        },
        {
          q: 'How do I monitor vendor performance?',
          a: 'The dashboard provides comprehensive vendor metrics including completion rates, response times, customer ratings, and historical performance data.'
        },
        {
          q: 'Can I set up route deviation alerts?',
          a: 'Yes, the system monitors planned routes and sends automatic alerts when vendors deviate from optimized paths.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account & Billing',
      questions: [
        {
          q: 'How do I update my account information?',
          a: 'Log into your account through any Workside app and navigate to Profile/Settings to update your information.'
        },
        {
          q: 'How is billing handled?',
          a: 'Billing is managed through the Web Host App with integration to your accounting systems. Contact billing@worksidesoftware.com for specific questions.'
        },
        {
          q: 'Can I add or remove users from my organization?',
          a: 'Yes, organization administrators can manage user access through the Web Host App admin panel or by contacting support.'
        },
        {
          q: 'What if I need to cancel my service?',
          a: 'Contact our support team at support@worksidesoftware.com to discuss cancellation options and any applicable terms.'
        }
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen">
      <img
        src={process.env.PUBLIC_URL + "background.jpg"}
        alt="Background"
        className="w-full h-full object-cover fixed top-0 left-0 -z-10"
      />
      <div className="max-w-[1200px] m-auto pt-12 pb-8">
        <div className="w-full flex flex-col p-4">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-4 text-white">
            Frequently Asked Questions
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl italic mb-6 text-white">
            Find Answers to Common Questions
          </h2>
          
          <div className="space-y-4">
            {faqSections.map((section) => (
              <div key={section.id} className="bg-black/40 rounded-lg p-4">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full text-left flex justify-between items-center font-bold text-lg md:text-xl text-black hover:text-gray-700 transition-colors"
                >
                  {section.title}
                  <span className="text-2xl">
                    {openSections[section.id] ? '−' : '+'}
                  </span>
                </button>
                
                {openSections[section.id] && (
                  <div className="mt-4 space-y-4">
                    {section.questions.map((item, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-green-300">
                        <h4 className="font-semibold text-white mb-3 bg-gray-800 p-3 rounded">
                          {item.q}
                        </h4>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

                              <div className="mt-8 bg-green-900/30 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-green-300">Still Have Questions?</h3>
            <p className="mb-4 text-white">Can't find what you're looking for? Our support team is here to help!</p>
            <div className="space-y-2 text-white">
              <p>📧 Email: <a href="mailto:support@worksidesoftware.com" className="text-green-300 underline">support@worksidesoftware.com</a></p>
              <p>📞 Phone: <span className="text-green-300">1-888-555-6666</span></p>
                <p>🕐 Hours: Monday - Friday, 7:00 AM - 5:00 PM PST</p>
              <p className="mt-3">
                <a href="/support" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold transition-colors">
                  Visit Support Center
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 