import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, <App />);
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}

reportWebVitals();
