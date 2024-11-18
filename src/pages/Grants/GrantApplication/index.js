import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Twemoji } from "react-emoji-render";
import Swal from "sweetalert2";

import "../Grants.css";
import "../../Home/Home.css";
import CommonButton from "../../../components/Common/CommonButton";

import { ReactComponent as RightCircleIcon } from "../../../assets/svgs/RightCircleIcon.svg";
import { ReactComponent as Circle } from "../../../assets/svgs/circle.svg";

import {
  addGrantDetails,
  getCountryList,
  getEventTypes,
} from "../../../services/api";

import useNameVerification from "../../../hooks/common/useNameVerification";
import useMobileNumberVerification from "../../../hooks/common/useMobileNumberVerification";
import useEmailVerification from "../../../hooks/common/useEmailVerification";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "../../../components/Common/CustomDropDown";

const GrantApplication = () => {
  const defaultCountry = useSelector((state) => state.defaultCountry);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("+44");
  const [countryList, setCountryList] = useState([]);
  const [text, setText] = useState("");
  const [grantAgreement, setGrantAgreement] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [eventTypes, setEventTypes] = useState([]);
  const [formData, setFormData] = useState({
    instagramUsername: "",
    facebookBusinessPage: "",
    xUserName: "",
    eventName: "",
    otherTradingName: "",
    eventCategory: "",
    eventDate: "",
    eventDay: "",
    eventMonth: "",
    eventYear: "",
    venueName: "",
    ticketQtyExpected: "",
    eventsPerYear: "",
    grantUsage: "",
    firstName: "",
    lastName: "",
    position: "",
    mobileNumber: "",
    emailAddress: "",
    country: "",
    city: "",
    zipcode: "",
  });
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const maxChars = 500;

  const handleOptionClick = (country) => {
    console.log("country😊", country);
    setSelectedOption(`+${country.dialingCode}`);
    // setSelectedCountry(country);
    setSelectedValue(country);

    setIsOpen(false);
  };

  useEffect(() => {
    const fetchCountryList = async () => {
      try {
        const result = await getCountryList();
        if (result.status && result.response) {
          console.log("countrylistinseller", result.response);
          let la_countryList = [];
          // result.response &&
          //   result.response.map((item) =>
          //     la_countryList.push({
          //       ...item,
          //       label: item?.name,
          //       value: item?.name,
          //     })
          //   );
          setCountryList(result.response);
        }
      } catch (error) {
        console.error("Error fetching country list:", error);
      }
    };

    setSelectedValue(defaultCountry);
    setSelectedOption(`+${defaultCountry.dialingCode}` || "+44");
    fetchCountryList();
  }, [defaultCountry]);
  useEffect(() => {
    getEventCategoriesData();
  }, []);
  const getEventCategoriesData = async () => {
    try {
      const result = await getEventTypes();
      console.log("getEventTypes", result?.response);
      setEventTypes(result?.response);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]:
        name === "grantUsage" && value.length > maxChars
          ? formData.grantUsage
          : value,
    });
  };
  const firstNameVerification = useNameVerification(formData?.firstName);
  const lastNameVerification = useNameVerification(formData?.lastName);
  const phoneVerification = useMobileNumberVerification(formData?.mobileNumber);
  const emailVerification = useEmailVerification(formData?.emailAddress);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formValidation()) {
      const parsedFormData = {
        ...formData,
        eventsPerYear: parseInt(formData.eventsPerYear),
        ticketQtyExpected: parseInt(formData.ticketQtyExpected),
        mobileNumberCountryCode: selectedOption,
        marketingConsent,
        grantAgreement,
      };
      if (
        parsedFormData.eventYear &&
        parsedFormData.eventMonth &&
        parsedFormData.eventDay
      ) {
        const eventDate = new Date(
          parsedFormData.eventYear,
          parsedFormData.eventMonth - 1, // Month is 0-indexed
          parsedFormData.eventDay,
          18,
          0,
          0 // Set default time to 00:00:00
        );
        parsedFormData["eventDate"] = eventDate.toISOString();
      }
      try {
        Swal.fire({
          title: "Submitting...",
          text: "Please wait.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const response = await addGrantDetails(parsedFormData);

        Swal.close();

        if (response.status) {
          Swal.fire({
            title: "Success!",
            text: "Form submitted successfully",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonClass: "custom-swal-button",
            // buttonsStyling: false
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/");
            }
          });
        }
      } catch (error) {
        Swal.close();
        console.error("Submission error: ", error.message);
      }
    }
  };

  const formValidation = () => {
    if (
      firstNameVerification &&
      lastNameVerification &&
      phoneVerification &&
      formData?.firstName != "" &&
      formData?.lastName != "" &&
      formData?.mobileNumber != "" &&
      formData?.country != "" &&
      formData?.city != "" &&
      formData?.zipcode != "" &&
      formData?.eventName != "" &&
      formData?.eventCategory != "" &&
      formData?.ticketQtyExpected != "" &&
      formData?.eventsPerYear != "" &&
      formData?.grantUsage != "" &&
      formData?.grantUsage.length <= maxChars &&
      grantAgreement &&
      marketingConsent &&
      checkDateIsValid()
    ) {
      return true;
    }
    return false;
  };

  const checkDateIsValid = () => {
    const date = new Date();
    const { eventDay, eventMonth, eventYear } = formData;
    if (
      eventDay.length == 2 &&
      eventMonth.length == 2 &&
      eventYear.length == 4
    ) {
      console.log("callleddd");
      if (
        eventDay < 1 ||
        eventDay > 31 ||
        eventMonth < 1 ||
        eventMonth > 12 ||
        eventYear < date.getFullYear()
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const handleDayChange = (e) => {
    if (e.target.value.length <= 2) {
    handleInputChange(e);
    const value = e.target.value;
    if (value.length === 2) {
      monthRef.current.focus();
    }
  }
  };

  const handleMonthChange = (e) => {
    if (e.target.value.length <= 2) {
    handleInputChange(e);
    const value = e.target.value;
    if (value.length === 2) {
      yearRef.current.focus();
    } else if (value.length === 0) {
      dayRef.current.focus();
    }
  }
  };

  const handleYearChange = (e) => {
    if (e.target.value.length <= 4) {
    handleInputChange(e);
    const value = e.target.value;
    if (value.length === 0) {
      monthRef.current.focus();
    }
  }
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
    };
  }, []);
  return (
    <div className="form-container">
      <h3>Start funding your next live event here</h3>
      <h4>Your details</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First name*</label>
            <input
              //  className={classes.textField}
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter first name"
              required
              value={formData?.firstName}
              onChange={handleInputChange}
              style={{ marginBottom: 16 }}
            />
            {formData?.firstName !== "" && firstNameVerification && (
              <RightCircleIcon className="input-icon" />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last name*</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter last name"
              required
              value={formData?.lastName}
              onChange={handleInputChange}
              style={{ marginBottom: 16 }}
            />
            {formData && formData?.lastName !== "" && lastNameVerification && (
              <RightCircleIcon className="input-icon" />
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input
            type="text"
            id="position"
            name="position"
            placeholder="Enter position"
            value={formData?.position}
            onChange={handleInputChange}
            style={{ marginBottom: 16 }}
          />
          {formData && formData?.position !== "" && (
            <RightCircleIcon className="input-icon" />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone number*</label>
          <div className="phone-input-container big-input-static-phone">
            <div className="phoneNoCont">
              <div className="dropdown-style" ref={dropdownRef}>
                <div
                  className={`dropdown-toggle ${isOpen ? "active" : ""}`}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div
                    style={{
                      // paddingTop: 2,
                      // display: "flex",
                      // flexDirection: "row",
                      marginRight: "8px",
                    }}
                  >
                    {selectedValue && selectedValue.flag ? (
                      <Twemoji text={selectedValue.flag} />
                    ) : (
                      <Twemoji text={"\uD83C\uDDEC\uD83C\uDDE7"} />
                    )}
                  </div>
                  {selectedOption}
                </div>
                {isOpen && (
                  <div className="dropdown-options-1">
                    {countryList
                      .filter((country) => country.id !== selectedValue?.id)
                      .map((country) => (
                        <div
                          key={country.id}
                          className={`dropdown-toggle ${
                            selectedOption === `+${country.dialingCode}`
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
                              style={{ marginRight: "6px" }}
                              text={country?.flag}
                            />
                            {`+${country.dialingCode}`}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <input
                className="form-control no-arrows"
                type="number"
                id="mobileNumber"
                name="mobileNumber"
                placeholder="Mobile number"
                value={formData?.mobileNumber}
                onChange={handleInputChange}
                style={
                  formData?.mobileNumber !== "" && !phoneVerification
                    ? { borderColor: "red", borderWidth: 1, marginBottom: 16 }
                    : { marginBottom: 16 }
                }
                min="0"
              />
              <div>
                {formData &&
                  formData?.mobileNumber !== "" &&
                  phoneVerification && (
                    <RightCircleIcon className="input-icon" />
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address*</label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            placeholder="Enter email address"
            required
            value={formData?.emailAddress}
            onChange={handleInputChange}
            style={
              formData?.emailAddress !== "" && !emailVerification
                ? { borderColor: "red", borderWidth: 1, marginBottom: 16 }
                : { marginBottom: 16 }
            }
          />
          {formData?.emailAddress !== "" && !emailVerification && (
            <div className="invalid">Invalid Email</div>
          )}
          {formData && formData?.emailAddress !== "" && emailVerification && (
            <RightCircleIcon className="input-icon" />
          )}
        </div>
        <div className="">
          {/* <label htmlFor="country">Country*</label>
          <select
            name="country"
            id="country"
            required
            value={formData?.country}
            onChange={handleInputChange}
            // placeholder="Select an option"
            style={{
              width: "100%",
              color: "rgba(68, 84, 111, 1)",
              outline: "none",
            }}
          >
            <option value="" disabled>
              Select an option
            </option>
            {countryList && countryList.map((item) => (
              <option value={item.label}>{item.label}</option>
            ))}
          </select> */}
          {/* {formData && formData?.country !== "" && (
            <RightCircleIcon className="input-icon" />
          )} */}
          <label htmlFor="country">Country*</label>
          <CustomDropdown
            name="country"
            labelField="name"
            valueField="name"
            options={countryList}
            // value={countryList.find(
            //   (option) => option.value === formData.country
            // )}
            onChange={handleInputChange}
            placeholder="Select a country"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City/Town*</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Enter city/town"
              required
              value={formData?.city}
              onChange={handleInputChange}
              style={{ marginBottom: 16 }}
            />
            {formData && formData?.city !== "" && (
              <RightCircleIcon className="input-icon" />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="zipcode">Post/ZIP Code*</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              placeholder="Enter post/zip code"
              required
              value={formData?.zipcode}
              onChange={handleInputChange}
              maxLength={20}
              style={{ marginBottom: 16 }}
            />
            {formData && formData?.zipcode !== "" && (
              <RightCircleIcon className="input-icon" />
            )}
          </div>
        </div>
        <div>
          {/* <img className="img-fluid formDeviderBorder" src="/border.svg" alt="border" style={{display: "block", margin: "16px 0 32px 0"}} /> */}
          <div className="formDeviderBorder" style={{backgroundColor: "#DCDFE4", display: "block", margin: "16px 0 32px 0", height: "1px", width: "100%"}} />
          {/* <div className="border">Your content here</div> */}
          <h4>Social details</h4>
          <div className="form-group">
            {/* <CommmonInputField label="Instagram username" type="text" id={"instagramUsername"} name="instagramUsername" placeholder="Enter username"/> */}
            <label htmlFor="email">Instagram username</label>
            <input
              type="text"
              id="instagramUsername"
              name="instagramUsername"
              placeholder="Enter username"
              value={formData?.instagramUsername}
              onChange={handleInputChange}
              style={{ marginBottom: 16 }}
            />
            {formData && formData?.instagramUsername !== "" && (
              <RightCircleIcon className="input-icon" />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Facebook business page</label>
            <input
              type="text"
              id="facebookBusinessPage"
              name="facebookBusinessPage"
              placeholder="Enter URL"
              value={formData?.facebookBusinessPage}
              onChange={handleInputChange}
              style={{ marginBottom: 16 }}
            />
            {formData && formData?.facebookBusinessPage !== "" && (
              <RightCircleIcon className="input-icon" />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">X username</label>
            <input
              type="text"
              id="xUserName"
              name="xUserName"
              placeholder="Enter username"
              value={formData?.xUserName}
              onChange={handleInputChange}
              style={{ marginBottom: 16 }}
            />
            {formData && formData?.xUserName !== "" && (
              <RightCircleIcon className="input-icon" />
            )}
          </div>
        </div>
        <div>
          {/* <img alt="" src="/border.svg" className="img-fluid" /> */}
          {/* <img className="img-fluid formDeviderBorder" src="/border.svg" alt="border" style={{display: "block", margin: "16px 0 32px 0"}} /> */}
          <div className="formDeviderBorder" style={{backgroundColor: "#DCDFE4", display: "block", margin: "16px 0 32px 0", height: "1px", width: "100%"}} />
          {/* <div className="border">Your content here</div> */}
          <h4>Event details</h4>
          <div className="form-group">
            <label htmlFor="eventName">Event/Brand name*</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              placeholder="Enter name"
              required
              value={formData?.eventName}
              onChange={handleInputChange}
              style={{ marginBottom: 16 }}
            />
            {formData && formData?.eventName !== "" && (
              <RightCircleIcon className="input-icon" />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="otherTradingName">Other trading names</label>
            <input
              type="text"
              id="otherTradingName"
              name="otherTradingName"
              placeholder="Enter trading name(s)"
              value={formData?.otherTradingName}
              onChange={handleInputChange}
              style={{ marginBottom: 16 }}
            />
            {formData && formData?.otherTradingName !== "" && (
              <RightCircleIcon className="input-icon" />
            )}
          </div>

          <div className="form-group">
            {/* <select
              id="eventCategory"
              name="eventCategory"
              required
              value={formData?.eventCategory}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select an option
              </option>
              {eventTypes.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select> */}
            {/* {formData && formData?.eventCategory !== "" && (
              <RightCircleIcon className="input-icon" />
            )} */}
            <label htmlFor="eventCategory">Event type*</label>
            <CustomDropdown
              name="eventCategory"
              options={eventTypes}
              labelField="name"
              valueField="name"
              // value={eventTypes.find(
              //   (option) => option.value === formData.country
              // )}
              onChange={handleInputChange}
              placeholder="Select event type"
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventDate">Event date</label>
            <div className="date-group">
              <input
                className="inputDateMonthYear" 
                type="number"
                id="eventDay"
                name="eventDay"
                placeholder="DD"
                value={formData?.eventDay}
                onChange={handleDayChange}
                inputMode="numeric"
                // maxLength={2}
                max={31}
                style={{
                  width: "48px",
                  borderColor: !checkDateIsValid() ? "red" : undefined,
                  borderWidth: !checkDateIsValid() ? 1 : undefined,
                  marginBottom: 16,
                }}
                ref={dayRef}
                min="0"
              />
              <input
                className="inputDateMonthYear" 
                style={{
                  width: "48px",
                  marginLeft: 8,
                  borderColor: !checkDateIsValid() ? "red" : undefined,
                  borderWidth: !checkDateIsValid() ? 1 : undefined,
                  marginBottom: 16,
                }}
                type="number"
                id="eventMonth"
                name="eventMonth"
                placeholder="MM"
                value={formData?.eventMonth}
                onChange={handleMonthChange}
                maxLength={2}
                ref={monthRef}
                min="0"
              />
              <input
                className="inputDateMonthYear" 
                style={{
                  width: "56px",
                  marginLeft: 8,
                  borderColor: !checkDateIsValid() ? "red" : undefined,
                  borderWidth: !checkDateIsValid() ? 1 : undefined,
                  marginBottom: 16,
                }}
                type="number"
                id="eventYear"
                name="eventYear"
                placeholder="YYYY"
                value={formData?.eventYear}
                onChange={handleYearChange}
                maxLength={4}
                ref={yearRef}
                min="0"
              />
            </div>
            {!checkDateIsValid() && (
              <div className="invalid">Input a valid date.</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="venueName">Venue name</label>
            <input
              type="text"
              id="venueName"
              name="venueName"
              placeholder="Enter venue name"
              value={formData?.venueName}
              onChange={handleInputChange}
              style={{ marginBottom: 16 }}
            />
            {formData && formData?.venueName !== "" && (
              <RightCircleIcon className="input-icon" />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="ticketQtyExpected">
              How many tickets do you expect to sell?*
            </label>
            <input
              type="number"
              id="ticketQtyExpected"
              name="ticketQtyExpected"
              placeholder="Enter amount"
              required
              value={formData?.ticketQtyExpected}
              onChange={handleInputChange}
              style={{ marginBottom: 16 }}
              min="0"
            />
            {formData && formData?.ticketQtyExpected !== "" && (
              <RightCircleIcon className="input-icon" />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="eventsPerYear">
              How many events do you hold per year?*
            </label>
            <input
              type="number"
              id="eventsPerYear"
              name="eventsPerYear"
              placeholder="Enter amount"
              required
              value={formData?.eventsPerYear}
              onChange={handleInputChange}
              style={{ marginBottom: 16 }}
              min="0"
            />
            {formData && formData?.eventsPerYear !== "" && (
              <RightCircleIcon className="input-icon" />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="grantUsage">
              How would you use an Event Creator Grant?*
            </label>
            <textarea
              className="text-area"
              id="grantUsage"
              name="grantUsage"
              placeholder="Enter your comments"
              maxLength="500"
              value={formData?.grantUsage}
              onChange={handleInputChange}
              required
              style={{ outline: "none" }}
            ></textarea>
            {/* {formData && formData?.grantUsage !== "" && (
              <RightCircleIcon className="input-icon" />
            )} */}
          </div>
          <div
            className="word-counter"
            style={{ marginTop: 4 }}
          >{`${formData?.grantUsage.length}/${maxChars} characters`}</div>
        </div>
        <div>
          {/* <img alt="" src="/border.svg" className="img-fluid" /> */}
          {/* <img className="img-fluid formDeviderBorder" src="/border.svg" alt="border" style={{display: "block", margin: "16px 0 32px 0"}} /> */}
          <div className="formDeviderBorder" style={{backgroundColor: "#DCDFE4", display: "block", margin: "16px 0 32px 0", height: "1px", width: "100%"}} />
          {/* <div className="border"></div> */}
        </div>
        <div
          className="agree-terms"
          onClick={() => setGrantAgreement(!grantAgreement)}
          style={{
            backgroundColor: grantAgreement ? "#E6F2E6" : "#F1F2F4",
            marginTop: 30,
          }}
        >
          <div className="circle-icon">
            {grantAgreement ? <RightCircleIcon /> : <Circle />}
          </div>
          <div class="terms-text">
            Do you understand that if a grant is awarded you must use our
            product for your ticketing and/or digital merchandise requirements?*
          </div>
        </div>
        <div
          className="agree-terms"
          onClick={() => setMarketingConsent(!marketingConsent)}
          style={{
            backgroundColor: marketingConsent ? "#E6F2E6" : "#F1F2F4",
          }}
        >
          <div className="circle-icon">
            {marketingConsent ? <RightCircleIcon /> : <Circle />}
          </div>
          <div class="terms-text">
            I agree to receive marketing communication from Twotixx.*
          </div>
        </div>
        <div className="submit-btn-outerview">
          <CommonButton
            type="submit"
            text="Submit"
            width="328px"
            height="50px"
            fontSize="28px"
            textAlign="center"
            disabled={!formValidation()}
          />
        </div>
      </form>
    </div>
  );
};
export default GrantApplication;
