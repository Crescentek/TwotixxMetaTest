import EventFormContainer from "../Common/EventFormContainer";
import "./CustomerDetailsStepper.css";
import CommonButton from "../Common/CommonButton";
import { TextField, Grid, Tooltip, Typography, Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import cookie from "react-cookies";
import React, {
  createRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  createOrder,
  emailInUse,
  getCountryList,
  registerUser,
  sendOTP,
  updateOrder,
  verifyOTP,
} from "../../services/api";

import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmailOTP,
  setExistingEmail,
  setMobileOTP,
  setOTP,
} from "../../reducers/eventDataReducer";
import { loadStripe } from "@stripe/stripe-js";
import CreateStripeSession from "../../utils/StripeSession";
import DisclaimerText from "../Common/DisclaimerText";
import PaymentForm from "../Common/PaymentForm";

const useStyles = makeStyles({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      margin: "10px 0",
    },
    "& .MuiInputLabel-root": {
      textTransform: "uppercase",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(0, 0, 0, 0.23)",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    "& .MuiInputBase-input": {
      fontSize: "16px",
      fontFamily: "var(--global-font-family)",
      color: "black",
    },
  },
  tooltip: {
    fontSize: "12px",
    maxWidth: "180px",
    fontFamily: "Poppins",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
    "@media (max-width: 600px)": {
      fontSize: "10px",
      maxWidth: "150px",
    },
  },
  tooltipContent: {
    backgroundColor: "transparent",
    color: "#0D2244",
    fontSize: "14px",
    fontFamily: "Poppins",
    fontWeight: "400",
    marginLeft: "2px",
    height: "auto",
  },
  bookingFeeText: {
    fontFamily: "Poppins",
    fontWeight: "400",
  },
  label: {
    fontFamily: "var(--global-font-family)",
    color: "#000000",
    fontSize: "16px",
    marginBottom: "5px",
    fontWeight: "var(--font-w-400)",
  },
  dobField: {
    "& .MuiGrid-item": {
      paddingLeft: 30,
      paddingRight: 0,
    },
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
});

