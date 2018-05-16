import React from "react";
import { playerStatKeys } from "../assets/data/playerStatKeys";

class PlayerRow extends React.Component {
  render() {
    // We want to loop through the stats in the player stats array, creating a table element for each
    const statRows = this.props.player.player_stats.stats.stat.map(stat => (
      <td
        key={`${this.props.player.player_key}-${stat.stat_id}`}
        title={playerStatKeys[stat.stat_id]}
        style={this.props.style}
      >
        {stat.value}
      </td>
    ));

    // Then return the table row, the first few rows will be the same regardless of stats, so we create those in the return statement
    return (
      <tr>
        <td
          key={`${this.props.player.player_key}-rank`}
          style={this.props.style}
        >
          {this.props.rank}: <img src={this.props.player.headshot.url} />
        </td>
        <td
          key={`${this.props.player.player_key}-name`}
          style={this.props.style}
        >
          {this.props.player.name.full}{" "}
          <p className="player-status-badge">
            {this.props.player.status ? this.props.player.status : ""}
          </p>
        </td>
        <td
          key={`${this.props.player.player_key}-team`}
          style={this.props.style}
        >
          {this.props.player.editorial_team_abbr}
        </td>
        <td
          key={`${this.props.player.player_key}-position`}
          style={this.props.style}
        >
          {this.props.player.display_position}
        </td>
        <td
          key={`${this.props.player.player_key}-owner`}
          style={this.props.style}
        >
          {this.props.player.ownership.owner_team_name
            ? this.props.player.ownership.owner_team_name
            : "Free Agent"}
        </td>
        {statRows}
      </tr>
    );
  }
}

export default PlayerRow;
