import { auth } from "../utils/init";
import { middleware } from "../middleware/init";

const YAHOO_API_URL = process.env.YAHOO_API_BASE_URL;
const RAILS_API_URL = process.env.RAILS_API_URL;
const gameId = process.env.GAME_ID;

// ** Action Creators **
const setTeam = team => {
  return {
    type: "GET_TEAM_SUCCESS",
    team
  };
};

const setUserTeams = userTeams => {
  return {
    type: "GET_USER_TEAMS_SUCCESS",
    userTeams
  };
};

const setUserCurrentTeam = userCurrentTeam => {
  return {
    type: "GET_USER_CURRENT_TEAM_SUCCESS",
    userCurrentTeam
  };
};

// ** Async Actions **
// Currently no API endpoint for this action...
export const getTeam = teamKey => {
  const token = auth.getToken();
  return dispatch => {
    return fetch(`${RAILS_API_URL}/team`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        TeamKey: `${teamKey}`
      }
    })
      .then(response => response.json())
      .then(team => dispatch(setTeam(team)))
      .catch(error => console.log(error));
  };
};

// Fetches all of the users teams for selection
export const getUserTeams = () => {
  const token = auth.getToken();
  return dispatch => {
    return fetch(`${RAILS_API_URL}/user_teams`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(userTeams => dispatch(setUserTeams(userTeams)))
      .catch(error => console.log(error));
  };
};

// Saves the passed in team as User's currentTeam in database for faster login
export const postUserCurrentTeam = (userCurrentTeam, currentUserId) => {
  const csrfToken = document.querySelector("meta[name=csrf-token]").content;
  return dispatch => {
    return fetch(`${RAILS_API_URL}/user_current_team`, {
      method: "POST",
      body: JSON.stringify({ currentTeam: userCurrentTeam }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
        CurrentUserId: `${currentUserId}`
      },
      credentials: "same-origin"
    })
      .then(response => response.json())
      .then(currentTeam => dispatch(setUserCurrentTeam(currentTeam)))
      .catch(error => console.log(error));
  };
};
