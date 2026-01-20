import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated');
    const name = localStorage.getItem('userName');
    setIsAuthenticated(authStatus === 'true');
    setUserName(name);
  }, [location]);

  const handleLogout = async () => {
    try {
      const { authService } = await import('../../services/auth');
      authService.removeToken();
    } catch (err) {
      console.error('Error during logout:', err);
    }
    setIsAuthenticated(false);
    setUserName(null);
    navigate('/');
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-brand">
          <Link to="/" className="brand-link">
            <h1 className="brand-name">Nova Vista</h1>
            <p className="brand-tagline">Luxury Hospitality Experience</p>
          </Link>
        </div>
        
        <nav className="header-nav">
          <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>
            Home
          </Link>
          <Link to="/branchbook" className={location.pathname === '/branchbook' ? 'nav-link active' : 'nav-link'}>
            Locations
          </Link>
          <Link to="/event" className={location.pathname === '/event' ? 'nav-link active' : 'nav-link'}>
            Events
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
        </nav>

        <div className="header-actions">
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
        </div>
      </div>
    </header>
  );
};

export default Header;