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
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
//import Login from "./Login";
//import Register from "./Register";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<Event />} />
          <Route path="/branchbook" element={<BranchBook />} />
          <Route path="/event-booking" element={<EventBooking />} />
          <Route path="/room-booking" element={<RoomBooking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
