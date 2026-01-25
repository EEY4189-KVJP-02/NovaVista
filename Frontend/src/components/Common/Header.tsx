import React, { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { authService } from "../../services/Auth";
import "./Header.css";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isAuthed, setIsAuthed] = useState<boolean>(() => authService.isAuthenticated());
  const [role, setRole] = useState<string | null>(() => localStorage.getItem("userRole"));
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem("userName"));

  useEffect(() => {
    // Re-evaluate auth state on navigation and localStorage changes.
    const sync = () => {
      setIsAuthed(authService.isAuthenticated());
      setRole(localStorage.getItem("userRole"));
      setUsername(localStorage.getItem("userName"));
    };

    sync();

    const onStorage = (e: StorageEvent) => {
      if (!e.key || ["token", "userRole", "userName", "isAuthenticated"].includes(e.key)) {
        sync();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [location.key]);

  const isAdmin = useMemo(() => role === "admin", [role]);
  const displayName = useMemo(() => {
    if (!isAuthed) return null;
    // Requirement: when admin logs in show username as "admin"
    if (role === "admin") return "admin";
    return username || "user";
  }, [isAuthed, role, username]);

  const logout = () => {
    authService.removeToken();
    setIsAuthed(false);
    setRole(null);
    setUsername(null);
    navigate("/");
  };

  return (
    <header className="nv-header">
      <div className="nv-top">
        <div className="nv-logo"><Link to="/" className=" nv-logo h4">
            NOVA VISTA
          </Link></div>

        <div className="nv-auth">
          {!isAuthed ? (
            <>
              <Link to="/login" className="btn btn-primary me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          ) : (
            <div className="nv-auth-logged">
              {displayName && <span className="nv-user-pill">{displayName}</span>}
              <button type="button" className="btn btn-outline-secondary" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <nav className="nv-nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : undefined)}>
          Home
        </NavLink>
        <NavLink to="/hotel" className={({ isActive }) => (isActive ? "active" : undefined)}>
          Hotels
        </NavLink>
        <NavLink to="/room-booking" className={({ isActive }) => (isActive ? "active" : undefined)}>
          Rooms
        </NavLink>
        <NavLink to="/event-hall" className={({ isActive }) => (isActive ? "active" : undefined)}>
          Event hall
        </NavLink>
        <NavLink to="/event-booking" className={({ isActive }) => (isActive ? "active" : undefined)}>
          Event booking
        </NavLink>
        {isAdmin && (
          <NavLink to="/admin/rooms" className={({ isActive }) => (isActive ? "active" : undefined)}>
            Admin
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
