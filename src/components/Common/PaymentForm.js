import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./PaymentForm.css";
import CommonButton from "./CommonButton";
import { useNavigate, useParams } from "react-router-dom";
import { getEventDetails, createPayment } from "../../services/api";
import { toast } from "react-toastify";
function PaymentForm({ discountCode, discountPrice, refundsAllowed }) {
  let navigate = useNavigate();
  const [eventData, setEventData] = useState("");
  console.log("eventData434", eventData?.response?.[0]);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    postcode: "",
  });
  const cartId = useSelector((state) => state.cartId);
  const [userDetailes, setUserDetailes] = useState(null);
  const getEventData = useSelector((state) => state.eventData);
  console.log("getEventData", getEventData);
  const { id } = useParams();
  const [agreeToUpdates, setAgreeToUpdates] = useState(false);
  const [agreeToRefundPolicy, setAgreeToRefundPolicy] = useState(false);

  const handleChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };
  const myRef = useRef(null);
  const handleToggleUpdates = () => {
    setAgreeToUpdates(!agreeToUpdates);
  };
  const handleToggleUpdatesAgreeToRefundPolicy = () => {
    setAgreeToRefundPolicy(!agreeToRefundPolicy);
  };

  useLayoutEffect(() => {
    if (myRef.current) {
      myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", cardDetails, agreeToUpdates);
  };
  useEffect(() => {
    const storedUserDetails = localStorage.getItem("LoginuserDetails");
    let userDetailsObject;
    try {
      if (storedUserDetails) {
        userDetailsObject = JSON.parse(storedUserDetails);
        console.log("userDetailsObject", userDetailsObject);
        setUserDetailes(userDetailsObject);
      } else {
        console.log("No user details found in localStorage");
      }
    } catch (e) {
      console.error("Error parsing storedUserDetails:", e);
      userDetailsObject = {}; // Provide a default value in case of error
    }
  }, []);

  useEffect(() => {
    if (userDetailes) {
      console.log("userDetailes", userDetailes);
    }
  }, [userDetailes]);

  const handlePayNowClick = async () => {
    try {
      const params = {
        emailAddress: userDetailes?.emailAddress,
        userId: userDetailes?.id,
        cartId: cartId,
        stripeAccountId: getEventData[0]?.eventUserDetails?.stripeAccountId,
        discountCode: discountCode,
        discountAmount: discountPrice,
      };
      const response = await createPayment(params);

      if (response?.response?.success) {
        console.log("payment  successfully:", response?.response);
        localStorage.setItem(
          "successUserDetails",
          JSON.stringify(userDetailes)
        );
        setCookie("successUserDetails", JSON.stringify(userDetailes), 7);
        localStorage.setItem(
          "successEventDetails",
          JSON.stringify(getEventData)
        );
        setCookie("successEventDetails", JSON.stringify(getEventData), 7);
        window.location.href = response?.response.url;
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

  useEffect(() => {
    const fetchEventData = async (params) => {
      try {
        // const trackingCode = params.get("utm");
        const result = await getEventDetails(id);
        console.log("result😊", result);
        setEventData(result);
      } catch (error) {
        console.error("Failed to fetch cities", error);
      }
    };

    fetchEventData();
  }, []);

  return (
    <div className="customer-verification" ref={myRef}>
      <div className="payment-form-container paymentCardCont">
        <span className="paymentTopStep">
          STEP 2: PAYMENT
          <span className="cardIconsCont">
            <img
              className="cardIcon icon1"
              src="/card-icon1.svg"
              alt="Card Icon"
            />
            <img
              className="cardIcon icon2"
              src="/card-icon2.svg"
              alt="Card Icon"
            />
            <img
              className="cardIcon icon3"
              src="/card-icon3.svg"
              alt="Card Icon"
            />
          </span>
        </span>
        <h2 className="titleCont">Pay with Stripe</h2>
        <p className="subTitleCont">
          Complete your order securely with Stripe. Upon completion, we will
          instruct you on what to do next.
        </p>
        <form onSubmit={handleSubmit}>
          <label style={{ marginTop: "16px" }} className="cardPaymentCheckCont">
            <input
              style={{ border: "none" }}
              className="checkboxAgreeUpdates"
              type="checkbox"
              checked={agreeToUpdates}
              onChange={handleToggleUpdates}
            />
            {/* <span>I accept the Terms of Service and Privacy Policy of Twotixx.
              Want to receive updates from {getEventData?.[0]?.promoterName}?
              {" "}Check out their{" "}
              <a href="/privacy-policy">
                <u>Privacy Policy</u>
              </a>
            </span> */}
            <span>
              I accept the{" "}
              <a style={{cursor: 'pointer'}} onClick={() => window.open('/terms', '_blank', 'noopener,noreferrer')}>
                <u>Terms of Service</u>{" "}
              </a>{" "}
              and{" "}
              <a href="/privacy-policy">
                {" "}
                <u>Privacy Policy</u>
              </a>{" "}
              of Twotixx.
            </span>
          </label>

          {!refundsAllowed ? (
            <label
              style={{ marginTop: "4px" }}
              className="cardPaymentCheckCont"
            >
              <input
                style={{ border: "none" }}
                className="checkboxAgreeUpdates"
                type="checkbox"
                checked={agreeToRefundPolicy}
                onChange={handleToggleUpdatesAgreeToRefundPolicy}
              />
              <span>I acknowledge that this event has a no-refund policy.</span>
            </label>
          ) : null}
          <div
            className="pay-btn"
            style={{ margin: "32px auto 0", display: "table" }}
          >
            <CommonButton
              disabled={
                !agreeToUpdates || (!agreeToRefundPolicy && !refundsAllowed)
              }
              width="360px"
              height="48px"
              text={"Pay now"}
              onClick={handlePayNowClick}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentForm;
