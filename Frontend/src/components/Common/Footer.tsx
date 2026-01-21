import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Hotel Information */}
          <div className="footer-section">
            <h3 className="footer-title">Nova Vista Hotels</h3>
            <p className="footer-description">
              Experience luxury and comfort in the heart of Northern Sri Lanka. 
              We provide exceptional hospitality with modern amenities and traditional warmth.
            </p>
            <div className="footer-contact">
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:info@novavista.com">info@novavista.com</a>
              </p>
              <p>
                <strong>Phone:</strong>{' '}
                <a href="tel:+94112345678">+94 11 234 5678</a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/branchbook">Locations</Link>
              </li>
              <li>
                <Link to="/event">Events Booking</Link>
              </li>
              <li>
                <Link to="/room-booking">Rooms Booking</Link>
              </li>
            </ul>
          </div>

          {/* About & Information */}
          <div className="footer-section">
            <h4 className="footer-heading">Information</h4>
            <ul className="footer-links">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/terms">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div className="footer-section">
            <h4 className="footer-heading">Our Locations</h4>
            <ul className="footer-links">
              <li>
                <strong>Jaffna Branch</strong>
                <br />
                <span className="footer-address">123 Main Street, Jaffna</span>
              </li>
              <li>
                <strong>Kilinochchi Branch</strong>
                <br />
                <span className="footer-address">456 Central Road, Kilinochchi</span>
              </li>
              <li>
                <strong>Mannar Branch</strong>
                <br />
                <span className="footer-address">789 Beach Road, Mannar</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Nova Vista Hotels. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
