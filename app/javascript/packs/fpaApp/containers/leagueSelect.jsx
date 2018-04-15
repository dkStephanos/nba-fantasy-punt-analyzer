import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLeagues } from '../actions/league';
import { middleware } from '../middleware/init';
import League from '../components/league';

class LeagueSelect extends React.Component {
  componentDidMount() {
    this.props.getLeagues();
  }

  redirectToHomePage = leagueKey => {
  	//Save leagueKey in sessionStorage before redirecting to homePage
    middleware.setLeagueKey(leagueKey);
    window.location.replace(`/home/1`);
  };

  render() {
  	const leagues = this.props.leagues.map(league => (
      <div className="leagueCard" onClick={() => this.redirectToHomePage(league.league_key)}>
        <League name={league.name} numTeams={league.num_teams} url={league.url}/>
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