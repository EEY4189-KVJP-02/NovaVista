import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1>About Nova Vista Hotels</h1>
          <p className="hero-subtitle">Luxury Hospitality in Northern Sri Lanka</p>
        </div>
      </div>

      <div className="container">
        <section className="about-content">
          <div className="about-section">
            <h2>Our Story</h2>
            <p>
              Nova Vista Hotels is a premier hospitality chain established in Northern Sri Lanka, 
              dedicated to providing exceptional guest experiences across our three strategic locations: 
              Jaffna, Kilinochchi, and Mannar. Founded with a vision to blend cultural authenticity with 
              modern luxury, we have become a trusted name in the region's hospitality industry.
            </p>
            <p>
              Our journey began with a commitment to excellence and a passion for showcasing the rich 
              heritage and natural beauty of Northern Sri Lanka. Today, Nova Vista Hotels stands as a 
              symbol of comfort, elegance, and warm hospitality.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              To provide world-class hospitality services that exceed guest expectations while preserving 
              and celebrating the unique cultural identity of Northern Sri Lanka. We strive to create 
              memorable experiences through personalized service, modern amenities, and genuine care for 
              our guests.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Values</h2>
            <ul className="values-list">
              <li>
                <strong>Excellence:</strong> We are committed to maintaining the highest standards in 
                everything we do, from service delivery to facility management.
              </li>
              <li>
                <strong>Hospitality:</strong> Warm, genuine hospitality is at the heart of our operations. 
                We treat every guest as family.
              </li>
              <li>
                <strong>Innovation:</strong> We embrace modern technology and innovative solutions to 
                enhance guest experiences and operational efficiency.
              </li>
              <li>
                <strong>Sustainability:</strong> We are dedicated to sustainable practices that protect 
                our environment and support local communities.
              </li>
              <li>
                <strong>Cultural Heritage:</strong> We honor and celebrate the rich cultural heritage 
                of Northern Sri Lanka in our design, service, and guest experiences.
              </li>
            </ul>
          </div>

          <div className="about-section">
            <h2>Our Locations</h2>
            <div className="locations-grid">
              <div className="location-card">
                <h3>Jaffna Branch</h3>
                <p>Located in the heart of Jaffna, our flagship property offers easy access to historical 
                sites, cultural attractions, and business centers.</p>
                <p><strong>Address:</strong> 123 Main Street, Jaffna</p>
              </div>
              <div className="location-card">
                <h3>Kilinochchi Branch</h3>
                <p>Our modern facility in Kilinochchi provides comfortable accommodations and excellent 
                event spaces for both business and leisure travelers.</p>
                <p><strong>Address:</strong> 456 Central Road, Kilinochchi</p>
              </div>
              <div className="location-card">
                <h3>Mannar Branch</h3>
                <p>Experience seaside luxury at our Mannar location, perfect for those seeking tranquility 
                and natural beauty.</p>
                <p><strong>Address:</strong> 789 Beach Road, Mannar</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Why Choose Nova Vista?</h2>
            <div className="features-grid">
              <div className="feature-item">
                <h4>🏨 Premium Accommodations</h4>
                <p>Elegantly designed rooms with modern amenities and comfortable furnishings.</p>
              </div>
              <div className="feature-item">
                <h4>🎉 Versatile Event Spaces</h4>
                <p>State-of-the-art event halls perfect for conferences, weddings, and celebrations.</p>
              </div>
              <div className="feature-item">
                <h4>🍽️ Exceptional Dining</h4>
                <p>Delicious local and international cuisine prepared by our expert chefs.</p>
              </div>
              <div className="feature-item">
                <h4>👥 Professional Service</h4>
                <p>Dedicated staff committed to ensuring your comfort and satisfaction.</p>
              </div>
              <div className="feature-item">
                <h4>📍 Strategic Locations</h4>
                <p>Conveniently located in key areas of Northern Sri Lanka.</p>
              </div>
              <div className="feature-item">
                <h4>💻 Modern Technology</h4>
                <p>Seamless booking system and digital services for your convenience.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
