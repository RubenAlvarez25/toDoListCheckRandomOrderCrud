import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import NombreLista from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NombreLista />
  </StrictMode>
);
