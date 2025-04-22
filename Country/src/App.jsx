import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import About from "./pages/About";

function App() {
  const [darkmode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkmode");
    return savedMode === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkmode", darkmode);
  }, [darkmode]);

  return (
    <div className={`App ${darkmode ? "dark" : "light"}`}>
      <Router>
        <Navbar setDarkMode={setDarkMode} darkmode={darkmode} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about/:id" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
