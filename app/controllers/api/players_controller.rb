require 'YahooApi'

class Api::PlayersController < ApplicationController
  before_action :initialize_api

  def free_agents
    league_key = request.headers[:LeagueKey]
    start = request.headers[:start]
    free_agents = @yahooApi.free_agents(league_key, 1)
    render json: free_agents
  end
end