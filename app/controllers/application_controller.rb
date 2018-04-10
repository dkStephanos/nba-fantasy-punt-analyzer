require 'toki_toki'
require 'Authenticator'

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
end
