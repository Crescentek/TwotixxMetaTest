import { useSelector } from "react-redux";
import "./EventFormContainer.css";
import dayjs from "dayjs";

const EventFormContainer = ({ whichmodule }) => {
  const eventData = useSelector((state) => state.eventData);

  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const getOrdinalNum = (n) => {
      let s = ["th", "st", "nd", "rd"],
        v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    const formattedDay = getOrdinalNum(day);
    const monthName = date.toLocaleString("en", { month: "long" });

    return `${formattedDay} ${monthName} ${year}`;
  }

  const formatEventDates = () => {
    if (!eventData[0]?.startDate || !eventData[0]?.endDate) {
      return "Date not available";
    }

    const startDate = new Date(eventData[0].startDate);
    const endDate = new Date(eventData[0].endDate);

    const sixAmOnEndDate = new Date(endDate);
    sixAmOnEndDate.setHours(6, 0, 0, 0);
    const showEndDate = endDate > sixAmOnEndDate;

    var formattedStartDate = formatDate(startDate);

    if (showEndDate) {
      var formattedEndDate = formatDate(endDate);
      return `${formattedStartDate} - ${formattedEndDate}`;
    } else {
      return formattedStartDate;
    }
  };

  return (
    <div className="modal-header content-overall">
      <div className="content24">
        {whichmodule === "ticket" && (
          <img
            style={{}}
            className="content-icon1"
            alt=""
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            src={
              eventData[0]?.imageUri
                ? `${process.env.REACT_APP_API_URL}${eventData[0].imageUri}`
                : "/noimage.png"
            }
            onError={(e) => {
              if (e.target.src !== "/noimage.png") {
                e.target.src = "/noimage.png";
              }
            }}
          />
        )}
        <div style={{ marginTop: 24 }} className="text-and-supporting-text1">
          <div
            style={{ marginBottom: "40px", lineHeight: "40px" }}
            className="text24"
          >
            {eventData[0]?.name}
          </div>
          <div className="calendar-container">
            <img className="calendar-icon2" alt="" src="/CalenderEvent2.svg" />
            <div className="supporting-text-parent">
              <div className="supporting-text27">{formatEventDates()}</div>
              {eventData[0] && eventData[0].startDate && (
                <div
                  style={{ fontSize: "16px", fontWeight: "400" }}
                  className="supporting-text1"
                >
                  Doors open at {dayjs(eventData[0].startDate).format("HH:mm")}
                </div>
              )}
            </div>
          </div>
          <div className="calendar-container">
            <img className="calendar-icon2" alt="" src="/MapsEvent.svg" />
            <div className="supporting-text27">
            {`${eventData[0]?.venue?.name}, ${eventData[0]?.venue?.address?.city}`}
                                <div style={{ fontSize: "16px", fontWeight: "400" }}
                className="supporting-text1">
                                {(eventData[0]?.venue?.address?.addressLine1
                              ? eventData[0]?.venue?.address?.addressLine1
                              : "") +
                              (eventData[0]?.venue?.address?.addressLine2
                                ? ", " +
                                  eventData[0]?.venue?.address?.addressLine2
                                : "")}
                                </div>
              <div
                style={{ fontSize: "16px", fontWeight: "400" }}
                className="supporting-text1"
              >
                 {`${eventData[0]?.venue?.address?.postalCode}, ${eventData[0]?.venue?.address?.city}, ${eventData[0]?.venue?.address?.country}`}
              </div>
            </div>
          </div>
        </div>
        {whichmodule === "payment" && (
          <img
            className="content-icon1 cont-payment"
            alt=""
            src={
              eventData[0]?.imageUri
                ? `${process.env.REACT_APP_API_URL}${eventData[0].imageUri}`
                : "/noimage.png"
            }
            onError={(e) => {
              if (e.target.src !== "/noimage.png") {
                e.target.src = "/noimage.png";
              }
            }}
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
        )}
      </div>
    </div>
  );
};

export default EventFormContainer;
