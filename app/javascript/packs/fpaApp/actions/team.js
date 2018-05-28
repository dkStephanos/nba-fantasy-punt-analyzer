import { auth } from "../utils/init";

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

const setTeams = teams => {
  return {
    type: "GET_TEAMS_SUCCESS",
    teams
  };
};

// ** Async Actions **
// Currently no API endpoint for this action...
export const getTeam = teamKey => {
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

export const getTeams = () => {
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
      .then(teams => dispatch(setTeams(teams)))
      .catch(error => console.log(error));
  };
};

// Currently hardcoding teamName, later to be pulled in from storage
// Potential improvement: determine a way to terminate team search earlier
export const getUserTeam = (players, teamName) => {
  return dispatch => {
    const userTeam = [];

    for (let i = 0; i < players.length; i++) {
      players[i].ownership.owner_team_name === "Project Mayhem 🏆🏆🏆"
        ? userTeam.push(players[i])
        : "";
    }

    return userTeam;
  };
};
