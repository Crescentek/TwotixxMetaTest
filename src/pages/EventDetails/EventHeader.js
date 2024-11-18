import React from "react";
import "./EventHeader.css";
import CommonButton from "../../components/Common/CommonButton";

const EventHeader = ({ eventData }) => {

  console.log('dalkdjaslkdja:', window.innerWidth);

  return (
    <div className="container9">
      <div className="sizesm-iconfalse-colorgra">
        <CommonButton
        className="crypto"
          text={eventData[0]?.category ?? eventData[0]?.type ?? "No Data"}
          height="10px"
        />
      </div>
      <div style={{fontSize: window.innerWidth <= 768 ? '32px' : '56px', fontWeight: 600}} className="heading5">{eventData[0]?.name}</div>
    </div>
  );
};

export default EventHeader;
