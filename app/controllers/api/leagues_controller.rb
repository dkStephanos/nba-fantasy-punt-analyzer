require 'YahooApi'

class Api::LeaguesController < ApplicationController
  def user_leagues
  	token = request.headers[:Authorization]
    yahooApi = YahooApi.new(token)
    leagues = yahooApi.user_leagues
  	render json: leagues
  end

  def players
    token = request.headers[:Authorization]
    league_key = request.headers[:LeagueKey]
    yahooApi = YahooApi.new(token)
    players = yahooApi.players(league_key, 1)
    render json: players
  end
end