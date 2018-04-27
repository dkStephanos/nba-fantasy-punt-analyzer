import React from 'react';
import statCategories from '../assets/data/playerStatKeys';

class PlayerRow extends React.Component {

      render() {
            const statRows = this.props.player.player_stats.stats.stat.map(stat => (
                       <td>{stat.value}</td>
                  ));

            return(
                  <tr>
                        <td>{this.props.rank}: <img src={this.props.player.headshot.url}/></td>
                        <td>{this.props.player.name.full}</td>
                        <td>{this.props.player.editorial_team_abbr}</td>
                        <td>{this.props.player.display_position}</td>
                        {statRows}
                  </tr>
            )
      }
}

export default PlayerRow;