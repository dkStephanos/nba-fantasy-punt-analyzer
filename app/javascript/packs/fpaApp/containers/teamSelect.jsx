import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserTeams, postUserCurrentTeam } from "../actions/team";
import { clearPlayers } from "../actions/player";
import { middleware } from "../middleware/init";
import Team from "../components/team";

class TeamSelect extends React.Component {
  componentDidMount() {
    this.props.getUserTeams();
    this.props.clearPlayers();
  }

  redirectToFetchingPlayers = userTeam => {
    // Dispatches action to save selected team as user's currentTeam in database
    const currentUserId = middleware.getCurrentUserId();
    this.props.postUserCurrentTeam(userTeam, currentUserId);
    //Save userTeam.team_key/leagueKey in sessionStorage before redirecting to homePage
    //userTeam.team_key = 'GameID.l.LeagueID.t.TeamID' ... leagueKey = 'GameID.l.LeagueID'
    middleware.setUserTeamKey(userTeam.team_key);
    middleware.setLeagueKey(
      userTeam.team_key
        .split(".")
        .slice(0, 3)
        .join(".")
    );
    //Redirect fetchingPlayers transition
    window.location.replace(`/fetchingPlayers`);
  };

  render() {
    let userTeams = [];
    if (this.props.userTeams) {
      userTeams = this.props.userTeams.map(userTeam => (
        <div
          className="userTeamCard"
          onClick={() => this.redirectToFetchingPlayers(userTeam)}
          key={`${userTeam.team_key}-card`}
        >
          <Team team={userTeam} />
        </div>
      ));
    }
    userTeams = userTeams.reverse();

    return (
      <div className="team-selector row">{userTeams ? userTeams : ""}</div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userTeams: state.teamReducer.userTeams
  };
};

export default connect(mapStateToProps, {
  getUserTeams,
  postUserCurrentTeam,
  clearPlayers
})(TeamSelect);
