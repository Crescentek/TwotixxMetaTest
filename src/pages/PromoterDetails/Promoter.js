import React, { useState, useRef, useEffect, forwardRef, useMemo } from "react";
import "./Promoter.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Text from "../../components/Common/Text";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { getEventCities, getEventOverview } from "../../services/api";
import Loader from "../../components/Common/Loader";
import { getBusinessDetailes } from "../../services/api";
import { useParams } from "react-router-dom";
import { getPromotersEvents } from "../../services/api";

const formatDate = (date) => {
  if (!date) return "";

  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

function Promoter() {
  const { id } = useParams();
  console.log("id2121", id);

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
  // const nameWithHyphenss = extractName(id);

  const promId = id.split("-").pop();

  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({
    minPrice: null,
    maxPrice: null,
  });
  const [businessData, setBusinessData] = useState();
  const [priceValue, setPriceValue] = useState([null, null]);
  const [priceSelected, setPriceSelected] = useState(false);
  const [eventName, setEventName] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [countriesAndCities, setCountriesAndCities] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [upComingEventData, setUpComingEventData] = useState([]);

  console.log("businessData", businessData);

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const fullUrl = urlParams.get('url');
  //   if (fullUrl) {
  //     const domain = fullUrl.replace('http://localhost:3000/promoter/', '');
  //     setBusinessData({ webSiteURL: domain });
  //   }
  // }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await getEventCities();
        console.log("API response:", res?.response);
        if (res && res.status) {
          const formattedData = res.response.reduce((acc, current) => {
            acc[current.name] = current.cities.map((city) => city.name);
            return acc;
          }, {});
          setCountriesAndCities(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch cities", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      setIsModalOpen(false);
    }
  }, [startDate, endDate]);

  const navigate = useNavigate();

  const handleTicketSection = (eventName, eventId) => {
    const formattedEventName = eventName
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    navigate(`/event-details/${formattedEventName}-${eventId}`);

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, setIsModalOpen]);

  const fetchEventOverview = async () => {
    let payload = {
      categoryName: "",
      type: selectedCategory === "All" ? "" : selectedCategory || "",
      city: selectedCity === eventName ? "" : selectedCity || "",
      dateRange:
        startDate && endDate
          ? {
              start: formatDate(startDate),
              end: formatDate(endDate),
            }
          : {},
      priceRange:
        priceSelected && priceValue
          ? {
              from: priceValue[0],
              to: priceValue[1],
            }
          : {},
    };

    console.log("Sending payload to getEventOverview:", payload);

    try {
      const response = await getEventOverview(payload.categoryName, payload);
      console.log(
        "Data received from getEventOverviewMain:",
        response?.response
      );
      setIsLoading(false);
      if (response?.response) {
        const { events, categories, priceRange } = response.response;
        setEvents(
          events.map((event) => ({
            id: event.id,
            imageUrl: `${process.env.REACT_APP_API_URL}${event.imageUri}`,
            name: event.name,
            date: new Date(event.startDate),
            price: event?.price?.valueAsString,
            location: event.location,
            category: event.category,
          }))
        );
      }
    } catch (error) {
      console.error("Failed to fetch event overview:", error);
    }
  };

  console.log("events", events);

  useEffect(() => {
    const fetchPromotersEvents = async () => {
      try {
        const params = {
          EventStatus: "All",
          PromoterId: promId,
          // PromoterId: id,
          IsPublished: true,
        };
        const res = await getPromotersEvents(params);
        console.log("API response22222:", res?.response[0].promoterName);
        const Data = res.response[0].promoterName.replace(/[\s-]+/g, "-");

        if (nameWithHyphens === Data) {
          setUpComingEventData(res?.response);
        }
      } catch (error) {
        console.error("Error fetching promoters events:", error);
      }
    };

    fetchPromotersEvents();
  }, []);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const result = await getBusinessDetailes(promId);

        console.log("eventDataResult", result.response);
        if (result.status) {
          const finalData = result.response.name.replace(/[\s-]+/g, "-");
          console.log("finalData", finalData);
          if (nameWithHyphens === finalData) {
            setBusinessData(result.response);
          }
        } else {
          setErrorMessage(result.message || "Failed to fetch event details");
        }
      } catch (err) {
        setErrorMessage("Error fetching data");
      } finally {
        setDataFetched(true);
      }
    };

    fetchBusinessData();
  }, []);

  console.log("aaaaaaaaa", businessData);
  useEffect(() => {
    fetchEventOverview();
    console.log("selectedCategory*****", selectedCategory);
    console.log("selectedCity******", selectedCity);
    console.log("startDate******", startDate);
    console.log("endDate******", endDate);
    console.log("priceValue*****", priceValue);
    console.log("eventName*****", eventName);
  }, [
    selectedCategory,
    selectedCity,
    startDate,
    endDate,
    priceValue,
    eventName,
  ]);

  useEffect(() => {
    console.log(
      "qqqqqq",
      `${process.env.REACT_APP_API_URL}${businessData?.imageUri}`
    );
  }, [businessData]);
  const filteredEvents = useMemo(() => {
    const startOfStartDate = startDate
      ? new Date(startDate).setHours(0, 0, 0, 0)
      : -Infinity;
    const endOfEndDate = endDate
      ? new Date(endDate).setHours(23, 59, 59, 999)
      : Infinity;

    return events.filter((event) => {
      const eventDate = new Date(event.date).setHours(0, 0, 0, 0);
      const isInRange =
        eventDate >= startOfStartDate && eventDate <= endOfEndDate;
      const eventPrice = parseFloat(event?.price?.replace(/[^\d.]/g, ""));
      const isPriceInRange =
        eventPrice >= priceValue[0] && eventPrice <= priceValue[1];
      const categoryMatch =
        !selectedCategory || event.category === selectedCategory;
      return isInRange && isPriceInRange && categoryMatch;
    });
  }, [events, startDate, endDate, priceValue, selectedCategory]);

  useEffect(() => {
    if (priceRange.minPrice !== null && priceRange.maxPrice !== null) {
      setPriceValue([priceRange.minPrice, priceRange.maxPrice]);
    }
  }, [priceRange]);

  if (isLoading) {
    return <Loader />;
  }

  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date?.toLocaleDateString("en-US", options);
  };

  return (
    <div className="terms-service-main">
      {/* <Helmet>
        <title>
          {"Promoter Page | Boost Your Events with Our Expert Promoter Services"}
        </title>
        <meta property="og:image" content={businessData?.imageUri
          ? `${process.env.REACT_APP_API_URL}${businessData.imageUri}`
          : "/noimage.png"} />
        <meta
          property="og:image:secure_url"
          content={businessData?.imageUri
            ? `${process.env.REACT_APP_API_URL}${businessData.imageUri}`
            : "/noimage.png"}
        />
      </Helmet> */}
      <Navbar />
      <div className="promoterTopCont">
        <div className="TopLogoSocialCont">
          <div className="logo-header">
            <div className="logo-container">
              <img
                className="company-logo"
                // src={businessData.imageUri}
                src={
                  businessData?.imageUri
                    ? `${process.env.REACT_APP_API_URL}${businessData.imageUri}`
                    : "/noimage.png"
                }
                alt="Company Logo"
              />
            </div>
            <div className="company-info">
              <h1 className="company-name">
                {businessData?.name ? businessData?.name : "No name"}
              </h1>
            </div>
          </div>

          <div className="socialCont">
            {businessData?.socialMedia?.twitter && (
              <a
                className="socialIconA"
                href={`http://${businessData?.socialMedia?.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="socialIconImg"
                  src="/social-icon1.svg"
                  alt="Social Icon"
                />
              </a>
            )}
            {businessData?.socialMedia?.instagram && (
              <a
                className="socialIconA"
                href={`http://${businessData?.socialMedia?.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="socialIconImg"
                  src="/social-icon2.svg"
                  alt="Social Icon"
                />
              </a>
            )}
            {businessData?.socialMedia?.facebook && (
              <a
                className="socialIconA"
                href={`http://${businessData?.socialMedia?.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="socialIconImg"
                  src="/social-icon3.svg"
                  alt="Social Icon"
                />
              </a>
            )}
            {businessData?.socialMedia?.linkedIn && (
              <a
                className="socialIconA"
                href={`http://${businessData?.socialMedia?.linkedIn}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="socialIconImg"
                  src="/social-icon4.svg"
                  alt="Social Icon"
                />
              </a>
            )}
          </div>
        </div>
        <div className="contact-info-container">
        {businessData?.emailAddress && <div className="contactContainer">
            <img
              className="contactIcon"
              src="/contact-icon-email.svg"
              alt="Email Icon"
            />
            <div className="contactInfo">
              <div className="contact-label">Email</div>
              <div className="contact-text">
                {/* <a className="contactA" href="mailto:testemail@email.com"> */}
                {/* <a className="contactA" href={businessData?.emailAddress ? `http://${businessData?.emailAddress}` : ""}> */}
                <a
                  className="contactA"
                  href={
                    businessData?.emailAddress
                      ? `mailto:${businessData?.emailAddress}`
                      : "#"
                  }
                >
                  {businessData?.emailAddress
                    ? businessData?.emailAddress
                    : "-"}
                </a>
              </div>
            </div>
          </div>}

          {businessData?.phone?.length > 3 && <div className="contactContainer">
            <img
              className="contactIcon"
              src="/contact-icon-phone.svg"
              alt="Phone Icon"
            />
            <div className="contactInfo">
              <div className="contact-label">Contact number</div>
              <div className="contact-text">
                {/* <a className="contactA" href="tel:+44000 000000"> */}
                <a
                  className="contactA"
                  href={
                    businessData?.phone ? `tel:+${businessData?.phone}` : "#"
                  }
                >
                  {businessData?.phone ? `+${businessData?.phone}` : "-"}
                </a>
              </div>
            </div>
          </div>}

         {businessData?.webSiteURL && <div className="contactContainer">
            <img
              className="contactIcon"
              src="/contact-icon-website.svg"
              alt="Website Icon"
            />
            <div className="contactInfo">
              <div className="contact-label">Website</div>
              <div className="contact-text">
                <a
                  className="contactA"
                  href={
                    businessData?.webSiteURL
                      ? `http://${businessData.webSiteURL}`
                      : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {businessData?.webSiteURL ? businessData.webSiteURL : "-"}
                </a>
              </div>
            </div>
          </div>}
        </div>
      </div>

      <section className="section tending-events-sec tending-events-listing-sec promoterBodyCont">
        <div className="tending-events-title">
          <h2>Upcoming events</h2>
        </div>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            overflowX: "auto",
            padding: "0",
            textAlign: "left",
            width: "100%",
            gap: "10px",
            ":hover": { boxShadow: "inherit" },
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {upComingEventData.length > 0 ? (
            upComingEventData.map(
              (event) => (
                console.log("event123", event),
                (
                  <Paper
                    key={event.id}
                    elevation={3}
                    sx={{
                      flex: "none",
                      minWidth: "calc(25% - 20px)",
                      margin: "10px",
                      overflow: "hidden",
                      cursor: "pointer",
                      boxShadow: "inherit",
                      padding: "var(--gap-5xl) 0 0",
                    }}
                    onClick={() => handleTicketSection(event.name, event.id)}
                  >
                    <img
                      style={{
                        objectFit: "cover",
                        display: "block",
                        flex: 1,
                        border: "none",
                        aspectRatio: 16 / 9,
                        maxHeight: "55vh",
                      }}
                      src={
                        event?.imageUri
                          ? `${process.env.REACT_APP_API_URL}${event.imageUri}`
                          : "/noimage.png"
                      }
                      // src={event.imageUri}
                      alt={event.name}
                      className="event-list-img"
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/noimage.png";
                      }}
                    />

                    <Box sx={{ padding: "10px" }}>
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
                        {event?.name ? event?.name : ""}
                      </Typography>

                      <Text variant={"m300"} color={"var(--body-title)"}>
                        {`${
                          event?.startDate
                            ? new Date(event.startDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )
                            : "-"
                        } • ${`${event?.venue?.name}, ${event?.venue?.address?.city}`}`}
                      </Text>

                      {/* <Typography variant="body" color="text.secondary">
                        <span
                          className="date"
                          style={{
                            background:
                              "var(--twotixx-notifications-light-information-blue)",
                            display: "inline-block",
                            fontFamily: "var(--global-font-family)",
                            fontSize: "var(--body-md-size)",
                            fontWeight: "var(--font-w-400)",
                            color: "var(--Primary-Mid-Blue)",
                            padding: "0 var(--padding-5xs)",
                            borderRadius: "var(--br-9xs)",
                            margin: "var(--gap-5xs) 0 0",
                          }}
                        >
                          {event?.startDate ? new Date(event.startDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          }) : "-"}

                        </span>{" "}
                        <span
                          style={{
                            background:
                              "var(--twotixx-notifications-light-information-blue)",
                            display: "inline-block",
                            fontFamily: "var(--global-font-family)",
                            fontSize: "var(--body-md-size)",
                            fontWeight: "var(--font-w-400)",
                            color: "var(--Primary-Mid-Blue)",
                            padding: "0 var(--padding-5xs)",
                            borderRadius: "var(--br-9xs)",
                            margin: "var(--gap-5xs) 0 0",
                          }}
                        >
                          {`${event?.venue?.name}, ${event?.venue?.address?.city}`}

                        </span>
                      </Typography> */}
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
                        {`from  ${event.currency.symbol}${event?.ticketPricesFrom?.valueAsString}`}
                      </Typography>
                    </Box>
                  </Paper>
                )
              )
            )
          ) : (
            <Typography variant="subtitle1" style={{ margin: "auto" }}>
              No events found for the selected date range.
            </Typography>
          )}
        </Box>
      </section>

      <Footer />
    </div>
  );
}

export default Promoter;
