import React from "react";
import { Button } from "react-bootstrap";

class Team extends React.Component {
  render() {
    return (
      <div className="col-sm-6 col-md-4">
        <div style={{ textAlign: "center" }} className="thumbnail">
          <img
            style={{ paddingTop: "3%" }}
            src={this.props.team.team_logos.team_logo.url}
            alt="Team Logo"
          />
          <div
            className="caption"
            style={{ borderBottom: "1px solid #D4D4D4" }}
          >
            <h3>{this.props.team.name}</h3>
            <p>Manager: {this.props.team.managers.manager.nickname}</p>
            <p>Scoring Type: {this.props.team.league_scoring_type}</p>
          </div>
          <p style={{ paddingTop: "3%" }}>
            <Button bsStyle="primary" href={this.props.team.url}>
              Go to Yahoo!
            </Button>
          </p>
        </div>
      </div>
    );
  }
}
export default Team;
