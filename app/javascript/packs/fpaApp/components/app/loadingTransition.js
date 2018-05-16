import React, { Component } from "react";
import loadingIcon from "../../assets/images/icons/Circle256.gif";

class LoadingTransition extends Component {
  render() {
    return (
      <div style={{ align: "center" }} className="loading-transition">
        <img src={logo} className="loading" alt="logo" />
      </div>
    );
  }
}
export default LoadingTransition;
