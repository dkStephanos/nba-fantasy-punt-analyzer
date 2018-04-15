import { auth } from '../utils/init';
import React, { Component } from 'react';

class PlayerFetchTransition extends Component {
  componentDidMount() {
    //Fetch User's Team stats

    //Fetch League's Available Players stats

    //Use Player data to rank and sort players collection
  }

  render() {
    return (
      <div className="player-fetch-transition">
      	<h1>Fetching Player/Team Data</h1>
      </div>
    );
  }
}

export default PlayerFetchTransition;