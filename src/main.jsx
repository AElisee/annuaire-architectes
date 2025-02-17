import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/setting.scss";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
