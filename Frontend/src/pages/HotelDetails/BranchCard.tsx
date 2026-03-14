// src/pages/HotelDetails/BranchCard.tsx
import React from "react";
import "./BranchCard.css";

export type AvailabilityStatus = "unknown" | "available" | "unavailable";

interface Props {
  id: number;
  name: string;
  location: string;
  images: string[];
  rating: number;
  short_desc?: string;

  onViewDetails: (id: number) => void;
  onBookNowClick: (hotelId: number) => void;

  availabilityStatus: AvailabilityStatus;
}

const BranchCard: React.FC<Props> = ({
  id,
  name,
  location,
  images,
  rating,
  short_desc,
  onViewDetails,
  onBookNowClick,
  availabilityStatus,
}) => {
  const isDisabled = availabilityStatus === "unavailable";

  return (
    <div className="branch-card">
      <div className="card-grid">
        {images?.slice(0, 2).map((img, idx) => (
          <img key={idx} src={img} alt={`${name} ${idx + 1}`} className="card-img" />
        ))}
        {images?.[2] && (
          <img src={images[2]} alt={`${name} 3`} className="card-img full-width" />
        )}
      </div>

      <div className="branch-info">
        <h3>{name}</h3>
        <p className="loc">{location}</p>
        {short_desc && <p className="short">{short_desc}</p>}

        <div className="card-footer">
          <div className="rating">⭐ {rating.toFixed(1)}</div>

          <button
            type="button"
            className={`book-now-btn ${isDisabled ? "disabled" : ""}`}
            disabled={isDisabled}
            onClick={() => onBookNowClick(id)}
          >
            {isDisabled ? "Not Available" : "Book Now"}
          </button>

          <button type="button" className="view-btn" onClick={() => onViewDetails(id)}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;
