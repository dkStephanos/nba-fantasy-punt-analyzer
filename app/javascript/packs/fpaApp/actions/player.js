import { auth } from '../utils/init';

const YAHOO_API_URL = process.env.YAHOO_API_BASE_URL;
const RAILS_API_URL = process.env.RAILS_API_URL;
const gameId = process.env.GAME_ID;

// ** Action Creators **
const setPlayers = (players) => {
  return {
    type: 'GET_PLAYERS_SUCCESS',
    players
  };
};

const setZScores = (players) => {
  return {
    type: 'SET_Z_SCORES',
    players
  };
};

const setFreeAgents = (players, playerStart) => {
  return {
    type: 'GET_FREE_AGENTS_SUCCESS',
    players,
    playerStart
  };
};

// ** Async Actions **
export const getFreeAgents = (leagueKey, playerStart = 0) => {
  const token = auth.getToken();
  return dispatch => {
    return fetch(`${RAILS_API_URL}/free_agents`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        LeagueKey: `${leagueKey}`,
        start: `${playerStart}`
      }
    })
      .then(response => response.json())
      .then(players => dispatch(setFreeAgents(players, playerStart)))
      .catch(error => console.log(error));
  };
};

export const getPlayers = (leagueKey) => {
  const token = auth.getToken();
  return dispatch => {
    return fetch(`${RAILS_API_URL}/players`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        LeagueKey: `${leagueKey}`
      }
    })
      .then(response => response.json())
      .then(players => dispatch(setPlayers(players)))
      .catch(error => console.log(error));
  };
};

export const calculateZScores = (players, means, stdDeviations) => {
  return dispatch => {
    // Loop through players, looping through each player's individual stats ignoring FGM/FGA & FTM/FTA in favor of the weighted percentages
    // reduces the value to 0 if parseFloat returns NAN, then calculates the z-Score and stores it under the key 'z-Score'
    for(let i = 1; i < players.length; i++) {
      for(let j = 0; j < players[i].player_stats.stats.stat.length; j++) {
        if(players[i].player_stats.stats.stat[j].stat_id === "9004003" || players[i].player_stats.stats.stat[j].stat_id === "9007006") {
          // do nothing
        } else {
          players[i].player_stats.stats.stat[j]['z-Score'] = ((parseFloat(players[i].player_stats.stats.stat[j].value) || 0) - means[players[i].player_stats.stats.stat[j].stat_id]) / stdDeviations[players[i].player_stats.stats.stat[j].stat_id];
        }
      }
    }
    debugger;
    // Finally, dispatch the setZScores action which will store the new player array in state
    dispatch(setZScores(players));
  };
};