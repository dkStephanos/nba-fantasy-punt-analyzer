Rails.application.routes.draw do
  root to: "pages#root"
  get '/auth', to: 'pages#root', format: false
  get '/home', to: 'pages#root'
  get '/leagueSelect', to: 'pages#root', format: false

  namespace :api do
  	get '/user_leagues', to: 'leagues#user_leagues'
  	get '/league_players', to: 'leagues#players'

  end
end
