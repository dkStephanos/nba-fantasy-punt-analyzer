class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

	def current_user
  		@current_user
  		byebug
	end

	def current_user=(user_id)
		@current_user ||= User.find(user_id)
	end

	def logged_in?
		@current_user != nil
	end
  
  private

  def initialize_api
    token = request.headers[:Authorization]
    @yahooApi = YahooApi.new(token)
  end
end
