require 'YahooApi'

class Api::UsersController < ApplicationController
  before_action :initialize_api

  def current_user
    user_teams = @yahooApi.user_teams
    # This is also where we get back the user's manager data...
    # so we check to see if the user exists in the database, inserting them if not
    if(user_teams[0]["managers"]["manager"]["guid"])
		# ... create user if it doesn't exist...
		user = User.where(guid: user_teams[0]["managers"]["manager"]["guid"]).first_or_create!(
			email: user_teams[0]["managers"]["manager"]["email"],
			nickname: user_teams[0]["managers"]["manager"]["nickname"],
			image_url: user_teams[0]["managers"]["manager"]["image_url"],
			guid: user_teams[0]["managers"]["manager"]["guid"]
		)
    else 
    	render json: { message: "Failure fetching Current User"}, status: 400
    end
    if user.errors.any?
	  	render json: { message: user.errors}, status: 400
	else
		self.current_user=(user.id)
	  	render json: user
	end
  end
end