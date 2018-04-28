import { auth } from '../utils/init';
import { playerStatKeys } from '../assets/data/playerStatKeys';

const YAHOO_API_URL = process.env.YAHOO_API_BASE_URL;
const RAILS_API_URL = process.env.RAILS_API_URL;
const gameId = process.env.GAME_ID;

// ** Action Creators **
const setMeans = (means) => {
  return {
    type: 'SET_MEANS',
    means
  };
};

const setStdDeviations = (stdDeviations) => {
  return {
    type: 'SET_STD_DEVIATIONS',
    stdDeviations
  };
};

const setCategoryLabels = (categoryLabels) => {
  return {
    type: 'SET_CATEGORY_LABELS',
    categoryLabels
  };
};

// ** Actions **
export const calculateMeans = (players) => {
  return dispatch => {
    let means = {};
    // Initialize means to the stats of the first player with keys set to the stat_id 
    // Ignore FGA/FGM and FTA/FTM, those values are only relevant to FG/FT impact,
    // stores the value 0 if parseFloat returns NAN
    for(let i = 0; i < players[0].player_stats.stats.stat.length; i++) {
      if(players[0].player_stats.stats.stat[i].stat_id === "9004003" || players[0].player_stats.stats.stat[i].stat_id === "9007006") {
        // do nothing
      } else {
        means[players[0].player_stats.stats.stat[i].stat_id] = parseFloat(players[0].player_stats.stats.stat[i].value) || 0;
      }
    }

    // Then step through the rest of the players, adding their stats to the 'mean'
    for(let k = 1; k < players.length; k++) {
      for(let j = 0; j < players[k].player_stats.stats.stat.length; j++) {
        if(players[k].player_stats.stats.stat[j].stat_id === "9004003" || players[k].player_stats.stats.stat[j].stat_id === "9007006") {
        // do nothing
      } else {
        means[players[k].player_stats.stats.stat[j].stat_id] += parseFloat(players[k].player_stats.stats.stat[j].value) || 0;
      }
      }
    }

    // Then loop through 'means' dividing each total by players.length
    for(let key in means) {
      means[key] = means[key]/players.length;
    }
    // Finally, dispatch the setMeans action which will store the calculated means in state
    dispatch(setMeans(means));
  };
};

export const calculateStdDeviations = (players, means) => {
  return dispatch => {
    let stdDeviations = {};
    // Initialize 'stdDeviations' to the sqaured differences of the first player's stats with keys set to the stat_id
    // and converts values from string to float, ignoring FGM/FGA & FTM/FTA in favor of the weighted percentages
    // reduces the value to 0 if parseFloat returns NAN
    for(let i = 0; i < players[0].player_stats.stats.stat.length; i++) {
      if(players[0].player_stats.stats.stat[i].stat_id === "9004003" || players[0].player_stats.stats.stat[i].stat_id === "9007006") {
        // do nothing
      } else {
        stdDeviations[players[0].player_stats.stats.stat[i].stat_id] = Math.pow((parseFloat(players[0].player_stats.stats.stat[i].value) || 0) - means[players[0].player_stats.stats.stat[i].stat_id], 2);
      }
    }
    // Then step through the rest of the players, adding their squared differences to the 'stdDeviations'
    for(let k = 1; k < players.length; k++) {
      for(let j = 0; j < players[k].player_stats.stats.stat.length; j++) {
        if(players[k].player_stats.stats.stat[j].stat_id === "9004003" || players[k].player_stats.stats.stat[j].stat_id === "9007006") {
          // do nothing
        } else {
          stdDeviations[players[k].player_stats.stats.stat[j].stat_id] += Math.pow((parseFloat(players[k].player_stats.stats.stat[j].value) || 0) - means[players[k].player_stats.stats.stat[j].stat_id], 2);
        }
      }
    }
    // Then loop through 'stdDeviations' dividing each total by players.length which gives us the variance
    // taking the square root of that gives us the standard deviation, which is stored in 'stdDeviations'
    for(let key in stdDeviations) {
      stdDeviations[key] = Math.sqrt(stdDeviations[key]/players.length);
    }
    // Finally, dispatch the setstdDeviations action which will store the calculated stdDeviations in state
    dispatch(setStdDeviations(stdDeviations));
  };
};

export const determineCategoryLabels = (player) => {
  return dispatch => {
    // Initialize category labels with basic info, same regardless of statistical categories
    let categoryLabels = ["Rank", "Name", "Team", "Position"];

    // Step through stat categories, storing the corresponding label for each in categoryLabels
    for(let i = 0; i < player.player_stats.stats.stat.length; i++) {
      categoryLabels.push(playerStatKeys[player.player_stats.stats.stat[i].stat_id]);
    }

    // If succesfull, store our results in state
    categoryLabels.length > 0 ? dispatch(setCategoryLabels(categoryLabels)) : '';
  }
};