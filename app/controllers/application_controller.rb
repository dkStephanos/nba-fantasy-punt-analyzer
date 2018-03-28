require 'toki_toki'
require 'yahoo_nba'

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def yahoo
  	byebug
  	yahoo_nba = YahooNba.new(params[:code])
  	byebug
    # Generate token...
    token = TokiToki.encode(yahoo_nba)
    # ... create user if it doesn't exist...
    #User.where(login: login).first_or_create!(
    #  name: name,
    #)
    # ... and redirect to client app.
    redirect_to "#{auth}?token=#{token}"
  rescue StandardError => error
    redirect_to "#{auth}?error=#{error.message}"
  end

  private

  def issuer
    ENV['NBA_FPA_CLIENT_URL']
  end

  def auth
    ENV['NBA_FPA_YAHOO_CALLBACK_URL']
  end
end
