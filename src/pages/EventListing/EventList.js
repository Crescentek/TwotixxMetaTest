import React, { useState, useRef, useEffect, forwardRef, useMemo } from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import "./EventList.css";
import "./CustomDatePicker.css";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CommonButton from "../../components/Common/CommonButton";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import Text from "../../components/Common/Text";
import { ReactComponent as LocationIconBlue } from "../../assets/svgs/locationIiconBlue.svg";
import { ReactComponent as LocationIcon } from "../../assets/svgs/location-icon.svg";
import { ReactComponent as DateIcon } from "../../assets/svgs/date-icon.svg";
import { ReactComponent as MusicIcon } from "../../assets/svgs/music-icon.svg";
import { ReactComponent as SportsIcon } from "../../assets/svgs/sports-icon.svg";
import { ReactComponent as CryptoIcon } from "../../assets/svgs/crypto-icon.svg";
import { ReactComponent as ChevronRight } from "../../assets/svgs/chevron-right.svg";
import { ReactComponent as ChevronLeft } from "../../assets/svgs/chevron-left.svg";
import { ReactComponent as SearchIcon } from "../../assets/svgs/SearchIcon.svg";
import { ReactComponent as CalenderIconWhite } from "../../assets/svgs/calenderIconWhite.svg";
import { ReactComponent as MusicWhiteIcon } from "../../assets/svgs/MusicWhiteIcon.svg";
import { ReactComponent as SportWhiteIcon } from "../../assets/svgs/SportWhiteIcon.svg";
import { ReactComponent as XRPWhiteIcon } from "../../assets/svgs/XRPWhiteIcon.svg";
import {
  Dialog,
  DialogContent,
  Slider,
  Snackbar,
  SnackbarContent,
  TextField,
} from "@mui/material";
import {
  getEventCities,
  getEventOverview,
  getEventsNearLocation,
  getEventCategories,
} from "../../services/api";
import Loader from "../../components/Common/Loader";
import { setDefaltCountry } from "../../reducers/eventDataReducer";

const PriceInput = styled(TextField)({
  "& .MuiInputBase-root": {
    margin: "0 8px",
    "& input": {
      fontFamily: "var(--global-font-family)",
      fontSize: "16px",
      fontWeight: "var(--font-w-400)",
      lineHeight: "24px",
      letterSpacing: "0em",
      textAlign: "left",
      width: "128px",
      height: "44px",
      borderRadius: "8px",
      backgroundColor: "var(--monochrome-white)",
    },
  },
});

const PriceSlider = styled(Slider)({
  color: "#blue",
  height: 8,
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "var(--monochrome-white)",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active": {
      boxShadow: "inherit",
    },
  },
  "& .MuiSlider-track": {
    height: 8,
    borderRadius: 4,
  },
  "& .MuiSlider-rail": {
    color: "#d8d8d8",
    opacity: 1,
    height: 8,
    borderRadius: 4,
  },
});

const formatDate = (date) => {
  if (!date) return "";

  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const formatDateNew = (date) => {
  if (!date) return "";
  const dateObjStart = new Date(date);
  const dayStart = dateObjStart.getDate().toString().padStart(2, "0");
  const monthStart = (dateObjStart.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const yearStart = dateObjStart.getFullYear();
  return `${yearStart}-${monthStart}-${dayStart}`;
};

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className="custom-input" onClick={onClick} ref={ref}>
    {value}
  </button>
));

