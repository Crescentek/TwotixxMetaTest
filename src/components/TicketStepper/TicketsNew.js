import React, { useEffect, useRef, useLayoutEffect } from "react";
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
import { useLocation } from "react-router-dom";
import TimeoutComponent from "../Common/TimeoutComponent";
import {
  setTotalTickets,
  setTotalTaxPrize,
  setFees,
  setTotalCount,
} from "../../reducers/eventDataReducer";
import {
  setTotalPrice,
  setTicketTotalsData,
  setFlatDiscount,
  setTotalIncludedInTicketPrice,
  startTimer,
  resetTimer,
} from "../../reducers/eventDataReducer";
import "react-toastify/dist/ReactToastify.css";
import { ticketFeesCheck } from "../../utils/helper";
import DisclaimerText from "../Common/DisclaimerText";
import { ReactComponent as DownArrows } from "../../assets/svgs/downArrows.svg";
import { ReactComponent as UpArrows } from "../../assets/svgs/upArrows.svg";
import TooltipWrapper from "../Common/TooltipWrapper";
import { createCart } from "../../services/api";
import { SHOW_ACTIVITY_INDICATOR } from "../../actions";
import { setCreateCartId } from "../../reducers/eventDataReducer";
import { toast, ToastContainer } from "react-toastify";

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
    marginLeft: "2px",
    height: "auto",
  },
  bookingFeeText: {
    fontFamily: "Poppins",
    fontWeight: "400",
  },
}));
const TicketsNew = ({ onContinue }) => {
  const stepIcons = [
    "/blue-tickets.svg",
    "/black-payments.svg",
    "/black-get-app.svg",
  ];

  function generateUniqueId() {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    const uniqueId = `${timestamp}-${randomNum}`;
    return uniqueId;
  }

  console.log('generateUniqueId', generateUniqueId)
  const [totalBookingFee, setTotalBookingFee] = useState([]);
  const [SumAddOn, setSumAddOn] = useState();
  const [totalVal, setTotalVal] = useState(0);
  const [totalBookingCount, setTotalBookingCount] = useState(0);
  const [totalBookingFees, setTotalBookingFees] = useState(0);
  const [totalTicketGuardFees, setTotalTicketGuardFees] = useState(0);
  const [totalPlatformFee, setTotalPlatformFee] = useState(0);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [totalCountOfPrice, setTotalCountOfPrice] = useState(0);
  const [addOncount, setaddOncount] = useState()
  const [showErrorPopUp, setShowErrorPopUp] = useState()
  
  const [totalFees, setTotalFees] = useState(0);
  
  const manageTicket = (ticketType, type) => {
    console.log('ticketTypeeeeeeeee', ticketType)
    const isExist = selectedTickets?.filter(
      (res) => {
        console.log('res', res)
        return res?.uId === ticketType?.uId}
    );
    const feesREs = ticketFeesCheck(ticketType);

    console.log('feesREs', feesREs)

    if (type === "increment") {
      if (isExist.length) {
        const finalRes = selectedTickets?.map((res) => {  
          console.log('ressssssssss', res)
          if (ticketType?.isAddon && res?.uId == ticketType?.uId) {
            const isAddOnExist = res?.ticketAddOns?.find(
              (res) => res?.id === ticketType?.id
            );
            const finalAddOnData = res?.ticketAddOns?.map((fRes) => {
              if (fRes?.id == isAddOnExist?.id) {
                return {
                  ...fRes,
                  count: fRes?.count + 1,
                  id: fRes?.id,
                };
              } else {
                return fRes;
              }
            });
            if (isAddOnExist) {
              return { ...res, ticketAddOns: finalAddOnData };
            } else {
              console.log('ticketTypesssssssssssss', ticketType.bookingFee)
              const addBookingFeeToTicketPrice = ticketType?.addBookingFeeToTicketPrice;
              const addFeesToTicketPrice = ticketType?.addFeesToTicketPrice;
              const price = ticketType?.price || 0;
              const bookingFee = ticketType?.bookingFee || 0;
              const platformFee = ticketType?.platformFee || 0;
              const ticketGuardFee = ticketType?.ticketGuardFee || 0;
              let countTicket = 0;
          // const mainPrice = ticketType?.ticketPrice?.value ? ticketType?.ticketPrice?.value : 0;
          if(addBookingFeeToTicketPrice && !addFeesToTicketPrice && price > 0)
            {
              countTicket = price + bookingFee;
            }
          if(addBookingFeeToTicketPrice && addFeesToTicketPrice && price > 0)
            {
              countTicket = price + bookingFee + platformFee + ticketGuardFee;
            }
            if(!addBookingFeeToTicketPrice && !addFeesToTicketPrice && price > 0)
              {
                countTicket = price;
              }
          if(!addBookingFeeToTicketPrice && addFeesToTicketPrice && price > 0)
            {
              countTicket = price + platformFee + ticketGuardFee;
            }
            console.log('countTicket', countTicket)
            console.log('feesREssss', feesREs)
              return {
                ...res,
                ticketAddOns: [
                  ...res?.ticketAddOns,
                  {
                    id: ticketType?.id,
                    bookingFee: feesREs?.isBookingFee && ticketType?.bookingFee,
                    ticketGuardFee:
                      feesREs?.isTicketGuardFee && ticketType?.ticketGuardFee,
                    platformFee:
                      feesREs?.isPlatformFee && ticketType?.platformFee,
                    count: 1,
                    price:countTicket,
                    quantity:ticketType?.quantity,
                    mainPrice: price,
                  },
                ],
              };
            }
          } else {
            if (ticketType?.uId == res?.uId) {
              return { ...res, count: res?.count + 1 };
            } else {
              return res;
            }
          }
        });
console.log('finalRes', finalRes)
        setSelectedTickets(finalRes);
      } else {
        const addBookingFeeToTicketPrice = ticketType?.addBookingFeeToTicketPrice;
        const addFeesToTicketPrice = ticketType?.addFeesToTicketPrice;
        const price = ticketType?.price || 0;
        const bookingFee = ticketType?.bookingFee || 0;
        const platformFee = ticketType?.platformFee || 0;
        const ticketGuardFee = ticketType?.ticketGuardFee || 0;
        let countTicket = 0;
    // const mainPrice = ticketType?.ticketPrice?.value ? ticketType?.ticketPrice?.value : 0;
    if(addBookingFeeToTicketPrice && !addFeesToTicketPrice && price > 0)
      {
        countTicket = price + bookingFee;
      }
    if(addBookingFeeToTicketPrice && addFeesToTicketPrice && price > 0)
      {
        countTicket = price + bookingFee + platformFee + ticketGuardFee;
      }
      if(!addBookingFeeToTicketPrice && !addFeesToTicketPrice && price > 0)
        {
          countTicket = price;
        }
    if(!addBookingFeeToTicketPrice && addFeesToTicketPrice && price > 0)
      {
        countTicket = price + platformFee + ticketGuardFee;
      }
      console.log('ticketTypewqwqwqw', ticketType)
      setSelectedTickets((prev) => [
          ...prev,
          {
            ticketId : ticketType.ticketId,
            id:ticketType.id,
            stageReleaseId:ticketType.stageReleaseId,
            uId: ticketType?.uId,
            bookingFee: feesREs?.isBookingFee && ticketType?.bookingFee,
            ticketGuardFee:
              feesREs?.isTicketGuardFee && ticketType?.ticketGuardFee,
              platformFee: feesREs?.isPlatformFee && ticketType?.platformFee,
              count: 1,
            price: countTicket,
            mainPrice: ticketType.price,
            quantity:ticketType.stagequantity,
            ticketAddOns: [],
          },
        ]);
      }
    } else {
      if (isExist.length) {
        let finalRes = selectedTickets?.map((res) => {
          if (ticketType?.isAddon && res?.uId == ticketType?.uId) {
            const isAddOnExist = res?.ticketAddOns?.find(
              (res) => res?.id === ticketType?.id
            );
            const finalAddOnData = res?.ticketAddOns?.map((fRes) => {
              if (fRes?.id == isAddOnExist?.id) {
                return {
                  ...fRes,
                  count: fRes?.count - 1,
                  id: fRes?.id,
                };
              } else {
                return fRes;
              }
            });
            if (isAddOnExist) {
              return { ...res, ticketAddOns: finalAddOnData };
            }
          } else {
            if (ticketType?.uId == res?.uId && res?.count >= 1) {
              return { ...res, count: res?.count - 1 };
            } else {
              return res;
            }
          }
        });
        finalRes = finalRes.filter(
          (item) => item !== null || item !== undefined
        );
        finalRes = finalRes.filter((item) => item?.count !== 0);
        setSelectedTickets(finalRes);
      } else {
        setSelectedTickets((prev) => [
          ...prev,
          {
            // ticketId : ticketType.stageReleaseId,
            // id:ticketType.id,
            ticketId : ticketType.ticketId,
            id:ticketType.id,
            uId: ticketType?.uId,
            bookingFee: feesREs?.isBookingFee && ticketType?.bookingFee,
            ticketGuardFee:
              feesREs?.isTicketGuardFee && ticketType?.ticketGuardFee,
            platformFee: feesREs?.isPlatformFee && ticketType?.platformFee,
            count: 1,
            quantity:ticketType.stagequantity
          },
        ]);
      }

    }
  };
  
  
 


  console.log('selectedTickets', selectedTickets)

  console.log('addOncountst',addOncount)
 

  useEffect(() => {
    const initializedData = eventData.flatMap((event) =>
      event.eventTicketTypeCategories.flatMap((category) =>
        category.ticketTypes.map((ticketType) => ({
          main: {
            id: ticketType.id,
            value: 0,
            bookingfee: ticketType.bookingFee,
            ticketGuardFee: ticketType.ticketGuardFee,
            platformFee: ticketType.platformFee,
          },
          addOn: ticketType.ticketAddOns?.length
            ? ticketType.ticketAddOns.map((ele) => {
                return {
                  id: ele.id,
                  value: 0,
                  bookingfee: ele.bookingFee,
                  ticketGuardFee: ele.ticketGuardFee,
                  platformFee: ele.platformFee,
                };
              })
            : [],
          eventTicketTypeStageReleases: ticketType.eventTicketTypeStageReleases
            ?.length
            ? ticketType.eventTicketTypeStageReleases.map((item) => {
                return {
                  id: item.id,
                  value: 0,
                  bookingfee: ticketType.bookingFee,
                  ticketGuardFee: ticketType.ticketGuardFee,
                  platformFee: ticketType.platformFee,
                };
              })
            : [],
        }))
      )
    );
    setTotalBookingFee(initializedData);

    const initializedData2 =
      eventData[0]?.eventTicketTypeCategories[0]?.ticketTypes[0]?.ticketAddOns
        ?.length &&
      eventData[0]?.eventTicketTypeCategories[0]?.ticketTypes[0]?.ticketAddOns?.map(
        (ele) => {
          return {
            id: ele.id,
            value: 0,
            bookingfee: ele.bookingFee,
            ticketGuardFee: ele.ticketGuardFee,
            platformFee: ele.platformFee,
          };
        }
      );
    setSumAddOn(initializedData2);
  }, []);
  const HandleAddOnIncrement = (ticketType) => {
    const ticketPrice = Number(ticketType?.price + 1);

    setTotalVal((prev) => prev + ticketPrice);
    const temp = SumAddOn?.map((ele) => {
      if (ele.id == ticketType.id) {
        return {
          ...ele,
          value: ele.value + 1,
        };
      } else {
        return ele;
      }
    });
    setSumAddOn(temp);
  };

  const HandleAddOnDecrement = (ticketType) => {
    const temp = SumAddOn?.map((ele) => {
      if (ele.id == ticketType.id) {
        return {
          ...ele,
          value: ele.value - 1,
        };
      } else {
        return ele;
      }
    });
    setSumAddOn(temp);
  };




  const handleIncrement = (ticketType, type) => {

    const ticketPrice = Number(ticketType?.price + 1);

    setTotalVal((prev) => prev + ticketPrice);

    const updatedData = totalBookingFee.map((item) => {
      if (type == "main") {
        if (item?.main?.id === ticketType.id) {
          return {
            ...item,
            main: {
              ...item.main,
              value: item.main.value + 1,
            },
          };
        } else {
          return item;
        }
      }

      if (type == "stage") {
        if (
          item.eventTicketTypeStageReleases.find(
            (ele) => ele.id == ticketType.id
          )
        ) {
          const stageData = item.eventTicketTypeStageReleases.map((ele) => {
            if (ele.id == ticketType.id) {
              return {
                ...ele,
                value: ele.value + 1,
              };
            } else {
              return ele;
            }
          });
          return {
            ...item,
            eventTicketTypeStageReleases: stageData,
          };
        } else {
          return item;
        }
      }
      if (type == "AddOn") {
        if (item.addOn.find((ele) => ele.id == ticketType.id)) {
          const addOnData = item.addOn.map((ele) => {
            if (ele.id == ticketType.id) {
              return {
                ...ele,
                value: ele.value + 1,
              };
            } else {
              return ele;
            }
          });
          return {
            ...item,
            addOn: addOnData,
          };
        } else {
          return item;
        }
      }
    });
    setTotalBookingFee(updatedData);
  };


  const handleDecrement = (ticketType, type) => {

    const ticketPrice = Number(ticketType?.price + 1);
    console.log("🚀 ~ handleIncrement1 ~ ticketType:", ticketType);

    setTotalVal((prev) => prev - ticketPrice);

    const updatedData = totalBookingFee.map((item) => {
      if (type == "main") {
        if (item?.main?.id === ticketType.id) {
          return {
            ...item,
            main: {
              ...item.main,
              value: item.main.value - 1,
            },
          };
        } else {
          return item;
        }
      }

      if (type == "stage") {
        if (
          item.eventTicketTypeStageReleases.find(
            (ele) => ele.id == ticketType.id
          )
        ) {
          const stageData = item.eventTicketTypeStageReleases.map((ele) => {
            if (ele.id == ticketType.id) {
              return {
                ...ele,
                value: ele.value - 1,
              };
            } else {
              return ele;
            }
          });
          return {
            ...item,
            eventTicketTypeStageReleases: stageData,
          };
        } else {
          return item;
        }
      }
      if (type == "AddOn") {
        if (item.addOn.find((ele) => ele.id == ticketType.id)) {
          const addOnData = item.addOn.map((ele) => {
            if (ele.id == ticketType.id) {
              return {
                ...ele,
                value: ele.value - 1,
              };
            } else {
              return ele;
            }
          });
          return {
            ...item,
            addOn: addOnData,
          };
        } else {
          return item;
        }
      }
    });
    console.log("updatedData", updatedData);
    setTotalBookingFee(updatedData);
  };

  const [staticEventData, setStaticEventData] = useState([
    {
      eventTicketTypeCategories: [
        {
          dateCreated: "0001-01-01T00:00:00",
          id: 0,
          name: "None",
          ticketTypes: [
            {
              id: 94,
              name: "Type 1",
              description: "Ticket description 1",
              category: "Type 1",
              eventTicketTypeAgeCategory: "GeneralAdmission",
              unsoldTicketCount: 0,
              ticketPrice: {
                value: 100,
                valueAsString: "₹100.00",
                valueNet: 100,
                currency: {
                  id: 6,
                  code: "INR",
                  name: "Rupee",
                  symbol: "₹",
                  ticketGuardFee: 100,
                  platformFee: 10,
                  platformFeePct: 0.01,
                },
              },
              requirements: [
                {
                  requirement: "WalletAttached",
                  values: [
                    {
                      key: "Ticket limit per person",
                      value: "There is a limit of 1000 ticket(s) per person.",
                    },
                  ],
                },
              ],
              ticketRequirementId: 604,
              stockAvailable: true,
              kycRequired: false,
              maxUserTicketQty: 1000,
              quantity: 100,
              soldQuantity: 0,
              cartQuantity: 0,
              price: 100,
              autoReleaseTickets: true,
              onSaleFromDate: "2024-03-29T18:05:11.207",
              startTime: "2024-03-29T18:40:00",
              endTime: "9999-12-31T23:59:59.9999999",
              isOnSale: false,
              isSoldOut: true,
              bookingFee: 0,
              platformFee: 0,
              ticketGuardFee: 0,
              totalFees: 0,
              addFeesToTicketPrice: true,
              isAddOn: false,
              ticketAvailability: {
                ticketTypeName: "Type 1",
                available: true,
              },
              availableToAllTrackingCodes: false,
              eventTicketTypeTrackingCodes: [],
              eventTicketTypeStageReleases: [
                {
                  id: 19,
                  date: "2024-03-29T18:40:00",
                  enabled: true,
                  offerName: "Offer 1",
                  quantity: 60,
                  price: 100,
                  activeNextRelease: false,
                },
                {
                  id: 20,
                  date: "2024-03-31T18:40:00",
                  enabled: false,
                  offerName: "Offer 2",
                  quantity: 40,
                  price: 150,
                  activeNextRelease: false,
                },
              ],
              dateCreated: "2024-03-29T12:35:11.207",
            },
            {
              id: 95,
              name: "Type 2",
              description: "Ticket description 2",
              category: "Type 2",
              eventTicketTypeAgeCategory: "GeneralAdmission",
              unsoldTicketCount: 0,
              ticketPrice: {
                value: 100,
                valueAsString: "₹100.00",
                valueNet: 100,
                currency: {
                  id: 6,
                  code: "INR",
                  name: "Rupee",
                  symbol: "₹",
                  ticketGuardFee: 100,
                  platformFee: 10,
                  platformFeePct: 0.01,
                },
              },
              requirements: [
                {
                  requirement: "WalletAttached",
                  values: [
                    {
                      key: "Ticket limit per person",
                      value: "There is a limit of 1000 ticket(s) per person.",
                    },
                  ],
                },
              ],
              ticketRequirementId: 605,
              stockAvailable: true,
              kycRequired: false,
              maxUserTicketQty: 1000,
              quantity: 1000,
              soldQuantity: 0,
              cartQuantity: 0,
              price: 100,
              autoReleaseTickets: true,
              onSaleFromDate: "2024-03-29T18:05:11.21",
              startTime: "2024-03-29T18:40:00",
              endTime: "9999-12-31T23:59:59.9999999",
              isOnSale: false,
              isSoldOut: true,
              bookingFee: 0,
              platformFee: 0,
              ticketGuardFee: 0,
              totalFees: 0,
              addFeesToTicketPrice: true,
              isAddOn: false,
              ticketAvailability: {
                ticketTypeName: "Type 2",
                available: true,
              },
              availableToAllTrackingCodes: false,
              eventTicketTypeTrackingCodes: [],
              eventTicketTypeStageReleases: [],
              ticketAddOns: [
                {
                  id: 96,
                  eventId: 0,
                  name: "Add On 1",
                  description: "Add On description 1",
                  ticketRequirementId: 606,
                  availableToAllTrackingCodes: false,
                  isAddOn: true,
                  price: 20,
                  bookingFee: 0,
                  addFeesToTicketPrice: false,
                  platformFee: 0,
                  ticketGuardFee: 0,
                  totalFees: 0,
                  dateCreated: "2024-03-29T12:35:11.213",
                  eventTicketTypeAgeCategoryId: 0,
                  quantity: 200,
                  soldQuantity: 0,
                  cartQuantity: 0,
                },
                {
                  id: 97,
                  eventId: 0,
                  name: "Add On 2",
                  description: "Add On description 2",
                  ticketRequirementId: 607,
                  availableToAllTrackingCodes: false,
                  isAddOn: true,
                  price: 20,
                  bookingFee: 0,
                  addFeesToTicketPrice: false,
                  platformFee: 0,
                  ticketGuardFee: 0,
                  totalFees: 0,
                  dateCreated: "2024-03-29T12:35:11.217",
                  eventTicketTypeAgeCategoryId: 0,
                  quantity: 200,
                  soldQuantity: 0,
                  cartQuantity: 0,
                },
              ],
              dateCreated: "2024-03-29T12:35:11.21",
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

  const [error, setError] = useState("");
  const eventData = useSelector((state) => state.eventData);
  const createCartId = useSelector((state) => state.cartId);
  const [expansionStates, setExpansionStates] = useState({});
  const [totalCount, settotalCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [ticketData, setTicketData] = useState([]);
  const [addRemoveCount, setAddRemoveCount] = useState([]);
  const [addRemoveCountAddOn, setAddRemoveCountAddOn] = useState([]);
  const targetRef = useRef(null);
  const location = useLocation();
  const [finalEventData, setFinalEventData] = useState([]);

  const manageEventData = (eventData) => {
    let newTicketsArray = [];

    eventData[0]?.eventTicketTypeCategories.forEach((mainCAt) => {
      console.log("🚀 ~ eventData[0]?.eventTicketTypeCategories.forEach ~ mainCAt:", mainCAt)
      mainCAt?.ticketTypes?.forEach((ticket) => {
        let ticketCopy = { ...ticket };
        newTicketsArray.push({
          ...ticket,
          isMainTicket: true,
          categoryId: mainCAt?.id,
          ticketId: ticket?.id,
          uId: generateUniqueId()
        });
          ticket.eventTicketTypeStageReleases.forEach((stageRelease) => {
            let newStageRelease = {
              ...ticketCopy,
              ...stageRelease,
              categoryId: mainCAt?.id,
              stageReleaseId: stageRelease?.id,
              stagequantity:stageRelease.quantity,
              ticketId: ticket?.id,
              uId: generateUniqueId(),
              platformFee: stageRelease?.platformFee || mainCAt?.platformFee,
              bookingFee: stageRelease?.bookingFee || mainCAt?.bookingFee,
              ticketGuardFee: stageRelease?.ticketGuardFee || mainCAt?.ticketGuardFee,
              isLimited: stageRelease?.isLimited || mainCAt?.isLimited,
              isSoldOut: stageRelease?.isSoldOut || mainCAt?.isSoldOut,
              isAvailableToSale: stageRelease?.isAvailableToSale || mainCAt?.isAvailableToSale,
            };
            newTicketsArray.push(newStageRelease);
          });
      });
    });
  console.log('newTicketsArray', newTicketsArray)
    const categorizedTickets = newTicketsArray.reduce((acc, ticket) => {
      const { category } = ticket;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(ticket);
      return acc;
    }, {});

    let categoryArrays = Object.values(categorizedTickets);
    const finalData =
      categoryArrays.length &&
      categoryArrays.map((res, i) => ({
        id: i,
        categoryId: res?.[0]?.categoryId,
        name: res[0]?.category,
        description: res[0]?.description,
        ticketTypes: res,
      }));

    setFinalEventData(finalData);
  };
  useEffect(() => {
    manageEventData(eventData);
  }, [eventData]);


  console.log('eventDataaaaaaaaaaaa', eventData)

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

    const addRemoveCountTempArray = [];
    eventData[0]?.eventTicketTypeCategories[0]?.ticketTypes?.map(
      (ticket, index) => {
        addRemoveCountTempArray.push({ ticketCount: 0, addOnCount: [] });

        const addRemoveCountAddOnTempArray = [];
        ticket?.ticketAddOns?.map((addOn) => {
          addRemoveCountAddOnTempArray.push(0);
        });
        addRemoveCountTempArray[index].addOnCount =
          addRemoveCountAddOnTempArray;
      }
    );

    setAddRemoveCount(addRemoveCountTempArray);
    setTicketData(eventData[0]?.eventTicketTypeCategories[0]?.ticketTypes);
  }, [eventData, dispatch]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const totalIncludedInTicketPrice =
      eventData[0]?.eventTicketTypeCategories.reduce((total, category) => {
        return (
          total +
          category.ticketTypes.reduce((subTotal, ticketType) => {
            const count = ticketTypeCounters[ticketType.id] || 0;
            const platformFee = (ticketType?.platformFee || 0) * count;
            const ticketGuardFee = (ticketType?.ticketGuardFee || 0) * count;
            const bookingFee = (ticketType?.bookingFee || 0) * count;
            const includedInTotalTicketPrice =
              platformFee + ticketGuardFee + bookingFee;
            let includedInAddonTicketPrice = 0;
            ticketType.ticketAddOns?.forEach((addOn) => {
              const addOnKey = `${ticketType.id}_${addOn.id}`;
              const addOnCount = ticketTypeCounters[addOnKey] || 0;
              includedInAddonTicketPrice +=
                (addOn.platformFee + addOn.ticketGuardFee) * addOnCount;
            });

            return (
              subTotal + includedInTotalTicketPrice + includedInAddonTicketPrice
            );
          }, 0)
        );
      }, 0);

    dispatch(setTotalIncludedInTicketPrice(totalIncludedInTicketPrice));
  }, [ticketTypeCounters, eventData, dispatch]);

  const allTicketTypes = finalEventData?.reduce(
    (acc, category) => [...acc, ...category.ticketTypes],
    []
  );


  console.log('finalEventData', finalEventData);

  const handleCheckout = async () => {
    if (totalCount > 0) {
      dispatch({ type: SHOW_ACTIVITY_INDICATOR, payload: true });

      const locationPath = new URLSearchParams(window.location.search);
      const trackingCode = locationPath.get("utm");
  
      const cartItemTempArray = [];
      selectedTickets.map((item) => {
        const mainCount = ticketTypeCounters[item.id]
        console.log('itemsssssssssssssss', item)
        cartItemTempArray.push({
            id: 0,
            eventTicketTypeId: item?.ticketId,
            eventTicketTypeStageReleaseId: item?.stageReleaseId,
            quantity: mainCount,
            bookingFee: item?.bookingFee ? item?.bookingFee : 0,
            // ticketGuardFee: item?.ticketGuardFee ? item?.ticketGuardFee : 0,
            platformFee: item?.platformFee ? item?.platformFee : 0,
            price: item?.mainPrice,
            total: mainCount*item.price
        });
        item.ticketAddOns.map((addon) => {
          const addOnCount = ticketTypeCounters[`${item.id}_${addon.id}`]
            cartItemTempArray.push({
                id: 0,
                eventTicketTypeId: addon?.id,
                quantity: addOnCount,
                bookingFee: addon?.bookingFee ? addon?.bookingFee : 0,
                // ticketGuardFee: addon?.ticketGuardFee ? addon?.ticketGuardFee : 0,
                platformFee: addon?.platformFee ? addon?.platformFee : 0,
                price: addon?.mainPrice || addon?.price,
                total:  addOnCount*addon.price,
                isAddOn: true,
                mainTicketTypeId: item?.ticketId,
            });
        });
    });

    console.log('cartItemTempArray', cartItemTempArray)

      try {
        let params = {
          eventId: eventData[0]?.eventId,
          // trackingCode: trackingCode,
          currencyId: eventData[0]?.currencyId,
          orderTotal: totalCountOfPrice,
          cartItems: cartItemTempArray,
        };
        console.log("params", params);
        const result = await createCart(params);
        dispatch(setCreateCartId(result.response.cartId));
        if (result.response.success) {
          console.log("result.status", result.response.success);
          localStorage.setItem("createdcartId", result.response.cartId);
          dispatch(startTimer());
          onContinue();
        } else {
         result?.response?.errorMessage === 'Ticket not available' && setShowErrorPopUp(true)
          toast.error(result.response.errorMessage);
        }
      } catch (error) {
        console.log("errorrrrrrrrrrr", error);
      } finally {
        dispatch({ type: SHOW_ACTIVITY_INDICATOR, payload: false });
      }
    }
  };


  // console.log('ticketTypeCounters', ticketTypeCounters)

  const handleTooltipClose = (event) => {
    if (targetRef.current && targetRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    dispatch(setTotalTickets(totalCountOfPrice));
  }, [totalCountOfPrice, dispatch]);
  useEffect(() => {
    dispatch(setTotalTaxPrize(totalFees));
  }, [totalFees, dispatch]);

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

  console.log('ticketTypeCounters', ticketTypeCounters)

  console.log('addRemoveCount', addRemoveCount)
  const getCurrencySymbol = () => {
    // const firstTicketType =
    //   allTicketTypes.length > 0 ? allTicketTypes[0] : null;
    // return firstTicketType
    //   ? firstTicketType?.ticketPrice?.currency?.symbol || ""
    //   : "";

    return eventData?.[0]?.currency?.symbol || "";
  };

  const updateTicketTypeCounter = (
    ticketTypeId,
    increment,
    index,
    isAddOn = false,
    parentTicketTypeId = null
  ) => {
    console.log(
      "Updating ticket counter for index:",
      index,
      "isAddOn:",
      isAddOn
    );
    console.log('increment', increment)
    console.log('ticketTypeId', ticketTypeId)
    setTicketTypeCounters((prevCounters) => {
      const currentCount =
        isAddOn && parentTicketTypeId !== null
          ? prevCounters[`${parentTicketTypeId}_${ticketTypeId}`] || 0
          : prevCounters[ticketTypeId] || 0;

        
          
          if (isAddOn && parentTicketTypeId !== null) {
        console.log('prevCounters[`${parentTicketTypeId}_${ticketTypeId}', prevCounters[`${parentTicketTypeId}_${ticketTypeId}`])

        const parentTicketTypeCount = prevCounters[parentTicketTypeId] || 0;
        console.log('parentTicketTypeCount', parentTicketTypeCount, prevCounters[`${parentTicketTypeId}_${ticketTypeId}`], parentTicketTypeCount < prevCounters[`${parentTicketTypeId}_${ticketTypeId}`])

       
        // } else {
          const updatedCount = increment
            ? currentCount + 1
            : Math.max(currentCount - 1, 0);

            

          return {
            ...prevCounters,
            [`${parentTicketTypeId}_${ticketTypeId}`]: updatedCount,
          };
        // }
      } else {

      console.log('currentCount', currentCount)
        const updatedCount = increment
          ? currentCount + 1
          : Math.max(currentCount - 1, 0);

        let updatedCounters = {
          ...prevCounters,
          [ticketTypeId]: updatedCount,
        };
        if (prevCounters[ticketTypeId] ==  0) {
          const resetAddOns = Object.keys(prevCounters).reduce((acc, key) => {
            if (key.startsWith(`${ticketTypeId}_`)) {
              acc[key] = 0;
            }
            return acc;
          }, {});
          console.log('resetAddOns', resetAddOns)
          return {
            ...updatedCounters,
            ...resetAddOns,
          };
        }

      

        return updatedCounters;
      }


    });
  };
  const totalPrice = eventData[0]?.eventTicketTypeCategories.reduce(
    (total, category) => {
      return (
        total +
        category.ticketTypes.reduce((subTotal, ticketType) => {
          const count = ticketTypeCounters[ticketType.id] || 0;
          const originalPrice = ticketType?.ticketPrice?.valueNet;
          let addOnTotal = 0;

          ticketType.ticketAddOns?.forEach((addOn) => {
            const addOnKey = `${ticketType.id}_${addOn.id}`;
            const addOnCount = ticketTypeCounters[addOnKey] || 0;
            addOnTotal += addOn.price * addOnCount;
          });

          return subTotal + originalPrice * count + addOnTotal;
        }, 0)
      );
    },
    0
  );
console.log('ticketTypeCounters', ticketTypeCounters)

  useEffect(() =>{


    const ticketTotals = Object.entries(ticketTypeCounters)
      .map(([key, count]) => {
        const parts = key.split("_");
        const ticketTypeId = parseInt(parts[0]);
      
  
        console.log('ticketTypeId', ticketTypeId)
        const addOnId = parts.length > 1 ? parseInt(parts[1]) : null;
  
        const ticketType = allTicketTypes.find((tt) => {
          console.log('ttsssssssssssssss.id', tt.id === ticketTypeId)
        return  tt.id === ticketTypeId;

        })
  
        
        console.log('wefdefeff', ticketType,ticketTypeId)
        let addOnType = null;
        if (addOnId) {
          addOnType = ticketType?.ticketAddOns?.find(
            (addOn) => addOn.id === addOnId
          );
        }
      
        if (addOnType) {
          console.log('addOnType', addOnType);
          const addOnT = ticketFeesCheck(addOnType)
        
          let total = addOnType.price;
        
          if (addOnT?.isBookingFee && addOnType?.bookingFee) {
            total += addOnType.bookingFee;
          }
          if (addOnT.isPlatformFee && addOnType?.platformFee) {
            total += addOnType.platformFee;
          }
        
          total = total * count;
        
          return {
            ticketTypeId: addOnType.id,
            name: `${ticketType.name} - Add-on: ${addOnType.name}`,
            count: count,
            total: ticketType?.price === 0 ? 0 : total,
            currencySymbol: getCurrencySymbol() || "",
          };
        
        
        } else if (ticketType) {
        const MainT = ticketFeesCheck(ticketType)
        console.log('MainT', MainT)

         let total = ticketType.price;


         console.log('MainT?.bookingFee && ticketType?.bookingFee', MainT?.isBookingFee && ticketType?.bookingFee)
          if (MainT?.isBookingFee && ticketType?.bookingFee) {
            console.log('ticketType?.bookingFee', ticketType?.bookingFee)
            total += ticketType.bookingFee;

          }
          if (MainT?.isPlatformFee && ticketType?.platformFee) {
            total += ticketType.platformFee;
          }
        
          total *= count;

          console.log('totalllllllll', total)
        
          return {
            ticketTypeId: ticketType.id,
            name: ticketType.name,
            count: count,
            total: ticketType?.price === 0 ? 0 : total,
            currencySymbol: getCurrencySymbol() || "",
          };
        }
        return null;
      })
      .filter((item) => item !== null);
    console.log('ticketTotals new edited::::', ticketTotals)
    dispatch(setTicketTotalsData(ticketTotals));
  },[dispatch,allTicketTypes,ticketTypeCounters,getCurrencySymbol])

  useEffect(() => {
    dispatch(setTotalPrice(totalPrice));
  }, [totalPrice, dispatch]);

  const toggleTruncation = () => {
    setIsTruncated(!isTruncated);
  };


  useEffect(() => {
    const initialCounters = staticEventData[0].eventTicketTypeCategories.reduce(
      (acc, category) => {
        category.ticketTypes.forEach((ticketType) => {
          acc[ticketType.id] = 0;
          if (ticketType.ticketAddOns) {
            ticketType.ticketAddOns.forEach((addOn) => {
              acc[addOn.id] = 0;
            });
          }
        });
        return acc;
      },
      {}
    );
    setTicketTypeCounters(initialCounters);
  }, []);

  const AddOnTicketDetails = ({
    ticketType,
    updateTicketTypeCounter,
    ticketTypeCounters,
    parentTicketTypeId,
    isExpanded,
    toggleExpansion,
    ticketIndex,
    addRemoveCount,
    index,
  }) => {


    let countTicket = 0;


    const addBookingFeeToTicketPrice = ticketType?.addBookingFeeToTicketPrice;
    const addFeesToTicketPrice = ticketType?.addFeesToTicketPrice;
    const price = ticketType?.price || 0;
    const bookingFee = ticketType?.bookingFee || 0;
    const platformFee = ticketType?.platformFee || 0;
    const ticketGuardFee = ticketType?.ticketGuardFee || 0;

    if(addBookingFeeToTicketPrice && !addFeesToTicketPrice)
      {
        countTicket = price + bookingFee;
      }
    if(addBookingFeeToTicketPrice && addFeesToTicketPrice)
      {
        countTicket = price + bookingFee + platformFee + ticketGuardFee;
      }
      if(!addBookingFeeToTicketPrice && !addFeesToTicketPrice)
        {
          countTicket = price;
        }
    if(!addBookingFeeToTicketPrice && addFeesToTicketPrice)
      {
        countTicket = price + platformFee + ticketGuardFee;
      }
    
    const parentTicketCount = ticketTypeCounters[parentTicketTypeId] || 0;
    if (parentTicketCount === 0) return null;
    const mainPrice = ticketType?.price || 0;

    
      const originalPrice = ticketType?.price ? countTicket : 0;
    const currencySymbol = eventData?.[0]?.currency?.symbol || "";
    const isTicketsAdd = ticketFeesCheck(ticketType);
    const includedInAddonTicketPrice = 
  (isTicketsAdd.isPlatformFee ? platformFee : 0) +
  (isTicketsAdd.isTicketGuardFee ? ticketGuardFee : 0) +
  (isTicketsAdd.isBookingFee ? bookingFee : 0);
  const addOnCountKey = `${parentTicketTypeId}_${ticketType.id}`;
  console.log('parentTicketCount', parentTicketCount)
  
  let addOnCount =  ticketTypeCounters[addOnCountKey] ? ticketTypeCounters[addOnCountKey]  : 0;

  if (parentTicketCount < addOnCount) {
    const updatedCount = parentTicketCount;
    setTicketTypeCounters((prev) => ({
      ...prev,
      [`${parentTicketTypeId}_${ticketType.id}`]: updatedCount,
    }));
  }
  
   console.log('selectedTicketaaaa', selectedTickets)


   console.log('addOnCountsssss',parentTicketCount, addOnCount,ticketTypeCounters)
  //  setaddOncount(addOnCount)
  return (
      <div className="text-and-supporting-text2 addOn addone-field">
        <div style={{paddingBottom: ticketType?.ticketAddOns?.length === 2 ? 0 : 32}} className="text25 topHeaderCont">
          <div className="leftCont">
            <div className="leftTopCont">
              <span className="ticketTypeName">{ticketType?.name}</span>
              <span className="releaseStatus">
                <Chip
                  label="Add on"
                  variant="outlined"
                  sx={{
                    marginLeft: "12px",
                    borderRadius: "var(--br-9xs)",
                    background: "var(--surface-highlight-light)",
                    color: "#B115D1",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "20px",
                    borderColor: "var(--surface-highlight-light)",
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
                // display: "flex",
                // alignItems: "flex-start",
                // flexWrap: "nowrap",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <span
                style={{
                  color: "#0057FF",
                }}
              >
                {getCurrencySymbol()}
                {originalPrice.toFixed(2)}
              </span>
              <div className="mainPriceBottom">
                <span
                  className="supporting-incl-text"
                >
             (incl. of all fees)

                </span>

                {(ticketType?.addFeesToTicketPrice ||
                  ticketType?.addBookingFeeToTicketPrice) && (
                  <TooltipWrapper classes={classes} ticketType={ticketType} currencySymbol={getCurrencySymbol()}/>
                )}
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
              onClick={() => {
                console.log('addONcOUNT', addOnCount)

                manageTicket(ticketType, "decrement");
               console.log(' ticketTypeCounters[ticketType.id]ddddd',ticketTypeCounters[ticketType.id])
                setTotalBookingFees((prev) => prev - ticketType?.price);
                HandleAddOnDecrement(ticketType);
                handleDecrement(ticketType, "AddOn");
                let ticketCounterTemp = [...addRemoveCount];
                if (ticketCounterTemp[ticketIndex]) {
                  ticketCounterTemp[ticketIndex].addOnCount[index] -= 1;
                  setAddRemoveCount(ticketCounterTemp);
                }
                updateTicketTypeCounter(
                  ticketType.id,
                  false,
                  undefined,
                  true,
                  parentTicketTypeId
                );
              }}
              disabled={addOnCount <= 0}
              style={{
                width: "32px",
                height: "32px",
                padding: "5px",
              }}
            >
              <RemoveIcon style={{ color: "white" }} />
            </CustomButton>
            {/* <CounterValue>{parentTicketCount < addOnCount ?  parentTicketCount  : addOnCount}</CounterValue> */}
            <CounterValue>{addOnCount}</CounterValue>

            <CustomButton
             
              // disabled={
              //  ticketTypeCounters[`${parentTicketTypeId}_${ticketType.id}`]  >=
              //   ticketType?.quantity 
              // }
             
              disabled={ parentTicketCount <=  addOnCount 
                ||  ticketTypeCounters[`${parentTicketTypeId}_${ticketType.id}`] >=
                ticketType?.quantity -
                  (ticketType?.soldQuantity +
                    ticketType?.cartQuantity) ||( ticketType.quantity === ticketType.soldQuantity) }
  
              
              
              onClick={() => {
                console.log('parentTicketCount', parentTicketCount)
                console.log('first', ticketTypeCounters[`${parentTicketTypeId}_${ticketType.id}`])
                console.log('ticketTypeCounters[parentTicketTypeId]', ticketTypeCounters[parentTicketTypeId])
                console.log('addOnCount', addOnCount)
                manageTicket(ticketType, "increment");
                setTotalBookingFees((prev) => prev + ticketType?.price);
                HandleAddOnIncrement(ticketType);
                let ticketCounterTemp = [...addRemoveCount];
                if (ticketCounterTemp[ticketIndex]) {
                  ticketCounterTemp[ticketIndex].addOnCount[index] += 1;
                  setAddRemoveCount(ticketCounterTemp);
                }

                updateTicketTypeCounter(
                  ticketType.id,
                  true,
                  undefined,
                  true,
                  parentTicketTypeId
                );
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
        </div>
      </div>
    );
  };


 

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
    console.log('tickasdsadasdasda :>> ', ticketType);

    const uniqueKey = `${datasetId}_${ticketType.id}_${index}`;
    const isExpanded = expansionStates[uniqueKey] || false;
    const toggleExpansion = () => {
      setExpansionStates((prevStates) => ({
        ...prevStates,
        [uniqueKey]: !prevStates[uniqueKey],
      }));
    };

    const addBookingFeeToTicketPrice = ticketType?.addBookingFeeToTicketPrice;
    const addFeesToTicketPrice = ticketType?.addFeesToTicketPrice;
    const price = ticketType?.price || 0;
    const bookingFee = ticketType?.bookingFee || 0;
    const platformFee = ticketType?.platformFee || 0;
    const ticketGuardFee = ticketType?.ticketGuardFee || 0;

    let countTicket = 0;
    // const mainPrice = ticketType?.ticketPrice?.value ? ticketType?.ticketPrice?.value : 0;
    if(addBookingFeeToTicketPrice && !addFeesToTicketPrice)
      {
        countTicket = price + bookingFee;
      }
    if(addBookingFeeToTicketPrice && addFeesToTicketPrice)
      {
        countTicket = price + bookingFee + platformFee + ticketGuardFee;
      }
    if(!addBookingFeeToTicketPrice && !addFeesToTicketPrice)
      {
        countTicket = price;
      }
    if(!addBookingFeeToTicketPrice && addFeesToTicketPrice)
      {
        countTicket = price + platformFee + ticketGuardFee;
      }
      
    const mainPrice = ticketType?.price ? countTicket : 0;
    const originalPrice = ticketType?.price ? countTicket : 0;

    // const mainPrice = ticketType?.price ? ticketType?.price : 0;
    // const originalPrice = ticketType?.price ? ticketType?.price : 0;
    // const originalPrice = ticketType?.ticketPrice?.valueNet ? ticketType?.ticketPrice?.valueNet : 0;
    const currencySymbol = ticketType?.ticketPrice?.currency?.symbol || "";
    // const platformFee = ticketType?.platformFee || 0;
    
    // const ticketGuardFee = ticketType?.ticketGuardFee || 0;
    // const bookingFee = ticketType?.bookingFee || 0;

    const isTicketsAdd = ticketFeesCheck(ticketType);
    const includedInTotalTicketPrice = 
    (isTicketsAdd.isPlatformFee ? platformFee : 0) +
    (isTicketsAdd.isTicketGuardFee ? ticketGuardFee : 0) +
    (isTicketsAdd.isBookingFee ? bookingFee : 0);
    console.log('includedInTotalTicketPricesdsdsdsdsd', includedInTotalTicketPrice)
  

    let chipProps;
    
    if (ticketType?.isLimited) {
      chipProps = {
        label: "Limited tickets",
        sx: {
          background: "#F0F6FE",
          color: "#3169DF",
          borderColor: "#F0F6FE",
        },
      };
    } else if (ticketType?.isSoldOut ) {
      chipProps = {
        label: "Sold Out",
        sx: {
          background: "var(--surface-error-subtle)",
          color: "var(--text-error-2)",
          borderColor: "var(--surface-error-subtle)",
        },
      };
    } 
    else if (ticketType?.isAvailableToSale) {
      chipProps = {
        label: "",
        sx: {
          background: "var(--surface-error-subtle)",
          color: "var(--text-error-2)",
          borderColor: "var(--surface-error-subtle)",
        },
      };
    } 
    else if (!ticketType?.isAvailableToSale) {
      chipProps = {
        label: "Not on sale",
        sx: {
          background: "#DCDFE4",
          color: "#626F86",
          borderColor: "#DCDFE4",
        },
      };
    } 
    

    return (
      ((ticketType?.isMainTicket &&
        !ticketType?.eventTicketTypeStageReleases?.length) ||
        !ticketType?.isMainTicket) && (
        // <div className="content-parent" key={ticketType.id}>
        <div className={`content-parent ${ticketType?.isSoldOut || !ticketType?.isAvailableToSale ? 'soldout-blank' : ''}`} key={ticketType.id}>
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
                          {ticketType.offerName && (
                            <span style={{ color: "var(--twotixx-grey)" }}>
                              <span
                                style={{ margin: "0 12px 0 0", fontWeight: 100 }}
                              >
                                |
                              </span>
                              <span style={{ fontSize: "20px", fontWeight: 400 }}>
                                {ticketType.offerName}
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
                    {console.log("ticketType11 ----", ticketType)}
                    {((ticketType?.isMainTicket &&
                      !ticketType?.eventTicketTypeStageReleases?.length) ||
                      !ticketType?.isMainTicket) && (
                      <>
                        <div className="supporting-text30 rightCont">
                          <div
                            className="mainPriceIncl"
                      // className={`mainPriceIncl ${!ticketType?.isAvailableToSale || ticketType?.isSoldOut ? 'soldout-blank' : ''}`}
                            style={{
                              // display: "flex",
                              // alignItems: "flex-start",
                              // flexWrap: "nowrap",
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
                                {getCurrencySymbol()}
                                {mainPrice.toFixed(2)}
                              </span>
                            )}
     {chipProps && (chipProps.label === "Not on sale" || chipProps.label === "Sold Out") ? (
    <span style={{ color: "rgba(98, 111, 134, 1)", fontSize: "24px" }}>
      {getCurrencySymbol()}
      {originalPrice.toFixed(2)}
    </span>
  ) : (
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
      {getCurrencySymbol()}
      {originalPrice.toFixed(2)}
    </span>
  )
}

                            {includedInTotalTicketPrice >= 0 && (
                              <div className="mainPriceBottom">
                                <span
                                  className="supporting-incl-text"

                                >
                                     (incl. of all fees)
                                </span> 
                                {(ticketType?.addFeesToTicketPrice ||
                                  ticketType?.addBookingFeeToTicketPrice) && (
                                  <TooltipWrapper
                                    classes={classes}
                                    ticketType={ticketType}
                                    currencySymbol={getCurrencySymbol()}
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        
                       
                         {/* {ticketType?.isAvailableToSale && ticketType?.isLimited && !ticketType?.isSoldOut && !ticketType?.isAvailableToSale && ( */}
                         {chipProps && chipProps.label !== "Not on sale" && chipProps.label !== "Sold Out" && (
                          <div
                            className="plusMinus-btn"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              // gap: "10px",
                              flexWrap: "wrap"
                            }}
                          >
                            <CustomButton
                              onClick={() => {
                              
                                manageTicket(ticketType, "decrement");
                                setTotalBookingFees(
                                  (prev) => prev - ticketType?.price
                                );
                              
                                handleDecrement(
                                  ticketType,
                                  ticketType.offerName ? "stage" : "main"
                                );

                                let ticketCounterTemp = [...addRemoveCount];
                                if (ticketCounterTemp[index]) {
                                  ticketCounterTemp[index].ticketCount -= 1;
                                  setAddRemoveCount(ticketCounterTemp);
                                }

                                const ticketCounter =
                                  ticketTypeCounters[ticketType.id] || 0;

                                if (ticketCounter <= 1) {
                                  setTicketTypeCounters((prevCounters) => ({
                                    ...prevCounters,
                                    [ticketType.id]: 0,
                                  }));

                                  const resetAddOnsCounters =
                                    ticketType.ticketAddOns
                                      ? ticketType.ticketAddOns.reduce(
                                          (acc, addOn) => {
                                            acc[addOn.id] = 0;
                                            return acc;
                                          },
                                          {}
                                        )
                                      : {};

                                  setTicketTypeCounters((prevCounters) => ({
                                    ...prevCounters,
                                    ...resetAddOnsCounters,
                                  }));

                                  const tempTicketArr = [...staticEventData];
                                  const eventTicketTypeCategories =
                                    tempTicketArr[0]?.eventTicketTypeCategories;
                                  const ticketTypes =
                                    eventTicketTypeCategories?.[0]?.ticketTypes;

                                  if (
                                    ticketTypes &&
                                    index >= 0 &&
                                    index < ticketTypes.length
                                  ) {
                                    ticketTypes[index].ticketAddOns = [];
                                    setStaticEventData(tempTicketArr);
                                  } else {
                                    console.error(
                                      "Invalid index or data structure"
                                    );
                                  }
                                } else {
                                  updateTicketTypeCounter(
                                    ticketType.id,
                                    false,
                                    index
                                  );
                                }
                              }}
                              disabled={
                                !ticketTypeCounters[ticketType.id] ||
                                ticketTypeCounters[ticketType.id] <= 0
                              }
                              // disabled={addRemoveCount[index]?.ticketCount === 0}
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
                              disabled={
                                ticketTypeCounters[ticketType.id] >=
                                ticketType?.quantity -
                                  (ticketType?.soldQuantity +
                                    ticketType?.cartQuantity)
                                }
                              // disabled={
                              //   ticketData[index] &&
                              //   (parseInt(ticketData[index]?.quantity) <= 0 ||
                              //     parseInt(ticketData[index]?.quantity) <=
                              //     parseInt(ticketData[index]?.soldQuantity) +
                              //     parseInt(ticketData[index]?.cartQuantity) ||
                              //     addRemoveCount[index]?.ticketCount ===
                              //     ticketData[index]?.quantity)
                              // }
                              onClick={() => {

                                console.log("ticketType?.price", ticketType);
                                console.log(
                                  "ticketType?.price",
                                  ticketType?.price
                                );
                                setTotalBookingFees(
                                  (prev) => prev + ticketType?.price
                                );

                                manageTicket(ticketType, "increment");

                                // if (ticketType?.addFeesToTicketPrice) {
                                //   if (ticketType?.addBookingFeeToTicketPrice) {
                                //     setTotalBookingFees(prev => ticketType?.bookingFee)
                                //   }
                                //   setTotalPlatformFee(prev => (prev + ticketType?.platformFee))
                                //   setTotalTicketGuardFees(prev => (prev + ticketType?.ticketGuardFee))
                                // } else {
                                //   if (ticketType?.addBookingFeeToTicketPrice) {
                                //     setTotalBookingFees(prev => ticketType?.bookingFee)
                                //   }
                                // }

                                handleIncrement(
                                  ticketType,
                                  ticketType.offerName ? "stage" : "main"
                                );
                                let ticketCounterTemp = [...addRemoveCount];
                                if (ticketCounterTemp[index]) {
                                  ticketCounterTemp[index].ticketCount += 1;
                                  setAddRemoveCount(ticketCounterTemp);
                                }

                                updateTicketTypeCounter(
                                  ticketType.id,
                                  true,
                                  index
                                );

                                const tempTicketArr = [...staticEventData];
                                const eventTicketTypeCategories =
                                  tempTicketArr[0]?.eventTicketTypeCategories;
                                const ticketTypes =
                                  eventTicketTypeCategories?.[0]?.ticketTypes;

                                const currentAddOns = ticketTypes[index]?.addOns;

                                if (currentAddOns?.length < 1) {
                                  ticketTypes[index].addOns = [{ a: "b" }];
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
                      </>
                    )}
<div style={{display: !ticketTypeCounters[ticketType?.id] ? 'none' :'flex' }} className="add-on-parent-content-div">
                    {
                     ticketType?.ticketAddOns?.length > 0 && ticketType?.ticketAddOns
                        .filter((addOn) => addOn?.quantity > 0)
                        .map((addOn, addOnIndex) => (
                          <AddOnTicketDetails
                            addRemoveCount={addRemoveCount}
                            key={`${ticketType?.id}_${addOn?.id}`}
                            ticketType={{
                              ...addOn,
                              uId: ticketType?.uId,
                              isAddon: true,
                            }}
                            index={addOnIndex}
                            ticketIndex={index}
                            datasetId={datasetId}
                            expansionStates={expansionStates}
                            updateTicketTypeCounter={updateTicketTypeCounter}
                            ticketTypeCounters={ticketTypeCounters}
                            isExpanded={
                              expansionStates[`${ticketType?.id}_${addOn?.id}`]
                            }
                            toggleExpansion={() =>
                              setExpansionStates((prevStates) => ({
                                ...prevStates,
                                [`${ticketType?.id}_${addOn?.id}`]:
                                  !prevStates[`${ticketType?.id}_${addOn?.id}`],
                              }))
                            }
                            parentTicketTypeId={ticketType?.id}
                          />
                        ))}
                        </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )
    );
  };
  console.log('ticketTypeCounters',ticketTypeCounters)
  console.log('totalCountxxxxxxxxx', totalCount)

  const renderFeeDetails = () => {
   
    const totalBookingFee = selectedTickets.reduce((acc, item) => {
      const mainItemTotal = item?.price === 0 ? 0 : item?.bookingFee && item?.bookingFee * item.count;

      const addonTotal = item?.ticketAddOns?.reduce((addonAcc, addonItem) => {
        return addonAcc + (addonItem.bookingFee && addonItem.bookingFee)* addonItem.count;
      }, 0);

      return acc + mainItemTotal + addonTotal;
    }, 0);
    // const totalTicketGuardFees = selectedTickets.reduce((acc, item) => {
    //   const mainItemTotal = item?.ticketGuardFee && item?.ticketGuardFee  *item.count;

    //   const addonTotal = item?.ticketAddOns?.reduce((addonAcc, addonItem) => {
    //     return (
    //       addonAcc + (addonItem.ticketGuardFee && addonItem.ticketGuardFee)* addonItem.count
    //     );
    //   }, 0);

    //   return acc + mainItemTotal + addonTotal;
    // }, 0);
    const totalPlatformFee = selectedTickets.reduce((acc, item) => {
      const mainItemTotal = item?.price === 0 ? 0 : item?.platformFee && item?.platformFee * item.count;

      const addonTotal = item?.ticketAddOns?.reduce((addonAcc, addonItem) => {
        return addonAcc + (addonItem.platformFee && addonItem.platformFee) * addonItem.count;
      }, 0);

      return acc + mainItemTotal + addonTotal;
    }, 0);

   
    dispatch(setFees(totalBookingFee, totalTicketGuardFees, totalPlatformFee));
    // TicketGuard™ fee: ${getCurrencySymbol()}${totalTicketGuardFees}, 
    return `Organiser’s booking fee: ${getCurrencySymbol()}${totalBookingFee},  
     Platform fee: ${getCurrencySymbol()}${totalPlatformFee.toFixed(
      2
    )}`;
  };
 

    const renderTotalItemCount = (ticketType) => {
    const totalCounts = Object.values(ticketTypeCounters).reduce(
      (acc, count) => acc + count,
      0
    );
    dispatch(setTotalCount(totalCounts));
    return totalCount > 0 ? (
      <span className="total-item-count">
        <span
          className="total-inc-fees"
          style={{ fontSize: "14px", fontWeight: "400", color: 'var(--body-title)' }}
        >
          {` ( incl. ${getCurrencySymbol()}${totalFees.toFixed(2)} of fees )`}
        </span>

        <TooltipWrapper
          classes={classes}
          mainTitle={
            <div>
              {renderFeeDetails()
                .split(",")
                .map((value, index) => (
                  <div key={index}>{value}</div>
                ))}
            </div>
          }
          currencySymbol={getCurrencySymbol()}
        />

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
            style={{ marginLeft: index > 0 ? "10px" : "0",  }}
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
        ))}
      </div>
    );
  };



  // const renderCategoryWithTickets = (ticketTypes, index) => (
  //   console.log("ticketTypes", ticketTypes),
  //   (
  //     <div key={ticketTypes?.id} className="content-parent content-parent1">
  //       {/* {ticketTypes?.map((ticketType, ind) => */}

  //       {renderTicketDetails(ticketTypes, index)}
  //       {/* )} */}
  //     </div>
  //   )
  // );

//   const renderCategoryWithTickets = (category, index) => (
   
//     <div key={category.id} className="content-parent content-parent1">

// {console.log('categoryyyyyyyyyyyy', category)}
//    {console.log('indexxxxxxxxxxxxx', index)}
  
//       {category.ticketTypes.map((ticketType, ind) =>
//       console.log('categoryyyyyyyyyyyy', ticketType)
//       console.log('indexxxxxxxxxxxxx', ind)
//         renderTicketDetails(ticketType, ind)
//       )}
//     </div>
//   );


useEffect(() => {
  // const totalSum = selectedTickets.reduce((acc, item) => {
    
  //   const mainItemTotal = item?.price * item?.count ;
  //   console.log('totalSumsss :>> ', item?.price);

  //   const addonTotal = item?.ticketAddOns?.reduce((addonAcc, addonItem) => {
  //     return addonAcc + addonItem?.price * addonItem?.count;
  //   }, 0);
  //   return acc + mainItemTotal + addonTotal;
  // }, 0);

  console.log('selectedTickets:::: ', selectedTickets);

  const totalSum = selectedTickets.reduce((acc, item) => {
    const mainCount = ticketTypeCounters[item.id]
    
    const mainItemTotal = item?.price * mainCount  ;
    console.log('totalSumsss :>> ', item?.price);

    const addonTotal = item?.ticketAddOns?.reduce((addonAcc, addonItem) => {
      const addOnCounts = ticketTypeCounters[`${item.id}_${addonItem.id}`]
      console.log('ssdcsssscccsc',mainCount, addOnCounts)
      return addonAcc + addonItem?.price * addOnCounts;
    }, 0);
    return acc + mainItemTotal + addonTotal ;
  }, 0);


const calculateItemFees = (item, count) => {
  const bookingFee = item?.bookingFee ?? 0;
  const platformFee = item?.platformFee ?? 0;
  const ticketGuardFee = item?.ticketGuardFee ?? 0;

  return (bookingFee + platformFee + ticketGuardFee) * count;
};

const calculateAddOnFees = (item, ticketTypeCounters) => {
  return (item?.ticketAddOns ?? []).reduce((addonAcc, addonItem) => {
    console.log('addonItem', addonItem);
    const addOnCounts = ticketTypeCounters[`${item.id}_${addonItem.id}`] ?? 0;
    return addonAcc + calculateItemFees(addonItem, addOnCounts);
  }, 0);
};

const totalFee = selectedTickets.reduce((acc, item) => {
  console.log('selectedTickets item', item);
  const mainFees = item?.price === 0 ? 0 : ticketTypeCounters[item.id] ?? 0;
  const mainItemTotal = calculateItemFees(item, mainFees);
  const addonTotal = calculateAddOnFees(item, ticketTypeCounters);

  console.log('addonTotal', addonTotal);
  return acc + mainItemTotal + addonTotal;
}, 0);



console.log('selectedTickets', selectedTickets)

  const totalCount = selectedTickets.reduce((acc, item) => {
    const mainCounts = ticketTypeCounters[item.id]
    const mainCount =  acc + (mainCounts || 0); 

    const addonCount =  item?.ticketAddOns?.reduce((addonAcc, addonItem) => {
      const addOnCounts = ticketTypeCounters[`${item.id}_${addonItem.id}`]
      return addonAcc + (addOnCounts);
    },0)

    return  mainCount + addonCount;
  }, 0);


  settotalCount(totalCount)
  setTotalFees(totalFee);
  setTotalCountOfPrice(totalSum);
}, [selectedTickets,totalCount,ticketTypeCounters]);




const renderCategoryWithTickets = (category, index) => (
  <div key={category.id} className="content-parent content-parent1">

    {category.ticketTypes.map((ticketType, ind) => {
    
      return renderTicketDetails(ticketType, ind);
    })}
  </div>
);


  const renderAllTickets = () => {
    return (
      finalEventData.length &&
      finalEventData?.map((category, index) =>
        renderCategoryWithTickets(category, index)
      )
    );
  };

  const renderCategoryTickets = () => {
    const filteredData =
      finalEventData?.length &&
      finalEventData.filter((res) => res?.categoryId === selectedTicket);
    return (
      filteredData?.length &&
      filteredData.map((category, i) => renderCategoryWithTickets(category, i))
    );
  };

  console.log('selectedTickets', selectedTickets)

  return (
    <div className="desktop3">
      {showErrorPopUp ? <TimeoutComponent headingTitle={'Ticket availability changed'} bodyTitle={'The number of tickets you have requested is no longer available.'}/> : null}
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

          {
            selectedTicket === "all"
              ? renderAllTickets()
              : renderCategoryTickets()
            // renderCategoryWithTickets(
            //   eventData[0]?.eventTicketTypeCategories.find(
            //     (category) => category.id === selectedTicket
            //   )
            // )
          }
          {/* {selectedTicket === "all"
            ? renderAllTickets()
            : renderCategoryWithTickets(
              eventData[0]?.eventTicketTypeCategories.find(
                (category) => category.id === selectedTicket
              )
            )} */}
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
                <span className="bottomTotal" style={{ fontSize: "32px", color:"rgba(0, 35, 102, 1)" }}>
                  Total:{" "}
                  <b>
                    {getCurrencySymbol()}
                    {totalCountOfPrice?.toFixed(2)}
                     {totalCountOfPrice?.toFixed(2) !== '0.00' && renderTotalItemCount()}
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
                {/* {totalCountOfPrice > 0 ? (
                  <CommonButton
                    text={`Checkout (${getCurrencySymbol()}${totalCountOfPrice.toFixed(
                      2
                    )})`}
                    onClick={handleCheckout}
                    width="100%"
                    height="48px"
                    fontSize="28px"
                    disabled={totalCountOfPrice <= 0}
                  />
                )  */}
                {totalCount > 0 ? (
                  <CommonButton
                    text={`Checkout (${getCurrencySymbol()}${totalCountOfPrice.toFixed(
                      2
                    )})`}
                    onClick={handleCheckout}
                    width="100%"
                    height="48px"
                    fontSize="28px"
                    disabled={totalCount <= 0}
                  />
                ) 
                : (
                  <CommonButton
                    text="Checkout"
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

export default TicketsNew;
