import EventFormContainer from "../Common/EventFormContainer";
import "./CustomerDetailsStepper.css";
import CommonButton from "../Common/CommonButton";
import {
  TextField,
  Grid,
  Tooltip,
  MenuItem,
  Select,
  FormControl,
  Typography,
  Button,
  Autocomplete,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import cookie from "react-cookies";
import { createCart } from "../../services/api";
import LinearProgress from "@mui/material/LinearProgress";
import "react-toastify/dist/ReactToastify.css";
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
  getDiscountStatus,
  emailInUse,
  getCountryList,
  registerUser,
  sendOTP,
  updateOrder,
  verifyOTP,
  getEventsNearLocation,
  createZeroAmountCheckout,
} from "../../services/api";
import { Twemoji } from "react-emoji-render";
import upArrow from "../../assets/svgs/upArrow.svg";
import downArrow from "../../assets/svgs/downArrow.svg";
import { ReactComponent as DiscountTag } from "../../assets/svgs/DiscountTag.svg";
import { ReactComponent as Close } from "../../assets/svgs/Close.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmailOTP,
  setExistingEmail,
  setMobileOTP,
  setOTP,
  setDefaltCountry,
} from "../../reducers/eventDataReducer";
import { loadStripe } from "@stripe/stripe-js";
import CreateStripeSession from "../../utils/StripeSession";
import DisclaimerText from "../Common/DisclaimerText";
import PaymentForm from "../Common/PaymentForm";
import { toast, ToastContainer } from "react-toastify";

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

