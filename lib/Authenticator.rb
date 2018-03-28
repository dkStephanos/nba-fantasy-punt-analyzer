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
    resp = @connection.post ENV['YAHOO_ACCESS_TOKEN_URL'], {
      client_id:     ENV['CLIENT_ID'],
      client_secret: ENV['CLIENT_SECRET'],
      redirect_uri: ENV['NBA_FPA_YAHOO_CALLBACK_URL'],
      code:          code,
      grant_type: authorization_code
    }
    raise IOError, 'FETCH_ACCESS_TOKEN' unless resp.success?
    URI.decode_www_form(resp.body).to_h
  end
end