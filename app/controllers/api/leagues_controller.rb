require 'YahooApi'

class Api::LeaguesController < ApplicationController
  before_action :initialize_api

  def user_leagues
    leagues = @yahooApi.user_leagues
  	render json: leagues
  end
end