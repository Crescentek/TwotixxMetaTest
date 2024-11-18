import "./GetAppStepper.css";
import CommonButton from "../Common/CommonButton";
const GetAppStepper = ({ onContinue }) => {
  return (
    <div className="desktop4">
      <div className="content21">
        <div className="header5">
          <img
            className="check-verified-02-icon"
            alt=""
            src="/checkverified02.svg"
          />
          <div className="text-and-supporting-text">
            <div className="text22">PAYMENT CONFIRMED</div>
            <div className="supporting-text25">
              Your ticket(s) will be will waiting for you in the Twotixx App.
            </div>
          </div>
        </div>
        <div className="text23">DOWNLOAD APP</div>
        <div className="rectangle-parent">
          <img className="group-child" alt="" src="/rectangle-41@2x.png" />
          <div className="group-item" />
        </div>
        <CommonButton
          text="Continue"
          onClick={onContinue}
          width="100%"
          height="52px"
          fontSize="28px"
        />
      </div>
    </div>
  );
};

export default GetAppStepper;
