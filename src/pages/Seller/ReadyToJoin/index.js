import React, { useEffect, useRef, useState } from "react";
import "../Seller.css";
import CommonButton from "../../../components/Common/CommonButton";

const ReadyToJoin = ({handleTicketSection=()=>{}, text1, text2, buttonTitle}) => {
  return (
    <div>
      <section className="section selling-online-sec">
        <div className="readyJoin">
          <div>{text1 ? text1 : 'Ready to join the'}</div>
          <div className="readyJoin" style={{ color: "#DBFF00" }}>
            {text2 ? text2 : 'ticketing revolution?'}
          </div>
          <div className="readyJoinBtnCont"
            style={{ marginTop: 60, display: "flex", justifyContent: "center" }}
          >
            <CommonButton disabled={buttonTitle === 'Learn More' ? false : true} className={buttonTitle === 'Learn More' ? "" : "secondary-hover"}
              text={buttonTitle ? buttonTitle : "Get started for free"}
              onClick={handleTicketSection}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
export default ReadyToJoin;
