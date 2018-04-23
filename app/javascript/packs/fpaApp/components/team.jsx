import React from 'react';

class Team extends React.Component {

  render() {
  	debugger;
    return(
      <div>
        <h3>{this.props.team.name}</h3>
        <a href={this.props.team.url}>To Team</a>
      </div>
    )
  }
}
export default Team;