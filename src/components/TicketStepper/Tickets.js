import React, { useEffect, useRef } from "react";
import EventFormContainer from "../Common/EventFormContainer";
import "./Tickets.css";
import CommonButton from "../Common/CommonButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/system";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import Chip from "@mui/material-next/Chip";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import {
  setTotalPrice,
  setTicketTotalsData,
  setFlatDiscount,
  setTotalIncludedInTicketPrice,
  startTimer,
  resetTimer,
} from "../../reducers/eventDataReducer";
import DisclaimerText from "../Common/DisclaimerText";
import { ReactComponent as DownArrows } from "../../assets/svgs/downArrows.svg";
import { ReactComponent as UpArrows } from "../../assets/svgs/upArrows.svg";
import TooltipWrapper from "../Common/TooltipWrapper";

const CustomButton = styled(IconButton)({
  border: "1px solid var(--Primary-Mid-Blue)",
  margin: "0 10px",
  color: "var(--Primary-Mid-Blue)",
  width: "56px",
  height: "56px",
  borderRadius: "0",
  fontFamily: "var(--global-font-family)",
});
const CounterValue = styled("div")({
  fontSize: "40px",
  minWidth: "60px",
  textAlign: "center",
  fontFamily: "var(--global-font-family)",
  fontWeight: "var( --font-w-600)",
  color: "var(--twotixx-text-midnight-blue)",
  lineHeight: "56px",
});
const useStyles = makeStyles((theme) => ({
  selectedChip: {
    "&.MuiChip-outlined": {
      borderColor: "var(--Primary-Mid-Blue)",
      backgroundColor: "var(--Primary-Mid-Blue)",
      color: "var(--monochrome-white)",
      textTransform: "Sentence-case",
      fontFamily: "var(--global-font-family)",
    },
  },
  deselectedChip: {
    "&.MuiChip-outlined": {
      borderColor: "#E9E9E9",
      backgroundColor: "var(--monochrome-white)",
      color: "var(--Primary-Mid-Blue) ",
      textTransform: "Sentence-case",
      fontFamily: "var(--global-font-family)",
    },
  },

  soldOutChip: {
    "&.MuiChip-outlined": {
      borderColor: "#F04438",
      backgroundColor: "#F04438",
      color: "var(--monochrome-white)",
      textTransform: "Sentence-case",
      fontSize: "0.70rem",
      padding: "2px 0px",
      height: "auto",
      fontFamily: "var(--global-font-family)",
    },
  },
  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    fontFamily: "var(--global-font-family)",
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
    // marginBottom: "8px",
    marginLeft: "2px",
    height: "auto",
  },
  bookingFeeText: {
    // marginTop: "8px",
    fontFamily: "Poppins",
    fontWeight: "400",
  },
}));

