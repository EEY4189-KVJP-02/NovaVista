import React from "react";
import "./BranchBook.css";


type Branch = {
  id: number;
  name: string;
  location: string;
  img: string;       // path under public/Images, e.g. "/Images/jaffna.jpg"
  features: string[]; 
  rating: number;   // 0..5
  detailsLink: string;
};

const branches: Branch[] = [
  {
    id: 1,
    name: "Nova Vista - Jaffna Branch",
    location: "Jaffna",
    img: "/Images/jaffna.jpg",
    features: ["Free Wi-Fi", "Event Halls"],
    rating: 4.8,
    detailsLink: "/hotel/jaffna",
  },
  {
    id: 2,
    name: "Nova Vista - Kilinochchi Branch",
    location: "Kilinochchi",
    img: "/Images/kilinochchi.jpg",
    features: ["Free Wi-Fi", "Event Halls"],
    rating: 4.6,
    detailsLink: "/hotel/kilinochchi",
  },
  {
    id: 3,
    name: "Nova Vista - Mannar Branch",
    location: "Mannar",
    img: "/Images/mannar.jpg",
    features: ["Free Wi-Fi", "Event Halls"],
    rating: 4.7,
    detailsLink: "/hotel/mannar",
  },
];

const StarRow: React.FC<{ rating: number }> = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div aria-hidden className="flex items-center space-x-1 text-sm">
      {Array.from({ length: full }).map((_, i) => (
        <span key={i}>★</span>
      ))}
      {half && <span>½</span>}
      {Array.from({ length: Math.max(0, 5 - Math.ceil(rating)) }).map((_, i) => (
        <span key={`e${i}`} className="text-gray-300">★</span>
      ))}
    </div>
  );
};

const BranchBook: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Our Branches</h2>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {branches.map((b) => (
          <article key={b.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative">
              <img
                src={b.img}
                alt={b.name}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <a
                href={`/booking?branch=${b.id}`}
                className="absolute right-3 bottom-3 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold hover:opacity-95"
              >
                BOOK NOW
              </a>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-medium">{b.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{b.location}</p>

              <p className="text-sm text-gray-700 mb-3">{b.features.join(" • ")}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="font-bold">{b.rating.toFixed(1)}</div>
                  <StarRow rating={b.rating} />
                </div>

                <a
                  href={b.detailsLink}
                  className="inline-block bg-gray-100 px-3 py-1 rounded text-sm hover:bg-gray-200"
                >
                  View Details
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BranchBook;


