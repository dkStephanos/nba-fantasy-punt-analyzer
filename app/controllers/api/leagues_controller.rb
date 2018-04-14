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
    token = request.headers[:Authorization]
    league_key = request.headers[:LeagueKey]
    yahooApi = YahooApi.new(token)
    resp = yahooApi.players(league_key, 1)
    respJSON = Hash.from_xml(resp.body).as_json
    if(respJSON["fantasy_content"]["league"]["players"]["count"].to_i > 1)
      players = respJSON["fantasy_content"]["league"]["players"]
    else
      players = "Error fetching players data"
    end
    render json: players
  end
end