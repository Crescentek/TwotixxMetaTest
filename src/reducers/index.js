import { combineReducers } from "redux";
import authToken from "./authToken";
import selectedCountry from "./selectedCountry";

const rootReducer = combineReducers({
  authToken,
  selectedCountry
});

export default rootReducer;
