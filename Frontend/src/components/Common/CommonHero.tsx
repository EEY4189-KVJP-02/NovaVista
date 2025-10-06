import React from "react";

const CommonHero: React.FC<{
  src: string;
  alt: string;
  title: string;
  subTitle: string;
  home?: boolean;
}> = ({ src, alt, title, subTitle, home }) => {
  return (
    <>
      <div
        className="position-relative"
        style={{
          backgroundColor: "red",
          maxHeight: "80vh",
          overflowY: "hidden",
          margin: "0px 0px 1rem ",
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          className="position-absolute text-center"
          style={{
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
          }}
        >
          {" "}
          <h1
            style={{
              fontSize: "3.5rem",
              textShadow:
                "rgba(36, 36, 35, 0.38) 1px 4px 4px, rgb(239 248 154 / 40%) 0px 4px 20px",
            }}
          >
            {" "}
            {title}
          </h1>
          <h3
            style={{
              fontSize: "1.2rem",
              textShadow: "2px 2px 5px #724985",
            }}
          >
            {" "}
            {subTitle}
          </h3>
        </div>
      </div>
    </>
  );
};

export default CommonHero;
