import React from "react";
import CommonHero from "../../components/Common/CommonHero";
import BranchBook from "./HotelDetails/BranchBook";


function HotelDetailsPage() {
  return (
    <>
      {/* other hero / about sections */}
      <BranchBook />
      {/* footer */}
    </>
  );
}

export const Event = () => {
  return (
    <>
      <CommonHero
        src={"/Images/event_hero3.jpg"}
        title={"Event"}
        alt={"Event"}
        subTitle={"Make every event truly memorable."}
      />
    </>
  );
};
