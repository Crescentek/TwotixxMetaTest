import React from "react";
import "./TicketGuardCard.css";

const TicketGuardCard = ({bgImagePath,text1, text2, text3}) => {
  return (
    <div>
      <section style={{backgroundImage: `url(${bgImagePath})`}} className="ticket-guard-card-organizer-container">
        <span className="ticket-guard-card-organizer-container-text1">
            {text1}
        </span>
        <span className="ticket-guard-card-organizer-container-text2">
            {text2}
        </span>
        <span className="ticket-guard-card-organizer-container-text3">
            {text3}
        </span>
      </section>
    </div>
  );
};
export default TicketGuardCard;