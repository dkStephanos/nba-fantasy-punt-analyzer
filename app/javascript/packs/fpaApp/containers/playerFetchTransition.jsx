import { auth } from '../utils/init';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlayers } from '../actions/player';
import { middleware } from '../middleware/init';

class PlayerFetchTransition extends Component {
  componentDidMount() {
    //Fetch League Players
    this.props.getPlayers(middleware.getLeagueKey()).then(console.log("success"))
    //Use Player data to rank and sort players collection
    debugger;
  }

  redirectToHomePage = () => {
    //Redirect to home page at start position 0
    window.location.replace(`/home/0`);
  };

  render() {
  	debugger;
    return (
      <div className="player-fetch-transition">
      	<h1>Fetching Player/Team Data</h1>
      	<p>This could take a sec...</p>
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