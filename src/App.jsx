import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AnalysisPage from "./pages/AnalysisPage";
// import PlaceholderPage from "./pages/PlaceholderPage"; // No longer needed
import TaxConversionPage from "./pages/TaxConversionPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/tax" element={<TaxConversionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
