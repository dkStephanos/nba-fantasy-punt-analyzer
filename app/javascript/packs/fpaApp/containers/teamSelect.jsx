import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeams } from "../actions/team";
import { clearPlayers } from "../actions/player";
import { middleware } from "../middleware/init";
import Team from "../components/team";

class TeamSelect extends React.Component {
  componentDidMount() {
    this.props.getTeams();
    this.props.clearPlayers();
  }

  redirectToFetchingPlayers = teamKey => {
    //Save teamKey/leagueKey in sessionStorage before redirecting to homePage
    //teamKey = 'GameID.l.LeagueID.t.TeamID' ... leagueKey = 'GameID.l.LeagueID'
    middleware.setTeamKey(teamKey);
    middleware.setLeagueKey(
      teamKey
        .split(".")
        .slice(0, 3)
        .join(".")
    );
    //Redirect fetchingPlayers transition
    window.location.replace(`/fetchingPlayers`);
  };

  render() {
    let teams = [];
    if (this.props.teams) {
      teams = this.props.teams.map(team => (
        <div
          className="teamCard"
          onClick={() => this.redirectToFetchingPlayers(team.team_key)}
          key={`${team.team_key}-card`}
        >
          <Team team={team} />
        </div>
      ));
    }

    return <div className="team-selector row">{teams ? teams : ""}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    teams: state.teamReducer.teams
  };
};

export default connect(mapStateToProps, { getTeams, clearPlayers })(TeamSelect);
