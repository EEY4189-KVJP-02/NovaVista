import { Link } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="nv-header">
      <div className="nv-top">
        <div className="nv-logo"><Link to="/" className=" nv-logo h4">
            NOVA VISTA
          </Link></div>

        <div className="nv-auth">
          <Link to="/login" className="btn btn-primary me-2">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>
        </div>
      </div>

      <nav className="nv-nav">
        <Link to="/">Home</Link>
        <Link to="/hotel">Hotels</Link>
        <Link to="/room-booking">Rooms</Link>
        <Link to="/event-hall">Event hall</Link>
        <Link to="/event-booking">Event booking</Link>
      </nav>
    </header>
  );
};

export default Header;
