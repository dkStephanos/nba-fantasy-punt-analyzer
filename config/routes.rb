Rails.application.routes.draw do
  root to: "pages#root"
  get '/auth', to: 'pages#root', format: false
  get '/home/:player_start', to: 'pages#root'
  get '/leagueSelect', to: 'pages#root', format: false
  get '/teamSelect', to: 'pages#root', format: false
  get '/fetchingPlayers', to: 'pages#root', format: false
  get '/logout', to: 'pages#root', format: false


  namespace :api do
  	get '/user_leagues', to: 'leagues#user_leagues'
  	get '/players', to: 'players#players'
  	get '/user_team', to: 'teams#user_team'
  	get '/user_teams', to: 'teams#user_teams'
  end
end
