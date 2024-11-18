import React, { useEffect, useRef, useState } from "react";
import "./TicketGuard.css";
import { Helmet } from "react-helmet-async";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TicketGuardCard from "../../components/TicketGuardCard/TicketGuardCard";
// import TicketGuardCard from "../../components/TicketGuardCard/TicketGuardCard";

function TicketGuard() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ boxSizing: "null !important" }} className="">
      <Navbar />

      <section className="inner-hero-banner-sec ticketGuard-heroBanner-sec">
        <div className="container">
          <h2 className="banner-tittle">TicketGuard® Verification</h2>
          <p>
            A Twotixx solution enhancing event security with identity-verified
            accounts and attendee traceability.
          </p>
        </div>
        <img
          src="/banner-round-shape.svg"
          className="img-fluid circleShape"
        ></img>
      </section>

      <section className="ensuring-safe-sec">
        <div className="container">
          <div className="ensuring-safe-inner">
            <div className="ensuring-safe-lft">
              <img src="/ticketGuardLogo.svg" className="img-fluid"></img>
              <h3 className="tittle">
                Ensuring safe, <br></br> <span>verified</span> events
              </h3>
              <img
                src="/custom-line.png"
                className="img-fluid img-divide"
              ></img>
              <p>
                TicketGuard® enhances event security by ensuring attendee
                identity verification through government-issued IDs, checked
                against official databases. This gives organisers full
                visibility into who is attending, boosting safety and trust.
                Once verified, attendees can access their tickets and enter the
                event with ease and confidence.
              </p>
            </div>
            <div className="ensuring-safe-rht">
              <img
                style={{ width: "auto" }}
                src="/ensuring-safe.png"
                className="img-fluid desktop-img"
              ></img>
              <img
                src="/ensuring-safe222.png"
                className="img-fluid mobile-img"
              ></img>
            </div>
          </div>
        </div>
      </section>

      <section className="ticktGuard-work-sec">
        <div className="container">
          <h2 className="tittle">How TicketGuard® works</h2>
          <div className="ticktGuard-work-items">
            <div className="ticktGuard-work-item-box">
              <span className="work-icon">
                <img src="/custom-monitor-icon.svg" className="img-fluid"></img>
              </span>
              <span className="badge blue">Organiser</span>
              <h4 className="work-tittle">Box Office Event Creation</h4>
              <img src="/custom-line-sm.svg" className="img-fluid"></img>
              <p>
                The event organiser sets up their event in Twotixx Box Office
                and activates the TicketGuard® verification feature for enhanced
                security.
              </p>
            </div>

            <div className="ticktGuard-work-item-box">
              <span className="work-icon">
                <img src="/custom-setting-icon.svg" className="img-fluid"></img>
              </span>
              <span className="badge green">Attendee</span>
              <h4 className="work-tittle">
                Ticket Purchase & Account Verification
              </h4>
              <img src="/custom-line-sm.svg" className="img-fluid"></img>
              <p>
                Attendees purchase their tickets and access them through the
                Twotixx app. To proceed, they must verify their profile using a
                government-issued ID.
              </p>
            </div>

            <div className="ticktGuard-work-item-box">
              <span className="work-icon">
                <img src="/custom-scan-icon.svg" className="img-fluid"></img>
              </span>
              <span className="badge green">Attendee</span>
              <h4 className="work-tittle">Ticket Scan & Event Entry</h4>
              <img src="/custom-line-sm.svg" className="img-fluid"></img>
              <p>
                Once verified, attendees activate their tickets at the event.
                Staff scan them using the Twotixx Venue app and confirm the
                identity matches the account.
              </p>
            </div>

            <div className="ticktGuard-work-item-box">
              <span className="work-icon">
                <img
                  src="/custom-percentage-icon.svg"
                  className="img-fluid"
                ></img>
              </span>
              <span className="badge blue">Organiser</span>
              <h4 className="work-tittle">Live Attendee Event Data</h4>
              <img src="/custom-line-sm.svg" className="img-fluid"></img>
              <p>
                During the event, the organiser uses Twotixx Box Office to
                access real-time attendee data, monitoring and tracking their
                status throughout the event.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{ backgroundColor: "var(--Twotixx-Text-Ice-White)" }}
        className="ticktGuard-work-sec"
      >
        <div className="container">
          <h2 className="tittle">How to verify with TicketGuard®</h2>
          <div className="ticktGuard-work-items">
            <div
              style={{ backgroundColor: "var(--surface-secondary)" }}
              className="ticktGuard-work-item-box"
            >
              <span className="work-icon">
                <img src="/ticketVerify-1.svg" className="img-fluid"></img>
              </span>
              <span className="ticktGuard-verify-item-title">Twotixx</span>
              <h4 className="work-tittle verify-title">Press ‘Verify now’</h4>
              <img src="/custom-line-sm.svg" className="img-fluid"></img>
              <p>
                In the Twotixx app, after entering all the required account
                information, you will be prompted to verify your account by
                tapping the "Verify now" button.
              </p>
            </div>

            <div
              style={{ backgroundColor: "var(--surface-secondary)" }}
              className="ticktGuard-work-item-box"
            >
              <span className="work-icon">
                <img src="/ticketVerify-2.svg" className="img-fluid"></img>
              </span>
              <span className="ticktGuard-verify-item-title">Togggle</span>
              <h4 className="work-tittle verify-title">Take Photo of ID</h4>
              <img src="/custom-line-sm.svg" className="img-fluid"></img>
              <p>
                You will be redirected to our third-party verification site,
                Togggle. Follow the on-screen instructions, which will include
                uploading a photo of your ID.
              </p>
            </div>

            <div
              style={{ backgroundColor: "var(--surface-secondary)" }}
              className="ticktGuard-work-item-box"
            >
              <span className="work-icon">
                <img src="/ticketVerify-3.svg" className="img-fluid"></img>
              </span>
              <span className="ticktGuard-verify-item-title">Togggle</span>
              <h4 className="work-tittle verify-title">Take Selfie</h4>
              <img src="/custom-line-sm.svg" className="img-fluid"></img>
              <p>
                To complete your account verification process, you will be
                required to take a selfie, allowing us to securely match your
                identity to the photo on your ID.
              </p>
            </div>

            <div
              style={{ backgroundColor: "var(--surface-secondary)" }}
              className="ticktGuard-work-item-box"
            >
              <span className="work-icon">
                <img src="/ticketVerify-4.svg" className="img-fluid"></img>
              </span>
              <span className="ticktGuard-verify-item-title">Twotixx</span>
              <h4 className="work-tittle verify-title">Account verified!</h4>
              <img src="/custom-line-sm.svg" className="img-fluid"></img>
              <p>
                Once you have completed all the steps on Togggle, your Twotixx
                profile will be automatically updated as soon as the
                verification process is finalised.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="servey-text-content-container">
        <div className="servey-text-label-container">
          <span className="servey-text-ticket-guard">
            A survey conducted by Eventbrite found that
            <span className="highlight-text"> 45% of event organisers </span>
            struggle with managing security risks associated with not knowing
            who the ticket holder is with it changing hands multiple times.
          </span>
        </div>
      </section>

      <section className="supporting-organizer-content-container">
        <div className="supporting-organizer-item">
          <TicketGuardCard
            text1={"Supporting"}
            text2={"Organisers"}
            text3={
              "TicketGuard® elevates event management to a new level, giving organisers unmatched control and clarity. With TicketGuard®, you can confidently know exactly who is attending your events."
            }
            bgImagePath={"/TicketGuardCard2.png"}
          />
        </div>
        <div className="supporting-organizer-item">
          <TicketGuardCard
            text1={"Safeguarding"}
            text2={"Attendees"}
            text3={
              "TicketGuard® is designed to enhance attendee safety and peace of mind. With TicketGuard®, attendees can confidently attend events, knowing they’re among other verified attendees."
            }
            bgImagePath={"/TicketGuardCard1.png"}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
export default TicketGuard;
