import React from 'react';
import { Table, Pager } from 'react-bootstrap';
import { connect } from 'react-redux';

import { determineCategoryLabels } from '../actions/stat';
import { sortPlayersByRank } from '../actions/player';
import { middleware } from '../middleware/init';

import PlayerRow from '../components/playerRow';
import FilterSelect from '../components/FilterSelect';

class HomePage extends React.Component {
  componentDidMount() {
  	this.props.determineCategoryLabels(this.props.players[0]);
  	this.props.sortPlayersByRank(this.props.players);
  }

  handleApplyFilters = categories => {
  	debugger;
  }

  render() {
  	// Perhaps move this to a sub-component
  	let labels = this.props.categoryLabels.map(categoryLabel => (
  			<th>{categoryLabel}</th>
  		));
  	// Initializes currentRank to be incremented when creating PlayerRow's
  	let currentRank = this.props.playerStart + 1;
  	let playerRows = this.props.players.map(player => (
        	<PlayerRow key={player.id} player={player} rank={currentRank++}/>
    	));
    return (
      <div>
        <h1>NBA Fantasy Analyzer App</h1>
        <FilterSelect categoryLabels={this.props.categoryLabels} handleClick={this.handleApplyFilters} />
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
    categoryLabels: state.statReducer.categoryLabels
  };
};

export default connect(mapStateToProps, { determineCategoryLabels, sortPlayersByRank })(HomePage);