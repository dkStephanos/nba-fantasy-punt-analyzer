import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Routes />, document.getElementById("fpa-app"));
});
