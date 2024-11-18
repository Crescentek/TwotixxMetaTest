import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function MuiLoader() {
return (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100vh",
      position: "absolute",
      top: 0,
      left: "10px",
      zIndex: 1000,
      backgroundColor: "transparent", 
    }}
  >
    <CircularProgress disableShrink />
  </div>
);
}
