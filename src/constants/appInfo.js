/**
 * Application-wide constants and configuration
 * Update these values in one place to reflect changes across the entire application
 */

export const APP_INFO = {
  // Company Information
  companyName: "Workside Software",
  tagline: "Your Efficiency Partner",
  
  // Copyright and Legal
  copyrightYear: 2026,
  copyrightStartYear: 2024,
  
  // Contact Information
  phone: {
    main: "202-933-5631"
  },
  
  email: {
    contact: "contact@worksidesoftware.com",
    support: "support@worksidesoftware.com",
    technical: "tech@worksidesoftware.com",
    careers: "careers@worksidesoftware.com",
    privacy: "privacy@worksidesoftware.com",
    legal: "legal@worksidesoftware.com",
    billing: "billing@worksidesoftware.com"
  },
  
  // Website
  website: "www.worksidesoftware.com",
  websiteUrl: "https://www.worksidesoftware.com",
  
  // Location
  location: "Bakersfield, CA",
  
  // Business Hours
  businessHours: "Mon-Fri: 7am-5pm PST"
};

// Helper function to generate copyright text
export const getCopyrightText = (includeSymbol = true) => {
  const symbol = includeSymbol ? "© " : "";
  return `${symbol}${APP_INFO.copyrightYear} ${APP_INFO.companyName}. All rights reserved.`;
};

// Helper function to generate copyright text with year range
export const getCopyrightRangeText = (includeSymbol = true) => {
  const symbol = includeSymbol ? "© " : "";
  if (APP_INFO.copyrightStartYear === APP_INFO.copyrightYear) {
    return getCopyrightText(includeSymbol);
  }
  return `${symbol}${APP_INFO.copyrightStartYear}-${APP_INFO.copyrightYear} ${APP_INFO.companyName}. All rights reserved.`;
};

export default APP_INFO;
