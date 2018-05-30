import { auth } from "../utils/init";
import React, { Component } from "react";

import { Jumbotron } from "react-bootstrap";
import logo from "../assets/images/icons/Circle256.gif";

class LogoutTransition extends Component {
  componentDidMount() {
    auth.logout();
  }

  render() {
    return (
      <Jumbotron style={{ textAlign: "center" }} className="logout-transition">
        <h2 style={{ fontWeight: "bold" }}>Logging Out...</h2>
        <img className="loading" src={logo} />
      </Jumbotron>
    );
  }
}

export default LogoutTransition;
