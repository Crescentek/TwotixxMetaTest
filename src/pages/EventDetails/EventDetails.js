import React, { useEffect, useState, useRef } from "react";
import "./EventDetails.css";
import { Helmet } from "react-helmet-async";
import DocumentMeta from "react-document-meta";
import { useNavigate } from "react-router-dom";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  Autocomplete,
  useLoadScript,
} from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import EventHeader from "./EventHeader";
import CommonButton from "../../components/Common/CommonButton";
import Modal from "../../components/Modal/Modal";
import CustomStepper from "../../components/Modal/CustomStepper";
import { getEventDetails } from "../../services/api";
import dayjs from "dayjs";
import {
  setEventData,
  setLoading,
  setError,
  setTrackingCode,
  setNoRefundsPolicy,
  resetTimer,
} from "../../reducers/eventDataReducer";
import { useParams } from "react-router-dom";
import Loader from "../../components/Common/Loader";

const EventDetails = (setMyUrl) => {
  const [showTimer, setShowTimer] = useState(false);

  const { id } = useParams();

  const extractName = (id) => {
    const parts = id.split("-");
    console.log("parts", parts);
    if (!isNaN(parts[parts.length - 1])) {
      return parts.slice(0, -1).join("-");
    }
    return id;
  };

  const nameWithHyphens = extractName(id);
  console.log("nameWithHyphens", nameWithHyphens);

  const eventId = id.split("-").pop();

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const isLoading = useSelector((state) => state.isLoading);
  const eventData = useSelector((state) => state.eventData);
  const noRefundsPolicy = useSelector((state) => state.noRefundsPolicy);
  const timerStarted = useSelector((state) => state.timerStarted);
  const dispatch = useDispatch();
  console.log("eventDataxxxxxxxxxxx", eventData);
  const [meta, setMeta] = useState({});

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const startTimer = () => {
    setShowTimer(true);
  };

  useEffect(() => {
    if (!timerStarted) {
      console.log("Resetting timer due to timerStarted being false.");
      dispatch(resetTimer());
    }
  }, [timerStarted, dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const trackingCode = params.get("utm");
    if (trackingCode) {
      dispatch(setTrackingCode(trackingCode));
    } else {
      console.log("No tracking code found in URL");
    }
  }, [dispatch]);

  useEffect(() => {
    setMeta({
      title: eventData[0]?.name || "Anonymous Event",
      description: eventData[0]?.description || "",
      meta: {
        charset: "utf-8",
        name: {
          keywords: "react,meta,document,html,tags",
        },
        property: {
          "og:title": eventData[0]?.name || "Anonymous Event",
          "og:description": eventData[0]?.description || "",
          "og:image": `${process.env.REACT_APP_API_URL}${eventData[0]?.imageUri} || "/noimage.png"`,
          "og:url": `${process.env.REACT_APP_API_URL}${eventData[0]?.imageUri} || "/noimage.png"`,
        },
      },
    });
  }, [eventData]);

  const fetchEventData = async () => {
    dispatch(setLoading(true));
    try {
      const params = new URLSearchParams(window.location.search);
      const trackingCode = params.get("utm");
      const result = await getEventDetails(eventId, trackingCode);
      console.log("eventDataResultttttttttt", result?.response[0]?.name);
      console.log(
        "eventDataResult",
        result?.response?.eventUserDetails?.stripeAccountId
      );

      if (result.status) {
        console.log("result.responsessssssss", result.response);
        const finalData = result.response[0].name
          .trim()
          .replace(/[\s-]+/g, "-")
          .replace(/-$/, "");
        console.log("finalData", finalData);
        console.log("finalDataaaa", finalData);
        if (nameWithHyphens === finalData) {
          dispatch(setEventData(result.response));
          console.log("result.response", result.response);
          sessionStorage.setItem("eventData", JSON.stringify(result.response));
        }
      } else {
        dispatch(setError(result.message || "Failed to fetch event details"));
        setErrorMessage(result.message || "Failed to fetch event details");
      }
    } catch (err) {
      dispatch(setError("Error fetching data"));
      setErrorMessage("Error fetching data");
    } finally {
      dispatch(setLoading(false));
      setDataFetched(true);
    }
  };

  useEffect(() => {
    if (eventData[0]?.refundsAllowed === false) {
      dispatch(setNoRefundsPolicy(true));
    } else {
      dispatch(setNoRefundsPolicy(false));
    }
  }, [dispatch, eventData[0]?.refundsAllowed]);

  useEffect(() => {
    const timer = setTimeout(fetchEventData, 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    const displayErrorTimer = setTimeout(() => {
      if (!eventData[0] && !errorMessage) {
        setErrorMessage(
          "Something went wrong. Please try again after some time."
        );
      }
    }, 5000);

    return () => clearTimeout(displayErrorTimer);
  }, [eventData, errorMessage]);

  if (isLoading || !dataFetched) {
    return <Loader />;
  }

  if (!eventData[0] || errorMessage) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>{errorMessage}</div>
    );
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
    if (!eventData[0]?.startDate || !eventData[0]?.endDate) {
      return "Date not available";
    }

    const startYear = new Date(eventData[0].startDate).getFullYear();
    const endYear = new Date(eventData[0].endDate).getFullYear();

    const startMonth = new Date(eventData[0].startDate).getMonth() + 1;
    const endMonth = new Date(eventData[0].endDate).getMonth() + 1;

    const startDay = new Date(eventData[0].startDate).getDate();
    const endDay = new Date(eventData[0].endDate).getDate();

    var formattedStartDate = formatDate(`${startDay} ${startMonth}`);
    var formattedEndDate = formatDate(`${endDay} ${endMonth}`);

    if (startYear !== endYear) {
      formattedStartDate += ` ${startYear}`;
      formattedEndDate += ` ${endYear}`;
    } else {
      formattedEndDate += ` ${endYear}`;
    }

    return `${formattedStartDate} - ${formattedEndDate}`;
  };

  const openPromoterPage = (promoterName, promoterId) => {
    const formattedPromotorName = promoterName
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    const myUrls = `${formattedPromotorName}-${promoterId}`;
    const url = `/promoter/${myUrls}`;
    window.open(url, "_blank");
  };

  const handleTowtixDownload = () => {
    navigate(`/app`);
    window.scrollTo(0, 0);
  };

  return (
    <DocumentMeta {...meta}>
      <div className="eventDetails eventDetails-background">
        {/* <Helmet>
        <title>{eventData[0]?.name || "Anonymous Event"}</title>
        <meta property="og:image" content={eventData[0]?.imageUri
          ? `${process.env.REACT_APP_API_URL}${eventData[0].imageUri}`
          : "/noimage.png"} />
        <meta property="og:image:secure_url" content={eventData[0]?.imageUri
          ? `${process.env.REACT_APP_API_URL}${eventData[0].imageUri}`
          : "/noimage.png"} />
          <meta property="og:title" content={eventData[0]?.name || "Anonymous Event"}/>
       <meta property="og:type" content="website"/>
       <meta property="og:description" content={eventData[0]?.description || ""}/>
      </Helmet> */}

        {/* <Helmet>
<title>{eventData[0]?.name || "Anonymous Event"}</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
        <meta property="og:image" content={eventData[0]?.imageUri
          ? `${process.env.REACT_APP_API_URL}${eventData[0].imageUri}`
          : "/noimage.png"} />
          <meta property="og:image:secure_url" content={eventData[0]?.imageUri
          ? `${process.env.REACT_APP_API_URL}${eventData[0].imageUri}`
          : "/noimage.png"} />
          <meta property="og:title" content={eventData[0]?.name || "Anonymous Event"}/>
          <meta property="og:type" content="website"/>
       <meta property="og:description" content={eventData[0]?.description || ""}/>
      </Helmet> */}
        <Navbar />
        <div className="section">
          <div className="container home-two-block">
            <div className="section_home">
              <div className="musicBox">
                <div className="lft-box">
                  <div className="content lft-block-home">
                    <EventHeader eventData={eventData} />
                    <div className="event-image">
                      <img
                        style={{
                          objectFit: "cover",
                          display: "block",
                          flex: 1,
                          border: "none",
                          aspectRatio: 16 / 9,
                          maxHeight: "55vh",
                        }}
                        className="content-icon event-details-mainImg"
                        alt=""
                        draggable="false"
                        onContextMenu={(e) => e.preventDefault()}
                        src={
                          eventData[0]?.imageUri
                            ? `${process.env.REACT_APP_API_URL}${eventData[0].imageUri}`
                            : "/noimage.png"
                        }
                        onError={(e) => {
                          if (e.target.src !== "/noimage.png") {
                            e.target.src = "/noimage.png";
                          }
                        }}
                      />
                    </div>

                    <div className="heading-and-supporting-text heading-event">
                      <div className="marker-pin-03-parent">
                        <img
                          className="marker-pin-03-icon"
                          alt=""
                          src="/CalenderEvent2.svg"
                        />
                        <div className="supporting-text-parent">
                          <div className="supporting-text-venue">
                            {formatEventDates()}
                          </div>
                          {eventData[0] && eventData[0].startDate && (
                            <div className="supporting-text1">
                              Doors open at{" "}
                              {dayjs(eventData[0].startDate).format("HH:mm")}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="marker-pin-03-parent">
                        <img
                          className="marker-pin-03-icon"
                          alt=""
                          src="/MapsEvent.svg"
                        />
                        <div className="supporting-text-parent">
                          {/* <div className="supporting-text-venue">
                          {eventData[0]?.venue?.address?.addressLine1 +
                            ", " +
                            eventData[0]?.venue?.address?.city}
                        </div>
                        <div className="supporting-text1">
                          {`${eventData[0]?.venue?.address?.addressLine2}${
                            eventData[0]?.venue?.address?.addressLine2
                              ? ", "
                              : ""
                          }${eventData[0]?.venue?.address?.city}, ${
                            eventData[0]?.venue?.address?.postalCode
                          }`}
                        </div> */}
                          <div className="supporting-text-venue">
                            {`${eventData[0]?.venue?.name}, ${eventData[0]?.venue?.address?.city}`}
                          </div>
                          <div
                            style={{ marginTop: 0 }}
                            className="supporting-text1"
                          >
                            {(eventData[0]?.venue?.address?.addressLine1
                              ? eventData[0]?.venue?.address?.addressLine1
                              : "") +
                              (eventData[0]?.venue?.address?.addressLine2
                                ? ", " +
                                  eventData[0]?.venue?.address?.addressLine2
                                : "")}
                          </div>
                          <div className="supporting-text1">
                            {`${eventData[0]?.venue?.address?.postalCode}, ${eventData[0]?.venue?.address?.city}, ${eventData[0]?.venue?.address?.country}`}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* About */}
                    <div className="heading-and-supporting-text1 heading-event">
                      <div className="heading">About</div>
                      <div className="supporting-text4">
                        {eventData[0]?.description ? (
                          <>
                            {eventData[0]?.description
                              .split("\n\n")
                              .map((text, pIndex) => {
                                if (pIndex === 0) {
                                  // return
                                  return (
                                    <div
                                    key={pIndex}
                                    style={{
                                      lineBreak: 'anywhere',
                                      width: '100%',             // Full width of container
                                      marginBottom: '1em',       // Space between paragraphs
                                      whiteSpace: 'pre-wrap',    // Preserves line breaks and spaces
                                      wordBreak: 'break-word',
                                      marginBottom: 48,
                                      marginTop: '20px',
                                      // maxInlineSize: 24
                                    }}
                                    dangerouslySetInnerHTML={{ __html: text}}
                                  />
                                  );
                                  //                                   <li
                                  //   key={index}
                                  //   dangerouslySetInnerHTML={{ __html: item.trim() }} // Trimming whitespace if any
                                  // />
                                } else {
                                  return (
                                    <ul key={pIndex}>
                                      {text
                                        .split("\n")
                                        .map((item, index) => (
                                          <li style={{
                                            lineBreak: 'anywhere',
                                            width: '100%',             // Full width of container
                                            marginBottom: '1em',       // Space between paragraphs
                                            whiteSpace: 'pre-wrap',    // Preserves line breaks and spaces
                                            wordBreak: 'break-word',
                                            marginBottom: 48,
                                            lineHeight: '28px',
                                            marginTop: '20px',
                                            
                                               // Breaks long words to prevent overflow
                                          }}
                                            key={index}
                                            dangerouslySetInnerHTML={{
                                              __html: item.trim(),
                                            }} // Trimming whitespace if any
                                          />
                                        ))}
                                    </ul>
                                  );
                                }
                              })}
                          </>
                        ) : (
                          "No Data"
                        )}
                      </div>

                      {/* {(eventData[0]?.promoter?.name ||
                      eventData[0]?.promoterName) && ( */}
                      {eventData[0]?.promoterName && (
                        <div className="verified-tick-parent">
                          <img
                            className="marker-pin-03-icon"
                            alt=""
                            src={
                              eventData[0]?.eventUserDetails?.businesses
                                .length > 0
                                ? `${process.env.REACT_APP_API_URL}${
                                    eventData[0]?.eventUserDetails?.businesses[
                                      eventData[0]?.eventUserDetails?.businesses
                                        .length - 1
                                    ]?.imageUri
                                  }`
                                : "/noimage.png"
                            }
                          />
                          <div className="supporting-text6-presentedBy-text">
                            Organised by
                            <div className="supporting-text-for-promter">
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: "var(--Primary-Mid-Blue)",
                                  cursor: "pointer",
                                  textDecoration: "underline",
                                }}
                                // onClick={openPromoterPage}
                                onClick={() =>
                                  openPromoterPage(
                                    eventData[0]?.promoter?.name ??
                                      eventData[0]?.promoterName,
                                    eventData[0]?.promoter?.id ??
                                      eventData[0]?.promoterId
                                  )
                                }
                              >
                                {eventData[0]?.promoter?.name ??
                                  eventData[0]?.promoterName ??
                                  "No Data"}
                              </a>
                            </div>
                          </div>
                        </div>
                      )}

                      {eventData[0]?.ticketRequirements?.kycRequired ===
                        true && (
                        <div className="background-style">
                          <div className="supporting-text4-attendees">
                            All attendees must meet the following requirements:
                          </div>
                          <div className="verified-tick-parent">
                            <img
                              className="marker-pin-03-icon"
                              alt=""
                              src="/idverificationIcon.svg"
                            />
                            <div className="supporting-text6-id-verify">
                              ID Verification
                            </div>
                          </div>

                          <div className="verified-tick-parent">
                            <img
                              className="marker-pin-03-icon"
                              alt=""
                              src="/calenderIconKYC.svg"
                            />
                            <div className="supporting-text6-age">
                              {eventData[0].ticketRequirements
                                .kycMinimumAgeLimit || "21"}
                              + years old
                            </div>
                          </div>
                        </div>
                      )}

                      {/* <div className="heading-and-supporting-text-child" /> */}
                    </div>
                    {/* Venue */}
                    <div className="heading-and-supporting-text boxTop">
                      <div className="heading">Venue</div>
                      <div className="marker-pin-03-parent addreshBox">
                        <img
                          className="marker-pin-03-icon"
                          alt=""
                          src="/MapsEvent.svg"
                        />
                        <div className="supporting-text-parent">
                          <div className="supporting-text-venue">
                            {`${eventData[0]?.venue?.name}, ${eventData[0]?.venue?.address?.city}`}
                          </div>
                          <div
                            style={{ marginTop: 0 }}
                            className="supporting-text1"
                          >
                            {(eventData[0]?.venue?.address?.addressLine1
                              ? eventData[0]?.venue?.address?.addressLine1
                              : "") +
                              (eventData[0]?.venue?.address?.addressLine2
                                ? ", " +
                                  eventData[0]?.venue?.address?.addressLine2
                                : "")}
                          </div>
                          <div className="supporting-text1">
                            {`${eventData[0]?.venue?.address?.postalCode}, ${eventData[0]?.venue?.address?.city}, ${eventData[0]?.venue?.address?.country}`}
                          </div>
                        </div>
                      </div>
                      {/* <iframe
                      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2491.243621698168!2d${
                        eventData[0]?.venue?.address?.longitude ?? "-0.1149"
                      }!3d${
                        eventData[0]?.venue?.address?.latitude ?? "51.4652"
                      }!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876045126f8939f%3A0x62a8f352fe9d9e53!2sO2%20Academy%20Brixton!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid`}
                      width="100%"
                      height="288px"
                      frameBorder="0"
                      allowFullScreen=""
                      aria-hidden="false"
                      tabIndex="0"
                      className="custom-iframe"
                    /> */}
                      {isLoaded && (
                        <div
                          className="custom-iframe"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            height: "288px",
                            tabIndex: "0px",
                          }}
                        >
                          <GoogleMap
                            mapContainerStyle={{ flex: 1, borderRadius: 4 }}
                            mapContainerClassName="map-container"
                            center={
                              {
                                lat: eventData[0]?.venue?.address?.latitude,
                                lng: eventData[0]?.venue?.address?.longitude,
                              } || { lat: 5, lng: 5 }
                            }
                            zoom={15}
                            defaultCenter={{
                              lat: eventData[0]?.venue?.address?.latitude,
                              lng: eventData[0]?.venue?.address?.longitude,
                            }}
                          >
                            <Marker
                              position={{
                                lat: eventData[0]?.venue?.address?.latitude,
                                lng: eventData[0]?.venue?.address?.longitude,
                              }}
                            >
                              {eventData[0]?.venue?.address?.addressLine1 && (
                                <InfoWindow
                                  style={{ width: "100px", height: "15px" }}
                                  position={{
                                    lat: eventData[0]?.venue?.address?.latitude,
                                    lng: eventData[0]?.venue?.address
                                      ?.longitude,
                                  }}
                                  options={{
                                    disableAutoPan: true,
                                    pixelOffset: new window.google.maps.Size(
                                      0,
                                      -44
                                    ),
                                  }}
                                >
                                  <div
                                    style={{ marginTop: 12 }}
                                    className="supporting-text6-id-verify"
                                  >
                                    {eventData[0]?.venue?.address?.addressLine1}
                                  </div>
                                </InfoWindow>
                              )}
                            </Marker>
                          </GoogleMap>
                        </div>
                      )}

                      {eventData[0] && eventData[0].startDate && (
                        <div
                          style={{ marginTop: "40px" }}
                          className="clock-parent "
                        >
                          <img
                            className="door-open-icon"
                            alt=""
                            src="/doorsOpen.svg"
                          />
                          <div className="supporting-text6 ">
                            Doors open at{" "}
                            {dayjs(eventData[0].startDate).format("HH:mm")}
                          </div>
                        </div>
                      )}

                      {/* {eventData[0]?.venue?.capacity && ( */}
                      {/* <div className="clock-parent">
                      <img
                        className="door-open-icon"
                        alt=""
                        src="/Social.svg"
                      />
                      <div className="supporting-text6">
                        {eventData[0].venue.capacity} capacity
                      </div>
                    </div> */}
                      {/* )} */}

                      {/* {noRefundsPolicy && ( */}
                      {/* {eventData[0].refundsAllowed !== true && ( */}
                      <div className="clock-parent">
                        <img
                          className="door-open-icon"
                          alt="No refunds icon"
                          src="/noRefunds.svg"
                        />

                        {eventData[0].refundsAllowed !== true ? (
                          <div className="supporting-text6">No refunds</div>
                        ) : (
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              openPromoterPage(
                                eventData[0]?.promoter?.name ??
                                  eventData[0]?.promoterName,
                                eventData[0]?.promoter?.id ??
                                  eventData[0]?.promoterId
                              )
                            }
                          >
                            <div className="supporting-text6">
                              Contact the event organiser for refund requests
                            </div>{" "}
                          </a>
                        )}
                      </div>
                      {/* )} */}

                      {/* )} */}

                      {/* <div className="heading-and-supporting-text-child" /> */}
                    </div>
                    {/* AppDetails */}
                    <div className="content1">
                      <div className="appDetail-container">
                        <div className="appDetail-left">
                          <img
                            class="mainLogoEventDetails"
                            alt=""
                            src="/icon1.svg"
                          />
                          <div className="heading2-download">
                            Get started with the
                            <span
                              style={{
                                color: "var(--Primary-Mid-Blue)",
                              }}
                            >
                              {" "}
                              Twotixx app
                            </span>
                          </div>
                          <div className="clock-parent">
                            <img
                              className="check-pin-icon"
                              alt=""
                              src="/businessAndPayment.svg"
                            />
                            <div className="supporting-text-wrapper">
                              <div className="supporting-text6">
                                Access tickets
                              </div>
                            </div>
                          </div>
                          <div className="clock-parent">
                            <img
                              className="check-pin-icon"
                              alt=""
                              src="/manageTickets.svg"
                            />
                            <div className="supporting-text6">
                              Manage tickets
                            </div>
                          </div>
                          <div className="clock-parent">
                            <img
                              className="check-pin-icon"
                              alt=""
                              src="/checkEvents.svg"
                            />
                            <div className="supporting-text6">
                              Check-in at event
                            </div>
                          </div>

                          <div className="app-download">
                            <CommonButton
                              text="Download Twotixx"
                              onClick={handleTowtixDownload}
                            />
                          </div>
                        </div>

                        <div className="appDetail-right">
                          <img
                            src="/iPhone-new22.png"
                            alt="iPhone-new"
                            className="img-fluid iPhone-mobile-desktop eventApp"
                          />
                        </div>
                        <img
                          src="/iPhone-new22.png"
                          alt="iPhonePro-mobile"
                          className="img-fluid iPhone-mobile-mobile event-app-mobile"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="rht-block-home">
                  <div className="rht-block-img">
                    <img
                      className="content-icon event-details-mainImg"
                      alt=""
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                      src={
                        eventData[0]?.imageUri
                          ? `${process.env.REACT_APP_API_URL}${eventData[0].imageUri}`
                          : "/noimage.png"
                      }
                      onError={(e) => {
                        if (e.target.src !== "/noimage.png") {
                          e.target.src = "/noimage.png";
                        }
                      }}
                    />
                  </div>

                  <div className="content2 select-tickets-responsive">
                    <div className="heading-and-supporting-text4">
                      <div className="supporting-text15-from">tickets from</div>
                      <div className="heading-and-badge">
                        <div className="heading2">
                          {eventData[0]?.ticketPricesFrom?.value !==
                          eventData[0]?.ticketPricesFrom?.valueNet ? (
                            <>
                              <span className="ticketprice">
                                {
                                  eventData[0]?.ticketPricesFrom?.currency
                                    ?.symbol
                                }
                                {eventData[0]?.ticketPricesFrom?.valueNet.toFixed(
                                  2
                                )}
                              </span>
                              <span className="ticketprice-linethrough">
                                {
                                  eventData[0]?.ticketPricesFrom?.currency
                                    ?.symbol
                                }
                                {eventData[0]?.ticketPricesFrom?.value.toFixed(
                                  2
                                )}
                              </span>
                            </>
                          ) : (
                            <span className="ticketprice">
                              {eventData[0]?.currency?.symbol}
                              {eventData[0]?.ticketPricesFrom?.value.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <CommonButton
                      fontFamily="var(--global-font-family)"
                      text="Select tickets"
                      onClick={handleOpenModal}
                    />
                  </div>
                </div>
              </div>
            </div>

            {isModalOpen && (
              <Modal onClose={handleCloseModal}>
                <CustomStepper eventData={eventData} />
              </Modal>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </DocumentMeta>
  );
};

export default EventDetails;
