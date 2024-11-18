import React, { useState, useEffect } from "react";
import "./CountdownTimer.css";
import TimeoutComponent from "./TimeoutComponent";

const CountdownTimer = ({ initialSeconds }) => {
  const calculateEndTime = () => {
    const savedEndTime = localStorage.getItem("countdownEndTime");
    return savedEndTime && new Date(parseInt(savedEndTime, 10)) > new Date()
      ? new Date(parseInt(savedEndTime, 10))
      : new Date(new Date().getTime() + initialSeconds * 1000);
  };

  const [endTime, setEndTime] = useState(calculateEndTime);

  const calculateTimeLeft = () => {
    const now = new Date();
    const savedEndTime = calculateEndTime();
    const secondsLeft = Math.max(Math.floor((savedEndTime - now) / 1000), 0);
    return secondsLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const updateFrequency = 1000;
    const intervalId = setInterval(() => {
      const now = new Date();
      const secondsLeft = Math.max(Math.floor((endTime - now) / 1000), 0);
      if (secondsLeft <= 0) {
        clearInterval(intervalId);
        localStorage.removeItem("countdownEndTime");
      } else {
        localStorage.setItem("countdownEndTime", endTime.getTime().toString());
      }
      setTimeLeft(secondsLeft);
    }, updateFrequency);

    return () => clearInterval(intervalId);
  }, [endTime]);

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  const circumference = 2 * Math.PI * 47;
  const dashoffset =
    ((initialSeconds - timeLeft) / initialSeconds) * circumference;

  return (
    <div className="countdown-timer">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="47"
          fill="none"
          stroke="white"
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r="47"
          fill="none"
          stroke="#0057FF"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          transform="rotate(-90 60 60)"
        />
      </svg>
      <span className="time-text">
        {minutes}:{seconds}
      </span>
      {timeLeft <= 0 && <TimeoutComponent />}
    </div>
  );
};

export default CountdownTimer;
