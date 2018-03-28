class Authenticator
  
  def initialize(connection = Faraday.new)
    @connection = connection
  end

  def yahoo(code)
    access_token_resp = fetch_yahoo_access_token(code)
    access_token = access_token_resp['access_token']
  end

  private

  def fetch_yahoo_access_token(code)
  	resp = Faraday.post(ENV['YAHOO_ACCESS_TOKEN_URL']) do |req|
  		req.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  		req.body = {
				      client_id:     ENV['CLIENT_ID'],
				      client_secret: ENV['CLIENT_SECRET'],
				      redirect_uri: ENV['NBA_FPA_AUTH_CALLBACK_URL'],
				      code:          code,
				      grant_type: 'authorization_code'
				    }
	end
    raise IOError, 'FETCH_ACCESS_TOKEN' unless resp.success?
    URI.decode_www_form(resp.body).to_h
  end
end