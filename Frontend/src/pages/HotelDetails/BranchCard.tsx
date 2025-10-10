import React from "react";
import "./BranchCard.css";

interface BranchCardProps {
  image: string;
  name: string;
  location: string;
  features: string;
  rating: number;
}

const BranchCard: React.FC<BranchCardProps> = ({
  image,
  name,
  location,
  features,
  rating,
}) => {
  return (
    <div className="branch-card">
      <img src={image} alt={name} className="branch-image" />
      <div className="branch-content">
        <h3>{name}</h3>
        <p>{location}</p>
        <p className="features">{features}</p>
        <div className="rating">⭐ {rating} / 5</div>
        <div className="buttons">
          <button className="book-btn">BOOK NOW</button>
          <button className="view-btn">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;


