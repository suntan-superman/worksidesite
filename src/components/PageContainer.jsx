import React from "react";

/**
 * PageContainer - Provides consistent layout structure for all pages
 * Includes proper spacing, max-width, and responsive design
 */
const PageContainer = ({ children, className = "" }) => {
  return (
    <div className={`w-full min-h-screen flex flex-col ${className}`}>
      <main className="flex-grow">
        <div className="container-max section-spacing">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageContainer;
