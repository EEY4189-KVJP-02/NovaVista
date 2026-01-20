import React from "react";
import "./BranchCard.css";

interface Props {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  short_desc?: string;
  onViewDetails: (id: number) => void;
  onBookNow: (id: number, location: string) => void;
}

const BranchCard: React.FC<Props> = ({ id, name, location, image, rating, short_desc, onViewDetails, onBookNow }) => {
  return (
    <div className="branch-card">
      <img src={image} alt={name} className="branch-img" />
      <div className="branch-info">
        <h3>{name}</h3>
        <p className="loc">{location}</p>
        {short_desc && <p className="short">{short_desc}</p>}
        <div className="card-footer">
          <div className="rating">⭐ {rating.toFixed(1)}</div>
          <button className="book-now-btn" onClick={() => onBookNow(id, location)}>Book Now</button>
          <button className="view-btn" onClick={() => onViewDetails(id)}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;



