import React from 'react';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-page">
      <div className="privacy-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p className="hero-subtitle">Your privacy is important to us</p>
        </div>
      </div>

      <div className="container">
        <section className="privacy-content">
          <div className="privacy-section">
            <h2>Introduction</h2>
            <p>
              Nova Vista Hotels ("we," "our," or "us") is committed to protecting your privacy. This 
              Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
              you visit our website, make reservations, or use our services.
            </p>
            <p>
              By using our services, you agree to the collection and use of information in accordance 
              with this policy.
            </p>
          </div>

          <div className="privacy-section">
            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect the following types of personal information:</p>
            <ul>
              <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address</li>
              <li><strong>Booking Information:</strong> Reservation details, check-in/check-out dates, guest preferences</li>
              <li><strong>Payment Information:</strong> Credit card details, billing address (processed securely through payment processors)</li>
              <li><strong>Identification:</strong> Government-issued ID numbers (for verification purposes)</li>
              <li><strong>Account Information:</strong> Username, password (encrypted), profile information</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <ul>
              <li>IP address and browser type</li>
              <li>Device information and operating system</li>
              <li>Website usage data and browsing patterns</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>To process and manage your reservations and bookings</li>
              <li>To communicate with you about your bookings, inquiries, and our services</li>
              <li>To process payments and prevent fraudulent transactions</li>
              <li>To improve our website, services, and customer experience</li>
              <li>To send you promotional materials and special offers (with your consent)</li>
              <li>To comply with legal obligations and respond to legal requests</li>
              <li>To protect our rights, property, and safety, as well as that of our guests</li>
              <li>To analyze usage patterns and trends for business improvement</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>Information Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
            <ul>
              <li><strong>Service Providers:</strong> We may share information with third-party service providers who 
              assist us in operating our website, processing payments, or providing services to you.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, 
              your information may be transferred to the new entity.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law, court order, 
              or government regulation.</li>
              <li><strong>Safety and Security:</strong> We may share information to protect the safety and security 
              of our guests, employees, or property.</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul>
              <li>Encryption of sensitive data during transmission (SSL/TLS)</li>
              <li>Secure storage of personal information</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication procedures</li>
              <li>Employee training on data protection</li>
            </ul>
            <p>
              However, no method of transmission over the internet or electronic storage is 100% secure. 
              While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </div>

          <div className="privacy-section">
            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your browsing experience, analyze 
              website traffic, and personalize content. You can control cookie preferences through your 
              browser settings, but disabling cookies may affect website functionality.
            </p>
          </div>

          <div className="privacy-section">
            <h2>Your Rights and Choices</h2>
            <p>You have the following rights regarding your personal information:</p>
            <ul>
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
              <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the contact information provided below.
            </p>
          </div>

          <div className="privacy-section">
            <h2>Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined 
              in this Privacy Policy, unless a longer retention period is required or permitted by law. 
              When we no longer need your information, we will securely delete or anonymize it.
            </p>
          </div>

          <div className="privacy-section">
            <h2>Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 18. We do not knowingly collect 
              personal information from children. If you believe we have collected information from a child, 
              please contact us immediately.
            </p>
          </div>

          <div className="privacy-section">
            <h2>International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your country of 
              residence. We ensure that appropriate safeguards are in place to protect your information 
              in accordance with this Privacy Policy.
            </p>
          </div>

          <div className="privacy-section">
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last Updated" date. You are 
              advised to review this Privacy Policy periodically for any changes.
            </p>
          </div>

          <div className="privacy-section">
            <h2>Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> privacy@novavista.com</li>
              <li><strong>Phone:</strong> +94 11 234 5678</li>
              <li><strong>Address:</strong> Nova Vista Hotels, 123 Main Street, Jaffna, Sri Lanka</li>
            </ul>
          </div>

          <div className="privacy-footer">
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
