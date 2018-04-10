import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLeagues } from '../actions/league';

class LeagueSelect extends Component {
  componentDidMount() {
    this.props.getLeagues();
  }

  render() {
    return (
      <div className="league-selector">
        <p>{this.props.leagues}</p>
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