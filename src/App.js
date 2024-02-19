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
        {/* </Route> */}
        {/* <Route path="/about">
          <Route index element={<About />} />
          <Route path="Policies" element={<Policies />} />
        </Route> */}
      </Routes>
    </>
  );
}

export default App;
