require 'YahooApi'

class Api::LeaguesController < ApplicationController
  def user_leagues
  	yahooApi = YahooApi.new
  	token = request.headers[:Authorization].sub! 'token', 'Bearer'
  	leagues = Hash.from_xml(yahooApi.fetch_user_leagues(token)).to_json
  end
end