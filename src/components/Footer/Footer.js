import React from "react";
import "./Footer.css";
import CommonButton from "../Common/CommonButton";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const navigateToAppleStore = () => {
    const url = "https://apps.apple.com/in/app/twotixx/id6451201695";
    if (url) {
      window.open(url, "_blank").focus();
    }
  };

  const navigateToPlaystore = () => {
    const url = "https://play.google.com/store/apps/details?id=com.twotixx";
    if (url) {
      window.open(url, "_blank").focus();
    }
  };

  const navigateToHome = () => {
    navigate(`/`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="footer-d content5">
      <div className="container1 ">
        <div className="content4">
          <div className="logo-and-links">
            <div className="logo-and-supporting-text">
              <div className="footerLogo">
                <img
                  className="iconfooterLogo"
                  alt=""
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  src="/icon1.svg"
                  onClick={navigateToHome}
                />
              </div>
            </div>

            <div className="footer-links-section">
              <div className="footer-links-company">
                <h4>Organisers</h4>
                <Link to="#" onClick={(e) => {
                  // e.preventDefault();
                  // window.open("https://staging.boxoffice.twotixx.com", "_blank").focus();
                }}>
                  <text style={{color: 'var(--twotixx-grey)', cursor: 'default'}}>Box Office login</text>
                </Link>
    
              </div>
              <div className="footer-links-software">
                <h4>Our Product</h4>
                <Link to="/About">
                  <text> About</text>
                </Link>
                <Link to="/ticketGuard">
                  <text> TicketGuard®</text>
                </Link>
              </div>
              <div className="footer-links-contact">
                <h4>Contact</h4>
                <Link to="/contact">
                  <text>Email</text>
                </Link>
                <Link to="/contact">
                  {/* <text>Facebook</text> */}
                  <text>Twitter</text>
                </Link>
              </div>
            </div>
          </div>
          <div className="app-store-actions">
            <div className="actions">
              <CommonButton
                text="Download on iOS"
                onClick={navigateToAppleStore}
                icon="/apple.svg"
              />
              <CommonButton
                text="Download on Android"
                onClick={navigateToPlaystore}
                icon="/android.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;