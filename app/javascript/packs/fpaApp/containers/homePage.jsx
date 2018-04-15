import React from 'react';
import { Table, Pager } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getFreeAgents } from '../actions/player';
import { middleware } from '../middleware/init';
import PlayerRow from '../components/playerRow';

class HomePage extends React.Component {
  componentDidMount() {
  	this.fetchFreeAgentData(this.props.playerStart);
  }

  fetchFreeAgentData = playerStart => {
  	const leagueKey = middleware.getLeagueKey();
	this.props.getFreeAgents(leagueKey, playerStart);
  };

  render() {
  	debugger;
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
		      <th>Rank</th>
		      <th>Name</th>
		      <th>Team</th>
		      <th>Positions</th>
		    </tr>
		  </thead>
		  <tbody>
		    {playerRows}
		  </tbody>
		</Table>
		<Pager>
  			<Pager.Item >Previous</Pager.Item>{' '}
  			<Pager.Item onClick={() => {this.fetchFreeAgentData(currentRank)}}>Next</Pager.Item>
		</Pager>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    league: state.leagueReducer.league,
    players: state.playerReducer.players,
    playerStart: parseInt(ownProps.match.params.playerStart)
  };
};

export default connect(mapStateToProps, { getFreeAgents })(HomePage);