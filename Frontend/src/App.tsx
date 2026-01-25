import "bootstrap/dist/css/bootstrap.min.css";
import { Event } from "./pages/Event/Event";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import BranchBook from "./pages/HotelDetails/BranchBook";
import Home from "./pages/Home/Home";
import "./App.css";
import EventBooking from "./pages/EventBooking/EventBooking";
import RoomDetails from "./pages/RoomBooking/RoomDetails";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import RoomsAdminDashboard from "./pages/AdminRooms/RoomsAdminDashboard";
//import Login from "./Login";
//import Register from "./Register";

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
          <Route path="/room-booking" element={<RoomDetails />} />
          <Route path="/admin/rooms" element={<RoomsAdminDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
