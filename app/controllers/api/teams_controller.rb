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

  def user_current_team
      user = User.find(request.headers[:CurrentUserId])
      if(team_params[:team_key] && user)
      # ... create team if it doesn't exist...
      current_team = Team.where(team_key: team_params[:team_key]).first_or_create!(
        team_key: team_params[:team_key],
        name: team_params[:name],
        scoring_type: team_params[:league_scoring_type],
        team_logo: team_params[:team_logos][:team_logo][:url],
        yahoo_url: team_params[:url],
        user_id: user.id
      )
      else 
        render json: { message: "Failure fetching Current User"}, status: 400
      end
      if current_team.errors.any?
        render json: { message: current_team.errors}, status: 400
      else
        user.teams.include?(current_team) ? "" : user.teams << current_team
        user.current_team_key = current_team.team_key
        user.save
        render json: current_team
      end
  end

  private

  def team_params
      params.require(:currentTeam).permit(:team_key, :name, :league_scoring_type, :url, team_logos: [team_logo: [:url]])
  end
end