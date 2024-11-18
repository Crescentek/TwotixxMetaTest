import { SELECTED_COUNTRY } from '../actions';

export default function selectedCountry(state = null, action = {}) {
  switch (action.type) {
    case SELECTED_COUNTRY: {
      return {
        ...state,
        selectedCountry: action.payload,
      };
    }

    default:
      return state;
  }
}