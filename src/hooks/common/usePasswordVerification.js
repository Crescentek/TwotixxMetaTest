import { lowerCaseReg, numberReg, symbolReg, upperCaseReg } from '../../constants/regex';

const usePasswordVerification = (password) => {
  let validationArray = [];
  if (password?.length < 8) {
    validationArray.push('Length');
  }
  if (upperCaseReg.test(password) === false) {
    validationArray.push('Upper');
  }
  if (lowerCaseReg.test(password) === false) {
    validationArray.push('Lower');
  }
  if (numberReg.test(password) === false) {
    validationArray.push('Number');
  }
  if (symbolReg.test(password) === false) {
    validationArray.push('Symbol');
  }
  return validationArray;
};

export default usePasswordVerification;
