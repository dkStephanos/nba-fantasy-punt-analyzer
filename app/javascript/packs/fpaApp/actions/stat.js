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
    // and converts values from string to float, splitting FGM/FGA & FTM/FTA into seperate categories
    // stores the value 0 if parseFloat returns NAN
    for(let i = 0; i < players[0].player_stats.stats.stat.length; i++) {
      if(players[0].player_stats.stats.stat[i].stat_id === "9004003") {
        means["3"] = parseFloat(players[0].player_stats.stats.stat[i].value.split('/')[0]) || 0;
        means["4"] = parseFloat(players[0].player_stats.stats.stat[i].value.split('/')[1]) || 0;
      } else if(players[0].player_stats.stats.stat[i].stat_id === "9007006") {
        means["6"] = parseFloat(players[0].player_stats.stats.stat[i].value.split('/')[0]) || 0;
        means["7"] = parseFloat(players[0].player_stats.stats.stat[i].value.split('/')[1]) || 0;
      } else {
        means[players[0].player_stats.stats.stat[i].stat_id] = parseFloat(players[0].player_stats.stats.stat[i].value) || 0;
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

export const determineCategoryLabels = (player) => {
  return dispatch => {
    // Initialize category labels as an empty array
    let categoryLabels = [];

    // Step through stat categories, storing the corresponding label for each in categoryLabels
    for(let i = 0; i < player.player_stats.stats.stat.length; i++) {
      categoryLabels.push(playerStatKeys[player.player_stats.stats.stat[i].stat_id]);
    }

    // If succesfull, store our results in state
    categoryLabels.length > 0 ? dispatch(setCategoryLabels(categoryLabels)) : '';
  }
};