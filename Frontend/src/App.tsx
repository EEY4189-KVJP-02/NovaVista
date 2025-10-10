import "bootstrap/dist/css/bootstrap.min.css";
import { Event } from "./pages/Event/Event";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import "./App.css";
import EventBooking from "./pages/EventBooking/EventBooking";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/event" element={<Event />} />
          <Route path="/event-booking" element={<EventBooking />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
