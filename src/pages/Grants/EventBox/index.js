import React from "react";
import Box from "@mui/material/Box";
import "./../Grants.css";
import "../../Home/Home.css";

const EventBox = () => {
  const extendedEvents = [
    { img: "/grantsBox1.jpg" },
    { img: "/grantsBox2.jpg" },
    { img: "/grantsBox3.jpg" },
    { img: "/grantsBox4.jpg" },
    { img: "/grantsBox5.jpg" },
  ];

  return (
    <div className="event-box-parent">
      <div className="event-box-parent-inner">
            {extendedEvents.map((event, index) => (
              <div key={index} className="event-box-card">
                <img
                  src={event.img}
                  alt={`Event ${index + 1}`}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/noimage.png";
                  }}
                />
              </div>
            ))}
        </div>
    </div>
  );
};

export default EventBox;