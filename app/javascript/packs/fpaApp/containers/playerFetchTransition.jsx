import { auth } from '../utils/init';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlayers } from '../actions/player';
import { middleware } from '../middleware/init';

class PlayerFetchTransition extends Component {
  componentDidMount() {
    //Fetch User's Team stats
    this.props.getPlayers(middleware.getLeagueKey());
    //Fetch League's Available Players stats

    //Use Player data to rank and sort players collection
  }

  redirectToHomePage = () => {
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
    players: state.playerReducer.players
  };
};

export default connect(mapStateToProps, { getPlayers })(PlayerFetchTransition);