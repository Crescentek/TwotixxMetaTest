import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import Footer from "../../components/Footer/Footer";
import { Helmet } from "react-helmet-async";
import Navbar from "../../components/Navbar/Navbar";
import "./Features.css";
import CommonButton from "../../components/Common/CommonButton";
import "../TicketGuard/TicketGuard.css";
import { ReactComponent as EasyScanIn } from "../../assets/svgs/EasyScanIn.svg";
import { ReactComponent as LiveEventIcon } from "../../assets/svgs/LiveEventIcon.svg";
import { ReactComponent as EntranceSelectorIcon } from "../../assets/svgs/EntranceSelectorIcon.svg";
import { ReactComponent as SmartSearchIcon } from "../../assets/svgs/SmartSearchIcon.svg";
import { ReactComponent as EventCheckIcon } from "../../assets/svgs/EventCheckIcon.svg";
import { ReactComponent as SmartDigitalIcon } from "../../assets/svgs/SmartDigitalIcon.svg";
import { ReactComponent as IdVeriIcon } from "../../assets/svgs/IdVeriIcon.svg";
import { ReactComponent as NftCollIcon } from "../../assets/svgs/NftCollIcon.svg";
import { ReactComponent as SmsTicketIcon } from "../../assets/svgs/SmsTicketIcon.svg";
import { ReactComponent as SmsLogIcon } from "../../assets/svgs/SmsLogIcon.svg";
import { ReactComponent as ScreenshotBlockerIcon } from "../../assets/svgs/ScreenshotBlockerIcon.svg";
import { ReactComponent as EventMapsIcon } from "../../assets/svgs/EventMapsIcon.svg";
import { ReactComponent as EasyIcon } from "../../assets/svgs/EasyIcon.svg";
import { ReactComponent as SmartIcon } from "../../assets/svgs/SmartIcon.svg";
import { ReactComponent as DirectIcon } from "../../assets/svgs/DirectIcon.svg";
import { ReactComponent as SrtagedIcon } from "../../assets/svgs/SrtagedIcon.svg";
import { ReactComponent as UpsellIcon } from "../../assets/svgs/UpsellIcon.svg";
import { ReactComponent as EventIcon } from "../../assets/svgs/EventIcon.svg";
import { ReactComponent as TicketIcon } from "../../assets/svgs/TicketIcon.svg";
import { ReactComponent as ConnectIcon } from "../../assets/svgs/ConnectIcon.svg";
import { ReactComponent as DiscountIcon } from "../../assets/svgs/DiscountIcon.svg";
import { ReactComponent as LiveIcon } from "../../assets/svgs/LiveIcon.svg";
import { ReactComponent as DirectAttendeeIcon } from "../../assets/svgs/DirectAttendeeIcon.svg";
import { ReactComponent as CompetitiveIcon } from "../../assets/svgs/CompetitiveIcon.svg";
import { ReactComponent as CurrencyIcon } from "../../assets/svgs/CurrencyIcon.svg";


import { useNavigate } from "react-router-dom";

