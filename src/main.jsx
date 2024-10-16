import React from "react";
import './index.css';
import ReactDOM from "react-dom/client";
import { Auth } from "./components/Auth.jsx";
import { CreditScore } from "./components/creditscore.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth />
  </React.StrictMode>,
);
