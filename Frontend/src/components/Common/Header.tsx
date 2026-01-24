import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem("isAuthenticated");
    const name = localStorage.getItem("userName");
    setIsAuthenticated(authStatus === "true");
    setUserName(name);
  }, [location]);

  const handleLogout = async () => {
    try {
      const { authService } = await import("../../services/Auth");
      authService.removeToken();
    } catch (err) {
      console.error("Error during logout:", err);
    }
    setIsAuthenticated(false);
    setUserName(null);
    navigate("/");
  };

  return (
    <header className="nv-header">
      <div className="nv-top">
        <div className="nv-logo">
          <Link to="/" className=" nv-logo h4">
            NOVA VISTA
          </Link>
        </div>

        {!isAuthenticated ? (
          <>
            {" "}
            <div className="nv-auth">
              {/* <span className="user-greeting">Welcome, {userName || 'User'}</span> */}
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="nv-auth">
            <Link to="/login" className="btn btn-primary me-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
        )}
        {/* <Link to="/login" className="btn btn-primary me-2">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Register
          </Link> */}
        {/* {isAuthenticated ? (
            <div className="nv-auth">
              <span className="user-greeting">Welcome, {userName || 'User'}</span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </div>
          ) : (
            <div className="anv-auth">
              <Link to="/login" className="btn-login">
                Login
              </Link>
              <Link to="/register" className="btn-register">
                Register
              </Link>
            </div>
          )} */}
      </div>
      {/* <div className="nv-auth">
          <Link to="/login" className="btn btn-primary me-2">
            Login
          </Link>
          <Link to="/room-booking" className={location.pathname === '/room-booking' ? 'nav-link active' : 'nav-link'}>
            Rooms
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'nav-link active' : 'nav-link'}>
              My Bookings
            </Link>
          )}
          {isAuthenticated && localStorage.getItem('userRole') === 'admin' && (
            <Link to="/admin" className={location.pathname === '/admin' ? 'nav-link active' : 'nav-link'}>
              Admin
            </Link>
          )}
        </div> */}

      {/* <div className="header-actions">
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-greeting">Welcome, {userName || 'User'}</span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="btn-login">
                Login
              </Link>
              <Link to="/register" className="btn-register">
                Register
              </Link>
            </div>
          )}
        </div> */}
      {/* </div> */}

      <div className="nv-nav">
        <Link to="/">Home</Link>
        <Link to="/hotel">Hotels</Link>
        <Link to="/room-booking">Rooms</Link>
        <Link to="/event-hall">Event hall</Link>
        <Link to="/event-booking">Event booking</Link>
        {isAuthenticated && (
          <Link
            to="/dashboard"
            className={
              location.pathname === "/dashboard"
                ? "nav-link active"
                : "nav-link"
            }
          >
            My Bookings
          </Link>
        )}
        {isAuthenticated && localStorage.getItem("userRole") === "admin" && (
          <Link
            to="/admin"
            className={
              location.pathname === "/admin" ? "nav-link active" : "nav-link"
            }
          >
            Admin
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