function Features() {
  const navigate = useNavigate();

  const [isSelected, setIsSelected] = useState("Twotixx Box Office");
  const eventCategories = [
    "Twotixx Box Office",
    "Twotixx Consumer App",
    "Twotixx Venue App",
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Close if the same accordion is clicked
    } else {
      setActiveIndex(index);
    }
  };

  const accordionData = [
    {
      imgBlock: (
        // <img src="/easy-icon.png" className="img-fluid circleShape"></img>
        <EasyIcon/>
      ),
      title: "Easy Onboarding",
      content:
        "Twotix is a self-service platform that gives you full control to independently publish your event without the need for external assistance.",
    },
    {
      imgBlock: (
        // <img src="/smart-icon.png" className="img-fluid circleShape"></img>
        <SmartIcon/>
      ),
      title: "Smart Event Creation",
      content:
        "Utilise smart tools for strategic ticket selling and pricing to transform your event setup and boost sales.",
    },

    {
      imgBlock: (
        // <img src="/direct-icon.png" className="img-fluid circleShape"></img>
        <DirectIcon/>
      ),
      title: "Direct Payouts",
      content:
        "Link your Stripe account to receive ticket sale revenue instantly, because we understand that cash flow is crucial for your event.",
    },
    {
      imgBlock: (
        // <img src="/currency-icon.png" className="img-fluid circleShape"></img>
        // <CurrencyIcon/>
        <div style={{color: 'white', fontSize: 20}}>%</div>
      ),
      title: "Organiser Booking Fees",
      content:
        `Add a booking fee to each ticket, capped at 10% (Max £20). You keep 80% of the fee, and Twotixx receives 20%.`,
    },
    {
      imgBlock: (
        // <img src="/srtaged-icon.png" className="img-fluid circleShape"></img>
        <SrtagedIcon/>
      ),
      title: "Staged Releases",
      content:
        "Generate urgency with staged releases by automating each phase and increasing prices with every new launch.",
    },
    {
      imgBlock: (
        // <img src="/upsell-icon.png" className="img-fluid circleShape"></img>
        <UpsellIcon/>
      ),
      title: "Upsell Add-Ons",
      content:
        "Maximise your revenue by offering unlimited ticket add-ons for each ticket type, allowing attendees to customise their experience.",
    },
    {
      imgBlock: (
        // <img src="/event-icon.png" className="img-fluid circleShape"></img>
        <EventIcon/>
      ),
      title: "Event Guest List",
      content:
        "Effortlessly manage your event’s guest list with our user-friendly system. Organisers can easily create, oversee and update lists.",
    },
    {
      imgBlock: (
        // <img src="/ticket-icon.png" className="img-fluid circleShape"></img>
        <TicketIcon/>
      ),
      title: "Ticket Sales",
      content:
        "Sell event tickets directly through the Twotix website and direct your audience to your personalised ticket sale page.",
    },
    {
      imgBlock: (
        // <img src="/connect-icon.png" className="img-fluid circleShape"></img>
        <ConnectIcon/>
      ),
      title: "Connect Mailchimp",
      content:
        "Easily manage attendee email communications through Box Office with our Mailchimp integration.",
    },
    {
      imgBlock: (
        // <img src="/connect-icon.png" className="img-fluid circleShape"></img>
        <DiscountIcon/>
      ),
      title: "Discount Codes",
      content:
        "Create custom discount codes for your events and easily track live statistics on how often they’ve been redeemed by customers.",
    },
    {
      imgBlock: (
        // <img src="/live-icon.png" className="img-fluid circleShape"></img>
        <LiveIcon/>
      ),
      title: "Live Analytics & Statistics",
      content:
        'Get real-time, in-depth analytics in your event dashboard, covering everything from ticket sales and attendee data to live event status updates. Gain valuable insights to make informed decisions and optimise your event"s performance.',
    },
    {
      imgBlock: (
        // <img
        //   src="/direct-attendee-icon.png"
        //   className="img-fluid circleShape"
        // ></img>
        <DirectAttendeeIcon/>
      ),
      title: "Direct Attendee Communication",
      content:
        'Keep your attendees informed about event updates or important messages with our communication tool. From Box Office, you can easily reach all attendees by sending a personalised email using our customisable template. It"s a quick, simple, and effective way to stay connected.',
    },
    {
      imgBlock: (
        // <img
        //   src="/competitive-icon.png"
        //   className="img-fluid circleShape"
        // ></img>
        <CompetitiveIcon/>
      ),
      title: "Competitive Fees",
      content:
        'We offer one of the market"s lowest per-ticket fee structures, with payments going directly to you.',
    },
    {
      imgBlock: (
        // <img src="/currency-icon.png" className="img-fluid circleShape"></img>
        <CurrencyIcon/>
      ),
      title: "Currency Flexibility",
      content:
        "We support multiple currencies from around the globe. When creating an event, simply select your preferred currency, and it will automatically apply to all tickets and add-ons you create.",
    },
  ];

  const accordionData2 = [
    {
      imgBlock: (
        // <img
        //   src="/smart-digital-icon.png"
        //   className="img-fluid circleShape"
        // ></img>
        <SmartDigitalIcon/>
      ),
      title: "Smart Digital Tickets",
      content:
        "Smart, paperless tickets provide users with secure access, ensuring they’re protected from fraud. Tickets become available only 1 hour before the event begins, adding an extra layer of security.",
    },
    {
      imgBlock: (
        // <img src="/id-veri-icon.png" className="img-fluid circleShape"></img>
        <IdVeriIcon/>
      ),
      title: "ID Verification",
      content:
        'For verified events, attendees must confirm their Twotixx account by completing a quick online identity check using a government-issued ID. This added layer of security ensures that each attendee"s identity is accurately matched.',
    },

    {
      imgBlock: (
        // <img src="/nft-coll-icon.png" className="img-fluid circleShape"></img>
        <NftCollIcon/>
      ),
      title: "NFT Collectables",
      content:
        'Fans can now earn Web 3.0 digital collectables directly within the Twotixx app. With our NFT integration, users can effortlessly mint and view the NFTs they"ve earned from attending events, all in one convenient location.',
    },
    {
      imgBlock: (
        // <img src="/sms-ticket-icon.png" className="img-fluid circleShape"></img>
        <SmsTicketIcon/>
      ),
      title: "SMS Ticket Transfer",
      content:
        'Easily transfer tickets between yourself and others using our SMS ticket transfer feature. Tickets are securely sent through registered Twotixx accounts linked to SMS, ensuring you always know exactly who you"re sending your tickets to.',
    },
    {
      imgBlock: (
        // <img src="/sms-log-icon.png" className="img-fluid circleShape"></img>
        <SmsLogIcon/>
      ),
      title: "SMS Log In",
      content:
        "Enjoy a quick and secure login experience with ease. Users can access their Twotixx accounts effortlessly—simply enter your registered SMS, and you may be prompted to confirm your identity with a verification code for added security.",
    },
    {
      imgBlock: (
        // <img
        //   src="/screenshot-blocker-icon.png"
        //   className="img-fluid circleShape"
        // ></img>
        <ScreenshotBlockerIcon/>
      ),
      title: "Screenshot Blocker",
      content:
        "We block screenshotting ticket QR codes to protect event attendees from purchasing fraudulent tickets. This measure is designed to ensure everyone can enjoy peace of mind, knowing their tickets are genuine.",
    },
    {
      imgBlock: (
        // <img src="/event-maps-icon.png" className="img-fluid circleShape"></img>
        <EventMapsIcon/>
      ),
      title: "Event Maps",
      content:
        "Easily navigate event maps with our Google Maps integration. You can also access directions to the venue through City mapper, Apple Maps, and Waze for added convenience.",
    },
    {
      imgBlock: (
        <img src="/event-maps-icon.png" className="img-fluid circleShape"></img>
      ),
      title: "Download the Twotixx Consumer app now!",
      content:
        "consumer app",
    },
  ];

  const accordionData3 = [
    {
      imgBlock: (
        <EasyScanIn/>
        // <img src="/easy-scan-icon.png" className="img-fluid circleShape"></img>
      ),
      title: "Easy Scan In",
      content:
        `Easily scan digital tickets at the event gate. Just activate the app's camera, scan the QR code, and review the attendee profile(s) instantly.`,
    },
    {
      imgBlock: (
        // <img src="/live-event-icon.png" className="img-fluid circleShape"></img>
        <LiveEventIcon/>
      ),
      title: "Live Event Analytics",
      content:
        "Track all live attendee data in one centralised dashboard. Effortlessly access ticket and entry statistics from the beginning to the end of the event, ensuring full transparency under the supervision of event staff.",
    },

    {
      imgBlock: (
        // <img
        //   src="/entrance-selector-icon.png"
        //   className="img-fluid circleShape"
        // ></img>
        <EntranceSelectorIcon/>
      ),
      title: "Entrance Selector",
      content:
        "Easily select the entrance or scanning point where you want to process tickets.",
    },
    {
      imgBlock: (
        // <img
        //   src="/smart-search-icon.png"
        //   className="img-fluid circleShape"
        // ></img>
        <SmartSearchIcon/>
      ),
      title: "Smart Search",
      content:
        "The search feature enables event staff to quickly look up a wide range of metadata to retrieve relevant attendee profiles. This streamlined process enhances efficiency, making it faster to check in attendees at event entrances.",
    },
    {
      imgBlock: (
        // <img
        //   src="/event-check-icon.png"
        //   className="img-fluid circleShape"
        // ></img>
        <EventCheckIcon/>
      ),
      title: "Event Check In & Out",
      content:
        `Our check-in and check-out feature lets attendees temporarily leave the venue while maintaining full transparency. For safety reasons, it's essential to track who is inside or outside the venue at any given time, and that's exactly why we developed this feature!`,
    },
    {
      imgBlock: (
        <img src="/event-maps-icon.png" className="img-fluid circleShape"></img>
      ),
      title: "Download the Twotixx Venue app now!",
      content:
        "venue app",
    },
  ];

  // sticky js start

  // const [isSticky, setIsSticky] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     // Check if the scroll position is greater than a threshold (e.g., 100px)
  //     if (window.scrollY > 2000) {
  //       setIsSticky(true);
  //     } else {
  //       setIsSticky(false);
  //     }
  //   };

  //   // Add the scroll event listener
  //   window.addEventListener('scroll', handleScroll);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const headerRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [stickyPosition, setStickyPosition] = useState(null);

  useEffect(() => {
    // Store the initial position of the element on component mount
    setStickyPosition(headerRef.current?.offsetTop);

    const handleScroll = () => {
      if (stickyPosition !== null && window.pageYOffset > stickyPosition) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [stickyPosition]);

  // sticky js end

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderAppDownload = (item, index, activeIndex) => {
    console.log("renderAppDownload", item, index, activeIndex);
    return (
      <div style={{padding: '17px'}} className="accordion-item">
        <div style={{justifyContent: 'center', width: '100%'}} className="accordion-title" onClick={() => toggleAccordion(index)}>
          <h3>{item?.title}</h3>
          {/* <span>{activeIndex === index ? "-" : "+"}</span> */}
        </div>
        <div
            style={{ width: '100%',  }}
          className="appGoogle-btns-features"
        >
          <a
            href={item.content === 'venue app' ? "https://apps.apple.com/in/app/venue-by-twotixx/id6472804982" : "https://apps.apple.com/in/app/twotixx/id6451201695"}
            target="_blank"
          >
            <img className="btn-download" alt="" src="/appStore-btn.svg" />
          </a>
          <a
            href={item.content === 'venue app' ? "https://play.google.com/store/apps/details?id=com.twotixx.venue" : 'https://play.google.com/store/apps/details?id=com.twotixx'}
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
    );
  };

  return (
    <>
    <div className="about-page-wrapper">
    <Helmet>
        <title>Features - Title</title>
        <meta name="description" content="Features - Description" />
        <meta property="og:title" content="Features - OG Title" />
        <meta property="og:description" content="Features - OG Description" />
        <meta property="og:image" content="https://picsum.photos/200/300" />
        <meta property="og:url" content="https://staging.twotixx.com/features" />
      </Helmet>
      <Navbar />
      <section className="inner-hero-banner-sec ticketGuard-heroBanner-sec">
        <div className="container">
          <h2 className="banner-tittle">Features</h2>
          <p>
            Explore our intuitive platform designed to quickly sell out your
            events and enhance customer experiences
          </p>
        </div>
        <img
          src="/banner-round-shape.svg"
          className="img-fluid circleShape"
        ></img>
      </section>

      <section className="eventSoftware-sec">
        <div className="container">
          <div className="eventSoftware-text-block">
            <h2>
              The <span>All-in-One</span> Event Software Suite for Everyone
            </h2>
            <span className="feature-line"></span>
            <p>
              Twotixx's software suite offers a complete solution for event
              organisers to create, manage, and run events seamlessly. Our three
              core applications feature modern tools prioritising efficiency,
              ethics, and safety.
            </p>
          </div>

          <div className="eventSoftware-imgItem-list">
            <div className="eventSoftware-imgItem">
              <div className="eventSoftware-imgBlock-show">
                <img
                  className="img-fluid imgSecondView"
                  alt="nftscreen"
                  src="/box-office-img1.png"
                />
              </div>
              <div className="eventSoftware-item-description">
                <span className="badge">Organiser</span>
                <h3>Twotixx Box Office</h3>
                <p>
                  A self-service platform for creating events and selling
                  tickets.
                </p>
              </div>
            </div>

            <div className="eventSoftware-imgItem">
              <div className="eventSoftware-imgBlock-show">
                <img
                  className="img-fluid imgSecondView"
                  alt="nftscreen"
                  src="/consumerApp-img1.png"
                />
              </div>
              <div className="eventSoftware-item-description">
                <span className="badge">Attendee</span>
                <h3>Twotixx Consumer App</h3>
                <p>
                  An app for attendees to manage their tickets and Twotixx
                  accounts.
                </p>
              </div>
            </div>

            <div className="eventSoftware-imgItem">
              <div className="eventSoftware-imgBlock-show">
                <img
                  className="img-fluid imgSecondView"
                  alt="nftscreen"
                  src="/appleSet1.png"
                />
              </div>
              <div className="eventSoftware-item-description">
                <span className="badge">Event staff</span>
                <h3>Twotixx Venue App</h3>
                <p>
                  An app for event staff to oversee and manage ticket scanning
                  and event entry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="twotixx-accordionTab-event-sec">
        <div
          ref={headerRef}
          className={`twotixx-eventTab-menu-wrapper ${
            isSticky ? "sticky" : ""
          }`}
        >
          <div className="container">
            <div className="twotixx-eventTab-menu">
              {eventCategories?.map((item, index) => {
                return (
                  <CommonButton
                    text={item}
                    backgroundColor={
                      isSelected === item
                        ? "var(--Primary-Mid-Blue)"
                        : "var(--twotixx-brand-primary-brand)"
                    }
                    borderColor={
                      isSelected === item
                        ? "var(--Primary-Mid-Blue)"
                        : "var(--twotixx-borders-silver)"
                    }
                    fontColor={
                      isSelected === item
                        ? "var(--monochrome-white)"
                        : "var(--Primary-Mid-Blue)"
                    }
                    fontWeight="var(--font-w-500)"
                    onClick={() => setIsSelected(item)}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="twotixx-eventTab-content">
            {isSelected === "Twotixx Box Office" && (
              <div className="twotixx-eventTab-content-item">
                <div className="twotixx-eventTab-content-lft">
                  <h2 className="tittle">Twotixx Box Office</h2>
                  <div className="accordion">
                    {accordionData.map((item, index) => (
                       <div key={index} className="accordion-item">
                       <div className="accordion-item-icon">
                         {item.imgBlock}
                       </div>
                       <div
                         className="accordion-title"
                         // onClick={() => toggleAccordion(index)}
                       >
                         <h3>{item.title}</h3>
                         {/* <span>{activeIndex === index ? "-" : "+"}</span> */}
                       </div>
                       <div
                         className={`accordion-content ${
                           activeIndex === index ? "open" : ""
                         }`}
                       >
                         <div onClick={() => toggleAccordion(index)} className={`accordion-content-inside ${
                           activeIndex === index ? "open" : ""
                         }`}>
                         <p>{`${item.content}`}</p>
                         <span>{activeIndex === index ? "-" : "+"}</span>
                         </div>
                       </div>
                     </div>
                    ))}
                  </div>
                </div>
                <div className="twotixx-eventTab-content-rht">
                  <div className="eventTab-content-imgBlock">
                    <img
                      src="/box-office-imgLg-mobile1.png"
                      className="img-fluid desktop-img"
                    ></img>
                    <img
                      src="/box-office-imgLg-mobile1.png"
                      className="img-fluid mobile-img"
                    ></img>
                  </div>
                </div>
              </div>
            )}
            {isSelected === "Twotixx Consumer App" && (
              <div className="twotixx-eventTab-content-item consumerApp-item">
                <div className="twotixx-eventTab-content-lft">
                  <h2 className="tittle">Twotixx Consumer App</h2>
                  <div className="accordion">
                    {accordionData2.map((item, index) =>
                      index !== accordionData2.length - 1 ? (
                        <div key={index} className="accordion-item">
                          <div className="accordion-item-icon">
                            {item.imgBlock}
                          </div>
                          <div
                            className="accordion-title"
                            // onClick={() => toggleAccordion(index)}
                          >
                            <h3>{item.title}</h3>
                            {/* <span>{activeIndex === index ? "-" : "+"}</span> */}
                          </div>
                          <div
                            className={`accordion-content ${
                              activeIndex === index ? "open" : ""
                            }`}
                          >
                            <div onClick={() => toggleAccordion(index)} className={`accordion-content-inside ${
                              activeIndex === index ? "open" : ""
                            }`}>
                            <p>{item.content}</p>
                            <span>{activeIndex === index ? "-" : "+"}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        renderAppDownload(item, index, activeIndex)
                      )
                    )}
                  </div>
                </div>
                <div className="twotixx-eventTab-content-rht">
                  <div className="eventTab-content-imgBlock">
                    <img
                      src="/consumerApp-imgLg.png"
                      className="img-fluid"
                    ></img>
                  </div>
                </div>
              </div>
            )}
            {isSelected === "Twotixx Venue App" && (
              <div className="twotixx-eventTab-content-item venueApp-item">
                <div className="twotixx-eventTab-content-lft">
                  <h2 className="tittle">Twotixx Venue App</h2>
                  <div className="accordion">
                  {accordionData3.map((item, index) =>
                      index !== accordionData3.length - 1 ? (
                        <div key={index} className="accordion-item">
                          <div className="accordion-item-icon">
                            {item.imgBlock}
                          </div>
                          <div
                            className="accordion-title"
                            // onClick={() => toggleAccordion(index)}
                          >
                            <h3>{item.title}</h3>
                            {/* <span>{activeIndex === index ? "-" : "+"}</span> */}
                          </div>
                          <div
                            className={`accordion-content ${
                              activeIndex === index ? "open" : ""
                            }`}
                          >
                            <div onClick={() => toggleAccordion(index)} className={`accordion-content-inside ${
                              activeIndex === index ? "open" : ""
                            }`}>
                            <p>{item.content}</p>
                            <span>{activeIndex === index ? "-" : "+"}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        renderAppDownload(item, index, activeIndex)
                      )
                    )}
                  </div>
                </div>
                <div className="twotixx-eventTab-content-rht">
                  <div className="eventTab-content-imgBlock">
                    <img
                      src="/accordionAppleSet-img.png"
                      className="img-fluid"
                    ></img>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}

export default Features;
