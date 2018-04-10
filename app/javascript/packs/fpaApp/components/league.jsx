import React from 'react';

class League extends React.Component {

  render() {
    return(
      <div>
        <h3>{this.props.name} ({this.props.numTeams})</h3>
        <a href={this.props.url}>To League</a>
      </div>
    )
  }
}
export default League;