import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTeams } from '../actions/team';
import { middleware } from '../middleware/init';
import Team from '../components/team';

class TeamSelect extends React.Component {
  componentDidMount() {
    this.props.getLeagues();
  }

  redirectToHomePage = teamKey => {
  	//Save teamKey in sessionStorage before redirecting to homePage
    middleware.setTeamKey(teamKey);
    //Redirect to home page at start position 0
    window.location.replace(`/home/0`);
  };

  render() {
    debugger;
  	const teams = this.props.teams.map(team => (
      <div className="teamCard" onClick={() => this.redirectToHomePage(team.team_key)}>
        <Team name={team.name} numTeams={team.num_teams} url={team.url}/>
      </div>
    ));

    return (
      <div className="team-selector">
      	{teams}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    teams: state.leagueReducer.teams
  };
};

export default connect(mapStateToProps, { getTeams })(TeamSelect);