import { auth } from '../utils/init';

const YAHOO_API_URL = process.env.YAHOO_API_BASE_URL;
const RAILS_API_URL = process.env.RAILS_API_URL;
const gameId = process.env.GAME_ID;

// ** Action Creators **
const setTeam = team => {
  return {
    type: 'GET_TEAM_SUCCESS',
    team
  };
};

const setTeams = teams => {
  return {
    type: 'GET_TEAMS_SUCCESS',
    teams
  };
};

// ** Async Actions **
export const getUserTeam = teamKey => {
  const token = auth.getToken();
  return dispatch => {
    return fetch(`${RAILS_API_URL}/user_team`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        TeamKey: `${teamKey}`
      }
    })
      .then(response => response.json())
      .then(team => dispatch(setTeam(team)))
      .catch(error => console.log(error));
  };
};

export const getTeams = () => {
  const token = auth.getToken();
  return dispatch => {
    return fetch(`${RAILS_API_URL}/user_teams`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(teams => dispatch(setTeams(teams)))
      .catch(error => console.log(error));
  };
};
