import React from "react";
import { Badge } from "react-bootstrap";
import { playerStatKeys } from "../assets/data/playerStatKeys";

class PlayerRow extends React.Component {
  render() {
    // We want to loop through the stats in the player stats array, creating a table element for each
    const statRows = this.props.player.player_stats.stats.stat.map(stat => (
      <td
        key={`${this.props.player.player_key}-${stat.stat_id}`}
        title={playerStatKeys[stat.stat_id]}
        style={Object.assign({}, this.props.style, { textAlign: "center" })}
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
          <div style={{ verticalAlign: "middle", display: "table-cell" }}>
            <Badge>{this.props.rank}</Badge>
          </div>
          <div style={{ paddingLeft: "10%", display: "table-cell" }}>
            <img src={this.props.player.headshot.url} />{" "}
          </div>
        </td>
        <td
          key={`${this.props.player.player_key}-name`}
          style={this.props.style}
        >
          <span>
            <span style={{ fontWeight: "bold" }}>
              {this.props.player.name.full}{" "}
              <span className="player-status-badge" style={{ color: "red" }}>
                {this.props.player.status ? this.props.player.status : ""}
              </span>
            </span>
            <br />
            <div style={{ fontSize: "small" }}>
              {this.props.player.editorial_team_abbr} -{" "}
              {this.props.player.display_position}
            </div>
          </span>
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
