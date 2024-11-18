import React from "react";
import loaderGif from "../../assets/gif/loader-tx2.gif"; 

const Loader = ({backgroundColor}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
         height: "100vh",
        minHeight: "100%",
        backgroundColor: backgroundColor ? backgroundColor : "transparent !important",
        position: "fixed",
        // top: backgroundColor ? 80 : 0,
        top: 0,
        left: 0,
        zIndex: 1000000,
      }}
    >
      <img
        src={loaderGif}
        alt="Loading..."
        style={{ width: "120px", height: "auto" }}
      />
    </div>
  );
};

export default Loader;
