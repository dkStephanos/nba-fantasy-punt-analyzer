export default class AuthService {
  doAuthentication(token) {
    // Saves the user token
    this.setToken(token);
    // navigate to the home route
    window.location.replace('/leagueSelect');
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken();
  }

  setToken(idToken) {
    // Saves user token to local storage
    sessionStorage.setItem('id_token', idToken);
  }

  getToken() {
    // Retrieves the user token from local storage
    return sessionStorage.getItem('id_token');
  }

  logout() {
    // Clear user token and profile data from local storage
    sessionStorage.removeItem('id_token');
    window.location.replace('/');
  }

  getQueryParams() {
    const url = window.location.href;
    const token = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
    return token;
  }
}