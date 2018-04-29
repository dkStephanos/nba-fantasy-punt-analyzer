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

const setFgAndFtImpacts = (players) => {
  return {
    type: 'SET_FG_AND_FT_IMPACTS',
    players
  };
};

const setZScores = (players) => {
  return {
    type: 'SET_Z_SCORES',
    players
  };
};

const setPlayerRanks = (players) => {
  return {
    type: 'SET_PLAYER_RANKS',
    players
  };
};

const sortPlayers = (players) => {
  return {
    type: 'SORT_PLAYERS_SUCCESS',
    players
  };
};

// ** Async Actions **
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

// ** Stat Caluculations **
export const calculateFgAndFtImpacts = (players, means) => {
  return dispatch => {
    // Initialize means object to store the average FGA, FGM, FTA and FTM
    let means = {};

    // Get the values for the first player
    for(let i = 0; i < players[0].player_stats.stats.stat.length; i++) {
      if(players[0].player_stats.stats.stat[i].stat_id === "9004003") {
        means["3"] = parseFloat(players[0].player_stats.stats.stat[i].value.split('/')[0]) || 0;
        means["4"] = parseFloat(players[0].player_stats.stats.stat[i].value.split('/')[1]) || 0;
      } else if(players[0].player_stats.stats.stat[i].stat_id === "9007006") {
        means["6"] = parseFloat(players[0].player_stats.stats.stat[i].value.split('/')[0]) || 0;
        means["7"] = parseFloat(players[0].player_stats.stats.stat[i].value.split('/')[1]) || 0;
      } else {
        // do nothing
      }
    }

    // Then step through the rest of the players, adding their stats to the 'mean'
    for(let k = 1; k < players.length; k++) {
      for(let j = 0; j < players[k].player_stats.stats.stat.length; j++) {
        if(players[k].player_stats.stats.stat[j].stat_id === "9004003") {
          means["3"] += parseFloat(players[k].player_stats.stats.stat[j].value.split('/')[0]) || 0;
          means["4"] += parseFloat(players[k].player_stats.stats.stat[j].value.split('/')[1]) || 0;
        } else if(players[0].player_stats.stats.stat[j].stat_id === "9007006") {
          means["6"] += parseFloat(players[k].player_stats.stats.stat[j].value.split('/')[0]) || 0;
          means["7"] += parseFloat(players[k].player_stats.stats.stat[j].value.split('/')[1]) || 0;
        } else {
          // do nothing
        }
      }
    }

    // Then loop through 'means' dividing each total by players.length
    for(let key in means) {
      means[key] = means[key]/players.length;
    }

    // Initialize variables to store the stats we need for the calculation
    let fgPercentage, ftPercentage, fgAttempted, ftAttempted, fgImpact, ftImpact;
    let averageFgPercentage = means[3]/means[4];
    let averageFtPercentage = means[6]/means[7];

    // Loop through players, looping through each player's individual stats collecting their fg/ft percentages and attempts
    for(let i = 0; i < players.length; i++) {
      for(let j = 0; j < players[i].player_stats.stats.stat.length; j++) {
        switch(players[i].player_stats.stats.stat[j].stat_id) {
          case '5':
            fgPercentage = parseFloat(players[i].player_stats.stats.stat[j].value) || 0;
            break;
          case '8':
            ftPercentage = parseFloat(players[i].player_stats.stats.stat[j].value) || 0;
            break;
          case '9004003':
            fgAttempted = parseFloat(players[i].player_stats.stats.stat[j].value.split('/')[1]) || 0;
            break;
          case '9007006':
            ftAttempted = parseFloat(players[i].player_stats.stats.stat[j].value.split('/')[1]) || 0;
            break;
          default:
        }
      };
      // Once we have the data we need, calculate fg/ft impact, and push it to the stat array as an object
      // with the correct statKey for output and value we calculated
      fgImpact = Number(((fgPercentage - averageFgPercentage) * fgAttempted).toFixed(3));
      players[i].player_stats.stats.stat.push({ stat_id: "1005", value: fgImpact })
      ftImpact = Number(((ftPercentage - averageFtPercentage) * ftAttempted).toFixed(3));
      players[i].player_stats.stats.stat.push({ stat_id: "1008", value: ftImpact })
    }
    // Finally, dispatch the setZScores action which will store the new player array in state
    dispatch(setFgAndFtImpacts(players));
  };
};

export const calculateZScores = (players, means, stdDeviations) => {
  return dispatch => {
    // Loop through players, looping through each player's individual stats ignoring FGM/FGA & FTM/FTA in favor of their impacts
    // reduces the value to 0 if parseFloat returns NAN, then calculates the z-Score and stores it under the key 'zScore'
    for(let i = 0; i < players.length; i++) {
      for(let j = 0; j < players[i].player_stats.stats.stat.length; j++) {
        if(players[i].player_stats.stats.stat[j].stat_id === "9004003" || players[i].player_stats.stats.stat[j].stat_id === "9007006") {
          // do nothing
        } else {
          players[i].player_stats.stats.stat[j]['zScore'] = ((parseFloat(players[i].player_stats.stats.stat[j].value) || 0) - means[players[i].player_stats.stats.stat[j].stat_id]) / stdDeviations[players[i].player_stats.stats.stat[j].stat_id];
        }
      }
    }
    // Finally, dispatch the setZScores action which will store the new player array in state
    dispatch(setZScores(players));
  };
};

export const calculatePlayerRanks = (players) => {
  return dispatch => {
    // Initialize rank to 0
    let rank = 0;
    // Loop through players, looping through each player's individual stats ignoring FGM/FGA & FTM/FTA in favor of the impacts
    // reduces the value to 0 if parseFloat returns NAN, then adds the value to the player's rank
    for(let i = 0; i < players.length; i++) {
      // Reset rank for each player
      rank = 0;
      for(let j = 0; j < players[i].player_stats.stats.stat.length; j++) {
        if(players[i].player_stats.stats.stat[j].stat_id === "9004003" || players[i].player_stats.stats.stat[j].stat_id === "9007006") {
          // do nothing
        } else {
          rank += players[i].player_stats.stats.stat[j].zScore;
        }
      }
      // Once we've added all z-Scores, divide by the length to get the average zScore
      // and then store that result in the player object under the key 'rank'
      players[i].rank = rank / players[i].player_stats.stats.stat.length;
    }
    // Finally, dispatch the setPlayerRanks action which will store the new player array in state
    dispatch(setPlayerRanks(players));
  };
};

export const sortPlayersByRank = (players) => {
  return dispatch => {
    // Sort players based on the calculated rank
    players.sort((a,b) => {return (a.rank < b.rank) ? 1 : ((b.rank < a.rank) ? -1 : 0);} ); 

    // Finally, store the sorted players array in state
    dispatch(sortPlayers(players));
  };
};