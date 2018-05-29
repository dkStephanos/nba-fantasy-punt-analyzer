import { auth } from "../utils/init";

const YAHOO_API_URL = process.env.YAHOO_API_BASE_URL;
const RAILS_API_URL = process.env.RAILS_API_URL;
const gameId = process.env.GAME_ID;

// ** Action Creators **
const setCurrentUser = currentUser => {
  return {
    type: "GET_CURRENT_USER_SUCCESS",
    currentUser
  };
};

// ** Async Actions **
export const getCurrentUser = () => {
  const token = auth.getToken();
  return dispatch => {
    return fetch(`${RAILS_API_URL}/current_user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(currentUser => dispatch(setCurrentUser(currentUser)))
      .catch(error => console.log(error));
  };
};
