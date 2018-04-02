export default class AuthService {
  doAuthentication(token) {
    // Saves the user token
    this.setToken(token);
    // navigate to the home route
    window.location.replace('/home');
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
    const query = window.location.search.substring(1);
    const pairs = query.split('&').map(str => str.split('='));
    return pairs.reduce((memo, pair) => {
      memo[pair[0]] = pair[1];
      return memo;
    }, {});
  }
}
