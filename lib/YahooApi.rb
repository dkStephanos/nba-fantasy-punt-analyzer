class YahooApi
  def initialize(connection = Faraday.new)
    @connection = connection
  end

  def fetch_user_leagues(access_token)
  	
    resp = @connection.get do |req|
  		req.url ENV['YAHOO_API_LEAGUES_URL']
  		req.headers['Authorization'] = access_token
  		req.headers['Content-Type'] = 'application/json'
	end
    raise IOError, 'FETCH_USER_LEAGUES' unless resp.success?
    resp.body
  end
end