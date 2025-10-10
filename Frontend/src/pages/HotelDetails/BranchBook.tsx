import React from "react";
import BranchCard from "./BranchCard";
import "./BranchBook.css";
import CommonHero from "../../components/Common/CommonHero";

const BranchBook: React.FC = () => {
  const branches = [
    {
      image: "/Images/jaffna.jpg",
      name: "Nova Vista - Jaffna Branch",
      location: "Jaffna",
      features: "Free Wi-Fi • Event Halls",
      rating: 4.8,
    },
    {
      image: "/Images/kilinochchi.jpg",
      name: "Nova Vista - Kilinochchi Branch",
      location: "Kilinochchi",
      features: "Free Wi-Fi • Event Halls",
      rating: 4.6,
    },
    {
      image: "/Images/mannar.jpg",
      name: "Nova Vista - Mannar Branch",
      location: "Mannar",
      features: "Free Wi-Fi • Event Halls",
      rating: 4.7,
    },
  ];

  return (
    <div className="branchbook-wrapper">
    {/* ===== Hero Section ===== */}
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="search-bar">
            <button>Check-in-Date</button>
            <button>Check-out-Date</button>
            <button>ROOMS</button>
            <button className="gold-btn">Check Rates</button>
          </div>
        </div>
      </div>

      {/* ===== About Section ===== */}
      <div className="about-section">
        <h2>About the Hotel</h2>
        <p>
          Nova Vista Hotels is a growing chain in Northern Sri Lanka with
          branches in Jaffna, Kilinochchi, and Mannar. Known for blending
          cultural authenticity with modern comforts, Nova Vista provides elegant
          stays and versatile event spaces. With its focus on innovation and
          sustainability, the brand is embracing a centralized Hotel & Event
          Management System to deliver seamless service and unforgettable guest
          experiences across all its branches.
        </p>
      </div>

      {/* ===== Branches Section ===== */}
      <div className="branchbook-container">
        <h2 className="title">Our Branches</h2>
        <div className="branch-grid">
          {branches.map((b, index) => (
            <BranchCard key={index} {...b} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchBook;
