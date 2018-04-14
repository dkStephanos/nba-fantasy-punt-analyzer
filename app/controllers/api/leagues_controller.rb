require 'YahooApi'

class Api::LeaguesController < ApplicationController
  def user_leagues
  	token = request.headers[:Authorization]
    yahooApi = YahooApi.new(token)
    resp = yahooApi.user_leagues
  	respJSON = Hash.from_xml(resp.body).as_json
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

  def players
    yahooApi = YahooApi.new
    token = request.headers[:Authorization]
    league_key = request.headers[:LeagueKey]
    resp = yahooApi.fetch_players(token, league_key, 1)
    respJSON = Hash.from_xml(resp).as_json
    byebug
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