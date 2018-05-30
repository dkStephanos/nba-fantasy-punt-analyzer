import React from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

import {
  getUserTeamPlayers,
  sortPlayersByRank,
  calculateAndSortPlayerRanksWithFilters,
  clearFilteredPlayers
} from "../actions/player";

import PlayerRow from "../components/playerRow";
import FilterSelect from "../components/filterSelect";
import PlayerTable from "../components/playerTable";

class MyTeam extends React.Component {
  componentDidMount() {
    // Gets the MyTeam players and also, clears filtered players to make sure we have a fresh start
    this.props.getUserTeamPlayers(this.props.players);
    this.props.clearFilteredPlayers();
  }

  handleApplyFilters = filters => {
    // Passes in the userTeamPlayers, the filters, and true indicating we are storing the team results
    this.props.calculateAndSortPlayerRanksWithFilters(
      this.props.userTeamPlayers,
      filters,
      true
    );
  };

  render() {
    // Perhaps move this to a sub-component
    let labels = this.props.categoryLabels.map(
      categoryLabel =>
        categoryLabel === "Rank" ||
        categoryLabel === "Name" ||
        categoryLabel === "Owner" ? (
          <th key={`${categoryLabel}-table-header`}>{categoryLabel}</th>
        ) : (
          <th
            style={{ verticalAlign: "middle", textAlign: "center" }}
            key={`${categoryLabel}-table-header`}
          >
            {categoryLabel}
          </th>
        )
    );
    // Initializes currentRank to be incremented when creating PlayerRow's
    let currentRank = 1;

    // Checks to see if we have userTeamPlayers with filters applied, rendering those, rendering all userTeamPlayers if not
    let playerRows;

    if (this.props.filteredUserTeamPlayers.length > 0) {
      playerRows = this.props.filteredUserTeamPlayers.map(player => (
        <PlayerRow
          key={`${player.player_id}`}
          player={player}
          rank={currentRank++}
          style={{ verticalAlign: "middle" }}
        />
      ));
    } else {
      playerRows = this.props.userTeamPlayers.map(player => (
        <PlayerRow
          key={`${player.player_id}`}
          player={player}
          rank={currentRank++}
          style={{ verticalAlign: "middle" }}
        />
      ));
    }

    return (
      <div>
        <FilterSelect
          categoryLabels={this.props.categoryLabels}
          handleClick={this.handleApplyFilters}
        />
        <PlayerTable labels={labels} playerRows={playerRows} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    players: state.playerReducer.players,
    userTeamPlayers: state.playerReducer.userTeamPlayers,
    categoryLabels: state.statReducer.categoryLabels,
    filteredUserTeamPlayers: state.playerReducer.filteredUserTeamPlayers
  };
};

export default connect(mapStateToProps, {
  getUserTeamPlayers,
  sortPlayersByRank,
  calculateAndSortPlayerRanksWithFilters,
  clearFilteredPlayers
})(MyTeam);
