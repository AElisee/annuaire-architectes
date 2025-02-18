import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Structure from "./pages/Structure.jsx";
import Footer from "./components/Footer.jsx";
import DetailsArchitecte from "./pages/DetailsArchitecte.jsx";

const App = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/annuaire" element={<HomePage />} />
        <Route path="architecte/:id" element={<DetailsArchitecte />} />
        {/* <Route path="structures/:id" element={<Structure />} /> */}
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
