import React from 'react';

class PlayerRow extends React.Component {

      statCategories = {
            '0': "GP",
            '1': "GS",
            '2': "MIN",
            '3': "FGA",
            '4': "FGM",
            '5': "FG%",
            '6': "FTA",
            '7': "FTM",
            '8': "FT%",
            '9': "3PTA",
            '10': "3PTM",
            '11': "3PT%",
            '12': "PTS",
            '13': "OREB",
            '14': "DREB",
            '15': "REB",
            '16': "AST",
            '17': "ST",
            '18': "BLK",
            '19': "TO",
            '20': "PF",          
            '22': "DISQ",
            '23': "TECH",
            '24': "EJCT",
            '25': "FF",
            '26': "MPG",
            '27': "DD",
            '28': "TD",
            '9004003': "FGM/FGA",
            '9007006': "FTM/FTA"
      }

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