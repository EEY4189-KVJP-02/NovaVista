import React from "react";
import CommonHero from "../../components/Common/CommonHero";
import EventForm from "./EventForm";

const EventBooking = () => {
  return (
    <div>
      <CommonHero
        src={"/Images/event_hero.jpg"}
        title={"Event"}
        alt={"Event"}
        subTitle={"Make every event truly memorable."}
      />
      <EventForm />
    </div>
  );
};

export default EventBooking;
