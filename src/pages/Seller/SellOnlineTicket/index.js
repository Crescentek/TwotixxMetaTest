import React, { useEffect, useRef, useState } from "react";
import "../Seller.css";

const SellTicketOnline = () => {
  const items = [
    {
      src: "/dashboard-icon-list.svg",
      title: "Smart Event Ticketing",
      description:
        "Experience a seamless journey from purchase to entry with the Twotixx Mobile app, packed with innovative features.",
    },
    {
      src: "/chart.svg",
      title: "Reporting & Analytics",
      description:
        "Gain insights into your buyers and pinpoint sales sources with real-time analytics. Track your event statistics effortlessly.",
    },
    {
      src: "/venues.svg",
      title: "Twotixx Venue App",
      description:
        "Efficiently manage event entry with our streamlined process. Scan tickets, update statuses, and access real-time event data.",
    },
  ];
  return (
    <div>
      <section className="sellTickets-online-sec">
        <div className="container">
          <div
            className="containerTop"
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <div className="sell-tickets-lft">
              <h2>
                <span>Sell tickets online</span>
              </h2>
            </div>    
            <div className="sell-tickets-rht">       
              <p className="sell-prg-top">
                Effortlessly organise and oversee events with enhanced security,
                fraud prevention, and an improved attendee experience.
              </p>
            </div>
          </div>

          <div className="sellTickets-onlineInner-box">
            {items.map((item, index) => (
              <div className="onlineInner-box-item" key={index}>
                <img alt="" src={item.src} className="img-fluid" />
                <h3 className="title">{item.title}</h3>
                <div className="border-line"></div>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default SellTicketOnline;
