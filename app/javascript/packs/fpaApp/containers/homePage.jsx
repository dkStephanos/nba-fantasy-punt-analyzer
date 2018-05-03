import React from 'react';
import { Table, Pager } from 'react-bootstrap';
import { connect } from 'react-redux';

import { determineCategoryLabels } from '../actions/stat';
import { sortPlayersByRank, calculateAndSortPlayerRanksWithFilters, clearFilteredPlayers } from '../actions/player';
import { middleware } from '../middleware/init';

import PlayerRow from '../components/playerRow';
import FilterSelect from '../components/filterSelect';

class HomePage extends React.Component {
  componentDidMount() {
  	// Initial actions
  	this.props.determineCategoryLabels(this.props.players[0]);
  	this.props.sortPlayersByRank(this.props.players);
  	this.props.clearFilteredPlayers();
  }

  handleApplyFilters = filters => {
  	if(filters) {
  		// If there are filters, calculate ranks accordingly, storing the result in filteredPlayers
  		this.props.calculateAndSortPlayerRanksWithFilters(this.props.players, filters);
  	} else {
  		// If there are no filters, clear filtered players
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
  			<th key={`${categoryLabel}-table-header`}>{categoryLabel}</th>
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
        <FilterSelect categoryLabels={this.props.categoryLabels} handleClick={this.handleApplyFilters} />
  		<Table striped bordered responsive hover condensed>
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