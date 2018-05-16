import React from "react";
import { Button } from "react-bootstrap";

class Team extends React.Component {
  render() {
    return (
      <div className="col-sm-6 col-md-4">
        <div className="thumbnail">
          <img src={this.props.team.team_logos.team_logo.url} alt="Team Logo" />
          <div className="caption" style={{ textAlign: "center" }}>
            <h3>{this.props.team.name}</h3>
            <p>Manager: {this.props.team.managers.manager.nickname}</p>
            <p>Scoring Type: {this.props.team.league_scoring_type}</p>
            <p>
              <Button bsStyle="primary" href={this.props.team.url}>
                Go to Yahoo!
              </Button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Team;
