import "bootstrap/dist/css/bootstrap.min.css";
import { Event } from "./pages/Event/Event";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import BranchBook from "./pages/HotelDetails/BranchBook";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/event" element={<Event />} />
          <Route path="/branchbook" element={<BranchBook />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
