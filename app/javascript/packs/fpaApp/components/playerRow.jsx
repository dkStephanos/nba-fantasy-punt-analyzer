import React from 'react';
import statCategories from '../assets/data/playerStatKeys';

class PlayerRow extends React.Component {

      render() {
            // We want to loop through the stats in the player stats array, creating a table element for each
            const statRows = this.props.player.player_stats.stats.stat.map(stat => (
                       <td>{stat.value}</td>
                  ));

            // Then return the table row, the first few rows will be the same regardless of stats, so we create those in the return statement
            return(
                  <tr>
                        <td>{this.props.rank}: <img src={this.props.player.headshot.url}/></td>
                        <td>{this.props.player.name.full}</td>
                        <td>{this.props.player.editorial_team_abbr}</td>
                        <td>{this.props.player.display_position}</td>
                        <td>{this.props.player.ownership.owner_team_name ? this.props.player.ownership.owner_team_name : "Free Agent"}</td>
                        <td>{this.props.player.status ? this.props.player.status : "Healthy"}</td>
                        {statRows}
                  </tr>
            )
      }
}

export default PlayerRow;