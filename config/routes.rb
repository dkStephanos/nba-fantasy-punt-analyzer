Rails.application.routes.draw do
  root to: "pages#root"
  get '/auth', to: 'pages#root', format: false
  get '/home', to: 'pages#root', format: false

  namespace :api do
  	get '/user_leagues', to: 'leagues#user_leagues'
  end
end
