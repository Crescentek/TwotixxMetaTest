import React, { useLayoutEffect } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./About.css";
import { useNavigate } from "react-router-dom";
import ReadyToJoin from "../Seller/ReadyToJoin/index";


function About() {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSellSection = () => {
    window.open("https://staging.boxoffice.twotixx.com", "_blank").focus();
  };

  return (
    <>
    <Helmet>
        <title>About - Title</title>
        <meta name="description" content="About - Description" />
        <meta property="og:title" content="About - OG Title" />
        <meta property="og:description" content="About - OG Description" />
        <meta property="og:image" content="https://picsum.photos/seed/picsum/200/300" />
        <meta property="og:url" content="https://staging.twotixx.com/about" />
      </Helmet>
    <div className="about-page-wrapper">
      <Navbar />
      <div className="deep-blue-mask-container-about">
      <img
          src="/left-plus-mask.svg"
          alt=""
          style={{ marginTop: "880px", zIndex: -1, position: "absolute", left: 0 }}
        />
        <img
          src="/top-deep-blue-mask-about.png"
          alt=""
          style={{ width: "100%", height: "466px", marginTop: "-7px" }}
        />
        <img
          src="/middle-deep-blue-mask-about.png"
          alt=""
          style={{ width: "100%", height: "553px", marginTop: "-7px" }}
        />
        <img
          src="/bottom-deep-blue-mask-about.png"
          alt=""
          style={{ width: "100%", height: "396px", marginTop: "-7px" }}
        />
        
      </div>
      <div className="we-are-twotixx-label-container">
        <h1 style={{ color: "var(--Twotixx-Background-Ice-White)" }}>We Are</h1>
        <h1 style={{ color: "var(--yellow)" }}> Twotixx.</h1>
      </div>
      <div className="top-we-are-twotixx-poster">
        <img
          className="img-fluid nftGlogImg"
          src="/we-are-twotixx-glog.svg"
          alt=""
          style={{ position: "absolute", left: "63px", top: "-132px" }}
        />
        <img
          className="img-fluid imgSecondView"
          alt="nftscreen"
          src="/we-are-twotixx-poster.png"
          style={{ borderRadius: "40px" }}
        />
      </div>
      <div style={{ marginTop: -24 }} className="pronounce-content-container">
        <div className="pronounce-content-left-container">
          <span className="pronounce-content-left-title">Twotixx</span>
          <span className="pronounce-content-left-subtitle">
            pronounced ‘two-ticks’
          </span>
        </div>
        <span className="pronounce-content-right-container">
          Our name is inspired by the British phrase "two ticks," meaning as
          quick as a second hand on a clock. We're here to make booking tickets
          just as speedy—plus, we added an extra 'X' for that extra dash of
          flair!
        </span>
      </div>
      <div className="our-story-container">
        <div className="our-story-left-container">
          <span className="our-story-left-container-text-first">
            Our team is driven by a bold vision.
          </span>
          <span className="our-story-left-container-text-second">
            To revolutionise the ticketing industry.
          </span>
          <img alt="" src="/priceslider.svg" className="img-fluid" />
          <span className="our-story-left-container-text-third">
            We understand that a ticketing platform mirrors the values of the
            event organiser. That’s why we've built our platform on a foundation
            of ethics, transparency, and fairness.
          </span>
        </div>
        <div className="our-story-right-container">
          <img
            style={{ borderRadius: "40px" }}
            alt=""
            src="/NFT-4.png"
            className="img-fluid"
          />
          <img
            alt=""
            src="/our-story-right-glog.svg"
            className="our-story-right-glog"
          />
        </div>
      </div>
      
      <div className="ceo-container-about">
        <img alt="" src="/ceo-photo.svg" className="ceoImg" />
        <div className="ceo-trust-container">
          <span className="ceo-trust-title">We believe trust is earned,</span>
          <span
            style={{ color: "var(--text-heading-primary)", marginLeft: 5 }}
            className="ceo-trust-title"
          >
            {"not given."}
          </span>
        </div>

        <img alt="" src="/priceslider.svg" style={{ marginTop: "24px" }} />

        <div className="ceo-trust-description-container">
          <div className="ceo-trust-description-title">
            We've crafted our system to prioritise your experience and peace of
            mind. Our work doesn't stop here—we're continually developing and
            innovating the Twotixx platform every day. Keep an eye out for many
            more exciting features coming soon!
          </div>
          <div
            style={{ marginTop: "24px" }}
            className="ceo-trust-description-title"
          >
            We're here to make ticketing easier, more reliable, and ultimately,
            more enjoyable for all.
          </div>
          <div
            style={{ marginTop: "24px" }}
            className="ceo-trust-description-title"
          >
            Thank you for being part of our journey as we work to bring positive
            change to the industry, one ticket at a time.
          </div>
        </div>
        <span className="ceo-name-about">Kelvin Rolf, CEO & Co-Founder</span>
      </div>
      <img
          src="/right-plus-mask.svg"
          alt=""
          style={{ marginTop: "-480px", zIndex: 0, position: "absolute", right: 0 }}
        />
      <ReadyToJoin handleTicketSection={handleSellSection} buttonTitle={'Create your event'}/>
      <Footer />
    </div>
    </>
  );
}

export default About;
