import React from "react";
import { ReactComponent as GrantsFrame1 } from "../../../assets/svgs/grantsFrame1.svg";
import "../Grants.css";
import "../../TicketGuard/TicketGuard.css";
import "../../Home/Home.css";
const GrantsGoal = () => {
  return (
    <>
      {/* <section className="grants-banner"></section> */}
      <section className="inner-hero-banner-sec ticketGuard-heroBanner-sec">
        <div style={{maxWidth: '810px'}} className="container">
          <h2 style={{lineHeight: '72px'}} className="banner-tittle">The Twotixx Event Creator Fund.</h2>
          <p style={{margin: '38px auto 0'}}>
          Supporting Event Organisers with the Financial Burden of Hosting Live Events
          </p>
        </div>
        <img
          src="/banner-round-shape.svg"
          className="img-fluid circleShape"
        ></img>
      </section>
      <section>
        <div className="new-grants-bodyContent-inner-top">
          {/* <div style={{ height: "450px" }}> */}
          <div className="contNonRepayableImg">
            {/* <GrantsFrame1 /> */}
            <img className="img-fluid gratsNonRepayableImg" src="/gratsNonRepayableImg.jpg" alt="Non Repayable Image" />
          </div>
          <div className="new-grants-bodyContent-rht">
            <h2 style={{ marginTop: 0 }}>Non repayable £1000-£20,000 Grants</h2>
            <p>
              Our goal is to help the industry thrive by redefining what it
              means to be part of the live events community. This non-repayable
              grant is awarded to individual event organisers in milestone
              instalments.
            </p>
            <p style={{ marginBottom: "0" }}>
              You could be awarded a grant worth between £1000 all the way up to
              £20,000. Grants are available worldwide and the amount rewarded is
              decided on a case by case basis.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default GrantsGoal;
