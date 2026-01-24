import { Link } from "react-router-dom";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="nv-footer">
      <div className="nv-footer-container">
        <div>
          <Link to="/"><h4> Nova Vista</h4></Link>
          
          <p>- nice to stay -</p>
          <p>
            Nova Vista Hotel Reservation Company. We offer a choice from northern
            hotels across Jaffna, Mannar and Kilinochchi.
          </p>
        </div>

       
{/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/hotel">Hotels</Link>
              </li>
              <li>
                <Link to="/event-hall">Event hall</Link>
              </li>
              <li>
                <Link to="/room-booking">Room booking</Link>
              </li>
            </ul>
          </div>

        <div>
          <h5>Contact</h5>
           <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:info@novavista.com">info@novavista.com</a>
              </p>
              <p>
                <strong>Phone:</strong>{' '}
                <a href="tel:+94112345678">+94 11 234 5678</a>
              </p>
               <strong>Our Location</strong>{' '}
          <p>Jaffna, Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
