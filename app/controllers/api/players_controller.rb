require 'YahooApi'

class Api::PlayersController < ApplicationController
  before_action :initialize_api

  def free_agents
    league_key = request.headers[:LeagueKey]
    start = request.headers[:start]
    free_agents = @yahooApi.free_agents(league_key, start)
    render json: free_agents
  end

  def players
	league_key = request.headers[:LeagueKey]
    players = @yahooApi.players(league_key)
    render json: players
  end
end