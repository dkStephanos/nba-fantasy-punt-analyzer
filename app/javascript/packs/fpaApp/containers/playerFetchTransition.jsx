import { auth } from '../utils/init';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserTeam } from '../actions/team';
import { middleware } from '../middleware/init';

class PlayerFetchTransition extends Component {
  componentDidMount() {
    //Fetch User's Team stats
    this.props.getUserTeam(this.props.teamId);
    //Fetch League's Available Players stats

    //Use Player data to rank and sort players collection
  }

  redirectToHomePage = leagueKey => {
  	//Save leagueKey in sessionStorage before redirecting to homePage
    middleware.setLeagueKey(leagueKey);
    //Redirect to home page at start position 0
    window.location.replace(`/home/0`);
  };

  render() {
    return (
      <div className="player-fetch-transition">
      	<h1>Fetching Player/Team Data</h1>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    teamId: state.teamReducer.teamId
  };
};

export default connect(mapStateToProps, { getUserTeam })(PlayerFetchTransition);