import {
  upperCaseReg,
  lowerCaseReg,
  numberReg,
  symbolReg,
} from "../constants/regex";

const usePasswordValidation = (password) => {
  let errors = [];
  let unmetCriteria = [];

  if (!password || password.length < 8) {
    unmetCriteria.push("Length");
  }
  if (!upperCaseReg.test(password)) {
    unmetCriteria.push("Upper");
  }
  if (!lowerCaseReg.test(password)) {
    unmetCriteria.push("Lower");
  }
  if (!numberReg.test(password)) {
    unmetCriteria.push("Number");
  }
  if (!symbolReg.test(password)) {
    unmetCriteria.push("Symbol");
  }

  return {
    isValid: unmetCriteria.length === 0,
    errors: errors.join(", "),
    unmetCriteria,
  };
};

export default usePasswordValidation;
