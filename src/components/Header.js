

import React from 'react';

function Header() {
  return (
    <nav className="navbar navbar-light bg-light mb-4">
      <div className="container-fluid">
        <form className="d-flex">
          <input
            type="date"
            className="form-control me-2"
            defaultValue="2025-09-10"
          />
          <input
            type="date"
            className="form-control me-2"
            defaultValue="2025-09-21"
          />
          <select className="form-select me-2" defaultValue="Room Types">
            <option>Room Types</option>
            <option>Standard</option>
            <option>Double</option>
            <option>Deluxe</option>
          </select>
          <select className="form-select me-2" defaultValue="Hotel Location">
            <option>Hotel Location</option>
            <option>Jaffna</option>
            <option>Kilinochchi</option>
            <option>Mannar</option>
          </select>
          <button className="btn btn-primary">Search</button>
        </form>
      </div>
    </nav>
  );
}

export default Header;