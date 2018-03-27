class YahooNba
	def initialize(code)
      @client = OAuth2::Client.new(ENV['CLIENT_ID'],
                                      ENV['CLIENT_SECRET'],
                                      :site => 'http://fantasysports.yahooapis.com') 

      #client.auth_code.authorize_url(:redirect_uri => ENV['NBA_FPA_AUTH_CALLBACK_URL'])

      @client.code = code
      @client.fetch_access_token!
    end
 

    def fetch_game_id
    	@game_id = @client.get('http://fantasysports.yahooapis.com/fantasy/v2/game/nba')
    end
end