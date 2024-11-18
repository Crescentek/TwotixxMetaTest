import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./Grants.css";
import "../Home/Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import GrantApplication from "./GrantApplication";
import EventBox from "./EventBox";
import GrantsGoal from "./GrantsGoal";
import Sticky from 'react-sticky-el';


function Grants() {
  return (
    <>
    <Helmet>
        <title>Grants - Title</title>
        <meta name="description" content="Grants - Description" />
        <meta property="og:title" content="Grants - OG Title" />
        <meta property="og:description" content="Grants - OG Description" />
        <meta property="og:image" content="https://picsum.photos/200/300?grayscale" />
        <meta property="og:url" content="https://staging.twotixx.com/grants" />
      </Helmet>
    <div
      style={{ boxSizing: "null !important" }}
      className="terms-service-main"
    >
      <Navbar />
      <GrantsGoal />
      <EventBox />
      <div className="theApplicationProcess">
        <div className="theApplicationProcessLeft">
      <Sticky stickyStyle={{ marginRight:'56px'}}>
          <h2 className="titleLeftPanel">The application process</h2>
          <p className="pLeftPanel">
            The first step is to complete the form in as much detail as
            possible. We will then invite successful applicants to an online
            interview. We will inform applicants if they have been successful or
            not within a few weeks.
          </p>
        </Sticky>
        </div>
        <div className="theApplicationProcessRight">
          <GrantApplication />
        </div>
      </div>
      <div className="footer-home">
        <Footer />
      </div>
    </div>
    </>
  );
}
export default Grants;
