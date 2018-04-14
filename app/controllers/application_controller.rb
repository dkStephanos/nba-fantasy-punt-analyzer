class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  private

  def initialize_api
    token = request.headers[:Authorization]
    @yahooApi = YahooApi.new(token)
  end
end
