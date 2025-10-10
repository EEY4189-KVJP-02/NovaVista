
import React from 'react';

function RoomCard({ room }) {
  return (
    <div className="card h-100">
      <img src={room.image} className="card-img-top" alt={room.type} />
      <div className="card-body">
        <h5 className="card-title">{room.type}</h5>
        <p className="card-text">
          {room.features.map((feature, index) => (
            <span key={index} className="badge bg-secondary me-1">{feature}</span>
          ))}
        </p>
        <h4 className="text-success">{room.price}</h4>
        <p className="text-muted">{room.availability}</p>
        <a href="#" className="btn btn-primary">BOOK NOW</a>
      </div>
    </div>
  );
}

export default RoomCard;