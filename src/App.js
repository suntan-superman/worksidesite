import React from "react";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import WorksidePanel from "./components/WorksidePanel";
import About from "./components/About";
import Products from "./components/Products";
import Services from "./components/Services";
import ContactWorkside from "./components/ContactWorkside";
import Policies from "./components/Policies";
import { Route, Routes } from "react-router-dom";
import SMSTextOptInForm from "./components/SMSTextOptInForm";
import SMSTermsAndConditions from "./components/SMSTermsAndConditions";
import Privacy from "./components/Privacy";
import RegistrationForm from "./components/RegistrationForm";
import Support from "./components/Support";
import FAQ from "./components/FAQ";
import Terms from "./components/Terms";



function App() {

  return (
    <>
      <div>
        <TopBar />
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<WorksidePanel />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactWorkside />} />
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
    </>
  );
}

export default App;
