import CommonButton from "../Common/CommonButton";
import "./SuccessPage.css";
import { useEffect, useState } from "react";
import cookie from "react-cookies";
import { updateOrder } from "../../services/api";
// import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetTimer, setEventData } from "../../reducers/eventDataReducer";
import { useLocation, useNavigate } from "react-router-dom";

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);
const appUrl = `/app`;

const SuccessPage = () => {
  const [loader, setLoader] = useState(true);
  const [updatePerformed, setUpdatePerformed] = useState(false);
  const [userDetailes, setUserDetailes] = useState(null);
  const [eventData, setEventDataa] = useState(false);
  const[userData, setUserData] = useState(false)
  const [eventAndVenueDetails, setEventAndVenueDetails] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const location = useLocation();
  // const eventData = useSelector((state) => state.eventData);
  console.log("eventData", eventData);

  useEffect(() => {
    dispatch(resetTimer());
    // window.localStorage.clear();
  }, [location, dispatch]);

  const renderStepIcons = () => {
    return (
      <div
        className="successTopStepIcons"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px 24px",
          padding: "64px 72px",
          width: "100%",
        }}
      >
        <div
          className="stepCont"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <img
            className="statusIcon success"
            src="/success-top-status-tick.svg"
            alt="Tick"
          />
          <span
            className="statusText"
            style={{
              color: "#3A8361",
              fontSize: 16,
              fontWeight: 500,
              lineHeight: "1.5em",
            }}
          >
            Tickets
          </span>
        </div>
        <div
          className="stepCont"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <img
            className="statusIcon success"
            src="/success-top-status-tick.svg"
            alt="Tick"
          />
          <span
            className="statusText"
            style={{
              // color: "#3A8361",
              color: "#002366",
              fontSize: 16,
              fontWeight: 500,
              lineHeight: "1.5em",
            }}
          >
            Payment
          </span>
        </div>
        <div
          className="stepCont"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <img
            className="statusIcon"
            src="/success-top-status-radio.svg"
            alt="Radio"
          />
          <span
            className="statusText"
            style={{
              // color: "#0057FF",
              color: "#002366",
              fontSize: 16,
              fontWeight: 500,
              lineHeight: "1.5em",
            }}
          >
            Get app
          </span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const sessionId = cookie.load("stripeSessionId");
    if (sessionId && !updatePerformed) {
      stripe.checkout.sessions
        .retrieve(sessionId)
        .then(async (session) => {
          const orderId = parseInt(session?.metadata?.orderId);
          const paymentIntent = session?.payment_intent;
          if (orderId && session?.status === "complete") {
            const params = {
              orderId: orderId,
              paymentStatus: "Approved",
              paymentRef: paymentIntent,
              StripeIntentId: paymentIntent || "",
            };
            setLoader(false);
            await handleUpdateOrder(params);
          } else {
            const params = {
              orderId: orderId,
              paymentStatus: "Failed",
              paymentRef: paymentIntent,
            };
            setLoader(false);
            await handleUpdateOrder(params);
          }
          setUpdatePerformed(true);
        })
        .catch((e) => {
          cookie.remove("stripeSessionId");
          setLoader(false);
        });
    }
  }, [updatePerformed]);

  const handleUpdateOrder = async (params) => {
    await updateOrder(params);
    cookie.remove("stripeSessionId");
    setLoader(false);
  };

  useEffect(() => {
    if (!eventData || eventData.length === 0) {
      const storedEventData = sessionStorage.getItem("eventData");
      try {
      if (storedEventData) {
        const parsedEventData = JSON.parse(storedEventData);
        console.log("parsedEventData", parsedEventData);
        dispatch(setEventData(parsedEventData));
        console.log("Event Data from sessionStorage:", parsedEventData);
      }
    } catch (e) {
      console.error("Error parsing storedUserDetails:", e);
    }
    } else {
      console.log("Event Data from Redux store:", eventData);
    }

  }, [dispatch, eventData]);

  const eventName = eventData[0]?.name || "";

  const handleContinueClick = () => {
    dispatch(resetTimer());
    window.localStorage.clear();
    window.location.href = appUrl;
  };

  const onCloseHandle = () => {
    navigate("/");
    window.scrollTo(0, 0);
    window.localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };
  const onCloseHomeIcon = () => {
    navigate("/");
    window.scrollTo(0, 0);
    window.localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  const handleResetTimer = () => {
    window.localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  function formatDate(input) {
    const [day, month] = input.split(" ").map(Number);
    const date = new Date(2020, month - 1, day);

    const getOrdinalNum = (n) => {
      let s = ["th", "st", "nd", "rd"],
        v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    const formattedDay = getOrdinalNum(day);
    const monthName = date.toLocaleString("en", { month: "long" });

    return `${formattedDay} ${monthName}`;
  }

  const formatEventDates = () => {
    if (!eventData[0]?.startDate) {
      return "Date not available";
    }
    const startYear = new Date(eventData[0].startDate).getFullYear();
    const startMonth = new Date(eventData[0].startDate).getMonth() + 1;
    const startDay = new Date(eventData[0].startDate).getDate();
    var formattedStartDate = formatDate(`${startDay} ${startMonth}`);
    formattedStartDate += ` ${startYear}`;
    return `${formattedStartDate}`;
  };

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("LoginuserDetails");
    try {
    if (storedUserDetails) {
      const userDetailsObject = JSON.parse(storedUserDetails);
      console.log("userDetailsObject", userDetailsObject);
      setUserDetailes(userDetailsObject);
    } else {
      console.log("No user details found in localStorage");
    }
  } catch (e) {
    console.error("Error parsing storedUserDetails:", e);
  }
  }, []);

  useEffect(() => {
    if (eventData) {
      let eventDate = formatEventDates()
      let eventLocation =  eventData[0]?.venue?.address?.addressLine1 + ", " + eventData[0]?.venue?.address?.city
      setEventAndVenueDetails({eventName: eventData[0]?.name, eventDate: eventDate, eventLocation: eventLocation});
    } else {
      console.log("No venueAndEventDetailsObject found");
    }
  }, [eventData]);

  useEffect(() => {
    const successUserDetails = localStorage.getItem("successUserDetails");
    try {
      if (successUserDetails) {
        const userDetailsObject = JSON.parse(successUserDetails);
        console.log("Parsed User Details from local storage:", userDetailsObject);
        setUserData(userDetailsObject);
      } else {
        console.log("No user details found in local storage, checking cookies");
        const cookieUserDetails = getCookie("successUserDetails");
        if (cookieUserDetails) {
          const userDetailsObject = JSON.parse(cookieUserDetails);
          console.log("Parsed User Details from cookies:", userDetailsObject);
          setUserData(userDetailsObject);
        } else {
          console.log("No user details found in cookies");
        }
      }
    } catch (e) {
      console.error("Error parsing user details:", e);
    }


    const successEventDetails = localStorage.getItem("successEventDetails");
    try {
      if (successEventDetails) {
        const eventDetailsObject = JSON.parse(successEventDetails);
        console.log("Parsed event Details from local storage:", eventDetailsObject);
        setEventDataa(eventDetailsObject);
      } else {
        console.log("No event details found in local storage, checking cookies");
        const cookieEventDetails = getCookie("successEventDetails");
        if (cookieEventDetails) {
          const eventDetailsObject = JSON.parse(cookieEventDetails);
          console.log("Parsed User Details from cookies:", eventDetailsObject);
          setEventDataa(eventDetailsObject);
        } else {
          console.log("No user details found in cookies");
        }
      }
    } catch (e) {
      console.error("Error parsing user details:", e);
    }
  }, []);

  console.log("userDetailes", userDetailes);

  const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };
  

  return (
    <div className="checkOutsussesspage">
      {/* imnportant for payment */}
      {/* {loader ? (
        <CircularProgress />
      ) : ( */}
      <>
        <div className="successHeader modal-top-logoClose">
          <div className="successHeaderContainer">
            <div className="navBarLogo" onClick={onCloseHomeIcon}>
              <img className="iconnavBarLogo" alt="" src="/icon1.svg" />
            </div>
            <div className="modal-close-button-block">
              <button
                className="modal-close-button"
                onClick={() => {
                  onCloseHandle();
                  handleResetTimer();
                }}
              >
                <img src="/x-close.svg" />
              </button>
            </div>
          </div>
        </div>

        {renderStepIcons()}

        <div className="successTopDetailsCont" style={{ width: "100%" }}>
          <div className="successContainer">
            <div
              className="contLeft"
              style={{
                display: "flex",
                flexDirection: "column",
                flex: "1 0 0",
                gap: 16,
                textAlign: "left",
              }}
            >
              <h4
                className="titleTop"
                style={{
                  margin: "0",
                  color: "var(--text-heading-primary)",
                  fontSize: "24px",
                  fontWeight: "600",
                  lineHeight: "1.34em",
                }}
              >
                
                {userData?.firstName || 'No name!'}, you’re going to
              </h4>
              <h2
                className="titleBottom"
                style={{
                  margin: "0",
                  color: "var(--Primary-Mid-Blue)",
                  fontSize: window.innerWidth <= 768 ? '32px' : '56px',
                  lineHeight: "1.3em",
                  fontWeight: "600",
                }}
              >
                {eventAndVenueDetails?.eventName || eventName}
              </h2>
              <ul className="successUlInline">
                <li>{eventAndVenueDetails?.eventDate || ''}</li>
                <li>{eventAndVenueDetails?.eventLocation || ''}</li>
              </ul>
            </div>
            <div className="contRight">
              <img
                style={{
                  borderRadius: "16px",
                  display: "block",
                  maxWidth: "100%",
                }}
                src={eventData[0]?.imageUri
                  ? `${process.env.REACT_APP_API_URL}${eventData[0].imageUri}`
                  : "/noimage.png"}
                alt="Details Image"
              />
            </div>
          </div>
        </div>

        <div className="successBodyCont" style={{ width: "100%" }}>
          <div className="successContainer">
            <div style={{backgroundColor: "var(--Primary-Mid-Blue)"}} className="bodyContLeft">
              <img src="/logo-white.svg" alt="Logo White" />
              <h3 className="bodyLeftTitle">
                Your tickets are waiting for you in the Twotixx app
              </h3>
              <p className="bodyLeftText">
                Simply download the Twotixx app and log in to access your
                tickets. Scan the QR code below to get started.
              </p>
              <div className="qrDownloadCont">
                <img className="qrCodeImg" src="/qrcode.png" alt="QR Code" />
                <div className="downloadBtns">
                  <CommonButton
                    onClick={handleContinueClick}
                    icon="/mobile-app-store-badge-black.svg"
                  />
                  <CommonButton
                    onClick={handleContinueClick}
                    icon="/mobile-google-play-badge-black.svg"
                  />
                </div>
              </div>
            </div>
            <div className="bodyContRight">
              <div className="rightTopCont">
                <img
                  className="iconQuestionImg"
                  src="/icon-question.svg"
                  alt="Icon Question"
                />
                <h3 className="rightTopTitle">
                  Why do I need an app for my tickets?
                </h3>
              </div>
              <div className="rightBottomCont">
                <p className="rightBottomP">
                  <img className="pIcon" src="/status.svg" alt="Status" />
                  <span className="pText">
                    Our verified app keeps your tickets safe in order to combat
                    ticket touting.
                  </span>
                </p>
                <p className="rightBottomP">
                  <img className="pIcon" src="/social2.svg" alt="Social" />
                  <span className="pText">
                    Want to bring guests with you? No problem. You can allocate
                    your spare tickets to guest profiles in the Twotixx app.
                  </span>
                </p>
                <p className="rightBottomP">
                  <img
                    className="pIcon"
                    src="/communication.svg"
                    alt="Communication"
                  />
                  <span className="pText">
                    Can’t go anymore? Send tickets to friends by syncing your
                    phone contacts with Twotixx.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default SuccessPage;