const CustomerDetailsStepper = ({ showTimer }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const stepIcons = [
    "/green-tickets.svg",
    "/blue-payment.svg",
    "/black-get-app.svg",
  ];
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [open, setOpen] = useState(false);
  const [openTotalPriceInfo, setOpenTotalPriceInfo] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const tooltipTriggerRef = useRef(null);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const totalPrice = useSelector((state) => state.totalPrice);
  const eventData = useSelector((state) => state.eventData);
  const trackingCode = useSelector((state) => state.trackingCode);
  // const existingEmail = useSelector((state) => state.existingEmail);
  const flatDiscount = useSelector((state) => state.flatDiscount);
  const totalIncludedInTicketPrice = useSelector(
    (state) => state.totalIncludedInTicketPrice
  );
  const finalTotalPrice = useMemo(() => {
    if (totalIncludedInTicketPrice > 0) {
      return totalPrice + totalIncludedInTicketPrice;
    }
    return totalPrice;
  }, [totalPrice, totalIncludedInTicketPrice]);
  const isNewRegistration = useSelector((state) => state.isNewRegistration);
  const ticketTotalsData = useSelector((state) => state.ticketTotalsData);
  const enteredOTP = useSelector((state) => state.otp);
  const mobileOTP = useSelector((state) => state.otp.mobileOTP);
  const emailOTP = useSelector((state) => state.otp.emailOTP);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    lastName: "",
    firstName: "",
    day: "",
    month: "",
    year: "",
    currency: "USD",
    amount: totalPrice,
    phoneNumber: "",
    otp: ["", "", "", ""],
  });
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [showPhoneError, setShowPhoneError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState(10);
  const [errorMessage, setErrorMessage] = useState("");
  const topRef = useRef(null);
  console.log('isRegistrationComplete', isRegistrationComplete)

  const otpRefs = useRef([createRef(), createRef(), createRef(), createRef()]);

  const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  //actual regex for mobile number
  const mobileNumberReg = /^[0-9]{6,15}$/;

  const handleContinueClick = async () => {
    startCountdown(10 * 60);

    setIsPhoneValid(false);
    setShowPhoneError(false);
    setErrorMessage("");
    if (mobileNumberReg.test(formData?.phoneNumber)) {
      try {
        const selectedCountryId = countryList.find(
          (country) => country?.dialingCode === selectedCountry?.dialingCode
        )?.id;

        const response = await sendOTP({
          emailAddress: "",
          mobileNumber: {
            countryId: selectedCountryId,
            countryCode: selectedCountry?.dialingCode.toString(),
            number: formData?.phoneNumber,
          },
          isMobile: true,
        });

        if (response?.response?.success) {
          console.log("OTP sent successfully:", response?.response);
          setIsPhoneValid(true);
          setIsOtpVerified(false);
          setIsRegistrationComplete(false);
        } else {
          setShowPhoneError(true);
          setErrorMessage(
            "Error sending OTP: " + response?.response?.errorMessage
          );
        }
      } catch (error) {
        console.error("Error sending OTP catch:", error);
        setShowPhoneError(true);
        setErrorMessage("Oops, something went wrong. Please try again later.");
      }
    } else {
      setShowPhoneError(true);
      setErrorMessage("Please enter a valid mobile number.");
      setAttemptsLeft(attemptsLeft - 1);
    }
  };

  useEffect(() => {
    if (mobileNumberReg.test(formData?.phoneNumber)) {
      setShowPhoneError(false);
    }
  }, [formData?.phoneNumber]);

  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({
    dialingCode: "44",
    flagUrl: "/flag-united-kingdom.svg",
  });

  useEffect(() => {
    const fetchCountryList = async () => {
      const result = await getCountryList();
      if (result?.status && result?.response) {
        const mappedCountryList = result.response.map((country) => ({
          dialingCode: country?.dialingCode,
          flagUrl: country?.flag,
          name: country?.name,
          id: country?.id,
        }));
        setCountryList(mappedCountryList);
      }
    };

    fetchCountryList();
  }, []);

  const startCountdown = (duration) => {
    setTimeLeft(duration);
  };

  useEffect(() => {
    let interval = null;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleContinueAfterEmail = async () => {
    startCountdown(10 * 60);
    setShowEmailError(false);
    setErrorMessage("");
    if (emailReg.test(formData.email)) {
      try {
        const selectedCountryId = countryList.find(
          (country) => country.dialingCode === selectedCountry?.dialingCode
        )?.id;

        const response = await sendOTP({
          emailAddress: formData?.email,
          mobileNumber: {
            countryId: selectedCountryId,
            countryCode: selectedCountry?.dialingCode.toString(),
            number: formData?.phoneNumber,
          },
          // mobilePasswordOneTimeCode: enteredOTP,
          isMobile: false,
        });

        if (response?.response?.success) {
          setIsRegistrationComplete(true);
        } else {
          setShowEmailError(true);
          setErrorMessage("Email error: " + response?.response?.errorMessage);
          setEmailError(response?.message);
        }
      } catch (error) {
        console.log("Error registering user:", error);
        setShowEmailError(true);
        setEmailError("Oops, something went wrong. Please try again later.");
      }
    } else {
      setShowEmailError(true);
      setEmailError("Invalid email address. Please enter a valid email.");
    }
  };

  const handleChange =
    (field, index) =>
    ({ target: { value }, key }) => {
      if (field === "otp") {
        let newOtp = [...formData.otp];

        if (key === "Backspace") {
          if (newOtp[index] !== "") {
            newOtp[index] = "";
            if (index > 0) {
              setTimeout(() => otpRefs.current[index - 1].current.focus(), 0);
            }
          }
        } else if (!isNaN(value) && value.trim() !== "") {
          if (value.length === 1) {
            newOtp[index] = value;
            if (index < formData.otp.length - 1) {
              setTimeout(() => otpRefs.current[index + 1].current.focus(), 0);
            }
          }
        }

        const isOtpComplete = newOtp.every((val) => val.trim() !== "");
        setFormData({ ...formData, otp: newOtp });

        if (isOtpComplete) {
          handleVerifyMobileOTP(newOtp.join(""));
        }
      }
    };

  const handleVerifyMobileOTP = async (enteredOTP) => {
    try {
      const selectedCountryId = countryList.find(
        (country) => country.dialingCode === selectedCountry.dialingCode
      )?.id;

      const isMobile = true;
      const emailAddress = "";

      const response = await verifyOTP({
        emailAddress,
        mobileNumber: {
          countryId: selectedCountryId,
          countryCode: selectedCountry?.dialingCode.toString(),
          number: formData?.phoneNumber,
        },
        isMobile,
        otp: enteredOTP,
        tokenExpiryDays: 0,
      });

      if (response?.response?.success) {
        console.log("Mobile OTP verified successfully:", response);
        setIsOtpValid(true);
        setIsOtpVerified(true);
        setFormData((prevState) => ({ ...prevState, otp: ["", "", "", ""] }));
        // dispatch(setOTP(enteredOTP));
        dispatch(setMobileOTP(enteredOTP));
        setIsMobileVerified(true);
        setIsNewUser(response?.response?.isNewUser || false);
      } else {
        setIsOtpValid(false);
        otpRefs.current[0].current.focus();
        setErrorMessage(
          "Error verifying Mobile OTP: " + response?.errorMessage
        );
      }
    } catch (error) {
      console.error("Error verifying Mobile OTP catch:", error);
      setIsOtpValid(false);
      otpRefs.current[0].current.focus();
      setErrorMessage("Oops, something went wrong. Please try again later.");
    }
  };

  const handleChangeEmailOTP =
    (field, index) =>
    ({ target: { value }, key }) => {
      if (field === "otp") {
        let newOtp = [...formData.otp];

        if (key === "Backspace") {
          if (newOtp[index] !== "") {
            newOtp[index] = "";
            if (index > 0) {
              setTimeout(() => otpRefs.current[index - 1].current.focus(), 0);
            }
          }
        } else if (!isNaN(value) && value.trim() !== "") {
          if (value.length === 1) {
            newOtp[index] = value;
            if (index < formData.otp.length - 1) {
              setTimeout(() => otpRefs.current[index + 1].current.focus(), 0);
            }
          }
        }

        const isOtpComplete = newOtp.every((val) => val.trim() !== "");
        setFormData({ ...formData, otp: newOtp });

        if (isOtpComplete) {
          handleVerifyEmailOTP(newOtp.join(""));
        }
      }
    };

  const handleVerifyEmailOTP = async (enteredOTP) => {
    try {
      const selectedCountryId = countryList.find(
        (country) => country.dialingCode === selectedCountry.dialingCode
      )?.id;

      const isMobile = false;
      const emailAddress = formData.email;

      const response = await verifyOTP({
        emailAddress,
        mobileNumber: {
          countryId: selectedCountryId,
          countryCode: selectedCountry?.dialingCode.toString(),
          number: formData?.phoneNumber,
        },
        isMobile,
        otp: enteredOTP,
        tokenExpiryDays: 0,
      });

      if (response?.response?.success) {
        console.log("Email OTP verified successfully:", response);
        setIsOtpValid(true);
        setIsOtpVerified(true);
        setFormData((prevState) => ({ ...prevState, otp: ["", "", "", ""] }));
        // dispatch(setOTP(enteredOTP));
        dispatch(setEmailOTP(enteredOTP));
        setIsEmailVerified(true);
        setIsNewUser(response?.response?.isNewUser || false);
      } else {
        setIsOtpValid(false);
        otpRefs.current[0].current.focus();
        setErrorMessage("Error verifying Email OTP: " + response?.errorMessage);
      }
    } catch (error) {
      console.error("Error verifying Email OTP catch:", error);
      setIsOtpValid(false);
      otpRefs.current[0].current.focus();
      setErrorMessage("Oops, something went wrong. Please try again later.");
    }
  };

  const handleRegisterUser = async () => {
    console.log("mobileOTPemailOTP", mobileOTP, emailOTP);
    if (emailReg.test(formData.email)) {
      try {
        const selectedCountryId = countryList.find(
          (country) => country.dialingCode === selectedCountry.dialingCode
        )?.id;

        const requestData = {
          emailAddress: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          mobileNumber: {
            countryId: selectedCountryId,
            countryCode: selectedCountry.dialingCode.toString(),
            number: parseInt(formData.phoneNumber, 10),
          },
        };

        if (mobileOTP) {
          requestData.mobilePasswordOneTimeCode = mobileOTP;
        }

        if (emailOTP) {
          requestData.emailPasswordOneTimeCode = emailOTP;
        }

        const response = await registerUser(requestData);

        if (response.status) {
          setIsRegistrationComplete(true);
        } else {
          setEmailError(response.message);
        }
      } catch (error) {
        console.log("Error registering user:", error);
        setEmailError("Oops, something went wrong. Please try again later.");
      }
    } else {
      setEmailError("Invalid email address. Please enter a valid email.");
    }
  };

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    if (value === "" || /^[0-9]*$/.test(value)) {
      setFormData({ ...formData, phoneNumber: value });
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    // Get pasted data via clipboard API
    const paste = (e.clipboardData || window.clipboardData).getData("text");
    if (paste && /^\d{4}$/.test(paste)) {
      const pasteArray = paste.split("");
      const newOtp = [...formData.otp];
      for (
        let i = 0;
        i < Math.min(pasteArray.length, formData.otp.length);
        i++
      ) {
        newOtp[i] = pasteArray[i];
        if (otpRefs.current[i] && otpRefs.current[i].current) {
          otpRefs.current[i].current.value = pasteArray[i];
        }
      }

      setFormData({ ...formData, otp: newOtp });
      const nextIndex = Math.min(formData.otp.length, pasteArray.length);
      if (
        nextIndex < formData.otp.length &&
        otpRefs.current[nextIndex] &&
        otpRefs.current[nextIndex].current
      ) {
        otpRefs.current[nextIndex].current.focus();
      }
    }
  };

  const handleEmailChange = (event) => {
    setFormData({ ...formData, email: event.target.value });
    setEmailError("");
  };

  const formatTime = () => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    return `${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;
  };

  useEffect(() => {
    function updateIsTouchDevice() {
      setIsTouchDevice(true);
    }
    window.addEventListener("touchstart", updateIsTouchDevice, { once: true });
    return () => {
      window.removeEventListener("touchstart", updateIsTouchDevice);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        tooltipTriggerRef.current &&
        !tooltipTriggerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tooltipTriggerRef]);

  const handleNewTooltipMouseEnter = () => {
    setOpenTotalPriceInfo(true);
  };

  const handleNewTooltipMouseLeave = () => {
    setOpenTotalPriceInfo(false);
  };

  const handleNewTooltipClick = (event) => {
    event.preventDefault();
    setOpenTotalPriceInfo((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        tooltipTriggerRef.current &&
        !tooltipTriggerRef.current.contains(event.target)
      ) {
        setOpenTotalPriceInfo(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const allTicketTypes = eventData[0]?.eventTicketTypeCategories.reduce(
    (acc, category) => [...acc, ...category.ticketTypes],
    []
  );

  const getCurrencySymbol = () => {
    const firstTicketType =
      allTicketTypes.length > 0 ? allTicketTypes[0] : null;
    return firstTicketType
      ? firstTicketType?.ticketPrice?.currency?.symbol
      : "";
  };

  const renderTicketDetails = () => {
    return ticketTotalsData
      ?.filter((ticketType) => ticketType.count > 0)
      .map((ticketType) => {
        const discountedTotal = Math.max(
          ticketType.total - flatDiscount * ticketType.count,
          0
        );

        return (
          <div key={ticketType.ticketTypeId} className="row2">
            <div className="text10">
              {ticketType.count} x {ticketType.name}
            </div>
            <div
              className="supporting-text20"
              style={{ color: "var(--Primary-Mid-Blue)" }}
            >
              {ticketType.currencySymbol}
              {discountedTotal.toFixed(2)}
            </div>
          </div>
        );
      });
  };

  const validateEmail = (email) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

  const checkEmail = async () => {
    if (!formData.email) {
      setErrors({ ...errors, email: "Email is required." });
      setShowAdditionalFields(false);
      return;
    }
    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: "Email is not valid." });
      setShowAdditionalFields(false);
      return;
    }

    try {
      const response = await emailInUse({ EmailAddress: formData.email });
      if (response.status && response.response === true) {
        dispatch(setExistingEmail(formData.email));
        const { orderId } = await submitOrder(formData.email);
        createCheckOutSession(orderId, formData.email);
      } else if (response.status && response.response === false) {
        setErrors({ ...errors, email: "" });
        setShowAdditionalFields(true);
        setInitialCheckDone(true);
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  useEffect(() => {
    if (initialCheckDone) {
      const timer = setTimeout(() => {
        checkEmail();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [formData.email, initialCheckDone]);

  const submitOrder = async (email) => {
    const orderParams = {
      emailAddress: email || isNewRegistration,
      eventId: eventData[0]?.id,
      trackingCode: trackingCode,
      currencyId: allTicketTypes[0]?.ticketPrice.currency.id,
      orderTotal: totalPrice,
      orderItems: ticketTotalsData.map((ticketType) => ({
        eventTicketTypeId: ticketType.ticketTypeId,
        quantity: ticketType.count,
        bookingFee: ticketType.bookingFee,
        price: ticketType.price,
        total: totalPrice,
      })),
    };

    try {
      const orderResponse = await createOrder(orderParams);
      if (orderResponse && orderResponse.status) {
        setFormData({ ...formData, orderId: orderResponse.response.orderId });
        return { status: true, orderId: orderResponse.response.orderId };
      } else {
        return { status: false, message: "Order creation failed" };
      }
    } catch (error) {
      console.error("Order creation error:", error);
      return { status: false, message: "Error in order creation" };
    }
  };

  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  const createCheckOutSession = async (orderId, userEmail) => {
    setLoading(true);
    try {
      const sessionResponse = await CreateStripeSession({
        ...formData,
        orderId: orderId || formData.orderId,
        email: userEmail,
      });

      cookie.save("stripeSessionId", sessionResponse.id);
      const params = {
        orderId: orderId,
        paymentStatus: "Pending",
        paymentRef: sessionResponse.id,
        StripeIntentId: sessionResponse.id,
      };
      const { status, message } = await updateOrder(params);

      if (status) {
        const stripe = await stripePromise;
        const result = await stripe.redirectToCheckout({
          sessionId: sessionResponse.id,
        });

        if (result.error) {
          alert("FAILED! " + result.error.message);
        }
      } else {
        alert("FAILED! " + message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      if (window.confirm("ERROR!! Please refresh the page and try again.")) {
        window.location.reload();
      }
    } finally {
      setLoading(false);
    }
  };

  const renderStepIcons = () => {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        {stepIcons.map((icon, index) => (
          <img
            key={index}
            src={icon}
            alt={`Step icon ${index}`}
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            style={{ marginLeft: index > 0 ? "10px" : "0" }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="desktop2" ref={topRef}>
      {renderStepIcons()}
      <div className="modal-group">
        <div className="modal1">
          <EventFormContainer whichmodule={"payment"} />
          <img className="divider-icon1" alt="" src="/divider1.svg" />
          <div className="rows1">
            {renderTicketDetails()}
            <div className="row3 totalIncl-block" style={{ marginTop: 15 }}>
              <div className="text11 totalValue-lft">
                Total:
                <span className="totalValue">
                  {getCurrencySymbol()}

                  {finalTotalPrice.toFixed(2)}
                </span>
              </div>

              <div
                className="supporting-text21"
                style={{ color: "var(--Primary-Mid-Blue)" }}
              >
                <span
                  style={{ color: "var(--body-title)", fontSize: 14, fontWeight: 400 }}
                >
                  {/* <div
                  style={{ color: "#767676", fontSize: 14, fontWeight: 400 }}
                > */}
                  {` ( incl. ${getCurrencySymbol()}${totalIncludedInTicketPrice.toFixed(
                    2
                    // )} of fees )`}
                  )} of fees)`}
                  <Tooltip
                    title={
                      <div
                        className={classes.tooltipContent}
                        style={{ padding: "6px" }}
                      >
                        The listed ticket price includes fees:
                        <div className={classes.bookingFeeText}>
                        Organiser’s booking fee: {getCurrencySymbol()}
                          {totalIncludedInTicketPrice.toFixed(2)}
                        </div>
                        {/* commented out now, need to add logic while api data available */}
                        {/* <div className={classes.bookingFeeText}>
                          TicketGuard™ fee: £X.XX
                        </div>
                        <div className={classes.bookingFeeText}>
                          Platform fee: £X.XX
                        </div> */}
                      </div>
                    }
                    componentsProps={{
                      tooltip: {
                        sx: {
                          bgcolor: "common.white",
                          "& .MuiTooltip-arrow": {
                            color: "common.white",
                          },
                          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
                          borderRadius: 3,
                          width: 358,
                        },
                      },
                    }}
                    arrow
                    open={openTotalPriceInfo}
                    onMouseEnter={handleNewTooltipMouseEnter}
                    onMouseLeave={handleNewTooltipMouseLeave}
                    onClick={handleNewTooltipClick}
                  >
                    <IconButton
                      aria-label="info"
                      className={classes.iconButton}
                    >
                      <InfoIcon
                        style={{ color: "#0057FF", fontSize: "24px" }}
                      />
                    </IconButton>
                  </Tooltip>
                  {/* </div> */}
                </span>
              </div>
            </div>
          </div>
          <div className="content10">
            <div className="supporting-text22">
              <DisclaimerText />
            </div>
          </div>
        </div>

        <div className="content11">
          <div className="content11Box">
            <div className="customer-verification">
              {isRegistrationComplete
                ? "STEP 2: REGISTRATION"
                : // <span className="paymentTopStep">
                //   STEP 2: PAYMENT
                //   <span className="cardIconsCont">
                //     <img
                //       className="cardIcon icon1"
                //       src="/card-icon1.svg"
                //       alt="Card Icon"
                //     />
                //     <img
                //       className="cardIcon icon2"
                //       src="/card-icon2.svg"
                //       alt="Card Icon"
                //     />
                //     <img
                //       className="cardIcon icon3"
                //       src="/card-icon3.svg"
                //       alt="Card Icon"
                //     />
                //   </span>
                // </span>
                isOtpVerified
                ? "STEP 2: REGISTRATION"
                : isPhoneValid
                ? "STEP 1: VERIFICATION"
                : ""}
            </div>
            {/* Mobile no adding section */}
            <div>
              {!isPhoneValid && (
                <>
                  <div className="customer-verification">
                    STEP 1: VERIFICATION
                  </div>
                  <div className="text12">Enter your mobile number</div>
                  <span className="mobile-verification-content">
                    Your mobile number is required to verify your account and
                    protect your tickets
                  </span>{" "}
                  <p className="mobile-verification-label">Mobile number</p>
                  <div className="phone-input-container big-input-static">
                    <div className="phoneNoCont">
                      <span
                        className="countryFlagCode"
                        onClick={() => setShowDropdown(!showDropdown)}
                      >
                        {selectedCountry.flagUrl !==
                        "/flag-united-kingdom.svg" ? (
                          <span className="topCflag">
                            <span>{selectedCountry.flagUrl}</span>
                          </span>
                        ) : (
                          <img
                            className="countryFlag"
                            src={selectedCountry.flagUrl}
                            alt="Country Flag"
                          />
                        )}
                        <span className="countryCode">
                          +{selectedCountry.dialingCode}
                        </span>
                      </span>
                      <input
                        className="form-control"
                        type="tel"
                        placeholder="Mobile number"
                        value={formData.phoneNumber}
                        onChange={handlePhoneNumberChange}
                      />
                      {showDropdown && (
                        <div className="countryDropdown">
                          {countryList?.map((country) => (
                            <div
                              key={country.dialingCode}
                              onClick={() => {
                                setSelectedCountry({
                                  dialingCode: country.dialingCode,
                                  flagUrl: country.flagUrl,
                                });
                                setShowDropdown(false);
                              }}
                            >
                              <span className="cflag">
                                <span>{country.flagUrl}</span>
                              </span>
                              <span className="cdialCode">
                                <span>+{country.dialingCode}</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {showPhoneError && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginBottom: "12px",
                      }}
                    >
                      {errorMessage}
                    </div>
                  )}
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      display: "block",
                    }}
                  >
                    Our{" "}
                    <a
                      href="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                        color: "var(--Primary-Mid-Blue)",
                      }}
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                        color: "var(--Primary-Mid-Blue)",
                      }}
                    >
                      Privacy Policy
                    </a>{" "}
                    applies to all registered users.
                  </span>
                  <div style={{ marginTop: 25 }}>
                    <CommonButton
                      text="Continue"
                      width="100%"
                      height="46px"
                      onClick={handleContinueClick}
                    />
                  </div>
                </>
              )}

              {/* OTP VERIFICATION section for mobile*/}

              {isPhoneValid && !isOtpVerified && !isRegistrationComplete && (
                <>
                  <span variant="h6" className="otp-verification-title">
                    We’ve sent you a code
                  </span>
                  <div variant="body1" className="otp-verification-text">
                    You've been texted a log-in code to{" "}
                    <span
                      style={{
                        color: "#0057FF",
                        display: "inline-block",
                        whiteSpace: "nowrap",
                        fontWeight: "600",
                      }}
                    >
                      {`+${selectedCountry.dialingCode} ${formData.phoneNumber
                        .replace("+" + selectedCountry.dialingCode, "")
                        .trim()}`}
                    </span>{" "}
                    for extra security. Please enter it below:
                  </div>
                  <Grid container spacing={2}>
                    {formData.otp.map((value, index) => (
                      <Grid item xs={3} key={`otp_${index}`}>
                        <TextField
                          type="tel"
                          inputRef={otpRefs.current[index]}
                          className="otp-input"
                          variant="outlined"
                          value={value}
                          onChange={handleChange(`otp`, index)}
                          onKeyDown={(e) => handleChange(`otp`, index)(e)}
                          onPaste={handlePaste}
                          InputProps={{
                            style: {
                              fontSize: "2rem",
                              borderColor: isOtpValid
                                ? "#0057FF"
                                : "var(--twotixx-borders-silver)",
                              color: isOtpValid
                                ? "#0057FF"
                                : "var(--Twotixx-Text-Error-Red)",
                              backgroundColor: isOtpValid
                                ? "transparent"
                                : "var(--surface-error-subtle)",
                            },
                            inputProps: {
                              maxLength: 1,
                              style: { textAlign: "center" },
                            },
                          }}
                          error={!isOtpValid}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <div className="otp-timer-attempts">
                    <div className="otp-timer">
                      <span className="label">EXPIRES IN</span>
                      <span className="value">
                        {timeLeft !== null ? formatTime() : "10m"}
                      </span>
                    </div>
                    <div className="otp-attempts">
                      <span className="label">ATTEMPTS LEFT</span>
                      <span className="value">{attemptsLeft}</span>
                    </div>
                  </div>
                  <CommonButton
                    text="Request new code"
                    onClick={() => setIsRegistrationComplete(true)}
                    width="100%"
                    height="46px"
                    fontColor="var(--Primary-Mid-Blue)"
                    backgroundColor="var(--monochrome-white)"
                    borderColor="var(--monochrome-white)"
                  />
                  <div style={{ marginTop: 10 }}>
                    <CommonButton
                      text="Change mobile number"
                      width="100%"
                      height="46px"
                      fontColor="var(--Primary-Mid-Blue)"
                      backgroundColor="var(--monochrome-white)"
                      borderColor="var(--monochrome-white)"
                      onClick={() => {
                        setIsPhoneValid(false);
                        setIsOtpVerified(false);
                        setFormData({ ...formData, phoneNumber: "" });
                        setShowPhoneError(false);
                        setFormData({ ...formData, otp: ["", "", "", ""] });
                      }}
                    />
                  </div>
                </>
              )}
            </div>

            {isMobileVerified &&
              isNewUser &&
              isOtpVerified &&
              !isRegistrationComplete && (
                <>
                  <span className="registration-text1">
                    Let's get you started
                  </span>
                  <p className="registration-text2">
                    It seems you don't have a Twotixx account created yet, so
                    we'll just need some details from you.
                  </p>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <span className={classes.label}>Email address</span>
                      <TextField
                        placeholder="Enter email address"
                        variant="outlined"
                        fullWidth
                        value={formData.email}
                        onChange={handleEmailChange}
                        error={!!emailError}
                        helperText={emailError}
                      />
                    </Grid>
                  </Grid>
                  {showEmailError && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginBottom: "12px",
                      }}
                    >
                      {errorMessage}
                    </div>
                  )}
                  <div
                    style={{
                      height: "1px",
                      backgroundColor: "#DCDFE4",
                      marginBottom: "20px",
                      marginTop: "20px",
                    }}
                  />
                  <label className="cardPaymentCheckCont">
                    <input className="checkboxAgreeUpdates" type="checkbox" />
                    <span>Want to recieve emails from Twotixx? </span>
                  </label>
                  <label className="cardPaymentCheckCont">
                    <input className="checkboxAgreeUpdates" type="checkbox" />
                    <span style={{ marginBottom: "7px", marginTop: "7px" }}>
                      Want to recieve emails from event promoters?{" "}
                    </span>
                  </label>
                  <CommonButton
                    text="Continue"
                    onClick={handleContinueAfterEmail}
                    width="100%"
                    height="46px"
                  />
                </>
              )}

            {isRegistrationComplete && !isEmailVerified && (
              <>
                <span variant="h6" className="otp-verification-title">
                  We've sent you a code
                </span>
                <div variant="body1" className="otp-verification-text">
                  You've been texted a log-in code to{" "}
                  <span
                    style={{
                      color: "#0057FF",
                      display: "inline-block",
                      whiteSpace: "nowrap",
                      fontWeight: "600",
                    }}
                  >
                    {formData.email}
                  </span>{" "}
                  for extra security. Please enter it below:
                </div>
                <Grid container spacing={2}>
                  {formData.otp.map((value, index) => (
                    <Grid item xs={3} key={`otp_${index}`}>
                      <TextField
                        type="tel"
                        inputRef={otpRefs.current[index]}
                        className="otp-input"
                        variant="outlined"
                        value={value}
                        onChange={handleChangeEmailOTP(`otp`, index)}
                        onKeyDown={(e) => handleChangeEmailOTP(`otp`, index)(e)}
                        onPaste={handlePaste}
                        InputProps={{
                          style: {
                            fontSize: "2rem",
                            borderColor: isOtpValid
                              ? "#0057FF"
                              : "var(--twotixx-borders-silver)",
                            color: isOtpValid
                              ? "#0057FF"
                              : "var(--Twotixx-Text-Error-Red)",
                            backgroundColor: isOtpValid
                              ? "transparent"
                              : "var(--surface-error-subtle)",
                          },
                          inputProps: {
                            maxLength: 1,
                            style: { textAlign: "center" },
                          },
                        }}
                        error={!isOtpValid}
                      />
                    </Grid>
                  ))}
                </Grid>
                <div className="otp-timer-attempts">
                  <div className="otp-timer">
                    <span className="label">EXPIRES IN</span>
                    <span className="value">
                      {timeLeft !== null ? formatTime() : "9m 54s"}
                    </span>
                  </div>
                  <div className="otp-attempts">
                    <span className="label">ATTEMPTS LEFT</span>
                    <span className="value">{attemptsLeft}</span>
                  </div>
                </div>
                <CommonButton
                  text="Request new code"
                  onClick={() => setIsRegistrationComplete(true)}
                  width="100%"
                  height="46px"
                  fontColor="var(--Primary-Mid-Blue)"
                  backgroundColor="var(--monochrome-white)"
                  borderColor="var(--monochrome-white)"
                />
              </>
            )}

            {isMobileVerified &&
              isNewUser &&
              isOtpVerified &&
              isEmailVerified && (
                <>
                  <span className="registration-text1">
                    Let's get you started
                  </span>
                  <p className="registration-text2">
                    It seems you don't have a Twotixx account created yet, so
                    we'll just need some details from you.
                  </p>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <span className={classes.label}>First name</span>
                      <TextField
                        placeholder="Enter first name"
                        variant="outlined"
                        fullWidth
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <span className={classes.label}>Last name</span>
                      <TextField
                        placeholder="Enter Last name"
                        variant="outlined"
                        fullWidth
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                      />
                    </Grid>
                  </Grid>
                  <div
                    style={{
                      height: "1px",
                      backgroundColor: "#DCDFE4",
                      marginBottom: "20px",
                      marginTop: "20px",
                    }}
                  />
                  <CommonButton
                    text="Create Account"
                    width="100%"
                    height="46px"
                    onClick={handleRegisterUser}
                  />
                </>
              )}

            {/* {isRegistrationComplete && <PaymentForm />} */}
          </div>

          {/* {isRegistrationComplete && (
            <div className="cardSignedInBottom">
              <label className="signedInAsLabel">
                <input className="signedInCheckBox" type="checkbox" />
                <span className="labelText">
                  Signed in as <b>Joe Bloggs, +44******1234</b>
                </span>
              </label>
              <div className="signInTsPpText">
                Our <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a> applies to all registered users.
              </div>
            </div>
          )} */}
        </div>

        <div className="content-new">
          <div className="supporting-text22">
            <DisclaimerText />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsStepper;
