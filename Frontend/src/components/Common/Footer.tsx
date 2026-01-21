import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="nv-footer">
      <div className="nv-footer-container">
        <div>
          <h4>Nova Vista</h4>
          <p>- nice to stay -</p>
          <p>
            Nova Vista Hotel Reservation Company. We offer a choice from northern
            hotels across Jaffna, Mannar and Kilinochchi.
          </p>
        </div>

        <div>
          <h5>Quick Links</h5>
          <p>Home</p>
          <p>Hotels</p>
          <p>Rooms</p>
          <p>Events</p>
          <p>Contact</p>
        </div>

        <div>
          <h5>Contact</h5>
          <p>Email: info@novavista.com</p>
          <p>Phone: 021 222 5434</p>
          <p>Jaffna, Sri Lanka</p>
        </div>
      </div>

      <div className="nv-footer-bottom">
        © 2026 Nova Vista. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
