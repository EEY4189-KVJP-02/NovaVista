import { Link } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="nv-header">
      <div className="nv-top">
        <div className="nv-logo">NOVA VISTA</div>

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
        <Link to="/hotels">Hotels</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/event">Events</Link>
      </nav>
    </header>
  );
};

export default Header;
