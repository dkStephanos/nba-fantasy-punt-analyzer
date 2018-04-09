export default class YahooApiMiddleware {
  getToken() {
    // Retrieves the user token from local storage
    return sessionStorage.getItem('id_token');
  }

  
}