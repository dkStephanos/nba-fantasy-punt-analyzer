import React from 'react';
import { Table, Pager } from 'react-bootstrap';
import { connect } from 'react-redux';
import { determineCategoryLabels } from '../actions/stat';
import { middleware } from '../middleware/init';
import PlayerRow from '../components/playerRow';

class HomePage extends React.Component {
  componentDidMount() {
  	this.determineCategoryLabels(this.props.players);
  }

  render() {
  	debugger;
  	let labels = this.props.categoryLabels.map(categoryLabel => (
  			<th>{categoryLabel.value}</th>
  		));
  	let currentRank = this.props.playerStart;
  	let playerRows = this.props.players.map(player => (
        	<PlayerRow key={player.id} player={player} rank={currentRank++}/>
    	));
    return (
      <div>
        <h1>NBA Fantasy Analyzer App</h1>
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

export default connect(mapStateToProps, { determineCategoryLabels })(HomePage);