const CustomerDetailsStepper = (onContinue) => {
  const location = useLocation();
  let navigate = useNavigate();
  const stepIcons = [
    "/green-tickets.svg",
    "/blue-payment.svg",
    "/black-get-app.svg",
  ];
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openTotalPriceInfo, setOpenTotalPriceInfo] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const tooltipTriggerRef = useRef(null);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const totalPrice = useSelector((state) => state.totalPrice);
  const totalTaxPrize = useSelector((state) => state.Totaltax);
  const totalCount = useSelector((state) => state.totalCount);
  const eventData = useSelector((state) => state.eventData);
  const trackingCode = useSelector((state) => state.trackingCode);
  const { bookingFee, ticketGuardFee, platformFee } = useSelector(
    (state) => state.fees
  );

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
  console.log("ticketTotalsData", ticketTotalsData);

  const defaultCountry = useSelector((state) => state.defaultCountry);
  const enteredOTP = useSelector((state) => state.otp);
  const mobileOTP = useSelector((state) => state.mobileOTP);
  const emailOTP = useSelector((state) => state.emailOTP);
  const totalPrizeOfTickets = useSelector((state) => state.total);
  const cartId = useSelector((state) => state.cartId);
  const [loading, setLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [emailRequestLoading, setEmailRequestLoading] = useState(false);
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
  const [isEmailOtpValid, setIsEmailOtpValid] = useState(true);
  const [isOtpComplete, setIsOtpComplete] = useState(false);
  const [isValidationFailed, setIsValidationFailed] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [newUserMessage, setNewUserMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  // const [resetTimeLeft, setResetTimeLeft] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState();
  const [userDetailes, setUserDetailes] = useState(10);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  // const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedOption, setSelectedOption] = useState("+44");
  const [showDiscountCode, setShowDiscountCode] = useState(true);
  const [isAppliedDiscountCode, setIsAppliedDiscountCode] = useState(false);
  const [discountCodeValue, setDiscountCodeValue] = useState("");
  const [appliedDiscountCode, setAppliedDiscountCode] = useState("");
  const [discountPriceValue, setDiscountPriceValue] = useState(0);
  const [showDiscountError, setShowDiscountError] = useState(false);

  const dropdownRef = useRef(null);
  const topRef = useRef(null);

  const otpRefs = useRef([createRef(), createRef(), createRef(), createRef()]);

  const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  //actual regex for mobile number
  const mobileNumberReg = /^[0-9]{6,15}$/;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, dropdownRef]);

  useEffect(() => {
    fetchIP();
    console.log("eventData65363456", eventData);
    
  }, []);
  const clearOtpFields = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      otp: ["", "", "", ""],
    }));
  };

  const fetchIP = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      fetchEventsNearLocation(data.ip);
    } catch (error) {
      console.error("Failed to fetch IP address:", error);
    }
  };

  const fetchEventsNearLocation = async (ipAddress) => {
    try {
      const eventsNearLocation = await getEventsNearLocation(ipAddress);
      if (
        eventsNearLocation?.response?.isIPBasedEvent === true &&
        eventsNearLocation?.response?.events[0]?.venue?.address?.city
      ) {
        dispatch(
          setDefaltCountry(eventsNearLocation?.response?.countryDetails)
        );
      }
    } catch (error) {
      console.error("Error fetching events near location:", error);
    }
  };

  const handleContinueClick = async () => {
    startCountdown(10 * 60);
    setIsPhoneValid(false);
    setShowPhoneError(false);
    setErrorMessage("");
    if (mobileNumberReg.test(formData?.phoneNumber)) {
      try {
        const selectedValueId = countryList.find(
          (country) => country?.dialingCode === selectedValue?.value
        )?.id;

        const response = await sendOTP({
          emailAddress: "",
          mobileNumber: {
            countryId: selectedValueId,
            countryCode: selectedValue?.dialingCode.toString(),
            number: formData?.phoneNumber,
          },
          isMobile: true,
        });
        console.log("response😊", response);
        if (response?.response?.success) {
          setAttemptsLeft(response?.response?.retryAttemptsRemaining);
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
    }
  };

  const mobileOTPResend = async () => {
    if (mobileNumberReg.test(formData?.phoneNumber)) {
      setRequestLoading(true);
      try {
        const selectedValueId = countryList.find(
          (country) => country?.dialingCode === selectedValue?.value
        )?.id;

        const response = await sendOTP({
          emailAddress: "",
          mobileNumber: {
            countryId: selectedValueId,
            countryCode: selectedValue?.dialingCode.toString(),
            number: formData?.phoneNumber,
          },
          isMobile: true,
        });
        console.log("response", response);

        if (response?.response?.success) {
          console.log("OTP sent successfully:", response?.response);
          setIsOtpValid(true);
          clearOtpFields();
          toast.success("OTP sent successfully");
          setIsPhoneValid(true);
          setIsOtpVerified(false);
          setIsRegistrationComplete(false);
          // setTimeLeft(10 * 60);
          startCountdown(10 * 60);
          setAttemptsLeft(response?.response?.retryAttemptsRemaining);
        } else {
          setShowPhoneError(true);
          setErrorMessage(
            "Error sending OTP: " + response?.response?.errorMessage
          );
          toast.error(response?.response?.errorMessage);
        }
      } catch (error) {
        console.error("Error sending OTP catch:", error);
        setShowPhoneError(true);
        setErrorMessage("Oops, something went wrong. Please try again later.");
      } finally {
        setRequestLoading(false);
      }
    } else {
      setShowPhoneError(true);
      setErrorMessage("Please enter a valid mobile number.");
    }
  };

  // const enabled = resetTimeLeft !== null && resetTimeLeft > 0;

  useEffect(() => {
    if (mobileNumberReg.test(formData?.phoneNumber)) {
      setShowPhoneError(false);
    }
  }, [formData?.phoneNumber]);

  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    const fetchCountryList = async () => {
      try {
        const result = await getCountryList();
        if (result.status && result.response) {
          console.log("countrylistinseller", result.response);
          setCountryList(result.response);
          //       const defaultCountry = result.response.find(
          //         (country) => country.name === "United Kingdom"
          //       );
          //       if (defaultCountry) {
          //         setSelectedOption(
          //           `+${defaultCountry.dialingCode}`
          //         );
          // setSelectedValue(defaultCountry);

          //       }
        }
      } catch (error) {
        console.error("Error fetching country list:", error);
      }
    };

    setSelectedValue(defaultCountry);
    setSelectedOption(`+${defaultCountry.dialingCode}` || "+44");
    console.log("defaultCountry", defaultCountry);

    fetchCountryList();
  }, [defaultCountry]);

  const handleOptionClick = (country) => {
    console.log("country😊", country);
    setSelectedOption(`+${country.dialingCode}`);
    // setSelectedCountry(country);
    setSelectedValue(country);

    setIsOpen(false);
  };

  // useEffect(() => {
  //   const fetchCountryList = async () => {
  //     const result = await getCountryList();
  //     if (result?.status && result?.response) {
  //       console.log('result.response', result?.response)
  //       const mappedCountryList = result.response.map((country) => ({
  //         dialingCode: country?.dialingCode,
  //         flagUrl: country?.flag,
  //         name: country?.name,
  //         id: country?.id,
  //       }));
  //       console.log("mappedCountryList", mappedCountryList);
  //       setCountryList(mappedCountryList);
  //     }
  //   };

  //   fetchCountryList();
  // }, []);

  const startCountdown = (duration) => {
    setTimeLeft(duration);
  };

  useEffect(() => {
    let timer;
    if (timeLeft !== null) {
      if (timeLeft > 0) {
        timer = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
      } else {
        setTimeLeft(null);
      }
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  // useEffect(() => {
  //   let resetTimer;
  //   if (resetTimeLeft !== null && resetTimeLeft > 0) {
  //     resetTimer = setInterval(() => {
  //       setResetTimeLeft(resetTimeLeft - 1);
  //     }, 1000);
  //   } else if (resetTimeLeft === 0) {
  //     setResetTimeLeft(null);
  //   }
  //   return () => clearInterval(resetTimer);
  // }, [resetTimeLeft]);

  // const resetFormatTime = () => {
  //   const minutes = Math.floor(resetTimeLeft / 60);
  //   const seconds = resetTimeLeft % 60;
  //   return `${minutes}m ${seconds}s`;
  // };

  const formatTime = () => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    return `${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;
  };

  const handleContinueAfterEmail = async () => {
    startCountdown(10 * 60);
    setShowEmailError(false);
    setErrorMessage("");
    if (emailReg.test(formData.email)) {
      try {
        const selectedValueId = countryList.find(
          (country) => country.dialingCode === selectedValue?.dialingCode
        )?.id;

        const response = await sendOTP({
          emailAddress: formData?.email,
          mobileNumber: {
            countryId: selectedValueId,
            countryCode: selectedValue?.dialingCode.toString(),
            number: formData?.phoneNumber,
          },
          // mobilePasswordOneTimeCode: enteredOTP,
          isMobile: false,
        });

        console.log("response435435", response);
        setAttemptsLeft(response?.response?.retryAttemptsRemaining);
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

  const emailOTPResend = async () => {
    if (emailReg.test(formData.email)) {
      setEmailRequestLoading(true);
      try {
        const selectedValueId = countryList.find(
          (country) => country.dialingCode === selectedValue?.dialingCode
        )?.id;

        const response = await sendOTP({
          emailAddress: formData?.email,
          mobileNumber: {
            countryId: selectedValueId,
            countryCode: selectedValue?.dialingCode.toString(),
            number: formData?.phoneNumber,
          },
          // mobilePasswordOneTimeCode: enteredOTP,
          isMobile: false,
        });

        if (response?.response?.success) {
          setIsRegistrationComplete(true);
          setIsOtpValid(true);
          toast.success("OTP sent successfully");
          startCountdown(10 * 60);
          setAttemptsLeft(response?.response?.retryAttemptsRemaining);
        } else {
          setShowEmailError(true);
          setErrorMessage("Email error: " + response?.response?.errorMessage);
          setEmailError(response?.message);
          toast.error(response?.response?.errorMessage);
        }
      } catch (error) {
        console.log("Error registering user:", error);
        setShowEmailError(true);
        setEmailError("Oops, something went wrong. Please try again later.");
      } finally {
        setEmailRequestLoading(false);
      }
    } else {
      setShowEmailError(true);
      setEmailError("Invalid email address. Please enter a valid email.");
    }
  };
  console.log("countryList", countryList);

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
            } else {
              // OTP is complete, blur the last input field
              setTimeout(() => otpRefs.current[index].current.blur(), 0);
            }
          }
        }

        setFormData({ ...formData, otp: newOtp });

        const complete = newOtp.every((val) => val.trim() !== "");
        setIsOtpComplete(complete);

        const isValid = newOtp.every((digit) => digit.match(/^[0-9]$/));
        setIsOtpValid(isValid);

        if (complete) {
          const valid = newOtp.every((digit) => digit.match(/^[0-9]$/));
          setIsOtpValid(valid);
          if (valid) {
            handleVerifyMobileOTP(newOtp.join(""));
            setIsValidationFailed(false);
          } else {
            setIsValidationFailed(true);
          }
        } else {
          setIsOtpValid(true);
          setIsValidationFailed(false);
        }
      }
    };

  function maskMobileNumber(mobileNumber) {
    if (!mobileNumber) return "";
    const [countryCode, ...rest] = mobileNumber.split("-");
    const maskedNumber = `${countryCode}-******${rest[0].slice(-4)}`;
    return maskedNumber;
  }

  const handleVerifyMobileOTP = async (enteredOTP) => {
    try {
      const selectedValueId = countryList.find(
        (country) => country.dialingCode === selectedValue.dialingCode
      )?.id;

      const isMobile = true;
      const emailAddress = "";
      console.log("selectedValue", selectedValue);

      const response = await verifyOTP({
        emailAddress,
        mobileNumber: {
          countryId: selectedValueId,
          countryCode: selectedValue?.dialingCode.toString(),
          number: formData?.phoneNumber,
        },
        isMobile,
        otp: enteredOTP,
      });

      if (response?.response?.success) {
        console.log("Mobile OTP verified successfully:", response);
        console.log("firstttttttttttt", response?.response?.userDetails);

        setUserDetailes(response?.response?.userDetails);

        const userDetails = response?.response?.userDetails;
        // if (userDetails) {
        localStorage.setItem("LoginuserDetails", JSON.stringify(userDetails));
        // }

        setIsOtpValid(true);
        setIsOtpVerified(true);
        dispatch(setMobileOTP(enteredOTP));
        console.log("mobileUpdatedOTP", enteredOTP);
        setFormData((prevState) => ({ ...prevState, otp: ["", "", "", ""] }));

        setIsMobileVerified(true);
        const totalSum = ticketTotalsData.reduce((acc, ticket) => acc + ticket.total, 0);
        if(totalSum === 0)
        {
          handleCreateZeroAmountCheckout(response?.response?.userDetails);
        }
        else
        {
          setIsNewUser(response?.response?.isNewUser || false);
        }
        const isNewUser = response?.response?.jwtToken;
        if (isNewUser) {
          localStorage.setItem("isNewUserJwtToken", isNewUser.toString());
        }

        if (response?.response?.isNewUser) {
          setNewUserMessage("User already esixst please retry with new number");
        }
      } else {
        setIsOtpValid(false);
        if (attemptsLeft > 0) {
          setAttemptsLeft((prev) => prev - 1);
        } else {
          setAttemptsLeft(response?.response?.retryAttemptsRemaining);
        }
      }
    } catch (error) {
      setIsOtpValid(false);
      setErrorMessage("Oops, something went wrong. Please try again later.");
      otpRefs?.current[0].current?.focus();
    }
  };

  const handleCreateZeroAmountCheckout = async (userInfo) => {

    console.log("userInfo:::", userInfo);

    try {
      const params = {
        emailAddress: userInfo?.emailAddress,
        userId: userInfo?.id,
        cartId: cartId,
        stripeAccountId: eventData[0]?.eventUserDetails?.stripeAccountId,
        discountCode: '',
        discountAmount: 0,
      };

      console.log("params:::", params);

      const response = await createZeroAmountCheckout(params);

      if (response?.response) {
        localStorage.setItem(
          "successUserDetails",
          JSON.stringify(userInfo)
        );
        setCookie("successUserDetails", JSON.stringify(userInfo), 7);
        localStorage.setItem(
          "successEventDetails",
          JSON.stringify(eventData)
        );
        setCookie("successEventDetails", JSON.stringify(eventData), 7);
        navigate(`/success`)
      } else {
        console.log(
          "response?.response?.errorMessage",
          response?.response?.errorMessage
        );
        toast.error(response?.response?.errorMessage);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/;SameSite=None;Secure`;
    console.log("User details saved to cookie:", value);
  };

  // useEffect(() => {
  //   const options = countryList.map((country) => ({
  //     label: `${country?.flagUrl}  +${country?.dialingCode}`,
  //     // value: `${country?.flagUrl} +${country?.dialingCode}`,
  //     dialingCode: `${country?.dialingCode}`,
  //     // value: `${selectedValue.flagUrl} +${selectedValue.dialingCode}`,
  //   }));
  //   console.log("optionssssssssssss", options);
  //   setOptions(options);
  // }, [countryList]);

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
            } else {
              setTimeout(() => otpRefs.current[index].current.blur(), 0);
            }
          }
        }

        setFormData({ ...formData, otp: newOtp });

        const isComplete = newOtp.every((val) => val.trim() !== "");
        setIsOtpComplete(isComplete);
        // setFormData({ ...formData, otp: newOtp });
        const isValid = newOtp.every((digit) => digit.match(/^[0-9]$/));
        setIsOtpValid(isValid);

        // if (isComplete) {
        //   handleVerifyEmailOTP(newOtp.join(""));
        // }
        if (isComplete) {
          const valid = newOtp.every((digit) => digit.match(/^[0-9]$/));
          setIsOtpValid(valid);
          if (valid) {
            handleVerifyEmailOTP(newOtp.join(""));
            setIsValidationFailed(false);
          } else {
            setIsValidationFailed(true);
          }
        } else {
          setIsOtpValid(true);
          setIsValidationFailed(false);
        }
      }
    };

  const handleVerifyEmailOTP = async (enteredOTP) => {
    try {
      const selectedValueId = countryList.find(
        (country) => country.dialingCode === selectedValue.dialingCode
      )?.id;

      const isMobile = false;
      const emailAddress = formData.email;

      const response = await verifyOTP({
        emailAddress,
        mobileNumber: {
          countryId: selectedValueId,
          countryCode: selectedValue?.dialingCode.toString(),
          number: formData?.phoneNumber,
        },
        isMobile,
        otp: enteredOTP,
      });

      if (response?.response?.success) {
        console.log("Email OTP verified successfully:", response);
        setIsOtpValid(true);
        setIsOtpVerified(true);
        dispatch(setEmailOTP(enteredOTP));
        console.log("emailUpdatedOTP", enteredOTP);
        setFormData((prevState) => ({ ...prevState, otp: ["", "", "", ""] }));
        setIsEmailVerified(true);
        const isNewUser = response?.response?.jwtToken;
        if (isNewUser) {
          localStorage.setItem("isNewUserJwtToken", isNewUser.toString());
        }
        setIsNewUser(response?.response?.isNewUser || false);
        if (response?.response?.isNewUser) {
          setNewUserMessage("User already esixst please retry with new email");
        }
      } else {
        setIsOtpValid(false);
        if (attemptsLeft > 0) {
          setAttemptsLeft((prev) => prev - 1);
        } else {
          setAttemptsLeft(response?.response?.retryAttemptsRemaining);
        }
        // setAttemptsLeft((prev) => prev - 1);
        // setErrorMessage(
        //   "Error verifying Email OTP: " + response?.response?.errorMessage
        // );
        // otpRefs.current[0].current.focus();
      }
    } catch (error) {
      console.error("Error verifying Email OTP:", error);
      setIsOtpValid(false);
      setAttemptsLeft((prev) => prev - 1);
      setErrorMessage("Oops, something went wrong. Please try again later.");
      otpRefs.current[0].current.focus();
    }
  };

  const handleRegisterUser = async (mobileOTP, emailOTP) => {
    if (emailReg.test(formData.email)) {
      const requestData = {
        emailAddress: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobileNumber: {
          countryId: selectedValue.id,
          countryCode: selectedValue.dialingCode.toString(),
          number: parseInt(formData.phoneNumber, 10),
        },
        mobilePasswordOneTimeCode: mobileOTP,
        emailPasswordOneTimeCode: emailOTP,
      };

      console.log("Request Data:", requestData);

      try {
        const response = await registerUser(requestData);
        if (response.response.success) {
          setIsRegistrationComplete(true);
          setIsNewUser(false);
          localStorage.setItem(
            "LoginuserDetails",
            JSON.stringify(response?.response?.userDetails)
          );
          setUserDetailes(response?.response?.userDetails);
          console.log("User registered successfully:", response);
        } else {
          console.log(
            "Registration failed:Registration failed:",
            response.response.errorMessage
          );
          toast.error(response.response.errorMessage);
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    } else {
      console.log("Invalid input data or missing OTPs.");
    }
  };
  console.log("isRegistrationComplete", isRegistrationComplete);

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    if (value === "" || /^[0-9]*$/.test(value)) {
      setFormData({ ...formData, phoneNumber: value });
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
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
      // Check if OTP is complete
      const isOtpComplete = newOtp.every((val) => val.trim() !== "");
      if (isOtpComplete) {
        handleVerifyMobileOTP(newOtp.join(""));
      }

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

  const handleEmailPaste = (e) => {
    e.preventDefault();
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
      const isOtpComplete = newOtp.every((val) => val.trim() !== "");
      if (isOtpComplete) {
        handleVerifyEmailOTP(newOtp.join(""));
      }

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
        setIsOpen(false);
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
    const firstTicketTypeWithCurrency = allTicketTypes.find(
      (tt) => tt?.ticketPrice?.currency?.symbol
    );
    return firstTicketTypeWithCurrency?.ticketPrice?.currency?.symbol || "";
  };

  const renderTicketDetails = () => {
    return ticketTotalsData
      ?.filter((ticketType) => ticketType.count > 0)
      .map((ticketType) => {
        // console.log('ticketType', ticketType)
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
              {totalPrizeOfTickets === 0 ? '0' : discountedTotal.toFixed(2)}
            </div>
          </div>
        );
      });
  };
  console.log("isEmailVerified", isEmailVerified);
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
      orderTotal: discountPriceValue
        ? totalPrice - discountPriceValue
        : totalPrice,
      orderItems: ticketTotalsData.map((ticketType) => ({
        eventTicketTypeId: ticketType.ticketTypeId,
        quantity: ticketType.count,
        bookingFee: ticketType.bookingFee,
        price: ticketType.price,
        total: discountPriceValue
          ? totalPrice - discountPriceValue
          : totalPrice,
      })),
    };

    try {
      const orderResponse = await createOrder(orderParams);

      console.log("====================================");
      console.log("order params", orderParams);
      console.log("====================================");

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

  const getDiscountStatusRequest = async () => {
    const orderParams = {
      emailAddress: "",
      eventId: eventData[0]?.id,
      trackingCode: trackingCode,
      discountCode: discountCodeValue,
      currencyId: allTicketTypes[0]?.ticketPrice?.currency?.id,
      orderTotal: totalPrice,
      orderItems: ticketTotalsData
      .filter(ticketType => ticketType.count > 0) // Filter out ticket types with quantity > 0
      .map((ticketType) => ({
        eventTicketTypeId: ticketType.ticketTypeId,
        quantity: ticketType.count,
        bookingFee: ticketType.bookingFee,
        price: ticketType.price,
        total: totalPrice,
      })),
      discountAmount: 0,
    };

    setAppliedDiscountCode(discountCodeValue);

    try {
      const orderResponse = await getDiscountStatus(orderParams);
      if (orderResponse && orderResponse.status && orderResponse.response) {
        setIsAppliedDiscountCode(true);
        setDiscountPriceValue(orderResponse.response);
        setShowDiscountError(false);
      } else {
        setShowDiscountError(true);
        setIsAppliedDiscountCode(false);
        setDiscountPriceValue(0);
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
  useEffect(() => {
    isPhoneValid &&
      !isOtpVerified &&
      !isRegistrationComplete &&
      setTimeout(() => otpRefs.current[0].current.focus(), 0);
  }, [
    isPhoneValid,
    isRegistrationComplete,
    isRegistrationComplete,
    requestLoading,
  ]);

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

            {showDiscountCode ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    marginTop: "32px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <input
                    style={{
                      marginRight: "8px",
                      height: "48px",
                      outline: "none",
                    }}
                    className="form-control"
                    type="tel"
                    placeholder="Discount code"
                    value={discountCodeValue}
                    onChange={(e) => setDiscountCodeValue(e.target.value)}
                  />

                  <CommonButton
                    fontSize={16}
                    text="Apply"
                    width="79px"
                    height="48px"
                    onClick={() =>
                      discountCodeValue?.trim() !== "" &&
                      getDiscountStatusRequest()
                    }
                  />
                </div>
                {showDiscountError ? (
                  <div
                    style={{
                      marginTop: 12,
                      color: "red",
                      fontSize: 14,
                      marginBottom: 24,
                    }}
                  >
                    Invalid discount code
                  </div>
                ) : null}

                {isAppliedDiscountCode ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className="discount-tag-container">
                      <DiscountTag />
                      <span className="discount-tag-code-text">
                        {appliedDiscountCode}
                      </span>
                      <Close
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setIsAppliedDiscountCode(false);
                          setDiscountCodeValue("");
                          setAppliedDiscountCode("");
                        }}
                      />
                    </div>

                    <img className="divider-icon1" alt="" src="/divider1.svg" />

                    <div className="discount-code-price-summary-container">
                      <span className="discount-tag-price-text">Subtotal:</span>
                      <span
                        style={{ color: "var(--Primary-Mid-Blue)" }}
                        className="discount-tag-price-text"
                      >
                        {getCurrencySymbol()}
                        {eventData[0]?.currency?.symbol}
                        {totalPrizeOfTickets.toFixed(2)}
                      </span>
                    </div>

                    <div
                      style={{ marginTop: "-8px" }}
                      className="discount-code-price-summary-container"
                    >
                      <span className="discount-tag-price-text">Discount:</span>
                      <span
                        style={{ color: "var(--Primary-Mid-Blue)" }}
                        className="discount-tag-price-text"
                      >
                        -{getCurrencySymbol()}
                        {eventData[0]?.currency?.symbol}
                        {discountPriceValue.toFixed(2)}
                      </span>
                    </div>

                    <div
                      style={{
                        background: "var(--Twotixx-Text-Ice-White)",
                        alignSelf: "flex-end",
                        marginTop: "-20px",
                        marginBottom: 20,
                      }}
                      className="discount-tag-container"
                    >
                      <DiscountTag />
                      <span className="discount-tag-code-text">
                        {appliedDiscountCode}
                      </span>
                    </div>

                    <img className="divider-icon1" alt="" src="/divider1.svg" />
                  </div>
                ) : null}
              </div>
            ) : null}

            <div
              // className="row3 totalIncl-block"
              className="total-price-summary-container"
              style={{ marginTop: 15, justifyContent: "start" }}
            >
              <div
                className="total-price-row-container"
                // className="text11 totalValue-lft"
              >
                Total:
                <span
                  style={{
                    paddingRight: "8px",
                    color: "var(--Primary-Mid-Blue)",
                  }}
                  className="totalValue"
                >
                  {/* {getCurrencySymbol()} */}
                  {eventData[0]?.currency?.symbol}
                  {discountPriceValue
                    ? parseFloat(totalPrizeOfTickets -
                      discountPriceValue).toFixed(2)
                    : totalPrizeOfTickets.toFixed(2)}
                </span>
              </div>

              <div
                className="supporting-text21"
                style={{
                  color: "var(--Primary-Mid-Blue)",
                  alignSelf: "flex-end",
                }}
              >
                <span
                  style={{
                    color: "var(--body-title)",
                    fontSize: 14,
                    fontWeight: 400,
                    paddingRight: 8,
                  }}
                >
                  {/* <div
                  style={{ color: "#767676", fontSize: 14, fontWeight: 400 }}
                > */}
                  {/* {`( 
                  inc. ${eventData[0]?.currency?.symbol}${totalTaxPrize.toFixed(
                    2
                    // )} of fees )`}
                  )} of fees)`} */}
                  (incl. of all fees)
                  {/* <Tooltip
                    title={
                      <div
                        className={classes.tooltipContent}
                        style={{ padding: "6px" }}
                      >
                        The listed ticket price includes fees:
                        <div className={classes.bookingFeeText}>
                          Booking fee: {getCurrencySymbol()}
                          {bookingFee.toFixed(2)}
                        </div>
                        <div className={classes.ticketGuardFeeText}>
                          TicketGuard™ fee: {getCurrencySymbol()}
                          {ticketGuardFee.toFixed(2)}
                        </div>
                        <div className={classes.platformFeeText}>
                          Platform fee: {getCurrencySymbol()}
                          {platformFee.toFixed(2)}
                        </div>
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
                  </Tooltip> */}
                  {/* </div> */}
                </span>
                {/* <span
          style={{
            fontSize: "16px",
            fontWeight: "var(--font-w-400)",
            color: "var(--twotixx-text-midnight-blue)",
          }}
        >
          | {totalCount} items
        </span> */}
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
          {/* Mobile no adding section */}
          {/* <div className="abc"> */}

          {!isPhoneValid && (
            <div className="content11Box">
              <div className="customer-verification">STEP 1: VERIFICATION</div>
              <div className="text12">Enter your mobile number</div>
              <span className="mobile-verification-content">
                Your mobile number is required to verify your account and
                protect your tickets.
              </span>{" "}
              <p className="mobile-verification-label">Mobile number</p>
              <div className="phone-input-container big-input-static">
                <div className="phoneNoCont">
                  <div className="dropdown-style" ref={dropdownRef}>
                    <div
                      className={`dropdown-toggle ${isOpen ? "active" : ""}`}
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <div
                        style={{
                          paddingTop: 2,
                          display: "flex",
                          flexDirection: "row",
                          marginRight: "6px",
                        }}
                      >
                        {selectedValue && selectedValue.flag ? (
                          <Twemoji text={selectedValue.flag} />
                        ) : (
                          <Twemoji text={"\uD83C\uDDEC\uD83C\uDDE7"} />
                        )}
                      </div>
                      {selectedOption}
                      {/* <span className="currency-dropdown">
                            <img src={isOpen ? upArrow : downArrow} alt="Toggle Icon" />
                          </span> */}
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
                                  style={{ marginRight: "7px" }}
                                  text={country.flag}
                                />
                                {`+${country.dialingCode}`}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  <input
                    style={{ marginBottom: 0 }}
                    className="form-control"
                    type="tel"
                    placeholder="Mobile number"
                    value={formData.phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                </div>
              </div>
              {/* 
                    <Autocomplete className="selector-info"
                      disablePortal
                      id="combo-box-demo"
                      options={options}
                      onChange={handleAutocompleteChange}
                      value={selectedValue}
                      sx={{ border: "none" }}
                      renderInput={(params) => (
                        <TextField {...params} label="code +" />
                      )}
                    /> */}
              {/* </div> */}
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
                  color: "#0D2244",
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
              <div
                className="continew-btn"
                style={{ margin: "32px auto 0", display: "table" }}
              >
                <CommonButton
                  text="Continue"
                  width="360px"
                  height="48px"
                  onClick={handleContinueClick}
                />
              </div>
            </div>
          )}

          {/* OTP VERIFICATION section for mobile*/}

          {isPhoneValid && !isOtpVerified && !isRegistrationComplete && (
            <div className="content11Box">
              <div className="customer-verification">STEP 1: VERIFICATION</div>
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
                  {`+${selectedValue.dialingCode} ${formData.phoneNumber
                    .replace("+" + selectedValue.dialingCode, "")
                    .trim()}`}
                </span>{" "}
                for extra security. Please enter it below:
              </div>
              <>
                <Grid container spacing={2}>
                  {formData.otp.map((value, index) => (
                    <Grid item xs={3} key={`otp_${index}`}>
                      <TextField
                        type="tel"
                        inputRef={otpRefs.current[index]}
                        className="otp-input"
                        variant="outlined"
                        value={value}
                        onChange={handleChange("otp", index)}
                        onKeyDown={(e) => handleChange("otp", index)(e)}
                        onPaste={handlePaste}
                        InputProps={{
                          style: {
                            fontSize: "2rem",
                            borderColor:
                              isOtpComplete && !isOtpValid
                                ? "var(--Twotixx-Text-Error-Red)"
                                : "#0057FF",
                            color:
                              isOtpComplete && !isOtpValid
                                ? "var(--Twotixx-Text-Error-Red)"
                                : "#0057FF",
                            backgroundColor:
                              isOtpComplete && !isOtpValid
                                ? "var(--surface-error-subtle)"
                                : "transparent",
                          },
                          inputProps: {
                            maxLength: 1,
                            style: { textAlign: "center" },
                            disabled: attemptsLeft === 0,
                          },
                        }}
                        error={isOtpComplete && !isOtpValid}
                      />
                    </Grid>
                  ))}
                </Grid>
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginTop: "15px",
                    textAlign: "center",
                  }}
                >
                  {newUserMessage || errorMessage}
                </div>
              </>

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
              <div>
                {requestLoading && <LinearProgress />}
                <CommonButton
                  text="Request new code"
                  onClick={mobileOTPResend}
                  width="100%"
                  height="46px"
                  fontColor={"var(--Primary-Mid-Blue)"}
                  backgroundColor="var(--monochrome-white)"
                  borderColor="var(--monochrome-white)"
                />
              </div>

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
                    setIsOtpComplete(false);
                    setIsOtpValid(true);
                    setFormData({ ...formData, phoneNumber: "" });
                    setShowPhoneError(false);
                    setFormData({ ...formData, otp: ["", "", "", ""] });
                  }}
                />
              </div>
            </div>
          )}

          {/* {!isNewUser &&
               ( */}
          {isMobileVerified &&
            isNewUser &&
            isOtpVerified &&
            !isRegistrationComplete && (
              <div className="content11Box">
                {/* <div className="customer-verification">
                  STEP 2: REGISTRATION
                </div> */}
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
                  <input style={{border: 'none'}} className="checkboxAgreeUpdates" type="checkbox" />
                  <span>Want to recieve emails from Twotixx? </span>
                </label>
                <label className="cardPaymentCheckCont">
                  <input style={{border: 'none'}} className="checkboxAgreeUpdates" type="checkbox" />
                  <span style={{ marginBottom: "7px", marginTop: "7px" }}>
                    Want to recieve emails from event promoters?{" "}
                  </span>
                </label>
                <div
                  className="continue-btn"
                  style={{ margin: "32px auto 0", display: "table" }}
                >
                  <CommonButton
                    text="Continue"
                    onClick={handleContinueAfterEmail}
                    width="360px"
                    height="46px"
                  />
                </div>
              </div>
            )}

          {isRegistrationComplete && !isEmailVerified && (
            <div className="content11Box">
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
              <>
                {/* <Grid container spacing={2}>
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
                        onPaste={handleEmailPaste}
                        InputProps={{
                          style: {
                            fontSize: "2rem",
                            borderColor:
                              isOtpComplete && !isOtpValid
                                ? "var(--Twotixx-Text-Error-Red)"
                                : "#0057FF",
                            color:
                              isOtpComplete && !isOtpValid
                                ? "var(--Twotixx-Text-Error-Red)"
                                : "#0057FF",
                            backgroundColor:
                              isOtpComplete && !isOtpValid
                                ? "var(--surface-error-subtle)"
                                : "transparent",
                          },
                          inputProps: {
                            maxLength: 1,
                            style: { textAlign: "center" },
                            disabled: attemptsLeft === 0,
                          },
                        }}
                        error={isOtpComplete && !isOtpValid}
                      />
                    </Grid>
                  ))}
                </Grid> */}
              </>

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

              {emailRequestLoading && <LinearProgress />}
              <CommonButton
                text="Request new code"
                onClick={emailOTPResend}
                width="100%"
                height="46px"
                fontColor="var(--Primary-Mid-Blue)"
                backgroundColor="var(--monochrome-white)"
                borderColor="var(--monochrome-white)"
              />
            </div>
          )}

          {isMobileVerified &&
            isNewUser &&
            isOtpVerified &&
            isEmailVerified && (
              <div className="content11Box">
                <div className="customer-verification">
                  STEP 2: REGISTRATION
                </div>
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
                    <span
                      className={classes.label}
                      style={{ color: "rgba(0, 35, 102, 1)" }}
                    >
                      Last name
                    </span>
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
                  onClick={() => handleRegisterUser(mobileOTP, emailOTP)}
                />
              </div>
            )}
          {/* </div> */}

          {!isNewUser ? (
            <>
              <div className="content11Box contentBorder">
                <PaymentForm refundsAllowed={eventData[0]?.refundsAllowed}
                  discountCode={discountPriceValue ? discountCodeValue : null}
                  discountPrice={discountPriceValue ? discountPriceValue : null}
                />
              </div>
              <div className="cardSignedInBottom">
                <label className="signedInAsLabel">
                  {/* <input className="signedInCheckBox" type="checkbox" /> */}
                  <span className="labelText">
                    Signed in as{" "}
                    <b>
                      {userDetailes?.firstName || ""}, +
                      {maskMobileNumber(
                        userDetailes?.mobileNumber?.fullNumber
                      ) || ""}
                    </b>
                  </span>
                </label>
                {/* <div className="signInTsPpText">
                  Our <a href="#">Terms of Service</a> and{" "}
                  <a href="#">Privacy Policy</a> applies to all registered
                  users.
                </div> */}
              </div>
            </>
          ) : null}
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
