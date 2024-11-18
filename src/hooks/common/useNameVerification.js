import { characterReg } from "../../constants/regex";

const useNameVerification = (name) => {
  return characterReg.test(name);
};
export default useNameVerification;
