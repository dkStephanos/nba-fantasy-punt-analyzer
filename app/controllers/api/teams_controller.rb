require 'YahooApi'

class Api::TeamsController < ApplicationController
  before_action :initialize_api

  def user_team
    team_key = request.headers[:TeamKey]
    user_team = @yahooApi.user_team(team_key)
    render json: user_team
  end

  def user_teams
  	user_teams = @yahooApi.user_teams
  	render json: user_teams
  end
end