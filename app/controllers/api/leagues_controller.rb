require 'YahooApi'

class Api::LeaguesController < ApplicationController
  before_action :initialize_api

  def user_leagues
    leagues = @yahooApi.user_leagues
  	render json: leagues
  end

  def players
    league_key = request.headers[:LeagueKey]
    players = @yahooApi.players(league_key, 1)
    render json: players
  end

  private

  def initialize_api
    token = request.headers[:Authorization]
    @yahooApi = YahooApi.new(token)
  end
end