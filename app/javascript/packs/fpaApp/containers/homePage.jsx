import React from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

import { determineCategoryLabels } from "../actions/stat";
import {
  sortPlayersByRank,
  calculateAndSortPlayerRanksWithFilters,
  clearFilteredPlayers
} from "../actions/player";
import { middleware } from "../middleware/init";

import PlayerRow from "../components/playerRow";
import FilterSelect from "../components/filterSelect";
import PlayerTable from "../components/playerTable";

class HomePage extends React.Component {
  componentDidMount() {
    // Initial actions
    this.props.determineCategoryLabels(this.props.players[0]);
    this.props.calculateAndSortPlayerRanksWithFilters(this.props.players, []);
    this.props.clearFilteredPlayers();
  }

  handleApplyFilters = filters => {
    this.props.calculateAndSortPlayerRanksWithFilters(
      this.props.players,
      filters
    );
  };

  render() {
    debugger;
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

    // Checks to see if we have players with filters applied, rendering those, rendering all players if not
    let playerRows;

    if (this.props.filteredPlayers.length > 0) {
      playerRows = this.props.filteredPlayers.map(player => (
        <PlayerRow
          key={`${player.player_id}`}
          player={player}
          rank={currentRank++}
          style={{ verticalAlign: "middle" }}
        />
      ));
    } else {
      playerRows = this.props.players.map(player => (
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
    categoryLabels: state.statReducer.categoryLabels,
    filteredPlayers: state.playerReducer.filteredPlayers
  };
};

export default connect(mapStateToProps, {
  determineCategoryLabels,
  sortPlayersByRank,
  calculateAndSortPlayerRanksWithFilters,
  clearFilteredPlayers
})(HomePage);
