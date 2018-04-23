import React from 'react';

class Team extends React.Component {

  render() {
  	debugger;
    return(
      <div key={this.props.team.team_key}>
        <h3>{this.props.team.name}</h3>
        <img src={this.props.team.team_logos.team_logo.url}></img>
        <p>Manager: {this.props.team.managers.manager.nickname}</p>
        <img src={this.props.team.managers.manager.image_url}></img>
        <p>Scoring Type: {this.props.team.league_scoring_type}</p>
        <a href={this.props.team.url}>To Team</a>
      </div>
    )
  }
}
export default Team;