import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../utils/init';
import { middleware } from '../middleware/init';
import { getPlayers } from '../actions/player';
import { determineCategoryLabels, calculateMeans, calculateStdDeviations } from '../actions/stat';

class PlayerFetchTransition extends Component {
  componentDidMount() {
    //Fetch League Players
    this.props.getPlayers(middleware.getLeagueKey());
  }

  componentDidUpdate() {
  	if(Object.keys(this.props.means).length === 0) {
  		this.props.determineCategoryLabels(this.props.players[0]);
  		this.props.calculateMeans(this.props.players);
  	} else if(Object.keys(this.props.stdDeviations).length === 0) {
  		debugger;
  		this.props.calculateStdDeviations(this.props.players, this.props.means);
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
    categoryLabels: state.statReducer.categoryLabels,
    means: state.statReducer.means,
    stdDeviations: state.statReducer.stdDeviations
  };
};

export default connect(mapStateToProps, { getPlayers, determineCategoryLabels, calculateMeans, calculateStdDeviations })(PlayerFetchTransition);