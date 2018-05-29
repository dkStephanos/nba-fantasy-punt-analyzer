//Used to store and retrieve YahooApi data from sessionStorage
export default class YahooApiMiddleware {
  getToken() {
    // Retrieves the user token from local storage
    return sessionStorage.getItem("id_token");
  }

  setLeagueKey(leagueKey) {
    // Sets the leagueKey in session storage to make calls to YahooSports API
    sessionStorage.setItem("league_key", leagueKey);
  }

  getLeagueKey() {
    // Gets the leagueKey from session storage to make calls to YahooSports API
    return sessionStorage.getItem("league_key");
  }

  setCurrentUserId(currentUserId) {
    // Saves the logged in user's id in session storage
    sessionStorage.setItem("current_user_id", currentUserId);
  }

  getCurrentUserId() {
    // Retrieves the id of the currently logged in user
    return sessionStorage.getItem("current_user_id");
  }

  setUserTeamKey(userTeamKey) {
    // Sets the teamKey in session storage to make calls to YahooSports API
    sessionStorage.setItem("user_team_key", userTeamKey);
  }

  getUserTeamKey() {
    // Gets the teamKey from session storage to make calls to YahooSports API
    return sessionStorage.getItem("user_team_key");
  }
}
