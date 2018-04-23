import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTeams } from '../actions/team';
import { middleware } from '../middleware/init';
import Team from '../components/team';

class TeamSelect extends React.Component {
  componentDidMount() {
    this.props.getTeams();
  }

  redirectToHomePage = teamKey => {
  	//Save teamKey in sessionStorage before redirecting to homePage
    middleware.setTeamKey(teamKey);
    //Redirect to home page at start position 0
    window.location.replace(`/home/0`);
  };

  render() {
    let teams = [];
  	if(this.props.teams) {
      debugger;
      teams = this.props.teams.map(team => (
      <div className="teamCard" onClick={() => this.redirectToHomePage(team.team_key)}>
        <Team team={JSON.parse(team)}/>
      </div>
    ));
    }

    return (
      <div className="team-selector">
      	{teams ? teams : ''}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    teams: state.teamReducer.teams
  };
};

export default connect(mapStateToProps, { getTeams })(TeamSelect);