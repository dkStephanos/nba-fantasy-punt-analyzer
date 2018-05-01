import React from 'react';
import { Table, Pager } from 'react-bootstrap';
import { connect } from 'react-redux';

import { determineCategoryLabels } from '../actions/stat';
import { sortPlayersByRank, calculateAndSortPlayerRanksWithFilters, clearFilteredPlayers } from '../actions/player';
import { middleware } from '../middleware/init';

import PlayerRow from '../components/playerRow';
import StatFilterSelect from '../components/statFilterSelect';
import PlayerFilterSelect from '../components/playerFilterSelect';

class HomePage extends React.Component {
  componentDidMount() {
  	// Initial actions
  	this.props.determineCategoryLabels(this.props.players[0]);
  	this.props.sortPlayersByRank(this.props.players);
  	this.props.clearFilteredPlayers();
  }

  handleApplyStatFilters = statFilters => {
  	if(statFilters.categories) {
  		this.props.calculateAndSortPlayerRanksWithFilters(this.props.players, statFilters.categories);
  	} else {
  		this.props.clearFilteredPlayers();
  	}
  }

  handleApplyPlayerFilters = playerFilters => {
  	debugger;
  }

  render() {
  	debugger;
  	// Perhaps move this to a sub-component
  	let labels = this.props.categoryLabels.map(categoryLabel => (
  			<th>{categoryLabel}</th>
  		));
  	// Initializes currentRank to be incremented when creating PlayerRow's
  	let currentRank = this.props.playerStart + 1;
  	
  	// Checks to see if we have players with filters applied, rendering those, rendering all players if not
  	let playerRows;

  	if(this.props.filteredPlayers.length > 0) {
  		playerRows = this.props.filteredPlayers.map(player => (
        	<PlayerRow key={player.id} player={player} rank={currentRank++}/>
    	));
  	} else {
  		playerRows = this.props.players.map(player => (
        	<PlayerRow key={player.id} player={player} rank={currentRank++}/>
    	));
  	}
  	
    return (
      <div>
        <h1>NBA Fantasy Analyzer App</h1>
        <StatFilterSelect categoryLabels={this.props.categoryLabels} handleClick={this.handleApplyStatFilters} />
        <PlayerFilterSelect handleClick={this.handleApplyPlayerFilters} />
  		<Table striped bordered responsive hover>
		  <thead>
		    <tr>
		      {labels}
		    </tr>
		  </thead>
		  <tbody>
		    {playerRows}
		  </tbody>
		</Table>
		<Pager>
  			<Pager.Item >Previous</Pager.Item>{' '}
  			<Pager.Item >Next</Pager.Item>
		</Pager>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    players: state.playerReducer.players,
    playerStart: parseInt(ownProps.match.params.playerStart),
    categoryLabels: state.statReducer.categoryLabels,
    filteredPlayers: state.playerReducer.filteredPlayers
  };
};

export default connect(mapStateToProps, { determineCategoryLabels, sortPlayersByRank, calculateAndSortPlayerRanksWithFilters, clearFilteredPlayers })(HomePage);