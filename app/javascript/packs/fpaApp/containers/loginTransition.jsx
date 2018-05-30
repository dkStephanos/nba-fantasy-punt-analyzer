import React, { Component } from "react";
import { auth } from "../utils/init";
import { connect } from "react-redux";

import { Jumbotron } from "react-bootstrap";
import { middleware } from "../middleware/init";
import logo from "../assets/images/icons/Circle256.gif";

import { getCurrentUser } from "../actions/user";

class LoginTransition extends Component {
  componentDidMount() {
    const token = auth.getQueryParams();
    auth.doAuthentication(token);

    this.props.getCurrentUser();
  }

  componentDidUpdate() {
    middleware.setCurrentUserId(this.props.currentUser.id);
    this.props.currentUser.current_team_key
      ? this.redirectToFetchingPlayers(this.props.currentUser.current_team_key)
      : this.redirectToTeamSelect();
  }

  redirectToTeamSelect = () => {
    //Redirect to team select
    window.location.replace(`/teamSelect`);
  };

  redirectToFetchingPlayers = userTeamKey => {
    //Save userTeamKey/leagueKey in sessionStorage before redirecting to homePage
    //userTeamKey = 'GameID.l.LeagueID.t.TeamID' ... leagueKey = 'GameID.l.LeagueID'
    middleware.setUserTeamKey(userTeamKey);
    middleware.setLeagueKey(
      userTeamKey
        .split(".")
        .slice(0, 3)
        .join(".")
    );
    //Redirect fetchingPlayers transition
    window.location.replace(`/fetchingPlayers`);
  };

  render() {
    return (
      <Jumbotron style={{ textAlign: "center" }} className="login-transition">
        <h2 style={{ fontWeight: "bold" }}>Login Transitioning...</h2>
        <img className="loading" src={logo} />
      </Jumbotron>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.userReducer.currentUser
  };
};

export default connect(mapStateToProps, { getCurrentUser })(LoginTransition);
