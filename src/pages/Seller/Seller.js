import React, { useEffect, useRef, useState } from "react";
import "./Seller.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Twemoji } from "react-emoji-render";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CommonButton from "../../components/Common/CommonButton";
import { useNavigate } from "react-router-dom";
import { ReactComponent as TicketGuardImg } from "../../assets/svgs/amico3.svg";
import { ReactComponent as TicketGuardImg2 } from "../../assets/svgs/amico4.svg";
import upArrow from "../../assets/svgs/upArrow.svg";
import downArrow from "../../assets/svgs/downArrow.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getCurrencyList } from "../../services/api";
import CommonBanner from "../../components/Common/CommonBanner";
import SellTicketOnline from "./SellOnlineTicket";
import CombatingScams from "./CombatingScams";
import TicketGuardVerification from "./TicketGuardVerification";
import NFTCollectibles from "./NFTCollectibles";
import HowItWorks from "./HowItWorks";
import ReadyToJoin from "./ReadyToJoin";
import Loader from "../../components/Common/Loader";

function Seller() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("United Kingdom (GBP)");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [price, setPrice] = useState(0.39);
  const [ticketGuardFee, setTicketGuardFee] = useState(1.99);
  const [currencySymbol, setCurrencySymbol] = useState("£");
  const [selectedPriceCardIndex, setSlectedPriceCardIndex] = useState(1);
  const dropdownRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);

  const formatCurrencyList = (currencies) => {
    return currencies.reduce((acc, currency) => {
      // Loop through each country of the current currency
      currency.countries.forEach(country => {
        // Create a new object with common properties and individual country details
        const countryObject = {
          id: currency.id,
          code: currency.code,
          name: currency.name,
          symbol: currency.symbol,
          ticketGuardFee: currency.ticketGuardFee,
          platformFee: currency.platformFee,
          platformFeePct: currency.platformFeePct,
          minimumThreshold: currency.minimumThreshold,
          maximumThreshold: currency.maximumThreshold,
          maxBookingFee: currency.maxBookingFee,
          maxBookingPct: currency.maxBookingPct,
          bookingFeePctRange: currency.bookingFeePctRange,
          countryName: country.name,
          countryFlag: country.flag
        };
  
        // Push the new object to the accumulator array
        acc.push(countryObject);
      });
  
      return acc;
    }, []);
  };

  useEffect(() => {
    // Select all images with the class 'img-fluid'
    const images = document.querySelectorAll('.img-fluid');

    // Function to wait for an image to load
    function imageLoadPromise(image) {
        return new Promise((resolve, reject) => {
            if (image.complete) {
                // If image is already loaded
                resolve();
            } else {
                // Wait for the image to load
                image.onload = resolve;
                image.onerror = reject;
            }
        });
    }

    // Create an array of promises for all images
    const imagePromises = Array.from(images).map(imageLoadPromise);

    // Wait for all images to load
    Promise.all(imagePromises)
        .then(() => {
            console.log('All images have loaded!!!!!!');
            setTimeout(() => {
              setIsLoading(false);
        
            }, 1000);
        })
        .catch((error) => {
            console.error('An error occurred while loading images:', error);
            // Handle the error (e.g., show an error message to the user)
        });

}, []); 

  useEffect(() => {
    const fetchCountryList = async () => {
      try {
        const result = await getCurrencyList();
        if (result.status && result.response) {
          console.log("countrylistinseller", formatCurrencyList(result.response));
          setCountryList(formatCurrencyList(result.response));
          // setCountryList(result.response.filter(country =>
          //   ["United Kingdom", "United States of America", "Switzerland", "Australia", "Canada", "South Africa", "India"].includes(country.name)
          // ));
          const defaultCountry = result.response.find(
            (country) => country.countryName === "United Kingdom"
          );
          if (defaultCountry) {
            setSelectedOption(
              `${defaultCountry.countryName} (${defaultCountry.code})`
            );
            setSelectedCountry(defaultCountry);
          }
        }
      } catch (error) {
        console.error("Error fetching country list:", error);
      }
    };

    fetchCountryList();
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);

  //   }, 2500);
  // }, []);

  const handleOptionClick = (country) => {
    setSelectedOption(`${country.countryName} (${country.code})`);
    setSelectedCountry(country);
    setIsOpen(false);

    const countryPrice = country.platformFee;
    const ticketGuardPrice = country.ticketGuardFee;
    const countryCurrencySymbol = country.symbol;
    setPrice(countryPrice);
    setTicketGuardFee(ticketGuardPrice);
    console.log("countryCurrencySymbol", countryCurrencySymbol);

    setCurrencySymbol(countryCurrencySymbol);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.scrollTo(0, 0);
    };
  }, []);

  const handleTicketSection = () => {
    // navigate("/contact");
    // window.scrollTo(0, 0);
    window.open("https://staging.boxoffice.twotixx.com/SignUp", "_blank");
  };

  const [pricingData, setPricingData] = useState([
    {
      key: "free",
      title: "Free Entry Events",
      price: "£0.00",
      features: [
        {
          text: "Smart Digital Tickets",
          icon: "/dashboard-icon-list.svg",
        },
        {
          text: "Scannable on entry",
          icon: "/venues.svg",
        },
        {
          text: "Track event statistics",
          icon: "/chart.svg",
        },
        {
          text: `Add TicketGuard™ for £1.00 per ticket`,
          icon: "/ticketGured.svg",
        },
      ],
    },
    {
      key: "paid",
      title: "Paid Entry Events",
      price: "1% + £0.39",
      features: [
        {
          text: "Smart Digital Tickets",
          icon: "/dashboard-icon-list.svg",
        },
        {
          text: "Scannable on entry",
          icon: "/venues.svg",
        },
        {
          text: "Track event statistics",
          icon: "/chart.svg",
        },
        {
          text: `Add TicketGuard™ for £1.00 per ticket`,
          icon: "/ticketGured.svg",
        },
      ],
    },
  ]);

  useEffect(() => {
    const updatedPricingData = pricingData.map((item) => ({
      ...item,
      price:
        item?.key == "free"
          ? `${currencySymbol}0.00`
          : `1% + ${currencySymbol}${price}`,
      features: item.features.map((feature) =>
        feature.text.includes("TicketGuard™")
          ? {
              ...feature,
              text: `Add TicketGuard™ for ${currencySymbol}${
               ticketGuardFee
              } per ticket`,
            }
          : feature
      ),
    }));
    setPricingData(updatedPricingData);
  }, [currencySymbol, ticketGuardFee]);
  const PricingBox = ({ title, price, features, index }) => (
    <div
      className="pricing-box-item"
      style={{
        marginLeft: 12,
        marginRight: 12,
        // ...(selectedPriceCardIndex === index && {
        //   borderWidth: 1,
        //   borderColor: "#0057FF",
        // }),
      }}
      onClick={() => {}}
    >
      <div
        className="pricing-box-item-inner"
        style={{
          ...(selectedPriceCardIndex === index && { borderColor: "#0057FF" }),
        }}
      >
        <div className="pricing-box-item-top">
          <h3
            style={selectedPriceCardIndex === index ? { color: "#0057FF" } : {}}
          >
            {title}
          </h3>
          <img alt="" src="/priceslider.svg" className="img-fluid" />
          <h4>{price}</h4>
          <span className="per-ticket">per ticket</span>
        </div>
        <hr />
        <div className="pricing-box-item-bottom">
          <p>
            Utilise our full range of standard features for zero additional
            cost.
          </p>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 17 }}
          >
            <img alt="" src="/priceslider.svg" className="img-fluid" />
          </div>
          {features.map((feature, index) => (
            <div key={index} className="feature-list">
              <img alt="" src={feature.icon} className="feature-icon" />
              <div className="options-feature">{feature.text}</div>
            </div>
          ))}
        </div>
      </div>
      <a
        className="getStarted"
        href="https://staging.boxoffice.twotixx.com/"
        onClick={(e) => {
          e.preventDefault();
          // window.open("https://staging.boxoffice.twotixx.com/SignUp", "_blank");
        }}
      >
        Get started
        <img
          alt=""
          src="/rightIcon.svg"
          className="img-fluid"
          style={{ marginLeft: 15 }}
        />
      </a>
    </div>
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="scrollTarget" className="terms-service-main">
      <Helmet
      >
        <title>
        Event Organisers Hub | Twotixx Ticketing Solutions
        </title>
      </Helmet>
      {isLoading && <Loader backgroundColor={"white"} />}

      <Navbar />
      {/* <section className="seller-banner"></section>
      <div className="iphone-screen"></div> */}
      <section className="seller-banner">
        <img
          className="seller-banner-iphone-images for-mobile img-fluid "
          src="/iphone15PictureMobile1.png"
          alt="iPhone Images Mobile"
        />
        {/* <img
          className="seller-banner-iphone-images for-mobile img-fluid"
          src="/iphone15PictureMobile-New.png"
          alt="iPhone Images Mobile"
        /> */}
        <img
          className="seller-banner-iphone-images for-desktop img-fluid"
          src="/iphone15Picture.svg"
          alt="iPhone Images"
        />
        <img
          className="seller-banner-bg for-mobile img-fluid"
          src="/sellerBanerBGMobile.svg"
          alt="Banner Background"
        />
        <img
          className="seller-banner-bg for-desktop img-fluid"
          src="/sellerTopMaskGroup.svg"
          alt="Banner Background"
        />
      </section>
      <SellTicketOnline />

      <div className="commonBannerLowFees">
        <CommonBanner
          // banner={"feesPayoutBannder.svg"}
          banner={
            width <= 767
              ? "feesPayoutBannderMobile.svg"
              : "feesPayoutBannder.svg"
          }
          leftFirstheader={"Low fees and"}
          leftSecondHeader={"rapid payouts"}
          rightFirstHeader="At Twotixx, we provide cutting-edge technology at an unbeatable
              price. Our transparent, competitive fee per ticket can be passed
              to the buyer as a small fee or absorbed into your ticket price."
          rightSecondHeader=" Enjoy instant cash flow with direct revenue deposits—no more
                waiting for payouts."
          glog="/glog.svg"
        />
      </div>

      <div className="commonBannerWorldClass">
        <CommonBanner
          // banner={"GpayBanner.svg"}
          banner={width <= 767 ? "GpayBannerMobile.svg" : "GpayBanner.svg"}
          leftFirstheader={"Maximise your conversions"}
          leftSecondHeader={"with Twotixx"}
          rightFirstHeader="We've simplified the ticket buying process to be quicker and easier than ever. Say goodbye to lengthy forms and registrations—now your customers can purchase tickets in seconds. Our streamlined flow is designed to boost your conversions and increase your sales effortlessly."
          rightSecondHeader="All transactions are securely processed by Stripe, with Apple Pay, Google Pay, and PCI DSS security. We support multiple currencies and soon you’ll even be able to accept crypto."
          glog="/worldPaymentGlog.svg"
        />
      </div>

      <CombatingScams />

      <section className="our-pricing-sec">
        <div className="container">
          <div className="price-parent">
            <div className="pricing-sec">
              <h2>
                <span>Our pricing</span>
              </h2>
              <p className="pricing-topText">
                Pay a small platform fee per ticket sold and enjoy our full
                features. Absorb the fees or pass them to your customers.
              </p>
            </div>
            <div
              className="dropdown-style"
              ref={dropdownRef}
              style={
                {
                  // backgroundColor:"#F1F2F4
                }
              }
            >
              <div className="dropdown">
                <div
                  className={`dropdown-toggle ${isOpen ? "active" : ""}`}
                  onClick={toggleDropdown}
                >
                  <div
                    className="dropdownCont"
                    style={{
                      // paddingTop: 3,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {selectedCountry && selectedCountry.countryFlag ? (
                      <Twemoji
                        text={
                          selectedCountry.name === "Netherlands"
                            ? "🇳🇱"
                            : selectedCountry.countryFlag
                        }
                      />
                    ) : (
                      <Twemoji text={"\uD83C\uDDEC\uD83C\uDDE7"} />
                    )}
                    <span className="couintryName">{selectedOption}</span>
                  </div>
                  <span className="currency-dropdown">
                    <img src={isOpen ? upArrow : downArrow} alt="Toggle Icon" />
                  </span>
                </div>
                {isOpen && (
                  <div className="dropdown-options">
                    {countryList
                      .filter((country) => country.countryName !== selectedCountry?.countryName)
                      .map((country) => (
                        <div
                          style={{ boxShadow: "none" }}
                          key={country.id}
                          className={`dropdown-toggle ${
                            selectedOption ===
                            `${country.countryName} (${country.code})`
                              ? "active"
                              : ""
                          }`}
                          onClick={() => handleOptionClick(country)}
                        >
                          <div
                            style={{
                              paddingTop: 7,
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <Twemoji
                              style={{ marginRight: "10px" }}
                              text={country.countryFlag}
                            />
                            {`${country.countryName} (${country.code})`}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="our-pricing-box">
            {pricingData.map((box, index) => (
              <PricingBox
                key={index}
                title={box.title}
                price={box.price}
                features={box.features}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <TicketGuardVerification ticketGuardPrice={`${currencySymbol}${ticketGuardFee}`}/>

      <div className="commonBannerEfficientlyManage">
        <CommonBanner
          // banner={"partyBanner.svg"}
          banner={width <= 767 ? "partyBannerMobile.svg" : "partyBanner.svg"}
          leftFirstheader={"Manage and monitor entries"}
          leftSecondHeader={"in real-time."}
          rightFirstHeader="Organisers can optimise entry times, elevate customer experience, and fortify event security with the Twotixx Venue app."
          glog="/realTimeMonitorGlog.svg"
        />
      </div>

      <NFTCollectibles />
      <HowItWorks />
      <ReadyToJoin handleTicketSection={handleTicketSection} />
      <Footer />
    </div>
  );
}

export default Seller;