const CustomHeader = ({ date, changeMonth, startDate, endDate, onClick }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="custom-header">
      <div className="navigation-container">
        <button onClick={() => changeMonth(date.getMonth() - 1)}>
          <ChevronLeft />
        </button>
        <span>
          {months[date.getMonth()]} {date.getFullYear()}
        </span>
        <button onClick={() => changeMonth(date.getMonth() + 1)}>
          <ChevronRight />
        </button>
      </div>
      <div className="date-inputs">
        <input
          type="text"
          value={startDate ? formatDate(startDate) : "Select start day"}
          readOnly
          onClick={onClick}
        />
        <small className="dateSeparate">_</small>
        <input
          type="text"
          value={endDate ? formatDate(endDate) : "Select end day"}
          readOnly
          onClick={onClick}
        />
      </div>
    </div>
  );
};
function EventList() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({
    minPrice: null,
    maxPrice: null,
  });
  const [openPrice, setOpenPrice] = useState(false);
  const [priceValue, setPriceValue] = useState([null, null]);
  const [priceSelected, setPriceSelected] = useState(false);
  const [eventName, setEventName] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedCity, setSelectedCity] = useState("All EVENTS");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const [countriesAndCities, setCountriesAndCities] = useState({});
  const [eventCategories, setEventCategories] = useState([]);

  const dialogPaperStyle = useMemo(() => {
    if (isXSmall) {
      return {
        width: "93%",
        maxWidth: "none",
        position: "absolute",
        top: "23%",
        left: "3.5%",
        right: "3.5%",
        transform: "translate(-10%, -10%)",
      };
    } else if (isSmall) {
      return {
        width: "93%",
        position: "absolute",
        top: "23%",
        left: "3.5%",
        right: "3.5%",
        transform: "translate(-10%, -10%)",
      };
    } else if (isMedium) {
      return {
        width: "45%",
        position: "absolute",
        top: "23%",
        left: "5%",
        transform: "translate(-10%, -10%)",
      };
    } else {
      return {
        width: "380px",
        maxWidth: "380px",
        position: "absolute",
        top: "200px",
        left: "56px",
        transform: "translate(-10%, -10%)",
      };
    }
  }, [isXSmall, isSmall, isMedium]);

  const dialogPriceStyle = useMemo(() => {
    if (isXSmall) {
      return {
        width: "100%",
        position: "absolute",
        top: "20%",
        left: "0%",
        right: "0%",
        transform: "translate(0%, -10%)",
      };
    } else if (isSmall) {
      return {
        width: "93%",
        position: "absolute",
        top: "20%",
        left: "3.5%",
        right: "3.5%",
        transform: "translate(-10%, -10%)",
      };
    } else if (isMedium) {
      return {
        width: "45%",
        position: "absolute",
        top: "20%",
        left: "5%",
        transform: "translate(-10%, -10%)",
      };
    } else {
      return {
        width: "16.7vw",
        maxWidth: "none",
        position: "absolute",
        top: "170px",
        left: "3%",
        transform: "translate(-10%, -10%)",
      };
    }
  }, [isXSmall, isSmall, isMedium]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await getEventCities();
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

  console.log("countriesAndCities", countriesAndCities);

  const handleCitySelection = (city) => {
    setSelectedCity(city);
    setSelectedCategory("All");
    setShowDropdown(false);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  const filteredCities = Object.entries(countriesAndCities).reduce(
    (acc, [country, cities]) => {
      const filteredCities = cities.filter((city) =>
        city.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredCities.length > 0) {
        acc[country] = filteredCities;
      }
      return acc;
    },
    {}
  );

  // const fetchIP = async () => {
  //   try {
  //     const response = await fetch("https://api.ipify.org?format=json");
  //     const data = await response.json();
  //     fetchEventsNearLocation(data.ip);
  //   } catch (error) {
  //     setEventName("London ");
  //     setSelectedCity("London");
  //     console.error("Failed to fetch IP address:", error);
  //   }
  // };

  useEffect(() => {
    // fetchIP();

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

  const setStartDate = (date) => {
    setSelectedCategory("All");
    setDateRange([date, endDate]);
  };

  const setEndDate = (date) => {
    setSelectedCategory("All");
    setDateRange([startDate, date]);
  };

  const fetchEventsNearLocation = async (ipAddress) => {
    try {
      const eventsNearLocation = await getEventsNearLocation(ipAddress);
      console.log(
        "eventsNearLocation",
        eventsNearLocation?.response?.isIPBasedEvent
      );
      if (
        eventsNearLocation?.response?.isIPBasedEvent === true &&
        eventsNearLocation?.response?.events[0]?.venue?.address?.city
      ) {
        dispatch(
          setDefaltCountry(eventsNearLocation?.response?.countryDetails)
        );
        setEventName(eventsNearLocation?.response?.city + " ");
        setSelectedCity(eventsNearLocation?.response?.city);
        // setEventName(eventsNearLocation?.response?.events[0]?.venue?.address?.city + ' ');
        // setSelectedCity(eventsNearLocation?.response?.events[0]?.venue?.address?.city);
      } else {
        setEventName("London ");
        setSelectedCity("London");
      }
    } catch (error) {
      console.error("Error fetching events near location:", error);
    }
  };

  const handleCloseSnackbar = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (startDate && endDate) {
      setIsModalOpen(false);
    }
  }, [startDate, endDate]);

  const handleCalendarOpen = () => {
    setIsModalOpen(true);
  };

  const handleCalendarClose = () => {
    setIsModalOpen(false);
  };

  const handlePriceClickOpen = () => {
    setOpenPrice(true);
  };

  const handlePriceClose = () => {
    setOpenPrice(false);
  };

  const handleSliderChange = (event, newValue) => {
    setPriceValue(newValue);
    setPriceSelected(true);
  };

  const handleMinPriceBlur = (e) => {
    const minPrice = +e.target.value.replace(/[^\d.]/g, "");
    if (minPrice >= priceValue[1] || minPrice < priceRange.minPrice) {
      toast.error(
        "Minimum price must be less than the maximum price and within the allowed range."
      );
    }
  };

  const handleMaxPriceBlur = (e) => {
    const maxPrice = +e.target.value.replace(/[^\d.]/g, "");
    if (maxPrice <= priceValue[0] || maxPrice > priceRange.maxPrice) {
      setPriceValue([priceRange.minPrice, priceRange.maxPrice]);
      toast.error(
        "Maximum price must be greater than the minimum price and within the allowed range."
      );
    }
  };

  const navigate = useNavigate();
  const handleTicketSection = (eventName, eventId) => {
    const formattedEventName = eventName
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    console.log("formattedEventName", formattedEventName);
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
    console.log("startDate, endDate", startDate, endDate);

    let payload = {
      categoryName: "",
      type: selectedCategory === "All" ? "" : selectedCategory,

      city: selectedCity === "All EVENTS" ? "" : selectedCity === eventName ? "" : selectedCity || "",
      // dateRange: startDate
      //   ? {
      //       start: formatDate(startDate),
      //       end: formatDate(endDate),
      //     }
      //   : {},
      dateRange:
        startDate && endDate
          ? {
              from: formatDateNew(startDate),
              to: formatDateNew(endDate),
            }
          : startDate && !endDate
          ? {
              from: formatDateNew(startDate),
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

    const response = await getEventOverview(payload.categoryName, payload);
    setIsLoading(false);

    if (response?.response) {
      const { events, categories, priceRange } = response.response;
      console.log("ssssssssa", events);
      console.log("response?.response", response?.response);
      setEvents(
        events?.map((event) => ({
          id: event?.id,
          imageUrl: `${process.env.REACT_APP_API_URL}${event?.imageUri}`,
          name: event?.name,
          date: new Date(event?.startDate),
          price:
            `${event?.currency?.symbol || ""}${event?.price?.valueAsString}` ||
            "",
          location:
            `${event?.venue?.name}, ${event?.venue?.address?.city}` || "",
          category: event?.category,
          category: event?.category,
        }))
      );
      // setCategories(["All", ...categories]);
      // setEventCategories(["All", ...(eventCategories || [])]);

      setPriceRange({
        minPrice: priceRange?.from,
        maxPrice: priceRange?.to,
      });
    } else {
      setEvents([]);
      console.error("Failed to fetch event overview: Unexpected response");
    }
  };

  const fetchEventCategories = async () => {
    let payload = {
      city: selectedCity === 'All EVENTS' ? "" : selectedCity === eventName ? "" : selectedCity || "",
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

    try {
      const result = await getEventCategories(payload);
      const categoriesNames = result.response.map(({ name }) => name);
      setEventCategories(["All", ...categoriesNames]);
    } catch (error) {
      setEventCategories(["All"]);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    selectedCity !== "" && fetchEventOverview();
  }, [selectedCategory, selectedCity, startDate, endDate, eventName]);

  useEffect(() => {
    fetchEventCategories();
  }, [selectedCity, startDate, endDate]);

  const filteredEvents = useMemo(() => {
    return events?.filter((event) => {
      const eventDate = new Date(event.date).setHours(0, 0, 0, 0);
      const startOfStartDate = startDate
        ? new Date(startDate).setHours(0, 0, 0, 0)
        : -Infinity;
      const endOfEndDate = endDate
        ? new Date(endDate).setHours(23, 59, 59, 999)
        : Infinity;
      const isInRange =
        eventDate >= startOfStartDate && eventDate <= endOfEndDate;
      const eventPrice = parseFloat(event?.price?.replace(/[^\d.-]/g, ""));

      const isPriceInRange =
        priceValue[0] === 0 && priceValue[1] === 0
          ? false
          : (!priceValue[0] && !priceValue[1]) ||
            (!priceValue[0] && eventPrice <= priceValue[1]) ||
            (!priceValue[1] && eventPrice >= priceValue[0]) ||
            (eventPrice >= priceValue[0] && eventPrice <= priceValue[1]);

      return isInRange && isPriceInRange;
    });
  }, [events, startDate, endDate, priceValue]);

  console.log("filteredEvents", filteredEvents, priceValue, startDate, endDate);

  useEffect(() => {
    if (priceRange.minPrice !== null && priceRange.maxPrice !== null) {
      setPriceValue([
        priceRange.minPrice ? priceRange.minPrice : 0,
        priceRange.maxPrice ? priceRange.maxPrice : 0,
      ]);
    }
  }, [priceRange]);

  const resetFilters = () => {
    setDateRange([null, null]);
    setPriceValue([priceRange.minPrice, priceRange.maxPrice]);
    setSelectedCategory("All");
    setSelectedCity("");
    setPriceSelected(false);
    // fetchIP();
  };
  const handleCategoryClick = (category) => {
    if (category === "All") {
      setSelectedCategory("All");
    } else {
      setSelectedCategory(category);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="terms-service-main">
      <Navbar />
      <section className="section newTop-btnsArea">
        <div className="container">
          <ul className="newTop-btns-list newTop-btns-lg">
            <li>
              <CommonButton 
                style={{ padding: 12 }}
                text={selectedCity || eventName}
                icon={showDropdown ? <LocationIconBlue /> : <LocationIcon />}
                height="var(--display-lg-size)"
                backgroundColor={
                  showDropdown ? "var(--surface-primary-light)" : undefined
                }
                borderColor={
                  showDropdown ? "var(--surface-disabled)" : undefined
                }
                fontColor={showDropdown ? "var(--Primary-Mid-Blue)" : undefined}
                fontWeight="var(--font-w-500)"
                onClick={() => setShowDropdown(!showDropdown)}
              />

              {showDropdown && (
                <>
                  <div
                    className="backdrop"
                    onClick={() => setShowDropdown(false)}
                  ></div>
                  <div className="dropdown" ref={dropdownRef}>
                    <ul>
                      <li>
                        <div className="search-container">
                          <SearchIcon className="search-icon" />
                          <input
                            type="text"
                            placeholder="Find a city"
                            className="search-input"
                            value={searchQuery}
                            onChange={handleInputChange}
                          />
                          {searchQuery && (
                            <div onClick={handleClear}>
                              <img
                                src="/x-close.svg"
                                className="citySearchClose"
                                draggable="false"
                              />
                            </div>
                          )}
                        </div>
                      </li>
                      {Object.entries(filteredCities).length === 0 && (
                        <li className="not-found">No cities found</li>
                      )}
                       <li key={`All EVENTS-1`}
                                className={`city-name ${
                                  selectedCity === 'All EVENTS' ? "selected" : ""
                                }`} style={{marginTop: -12}} onClick={() => handleCitySelection("All EVENTS")}>All EVENTS</li>
                      {Object.entries(filteredCities).map(
                        ([country, cities]) => (
                          <React.Fragment key={country}>
                            {country && (
                              <li
                                style={{ fontWeight: "600" }}
                                className="country-header"
                              >
                                {country}
                              </li>
                            )}
                            {cities.map((city, index) => (
                              <li
                                key={`${city}-${index}`}
                                className={`city-name ${
                                  selectedCity === city ? "selected" : ""
                                }`}
                                onClick={() => handleCitySelection(city)}
                              >
                                {city}
                              </li>
                            ))}
                          </React.Fragment>
                        )
                      )}
                    </ul>
                  </div>
                </>
              )}
            </li>

            <li>
              <CommonButton
                style={{ padding: 12, borderRadius: '8px !important' }}
                text={
                  startDate
                    ? `${formatDate(startDate)}${
                        endDate && startDate.getTime() !== endDate.getTime()
                          ? ` - ${formatDate(endDate)}`
                          : ""
                      }`
                    : "Date"
                }
                icon={startDate ? <CalenderIconWhite /> : <DateIcon />}
                height="var(--display-lg-size)"
                backgroundColor={
                  startDate
                    ? "var(--Primary-Mid-Blue)"
                    : "var(--twotixx-brand-primary-brand)"
                }
                borderColor={
                  startDate
                    ? "var(--Primary-Mid-Blue)"
                    : "var(--twotixx-borders-silver)"
                }
                fontColor={
                  startDate
                    ? "var(--monochrome-white)"
                    : "var(--Primary-Mid-Blue)"
                }
                fontWeight="var(--font-w-500)"
                onClick={
                  //  startDate || (startDate && endDate)
                  //  ?
                  handleCalendarOpen
                  // : undefined
                }
                className={startDate ? "exclude-modal-background" : ""}
              />
            </li>

            <Dialog
              open={isModalOpen}
              onClose={handleCalendarClose}
              PaperProps={{
                style: dialogPaperStyle,
              }}
              BackdropProps={{
                style: {
                  backgroundColor: "rgba(204, 204, 204, 0.274)",
                },
              }}
            >
              <DialogContent>
                <DatePicker
                  selected={startDate}
                  onChange={(update) => setDateRange(update)}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  customInput={<CustomInput />}
                  renderCustomHeader={({ date, changeYear, changeMonth }) => (
                    <CustomHeader
                      date={date}
                      changeYear={changeYear}
                      changeMonth={changeMonth}
                      startDate={startDate}
                      endDate={endDate}
                      setStartDate={setStartDate}
                      setEndDate={setEndDate}
                      onClick={handleCalendarOpen}
                    />
                  )}
                />
              </DialogContent>
            </Dialog>
            {/* <li>
              <CommonButton
                text={
                  priceSelected
                    ? `${priceValue[0]} - ${priceValue[1]}`
                    : "Price"
                }
                icon={priceSelected ? <CalenderIconWhite /> : <DateIcon />}
                height="var(--display-lg-size)"
                backgroundColor={
                  priceSelected
                    ? "var(--Primary-Mid-Blue)"
                    : openPrice
                    ? "var(--monochrome-white)"
                    : "var(--twotixx-brand-primary-brand)"
                }
                borderColor={
                  priceSelected
                    ? "var(--Primary-Mid-Blue)"
                    : openPrice
                    ? "var(--Primary-Mid-Blue)"
                    : "var(--twotixx-borders-silver)"
                }
                fontColor={
                  priceSelected
                    ? "var(--monochrome-white)"
                    : "var(--Primary-Mid-Blue)"
                }
                fontWeight="var(--font-w-500)"
                onClick={
                  priceSelected && openPrice
                    ? undefined
                    : openPrice
                    ? handlePriceClose
                    : handlePriceClickOpen
                }
              />
            </li> */}

            {(priceSelected || startDate || endDate) && (
              <li>
                <CommonButton
                  text="Reset filters"
                  onClick={resetFilters}
                  backgroundColor="var(--monochrome-white)"
                  borderColor="var(--monochrome-white)"
                  fontColor="var(--Primary-Mid-Blue)"
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    lineHeight: "24px",
                    textDecoration: "underline",
                    textDecorationColor: "var(--Primary-Mid-Blue)",
                  }}
                />
              </li>
            )}
            <Dialog
              open={openPrice}
              onClose={handlePriceClose}
              PaperProps={{
                style: dialogPriceStyle,
              }}
              BackdropProps={{
                style: {
                  backgroundColor: "rgba(204, 204, 204, 0.274)",
                },
              }}
            >
              <DialogContent>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PriceInput
                    value={priceValue[0] === 0 ? "0" : `${priceValue[0]}`}
                    onChange={(e) => {
                      const newValue = +e.target.value.replace(/[^\d.]/g, "");
                      if (
                        newValue >= priceRange.minPrice &&
                        newValue < priceValue[1]
                      ) {
                        setPriceValue([newValue, priceValue[1]]);
                        setPriceSelected(true);
                      }
                    }}
                    onBlur={handleMinPriceBlur}
                    disabled={priceRange.minPrice == null}
                    inputProps={{ "aria-label": "Minimum price" }}
                  />

                  <span>-</span>
                  <PriceInput
                    // value={priceValue[1] === 0 ? "£0" : `£${priceValue[1]}`}
                    value={priceValue[1] === 0 ? "0" : `${priceValue[1]}`}
                    // onChange={(e) => handlePriceInputChange(1, e.target.value)}
                    onChange={(e) => {
                      const newValue = +e.target.value.replace(/[^\d.]/g, "");
                      if (newValue <= priceRange.maxPrice) {
                        setPriceValue([priceValue[0], newValue]);
                        setPriceSelected(true);
                      }
                    }}
                    onBlur={handleMaxPriceBlur}
                    disabled={priceRange.maxPrice == null}
                    inputProps={{ "aria-label": "Maximum price" }}
                  />
                </Box>
                <></>

                {priceRange.minPrice != null && priceRange.maxPrice != null && (
                  <PriceSlider
                    value={priceValue}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    min={priceRange.minPrice}
                    max={priceRange.maxPrice}
                  />
                )}
              </DialogContent>
            </Dialog>
          </ul>

          <ul className="newTop-btns-list newTop-btns-sm">
            {eventCategories?.map((category) => {
              const isSelected =
                category === selectedCategory ||
                (category === "All" && !selectedCategory);
              let icon;
              switch (category) {
                case "Music":
                  icon = isSelected ? <MusicWhiteIcon /> : <MusicIcon />;
                  break;
                case "Crypto":
                  icon = isSelected ? <XRPWhiteIcon /> : <CryptoIcon />;
                  break;
                case "Sports":
                  icon = isSelected ? <SportWhiteIcon /> : <SportsIcon />;
                  break;
                default:
                  icon = null;
              }

              return (
                <li key={category}>
                  <CommonButton
                    text={category}
                    icon={icon}
                    backgroundColor={
                      isSelected
                        ? "var(--Primary-Mid-Blue)"
                        : "var(--twotixx-brand-primary-brand)"
                    }
                    borderColor={
                      isSelected
                        ? "var(--Primary-Mid-Blue)"
                        : "var(--twotixx-borders-silver)"
                    }
                    fontColor={
                      isSelected
                        ? "var(--monochrome-white)"
                        : "var(--Primary-Mid-Blue)"
                    }
                    fontWeight="var(--font-w-500)"
                    onClick={() => handleCategoryClick(category)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <SnackbarContent
            style={{ backgroundColor: "#0057FF" }}
            message="Location needs to be enabled!!"
          />
        </Snackbar>
      </section>

      <section className="section tending-events-sec tending-events-listing-sec">
      {selectedCity !== "All EVENTS" ?  <div className="tending-events-title">
          <h2>
            Popular events in{" "}
            <span className="country-color">{selectedCity || eventName}</span>
          </h2>
        </div> : null}
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
          {filteredEvents?.length > 0 ? (
            filteredEvents?.map((event) => (
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
                  src={event.imageUrl}
                  alt={event.name}
                  className="event-list-img"
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
                <Box sx={{ padding: "0px" }}>
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
                    {`${formatDate(event?.date)} • ${event?.location}`}
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
                      {formatDate(event?.date)}
                    </span>{" "}
                  </Typography>
                  <Typography>
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
                      {event?.location}
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
                    from {event?.price}
                  </Typography>
                </Box>
              </Paper>
            ))
          ) : (
            <Typography
              variant="subtitle1"
              style={{ margin: "auto", height: "27vh" }}
            >
              No events found for the selected criteria.
            </Typography>
          )}
        </Box>
      </section>

      <Footer />
    </div>
  );
}

export default EventList;




