import React from "react";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import WorksidePanel from "./components/WorksidePanel";
import About from "./components/About";
import Services from "./components/Services";
import ContactWorkside from "./components/ContactWorkside";
import Policies from "./components/Policies";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <TopBar />
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<WorksidePanel />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactWorkside />} />
        <Route path="/about" element={<About />} />
        <Route path="Policies" element={<Policies />} />
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
