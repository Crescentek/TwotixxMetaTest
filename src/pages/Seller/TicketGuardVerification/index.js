import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../../../components/Common/CommonButton";

import "../Seller.css";
// test...
const TicketGuardVerification = ({ticketGuardPrice}) => {
  const navigate = useNavigate();
  return (
    <div>
      <section style={{position: 'relative', overflow: 'hidden'}} className="idVerfication">
        {/* <img alt="" src="/TicketGuardBackground.svg" className="img-fluid idVerficationBG" style={{ position:"absolute",zIndex:0, marginTop: -280, right: 0 }} /> */}
        <div className="idVerification-content">
          <div className="ticketGuardLeft">
            <img className="img-fluid logoTicketGuard" alt="Ticket Guard" src="/ticketGuard.svg" />
            <div className="verification-text">Add ID Verification to your tickets</div>
            <div className="ticketGuard-text" style={{ color: "#0057FF" }}>with TicketGuard®</div>
            <div className="price-ticket-text">{`Priced at ${ticketGuardPrice} per ticket`}</div>
            <div className="verificationBoxCont" style={{ display: "flex"}}>
              <div className="verification-box">
                <img className="verification-icon" src="/verifiedIcon.svg" alt="ID Verified Attendees" />
                <span className="verificationText">ID Verified Attendees</span> 
              </div>
              <div className="verification-box">
                <img className="verification-icon" src="/eyeIcon.svg" alt="Increased Visibility" />
                <span className="verificationText">Increased Visibility</span>
              </div>
              <div className="verification-box">
                <img className="verification-icon" src="/security.svg" alt="Improved Security" />
                <span className="verificationText">Improved Security</span>
              </div>
            </div>

            <CommonButton style={{marginTop: 24}}
        text="Find out more"
        onClick={() => navigate("/ticketGuard")}
        // width="70px"
        // height="46px"
        // onClick={handleContinueClick}
      />
          </div>
          
          <div className="ticketGuardRight" style={{position: 'relative', overflow: 'hidden'}}>
          {/* <Sticky stickyStyle={{}}> */}
            <div className="rightImgCont" style={{zIndex:50,position:"relative", display: "inline-block"}}>
            
            <img
              alt="TicketGuard"
              src="/idVerification-banner.svg"
              className="for-desktop img-fluid" style={{ display: "block"}}
              // style={{ height: 700, width: 700 }}
            />
            <img
              alt="TicketGuard"
              src="/TicketGuard.jpg"
              className="for-mobile img-fluid" style={{ display: "block"}}
              // style={{ height: 700, width: 700 }}
            />
            
            </div>
            {/* </Sticky> */}
          </div>
          
          <div className="ticketGuardBottom" 
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 16,
            }}
          >
            <div className="ticketGuardBottomLeft" style={{ width: "calc(100% - 12px)", marginRight: '12px' }}>
          
              {/* <div className="verification-left-text">
                Twotixx’s TicketGuard® solution takes the concept of a smart
                ticket further by incorporating identity verification features.
                This added layer ensures that the ticket is not only a pass for
                event entry but is also linked to a verified individual, so you
                know exactly who is in attendance for enhanced security and
                personalisation.
              </div>
              <div style={{marginTop:40}} className="verification-right-text">
                TicketGuard® fees are charged to the buyer as part of a platform
                fee or you can choose to absorb them. Not available on child
                tickets. For large scale events over 10,000 capacity contact us for
                bespoke pricing.
              </div> */}
            </div>
            {/* <div className="ticketGuardBottomRight" style={{ width: "calc(50% - 12px)",  marginLeft: '12px'}}>
              <div className="verification-right-text">
                TicketGuard® fees are charged to the buyer as part of a platform
                fee or you can choose to absorb them. Not available on child
                tickets.
              </div>
              <div
                style={{ marginTop: 20 }}
                className="verification-right-text"
              >
                For large scale events over 10,000 capacity contact us for
                bespoke pricing.
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TicketGuardVerification;
