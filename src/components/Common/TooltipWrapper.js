import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import { ticketFeesCheck } from "../../utils/helper";




const TooltipWrapper = ({ classes, ticketType, mainTitle, currencySymbol }) => {


  const [open, setOpen] = useState(false);

  const handleTooltipToggle = () => setOpen(!open);
  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);
  const [feesRes, setFeesRes] = useState({})

 // const currencySymbol = ticketType?.ticketPrice?.currency?.symbol || "";

  useEffect(() => {
    const feesRes = ticketFeesCheck(ticketType)
    setFeesRes(feesRes)

console.log('====================================');
console.log(ticketType, 'ticketTypeeeee');
console.log('====================================');

  }, [ticketType])

  useEffect(() => {
    const handleScroll = () => {
      setOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
console.log('mainTitle', mainTitle)
  return (

    <Tooltip
      title={
        <div className={classes.tooltipContent} style={{ padding: "6px" }}>

          The listed ticket price includes fees:
          {mainTitle && <div cpricelassName={classes.bookingFeeText}>{mainTitle}</div>}
          {feesRes?.isBookingFee && ticketType&&(
            <div className={classes.bookingFeeText} style={{ marginTop: 10}}>
              Organiser’s booking fee: {currencySymbol}
              {ticketType?.bookingFee?.toFixed(2)}
            </div>
          )}
          {/* {feesRes?.isTicketGuardFee &&ticketType&& (
            <div className={classes.bookingFeeText}>
              TicketGuard™ fee: {currencySymbol}
              {ticketType?.ticketGuardFee?.toFixed(2)}
            </div>
          )} */}
          {feesRes?.isPlatformFee &&ticketType&&(
            <div style={{marginTop: 3}} className={classes.bookingFeeText}>
              Platform fee: {currencySymbol}
              {ticketType?.platformFee?.toFixed(2)}
            </div>
          )}
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
      open={open}
      disableFocusListener
      disableHoverListener
      disableTouchListener
    >
      <InfoIcon
        onClick={handleTooltipToggle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          color: "#0057FF",
          cursor: "pointer",
          marginLeft: "10px",
        }}
      />
    </Tooltip>



  );
};
export default TooltipWrapper;
