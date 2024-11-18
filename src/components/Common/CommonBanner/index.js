import React, { useEffect, useRef, useState } from "react";
import "../../../pages/Seller/Seller.css";

const CommonBanner = ({
  banner = "",
  leftFirstheader = "",
  leftSecondHeader = "",
  rightFirstHeader = "",
  rightSecondHeader = "",
  glog = "",
}) => {
  return (
    <div style={{backgroundColor:"#FFFFFF"}}>
      <div className="topSectionLowFees" 
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <img alt="" src={glog} className="glog"
        style={
          glog === "/glog.svg"
            ? { marginTop: "-15%", marginLeft: "4%" }
            : glog === "/worldPaymentGlog.svg"
            ? { marginTop: "-18%", marginLeft:"83%", }
            : {marginTop: "-16%", marginLeft: "4%"}
        }
      />
        <img alt="" src={banner} className="feesPayoutBannder-box" />
      </div>
      {/* <img alt="" src={glog} className="glog"
        style={
          glog === "/glog.svg"
            ? { marginTop: "-15%", marginLeft: "4%" }
            : glog === "/worldPaymentGlog.svg"
            ? { marginTop: "-18%", marginLeft:"83%", }
            : {marginTop: "-16%", marginLeft: "4%"}
        }
      /> */}
      <section className="section new-seller-bodyContent-sec" style={{backgroundColor:"#FFFFFF"}}>
        <div className="container">
          <div className="seller-payout-view">
            <div className="leftCont" style={{ width: "35%" }}>
              <div className="left-header">{leftFirstheader}</div>
              <div
                className="left-header"
                style={{ color: "var(--Primary-Mid-Blue)" }}
              >
                {leftSecondHeader}
              </div>
            </div>

            <div className="rightCont" style={{ width: "50%" }}>
              <div className="right-header">{rightFirstHeader}</div>
              <div className="right-header" style={{ marginTop: 20 }}>
                {rightSecondHeader}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default CommonBanner;
