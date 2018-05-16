import React from "react";
import { Button, Jumbotron } from "react-bootstrap";

class NotFound extends React.Component {
  render() {
    return (
      <Jumbotron>
        <h1>Air Ball...</h1>
        <p>This page doesn't exist</p>
        <Button href={`/home`} bsStyle="primary">
          Back Home
        </Button>
      </Jumbotron>
    );
  }
}
export default NotFound;
