require 'YahooApi'

class Api::LeaguesController < ApplicationController
  def user_leagues
  	yahooApi = YahooApi.new
  	token = request.headers[:Authorization]
  	resp = yahooApi.fetch_user_leagues(token)
  	respJSON = Hash.from_xml(resp).as_json
  	if(respJSON["fantasy_content"]["users"]["user"]["games"]["count"].to_i > 1)
  		respJSON["fantasy_content"]["users"]["user"]["games"].each do |game|
  			if(game.game_key == ENV['GAME_ID'])
  				leagues = game["leagues"]["league"].to_json
  			end
  		end
  	else
  		leagues = respJSON["fantasy_content"]["users"]["user"]["games"]["game"]["leagues"]["league"].to_json
  	end
  	render json: leagues
  end

  def show
    yahooApi = YahooApi.new
    token = request.headers[:Authorization].sub! 'token', 'Bearer'
    resp = yahooApi.fetch_user_leagues(token)
    respJSON = Hash.from_xml(resp).as_json
    if(respJSON["fantasy_content"]["users"]["user"]["games"]["count"].to_i > 1)
      respJSON["fantasy_content"]["users"]["user"]["games"].each do |game|
        if(game.game_key == ENV['GAME_ID'])
          leagues = game["leagues"]["league"].to_json
        end
      end
    else
      leagues = respJSON["fantasy_content"]["users"]["user"]["games"]["game"]["leagues"]["league"].to_json
    end
    render json: leagues
  end
end