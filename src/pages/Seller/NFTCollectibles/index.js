import React, { useEffect, useRef, useState } from "react";
import "../Seller.css";
import { useNavigate } from "react-router-dom";

const NFTCollectibles = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section className="nft">
        <div className="first-view">
          <div className="left-view-box">
            <h1 className="nftTitleH1">
              Unleashing the{" "}
              <span style={{ color: "#DBFF00" }}>Power of NFTs</span>
            </h1>
          </div>
          <div className="right-view-box">
            <div className="first-text">
              A world where uniqueness meets access,{" "}
              <span className="second-text">
                {" "}
                and ownership becomes experience.
              </span>
            </div>
          </div>
        </div>
        <div className="second-view" style={{ position: "relative" }}>
          {/* <div className="txtContSecondView" style={{ width: "50%" }}> */}
          <div className="txtContSecondView">
            <div className="enhance-event-text">
              Enhance Event Experiences with NFT Collectibles
            </div>
            <img alt="" src="/priceslider.svg" className="img-fluid" />
            <div className="hosting-confernece">
              Whether you're hosting a conference, a music or sports event, or
              even a community meet-up, Twotixx allows you to recognise your
              attendees with digital mementos like proof-of-attendance artwork,
              video, or digital certificates.
            </div>
            {/* <img className="img-fluid" src="/nftGlog.svg" alt="" style={{position:"absolute",marginLeft:"60%",marginTop:"-10%",}} /> */}
          </div>
          <div className="imgContSecondView" style={{ position: "relative" }}>
            <img
              className="img-fluid imgSecondView"
              alt="nftscreen"
              src="/NFT-1.jpg"
              style={{ backgroundColor: "#000", borderRadius: "40px" }}
            />
            <img
              className="img-fluid nftGlogImg"
              src="/nftGlog.svg"
              alt=""
              style={{ position: "absolute", right: "-23px", bottom: "-180px" }}
            />
          </div>
        </div>
        {/* <div className="second-view" style={{ marginLeft: "12%" }}> */}
        <div className="second-view">
          {/* <div className="imgContSecondView" style={{ width: "50%" }}> */}
          <div className="imgContSecondView">
            <img
              className="img-fluid imgSecondView"
              alt="nftscreen"
              src="/NFT-2.jpg"
              style={{ backgroundColor: "#000", borderRadius: "40px" }}
            />
          </div>
          {/* <div className="txtContSecondView" style={{ width: "50%", marginLeft: "48px", marginRight: "0" }}> */}
          <div
            className="txtContSecondView"
            style={{ marginLeft: "48px", marginRight: "0" }}
          >
            <div className="enhance-event-text">
              Leverage Web3 with NFT Token Gating
            </div>
            <img alt="" src="/priceslider.svg" className="img-fluid" />
            <div className="hosting-confernece">
              NFTs go beyond digital art—they unlock unique privileges like
              exclusive event access or areas. Enable dynamic ticket creation
              based on users' NFT ownership.
            </div>
            <a
              className="contact-us"
              href="#"
              onClick={() => navigate("/contact")}
            >
              Contact us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
export default NFTCollectibles;
