import React, { useState } from "react";

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

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
          a: 'Pricing varies based on your organization size and needs. Contact our sales team at contact@worksidesoftware.com or call 202-933-5631 for a custom quote.'
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
    <div className="w-full bg-white">
      {/* Header */}
      <div className="py-16 md:py-20 border-b border-gray-200">
        <div className="container-max">
          <h1 className="mb-3">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">Find answers to common questions about Workside Software</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-max section-spacing">
        <div className="space-y-8 max-w-3xl">
          {faqSections.map((section) => (
            <div key={section.id}>
              <h2 className="mb-6 text-lg font-semibold text-gray-900">{section.title}</h2>
              
              <div className="space-y-4">
                {section.questions.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setOpenQuestion(openQuestion === `${section.id}-${index}` ? null : `${section.id}-${index}`)}
                      className="w-full text-left p-4 hover:bg-gray-50 transition-colors flex justify-between items-center"
                    >
                      <h3 className="font-medium text-gray-900">{item.q}</h3>
                      <span className="text-gray-600 ml-4">
                        {openQuestion === `${section.id}-${index}` ? '−' : '+'}
                      </span>
                    </button>
                    
                    {openQuestion === `${section.id}-${index}` && (
                      <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50">
                        <p className="text-gray-600 mt-4">{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 max-w-3xl">
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-3">Still have questions?</h2>
            <p className="text-gray-600 mb-6">Our support team is here to help.</p>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-900">Email</p>
                <a href="mailto:support@worksidesoftware.com" className="text-base hover:text-gray-600">
                  support@worksidesoftware.com
                </a>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Hours</p>
                <p className="text-gray-600">Monday - Friday, 7:00 AM - 5:00 PM PST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 