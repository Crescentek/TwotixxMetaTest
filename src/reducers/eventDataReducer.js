// Redux action types
const SET_EVENT_DATA = "SET_EVENT_DATA";
const SET_LOADING = "SET_LOADING";
const SET_ERROR = "SET_ERROR";
const SET_TOTAL_PRICE = "SET_TOTAL_PRICE";
const SET_FLAT_DISCOUNT = "SET_FLAT_DISCOUNT";
const SET_TICKET_TYPES_DATA = "SET_TICKET_TYPES_DATA";
const SET_TICKET_TOTALS_DATA = "SET_TICKET_TOTALS_DATA";
const SET_EXISTING_EMAIL = "SET_EXISTING_EMAIL";
const SET_REGISTRATION_EMAIL = "SET_REGISTRATION_EMAIL";
const SET_NEW_REGISTRATION = "SET_NEW_REGISTRATION";
const SET_TRACKING_CODE = "SET_TRACKING_CODE";
const SET_NO_REFUNDS_POLICY = "SET_NO_REFUNDS_POLICY";
const SET_TOTAL_INCLUDED_IN_TICKET_PRICE = "SET_TOTAL_INCLUDED_IN_TICKET_PRICE";
const START_TIMER = "START_TIMER";
const RESET_TIMER = "RESET_TIMER";
const SET_OTP = "SET_OTP";
const CLEAR_OTP = "CLEAR_OTP";
const SET_MOBILE_OTP = "SET_MOBILE_OTP";
const SET_EMAIL_OTP = "SET_EMAIL_OTP";
const SET_CREATECART_ID = "SET_CREATECART_ID ";
const SET_TOTAL_TICKETS = "SET_TOTAL_TICKETS";
const SET_REMOVE_ID   = "SET_REMOVE_ID ";
const  SET_TOTAL_TAX = " SET_TOTAL_TAX"
 const SET_FEES = 'SET_FEES';
 const SET_TOTAL_COUNT = "SET_TOTAL_COUNT"
 const SET_DEFUALT_COUNTRY = "SET_DEFUALT_COUNTRY"


// Redux action creators


export const setEventData = (data) => ({ type: SET_EVENT_DATA, payload: data });
export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});
export const setError = (error) => ({ type: SET_ERROR, payload: error });
export const setTotalPrice = (price) => ({
  type: SET_TOTAL_PRICE,
  payload: price,
});
export const setTicketTypesData = (data) => ({
  type: SET_TICKET_TYPES_DATA,
  payload: data,
});
export const setTicketTotalsData = (data) => ({
  type: SET_TICKET_TOTALS_DATA,
  payload: data,
});
export const setExistingEmail = (email) => ({
  type: SET_EXISTING_EMAIL,
  payload: email,
});
export const setRegistrationEmail = (email) => ({
  type: SET_REGISTRATION_EMAIL,
  payload: email,
});
export const setNewRegistration = (isNewRegistration) => ({
  type: SET_NEW_REGISTRATION,
  payload: isNewRegistration,
});
export const setFlatDiscount = (discount) => ({
  type: SET_FLAT_DISCOUNT,
  payload: discount,
});
export const setTrackingCode = (trackingCode) => ({
  type: SET_TRACKING_CODE,
  payload: trackingCode,
});
export const setNoRefundsPolicy = (policy) => ({
  type: SET_NO_REFUNDS_POLICY,
  payload: policy,
});
export const setTotalIncludedInTicketPrice = (totalIncludedInTicketPrice) => ({
  type: "SET_TOTAL_INCLUDED_IN_TICKET_PRICE",
  payload: totalIncludedInTicketPrice,
});
export const startTimer = () => ({
  type: START_TIMER,
});

export const resetTimer = () => ({
  type: RESET_TIMER,
});

export const setOTP = (otp) => ({
  type: SET_OTP,
  payload: otp,
});

export const clearOTP = () => ({
  type: CLEAR_OTP,
});

export const setMobileOTP = (otp) => ({
  type: SET_MOBILE_OTP,
  payload: otp,
});

export const setEmailOTP = (otp) => ({
  type: SET_EMAIL_OTP,
  payload: otp,
});


export const setCreateCartId = (cartId) => ({
  type: SET_CREATECART_ID,
  payload: cartId,
});
export const setTotalTickets = (total) => ({
  type: SET_TOTAL_TICKETS,
  payload: total,
});
export const setTotalTaxPrize = (Totaltax) => ({
  type: SET_TOTAL_TAX,
  payload: Totaltax,
});

