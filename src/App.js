


import React from 'react';
import './App.css';
import Header from './components/Header';
import RoomCard from './components/RoomCard';

const rooms = [
  {
    id: 1,
    type: 'Standard Single Room',
    price: 'LKR 5000',
    features: ['Free Cancellation', 'Flexibility guaranteed', 'No Prepayment Needed', 'Secure your stay now'],
    availability: 'Limited Availability — Only 5 rooms left at this price',
    image: '/single room.png'
  },
  {
    id: 2,
    type: 'Double Room',
    price: 'LKR 10000',
    features: ['Free Cancellation', 'Book with confidence', 'No Prepayment Needed', 'Pay at the hotel'],
    availability: 'Limited Availability — Only 3 rooms left at this special rate',
    image: '\double room.jpg'
  },
  {
    id: 3,
    type: 'Deluxe Room',
    price: 'LKR 25000',
    features: ['Free Cancellation', 'Change plans anytime', 'No Prepayment Required', 'Easy booking, stress-free payment'],
    availability: 'Limited Availability — Exclusive price!',
    image: '\deluxe room.jpg'
  }
];

function App() {
  return (
    <div className="container mt-4">
      <Header />
      <div className="row">
        {rooms.map(room => (
          <div key={room.id} className="col-md-4 mb-4">
            <RoomCard room={room} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;