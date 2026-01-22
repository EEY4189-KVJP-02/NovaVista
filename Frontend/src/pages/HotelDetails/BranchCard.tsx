import React from "react";
import "./BranchCard.css";
import { Link } from "react-router-dom";

interface Props {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  short_desc?: string;
  onViewDetails: (id: number) => void;
}

const BranchCard: React.FC<Props> = ({ id, name, location, image, rating, short_desc, onViewDetails }) => {
  return (
    <div className="branch-card">
      <img src={image} alt={name} className="branch-img" />
      <div className="branch-info">
        <h3>{name}</h3>
        <p className="loc">{location}</p>
        {short_desc && <p className="short">{short_desc}</p>}a
        <div className="card-footer">
          <div className="rating">⭐ {rating.toFixed(1)}</div>
          {/* Book Now navigates to existing booking page */}
          <Link to={`room-booking`} className="book-now-btn">Book Now</Link>
          <button className="view-btn" onClick={() => onViewDetails(id)}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;



