import React from 'react';
import './Terms.css';

const Terms = () => {
  return (
    <div className="terms-page">
      <div className="terms-hero">
        <div className="container">
          <h1>Terms & Conditions</h1>
          <p className="hero-subtitle">Please read our terms carefully before booking</p>
        </div>
      </div>

      <div className="container">
        <section className="terms-content">
          <div className="terms-section">
            <h2>1. Booking and Reservation</h2>
            <p>
              By making a reservation with Nova Vista Hotels, you agree to these terms and conditions. 
              All bookings are subject to availability and confirmation by the hotel.
            </p>
            <ul>
              <li>Reservations can be made online, by phone, or in person at any of our locations.</li>
              <li>All bookings require a valid credit card or payment method.</li>
              <li>Guests must be 18 years or older to make a reservation.</li>
              <li>We reserve the right to refuse service to anyone.</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>2. Payment Terms</h2>
            <p>
              Payment terms vary based on the type of booking and package selected:
            </p>
            <ul>
              <li><strong>Room Bookings:</strong> Payment may be required at the time of booking or upon check-in, 
              depending on the rate selected.</li>
              <li><strong>Event Bookings:</strong> A deposit is typically required to confirm your event booking. 
              The remaining balance is due as specified in your event contract.</li>
              <li>All prices are in Sri Lankan Rupees (LKR) unless otherwise stated.</li>
              <li>Additional charges may apply for extra services, amenities, or damages.</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>3. Cancellation and Refund Policy</h2>
            <h3>Room Bookings:</h3>
            <ul>
              <li>Cancellations made 48 hours or more before check-in: Full refund (minus processing fees).</li>
              <li>Cancellations made less than 48 hours before check-in: 50% refund.</li>
              <li>No-shows: No refund will be provided.</li>
              <li>Special rates and packages may have different cancellation policies as specified at booking.</li>
            </ul>
            <h3>Event Bookings:</h3>
            <ul>
              <li>Cancellations made 30 days or more before the event: Full refund of deposit (minus processing fees).</li>
              <li>Cancellations made 14-29 days before the event: 50% refund of deposit.</li>
              <li>Cancellations made less than 14 days before the event: No refund.</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>4. Check-in and Check-out</h2>
            <ul>
              <li><strong>Check-in:</strong> 2:00 PM onwards</li>
              <li><strong>Check-out:</strong> 11:00 AM</li>
              <li>Early check-in and late check-out are subject to availability and may incur additional charges.</li>
              <li>Valid government-issued photo identification is required at check-in.</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>5. Guest Responsibilities</h2>
            <ul>
              <li>Guests are responsible for any damage to hotel property during their stay.</li>
              <li>Smoking is prohibited in all indoor areas. Designated smoking areas are available.</li>
              <li>Pets are not allowed unless prior arrangements have been made.</li>
              <li>Guests must comply with all hotel policies and local laws.</li>
              <li>Excessive noise or disruptive behavior may result in eviction without refund.</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>6. Liability</h2>
            <p>
              Nova Vista Hotels is not liable for any loss, damage, or injury to guests or their property 
              during their stay, except where such loss or damage is caused by our negligence. Guests are 
              advised to secure appropriate travel insurance.
            </p>
          </div>

          <div className="terms-section">
            <h2>7. Privacy and Data Protection</h2>
            <p>
              We collect and process personal information in accordance with our Privacy Policy. By making 
              a booking, you consent to the collection and use of your personal information as described 
              in our Privacy Policy.
            </p>
          </div>

          <div className="terms-section">
            <h2>8. Force Majeure</h2>
            <p>
              Nova Vista Hotels shall not be liable for any failure to perform its obligations due to 
              circumstances beyond its reasonable control, including but not limited to natural disasters, 
              pandemics, government actions, or other force majeure events.
            </p>
          </div>

          <div className="terms-section">
            <h2>9. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these terms and conditions at any time. Changes will be 
              effective immediately upon posting on our website. Continued use of our services after 
              changes constitutes acceptance of the modified terms.
            </p>
          </div>

          <div className="terms-section">
            <h2>10. Contact Information</h2>
            <p>
              For questions about these terms and conditions, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> info@novavista.com</li>
              <li><strong>Phone:</strong> +94 11 234 5678</li>
              <li><strong>Address:</strong> Nova Vista Hotels, 123 Main Street, Jaffna, Sri Lanka</li>
            </ul>
          </div>

          <div className="terms-footer">
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Terms;
