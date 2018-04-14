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

  def players(league_key, start)
    self.class.get(ENV['YAHOO_API_PLAYERS_URL'] + league_key + "/players" , :headers => @headers, :query => { start: start, sort: 'OR', status: 'FA' })
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