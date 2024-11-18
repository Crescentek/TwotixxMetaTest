import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <img
        src="/notfound.png"
        alt="Not Found"
        style={{ maxWidth: "100%", maxHeight: "400px" }}
      />
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <div style={{ marginTop: "20px" }}>
        <Link
          to="/"
          style={{ textDecoration: "none", color: "var(--Primary-Mid-Blue)" }}
        >
          Go Home
        </Link>{" "}
      </div>
    </div>
  );
}

export default NotFound;
