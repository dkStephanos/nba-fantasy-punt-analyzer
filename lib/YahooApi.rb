class YahooApi
  include HTTParty
  base_uri ENV['YAHOO_API_BASE_URL']

  def initialize(access_token)
    @headers = {
      'Authorization' => access_token,
      'Content-Type' => 'application/json'
    }
  end

  def user_leagues
    self.class.get(ENV['YAHOO_API_LEAGUES_URL'], :headers => @headers)
  end

  def users
    self.class.get("/2.2/users", @options)
  end

  def fetch_user_leagues(access_token)
  	
    resp = Faraday.get ENV['YAHOO_API_LEAGUES_URL'] do |req|
  		req.headers['Authorization'] = access_token
  		req.headers['Content-Type'] = 'application/json'
	end
    raise IOError, 'FETCH_USER_LEAGUES' unless resp.success?
    resp.body
  end

  def fetch_players(access_token, league_key, start)
     resp = Faraday.get ENV['YAHOO_API_LEAGUES_URL'] do |req|
      req.headers['Authorization'] = access_token
      req.headers['Content-Type'] = 'application/json'
  end
    raise IOError, 'FETCH_PLAYERS' unless resp.success?
    resp.body
  end

  def fetch_players_stats(access_token, start)
     resp = @connection.get do |req|
      req.url ENV['YAHOO_API_LEAGUES_URL']
      req.headers['Authorization'] = access_token
      req.headers['Content-Type'] = 'application/json'
  end
    raise IOError, 'FETCH_PLAYERS_STATS' unless resp.success?
    resp.body
  end
end