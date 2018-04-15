//Used to store and retrieve YahooApi data from sessionStorage
export default class YahooApiMiddleware {
  getToken() {
    // Retrieves the user token from local storage
    return sessionStorage.getItem('id_token');
  }

  setLeagueKey(leagueKey) {
  	// Sets the leagueKey in session storage to make calls to YahooSports API
  	sessionStorage.setItem('league_key', leagueKey);
  }

  getLeagueKey() {
  	// Gets the leagueKey from session storage to make calls to YahooSports API
  	return sessionStorage.getItem('league_key');
  }
}