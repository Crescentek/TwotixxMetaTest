import React, { useMemo } from "react";
import PropTypes from "prop-types";
import "./CustomStep.css";

const CustomStep = ({ startIcon, endIcon, text, textColor, fontSize }) => {
  const textStyles = useMemo(
    () => ({
      color: textColor,
      fontSize: fontSize,
    }),
    [textColor, fontSize]
  );

  return (
    <div className="custom-step">
      {startIcon && <img className="step-icon" alt="" src={startIcon} />}
      <div className="step-text" style={textStyles}>
        {text}
      </div>
      {endIcon && <img className="step-icon" alt="" src={endIcon} />}
    </div>
  );
};

CustomStep.propTypes = {
  startIcon: PropTypes.string,
  endIcon: PropTypes.string,
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  fontSize: PropTypes.string,
};

export default CustomStep;
