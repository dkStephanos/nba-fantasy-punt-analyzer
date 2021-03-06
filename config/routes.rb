Rails.application.routes.draw do
  root to: "pages#root"
  get '/auth', to: 'pages#root', format: false
  get '/home', to: 'pages#root'
  get '/leagueSelect', to: 'pages#root', format: false
  get '/teamSelect', to: 'pages#root', format: false
  get '/fetchingPlayers', to: 'pages#root', format: false
  get '/logout', to: 'pages#root', format: false
  get '404', to: 'pages#root', format: false

  namespace :api do
  	get '/user_leagues', to: 'leagues#user_leagues'
  	get '/players', to: 'players#players'
    get '/current_user', to: 'users#current_user'
  	get '/user_team', to: 'teams#user_team'
  	get '/user_teams', to: 'teams#user_teams'
    post '/user_current_team', to: 'teams#user_current_team'
  end
end
