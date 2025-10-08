import React from "react";
import CommonHero from "../../components/Common/CommonHero";
import EventSearch from "./EventSearch";

export const Event = () => {
  return (
    <>
      <CommonHero
        src={"/Images/event_hero3.jpg"}
        title={"Event"}
        alt={"Event"}
        subTitle={"Make every event truly memorable."}
      />
      <EventSearch/>
    </>
  );
};
