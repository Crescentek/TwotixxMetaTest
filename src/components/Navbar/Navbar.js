import React, { useState, useEffect } from "react";
import "./Navbar.css";
import CommonButton from "../Common/CommonButton";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Add class to body
    isMenuOpen ? document.body.classList.add('menu-visibility-class') : document.body.classList.remove('menu-visibility-class');
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const appUrl = `/app`;
  const handleBrowseEvents = () => {
    navigate("/event-list");
    window.scrollTo(0, 0);
  };
  const handleSellers = () => {
    navigate("/organisers ");
    window.scrollTo(0, 0);
  };
  const handleGrants = () => {
    navigate("/grants");
    window.scrollTo(0, 0);
  };
  const handleAbout = () => {
    navigate("/about");
    window.scrollTo(0, 0);
  };
  const handleHelp = () => {
    navigate("/contact");
    window.scrollTo(0, 0);
  };
  const handleHome = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };
  const handleFeatures = () => {
    navigate("/features");
    window.scrollTo(0, 0);
  };
  return (
    <div className="nav-d">
      <div className="header">
        <div className="container4">
          <div className="content6">
            <div className="navBarLogo">
              <Link to="/">
                <img
                  className="iconnavBarLogo"
                  alt="Logo"
                  src="/icon1.svg"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </Link>
            </div>
            <div className={`navigation ${isMenuOpen ? "active" : ""}`}>
            <div
                className={`button3 ${pathname === "/" ? "active" : ""}`}
              >
                <div className="text8" onClick={handleHome}>
                  Home
                </div>
              </div>
              
              <div
                className={`button3 ${
                  pathname === "/event-list" ? "active" : ""
                }`}
              >
                <div className="text8" onClick={handleBrowseEvents}>
                  Browse events
                </div>
              </div>

              
              <div
                className={`button3 ${pathname === "/organisers" ? "active" : ""}`}
              >
                <div className="text8" onClick={handleSellers}>
                Organisers 
                </div>
              </div>

              <div
                className={`button3 ${
                  pathname === "/features" ? "active" : ""
                }`}
              >
                <div className="text8" onClick={handleFeatures}>
                Features
                </div>
              </div>
              
              <div
                className={`button3 ${pathname === "/grants" ? "active" : ""}`}
              >
                <div className="text8" onClick={handleGrants}>
                  Grants
                </div>
              </div>
              <div
                className={`button3 ${pathname === "/about" ? "active" : ""}`}
              >
                <div className="text8" onClick={handleAbout}>
                  About
                </div>
              </div>
              <div
                className={`button3 ${pathname === "/contact" ? "active" : ""}`}
              >
                <div className="text8" onClick={handleHelp}>
                  Help
                </div>
              </div>

              {/* {isMenuOpen ?  <div
                className={`button3`}
              >
                <div className="text8" onClick={() => window.open("https://staging.boxoffice.twotixx.com")}>
                Create Event
                </div>
              </div> : null} */}
            </div>
            <div className="hamburger-icon" onClick={toggleMenu}>
              {isMenuOpen ? <img style={{marginTop: 6}} alt="Close" src="/mobile-menu-close.svg" /> :
              <img alt="Menu" src="/menu.svg" />
}
            </div>
          </div>
          <div style={{gap: 16}} className="navigation-parent">
            <CommonButton
              text="Download Twotixx"
              onClick={() => window.open(appUrl)}
            />

            <CommonButton className="secondary-hover"
              backgroundColor={"var(--Twotixx-Background-Ice-White)"}
              fontColor={"var(--Primary-Mid-Blue)"}
              // style={{ border: "1px solid var(--Primary-Mid-Blue) !important" }}
              text="Create Event"
              disabled={true}
              onClick={() => window.open("https://staging.boxoffice.twotixx.com")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
