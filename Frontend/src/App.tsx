import "bootstrap/dist/css/bootstrap.min.css";
import { Event } from "./pages/Event/Event";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import BranchBook from "./pages/HotelDetails/BranchBook";
import Home from "./pages/Home/Home";
import "./App.css";
import EventBooking from "./pages/EventBooking/EventBooking";
import RoomBooking from "./pages/RoomBooking/roombooking";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
//import Login from "./Login";
//import Register from "./Register";
import RoomDetails from "./pages/RoomBooking/RoomDetails";

import About from "./pages/About/About";
import Terms from "./pages/Terms/Terms";
import Privacy from "./pages/Privacy/Privacy";
import Contact from "./pages/Contact/Contact";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event-hall" element={<Event />} />
          <Route path="/hotel" element={<BranchBook />} />
          <Route path="/event-booking" element={<EventBooking />} />
          <Route path="/room-booking" element={<RoomBooking />} />
          <Route path="/room-details" element={<RoomDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
