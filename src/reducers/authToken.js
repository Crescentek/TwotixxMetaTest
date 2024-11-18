import { AUTH_TOKEN } from "../actions";

export default function authToken(state = null, action = {}) {
  switch (action.type) {
    case AUTH_TOKEN: {
      return {
        ...state,
        authToken: action.payload,
      };
    }

    default:
      return state;
  }
}
