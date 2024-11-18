import React, { useLayoutEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./AppPage.css";
import { useLocation } from "react-router-dom";
import { ReactComponent as Frame1 } from "../../assets/svgs/frame-mobile.svg";
import { ReactComponent as AppleSetDuplicate } from "../../assets/svgs/appleSet-frame-mobile.svg";
import AccessTicket  from "../../assets/svgs/access-ticket.svg";
import ManageTicket from "../../assets/svgs/manage-ticket.svg";
import CheckEvents from "../../assets/svgs/check-events.svg";
import ForEventOrganizer  from "../../assets/svgs/for-event-organizer.svg";
import ScanTickets from "../../assets/svgs/scan-tickets.svg";
import ManageAttendeeData from "../../assets/svgs/manage-attendee-data.svg";


function AppPage() {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="dashboard-ticketSale-wrapper">
      <Navbar />
      <div className="dashboard-ticketSale-main">
        <div className="dashboard-ticketSale-block container">
          <div className="dashboard-ticketSale-content">
            <h2>
              Download <span>Twotixx Mobile</span>
            </h2>
            <ul className="download-list">
              <li style={{ background: `url(${AccessTicket}) no-repeat`}}>Access tickets</li>
              <li style={{ background: `url(${ManageTicket}) no-repeat`}}>Manage tickets</li>
              <li style={{ background: `url(${CheckEvents}) no-repeat`}}>Check in to your events</li>
            </ul>
            <div className="appGoogle-btns">
              <a
                href="https://apps.apple.com/in/app/twotixx/id6451201695"
                target="_blank"
              >
                <img className="btn-download" alt="" src="/appStore-btn.svg" />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.twotixx"
                target="_blank"
              >
                <img
                  className="btn-download"
                  alt=""
                  src="/googlePlay-store-btn.svg"
                />
              </a>
            </div>
          </div>
          <div className="dashboard-ticketSale-img">
            <div className="fram1">
              <Frame1 style={{ maxWidth: "100%", height: "auto" }} />
            </div>
          </div>
        </div>

        <div className="dashboard-ticketSale-block dashboard-ticketSale-position container">
          <div className="dashboard-ticketSale-content">
            <h2>
              Download <span>Twotixx Venue</span>
            </h2>
            <ul className="download-list">
              <li style={{ background: `url(${ForEventOrganizer}) no-repeat`}}>For event organisers</li>
              <li style={{ background: `url(${ScanTickets}) no-repeat`}}>Scan tickets</li>
              <li style={{ background: `url(${ManageAttendeeData}) no-repeat`}}>Manage attendee data</li>
            </ul>
            <div className="appGoogle-btns">
              <a
                href="https://apps.apple.com/in/app/venue-by-twotixx/id6472804982"
                target="_blank"
              >
                <img className="btn-download" alt="" src="/appStore-btn.svg" />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.twotixx.venue"
                target="_blank"
              >
                <img
                  className="btn-download"
                  alt=""
                  src="/googlePlay-store-btn.svg"
                />
              </a>
            </div>
            <div className="turbocharge-block">
              <div className="turbocharge-block-lft">
                <img
                  className="turbochargeIcon"
                  alt=""
                  src="/turbocharge-icon.svg"
                />
              </div>
              <div className="turbocharge-block-rht">
                <h3>
                  <span>Turbocharge</span> efficiency with a laser barcode
                  scanner
                </h3>
                <p>
                  We can organise the hire of barcode scanners for faster ticket
                  scanning, particularly in low-light conditions.
                </p>
              </div>
            </div>
          </div>
          <div className="dashboard-ticketSale-img">
            <AppleSetDuplicate style={{ maxWidth: "100%", height: "auto" }} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AppPage;
