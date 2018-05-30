import React from "react";
import { Button, Jumbotron } from "react-bootstrap";
import logo from "../assets/images/icons/Circle256.gif";

const authorizeUrl = "https://api.login.yahoo.com/oauth2/request_auth";
const clientId = process.env.CLIENT_ID;
const redirectUri = "http://stephanos.pagekite.me/auth";
const responseType = "token";
const language = "en-us";

class LoginPage extends React.Component {
  render() {
    return (
      <Jumbotron>
        <div style={{ textAlign: "center" }}>
          <img src={logo} />
          <h1>Welcome to Fantasy Punt Analyzer!</h1>
          <p>
            Being good at everything is hard, especially in fantasy basketball.
            That is why we here at FPA believe in the holy act of punting
            statistical categories! We use live data from your Yahoo Sports
            league to dynamically rank and sort players with a custom algorithm
            that allows users to filter out categories. Just log in, select your
            team, and you're good to go!
          </p>
          <Button
            href={`${authorizeUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&language=${language}`}
            bsStyle="primary"
            bsSize="large"
          >
            Log In
          </Button>
        </div>
      </Jumbotron>
    );
  }
}
export default LoginPage;
