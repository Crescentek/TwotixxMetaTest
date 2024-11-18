import React, { useEffect, useRef, useState } from "react";
import "../Seller.css";

const HowItWorks = () => {
  const blockData = [
    {
      icon: "/fileicon.svg",
      step: "Step 1",
      title: "Create Your Page",
      slider: "/priceslider.svg",
      description:
        "Get started by signing up and creating your distinctive Twotixx Business page.",
    },
    {
      icon: "/plusIcon.svg",
      step: "Step 2",
      title: "Add Your Event",
      slider: "/priceslider.svg",
      description:
        "Using Twotixx Box Office, effortlessly create your event, add tickets, and optimise in one place.",
    },
    {
      icon: "/priceTag.svg",
      step: "Step 3",
      title: "Start Selling Tickets",
      slider: "/priceslider.svg",
      description:
        "Promote your event link and utilise Twotixx Box Office to manage your event.",
    },
  ];
  return (
    <section className="section howIt-sec">
      <div className="container">
        <div className="howIt-sec-top">
          <h2 className="titleHowItWorks">
            <span>How It Works</span>
          </h2>
          <p className="how-main-prg">
            Selling event tickets online has never been easier, you can be up
            and running in minutes.
          </p>
        </div>

        <div onClick={() => window.open("https://staging.boxoffice.twotixx.com/SignUp")} className="howIt-three-block">
          {blockData.map((block, index) => (
            <div
              key={index}
              className="howIt-three-boxItem whiteItem"
              style={{ marginLeft: index !== 0 ? 24 : 0 }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span className="icon">
                  <img alt="" src={block.icon} className="img-fluid" />
                </span>
              </div>
              <div className="steps">{block.step}</div>
              <h3>{block.title}</h3>
              <div className="slider">
                <img alt="" src={block.slider} className="img-fluid" />
              </div>
              <p>{block.description}</p>
            </div>
          ))}
          {/* <img
              alt=""
              src={"howItWorksCurve.svg"}
              className="howItWorksCurve"
            /> */}
        </div>
      </div>
      <img alt="" src={"howItWorksCurve.svg"} className="howItWorksCurve" />
    </section>
  );
};

export default HowItWorks;
