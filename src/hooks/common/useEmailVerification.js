import { emailReg } from "../../constants/regex";

const useEmailVerification = (email) => {
  return emailReg.test(email);
};
export default useEmailVerification;
