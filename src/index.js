import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/About.css";
import "./styles/primary.css";
import "./styles/secondary.css";
import "./styles/RegisterButton.css";
import "./styles/LoginButton.css";
import "./styles/Register.css";
import "./styles/Login.css";
import "./styles/StartButton.css";
import "./styles/Notes.css";
import "./styles/PublicNote.css";
import "./styles/spinner.css";
import "./styles/MyProfile.css";
import "./styles/SaveButton.css";
import "./styles/CancelButton.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
