import React from "react";
import "./CommonButton.css";
import Loader from "./Loader";
import { curry } from "lodash";

const CommonButton = ({
  text,
  icon,
  onClick,
  backgroundColor,
  borderColor,
  fontColor,
  width,
  height,
  fontSize,
  fontFamily,
  maxWidth,
  disabled = false,
  // forceEnable,
  fontWeight,
  style = {},
  loader = true,
  className= '',
}) => {
  const buttonStyle = {
    backgroundColor: disabled
      ? "#EBEBEB"
      : backgroundColor || "var(--Primary-Mid-Blue)",
    borderColor: disabled
      ? "#EBEBEB"
      : borderColor || "var(--Primary-Mid-Blue)",
    color: disabled ? "#767676" : fontColor || "var(--Twotixx-Text-Ice-White)",
    width: width || "auto",
    height: height || "auto",
    fontSize: fontSize || "inherit",
    fontFamily: fontFamily || "Poppins",
    maxWidth: maxWidth || "none",
    fontWeight: fontWeight || "normal",
    curser: disabled ? "not-allowed" : "pointer",
    // margin:"0 auto",
    // display:"table",
    // cursor: disabled ? "not-allowed" : "pointer",
    ...style,
  };

  const renderIcon = () => {
    if (typeof icon === "string") {
      return <img src={icon} alt="" className="button-icon" />;
    } else if (React.isValidElement(icon)) {
      return icon;
    }
  };

  return (
    <button
      className={`simple-button ${className}`}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {/* {loader && <Loader />} */}
      {/* Show loader if present */}
      {renderIcon()}
      {text}
    </button>
  );
};

export default CommonButton;