const Tickets = ({ onContinue }) => {
  const stepIcons = [
    "/blue-tickets.svg",
    "/black-payments.svg",
    "/black-get-app.svg",
  ];

  const [staticEventData, setStaticEventData] = useState([
    {
      eventTicketTypeCategories: [
        {
          id: "cat1",
          name: "General Admission",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
          ticketTypes: [
            {
              id: 1,
              name: "General Admission1",
              release: "1st Release",
              ticketPrice: {
                value: 100,
                valueNet: 100,
                currency: { symbol: "£" },
              },
              bookingFee: 5,
              description: "General Admission ticket description",
              addOns: [],
            },
            {
              id: 2,
              name: "General Admission2",
              release: "2nd Release",
              ticketPrice: {
                value: 102,
                valueNet: 102,
                currency: { symbol: "£" },
              },
              bookingFee: 6,
              description: "General Admission ticket description",
              addOns: [],
            },
            {
              id: 3,
              name: "General Admission3",
              release: "3rd Release",
              ticketPrice: {
                value: 103,
                valueNet: 103,
                currency: { symbol: "£" },
              },
              bookingFee: 7,
              description: "General Admission ticket description",
              addOns: [],
            },
            {
              id: 4,
              name: "General Admission4",
              release: "4th Release",
              ticketPrice: {
                value: 103,
                valueNet: 103,
                currency: { symbol: "£" },
              },
              bookingFee: 7,
              description: "General Admission ticket description",
              addOns: [],
            },
          ],
        },
        {
          id: "cat2",
          name: "VIP Admission",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
          ticketTypes: [
            {
              id: 1,
              name: "VIP Admission",
              ticketPrice: {
                value: 100,
                valueNet: 100,
                currency: { symbol: "£" },
              },
              bookingFee: 5,
              description: "Lorem ipsum dolor sit amet",
              addOns: [],
            },
          ],
        },
      ],
    },
  ]);
  
  const [ticketTypeCounters, setTicketTypeCounters] = useState({});
  const [counter, setCounter] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState("all");
  const [isTruncated, setIsTruncated] = useState(true);
  const classes = useStyles();
  const MAX_VISIBLE_TICKETS = 10;
  const dispatch = useDispatch();
  const totalIncludedInTicketPrice = useSelector(
    (state) => state.totalIncludedInTicketPrice
  );

  //don't delete event data as it is used to fetch dynamic data
  // const eventData = useSelector((state) => state.eventData);
  const eventData = staticEventData;
  const [expansionStates, setExpansionStates] = useState({});
  const toggleExpansion = (uniqueKey) => {
    setExpansionStates((prevStates) => ({
      ...prevStates,
      [uniqueKey]: !prevStates[uniqueKey],
    }));
  };
  const [open, setOpen] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const initialCounters = staticEventData[0].eventTicketTypeCategories.reduce(
      (acc, category) => {
        category.ticketTypes.forEach((ticketType) => {
          acc[ticketType.id] = 0;
          ticketType.addOns.forEach((addOn) => {
            acc[addOn.id] = 0;
          });
        });
        return acc;
      },
      {}
    );

    setTicketTypeCounters(initialCounters);
  }, []);

  useEffect(() => {
    console.log("Static Event Data:", staticEventData);
  }, [staticEventData]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const trackingCode = params.get("utm");
    let determinedDiscount = 0;

    if (trackingCode && eventData[0]?.eventTrackingCodes) {
      const trackingObj = eventData[0].eventTrackingCodes.find(
        (code) => code.code === trackingCode
      );
      if (trackingObj) {
        determinedDiscount = trackingObj.discountAmount;
      }
    }
    dispatch(setFlatDiscount(determinedDiscount));
  }, [eventData, dispatch]);

  useEffect(() => {
    const totalIncludedInTicketPrice =
      eventData[0]?.eventTicketTypeCategories.reduce((total, category) => {
        return (
          total +
          category.ticketTypes.reduce((subTotal, ticketType) => {
            const count = ticketTypeCounters[ticketType.id] || 0;
            const includedPrice = ticketType.bookingFee;
            return subTotal + includedPrice * count;
          }, 0)
        );
      }, 0);

    dispatch(setTotalIncludedInTicketPrice(totalIncludedInTicketPrice));
  }, [ticketTypeCounters, eventData, dispatch]);

  const allTicketTypes = eventData[0]?.eventTicketTypeCategories.reduce(
    (acc, category) => [...acc, ...category.ticketTypes],
    []
  );

  const handleCheckout = () => {
    if (totalPrice > 0) {
      dispatch(startTimer());
      onContinue();
    }
  };

  const handleTooltipClose = (event) => {
    if (targetRef.current && targetRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleTooltipClose, true);
    return () => {
      document.removeEventListener("click", handleTooltipClose, true);
    };
  }, []);

  const handleChipClick = (ticketType) => {
    setSelectedTicket(ticketType);
    setCounter(0);
  };

  const updateTicketTypeCounter = (ticketTypeId, increment, index) => {
    console.log("Updating ticket counter for index:", index);
    setTicketTypeCounters((prevCounters) => {
      const currentCount = prevCounters[ticketTypeId] || 0;
      return {
        ...prevCounters,
        [ticketTypeId]: increment
          ? currentCount + 1
          : Math.max(currentCount - 1, 0),
      };
    });
  };

  const totalPrice = eventData[0]?.eventTicketTypeCategories.reduce(
    (total, category) => {
      return (
        total +
        category.ticketTypes.reduce((subTotal, ticketType) => {
          const count = ticketTypeCounters[ticketType.id] || 0;
          const originalPrice = ticketType.ticketPrice.valueNet;
          return subTotal + originalPrice * count;
        }, 0)
      );
    },
    0
  );

  const ticketTotals = Object.entries(ticketTypeCounters)
    .map(([ticketTypeId, count]) => {
      const ticketType = allTicketTypes.find(
        (tt) => tt.id === parseInt(ticketTypeId)
      );
      return ticketType
        ? {
            ticketTypeId: ticketType.id,
            name: ticketType.name,
            count: count,
            total: ticketType.ticketPrice.value * count,
            currencySymbol: ticketType?.ticketPrice?.currency?.symbol,
          }
        : null;
    })
    .filter((item) => item !== null);

  dispatch(setTicketTotalsData(ticketTotals));

  useEffect(() => {
    dispatch(setTotalPrice(totalPrice));
  }, [totalPrice, dispatch]);

  const toggleTruncation = () => {
    setIsTruncated(!isTruncated);
  };
  const getCurrencySymbol = () => {
    const firstTicketType =
      allTicketTypes.length > 0 ? allTicketTypes[0] : null;
    return firstTicketType ? firstTicketType.ticketPrice.currency.symbol : "";
  };

  //to disable button while 0 for AddOns Tickets
  useEffect(() => {
    const initialCounters = staticEventData[0].eventTicketTypeCategories.reduce(
      (acc, category) => {
        category.ticketTypes.forEach((ticketType) => {
          acc[ticketType.id] = 0;
          ticketType.addOns.forEach((addOn) => {
            acc[addOn.id] = 0;
          });
        });
        return acc;
      },
      {}
    );

    setTicketTypeCounters(initialCounters);
  }, []);

  const AddOnTicketDetails = ({
    ticketType,
    index,
    datasetId,
    expansionStates,
    updateTicketTypeCounter,
    ticketTypeCounters,
  }) => {
    const uniqueKey = `${datasetId}_${ticketType.id}_${index}`;
    const isExpanded = expansionStates[uniqueKey] || false;
    const mainPrice = ticketType?.ticketPrice?.value || 0;
    const originalPrice = ticketType?.ticketPrice?.valueNet || 0;
    const currencySymbol = ticketType?.ticketPrice?.currency?.symbol || "$";
    const includedInTicketPrice = ticketType?.bookingFee || 0;

    return (
      <div className="text-and-supporting-text2 addOn">
        <div className="text25 topHeaderCont">
          <div className="leftCont" style={{ paddingLeft: 48 }}>
            <div className="leftTopCont">
              <span className="ticketTypeName">[Add on]</span>
              <span className="releaseStatus">
                <Chip
                  label="Add on"
                  variant="outlined"
                  sx={{
                    marginLeft: "12px",
                    borderRadius: "var(--br-9xs)",
                    background: "var( --surface-highlight-subtle)",
                    color: "var(--text-highlight)",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "20px",
                    borderColor: "var( --surface-highlight-subtle)",
                  }}
                />
              </span>
            </div>
            <div className="leftBottomCont">
              <span className="show-more-less" onClick={toggleExpansion}>
                {isExpanded ? "Show less" : "Show more"}
                {isExpanded ? (
                  <UpArrows className="show-more-less-arrow" />
                ) : (
                  <DownArrows className="show-more-less-arrow" />
                )}
              </span>
              {isExpanded && (
                <div className="supporting-text-desc">
                  <ul style={{ paddingLeft: 20, margin: 0 }}>
                    {ticketType?.description?.split("\n").map((val, index) => {
                      if (val.trim() !== "") {
                        return (
                          <li key={index} style={{ margin: 4 }}>
                            {val}
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="supporting-text30 rightCont">
            <div
              className="mainPriceIncl"
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexWrap: "nowrap",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {mainPrice !== originalPrice && (
                <span
                  className="mainPrice"
                  style={{
                    textDecoration: "line-through",
                    color: "#626F86",
                  }}
                >
                  {currencySymbol}
                  {mainPrice.toFixed(2)}
                </span>
              )}
              <span
                style={{
                  color: "#0057FF",
                }}
              >
                {currencySymbol}
                {originalPrice.toFixed(2)}
              </span>
              <div className="mainPriceBottom">
                <span
                  className="supporting-incl-text"
                  style={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {`(incl. ${currencySymbol}${includedInTicketPrice.toFixed(
                    2
                  )} of fees)`}
                </span>

                <TooltipWrapper classes={classes} />
              </div>
            </div>
          </div>
          <div
            className="plusMinus-btn"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CustomButton
              onClick={() => updateTicketTypeCounter(ticketType.id, false)}
              disabled={ticketTypeCounters[ticketType.id] <= 0}
              style={{
                width: "32px",
                height: "32px",
                padding: "5px",
              }}
            >
              <RemoveIcon style={{ color: "white" }} />
            </CustomButton>
            <CounterValue>
              {ticketTypeCounters[ticketType.id] || 0}
            </CounterValue>
            <CustomButton
              onClick={() => updateTicketTypeCounter(ticketType.id, true)}
              style={{
                width: "32px",
                height: "32px",
                padding: "5px",
              }}
            >
              <AddIcon style={{ color: "white" }} />
            </CustomButton>
          </div>
        </div>
      </div>
    );
  };

  //to disable button while 0 for All Tickets
  useEffect(() => {
    const initialCounters = staticEventData[0].eventTicketTypeCategories.reduce(
      (acc, category) => {
        category.ticketTypes.forEach((ticketType) => {
          acc[ticketType.id] = 0;
        });
        return acc;
      },
      {}
    );

    setTicketTypeCounters(initialCounters);
  }, []);

  const renderTicketDetails = (ticketType, index, datasetId) => {
    const uniqueKey = `${datasetId}_${ticketType.id}_${index}`;
    const isExpanded = expansionStates[uniqueKey] || false;

    const mainPrice = ticketType.ticketPrice.value;
    const originalPrice = ticketType.ticketPrice.valueNet;
    const currencySymbol = ticketType?.ticketPrice?.currency?.symbol;
    const includedInTicketPrice = ticketType.bookingFee;

    let chipProps;
    switch (ticketType.release) {
      case "1st Release":
        chipProps = {
          label: "Sold Out",
          sx: {
            background: "var(--surface-error-subtle)",
            color: "var(--text-error-2)",
            borderColor: "var(--surface-error-subtle)",
          },
        };
        break;
      case "2nd Release":
        chipProps = {
          label: "Limited tickets",
          sx: {
            background: "#F0F6FE",
            color: "#3169DF",
            borderColor: "#F0F6FE",
          },
        };
        break;
      case "4th Release":
        chipProps = {
          label: "Not on sale",
          sx: {
            background: "#DCDFE4",
            color: "#626F86",
            borderColor: "#DCDFE4",
          },
        };
        break;
      default:
        chipProps = null;
    }

    return (
      <div className="content-parent" key={ticketType.id}>
        <div className="ticketdetails">
          <div
            className="user-selection-and-pricing"
            style={{
              borderBottom: "1px solid #DCDFE4",
            }}
          >
            <div className="text-and-supporting-text2">
              <div className="text25 topHeaderCont">
                <div className="leftCont">
                  <div className="leftTopCont">
                    <span className="ticketTypeName">{ticketType.name}</span>
                    <span className="releaseStatus">
                      {ticketType.release && (
                        <span style={{ color: "var(--twotixx-grey)" }}>
                          <span
                            style={{ margin: "0 12px 0 0", fontWeight: 100 }}
                          >
                            |
                          </span>
                          <span style={{ fontSize: "20px", fontWeight: 400 }}>
                            {ticketType.release}
                          </span>
                        </span>
                      )}
                      {chipProps && chipProps.label && (
                        <Chip
                          {...chipProps}
                          variant="outlined"
                          sx={{
                            marginLeft: "12px",
                            borderRadius: "var(--br-9xs)",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "20px",
                            borderColor: "var(--surface-error-subtle)",
                            ...chipProps.sx,
                          }}
                        />
                      )}
                    </span>
                  </div>
                  <div className="leftBottomCont">
                    <span
                      className="show-more-less"
                      onClick={() => toggleExpansion(uniqueKey)}
                    >
                      {isExpanded ? "Show less" : "Show more"}
                      {isExpanded ? (
                        <UpArrows className="show-more-less-arrow" />
                      ) : (
                        <DownArrows className="show-more-less-arrow" />
                      )}
                    </span>
                    {isExpanded && (
                      <div className="supporting-text-desc">
                        <ul style={{ paddingLeft: 20, margin: 0 }}>
                          {ticketType?.description
                            ?.split("\n")
                            .map((val, index) => {
                              if (val.trim() !== "") {
                                return (
                                  <li key={index} style={{ margin: 4 }}>
                                    {val}
                                  </li>
                                );
                              }
                              return null;
                            })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="supporting-text30 rightCont">
                  <div
                    className="mainPriceIncl"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexWrap: "nowrap",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {mainPrice !== originalPrice && (
                      <span
                        className="mainPrice"
                        style={{
                          textDecoration: "line-through",
                          color: "#626F86",
                        }}
                      >
                        {currencySymbol}
                        {mainPrice.toFixed(2)}
                      </span>
                    )}

                    <span
                      style={{
                        color:
                          ticketType.release === "1st Release" ||
                          ticketType.release === "4th Release"
                            ? "#626F86"
                            : "#0057FF",
                        fontSize: "24px",
                      }}
                    >
                      {currencySymbol}
                      {originalPrice.toFixed(2)}
                    </span>

                    <div className="mainPriceBottom">
                      {includedInTicketPrice > 0 && (
                        <span
                          className="supporting-incl-text"
                          style={{
                            whiteSpace: "nowrap",
                          }}
                        >
                          {`(incl. ${currencySymbol}${includedInTicketPrice.toFixed(
                            2
                          )} of fees)`}
                        </span>
                      )}
                      <TooltipWrapper classes={classes} />
                    </div>
                  </div>
                </div>
                {(ticketType.release === "2nd Release" ||
                  ticketType.release === "3rd Release") && (
                  <div
                    className="plusMinus-btn"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CustomButton
                      onClick={() => {
                        const ticketCounter =
                          ticketTypeCounters[ticketType.id] || 0;
                        if (ticketCounter <= 1) {
                          setTicketTypeCounters((prevCounters) => ({
                            ...prevCounters,
                            [ticketType.id]: 0,
                          }));

                          const resetAddOnsCounters = ticketType.addOns.reduce(
                            (acc, addOn) => {
                              acc[addOn.id] = 0;
                              return acc;
                            },
                            {}
                          );

                          setTicketTypeCounters((prevCounters) => ({
                            ...prevCounters,
                            ...resetAddOnsCounters,
                          }));

                          const tempTicketArr = [...staticEventData];
                          tempTicketArr[0].eventTicketTypeCategories[0].ticketTypes[
                            index
                          ].addOns = [];
                          setStaticEventData(tempTicketArr);
                        } else {
                          updateTicketTypeCounter(ticketType.id, false, index);
                        }
                      }}
                      disabled={ticketTypeCounters[ticketType.id] <= 0}
                      style={{
                        width: "32px",
                        height: "32px",
                        padding: "5px",
                      }}
                    >
                      <RemoveIcon style={{ color: "white" }} />
                    </CustomButton>

                    <CounterValue>
                      {ticketTypeCounters[ticketType.id] || 0}
                    </CounterValue>
                    <CustomButton
                      onClick={() => {
                        updateTicketTypeCounter(ticketType.id, true, index);
                        const tempTicketArr = [...staticEventData];
                        const currentAddOns =
                          tempTicketArr[0].eventTicketTypeCategories[0]
                            .ticketTypes[index].addOns;
                        if (currentAddOns.length < 1) {
                          tempTicketArr[0].eventTicketTypeCategories[0].ticketTypes[
                            index
                          ].addOns.push({ a: "b" });
                        }
                        setStaticEventData(tempTicketArr);
                      }}
                      style={{
                        width: "32px",
                        height: "32px",
                        padding: "5px",
                      }}
                    >
                      <AddIcon style={{ color: "white" }} />
                    </CustomButton>
                  </div>
                )}
                {ticketType.addOns.length > 0 && (
                  <div className="addOns">
                    {ticketType.addOns.map((addOn, index) => (
                      <AddOnTicketDetails
                        key={index}
                        ticketType={addOn}
                        index={index}
                        datasetId={datasetId}
                        expansionStates={expansionStates}
                        updateTicketTypeCounter={updateTicketTypeCounter}
                        ticketTypeCounters={ticketTypeCounters}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTotalItemCount = () => {
    const totalCount = Object.values(ticketTypeCounters).reduce(
      (acc, count) => acc + count,
      0
    );
    return totalCount > 0 ? (
      <span className="total-item-count">
        <span
          className="total-inc-fees"
          style={{ fontSize: "14px", fontWeight: "400" }}
        >
          {` ( incl. ${getCurrencySymbol()}${totalIncludedInTicketPrice.toFixed(
            2
          )} of fees )`}
        </span>
        <TooltipWrapper classes={classes} />

        <span
          style={{
            fontSize: "16px",
            fontWeight: "var(--font-w-400)",
            color: "var(--twotixx-text-midnight-blue)",
          }}
        >
          | {totalCount} items
        </span>
      </span>
    ) : null;
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
            style={{ marginLeft: index > 0 ? "10px" : "0" }}
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    dispatch(setTotalPrice(totalPrice));
  }, [totalPrice, dispatch]);

  const renderCategoryWithTickets = (category, index) => (
    <div key={category.id} className="content-parent content-parent1">
      {category.ticketTypes.map((ticketType, ind) =>
        renderTicketDetails(ticketType, ind)
      )}
    </div>
  );

  const renderAllTickets = () => {
    return eventData[0]?.eventTicketTypeCategories.map((category, index) =>
      renderCategoryWithTickets(category, index)
    );
  };

  return (
    <div className="desktop3">
      {renderStepIcons()}
      <div className="modal2">
        <EventFormContainer whichmodule={"ticket"} />
        <div className="ticketBox-item"></div>

        <div className={classes.chipContainer}>
          <div className={classes.chipContainer}>
            <Chip
              label="All"
              variant="outlined"
              className={
                selectedTicket === "all"
                  ? classes.selectedChip
                  : classes.deselectedChip
              }
              onClick={() => handleChipClick("all")}
            />

            {eventData[0]?.eventTicketTypeCategories.map((category) => (
              <Chip
                key={category.id}
                label={category.name}
                variant="outlined"
                className={
                  selectedTicket === category.id
                    ? classes.selectedChip
                    : classes.deselectedChip
                }
                onClick={() => handleChipClick(category.id)}
              />
            ))}

            {eventData[0]?.eventTicketTypeCategories.length >
              MAX_VISIBLE_TICKETS && (
              <button onClick={toggleTruncation}>
                {isTruncated ? "Show More" : "Show Less"}
              </button>
            )}
          </div>

          {selectedTicket === "all"
            ? renderAllTickets()
            : renderCategoryWithTickets(
                eventData[0]?.eventTicketTypeCategories.find(
                  (category) => category.id === selectedTicket
                )
              )}
        </div>

        <div className="content15" style={{ marginBottom: "170px" }}>
          <div className="supporting-text23">
            <DisclaimerText />
          </div>
        </div>

        <div className="content-parent price-total-modalTick PriceTotalStickyBar">
          <div className="content25">
            <div className="user-selection-and-pricing">
              <div className="supporting-text30">
                <span className="bottomTotal" style={{ fontSize: "32px" }}>
                  Total:{" "}
                  <b>
                    {getCurrencySymbol()}
                    {totalPrice.toFixed(2)} {renderTotalItemCount()}
                  </b>
                </span>
              </div>
              <div
                className="CheckoutBtnCont"
                style={{
                  display: "flex",
                  width: "328px",
                  height: "48px",
                  minWidth: "296px",
                  maxWidth: "360px",
                  alignSelf: "center",
                }}
              >
                {totalPrice > 0 ? (
                  <CommonButton
                    text={`Checkout (${getCurrencySymbol()}${totalPrice.toFixed(
                      2
                    )})`}
                    onClick={handleCheckout}
                    width="100%"
                    height="48px"
                    fontSize="28px"
                    disabled={totalPrice <= 0}
                  />
                ) : (
                  <CommonButton
                    text="Checkout"
                    onClick={handleCheckout}
                    width="100%"
                    height="52px"
                    fontSize="28px"
                    backgroundColor="#EBEBEB"
                    fontColor="#767676"
                    borderColor="#EBEBEB"
                    disabled={true}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
