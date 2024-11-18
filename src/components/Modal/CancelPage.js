import { useNavigate } from "react-router-dom";
import CommonButton from "../Common/CommonButton";
import "../GetAppStepper/GetAppStepper.css";

const CancelPage = () => {
  const navigate = useNavigate();

  const handleContinueClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };
  return (
    <div className="forsussesspage">
      <div className="header5">
        <img
          className="check-verified-02-icon"
          alt=""
          src="/icons8-cross.svg"
        />
        <div className="text-and-supporting-text">
          <div className="text-payment-declined">PAYMENT FAILED</div>
          <div className="supporting-text25">
            Your payment has failed. Please try again.
          </div>
        </div>
      </div>
      <CommonButton
        text="Go back home"
        onClick={handleContinueClick}
        height="52px"
        fontSize="28px"
      />
    </div>
  );
};

export default CancelPage;
