import React, { useState } from "react";
import textVariants from "../../foundation/textVariants";

const Text = ({
  variant,
  children,
  color,
  onClick,
  display,
  // fontSize,
  marginBottom,
  marginTop,
  width,
  marginLeft,
  marginRight,
  textAlign,
  alignSelf,
  cursor,
  textWrap,
  style,
  labelclass,
  textclass,
  ellclass,
  underline,
  showUnderlineOnHover,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  let textStyle = textVariants[variant] || textVariants.body;
  textStyle = {
    ...textStyle,
    color: color || "var(--midnightBlue)",
    display: display || null,
    // fontSize: fontSize || null,
    marginBottom: marginBottom || 0,
    marginTop: marginTop || 0,
    width: width || "auto",
    marginLeft: marginLeft || 0,
    marginRight: marginRight || 0,
    cursor: cursor ? cursor : "default",
    textAlign: textAlign ? textAlign : "left",
    alignSelf: alignSelf ? alignSelf : "auto",
    textWrap: textWrap ? "nowrap" : "wrap",
    textDecoration: underline || isHovered ? "underline" : "none",
    ...style,
  };
  return (
    <span
      onMouseEnter={() => showUnderlineOnHover && setIsHovered(true)}
      onMouseLeave={() => showUnderlineOnHover && setIsHovered(false)}
      className={(labelclass, textclass, ellclass)}
      onClick={onClick}
      style={textStyle}
    >
      {children}
    </span>
  );
};

export default Text;
