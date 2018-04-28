import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../utils/init';
import { middleware } from '../middleware/init';
import { getPlayers, calculateFgAndFtImpacts, calculateZScores, calculatePlayerRanks } from '../actions/player';
import { calculateMeans, calculateStdDeviations } from '../actions/stat';

class PlayerFetchTransition extends Component {
  componentDidMount() {
  	// Initializes boolean to determine when it is safe to calculate z-Scores
    // Fetch League Players
    this.props.getPlayers(middleware.getLeagueKey());
  }

  // Used for a series of data fetches. Each if statement checks if that action has already occured
  // so we don't repeat actions. As a result, one if statement worth of actions occur per lifecycle event
  // sequentially until all fetches are done and we are redirected to the home page
  componentDidUpdate() {
  	// First, we need the FG and FT impacts for each player
  	if(this.props.players[0].player_stats.stats.stat[this.props.players[0].player_stats.stats.stat.length - 1].stat_id !== "1008") {
  		this.props.calculateFgAndFtImpacts(this.props.players, this.props.means);
  	} else if(Object.keys(this.props.means).length === 0) {
      // After we have the FG/FT impacts, we can determine means for each player's statistical categories 
      debugger;
      this.props.calculateMeans(this.props.players);
    } else if(Object.keys(this.props.stdDeviations).length === 0) {
  		// Once we have that, we can calculate the standard deviation for each statistical category 
  		this.props.calculateStdDeviations(this.props.players, this.props.means);
  	} else if(!Object.keys(this.props.players[0].player_stats.stats.stat[5]).includes("zScore")) {
  		// Then, once we have the standard deviations, we can calculate the players z-Scores
  		this.props.calculateZScores(this.props.players, this.props.means, this.props.stdDeviations);
  	} else if(!Object.keys(this.props.players[0]).includes("rank")) {
  		// Last step, once we have the z-Scores for the players, we can calculate their rank
  		this.props.calculatePlayerRanks(this.props.players);
  	} else {
      debugger;
  		// Finally, if we got this far, we have all the data how we need it, so redirect to the home page
  		this.redirectToHomePage();
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
    stdDeviations: state.statReducer.stdDeviations
  };
};

export default connect(mapStateToProps, { getPlayers, calculateFgAndFtImpacts, calculateZScores, calculatePlayerRanks, calculateMeans, calculateStdDeviations })(PlayerFetchTransition);