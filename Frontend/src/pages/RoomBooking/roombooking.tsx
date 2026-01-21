import React from 'react';
import data from './roombooking.json';
import RoomCard from './RoomCard';
import CommonHero from '../../components/Common/CommonHero';

// Define the Room type
interface Room {
  type: string;
  description: string;
  price: string;
  image: string;
}

// Define the shape of the imported JSON
interface RoomData {
  rooms: Room[];
}

const RoomBooking: React.FC = () => {
  // Explicitly cast data to the RoomData type
  const { rooms } = data as RoomData;

  return (
    <div> <CommonHero
        src={"/Images/single room.png"}
        title={"Room"}
        alt={"Event"}
        subTitle={"Make every room truly memorable."}
      />
      <div className="row">
      {rooms.map((room: Room, index: number) => (
        <div key={index} className="col-md-4 mb-4">
          <RoomCard room={room} />
        </div>
      ))}
    </div>
    </div>
    );
};

export default RoomBooking;
