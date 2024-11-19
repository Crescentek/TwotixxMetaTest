import React, { Fragment, useEffect, useRef, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { renderToNodeStream } from "react-dom/server";
import "./Home.css";
import "../App/AppPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CommonButton from "../../components/Common/CommonButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { ReactComponent as TicketGuardImg } from "../../assets/svgs/amico.svg";
import { ReactComponent as TicketGuardImg2 } from "../../assets/svgs/amico2.svg";
import { ReactComponent as TicketGuardTextImg } from "../../assets/svgs/ticketGuard-pic.svg";
import { getTrendeingEventDetails } from "../../services/api";
import Loader from "../../components/Common/Loader";
import Text from "../../components/Common/Text";
import ReadyToJoin from "../Seller/ReadyToJoin/index";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const extendedEvents = [...events, ...events];
  const scrollContainerRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || extendedEvents.length <= 5) return;

    const itemWidth = 250;
    const totalItems = extendedEvents.length;
    const containerWidth = scrollContainer.offsetWidth;
    const maxScroll = itemWidth * totalItems - containerWidth;

    let currentScroll = 0;
    let targetScroll = 0;
    let animationFrameId = null;

    const lerp = (start, end, alpha) => {
      return start * (1 - alpha) + end * alpha;
    };

    const autoScroll = () => {
      targetScroll += 0.5;
      if (targetScroll > maxScroll) targetScroll = 0;

      currentScroll = lerp(currentScroll, targetScroll, 0.1);
      scrollContainer.scrollLeft = currentScroll;

      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [extendedEvents.length]);

  async function randomWait() {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.floor(Math.random() * 500)),
    );
    return;
  }

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await getTrendeingEventDetails();
  //       console.log("getTrendeingEventDetails", response.response);
  //       setIsLoading(false);
  //       if (response.response && response.response.length > 0) {
  //         const tempTicketArray = await Promise.all(
  //           response.response.map(async (event) => {
  //             await randomWait();
  //             const imageUrl = `${process.env.REACT_APP_API_URL}${event.imageUri}`;
  //             return {
  //               id: event.id,
  //               imageUrl: imageUrl,
  //               name: event.name,
  //               date: new Date(event.startDate).toLocaleDateString("en-US", {
  //                 year: "numeric",
  //                 month: "long",
  //                 day: "numeric",
  //               }),
  //               location:
  //                 `${event?.venue?.name}, ${event?.venue?.address?.city}` || "",
  //               price:
  //                 `${event?.currency?.symbol || ""}${
  //                   event?.price?.valueAsString
  //                 }` || "",
  //             };
  //           })
  //         );
  //         setEvents(tempTicketArray);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchEvents();
  // }, []);

  useEffect(() => {
    // document.querySelector('meta[name="description"]').setAttribute("content", 'this is Home test descriptions');
    // document.querySelector('meta[name="og:description"]').setAttribute("content", 'this is Home meta OG test descriptions');
    // document.getElementsByTagName('meta')["og:description"].content = "My new page description!!";

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleContinueClick = () => {
    navigate("/event-list");
    window.scrollTo(0, 0);
  };
  const handleSellSection = () => {
    // window.open("https://staging.boxoffice.twotixx.com")
    window.scrollTo(0, 0);
    navigate(`/organisers`);
  };

  const handleTicketSection = (eventName, eventId) => {
    const formattedEventName = eventName
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    navigate(`/event-details/${formattedEventName}-${eventId}`);
    window.scrollTo(0, 0);
  };

  const handleTowtixDownload = () => {
    // window.open("https://staging.boxoffice.twotixx.com", "_blank").focus();
    navigate("/app");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet
        onChangeClientState={(newState) => {
          const metaDescription = document.querySelector(
            'meta[name="og:description"]',
          );
          if (metaDescription) {
            metaDescription.setAttribute(
              "content",
              "Discover a world of events with Twotixx! Enjoy seamless ticket purchases with our innovative digital, NFT, and personalised ticket options. Experience secure, transparent ticketing with low fees today.",
            );
          }
        }}
      >
        <title>
          Twotixx | Your Gateway to Exciting Events with Smart Digital
          Ticketing.
        </title>
        <link rel="canonical" href="https://twotixx-meta-test.vercel.app/" />
        <meta name="description" content="Home - Description" />
        <meta name="og:title" content="Home - OG Title" />
        <meta name="og:description" content="Home - OG Description" />
        <meta name="og:image" content="https://picsum.photos/id/237/200/300" />
        <meta name="og:url" content="https://twotixx-meta-test.vercel.app/" />
      </Helmet>
      <div className="terms-service-main">
        <Navbar />
        <section className="home-banner">
          <div className="header-content">
            <div className="header-content-lft">
              <h1 className="bannerTitle">
                Ticketing, <br></br>
                <span>reimagined.</span>
              </h1>
              <p className="bannerP">
                Test2 - Unforgettable live events. Easy ticket management and
                upfront pricing. We make going out worry-free.
              </p>
              {/* <div style={{marginRight:"464px"}}> */}
              {/* <CommonButton text="Download Twotixx" onClick={handleTowtixDownload} /> */}
              <div style={{ marginTop: 0 }} className="appGoogle-btns">
                <a
                  href="https://apps.apple.com/in/app/twotixx/id6451201695"
                  target="_blank"
                >
                  <img
                    className="btn-download"
                    src="/appStore-btn.svg"
                    alt="App Store Logo"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.twotixx"
                  target="_blank"
                >
                  <img
                    className="btn-download"
                    src="/googlePlay-store-btn.svg"
                    alt="Google Play Store Logo"
                  />
                </a>
              </div>
              {/* </div> */}
            </div>
            <div
              className="header-content-rht"
              style={{ position: "relative" }}
            >
              {/* {!videoLoaded && (
              <div className="loader-video">
                <Loader />
              </div>
            )} */}
              <video
                src="/homevideo2.mp4"
                alt="home-video"
                className="video-fluid"
                loop
                muted
                playsInline
                autoPlay
                controls
                onLoadedData={() => setVideoLoaded(true)}
                onContextMenu={(e) => e.preventDefault()}
                style={{ height: "auto", zIndex: 1 }}
              />
            </div>
          </div>
        </section>

        {/* <section className="section tending-events-sec homeTrendingEventsSection">
        <div className="tending-events-title">
          <h2>Trending events</h2>
          <CommonButton text="  View all" onClick={handleContinueClick} />
        </div>
        <div className="events-scroll-container homeTrendingEventsSlider" ref={scrollContainerRef}>
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              padding: "20px",
              gap: "10px",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {extendedEvents.map((event, index) => (
              <Paper
                key={event.id}
                elevation={0}
                className="pointerCursor"
                sx={{
                  flex: "none",
                  width: "300px",
                  margin: "10px",
                  overflow: "hidden",
                }}
                onClick={() => handleTicketSection(event.name, event.id)}
              >
                <img
                  src={event.imageUrl}
                  alt={event.name}
                  className="event-img"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    objectFit: "cover",
                    display: "block",
                    flex: 1,
                    border: "none",
                    aspectRatio: 16 / 9,
                    maxHeight: "55vh",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/noimage.png";
                  }}
                />
                <div className="boxTextCont">
                  <Box sx={{ marginTop: "20px", ":hover": { boxShadow: "inherit" } }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontFamily: "var(--global-font-family)",
                      fontWeight: "var(--font-w-600)",
                      fontSize: "var(--display-xs-size)",
                      padding: "var(--gap-5xl) 0 0",
                      marginBottom: "16px",
                      color: "var(--text-heading-primary)",
                    }}
                  >
                    {event?.name}
                  </Typography>
                  <Text variant={"m300"} color={"var(--body-title)"}>
                    {`${event?.date} • ${event?.location}`}
                  </Text>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "var(--global-font-family)",
                        color: "var(--Primary-Mid-Blue)",
                        fontWeight: "var(--font-w-600)",
                        fontSize: "var(--body-md-size)",
                        margin: "var(--gap-xl) 0 0",
                      }}
                    >
                      from {event?.price}
                    </Typography>
                  </Box>
                </div>
              </Paper>
            ))}
          </Box>
        </div>
        <div className="eventsViewAllBtn-mobile">
          <CommonButton text="View all" onClick={handleContinueClick} />
        </div>
      </section> */}

        <section className="section started-our-appSec">
          <div className="appSecContainer">
            <div className="started-our-app-inner">
              <div style={{ padding: "72px" }} className="started-our-app-rht">
                <img className="iconfooterLogo" alt="" src="/icon1.svg" />
                <h2 className="titleGetStarted">
                  Twotixx <span>Box Office</span>
                </h2>
                <p style={{ fontSize: "20px" }} className="pGetStarted">
                  Effortlessly create, manage, and sell event tickets — All in
                  one platform!
                </p>
                <CommonButton
                  text=" Get started"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate("/organisers");
                  }}
                />
              </div>

              <div className="started-our-app-lft">
                {/* <img
              src="/mask-twotixx-box-office.svg"
              alt="mask-twotixx-box-office"
              style={{position: 'absolute', top: '0', right: '0', bottom: 0, zIndex: '-1', height: '100%', borderRadius: '24px'}}
            /> */}
                <img
                  className="mask-twotixx-box-officeImg mask-twotixx-box-officeImg-desktop"
                  src="/mask-twotixx-box-office-desktop.svg"
                  alt="mask-twotixx-box-office"
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    bottom: 0,
                    zIndex: "-1",
                    height: "100%",
                    borderRadius: "24px",
                  }}
                />
                <img
                  className="mask-twotixx-box-officeImg mask-twotixx-box-officeImg-mobile"
                  src="/mask-twotixx-box-office-mobile.svg"
                  alt="mask-twotixx-box-office"
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    bottom: 0,
                    zIndex: "-1",
                    height: "100%",
                    borderRadius: "24px",
                  }}
                />
                <img
                  style={{ borderRadius: "24px" }}
                  src="/HomeMacBook1.png"
                  alt="iPhone-new"
                  className="img-fluid iPhone-mobile-desktop"
                />
                <img
                  src="/mac-twotix-box-office-home-mobile1.png"
                  alt="iPhonePro-mobile"
                  className="img-fluid iPhone-mobile-mobile"
                />
                {/* <img className="img-fluid bannerGetStarted" src="/iPhone-new3-Mobile.png" alt="iPhonePro-mobile" /> */}
              </div>
            </div>
          </div>
        </section>

        <section className="section new-home-bodyContent-sec body-mission-game-sec mission-game-right-mask-background homeBoxContImgRight">
          <div className="new-home-bodyContent-inner boxContImgRightBody">
            <div className="new-home-bodyContent-rht textContLeft">
              <h2 className="boxContTitle">
                Our mission is to <span> change the game</span>
              </h2>
              <p className="boxContP">
                Our platform is designed to make a difference. We combat
                touting, fraud, scams, and unfair resales while enhancing venue
                security and strengthening fan-artist relationships. Experience
                the best in event ticketing for both attendees and organisers.
              </p>
              <CommonButton
                className="home-parg-btn"
                text="Discover more"
                onClick={() => navigate("/About")}
              />
            </div>
            <div className="new-home-bodyContent-lft imgContRight">
              <TicketGuardImg2 className="img-fluid" />
            </div>
          </div>
        </section>

        <section className="section new-home-bodyContent-sec homeBoxContImgLeft">
          <div className="new-home-bodyContent-inner-top boxContImgLeftBody">
            <div className="imgContLeft">
              <TicketGuardImg />
            </div>
            <div className="new-home-bodyContent-rht textContRight">
              <TicketGuardTextImg className="img-fluid imgTicketGuard" />
              <h2 className="boxContTitle">Elevating event security</h2>
              <p className="boxContP">
                Twotixx’s TicketGuard® takes smart tickets to the next level
                with identity verification features. This added layer ensures
                each ticket is securely linked to a verified individual,
                offering more than just event entry.
              </p>
              <CommonButton
                className="home-parg-btn"
                text="Find out more"
                onClick={() => navigate("/ticketGuard")}
              />
            </div>
          </div>
        </section>

        <section className="section started-our-appSec">
          <div className="appSecContainer">
            <div className="started-our-app-inner">
              <div className="started-our-app-lft">
                <img
                  src="/iPhone-new3-update.png"
                  alt="iPhone-new"
                  className="img-fluid iPhone-mobile-desktop"
                />
                <img
                  src="/iPhone-new3-Mobile.png"
                  alt="iPhonePro-mobile"
                  className="img-fluid iPhone-mobile-mobile"
                />
                {/* <img className="img-fluid bannerGetStarted" src="/iPhone-new3-Mobile.png" alt="iPhonePro-mobile" /> */}
              </div>
              <div className="started-our-app-rht">
                <img className="iconfooterLogo" alt="" src="/icon1.svg" />
                <h2 className="titleGetStarted">
                  Get started with <span>our app</span>
                </h2>
                <p className="pGetStarted">
                  Download the Twotixx App to access and manage your event
                  tickets. Available on the App Store (iOS) or Google Play store
                  (Android).
                </p>
                <CommonButton
                  className="home-parg-btn"
                  text=" Download Twotixx"
                  onClick={handleTowtixDownload}
                />
              </div>
            </div>
          </div>
        </section>

        <ReadyToJoin
          handleTicketSection={handleSellSection}
          text1={"Selling tickets online?"}
          text2={"Try Twotixx"}
          buttonTitle={"Learn More"}
        />

        {/* <section className="section selling-online-sec">
        <div className="container">
          <h3 style={{ display: "flex", flexDirection: "column" }}>
            Selling tickets online?{" "}
            <span style={{ color: "#DBFF00", textAlign: "center" }}>
              Try Twotixx
            </span>
          </h3>
          <CommonButton
            style={{ marginTop: -20 }}
            text=" Learn more"
            onClick={handleSellSection}
          />
        </div>
      </section> */}

        <div className="footer-home">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
