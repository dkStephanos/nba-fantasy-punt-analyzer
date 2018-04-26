import { auth } from '../utils/init';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlayers } from '../actions/player';
import { middleware } from '../middleware/init';
import { calculateMeans, determineCategoryLabels } from '../actions/stat';

class PlayerFetchTransition extends Component {
  componentDidMount() {
    //Fetch League Players
    this.props.getPlayers(middleware.getLeagueKey());
  }

  componentDidUpdate() {
  	if(Object.keys(this.props.means).length === 0) {
  		this.props.calculateMeans(this.props.players);
  		this.props.determineCategoryLabels(this.props.players[0]);
  	}
  }


  redirectToHomePage = () => {
    //Redirect to home page at start position 0
    window.location.replace(`/home/0`);
  };

  render() {
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
    players: state.playerReducer.players,
    means: state.statReducer.means,
    categoryLabels: state.statReducer.categoryLabels
  };
};

export default connect(mapStateToProps, { getPlayers, calculateMeans, determineCategoryLabels })(PlayerFetchTransition);