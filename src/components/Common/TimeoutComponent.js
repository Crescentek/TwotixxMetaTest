import React from "react";
import "./TimeoutComponent.css";
import CommonButton from "../Common/CommonButton";
import { useDispatch } from "react-redux";
import { resetTimer } from "../../reducers/eventDataReducer";

const TimeoutComponent = ({headingTitle, bodyTitle}) => {
  const dispatch = useDispatch();

  const handletryagain = () => {
    dispatch(resetTimer());
    window.location.reload();
  };

  return (
    <div className="timeout-message-overlayBg">
      <div className="timeout-message">
        <div className="iconTimer">
          <img className="icon" alt="" draggable="false" src="/clockIcon.svg" />
        </div>
        <div className="timer-content">
          <h3>{headingTitle ? headingTitle : `You're out of time...`}</h3>
          <p>{bodyTitle ? bodyTitle : `We offer our customers an allocated timeframe for securing their
            tickets in order to maintain fairness.`}
          </p>
        </div>
        <div className="timerBtn">
          <CommonButton
            text={headingTitle ? 'OK' : "Try again"}
            width="100%"
            height="46px"
            onClick={handletryagain}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeoutComponent;
