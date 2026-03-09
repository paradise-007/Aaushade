import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Identify from "./pages/Identify";
import Explore from "./pages/Explore";

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/identify" element={<Identify />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}