import React from 'react';

interface Room {
  type: string;
  description: string;
  price: string;
  image: string;
}

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <div className="card h-100">
      <img src={`/Images${room.image}`} className="card-img-top" alt={room.type} />
      <div className="card-body">
        <h5 className="card-title">{room.type}</h5>
        <p className="card-text" style={{ whiteSpace: 'pre-line' }}>
          {room.description}
        </p>
        <h4 className="text-success">{room.price}</h4>
        <a href="" className="btn btn-primary">BOOK NOW</a>
      </div>
    </div>
  );
};

export default RoomCard;
