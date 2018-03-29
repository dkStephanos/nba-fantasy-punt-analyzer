Rails.application.routes.draw do
  root to: "pages#root"
  get '/auth', to: 'pages#root', format: false
end
