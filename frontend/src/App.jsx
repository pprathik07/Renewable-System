import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navbar";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Services from "./components/Services";
import Footer from "./components/Footer";
import BatteryPage from "./pages/BatteryPage";
import SolarPage from "./pages/SolarPage";
import CustomCursor from "./components/CustomCursor";
import Loading from "./components/Loading";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#2e7d32" },
  },
});

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading effect
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust the delay as needed
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <CustomCursor /> {/* Custom Cursor Component */}
        {isLoading ? (
          <Loading /> // Show loading screen before rendering the app
        ) : (
          <>
            <Navigation />
            <Routes>
              <Route path="/" element={<><Hero /><Services /><Contact /></>} />
              <Route path="/solar" element={<SolarPage />} />
              <Route path="/battery" element={<BatteryPage />} />
            </Routes>
            <Footer />
          </>
        )}
      </Router>
    </ThemeProvider>
  );
};

export default App;
