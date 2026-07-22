import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import DoctorDetail from "./pages/DoctorDetail";
import Reviews from "./pages/Reviews";
import PatientCorner from "./pages/PatientCorner";
import DocumentViewer from "./pages/DocumentViewer";
import Works from "./pages/Works";
import Price from "./pages/Price";
import BrowserPage from "./pages/BrowserPage";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetail />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/patient-corner" element={<PatientCorner />} />
      <Route path="/patient-corner/:id" element={<DocumentViewer />} />
      <Route path="/works" element={<Works />} />
      <Route path="/price" element={<Price />} />
      <Route path="/browser" element={<BrowserPage />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
