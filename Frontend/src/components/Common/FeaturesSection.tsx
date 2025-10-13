

const FeaturesSection: React.FC = () => {
  const features = [
    "Air Conditioning",
    "Pets Not Allowed",
    "Parking",
    "Free WI-FI",
    "Swimming Pool",
    "Event Hall",
  ];

  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px 0",
        backgroundColor: "#fff",
      }}
    >
      <h3
        style={{
          fontFamily: "Times New Roman, Times, serif",
          fontWeight: "bold",
          letterSpacing: "1px",
          marginBottom: "25px",
          color: "#333",
        }}
      >
        FEATURES
      </h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#fdf1d3",
              padding: "8px 16px",
              borderRadius: "4px",
              fontFamily: "Times New Roman, Times, serif",
              fontWeight: 600,
              color: "#000",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;