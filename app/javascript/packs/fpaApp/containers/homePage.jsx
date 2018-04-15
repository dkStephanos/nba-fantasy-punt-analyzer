import React from 'react';
import { Table, Pager } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getLeagueByKey } from '../actions/league';
import { getFreeAgents } from '../actions/player';
import { middleware } from '../middleware/init';
import PlayerRow from '../components/playerRow';

class HomePage extends React.Component {
  componentWillMount() {
  	const leagueKey = middleware.getLeagueKey();
	//this.props.getLeagueByKey(leagueKey);
	this.props.getFreeAgents(leagueKey, 26);
  }

  render() {
  	debugger;
  	let currentRank = 1;
  	const playerRows = this.props.players.map(player => (
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
  			<Pager.Item href="#">Previous</Pager.Item>{' '}
  			<Pager.Item href="#">Next</Pager.Item>
		</Pager>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    league: state.leagueReducer.league,
    players: state.playerReducer.players
  };
};

export default connect(mapStateToProps, { getLeagueByKey, getFreeAgents })(HomePage);