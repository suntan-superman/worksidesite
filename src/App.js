import React from "react";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import WorksidePanel from "./components/WorksidePanel";
import About from "./components/About";
import Services from "./components/Services";
import ContactWorkside from "./components/ContactWorkside";
import Policies from "./components/Policies";
import { Navigate, Route, Routes } from "react-router-dom";
import SMSTextOptInForm from "./components/SMSTextOptInForm";
import SMSTermsAndConditions from "./components/SMSTermsAndConditions";
import Privacy from "./components/Privacy";
import RegistrationForm from "./components/RegistrationForm";
import Support from "./components/Support";
import FAQ from "./components/FAQ";
import Terms from "./components/Terms";
import { Portfolio, ProjectDetail } from "./components/Portfolio";
import Seo from "./components/Seo";
import AdminContent from "./components/AdminContent";



function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <TopBar />
        <NavBar />
      </div>
      <main className="flex-grow">
        <Seo />
        <Routes>
          <Route path="/" element={<WorksidePanel />} />
          <Route path="/work" element={<Portfolio />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="/products" element={<Navigate to="/work/workside-logistics" replace />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<ContactWorkside />} />
          <Route path="/admin/content" element={<AdminContent />} />
          <Route path="/about" element={<About />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/smstextoptinform" element={<SMSTextOptInForm />} />
          <Route path="/smsterms" element={<SMSTermsAndConditions />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/support" element={<Support />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
