require 'YahooApi'

class Api::PlayersController < ApplicationController
  before_action :initialize_api

  def players
	league_key = request.headers[:LeagueKey]
    players = @yahooApi.players(league_key)
    render json: players
  end
end