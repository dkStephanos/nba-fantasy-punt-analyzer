import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLeagues } from '../actions/league';
import League from '../components/league';

class LeagueSelect extends Component {
  componentDidMount() {
    this.props.getLeagues();
  }

  render() {
  	const leagues = this.props.leagues.map(league => (
      <div className="leagueCard">
        <League key={league.league_key} name={league.name} numTeams={league.num_teams} url={league.url}/>
      </div>
    ));

    return (
      <div className="league-selector">
      	{leagues}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    leagues: state.leagueReducer.leagues
  };
};

export default connect(mapStateToProps, { getLeagues })(LeagueSelect);