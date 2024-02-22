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

// import { registerLicense } from "@syncfusion/ej2-base";

// import { pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();

function App() {
  //   registerLicense(
  //     "Ngo9BigBOggjHTQxAR8/V1NAaF1cXmhLYVFwWmFZfVpgcF9GYFZURWY/P1ZhSXxXdkdiUH5YcHRQR2BZU0U="
  //   );

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
      </Routes>
    </>
  );
}

export default App;
