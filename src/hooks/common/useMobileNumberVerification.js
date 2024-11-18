import { mobileNumberReg } from "../../constants/regex";

const useMobileNumberVerification = (number) => {
  return mobileNumberReg.test(number);
};
export default useMobileNumberVerification;