export const setDefaltCountry = (defaultCountry) => ({
  type: SET_DEFUALT_COUNTRY,
  payload: defaultCountry,
});







export const setFees = (bookingFee, ticketGuardFee, platformFee) => ({
  type: SET_FEES,
  payload: { bookingFee, ticketGuardFee, platformFee },
});
export const setTotalCount = (totalCount) => ({
  type: SET_TOTAL_COUNT,
  payload: totalCount,
});

export const clearCreateCartId = () => ({
  type: SET_REMOVE_ID,
});

const initialState = {
  eventData: [],
  isLoading: false,
  error: null,
  totalPrice: 0,
  flatDiscount: 0,
  ticketTypesData: {},
  ticketTotalsData: {},
  existingEmail: "",
  registrationEmail: "",
  isNewRegistration: false,
  trackingCode: null,
  noRefundsPolicy: false,
  totalIncludedInTicketPrice: 0,
  timerStarted: false,
  otp: "",
  mobileOTP: "",
  emailOTP: "",
  cartId : null,
  total:"",
  Totaltax:"",
  fees : {

    bookingFee: 0,
  ticketGuardFee: 0,
  platformFee: 0,
  },
  totalCount:"",
  defaultCountry: {
    id: 1,
    name: "United Kingdom",
    dialingCode: 44,
    nationality: "British",
    flag: "\uD83C\uDDEC\uD83C\uDDE7",
    currency: {
        id: 3,
        code: "GBP",
        name: "British Pounds",
        symbol: "£",
        ticketGuardFee: 1.990000,
        platformFee: 0.390000,
        platformFeePct: 1.0000,
        minimumThreshold: 50.00,
        maximumThreshold: 500.00,
        maxBookingFee: 20.000000,
        maxBookingPct: 10.0000,
        bookingFeePctRange: [
            1,
            5,
            10
        ]
    },
    "sortOrder": 1,
    "isVatRequired": false,
    "vatPercentage": 0
},
};

// Reducer function
export default function eventDataReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DEFUALT_COUNTRY:
      return { ...state, defaultCountry: action.payload };
    case SET_EVENT_DATA:
      return { ...state, eventData: action.payload };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_TOTAL_PRICE:
      return { ...state, totalPrice: action.payload };
    case SET_TICKET_TYPES_DATA:
      return { ...state, ticketTypesData: action.payload };
    case SET_TRACKING_CODE:
      return { ...state, trackingCode: action.payload };
    case SET_TICKET_TOTALS_DATA:
      return { ...state, ticketTotalsData: action.payload };
    case SET_FLAT_DISCOUNT:
      return { ...state, flatDiscount: action.payload };
    case SET_EXISTING_EMAIL:
      return { ...state, existingEmail: action.payload };
    case SET_REGISTRATION_EMAIL:
      return { ...state, registrationEmail: action.payload };
    case SET_NEW_REGISTRATION:
      return { ...state, isNewRegistration: action.payload };
    case SET_NO_REFUNDS_POLICY:
      return { ...state, noRefundsPolicy: action.payload };
    case SET_TOTAL_INCLUDED_IN_TICKET_PRICE:
      return { ...state, totalIncludedInTicketPrice: action.payload };
    case START_TIMER:
      return { ...state, timerStarted: true };
    case RESET_TIMER:
      return { ...state, timerStarted: false };
    case SET_OTP:
      return { ...state, otp: action.payload };
    case CLEAR_OTP:
      return { ...state, otp: "" };
    case SET_MOBILE_OTP:
      return {
        ...state,
        mobileOTP: action.payload,
      };
    case SET_EMAIL_OTP:
      return {
        ...state,
        emailOTP: action.payload,
      };
      case SET_CREATECART_ID:
        return {
          ...state,
          cartId: action.payload,
        };
        case SET_REMOVE_ID :
          return {
            ...state,
            cartId: null,
          };
        case SET_TOTAL_TICKETS:
          return {
            ...state,
            total: action.payload,
          };
          case  SET_TOTAL_TAX:
            return {
              ...state,
              Totaltax: action.payload,
            };
            case  SET_TOTAL_COUNT:
              return {
                ...state,
                totalCount: action.payload,
              };
             
            case SET_FEES:
              return {
                ...state,
                fees: {
                  ...state.fees,
                  bookingFee: action.payload.bookingFee,
                  ticketGuardFee: action.payload.ticketGuardFee,
                  platformFee: action.payload.platformFee,
                }
              };
        case SET_REMOVE_ID:
          return {
            ...state,
            cartId: null,
          };
    default:
      return state;
  }
}
